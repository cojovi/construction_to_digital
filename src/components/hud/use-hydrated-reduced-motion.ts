"use client";

import { useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/**
 * Keeps the server snapshot and the first client snapshot identical, then
 * applies the user's motion preference after hydration. This prevents React
 * from recovering the entire animated tree for reduced-motion visitors.
 */
export function useHydratedReducedMotion() {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const preferred = useReducedMotion();
  return hydrated && Boolean(preferred);
}
