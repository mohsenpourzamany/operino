import { useEffect, useRef, type ReactNode } from "react";
import "../App.css";

interface OperinoBgProps {
  children?: ReactNode;
}

export default function OperinoBg({ children }: OperinoBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS = 90;
    const ROWS = 28;
    let t = 0;

    const resize = (): void => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const wave = (x: number, row: number, time: number): number => {
      const norm = x / canvas.width;
      return (
        Math.sin(norm * 10 + time * 0.7 + row * 0.4) * 22 +
        Math.sin(norm * 6 - time * 0.5 + row * 0.3) * 14 +
        Math.sin(norm * 3 + time * 0.3) * 8
      );
    };

    const lerp = (a: number, b: number, factor: number): number =>
      a + (b - a) * factor;

    const draw = (): void => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = (c / (COLS - 1)) * W;
          const baseY = H * 0.52 + r * ((H * 0.48) / ROWS);
          const y = baseY + wave(x, r, t);
          const norm = x / W;
          const r2 = r / ROWS;

          const rC = Math.round(lerp(180, 40, norm));
          const gC = Math.round(lerp(60, 160, norm));
          const alpha = (0.55 - r2 * 0.4).toFixed(2);
          const size = (1 - r2) * 2.2 + 0.4;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rC},${gC},255,${alpha})`;
          ctx.fill();
        }
      }

      for (let row = 0; row < 3; row++) {
        ctx.beginPath();
        for (let c = 0; c < COLS; c++) {
          const x = (c / (COLS - 1)) * W;
          const baseY = H * 0.48 + row * (H * 0.18);
          const y = baseY + wave(x, row, t);
          if (c === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        const norm = row / 3;
        const rC = Math.round(lerp(220, 40, norm));
        const gC = Math.round(lerp(60, 160, norm));
        const alpha = (0.5 - row * 0.12).toFixed(2);
        ctx.strokeStyle = `rgba(${rC},${gC},255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      t += 0.012;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="operino-bg">
      <canvas ref={canvasRef} className="operino-bg__canvas" />
      <div className="operino-bg__content">{children}</div>
    </div>
  );
}
