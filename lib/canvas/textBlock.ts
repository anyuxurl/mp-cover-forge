import type { Bounds, RegionKind } from './constants';
import { drawWrappedText } from './drawText';

export interface TitleBlockOptions {
  title: string;
  subtitle?: string;
  color: string;
  fontFamily: string;
}

/**
 * Shared title + subtitle layout for all templates.
 * - Rectangle region: left-aligned with bigger title.
 * - Square region: center-aligned with proportionally smaller title.
 */
export function drawTitleBlock(
  ctx: CanvasRenderingContext2D,
  region: RegionKind,
  bounds: Bounds,
  opts: TitleBlockOptions,
): void {
  const { title, subtitle, color, fontFamily } = opts;
  if (!title || !title.trim()) return;

  const isRect = region === 'rectangle';
  const padding = bounds.w * 0.07;
  const innerW = bounds.w - padding * 2;
  const titleSize = isRect ? bounds.h * 0.22 : bounds.h * 0.16;
  const subSize = titleSize * 0.5;
  const align = isRect ? 'left' : 'center';

  const trimmedSub = subtitle?.trim() ?? '';
  const hasSub = trimmedSub.length > 0;

  const estTitleLines = Math.min(2, Math.max(1, Math.ceil(title.length / 12)));
  const totalH =
    titleSize * 1.3 * estTitleLines + (hasSub ? subSize * 1.4 + 18 : 0);
  const startY = bounds.y + (bounds.h - totalH) / 2;

  const { height: titleH } = drawWrappedText(ctx, title, {
    x: bounds.x + padding,
    y: startY,
    maxWidth: innerW,
    font: `700 ${titleSize}px ${fontFamily}`,
    color,
    align,
    maxLines: 2,
  });

  if (hasSub) {
    drawWrappedText(ctx, trimmedSub, {
      x: bounds.x + padding,
      y: startY + titleH + 18,
      maxWidth: innerW,
      font: `400 ${subSize}px ${fontFamily}`,
      color,
      align,
      maxLines: 1,
    });
  }
}
