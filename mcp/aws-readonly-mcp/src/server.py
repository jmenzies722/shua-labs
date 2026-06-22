"""AWS Read-Only MCP server.

Exposes read-only AWS state to MCP clients. By construction this server only
calls AWS read APIs (Describe*/List*/Get*/Cost Explorer) — there is no code path
that can create, modify, or delete a resource. Pair it with the least-privilege
IAM policy in iam-policy.json so the boundary is enforced by AWS, not trust.
"""

from __future__ import annotations

import boto3
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("aws-readonly")


@mcp.tool()
def get_monthly_cost() -> dict:
    """Return current-month AWS spend broken down by service."""
    boto3.client("ce")
    # TODO: call ce.get_cost_and_usage with MONTHLY granularity, group by SERVICE
    raise NotImplementedError


@mcp.tool()
def list_resources(region: str = "us-east-1") -> dict:
    """List running EC2, S3, and Lambda resources in a region."""
    # TODO: ec2.describe_instances, s3.list_buckets, lambda.list_functions
    raise NotImplementedError


@mcp.tool()
def list_alarms(region: str = "us-east-1") -> dict:
    """List CloudWatch alarms and their current state."""
    # TODO: cloudwatch.describe_alarms
    raise NotImplementedError


@mcp.tool()
def get_billing_summary() -> dict:
    """Return budget vs. actual spend and the month-end forecast."""
    # TODO: budgets.describe_budgets + ce.get_cost_forecast
    raise NotImplementedError


if __name__ == "__main__":
    mcp.run()
