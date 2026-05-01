'use client';

import type { RegionKind } from '@/lib/canvas/constants';
import { TEMPLATES, getTemplate } from '@/lib/templates';
import { buildDefaultParams, type TemplateParams } from '@/lib/templates/types';
import { ParamForm } from './ParamForm';
import { TemplateThumbnail } from './TemplateThumbnail';

interface TemplateSourceEditorProps {
  region: RegionKind;
  templateId: string;
  params: TemplateParams;
  onChange: (templateId: string, params: TemplateParams) => void;
}

export function TemplateSourceEditor({
  region,
  templateId,
  params,
  onChange,
}: TemplateSourceEditorProps) {
  const current = getTemplate(templateId) ?? TEMPLATES[0];

  const selectTemplate = (id: string) => {
    if (id === templateId) return;
    const tpl = getTemplate(id);
    if (!tpl) return;
    onChange(id, buildDefaultParams(tpl));
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">
          选择模板
        </div>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((tpl) => {
            const active = tpl.id === current.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => selectTemplate(tpl.id)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                  active
                    ? 'border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-900'
                    : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
              >
                <TemplateThumbnail
                  template={tpl}
                  region={region}
                  params={tpl.defaultParams}
                  className="block w-full"
                />
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs font-medium text-white bg-black/55">
                  {tpl.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">
          {current.name} · 参数
        </div>
        <ParamForm
          schema={current.paramSchema}
          params={params}
          onChange={(next) => onChange(current.id, next)}
        />
      </div>
    </div>
  );
}
