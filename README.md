# MP Cover Forge

> 微信公众号图文封面生成器 —— 让矩形主图和方形副图不再顾此失彼

公众号图文消息的封面要求**两张图来自同一上传图片的不同裁剪区域**：

- **矩形主图**（2.35 : 1）—— 文章列表 / 分享时的横版大图
- **方形副图**（1 : 1）—— 历史消息列表的缩略方图

这就经常出现"精心构图的横版大图，方图截不到合适内容；适合方图的部分，又破坏了横版构图"的尴尬。

**MP Cover Forge** 把两张图合二为一拼到同一画布的左右两侧，上传到公众号编辑器后分别在大图模式选左半区、方图模式选右半区，两全其美。

## 画布布局

```
┌─────────────────────┬────────────┐
│                     │            │
│    矩形主图          │  方形副图  │
│    1800 × 766       │  766 × 766 │
│   (2.35 : 1)        │  (1 : 1)   │
│                     │            │
└─────────────────────┴────────────┘
       总画布: 2566 × 766 (2x 高清 PNG)
```

## 功能特性

- **两个独立来源，可任意混搭**
  - 主图、副图各自独立选择"上传图片"或"使用模板"
  - 例：主图上传一张照片，副图用文字模板做品牌位
- **上传模式**：基于 react-easy-crop，支持任意比例图片裁剪 + 缩放
- **模板模式**：4 类预置模板
  - 纯色 + 文字
  - 渐变 + 文字（水平 / 垂直 / 对角）
  - 几何装饰（圆形 / 斜线 / 网格）
  - 图片占位 + 文字蒙层
- **细致的可定制性**
  - 12 种预设色 + 自定义 hex / 颜色选择器
  - 5 种字体可选：现代黑体 / 宋体 / 楷体 / 圆体 / 黑体
- **实时预览**：左右分界线可视化，所见即所得
- **一键导出**：2x 高清 PNG，文件名自动加时间戳

## 使用方法

### 本地运行

```bash
git clone https://github.com/anyuxurl/mp-cover-forge.git
cd mp-cover-forge
npm install
npm run dev
# 浏览器打开 http://localhost:3000
```

### 上传到公众号

1. 在工具内分别配置主图和副图
2. 点击"下载封面 PNG"得到 2566×766 的图
3. 进入公众号图文编辑器 → 上传该图作为封面
4. **大图模式**：把裁剪框对准 **左侧 2.35:1** 区域
5. **方图模式**：把裁剪框对准 **右侧 1:1** 区域

## 技术栈

- [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [react-easy-crop](https://github.com/ValentinH/react-easy-crop) —— 图片裁剪
- [lucide-react](https://lucide.dev) —— 图标
- HTML5 Canvas 2D API —— 全部合成在浏览器内完成，无需服务端

## 项目结构

```
mp-cover-forge/
├── app/
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 主页面
│   └── globals.css
├── components/
│   ├── RegionEditor.tsx          # 单 region 的来源切换器（核心组件）
│   ├── ImageSourceEditor.tsx     # 上传 + 裁剪
│   ├── TemplateSourceEditor.tsx  # 模板选择 + 参数表单
│   ├── ParamForm.tsx             # 参数字段渲染（含色板、字体选择）
│   ├── TemplateThumbnail.tsx     # 模板缩略图
│   ├── CoverPreview.tsx          # 实时预览画布
│   └── DownloadButton.tsx        # 导出 PNG
└── lib/
    ├── canvas/
    │   ├── constants.ts          # 画布尺寸常量
    │   ├── compose.ts            # 主合成器（核心）
    │   ├── drawImage.ts          # 图片绘制工具
    │   ├── drawText.ts           # 文字自动换行
    │   └── textBlock.ts          # 共用标题排版
    ├── templates/
    │   ├── types.ts              # Template 接口与字段类型
    │   ├── presets.ts            # 字体 / 颜色预设
    │   ├── solid.ts / gradient.ts / geometric.ts / overlay.ts
    │   └── index.ts              # 模板注册表
    └── region.ts                 # RegionState 状态模型
```

## 开发

```bash
npm run dev      # 开发服务器
npm run lint     # ESLint
npm run build    # 生产构建
npm start        # 跑生产构建
```

新增模板只需实现 `lib/templates/types.ts` 中的 `Template` 接口，并在 `lib/templates/index.ts` 注册即可。模板的 `paramSchema` 字段会自动在 UI 生成对应的表单控件。

## License

MIT
