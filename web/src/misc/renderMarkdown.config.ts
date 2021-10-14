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
     * Char map used for normalization of ids and anchor fragments
     */
    charMap?: Object;
    
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