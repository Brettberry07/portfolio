"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const serverSnapshot = () => false;
const snapshot = () => window.matchMedia(query).matches;
function subscribe(notify: () => void) {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", notify);
  return () => preference.removeEventListener("change", notify);
}

/** Motion's installed hook snapshots the preference; scroll/3D also need live changes. */
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
