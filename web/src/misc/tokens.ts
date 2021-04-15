import {InjectionToken} from '@angular/core';

import {RenderMarkdownConfig} from './renderMarkdown.config';

/**
 * Injection token used for injecting render markdown config
 */
export const RENDER_MARKDOWN_CONFIG: InjectionToken<RenderMarkdownConfig> = new InjectionToken<RenderMarkdownConfig>('RENDER_MARKDOWN_CONFIG');