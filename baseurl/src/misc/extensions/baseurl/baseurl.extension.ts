import {Inject, Injectable, Optional} from '@angular/core';
import {MarkdownRendererExtension} from '@anglr/md-help';
import {MarkedExtension} from 'marked';
import {baseUrl} from 'marked-base-url';

/**
 * Extension that adds baseUrl functionality for relative links
 */
@Injectable()
export class BaseUrlExtension implements MarkdownRendererExtension
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
    constructor(@Inject({}) @Optional() baseUrlValue?: string)
    {
        this.ɵmarkedExtension = baseUrl(baseUrlValue ?? '');
    }
}

/**
 * Factory for BaseUrlExtension with baseUrl parameter
 * @param baseUrlValue - Base url value to be used
 */
export function baseUrlExtension(baseUrlValue: string): typeof BaseUrlExtension
{
    @Injectable()
    class _BaseUrlExtension extends BaseUrlExtension
    {
        //######################### constructor #########################
        constructor()
        {
            super(baseUrlValue);
        }
    }

    return _BaseUrlExtension;
}