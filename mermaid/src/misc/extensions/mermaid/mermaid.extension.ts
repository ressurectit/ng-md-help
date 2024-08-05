import {inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {MarkdownRendererExtension} from '@anglr/md-help';
import {generateId} from '@jscrpt/common';
import mermaidObj from 'mermaid';
import {MarkedExtension, Token, Tokens} from 'marked';

//TODO: make it working on SSR if possible

/**
 * Definition of mermaid code token
 */
export interface MermaidCode extends Tokens.Code
{
    /**
     * Type that indicate that this token is 'code'
     */
    type: 'code';

    /**
     * Lang that indication that it is `mermaid` code
     */
    lang: 'mermaid';

    /**
     * Holds SVG that represents chart generated by mermaid
     */
    mermaid: string;
}

/**
 * Extension that adds mermaid functionality
 * 
 * IMPORTANT, if used together with other renderers for 'code', must be used as last
 */
export class MermaidExtension implements MarkdownRendererExtension
{
    //######################### protected fields #########################

    /**
     * Value of marked extension to be used
     */
    protected ɵmarkedExtension: MarkedExtension;

    /**
     * Indication whether is code running in browser
     */
    protected isBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID));

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
        this.ɵmarkedExtension =
        {
            useNewRenderer: true,
            async: true,
            walkTokens: async (token: Token|MermaidCode) =>
            {
                if(!this.isBrowser)
                {
                    return;
                }

                if(token.type == 'code' && token.lang == 'mermaid')
                {
                    const mermaidToken = token as MermaidCode;
                    const result = await mermaidObj.render(generateId(12), token.text);

                    mermaidToken.mermaid = result.svg;
                }
            },
            renderer:
            {
                code: (itm: Tokens.Code) =>
                {
                    if(itm.lang == 'mermaid')
                    {
                        if(!this.isBrowser)
                        {
                            return '';
                        }

                        const mermaidToken = itm as MermaidCode;

                        return mermaidToken.mermaid;
                    }

                    return false;
                }
            }
        };
    }
}
