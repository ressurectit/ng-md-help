import {MarkedExtension} from 'marked';

/**
 * Definition of markdown renderer extension
 */
export interface MarkdownRendererExtension
{
    /**
     * Gets marked extension to be used
     */
    readonly markedExtension: MarkedExtension;
}
