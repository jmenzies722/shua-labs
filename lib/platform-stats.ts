import { services } from "@/data/platform";
import { GATE_ARTIFACTS, type PlatformService, type ShipGate } from "@/lib/types";

/** How many of the four gate artifacts are genuinely public. */
export function gateScore(gate: ShipGate): number {
  return GATE_ARTIFACTS.filter((k) => gate[k].done).length;
}

/** A service has shipped only at 4/4. Three out of four is zero. */
export function hasShipped(service: PlatformService): boolean {
  return gateScore(service.gate) === GATE_ARTIFACTS.length;
}

export interface PlatformStats {
  total: number;
  shipped: number;
  building: number;
  /** Total gate artifacts public across the whole platform. */
  artifactsDone: number;
  artifactsTotal: number;
  /** The single service currently open, if any. */
  open: PlatformService | undefined;
}

export function platformStats(): PlatformStats {
  return {
    total: services.length,
    shipped: services.filter(hasShipped).length,
    building: services.filter((s) => s.status === "building").length,
    artifactsDone: services.reduce((n, s) => n + gateScore(s.gate), 0),
    artifactsTotal: services.length * GATE_ARTIFACTS.length,
    open: services.find((s) => s.status === "building"),
  };
}
