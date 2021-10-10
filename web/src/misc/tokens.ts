import {InjectionToken} from '@angular/core';
import {Notifications} from '@anglr/common';

import {RenderMarkdownConfig} from './renderMarkdown.config';

/**
 * Injection token used for injecting render markdown config
 */
export const RENDER_MARKDOWN_CONFIG: InjectionToken<RenderMarkdownConfig> = new InjectionToken<RenderMarkdownConfig>('RENDER_MARKDOWN_CONFIG');

/**
 * Injection token used for injecting notifications service used in this md help package
 */
export const MD_HELP_NOTIFICATIONS: InjectionToken<Notifications> = new InjectionToken<Notifications>('MD_HELP_NOTIFICATIONS');