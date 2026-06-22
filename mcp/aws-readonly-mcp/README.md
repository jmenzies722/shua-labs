# AWS Read-Only MCP

🟢 Free · 🚧 WIP

An MCP server that lets Claude (or any MCP client) **query your AWS account safely** — cost, resources, alarms, billing — with **zero write access, ever**. Read-only by construction: the server only exposes read APIs, so an agent physically cannot create, modify, or delete anything.

## Who it's for

Anyone running AI agents near an AWS account who wants the agent to *see* state without the risk of it *changing* state. The safe way to give an agent eyes on your cloud.

## Why it's on-thesis

This is the Shua Labs filter in one project: it makes agents **safer** by enforcing a hard read-only boundary at the tool layer, not the prompt layer.

## Tools exposed

| Tool | Returns |
|------|---------|
| `get_monthly_cost` | Current month spend, by service |
| `list_resources` | Running resources (EC2, S3, Lambda) in a region |
| `list_alarms` | CloudWatch alarms and their state |
| `get_billing_summary` | Budget vs. actual, forecast |

## Safety model

1. Server only ever calls AWS **read** APIs (`Describe*`, `List*`, `Get*`, Cost Explorer).
2. Ships with a least-privilege IAM policy (`iam-policy.json`) — attach it and the boundary is enforced by AWS itself, not trust.
3. No credentials in code — reads from your AWS profile / `aws-vault`.

## Quick start

```bash
cd mcp/aws-readonly-mcp
pip install -r requirements.txt
# uses your default AWS profile (read-only creds recommended)
python -m src.server
```

Then add to your MCP client config:

```json
{
  "mcpServers": {
    "aws-readonly": {
      "command": "python",
      "args": ["-m", "src.server"],
      "cwd": "/path/to/shua-labs/mcp/aws-readonly-mcp"
    }
  }
}
```

## Status

🚧 Scaffolded. Next: implement the four tools against boto3, ship the IAM policy, add tests against a real read-only role.
