import { gradientTemplate } from './gradient';
import { geometricTemplate } from './geometric';
import { overlayTemplate } from './overlay';
import { solidTemplate } from './solid';
import type { Template } from './types';

export const TEMPLATES: Template[] = [
  solidTemplate,
  gradientTemplate,
  geometricTemplate,
  overlayTemplate,
];

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
