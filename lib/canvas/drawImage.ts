import type { Bounds } from './constants';

export async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

export type CropArea = { x: number; y: number; width: number; height: number };

export async function drawCroppedImage(
  ctx: CanvasRenderingContext2D,
  src: string,
  crop: CropArea | null,
  bounds: Bounds,
): Promise<void> {
  const img = await loadImage(src);
  const sx = crop ? crop.x : 0;
  const sy = crop ? crop.y : 0;
  const sw = crop ? crop.width : img.naturalWidth;
  const sh = crop ? crop.height : img.naturalHeight;

  ctx.save();
  ctx.beginPath();
  ctx.rect(bounds.x, bounds.y, bounds.w, bounds.h);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh, bounds.x, bounds.y, bounds.w, bounds.h);
  ctx.restore();
}

export async function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  src: string,
  bounds: Bounds,
): Promise<void> {
  const img = await loadImage(src);
  const targetRatio = bounds.w / bounds.h;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (imgRatio > targetRatio) {
    sw = img.naturalHeight * targetRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / targetRatio;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.save();
  ctx.beginPath();
  ctx.rect(bounds.x, bounds.y, bounds.w, bounds.h);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh, bounds.x, bounds.y, bounds.w, bounds.h);
  ctx.restore();
}
