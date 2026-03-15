"use client";

import { useEffect, ReactNode } from "react";

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    };

    initLenis();
  }, []);

  return <>{children}</>;
};
