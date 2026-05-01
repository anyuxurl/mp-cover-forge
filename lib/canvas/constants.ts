export const SCALE = 2;

export const RECT_W = 900 * SCALE;
export const RECT_H = 383 * SCALE;
export const SQUARE_SIZE = 383 * SCALE;

export const CANVAS_W = RECT_W + SQUARE_SIZE;
export const CANVAS_H = RECT_H;

export const RECT_BOUNDS = { x: 0, y: 0, w: RECT_W, h: RECT_H };
export const SQUARE_BOUNDS = { x: RECT_W, y: 0, w: SQUARE_SIZE, h: SQUARE_SIZE };

export type Bounds = { x: number; y: number; w: number; h: number };
export type RegionKind = 'rectangle' | 'square';

export const REGION_ASPECT: Record<RegionKind, number> = {
  rectangle: RECT_W / RECT_H,
  square: 1,
};

export const REGION_BOUNDS: Record<RegionKind, Bounds> = {
  rectangle: RECT_BOUNDS,
  square: SQUARE_BOUNDS,
};
