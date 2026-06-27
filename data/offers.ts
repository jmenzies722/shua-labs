import type { Offer } from "@/lib/types";

/**
 * Consulting offers — value ladder, low → high commitment.
 * The middle offer is the flagship. Do not invent a fourth offer.
 */
export const offers: Offer[] = [
  {
    id: "ai-readiness-audit",
    name: "AI Readiness Audit",
    forWho:
      "For businesses who know AI could help but don't know where to start.",
    deliverable:
      "A fixed one-week audit that ranks your highest-ROI automation opportunities and hands you a build roadmap.",
    price: "From $2,500",
    priceNote: "Fee credits 100% toward a build booked within 60 days.",
    cta: { label: "Book an audit", href: "mailto:jmenzies722@gmail.com?subject=AI%20Readiness%20Audit" },
  },
  {
    id: "production-grade-ai-agent",
    name: "Production-Grade AI Agent",
    forWho: "For a business with a manual, costly, repetitive process.",
    deliverable:
      "I build and deploy a custom AI agent that does it — integrated into your stack, with logging, cost caps, fallbacks, and observability. Not a demo. Something that survives real traffic.",
    price: "From $8,000",
    cta: { label: "Start a build", href: "mailto:jmenzies722@gmail.com?subject=Production%20AI%20Agent%20Build" },
    flagship: true,
  },
  {
    id: "fractional-ai-engineer",
    name: "Fractional AI Engineer",
    forWho:
      "For a team that needs ongoing AI capability but can't justify a full-time hire.",
    deliverable:
      "Embedded, ongoing — I stand up, integrate, and maintain your AI systems. Your fractional AI lead.",
    price: "From $5,000/mo",
    priceNote: "3-month minimum.",
    cta: { label: "Talk retainer", href: "mailto:jmenzies722@gmail.com?subject=Fractional%20AI%20Engineer" },
  },
];
