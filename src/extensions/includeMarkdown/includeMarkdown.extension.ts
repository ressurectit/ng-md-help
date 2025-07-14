import {inject, Injectable, Injector, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {MarkedExtension, Token, Tokens} from 'marked';

import {MarkdownRendererExtension} from '../../interfaces';
import {MarkdownRenderer} from '../../services';

/**
 * Definition of include markdown token
 */
export interface IncludeMarkdown extends Tokens.Generic
{
    /**
     * Type that indicate that this token is 'includeMarkdown'
     */
    type: 'includeMarkdown';

    /**
     * Link to markdown document that should be downloaded
     */
    link: string;

    /**
     * Html to be rendered
     */
    html?: string;
}

/**
 * Extension that adds new `includeMarkdown` functionality, adding support for including other markdowns using links
 */
@Injectable()
export class IncludeMarkdownExtension implements MarkdownRendererExtension
{
    //######################### protected fields e#########################

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
        const http = inject(HttpClient);
        const injector = inject(Injector);
        let markdownRenderer: MarkdownRenderer|null;

        this.ɵmarkedExtension = 
        {
            async: true,
            walkTokens: async (token) =>
            {
                if(token.type == 'includeMarkdown')
                {
                    if(!this.isBrowser)
                    {
                        return;
                    }

                    const includeToken = token as IncludeMarkdown;

                    try
                    {
                        const includeMd = await lastValueFrom(http.get(includeToken.link, {responseType: 'text'}));
    
                        markdownRenderer ??= injector.get(MarkdownRenderer);
    
                        if(includeMd)
                        {
                            includeToken.html = await markdownRenderer.transformMarkdown(includeMd);
                        }
                    }
                    catch(e)
                    {
                        if(e instanceof HttpErrorResponse)
                        {
                            if(e.status == 404)
                            {
                                includeToken.html = `<div>Include Markdown not found ${includeToken.link}</div>`;
                            }
                            else
                            {
                                includeToken.html = `<div>Include Markdown error link: '${includeToken.link}', error: ${e.status}, message: '${e.message}'</div>`;
                            }
                        }
                        else
                        {
                            includeToken.html = `<div>Include Markdown unexpected error: '${e}'</div>`;
                        }
                    }
                }
            },
            extensions:
            [
                {
                    name: 'includeMarkdown',
                    level: 'block',
                    start(src)
                    {
                        return src.match(/@INCLUDEMD/)?.index;
                    },
                    tokenizer(src: string, _tokens: Token[]): IncludeMarkdown|undefined
                    {
                        const rule = /^@INCLUDEMD#(.*?)@/;  // Regex for the complete token, anchor to string start
                        const match = rule.exec(src);

                        if(match)
                        {
                            const [raw, link] = match;

                            return {
                                type: 'includeMarkdown',
                                raw,
                                link,
                            };
                        }

                        return undefined;
                    },
                    renderer(token: Tokens.Generic|IncludeMarkdown)
                    {
                        const includeToken = token as IncludeMarkdown;

                        return includeToken.html ?? '';
                    }
                }
            ]
        };
    }
}
