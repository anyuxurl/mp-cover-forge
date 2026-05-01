'use client';

import { Image as ImageIcon, LayoutTemplate } from 'lucide-react';
import { REGION_ASPECT, type RegionKind } from '@/lib/canvas/constants';
import type { RegionState, SourceKind } from '@/lib/region';
import { ImageSourceEditor } from './ImageSourceEditor';
import { TemplateSourceEditor } from './TemplateSourceEditor';

interface RegionEditorProps {
  kind: RegionKind;
  title: string;
  subtitle: string;
  state: RegionState;
  onChange: (next: RegionState) => void;
}

const TABS: { id: SourceKind; label: string; Icon: typeof ImageIcon }[] = [
  { id: 'image', label: '上传图片', Icon: ImageIcon },
  { id: 'template', label: '使用模板', Icon: LayoutTemplate },
];

export function RegionEditor({ kind, title, subtitle, state, onChange }: RegionEditorProps) {
  const setSource = (source: SourceKind) => onChange({ ...state, source });

  return (
    <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
      <header className="mb-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
          <span className="text-xs text-zinc-500">{subtitle}</span>
        </div>
      </header>

      <div className="inline-flex p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 mb-4">
        {TABS.map(({ id, label, Icon }) => {
          const active = state.source === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSource(id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                active
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          );
        })}
      </div>

      {state.source === 'image' ? (
        <ImageSourceEditor
          aspect={REGION_ASPECT[kind]}
          imageDataUrl={state.image.imageDataUrl}
          croppedAreaPixels={state.image.croppedAreaPixels}
          onChange={(imageDataUrl, croppedAreaPixels) =>
            onChange({ ...state, image: { imageDataUrl, croppedAreaPixels } })
          }
        />
      ) : (
        <TemplateSourceEditor
          region={kind}
          templateId={state.template.templateId}
          params={state.template.params}
          onChange={(templateId, params) =>
            onChange({ ...state, template: { templateId, params } })
          }
        />
      )}
    </section>
  );
}
