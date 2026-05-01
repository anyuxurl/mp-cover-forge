'use client';

import { useCallback, useId, useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import { Upload, RotateCcw } from 'lucide-react';

interface ImageSourceEditorProps {
  aspect: number;
  imageDataUrl: string;
  croppedAreaPixels: Area | null;
  onChange: (imageDataUrl: string, croppedAreaPixels: Area | null) => void;
}

export function ImageSourceEditor({
  aspect,
  imageDataUrl,
  croppedAreaPixels,
  onChange,
}: ImageSourceEditorProps) {
  const inputId = useId();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleFile = useCallback(
    (file: File) => {
      if (file.size > 15 * 1024 * 1024) {
        alert('图片过大（>15MB），请压缩后再试');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string, null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      };
      reader.readAsDataURL(file);
    },
    [onChange],
  );

  const handleCropComplete = useCallback(
    (_: Area, areaPixels: Area) => {
      if (imageDataUrl) onChange(imageDataUrl, areaPixels);
    },
    [imageDataUrl, onChange],
  );

  if (!imageDataUrl) {
    return (
      <label
        htmlFor={inputId}
        className="flex flex-col items-center justify-center gap-2 w-full h-44 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 cursor-pointer transition-colors bg-zinc-50/50 dark:bg-zinc-900/40"
      >
        <Upload className="w-6 h-6 text-zinc-400" />
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          点击或拖拽图片上传
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          PNG / JPG / WebP，建议 ≤ 15MB
        </span>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
      </label>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className="relative w-full bg-zinc-900 rounded-lg overflow-hidden"
        style={{ aspectRatio: aspect }}
      >
        <Cropper
          image={imageDataUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
          initialCroppedAreaPixels={croppedAreaPixels ?? undefined}
          objectFit="contain"
          showGrid
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-zinc-500 dark:text-zinc-400 shrink-0">缩放</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="flex-1 accent-indigo-500"
        />
        <button
          type="button"
          onClick={() => onChange('', null)}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          重选
        </button>
      </div>
    </div>
  );
}
