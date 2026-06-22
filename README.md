# Shua Labs

**Tools for running AI agents in production — safe, observable, and cheap to operate.**

Most AI projects are demos. Shua Labs is the layer underneath them: the skills, MCP servers, and agents that make AI safe to actually ship — scoped access, cost guards, observability, and governance.

Built by [Josh Menzies](https://github.com/jmenzies722) — platform engineer working on the operations layer of AI.

---

## The thesis

Every project here passes one filter. It makes agents **safer, cheaper, more observable, or easier to deploy.** If it doesn't, it's not in this repo.

- **Free tier** — skills, MCP servers, templates. Open source. Use them, fork them.
- **Paid tier** — hosted agents and governance tooling. Managed, billed, production-ready.

---

## Gallery

Legend: 🟢 Free · 🔵 Freemium · 🟣 Paid · 🚧 WIP

| Project | What it does | Who it's for | Type | Status | Link |
|---------|-------------|--------------|------|--------|------|
| [AWS Read-Only MCP](./mcp/aws-readonly-mcp) | Lets Claude query AWS state (cost, resources, alarms) with **zero write access** | Anyone running agents near AWS | MCP | 🟢🚧 | — |
| [`/aws-cost`](./skills/aws-cost) | Estimates monthly AWS cost from Terraform before you apply | Infra teams | Skill | 🟢🚧 | — |
| [`/threat-model`](./skills/threat-model) | Generates an OWASP-style threat model for any repo | Security-minded builders | Skill | 🟢🚧 | — |
| [Infra Reviewer](./agents/infra-reviewer) | Autonomous Terraform/Docker reviewer that comments on PRs | DevOps / platform teams | Agent | 🔵🚧 | — |
| [PR Reviewer SaaS](./apps/pr-reviewer) | Hosted agent that reviews every PR on your repo | Engineering teams | App | 🟣🚧 | — |

---

## Structure

```
shua-labs/
├── skills/        Claude Code skills (slash commands)
├── agents/        Claude Agent SDK builds (standalone agents)
├── mcp/           MCP servers
├── extensions/    browser / editor extensions
├── apps/          deployed web apps (free + paid)
├── templates/     starter kits to fork
└── docs/          building-journey writeups
```

Each project folder has its own README: what it does · who it's for · install · live link · free or paid.

---

## License

MIT — see [LICENSE](./LICENSE).
