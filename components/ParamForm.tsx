'use client';

import { useId } from 'react';
import { Upload, X } from 'lucide-react';
import { COLOR_PRESETS, FONT_PRESETS } from '@/lib/templates/presets';
import type { ParamField, TemplateParams } from '@/lib/templates/types';

interface ParamFormProps {
  schema: ParamField[];
  params: TemplateParams;
  onChange: (params: TemplateParams) => void;
}

export function ParamForm({ schema, params, onChange }: ParamFormProps) {
  const set = (key: string, value: string) => onChange({ ...params, [key]: value });

  return (
    <div className="space-y-3">
      {schema.map((field) => (
        <FieldRow key={field.key} field={field} value={params[field.key] ?? ''} onSet={set} />
      ))}
    </div>
  );
}

function FieldRow({
  field,
  value,
  onSet,
}: {
  field: ParamField;
  value: string;
  onSet: (key: string, value: string) => void;
}) {
  const id = useId();
  const labelClass = 'block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1';

  if (field.kind === 'text') {
    return (
      <div>
        <label htmlFor={id} className={labelClass}>
          {field.label}
        </label>
        {field.multiline ? (
          <textarea
            id={id}
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => onSet(field.key, e.target.value)}
            rows={2}
            className="w-full px-2.5 py-1.5 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-indigo-500"
          />
        ) : (
          <input
            id={id}
            type="text"
            value={value}
            placeholder={field.placeholder}
            onChange={(e) => onSet(field.key, e.target.value)}
            className="w-full px-2.5 py-1.5 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-indigo-500"
          />
        )}
      </div>
    );
  }

  if (field.kind === 'color') {
    const presets = field.presets ?? COLOR_PRESETS;
    const normalized = value.toLowerCase();
    return (
      <div>
        <label htmlFor={id} className={labelClass}>
          {field.label}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            id={id}
            type="color"
            value={value || '#000000'}
            onChange={(e) => onSet(field.key, e.target.value)}
            className="w-8 h-8 rounded-md border border-zinc-300 dark:border-zinc-700 cursor-pointer bg-transparent shrink-0"
            aria-label="自定义颜色"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onSet(field.key, e.target.value)}
            className="w-24 px-2 py-1 text-xs font-mono rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-indigo-500"
            placeholder="#rrggbb"
          />
          <div className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
            {presets.map((c) => {
              const active = c.toLowerCase() === normalized;
              return (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  title={c}
                  onClick={() => onSet(field.key, c)}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    active
                      ? 'ring-2 ring-offset-1 ring-indigo-500 dark:ring-offset-zinc-950 scale-110'
                      : 'ring-1 ring-zinc-200 dark:ring-zinc-700 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (field.kind === 'font') {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {FONT_PRESETS.map((font) => {
            const active = font.value === value;
            return (
              <button
                key={font.value}
                type="button"
                onClick={() => onSet(field.key, font.value)}
                className={`px-2.5 py-2 text-sm rounded-md border transition-colors ${
                  active
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-zinc-900 dark:text-zinc-100'
                    : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.kind === 'select') {
    return (
      <div>
        <label htmlFor={id} className={labelClass}>
          {field.label}
        </label>
        <select
          id={id}
          value={value}
          onChange={(e) => onSet(field.key, e.target.value)}
          className="w-full px-2.5 py-1.5 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-indigo-500"
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className={labelClass}>{field.label}</label>
      {value ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="w-full h-24 object-cover rounded-md border border-zinc-300 dark:border-zinc-700"
          />
          <button
            type="button"
            onClick={() => onSet(field.key, '')}
            className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-black/80"
            aria-label="移除图片"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="flex items-center justify-center gap-2 w-full h-20 rounded-md border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 cursor-pointer text-sm text-zinc-500"
        >
          <Upload className="w-4 h-4" />
          上传背景图
          <input
            id={id}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (file.size > 15 * 1024 * 1024) {
                alert('图片过大（>15MB）');
                return;
              }
              const reader = new FileReader();
              reader.onload = () => onSet(field.key, reader.result as string);
              reader.readAsDataURL(file);
              e.target.value = '';
            }}
          />
        </label>
      )}
    </div>
  );
}
