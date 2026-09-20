"use client";

import React, { useEffect, useRef } from "react";

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isInputHovered = false;

    const state = {
      x: -100,
      y: -100,
      tx: -100,
      ty: -100,
      size: 11,
      tsize: 11,
      alpha: 0,
      talpha: 0,
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const show = () => {
      state.talpha = 1;
      document.documentElement.classList.add("has-gl-cursor");
    };

    const hide = () => {
      state.talpha = 0;
      document.documentElement.classList.remove("has-gl-cursor");
    };

    const setCoords = (clientX: number, clientY: number, instant = false) => {
      if (typeof clientX !== "number" || typeof clientY !== "number") return;
      state.tx = clientX;
      state.ty = clientY;
      if (instant || (state.alpha === 0 && state.talpha === 0)) {
        state.x = clientX;
        state.y = clientY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      setCoords(e.clientX, e.clientY, true);
      const isCircleBtn = !!(e.target as HTMLElement)?.closest?.(".circle-btn");
      if (isCircleBtn) {
        state.tsize = 0;
        state.talpha = 0;
        return;
      }
      if (!isInputHovered) {
        show();
      }
      const isClickable = !!(e.target as HTMLElement)?.closest?.(
        'a, button, [role="button"], summary, .proj-card-modern, .serv-bento-card, .pill'
      );
      state.tsize = isClickable ? 48 : 14;
    };

    const handlePointerMove = (e: PointerEvent) => {
      setCoords(e.clientX, e.clientY, false);
      const isCircleBtn = !!(e.target as HTMLElement)?.closest?.(".circle-btn");
      if (isCircleBtn) {
        state.tsize = 0;
        state.talpha = 0;
        return;
      }
      if (!isInputHovered) {
        show();
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      setCoords(e.clientX, e.clientY, false);

      const isCircleBtn = !!target.closest?.(".circle-btn");
      if (isCircleBtn) {
        state.tsize = 0;
        state.talpha = 0;
        return;
      }

      isInputHovered = !!target.closest?.("input, textarea, select");
      if (isInputHovered) {
        hide();
      } else {
        show();
      }

      const isClickable = !!target.closest?.(
        'a, button, [role="button"], summary, .proj-card-modern, .serv-bento-card, .pill'
      );
      state.tsize = isClickable ? 48 : 11;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        setTimeout(() => {
          state.talpha = 0;
        }, 500);
      }
    };

    const handlePointerLeave = () => {
      hide();
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    const render = () => {
      const posLerp = 0.82;
      const sizeLerp = 0.45;
      const alphaLerp = 0.35;

      state.x += (state.tx - state.x) * posLerp;
      state.y += (state.ty - state.y) * posLerp;
      state.size += (state.tsize - state.size) * sizeLerp;
      state.alpha += (state.talpha - state.alpha) * alphaLerp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (state.alpha > 0.01) {
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${state.alpha})`;
        ctx.beginPath();
        ctx.arc(state.x, state.y, state.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      document.documentElement.classList.remove("has-gl-cursor");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[200] mix-blend-difference"
      aria-hidden="true"
    />
  );
}

export default CustomCursor;
