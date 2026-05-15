import { useEffect } from "react";

export const useMouseSpotlight = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "mouse-spotlight-style";
    style.textContent = `
      .mouse-spotlight-overlay {
        pointer-events: none;
        position: fixed;
        inset: 0;
        z-index: 9999;
        transition: opacity 0.3s ease;
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.className = "mouse-spotlight-overlay";
    overlay.id = "mouse-spotlight-overlay";
    document.body.appendChild(overlay);

    let mouseX = -999;
    let mouseY = -999;
    let rafId: number;

    const update = () => {
      overlay.style.background = `radial-gradient(
        600px circle at ${mouseX}px ${mouseY}px,
        rgba(124, 92, 252, 0.10),
        rgba(124, 92, 252, 0.04) 30%,
        transparent 65%
      )`;
      rafId = requestAnimationFrame(update);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      overlay.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      overlay.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
      overlay.remove();
      style.remove();
    };
  }, []);
};
