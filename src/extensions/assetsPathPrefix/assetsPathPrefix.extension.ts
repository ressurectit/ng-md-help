import {Inject, Injectable, Optional} from '@angular/core';
import {MarkedExtension, Tokens} from 'marked';

import {MarkdownRendererExtension} from '../../interfaces';

/**
 * Extension that adds assets path prefix functionality to images links
 */
@Injectable()
export class AssetsPathPrefixExtension implements MarkdownRendererExtension
{
    //######################### protected fields e#########################

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
    constructor(@Inject({}) @Optional() assetsPathPrefix?: string)
    {
        this.ɵmarkedExtension = 
        {
            async: true,
            renderer:
            {
                image: ({href, text}: Tokens.Image) =>
                {
                    href ??= '';

                    if(href.indexOf('http') === 0 || href.indexOf('data:image') > -1)
                    {
                        return `<img src="${href}" alt="${text}">`;
                    }
            
                    return `<img src="${assetsPathPrefix ?? ''}${href}" alt="${text}">`;
                }
            }
        };
    }
}

/**
 * Factory for AssetsPathPrefixExtension with options
 * @param assetsPathPrefix - Path prefix to assets
 */
export function assetsPathPrefixExtension(assetsPathPrefix: string): typeof AssetsPathPrefixExtension
{
    @Injectable()
    class _AssetsPathPrefixExtension extends AssetsPathPrefixExtension
    {
        //######################### constructor #########################
        constructor()
        {
            super(assetsPathPrefix);
        }
    }

    return _AssetsPathPrefixExtension;
}
