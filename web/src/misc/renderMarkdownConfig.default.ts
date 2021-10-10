import {RenderMarkdownConfig} from './renderMarkdown.config';
import {HighlightJsCodeRenderer} from './codeRenderers/highlightJsRenderer';

/**
 * Default config for render markdown
 */
export const DEFAULT_RENDER_MARKDOWN_CONFIG: RenderMarkdownConfig =
{
    codeRenderers:
    {
        _: HighlightJsCodeRenderer
    }
};