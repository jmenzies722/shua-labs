"""AWS Read-Only MCP server.

Exposes read-only AWS state to MCP clients. By construction this server only
calls AWS read APIs (Describe*/List*/Get*/Cost Explorer) — there is no code path
that can create, modify, or delete a resource. Pair it with the least-privilege
IAM policy in iam-policy.json so the boundary is enforced by AWS, not trust.

Credentials are never read from code. boto3 resolves them from the environment
in the standard order (env vars, shared config, aws-vault, SSO, instance role).
"""

from __future__ import annotations

import datetime as _dt

import boto3
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("aws-readonly")


def _month_range() -> tuple[str, str]:
    """Return (first-of-month, today-exclusive-end) as YYYY-MM-DD strings.

    Cost Explorer treats End as exclusive, so we pass tomorrow to include today.
    """
    today = _dt.date.today()
    start = today.replace(day=1)
    end = today + _dt.timedelta(days=1)
    return start.isoformat(), end.isoformat()


@mcp.tool()
def get_monthly_cost() -> dict:
    """Return current-month AWS spend (unblended USD) broken down by service."""
    start, end = _month_range()
    ce = boto3.client("ce")
    resp = ce.get_cost_and_usage(
        TimePeriod={"Start": start, "End": end},
        Granularity="MONTHLY",
        Metrics=["UnblendedCost"],
        GroupBy=[{"Type": "DIMENSION", "Key": "SERVICE"}],
    )
    by_service = {}
    total = 0.0
    for group in resp["ResultsByTime"][0]["Groups"]:
        service = group["Keys"][0]
        amount = float(group["Metrics"]["UnblendedCost"]["Amount"])
        if amount > 0:
            by_service[service] = round(amount, 2)
            total += amount
    return {
        "period": {"start": start, "end": end},
        "currency": "USD",
        "total": round(total, 2),
        "by_service": dict(sorted(by_service.items(), key=lambda kv: -kv[1])),
    }


@mcp.tool()
def list_resources(region: str = "us-east-1") -> dict:
    """List running EC2 instances, S3 buckets, and Lambda functions.

    EC2 and Lambda are region-scoped; S3 buckets are global.
    """
    ec2 = boto3.client("ec2", region_name=region)
    lam = boto3.client("lambda", region_name=region)
    s3 = boto3.client("s3")

    instances = []
    for reservation in ec2.describe_instances()["Reservations"]:
        for inst in reservation["Instances"]:
            instances.append(
                {
                    "id": inst["InstanceId"],
                    "type": inst["InstanceType"],
                    "state": inst["State"]["Name"],
                }
            )

    functions = [fn["FunctionName"] for fn in lam.list_functions().get("Functions", [])]
    buckets = [b["Name"] for b in s3.list_buckets().get("Buckets", [])]

    return {
        "region": region,
        "ec2_instances": instances,
        "lambda_functions": functions,
        "s3_buckets": buckets,
    }


@mcp.tool()
def list_alarms(region: str = "us-east-1") -> dict:
    """List CloudWatch alarms and their current state in a region."""
    cw = boto3.client("cloudwatch", region_name=region)
    alarms = []
    paginator = cw.get_paginator("describe_alarms")
    for page in paginator.paginate():
        for alarm in page.get("MetricAlarms", []):
            alarms.append(
                {
                    "name": alarm["AlarmName"],
                    "state": alarm["StateValue"],
                    "metric": alarm.get("MetricName"),
                }
            )
    return {"region": region, "count": len(alarms), "alarms": alarms}


@mcp.tool()
def get_billing_summary() -> dict:
    """Return month-to-date spend and the month-end forecast."""
    start, end = _month_range()
    ce = boto3.client("ce")

    actual = ce.get_cost_and_usage(
        TimePeriod={"Start": start, "End": end},
        Granularity="MONTHLY",
        Metrics=["UnblendedCost"],
    )
    spent = float(actual["ResultsByTime"][0]["Total"]["UnblendedCost"]["Amount"])

    forecast_value = None
    today = _dt.date.today()
    last_day = (today.replace(day=28) + _dt.timedelta(days=4)).replace(day=1)
    if end < last_day.isoformat():
        try:
            fc = ce.get_cost_forecast(
                TimePeriod={"Start": end, "End": last_day.isoformat()},
                Metric="UNBLENDED_COST",
                Granularity="MONTHLY",
            )
            forecast_value = round(spent + float(fc["Total"]["Amount"]), 2)
        except ce.exceptions.ClientError:
            forecast_value = None

    return {
        "period": {"start": start, "end": last_day.isoformat()},
        "currency": "USD",
        "spent_to_date": round(spent, 2),
        "forecast_month_end": forecast_value,
    }


if __name__ == "__main__":
    mcp.run()
