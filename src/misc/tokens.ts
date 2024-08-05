import {InjectionToken} from '@angular/core';

import {MarkdownRendererExtension} from '../interfaces';

/**
 * Injection token used for injecting markdown renderer extensions used for processing markdown
 */
export const MARKDOWN_RENDERER_EXTENSIONS: InjectionToken<MarkdownRendererExtension[]> = new InjectionToken<MarkdownRendererExtension[]>('MARKDOWN_RENDERER_EXTENSIONS', {providedIn: 'root', factory: () => ([])});
