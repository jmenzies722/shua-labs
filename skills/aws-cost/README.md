# /aws-cost

🟢 Free · 🚧 WIP

A Claude Code skill that reads your Terraform and **estimates monthly AWS cost before you `apply`**. Catch the $400/mo NAT gateway before it's running, not on the bill.

## Who it's for

Infra and platform engineers who want a cost sanity-check inside their normal Terraform workflow.

## On-thesis

Makes agents/infra **cheaper to operate** — cost visibility at author time.

## Status

🚧 Scaffolded. Next: parse `terraform plan -json`, map resources to pricing, output a per-resource monthly estimate.
