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
     * Base url used for routing links
     */
    baseUrl?: string;

    /**
     * Path for static assets
     */
    assetsPathPrefix?: string;

    /**
     * Code renderer configuration
     */
    codeRenderers?: CodeRenderersConfig;
}