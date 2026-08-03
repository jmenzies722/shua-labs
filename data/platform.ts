import type { PlatformService } from "@/lib/types";

/**
 * The CONTROL PLANE platform. Seven services, one open at a time.
 *
 * HONESTY RULE — read this before editing a `gate` block.
 * A gate artifact is `done: true` ONLY when a stranger can open it with no
 * credentials. Code on disk is not evidence. A private repo is not evidence.
 * A demo that only runs on the laptop is not evidence.
 *
 * When something is not done, write the real `blocker`. The empty boxes render
 * on purpose — a ledger that only shows wins is a brochure.
 *
 * Source of truth for the order and the rules:
 * Notion → Learn → "CONTROL PLANE — the AI platform engineer path".
 */
export const services: PlatformService[] = [
  {
    n: 1,
    slug: "shua-gateway",
    name: "shua-gateway",
    phase: "3 Platform",
    status: "building",
    oneLiner:
      "An LLM inference gateway that sits between your applications and the Anthropic Messages API.",
    teaches: "Streaming while measuring — the hardest plumbing in AI infra.",
    whyHere:
      "Every later service sends its traffic through it, so it is the only service with no prerequisites and the most downstream value.",
    moves: [
      "Cost engineering on AWS",
      "Observability for AI systems",
      "Agent governance and guardrails",
    ],
    tags: ["Python", "FastAPI", "Docker", "Anthropic API"],
    description:
      "A gateway is a trust boundary before it is anything else. Clients hold a key you issued and can revoke; the provider credential never leaves the container. The request path is deliberately dumb — authenticate, swap the credential, forward the bytes — and the proxy never interprets the request body.\n\nCurrently at M0, a pass-through proxy. Streaming measurement, budgets, routing, caching, and deployment are M1 through M5 and are not built.\n\nThe hard part, and the reason this service is first: you cannot buffer a streaming response to measure it. Token accounting has to happen on bytes in flight, without adding latency the client can feel.",
    snippet: {
      language: "text",
      caption: "the trust boundary",
      code: `client ──X-Gateway-Key: gk-…──▶ auth middleware
                                  │  key → tenant, 401 by default
                                  ▼
                            pass-through proxy
                                  │  ANTHROPIC_API_KEY attached HERE,
                                  │  never before, never client-side
                                  ▼
                     Anthropic  POST /v1/messages
                                  │
                          response relayed unbuffered`,
    },
    gate: {
      repo: {
        done: false,
        blocker:
          "Repo exists and is private. One `gh repo edit --visibility public` away.",
      },
      diagram: {
        done: false,
        blocker:
          "Written — a mermaid trust-boundary diagram sits in the README. Not evidence until the repo is public.",
      },
      demo: {
        done: false,
        blocker:
          "M0 runs locally under Docker Compose. Nothing is deployed where someone else can hit it.",
      },
      writeup: {
        done: false,
        blocker: "Not started. The post is about streaming while measuring.",
      },
    },
  },
  {
    n: 2,
    slug: "evalctl",
    name: "evalctl",
    phase: "2 AI Core",
    status: "queued",
    oneLiner: "Evals as a blocking CI gate, not a dashboard nobody opens.",
    teaches:
      "The statistics most people skip, and the CI/CD lever that actually changes behaviour.",
    whyHere:
      "Pairs with service 1: the gateway emits the telemetry, this grades it. Services 1 and 2 are the two highest-frequency asks in AI platform job descriptions.",
    moves: ["CI/CD pipeline design", "Agent design patterns", "Claude API depth"],
    tags: ["Python", "GitHub Actions", "Statistics"],
    description:
      "A dashboard is a suggestion. A red check is a decision. evalctl turns model evaluation into a gate that blocks a merge, which is the only version of the idea that changes what a team ships.\n\nThe interesting problem is not running the evals — it is deciding when a score difference is real. Small eval sets produce noisy deltas, and a gate that fires on noise gets disabled within a week.",
    gate: {
      repo: { done: false, blocker: "Service 2 does not begin until service 1 passes its gate." },
      diagram: { done: false, blocker: "Blocked on service 1." },
      demo: { done: false, blocker: "Blocked on service 1." },
      writeup: { done: false, blocker: "Blocked on service 1." },
    },
  },
  {
    n: 3,
    slug: "agentctl",
    name: "agentctl",
    phase: "3 Platform",
    status: "queued",
    oneLiner: "A Kubernetes controller for agent runs.",
    teaches:
      "Moving from using Kubernetes to extending it. The most portable skill on the platform.",
    whyHere:
      "Builds on the existing homelab k3d cluster instead of standing up a new root. Service 4 hardens this runtime and service 5 traces it.",
    moves: [
      "Kubernetes k3d Helm ArgoCD",
      "Container fundamentals",
      "Monitoring and incident response",
    ],
    tags: ["Go", "Kubernetes", "k3d", "CRDs"],
    description:
      "An agent run is a workload with a lifecycle: admitted, scheduled, running, done or killed. That is a reconciliation loop, which means Kubernetes already has the shape — it just does not have the resource.\n\nWriting the controller is the moment Kubernetes stops being a thing you configure and starts being a thing you extend. The payoff is watching state you never touched manually converge on what you declared.",
    gate: {
      repo: { done: false, blocker: "Blocked on services 1 and 2." },
      diagram: { done: false, blocker: "Blocked on services 1 and 2." },
      demo: { done: false, blocker: "Blocked on services 1 and 2." },
      writeup: { done: false, blocker: "Blocked on services 1 and 2." },
    },
  },
  {
    n: 4,
    slug: "cage",
    name: "cage",
    phase: "4 Architecture",
    status: "queued",
    oneLiner: "The untrusted-code sandbox — running model-written code safely.",
    teaches:
      "Security for AI systems and policy-as-code, against a genuinely unsolved industry problem.",
    whyHere:
      "Needs service 3 to run inside. Security-flavoured infrastructure does not commoditise, and it pairs with the DOP-C02 security track.",
    moves: [
      "Security for AI systems",
      "Policy-as-code",
      "Agent governance and guardrails",
    ],
    tags: ["Go", "gVisor", "seccomp", "OPA"],
    description:
      "Agents write code and then want to run it. Every team building agents hits this and most answer it with a container and a hope.\n\nThe honest version treats model output as hostile input: no network by default, no filesystem outside the workspace, a syscall filter, and a hard wall-clock kill. The interesting part is that every one of those constraints breaks something legitimate, and the design work is deciding which breakage you accept.",
    gate: {
      repo: { done: false, blocker: "Blocked on service 3." },
      diagram: { done: false, blocker: "Blocked on service 3." },
      demo: { done: false, blocker: "Blocked on service 3." },
      writeup: { done: false, blocker: "Blocked on service 3." },
    },
  },
  {
    n: 5,
    slug: "agentscope",
    name: "agentscope",
    phase: "3 Platform",
    status: "queued",
    oneLiner: "OpenTelemetry tracing for agent runs, plus a replay UI.",
    teaches:
      "OTel, which transfers to every infrastructure job whether or not there is AI in it.",
    whyHere:
      "Needs services 1 and 3 to have something worth tracing. Double-duty: the most transferable service on the platform.",
    moves: ["Observability for AI systems", "Monitoring and incident response"],
    tags: ["TypeScript", "OpenTelemetry", "Next.js"],
    description:
      "When an agent does something surprising in production, the question is always the same: what did it actually do, in what order, and what did each step cost. Logs answer that badly because an agent run is a tree, not a line.\n\nSpans are the right shape. The replay UI is what makes them usable by someone who was not there.",
    gate: {
      repo: { done: false, blocker: "Blocked on services 1 and 3." },
      diagram: { done: false, blocker: "Blocked on services 1 and 3." },
      demo: { done: false, blocker: "Blocked on services 1 and 3." },
      writeup: { done: false, blocker: "Blocked on services 1 and 3." },
    },
  },
  {
    n: 6,
    slug: "shua-new",
    name: "shua-new",
    phase: "1 Foundation",
    status: "queued",
    oneLiner: "The golden path scaffolder — one command to a production shape.",
    teaches:
      "Real Terraform module design, which is where most self-taught infrastructure engineers stall.",
    whyHere:
      "Deliberately late. You can only template a production shape after you have built one five times — building the golden path first produces a template that encodes your inexperience.",
    moves: [
      "Terraform module design and state",
      "Deployment strategies",
      "AWS multi-account governance",
    ],
    tags: ["Terraform", "Python", "AWS"],
    description:
      "Every service before this one lays down the same foundations by hand: state backend, CI, observability wiring, IAM. Six repetitions is enough to know which parts are genuinely common and which only looked common.\n\nThat ordering is the whole point of putting an abstraction service last.",
    gate: {
      repo: { done: false, blocker: "Blocked on services 1 through 5." },
      diagram: { done: false, blocker: "Blocked on services 1 through 5." },
      demo: { done: false, blocker: "Blocked on services 1 through 5." },
      writeup: { done: false, blocker: "Blocked on services 1 through 5." },
    },
  },
  {
    n: 7,
    slug: "devex-pulse",
    name: "devex-pulse",
    phase: "4 Architecture",
    status: "queued",
    oneLiner: "DORA metrics plus AI-assist measurement across the platform.",
    teaches:
      "System design for AI at scale, and the technical writing that makes it land.",
    whyHere:
      "Last, because it measures the other six. Lowest infrastructure depth, highest seniority signal — the service that gets you treated as a platform lead.",
    moves: ["System design for AI at scale", "Technical writing"],
    tags: ["TypeScript", "DORA", "Analytics"],
    description:
      "Deployment frequency, lead time, change failure rate, time to restore — and then the question nobody has a clean answer to yet: what did AI assistance actually change about any of them.\n\nMeasuring your own platform is the last service because it requires a platform to measure.",
    gate: {
      repo: { done: false, blocker: "Blocked on services 1 through 6." },
      diagram: { done: false, blocker: "Blocked on services 1 through 6." },
      demo: { done: false, blocker: "Blocked on services 1 through 6." },
      writeup: { done: false, blocker: "Blocked on services 1 through 6." },
    },
  },
];
