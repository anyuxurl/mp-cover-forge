import type { Bounds, RegionKind } from '../canvas/constants';

export type ParamField =
  | {
      kind: 'text';
      key: string;
      label: string;
      default: string;
      placeholder?: string;
      multiline?: boolean;
    }
  | { kind: 'color'; key: string; label: string; default: string; presets?: string[] }
  | {
      kind: 'select';
      key: string;
      label: string;
      default: string;
      options: { label: string; value: string }[];
    }
  | {
      kind: 'font';
      key: string;
      label: string;
      default: string;
    }
  | {
      kind: 'image';
      key: string;
      label: string;
    };

export type TemplateParams = Record<string, string>;

export interface Template {
  id: string;
  name: string;
  category: 'solid' | 'gradient' | 'geometric' | 'overlay';
  paramSchema: ParamField[];
  defaultParams: TemplateParams;
  render: (
    ctx: CanvasRenderingContext2D,
    region: RegionKind,
    bounds: Bounds,
    params: TemplateParams,
  ) => void | Promise<void>;
}

export function buildDefaultParams(template: Template): TemplateParams {
  const params: TemplateParams = { ...template.defaultParams };
  for (const field of template.paramSchema) {
    if (field.kind === 'image') {
      if (params[field.key] === undefined) params[field.key] = '';
    } else if (params[field.key] === undefined) {
      params[field.key] = String(field.default);
    }
  }
  return params;
}
