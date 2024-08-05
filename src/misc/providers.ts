import {ClassProvider, Provider, Type} from '@angular/core';

import {MarkdownRendererExtension} from '../interfaces';
import {MARKDOWN_RENDERER_EXTENSIONS} from './tokens';

/**
 * Provides markdown renderer extensions
 * @param extensions - Extensions to be used withing markdown renderer
 */
export function provideMarkdownRendererExtensions(...extensions: Type<MarkdownRendererExtension>[]): Provider
{
    return extensions.map(extension =>
    {
        return <ClassProvider> {
            provide: MARKDOWN_RENDERER_EXTENSIONS,
            useClass: extension,
            multi: true,
        };
    });
}
