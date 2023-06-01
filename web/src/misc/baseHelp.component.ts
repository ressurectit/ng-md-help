import {AfterViewInit, ElementRef, ViewChild, HostListener, Inject, PLATFORM_ID, Optional, Directive} from '@angular/core';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {Notifications} from '@anglr/common';
import {extend} from '@jscrpt/common';

import {HelpService} from '../services/help.service';
import {renderMarkdown, handleRouterLink, handleHelpServiceError, updateRenderMarkdownConfig} from './utils';
import {RenderMarkdownConfig} from './renderMarkdown.config';
import {DEFAULT_RENDER_MARKDOWN_CONFIG} from './renderMarkdownConfig.default';
import {MD_HELP_NOTIFICATIONS, RENDER_MARKDOWN_CONFIG} from './tokens';

/**
 * Base component for displaying help pages
 */
@Directive()
export abstract class BaseHelpComponent implements AfterViewInit
{
    //######################### protected fields #########################

    /**
     * Indication whether is code running in browser
     */
    protected isBrowser: boolean = isPlatformBrowser(this.platformId);

    /**
     * Base url for md
     */
    protected baseUrl: string|undefined|null;

    /**
     * Path for static assets
     */
    protected assetsPathPrefix: string|undefined|null;
    
    //######################### public properties - children #########################

    /**
     * Div that is used for displaying content
     */
    @ViewChild('content')
    public content: ElementRef|undefined|null;

    //######################### constructor #########################
    constructor(protected route: ActivatedRoute,
                protected helpSvc: HelpService,
                protected router: Router,
                @Optional() @Inject(MD_HELP_NOTIFICATIONS) protected notifications: Notifications,
                @Inject(DOCUMENT) protected document: Document,
                @Inject(PLATFORM_ID) protected platformId: Object,
                @Inject(RENDER_MARKDOWN_CONFIG) @Optional() protected renderMarkdownConfig?: RenderMarkdownConfig)
    {
        this.renderMarkdownConfig = extend(true, {}, DEFAULT_RENDER_MARKDOWN_CONFIG, this.renderMarkdownConfig ?? {});

        updateRenderMarkdownConfig(this.renderMarkdownConfig ?? {}, this.baseUrl, this.assetsPathPrefix);
    }

    //######################### public methods - implementation of AfterViewInit #########################

    /**
     * Called when view was initialized
     */
    public ngAfterViewInit(): void
    {
        this.route.url.subscribe(url =>
        {
            if(this.content)
            {
                this._renderContent(url);
            }
        });
    }

    //######################### public methods #########################

    /**
     * Process click for anchors
     * @param target - Target that was clicked
     */
    @HostListener('click', ['$event'])
    public processClick(target: MouseEvent): boolean
    {
        return handleRouterLink(target, this.router, this.document);
    }

    //######################### protected methods #########################

    /**
     * Renders content
     */
    protected _renderContent(url: UrlSegment[]): void
    {
        const parsedUrl = url.map(url => url.path).join('/');

        if(!parsedUrl)
        {
            this._showNotFound();
        }

        this.helpSvc.get(parsedUrl)
            .pipe(handleHelpServiceError(this._showNotFound.bind(this), this.notifications))
            .subscribe(async content =>
            {
                if(!this.content)
                {
                    return;
                }

                this.content.nativeElement.innerHTML = await this._filterHtml(renderMarkdown(await this._filterMd(content), this.renderMarkdownConfig ?? {}, this.router, this.route, this.document));

                this._scrollIntoView();
            });
    }

    /**
     * Redirects to not found page
     */
    protected abstract _showNotFound(): void;

    /**
     * Filters out parts of markdown that should not be processed
     * @param md - Markdown to be filtered
     */
    protected _filterMd(md: string): Promise<string>
    {
        return Promise.resolve(md);
    }

    /**
     * Filters out parts of html that should not be rendered
     * @param html - Html to be filtered
     */
    protected _filterHtml(html: string): Promise<string>
    {
        return Promise.resolve(html);
    }

    /**
     * Scrolls into view fragment element
     */
    protected _scrollIntoView(): void
    {
        if(this.isBrowser && this.route.snapshot.fragment)
        {
            const element = this.document.getElementById(this.route.snapshot.fragment);

            if(element)
            {
                element.scrollIntoView({behavior: 'smooth'});
            }
        }
    }
}