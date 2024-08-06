import {inject, Injectable, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MarkdownRendererExtension} from '@anglr/md-help';
import {validHtmlId} from '@jscrpt/common';
import GithubSlugger from 'github-slugger';
import {MarkedExtension, Tokens} from 'marked';
import {Subscription} from 'rxjs';

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
    constructor()
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
            useNewRenderer: true,
            renderer:
            {
                heading({depth, text, tokens}: Tokens.Heading)
                {
                    return `<h${depth} id="${slugger.slug(validHtmlId(text))}">${this.parser.parseInline(tokens)}</h${depth}>`;
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
