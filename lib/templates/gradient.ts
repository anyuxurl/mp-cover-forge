import { drawTitleBlock } from '../canvas/textBlock';
import { DEFAULT_FONT } from './presets';
import type { Template } from './types';

export const gradientTemplate: Template = {
  id: 'gradient',
  name: '渐变',
  category: 'gradient',
  paramSchema: [
    { kind: 'color', key: 'c1', label: '颜色 A', default: '#6366f1' },
    { kind: 'color', key: 'c2', label: '颜色 B', default: '#ec4899' },
    {
      kind: 'select',
      key: 'direction',
      label: '渐变方向',
      default: 'diagonal',
      options: [
        { label: '水平', value: 'horizontal' },
        { label: '垂直', value: 'vertical' },
        { label: '对角', value: 'diagonal' },
      ],
    },
    { kind: 'color', key: 'fg', label: '文字色', default: '#ffffff' },
    { kind: 'font', key: 'font', label: '字体', default: DEFAULT_FONT },
    { kind: 'text', key: 'title', label: '主标题', default: '标题' },
    { kind: 'text', key: 'subtitle', label: '副标题（可选）', default: '' },
  ],
  defaultParams: {
    c1: '#6366f1',
    c2: '#ec4899',
    direction: 'diagonal',
    fg: '#ffffff',
    font: DEFAULT_FONT,
    title: '科技与设计',
    subtitle: '探索未来',
  },
  render: (ctx, region, bounds, params) => {
    let gradient: CanvasGradient;
    if (params.direction === 'horizontal') {
      gradient = ctx.createLinearGradient(bounds.x, bounds.y, bounds.x + bounds.w, bounds.y);
    } else if (params.direction === 'vertical') {
      gradient = ctx.createLinearGradient(bounds.x, bounds.y, bounds.x, bounds.y + bounds.h);
    } else {
      gradient = ctx.createLinearGradient(
        bounds.x,
        bounds.y,
        bounds.x + bounds.w,
        bounds.y + bounds.h,
      );
    }
    gradient.addColorStop(0, params.c1);
    gradient.addColorStop(1, params.c2);
    ctx.fillStyle = gradient;
    ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);

    drawTitleBlock(ctx, region, bounds, {
      title: params.title,
      subtitle: params.subtitle,
      color: params.fg,
      fontFamily: params.font || DEFAULT_FONT,
    });
  },
};
