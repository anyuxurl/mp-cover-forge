import { drawTitleBlock } from '../canvas/textBlock';
import { DEFAULT_FONT } from './presets';
import type { Template } from './types';

export const geometricTemplate: Template = {
  id: 'geometric',
  name: '几何装饰',
  category: 'geometric',
  paramSchema: [
    { kind: 'color', key: 'bg', label: '背景色', default: '#0f172a' },
    { kind: 'color', key: 'accent', label: '装饰色', default: '#38bdf8' },
    { kind: 'color', key: 'fg', label: '文字色', default: '#f8fafc' },
    {
      kind: 'select',
      key: 'shape',
      label: '装饰形状',
      default: 'circles',
      options: [
        { label: '圆形', value: 'circles' },
        { label: '斜线', value: 'stripes' },
        { label: '网格', value: 'grid' },
      ],
    },
    { kind: 'font', key: 'font', label: '字体', default: DEFAULT_FONT },
    { kind: 'text', key: 'title', label: '主标题', default: '标题' },
    { kind: 'text', key: 'subtitle', label: '副标题（可选）', default: '' },
  ],
  defaultParams: {
    bg: '#0f172a',
    accent: '#38bdf8',
    fg: '#f8fafc',
    shape: 'circles',
    font: DEFAULT_FONT,
    title: '几何之美',
    subtitle: 'Design Weekly',
  },
  render: (ctx, region, bounds, params) => {
    ctx.save();
    ctx.beginPath();
    ctx.rect(bounds.x, bounds.y, bounds.w, bounds.h);
    ctx.clip();

    ctx.fillStyle = params.bg;
    ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);

    ctx.fillStyle = params.accent;
    ctx.strokeStyle = params.accent;

    const unit = Math.min(bounds.w, bounds.h);
    if (params.shape === 'circles') {
      ctx.globalAlpha = 0.18;
      ctx.beginPath();
      ctx.arc(bounds.x + bounds.w * 0.85, bounds.y + bounds.h * 0.2, unit * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      ctx.arc(bounds.x + bounds.w * 0.1, bounds.y + bounds.h * 0.95, unit * 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    } else if (params.shape === 'stripes') {
      ctx.globalAlpha = 0.12;
      ctx.lineWidth = unit * 0.04;
      const step = unit * 0.18;
      for (let i = -bounds.h; i < bounds.w + bounds.h; i += step) {
        ctx.beginPath();
        ctx.moveTo(bounds.x + i, bounds.y);
        ctx.lineTo(bounds.x + i + bounds.h, bounds.y + bounds.h);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    } else {
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = unit * 0.005;
      const step = unit * 0.12;
      for (let x = 0; x <= bounds.w; x += step) {
        ctx.beginPath();
        ctx.moveTo(bounds.x + x, bounds.y);
        ctx.lineTo(bounds.x + x, bounds.y + bounds.h);
        ctx.stroke();
      }
      for (let y = 0; y <= bounds.h; y += step) {
        ctx.beginPath();
        ctx.moveTo(bounds.x, bounds.y + y);
        ctx.lineTo(bounds.x + bounds.w, bounds.y + y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    ctx.restore();

    drawTitleBlock(ctx, region, bounds, {
      title: params.title,
      subtitle: params.subtitle,
      color: params.fg,
      fontFamily: params.font || DEFAULT_FONT,
    });
  },
};
