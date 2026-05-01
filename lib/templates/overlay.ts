import { drawCoverImage } from '../canvas/drawImage';
import { drawTitleBlock } from '../canvas/textBlock';
import { DEFAULT_FONT } from './presets';
import type { Template } from './types';

export const overlayTemplate: Template = {
  id: 'overlay',
  name: '图片蒙层',
  category: 'overlay',
  paramSchema: [
    { kind: 'image', key: 'image', label: '背景图（可选）' },
    { kind: 'color', key: 'fallbackBg', label: '无图时背景', default: '#475569' },
    { kind: 'color', key: 'overlay', label: '蒙层色', default: '#000000' },
    {
      kind: 'select',
      key: 'opacity',
      label: '蒙层强度',
      default: '0.45',
      options: [
        { label: '弱 (25%)', value: '0.25' },
        { label: '中 (45%)', value: '0.45' },
        { label: '强 (65%)', value: '0.65' },
      ],
    },
    { kind: 'color', key: 'fg', label: '文字色', default: '#ffffff' },
    { kind: 'font', key: 'font', label: '字体', default: DEFAULT_FONT },
    { kind: 'text', key: 'title', label: '主标题', default: '标题' },
    { kind: 'text', key: 'subtitle', label: '副标题（可选）', default: '' },
  ],
  defaultParams: {
    image: '',
    fallbackBg: '#475569',
    overlay: '#000000',
    opacity: '0.45',
    fg: '#ffffff',
    font: DEFAULT_FONT,
    title: '深度阅读',
    subtitle: '一周精选',
  },
  render: async (ctx, region, bounds, params) => {
    if (params.image) {
      try {
        await drawCoverImage(ctx, params.image, bounds);
      } catch {
        ctx.fillStyle = params.fallbackBg;
        ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
      }
    } else {
      ctx.fillStyle = params.fallbackBg;
      ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
    }

    ctx.save();
    ctx.globalAlpha = parseFloat(params.opacity) || 0.45;
    ctx.fillStyle = params.overlay;
    ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
    ctx.restore();

    drawTitleBlock(ctx, region, bounds, {
      title: params.title,
      subtitle: params.subtitle,
      color: params.fg,
      fontFamily: params.font || DEFAULT_FONT,
    });
  },
};
