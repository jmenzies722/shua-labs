// ─────────────────────────────────────────────────────────────────────────────
// GENERATED FILE — DO NOT EDIT BY HAND.
//
// Source:     portfolio.yaml in each project repo
// Regenerate: npm run sync:projects
// Verify:     npm run check:projects   (CI fails if this file is stale)
//
// Evidence claims come from a hook-captured log of commands that actually ran,
// so nothing here is a remembered achievement. The command that proved each
// claim stays in the project repo and is deliberately not published.
// ─────────────────────────────────────────────────────────────────────────────

import type { RegistryEntry } from "@/lib/types";

/** Hash of the portfolio.yaml sources this file was generated from. */
export const PROJECTS_SOURCE_HASH = "0768879be6fe";

export const generatedProjects: RegistryEntry[] = [
  {
    "slug": "chaos-gym",
    "name": "Chaos Gym",
    "kind": "project",
    "availability": "public",
    "summary": "A Kubernetes cluster that breaks itself on a schedule, so incident diagnosis can be practised against real dashboards rather than read about.",
    "description": "A Kubernetes cluster that breaks itself on a schedule, so incident diagnosis can be practised against real dashboards rather than read about.",
    "language": "Go · Python · Terraform · AWS · k3s · OpenTelemetry · Prometheus · Grafana",
    "stack": [
      "Go",
      "Python",
      "Terraform",
      "AWS",
      "k3s",
      "OpenTelemetry",
      "Prometheus",
      "Grafana"
    ],
    "phases": [
      {
        "id": 1,
        "name": "Go service, OTel pipeline, one failure mode",
        "status": "in-progress",
        "stepsDone": 8,
        "stepsTotal": 9
      },
      {
        "id": 2,
        "name": "Failure-mode menu, each ending in an incident writeup",
        "status": "in-progress",
        "stepsDone": 1,
        "stepsTotal": 5
      }
    ],
    "evidence": [
      "Instance size was chosen by measurement, not guesswork. t3.micro burned its CPU credit balance to zero during the k3s install and throttled hard enough that SSM commands queued instead of running; k3s idles at ~760MB, leaving too little headroom on t3.small's 2GiB for kube-prometheus-stack.",
      "The cluster has zero inbound security-group rules. Access is SSM Session Manager, authorised by IAM rather than by network position — no port 22, no bastion, nothing on the internet can open a connection to the box.",
      "Cost guardrails exist before any billable resource does. A $20/month budget alarm with include_credit = false, so promotional credits cannot mask real spend, plus a budget action that stops (never terminates) the instance at 100% of actual, scoped to a single instance ARN.",
      "The Go service ships as a 2.5MB scratch image — static binary, no base OS, cross-built linux/amd64 from an arm64 Mac.",
      "Two replicas behind a ClusterIP Service load-balanced 16/14 across 30 requests, verified by the pod hostname each response returns — which is also what makes a pod kill visible from outside the cluster.",
      "A RED dashboard (request rate, error rate, duration) exists without any metrics SDK in the service. The service emits only traces; the Collector gateway's spanmetrics connector derives the metrics and pushes them into Prometheus over OTLP rather than being scraped.",
      "Dropping health-probe spans at the cluster-wide gateway rather than at each node's agent removed 84% of span volume in one place. Liveness and readiness probes outnumbered real requests roughly five to one at idle.",
      "A histogram bucket boundary placed on a service's typical latency makes a healthy service look slow. With a boundary at 100ms and requests taking 101ms, p95 read 242ms; moving the boundaries either side of the mode gave p50 100ms and p95 109ms for the same unchanged service.",
      "The chaos scheduler's blast radius is enforced by RBAC, not by convention. Its ServiceAccount lives in one namespace and its Role in another, and it cannot scale the deployment, edit the image, or touch the monitoring namespace that observes the incidents it causes.",
      "The telemetry pipeline monitors itself. Both Collectors expose their own metrics and are scraped via PodMonitor, so spans accepted, spans sent, refusals and queue depth are visible — a silently dropping Collector is otherwise indistinguishable from a service that stopped receiving traffic.",
      "Injected latency into one replica at runtime and captured the signature of a degradation that every health check misses: p50 unchanged at 101ms while p95 and p99 went from 109ms to 2000ms, with zero errors, zero restarts and full replica count. Kubernetes considered the service healthy throughout, because the liveness probe hits an endpoint the fault does not touch.",
      "Fault state is swapped through an atomic pointer to an immutable struct because HTTP handlers read it concurrently with the injection endpoint writing it — a genuine data race, not a theoretical one.",
      "Distributed tracing works across a process boundary: an inbound W3C traceparent header makes the service adopt the caller's trace ID and record the caller's span as a remote parent, rather than starting a new trace."
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/jmenzies722/chaos-gym"
      }
    ]
  }
];
