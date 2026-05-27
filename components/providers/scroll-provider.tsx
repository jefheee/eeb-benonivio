"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function ScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let resizeId: number;
    const update = (time: number) => {
      lenis.raf(time);
      resizeId = requestAnimationFrame(update);
    };

    resizeId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(resizeId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
