'use client';

import { useMemo, useRef, useState } from 'react';
import { CoverPreview, type CoverPreviewHandle } from '@/components/CoverPreview';
import { DownloadButton } from '@/components/DownloadButton';
import { RegionEditor } from '@/components/RegionEditor';
import { createInitialRegionState, regionToContent, type RegionState } from '@/lib/region';

export default function HomePage() {
  const [rectangle, setRectangle] = useState<RegionState>(() => createInitialRegionState());
  const [square, setSquare] = useState<RegionState>(() => createInitialRegionState());
  const previewRef = useRef<CoverPreviewHandle | null>(null);

  const rectangleContent = useMemo(() => regionToContent(rectangle), [rectangle]);
  const squareContent = useMemo(() => regionToContent(square), [square]);

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              MP Cover Forge
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              微信公众号图文封面 · 主图 + 副图二合一
            </p>
          </div>
          <a
            href="https://mp.weixin.qq.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-indigo-500 transition-colors"
          >
            打开公众号后台 ↗
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
          <div className="space-y-4">
            <RegionEditor
              kind="rectangle"
              title="矩形主图"
              subtitle="2.35 : 1（横版大图）"
              state={rectangle}
              onChange={setRectangle}
            />
            <RegionEditor
              kind="square"
              title="方形副图"
              subtitle="1 : 1（缩略方图）"
              state={square}
              onChange={setSquare}
            />
          </div>

          <div className="lg:sticky lg:top-6 self-start space-y-4">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  实时预览
                </h2>
                <span className="text-xs text-zinc-500">虚线为左右分界</span>
              </div>
              <CoverPreview
                ref={previewRef}
                rectangle={rectangleContent}
                square={squareContent}
              />
            </div>

            <DownloadButton previewRef={previewRef} />

            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <div className="font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                使用方法
              </div>
              <ol className="list-decimal list-inside space-y-1">
                <li>左侧分别为主图和副图选择来源（上传图片或使用模板，可混合）</li>
                <li>下载得到的 PNG 上传至公众号图文封面编辑器</li>
                <li>
                  大图模式：把裁剪框对准 <b>左侧 2.35:1</b> 区域
                </li>
                <li>
                  方图模式：把裁剪框对准 <b>右侧 1:1</b> 区域
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-xs text-zinc-400 dark:text-zinc-600">
        画布 2566×766 (2x) · 矩形 1800×766 + 方形 766×766
      </footer>
    </div>
  );
}
