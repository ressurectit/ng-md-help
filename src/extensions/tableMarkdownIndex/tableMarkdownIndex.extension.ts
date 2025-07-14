import {Injectable} from '@angular/core';
import {MarkedExtension, Tokens} from 'marked';

import {MarkdownRendererExtension} from '../../interfaces';

/**
 * Definition of indexed token, stores index of start of markdow represented by this token
 */
export interface IndexedToken extends Tokens.Table
{
    /**
     * Starting index in original markdown
     */
    index?: number;
}

/**
 * Extension that adds new `table markdown index` functionality, adding support for including start index and end index of markdown table into resulting html
 */
@Injectable()
export class TableMarkdownIndexExtension implements MarkdownRendererExtension
{
    //######################### protected fields e#########################

    /**
     * Value of marked extension to be used
     */
    protected ɵmarkedExtension: MarkedExtension;

    /**
     * Array of markdowns that are being processed
     */
    protected ɵMarkdownsQueue: string[] = [];

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
            async: true,
            renderer:
            {
                table(token: IndexedToken)
                {
                    let header = '';
                    let cell = '';

                    for (let j = 0; j < token.header.length; j++)
                    {
                        cell += this.tablecell(token.header[j]);
                    }

                    header += this.tablerow({ text: cell });

                    let body = '';

                    for (let j = 0; j < token.rows.length; j++)
                    {
                        const row = token.rows[j];
                        cell = '';

                        for (let k = 0; k < row.length; k++)
                        {
                            cell += this.tablecell(row[k]);
                        }

                        body += this.tablerow({ text: cell });
                    }

                    if (body)
                    {
                        body = `<tbody>${body}</tbody>`;
                    }

                    return `<table data-markdown-start="${token.index}" data-markdown-end="${(token.index ?? 0) + token.raw.length}">\n`
                    + '<thead>\n'
                    + header
                    + '</thead>\n'
                    + body
                    + '</table>\n';
                },
            },
            hooks:
            {
                preprocess: (markdown: string) =>
                {
                    this.ɵMarkdownsQueue.push(markdown);

                    return markdown;
                },
                processAllTokens: (tokens: (IndexedToken|Tokens.Generic)[]) =>
                {
                    const markdown = this.ɵMarkdownsQueue.shift();

                    if(markdown)
                    {
                        for(const token of tokens)
                        {
                            let index: number|undefined;

                            if(token.type == 'table' && (index = markdown.indexOf(token.raw)) >= 0)
                            {
                                token.index = index;
                            }
                        }
                    }

                    return tokens;
                },
            },
        };
    }
}
