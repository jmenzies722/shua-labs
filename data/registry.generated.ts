// ─────────────────────────────────────────────────────────────────────────────
// GENERATED FILE — DO NOT EDIT BY HAND.
//
// Source:    ~/.claude/agents/registry.yaml
// Regenerate: npm run sync:registry
// Verify:     npm run check:registry   (CI fails if this file is stale)
//
// The agent crew is defined once, on the machine that runs it. This file is a
// build artifact of that definition so the public site cannot claim something
// the registry no longer says.
// ─────────────────────────────────────────────────────────────────────────────

import type { RegistryEntry } from "@/lib/types";

/** Hash of the source YAML this file was generated from. */
export const REGISTRY_SOURCE_HASH = "5a1e5d3ba2f1";

export const generatedAgents: RegistryEntry[] = [
  {
    "slug": "axis",
    "name": "axis",
    "kind": "agent",
    "availability": "private",
    "summary": "Architecture & product vision — system design, technical direction.",
    "description": "Architecture & product vision — system design, technical direction.",
    "version": "1.0.0",
    "domain": "architecture",
    "model": "claude-opus-5",
    "costClass": "high",
    "tools": [
      "Bash",
      "Read",
      "Edit",
      "Write",
      "Glob",
      "Grep"
    ],
    "capabilities": [
      "system-design",
      "architecture-review",
      "technical-direction",
      "tradeoff-analysis",
      "api-design"
    ],
    "handsOffTo": [
      "forge",
      "ward"
    ],
    "readOnly": false
  },
  {
    "slug": "forge",
    "name": "forge",
    "kind": "agent",
    "availability": "private",
    "summary": "Feature engineering — writes production code, fixes bugs, ships.",
    "description": "Feature engineering — writes production code, fixes bugs, ships.",
    "version": "1.0.0",
    "domain": "implementation",
    "model": "claude-opus-5",
    "costClass": "high",
    "tools": [
      "Bash",
      "Read",
      "Edit",
      "Write",
      "Glob",
      "Grep"
    ],
    "capabilities": [
      "feature-build",
      "bugfix",
      "refactor",
      "test-writing",
      "scaffolding"
    ],
    "handsOffTo": [
      "ward",
      "proof"
    ],
    "readOnly": false
  },
  {
    "slug": "ward",
    "name": "ward",
    "kind": "agent",
    "availability": "private",
    "summary": "Infrastructure, security, DevOps — AWS, Terraform, Docker, CI/CD.",
    "description": "Infrastructure, security, DevOps — AWS, Terraform, Docker, CI/CD.",
    "version": "1.0.0",
    "domain": "infra-security",
    "model": "claude-opus-5",
    "costClass": "high",
    "tools": [
      "Bash",
      "Read",
      "Edit",
      "Write",
      "WebSearch",
      "WebFetch"
    ],
    "capabilities": [
      "terraform",
      "docker",
      "cicd",
      "aws",
      "threat-model",
      "hardening",
      "deployment",
      "secrets-hygiene"
    ],
    "handsOffTo": [
      "proof"
    ],
    "readOnly": false
  },
  {
    "slug": "proof",
    "name": "proof",
    "kind": "agent",
    "availability": "private",
    "summary": "Validation & diligence — reality-checks plans, claims, and other agents' output.",
    "description": "Validation & diligence — reality-checks plans, claims, and other agents' output.",
    "version": "1.0.0",
    "domain": "validation",
    "model": "claude-opus-5",
    "costClass": "high",
    "tools": [
      "WebSearch",
      "WebFetch",
      "Bash",
      "Read"
    ],
    "capabilities": [
      "fact-check",
      "risk-surfacing",
      "claim-verification",
      "independent-review"
    ],
    "handsOffTo": [],
    "readOnly": true
  },
  {
    "slug": "trace",
    "name": "trace",
    "kind": "agent",
    "availability": "private",
    "summary": "Root-cause analysis — reproduce, bisect, evidence the cause, hand off the fix.",
    "description": "Root-cause analysis — reproduce, bisect, evidence the cause, hand off the fix.",
    "version": "1.0.0",
    "domain": "debugging",
    "model": "claude-opus-5",
    "costClass": "high",
    "tools": [
      "Bash",
      "Read",
      "Glob",
      "Grep"
    ],
    "capabilities": [
      "root-cause",
      "reproduction",
      "bisect",
      "log-analysis",
      "hypothesis-testing"
    ],
    "handsOffTo": [
      "forge",
      "ward"
    ],
    "readOnly": true
  },
  {
    "slug": "scope",
    "name": "scope",
    "kind": "agent",
    "availability": "private",
    "summary": "Market & competitive intelligence — teardowns, funding/comp signals, threat modeling.",
    "description": "Market & competitive intelligence — teardowns, funding/comp signals, threat modeling.",
    "version": "1.0.0",
    "domain": "market-intel",
    "model": "claude-opus-5",
    "costClass": "high",
    "tools": [
      "WebSearch",
      "WebFetch",
      "Bash",
      "Read"
    ],
    "capabilities": [
      "competitive-analysis",
      "market-sizing",
      "comp-benchmarks",
      "incumbent-threat-model"
    ],
    "handsOffTo": [
      "pilot",
      "proof"
    ],
    "readOnly": true
  },
  {
    "slug": "pilot",
    "name": "pilot",
    "kind": "agent",
    "availability": "private",
    "summary": "Operations, strategy, PM, career — roadmaps, prioritization, comp positioning.",
    "description": "Operations, strategy, PM, career — roadmaps, prioritization, comp positioning.",
    "version": "1.0.0",
    "domain": "ops-career",
    "model": "claude-sonnet-5",
    "costClass": "mid",
    "tools": [
      "Bash",
      "Read",
      "Write"
    ],
    "capabilities": [
      "roadmap",
      "prioritization",
      "scoping",
      "comp-positioning",
      "project-triage"
    ],
    "handsOffTo": [
      "axis"
    ],
    "readOnly": false
  },
  {
    "slug": "pitch",
    "name": "pitch",
    "kind": "agent",
    "availability": "private",
    "summary": "Marketing, branding, pitch, GTM — positioning, naming, launch copy.",
    "description": "Marketing, branding, pitch, GTM — positioning, naming, launch copy.",
    "version": "1.0.0",
    "domain": "brand-gtm",
    "model": "claude-sonnet-5",
    "costClass": "mid",
    "tools": [
      "Bash",
      "Read",
      "Write",
      "WebSearch",
      "WebFetch"
    ],
    "capabilities": [
      "positioning",
      "naming",
      "landing-copy",
      "pitch-narrative",
      "launch-plan"
    ],
    "handsOffTo": [
      "proof"
    ],
    "readOnly": false
  }
];
