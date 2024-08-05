import {Injectable} from '@angular/core';
import {MarkdownRendererExtension} from '@anglr/md-help';
import {MarkedExtension} from 'marked';
import {markedHighlight} from 'marked-highlight';
import hljs from 'highlight.js';

/**
 * Extension that adds highlight js code highlighting functionality
 */
@Injectable()
export class HighlightJsExtension implements MarkdownRendererExtension
{
    //######################### protected fields #########################

    /**
     * Value of marked extension to be used
     */
    protected ɵmarkedExtension: MarkedExtension;

    //######################### public properties - implementation of MarkdownRendererExtension #########################

    /**
     * @inheritdoc
     */
    public get markedExtension(): MarkedExtension
    {
        return this.ɵmarkedExtension;
    }

    //######################### constructor #########################
    constructor()
    {
        this.ɵmarkedExtension = markedHighlight(
        {
            langPrefix: 'hljs language-',
            highlight(code, lang) 
            {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';

                return hljs.highlight(code, {language}).value;
            }
        });
    }
}
