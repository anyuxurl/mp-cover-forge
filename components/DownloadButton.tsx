'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';
import type { RefObject } from 'react';
import type { CoverPreviewHandle } from './CoverPreview';

interface DownloadButtonProps {
  previewRef: RefObject<CoverPreviewHandle | null>;
}

export function DownloadButton({ previewRef }: DownloadButtonProps) {
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const canvas = await previewRef.current?.getCanvas();
      if (!canvas) throw new Error('Canvas 未就绪');
      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png'),
      );
      if (!blob) throw new Error('导出失败');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const ts = new Date()
        .toISOString()
        .replace(/[-:T]/g, '')
        .slice(0, 14);
      a.href = url;
      a.download = `mp-cover-${ts}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={busy}
      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      <Download className="w-4 h-4" />
      {busy ? '导出中…' : '下载封面 PNG'}
    </button>
  );
}
