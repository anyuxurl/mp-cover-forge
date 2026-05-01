'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CANVAS_H, CANVAS_W, RECT_W } from '@/lib/canvas/constants';
import { composeCover, type RegionContent } from '@/lib/canvas/compose';

interface CoverPreviewProps {
  rectangle: RegionContent;
  square: RegionContent;
}

export interface CoverPreviewHandle {
  getCanvas: () => Promise<HTMLCanvasElement | null>;
}

export const CoverPreview = forwardRef<CoverPreviewHandle, CoverPreviewProps>(
  function CoverPreview({ rectangle, square }, ref) {
    const displayRef = useRef<HTMLCanvasElement | null>(null);
    const latestCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [error, setError] = useState<string | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        getCanvas: async () => {
          if (latestCanvasRef.current) return latestCanvasRef.current;
          try {
            const canvas = await composeCover({ rectangle, square });
            latestCanvasRef.current = canvas;
            return canvas;
          } catch (e) {
            console.error(e);
            return null;
          }
        },
      }),
      [rectangle, square],
    );

    useEffect(() => {
      let cancelled = false;
      setError(null);
      composeCover({ rectangle, square })
        .then((canvas) => {
          if (cancelled) return;
          latestCanvasRef.current = canvas;
          const display = displayRef.current;
          if (!display) return;
          display.width = CANVAS_W;
          display.height = CANVAS_H;
          const ctx = display.getContext('2d');
          if (!ctx) return;
          ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
          ctx.drawImage(canvas, 0, 0);
        })
        .catch((e) => {
          if (cancelled) return;
          console.error(e);
          setError(e instanceof Error ? e.message : String(e));
        });
      return () => {
        cancelled = true;
      };
    }, [rectangle, square]);

    return (
      <div className="space-y-3">
        <div className="relative w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
          <canvas
            ref={displayRef}
            className="block w-full h-auto"
            style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 border-r-2 border-dashed border-white/70 mix-blend-difference"
            style={{ left: `${(RECT_W / CANVAS_W) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            画布 {CANVAS_W}×{CANVAS_H} · 左 矩形主图 2.35:1 · 右 方形副图 1:1
          </span>
          {error && <span className="text-red-500">⚠ {error}</span>}
        </div>
      </div>
    );
  },
);
