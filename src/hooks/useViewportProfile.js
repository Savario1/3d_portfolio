import { useEffect, useState } from "react";

function computeProfile() {
  if (typeof window === "undefined") {
    return { isMobile: false, isCoarsePointer: false, dpr: 1 };
  }
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
  return { isMobile, isCoarsePointer, dpr };
}

/** Lightweight viewport profile used to scale particle counts, dpr, and cursor parallax. */
export function useViewportProfile() {
  const [profile, setProfile] = useState(computeProfile);

  useEffect(() => {
    const handleResize = () => setProfile(computeProfile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return profile;
}
