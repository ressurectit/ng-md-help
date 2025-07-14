import {Inject, inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {validHtmlId} from '@jscrpt/common';
import GithubSlugger from 'github-slugger';
import {MarkedExtension, Tokens} from 'marked';
import {Subscription} from 'rxjs';

import {MarkdownRendererExtension} from '../../interfaces';

/**
 * Extension that adds github flavored markdown heading functionality
 */
@Injectable()
export class GfmHeadingIdExtension implements MarkdownRendererExtension, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Value of marked extension to be used
     */
    protected ɵmarkedExtension: MarkedExtension;

    /**
     * Github sluggers for IDs
     */
    protected slugger: GithubSlugger = new GithubSlugger();

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription;

    //######################### public properties - implementation of MarkdownRendererExtension #########################

    /**
     * @inheritdoc
     */
    public get markedExtension(): MarkedExtension
    {
        return this.ɵmarkedExtension;
    }

    //######################### constructor #########################
    constructor(@Inject({}) @Optional() withLinks?: boolean)
    {
        const route = inject(Router);

        this.initSubscriptions = route.events.subscribe(event =>
        {
            if(event instanceof NavigationEnd)
            {
                this.slugger.reset();
            }
        });

        const slugger = this.slugger;

        this.ɵmarkedExtension =
        {
            async: true,
            renderer:
            {
                heading({depth, text, tokens}: Tokens.Heading)
                {
                    const id = slugger.slug(validHtmlId(text));
                    const link = `<a class="heading-anchor" href="${id}"><svg class="anchor-svg" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg></a>`;

                    return `<div class="relative"><h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>${withLinks ? link : ''}</div>`;
                }
            }
        };
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
    }
}

/**
 * Factory for GfmHeadingIdExtension with withLink parameter
 * @param withLinks - Indication whether display link with headings
 */
export function gfmHeadingIdExtension(withLinks: boolean): typeof GfmHeadingIdExtension
{
    @Injectable()
    class _GfmHeadingIdExtension extends GfmHeadingIdExtension
    {
        //######################### constructor #########################
        constructor()
        {
            super(withLinks);
        }
    }

    return _GfmHeadingIdExtension;
}