declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...params: unknown[]) => void;
  }
}

export const METRIKA_ID = 109802784;

export function reachGoal(target: string) {
  if (typeof window !== "undefined" && window.ym) {
    window.ym(METRIKA_ID, "reachGoal", target);
  }
}
