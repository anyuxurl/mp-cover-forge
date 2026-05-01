import type { Area } from 'react-easy-crop';
import type { RegionContent } from './canvas/compose';
import { TEMPLATES } from './templates';
import { buildDefaultParams, type TemplateParams } from './templates/types';

export type SourceKind = 'image' | 'template';

export interface ImageSourceState {
  imageDataUrl: string;
  croppedAreaPixels: Area | null;
}

export interface TemplateSourceState {
  templateId: string;
  params: TemplateParams;
}

export interface RegionState {
  source: SourceKind;
  image: ImageSourceState;
  template: TemplateSourceState;
}

export function createInitialRegionState(): RegionState {
  const first = TEMPLATES[0];
  return {
    source: 'template',
    image: { imageDataUrl: '', croppedAreaPixels: null },
    template: {
      templateId: first.id,
      params: buildDefaultParams(first),
    },
  };
}

export function regionToContent(state: RegionState): RegionContent {
  if (state.source === 'image') {
    return {
      kind: 'image',
      imageDataUrl: state.image.imageDataUrl,
      croppedAreaPixels: state.image.croppedAreaPixels,
    };
  }
  return {
    kind: 'template',
    templateId: state.template.templateId,
    params: state.template.params,
  };
}
