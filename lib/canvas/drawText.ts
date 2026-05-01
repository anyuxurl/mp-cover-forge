export type TextAlign = 'left' | 'center' | 'right';

export interface DrawTextOptions {
  x: number;
  y: number;
  maxWidth: number;
  font: string;
  color: string;
  align?: TextAlign;
  lineHeight?: number;
  maxLines?: number;
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const lines: string[] = [];
  let current = '';
  for (const ch of text) {
    if (ch === '\n') {
      lines.push(current);
      current = '';
      continue;
    }
    const candidate = current + ch;
    if (ctx.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = ch;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  opts: DrawTextOptions,
): { lines: string[]; height: number } {
  const align: TextAlign = opts.align ?? 'left';
  const lineHeight = opts.lineHeight ?? 1.3;

  ctx.save();
  ctx.font = opts.font;
  ctx.fillStyle = opts.color;
  ctx.textBaseline = 'top';
  ctx.textAlign = align;

  const fontSize = parseFontSize(opts.font);
  const lineSpacing = fontSize * lineHeight;
  let lines = wrapLines(ctx, text, opts.maxWidth);
  if (opts.maxLines && lines.length > opts.maxLines) {
    lines = lines.slice(0, opts.maxLines);
    const last = lines[lines.length - 1];
    let truncated = last;
    while (truncated.length > 1 && ctx.measureText(truncated + '…').width > opts.maxWidth) {
      truncated = truncated.slice(0, -1);
    }
    lines[lines.length - 1] = truncated + '…';
  }

  const anchorX =
    align === 'center'
      ? opts.x + opts.maxWidth / 2
      : align === 'right'
        ? opts.x + opts.maxWidth
        : opts.x;

  lines.forEach((line, i) => {
    ctx.fillText(line, anchorX, opts.y + i * lineSpacing);
  });

  ctx.restore();
  return { lines, height: lines.length * lineSpacing };
}

function parseFontSize(font: string): number {
  const match = font.match(/(\d+(?:\.\d+)?)px/);
  return match ? parseFloat(match[1]) : 16;
}
