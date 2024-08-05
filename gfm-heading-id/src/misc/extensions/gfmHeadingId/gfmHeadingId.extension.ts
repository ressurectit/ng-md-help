import {Inject, Injectable, Optional} from '@angular/core';
import {MarkdownRendererExtension} from '@anglr/md-help';
import {MarkedExtension} from 'marked';
import {gfmHeadingId as gfmHeadingIdOriginal, GfmHeadingIdOptions} from 'marked-gfm-heading-id';

/**
 * Extension that adds github flavored markdown heading functionality
 */
@Injectable()
export class GfmHeadingIdExtension implements MarkdownRendererExtension
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
    constructor(@Inject({}) @Optional() options?: GfmHeadingIdOptions)
    {
        this.ɵmarkedExtension = gfmHeadingIdOriginal(options ?? undefined);
    }
}

/**
 * Factory for GfmHeadingIdExtension with options
 * @param options - Options to be used
 */
export function gfmHeadingIdExtension(options: GfmHeadingIdOptions): typeof GfmHeadingIdExtension
{
    return class _GfmHeadingId extends GfmHeadingIdExtension
    {
        //######################### constructor #########################
        constructor()
        {
            super(options);
        }
    };
}
