import React, { useEffect, useRef } from 'react';

export default function SnowEffect({ enabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const flakeCount = Math.floor(Math.min(width, 1400) / 22);
    const flakes = [];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.8,
        d: Math.random() * flakeCount,
        vx: Math.random() * 0.6 - 0.3,
        vy: Math.random() * 0.8 + 0.5,
        opacity: Math.random() * 0.6 + 0.25,
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.005;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.y += f.vy;
        f.x += Math.sin(angle + f.d) * 0.4 + f.vx;

        if (f.y > height) {
          flakes[i] = {
            x: Math.random() * width,
            y: -5,
            r: f.r,
            d: f.d,
            vx: f.vx,
            vy: f.vy,
            opacity: f.opacity,
          };
        }

        if (f.x > width + 5) f.x = -5;
        if (f.x < -5) f.x = width + 5;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-700 opacity-90"
    />
  );
}
