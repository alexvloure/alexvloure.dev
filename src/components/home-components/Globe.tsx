"use client";

import createGlobe from "cobe";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const phi = useRef<number>(0);
  const pause = useRef<boolean>(false);

  useEffect(() => {
    if (resolvedTheme && canvasRef.current) {
      let width = canvasRef.current.offsetWidth;

      const onResize = () =>
        canvasRef.current && (width = canvasRef.current.offsetWidth);
      window.addEventListener("resize", onResize);
      onResize();

      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.1,
        dark: resolvedTheme === "dark" ? 1 : 0,
        diffuse: 1.2,
        mapSamples: 18000,
        mapBrightness: 6,
        baseColor: resolvedTheme === "dark" ? [0.3, 0.3, 0.3] : [1, 1, 1],
        markerColor: resolvedTheme === "dark" ? [0.86, 1, 0.33] : [1, 0.24, 0],
        glowColor: resolvedTheme === "dark" ? [1, 1, 1] : [0.4, 0.4, 0.4],
        scale: 1.1,
        offset: [0, 900],
        markers: [{ location: [42.55357, -8.98981], size: 0.05 }],
        onRender: (state) => {
          state.phi = phi.current;
          if (!pause.current) {
            phi.current += 0.005;
          }
          state.width = width * 2;
          state.height = width * 2;
          state.offset = [0, width * 2.2];
        },
      });

      return () => {
        globe.destroy();
        window.removeEventListener("resize", onResize);
      };
    }
  }, [resolvedTheme]);

  return (
    <canvas
      onMouseEnter={() => (pause.current = true)}
      onMouseLeave={() => (pause.current = false)}
      ref={canvasRef}
      style={{
        width: "100%",
        height: 198,
        aspectRatio: 1,
        borderRadius: "1.5rem",
      }}
    />
  );
}
