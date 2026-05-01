'use client';

import { useEffect, useRef } from 'react';
import type { Bounds, RegionKind } from '@/lib/canvas/constants';
import type { Template, TemplateParams } from '@/lib/templates/types';

interface TemplateThumbnailProps {
  template: Template;
  region: RegionKind;
  params: TemplateParams;
  className?: string;
}

const PREVIEW_W = 240;

export function TemplateThumbnail({
  template,
  region,
  params,
  className,
}: TemplateThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const aspect = region === 'rectangle' ? 900 / 383 : 1;
  const w = PREVIEW_W;
  const h = Math.round(PREVIEW_W / aspect);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    const bounds: Bounds = { x: 0, y: 0, w, h };
    const result = template.render(ctx, region, bounds, params);
    if (result instanceof Promise) {
      result.catch((e) => console.error('thumbnail render failed', e));
    }
  }, [template, region, params, w, h]);

  return <canvas ref={canvasRef} className={className} style={{ width: w, height: h }} />;
}
