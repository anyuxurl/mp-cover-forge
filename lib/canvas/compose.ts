import { getTemplate } from '../templates';
import {
  type Bounds,
  CANVAS_H,
  CANVAS_W,
  RECT_BOUNDS,
  type RegionKind,
  SQUARE_BOUNDS,
} from './constants';
import { drawCroppedImage, type CropArea } from './drawImage';

export type RegionContent =
  | {
      kind: 'image';
      imageDataUrl: string;
      croppedAreaPixels: CropArea | null;
    }
  | {
      kind: 'template';
      templateId: string;
      params: Record<string, string>;
    };

export interface ComposeInput {
  rectangle: RegionContent;
  square: RegionContent;
}

export async function composeCover(input: ComposeInput): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D context');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  await drawRegion(ctx, 'rectangle', RECT_BOUNDS, input.rectangle);
  await drawRegion(ctx, 'square', SQUARE_BOUNDS, input.square);

  return canvas;
}

async function drawRegion(
  ctx: CanvasRenderingContext2D,
  kind: RegionKind,
  bounds: Bounds,
  content: RegionContent,
): Promise<void> {
  if (content.kind === 'image') {
    if (content.imageDataUrl) {
      try {
        await drawCroppedImage(ctx, content.imageDataUrl, content.croppedAreaPixels, bounds);
        return;
      } catch (e) {
        console.error('Failed to draw image:', e);
      }
    }
    drawPlaceholder(ctx, kind, bounds);
    return;
  }

  const tpl = getTemplate(content.templateId);
  if (!tpl) {
    drawPlaceholder(ctx, kind, bounds, '模板未找到');
    return;
  }
  await tpl.render(ctx, kind, bounds, content.params);
}

function drawPlaceholder(
  ctx: CanvasRenderingContext2D,
  kind: RegionKind,
  bounds: Bounds,
  label?: string,
): void {
  ctx.save();
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);

  ctx.strokeStyle = '#d1d5db';
  ctx.lineWidth = 4;
  ctx.setLineDash([16, 12]);
  ctx.strokeRect(bounds.x + 4, bounds.y + 4, bounds.w - 8, bounds.h - 8);
  ctx.setLineDash([]);

  ctx.fillStyle = '#9ca3af';
  ctx.font = `500 ${bounds.h * 0.08}px "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    label ?? `${kind === 'rectangle' ? '矩形主图' : '方形副图'} · 等待内容`,
    bounds.x + bounds.w / 2,
    bounds.y + bounds.h / 2,
  );
  ctx.restore();
}
