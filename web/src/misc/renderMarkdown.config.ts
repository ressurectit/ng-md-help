import {CodeRenderer} from './codeRenderers/codeRenderer.interface';

/**
 * Code renderers configuration
 */
export interface CodeRenderersConfig
{
    [language: string]: CodeRenderer;
}

/**
 * Config for render markdown function
 */
export interface RenderMarkdownConfig
{
    /**
     * Code renderer configuration
     */
    codeRenderers?: CodeRenderersConfig;
}