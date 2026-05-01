export const FONT_PRESETS: { label: string; value: string }[] = [
  {
    label: '现代黑体',
    value:
      '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif',
  },
  {
    label: '宋体',
    value: '"Songti SC", "STSong", "SimSun", "Noto Serif CJK SC", "Source Han Serif SC", serif',
  },
  {
    label: '楷体',
    value: '"Kaiti SC", "STKaiti", "KaiTi", "楷体", "STKaitiSC-Regular", serif',
  },
  {
    label: '圆体',
    value:
      '"Yuanti SC", "Hiragino Sans GB", "PingFang SC", "Microsoft YaHei", sans-serif',
  },
  {
    label: '黑体',
    value: '"Heiti SC", "STHeiti", "黑体", "Microsoft YaHei", sans-serif',
  },
];

export const DEFAULT_FONT = FONT_PRESETS[0].value;

export const COLOR_PRESETS: string[] = [
  '#ffffff',
  '#000000',
  '#1f2937',
  '#475569',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#a855f7',
  '#ec4899',
];
