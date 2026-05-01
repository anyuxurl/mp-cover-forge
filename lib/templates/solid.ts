import { drawTitleBlock } from '../canvas/textBlock';
import { DEFAULT_FONT } from './presets';
import type { Template } from './types';

export const solidTemplate: Template = {
  id: 'solid',
  name: '纯色',
  category: 'solid',
  paramSchema: [
    { kind: 'color', key: 'bg', label: '背景色', default: '#1f2937' },
    { kind: 'color', key: 'fg', label: '文字色', default: '#ffffff' },
    { kind: 'font', key: 'font', label: '字体', default: DEFAULT_FONT },
    { kind: 'text', key: 'title', label: '主标题', default: '标题' },
    { kind: 'text', key: 'subtitle', label: '副标题（可选）', default: '' },
  ],
  defaultParams: {
    bg: '#1f2937',
    fg: '#ffffff',
    font: DEFAULT_FONT,
    title: '欢迎关注',
    subtitle: '公众号 · 每周更新',
  },
  render: (ctx, region, bounds, params) => {
    ctx.fillStyle = params.bg;
    ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);

    drawTitleBlock(ctx, region, bounds, {
      title: params.title,
      subtitle: params.subtitle,
      color: params.fg,
      fontFamily: params.font || DEFAULT_FONT,
    });
  },
};
