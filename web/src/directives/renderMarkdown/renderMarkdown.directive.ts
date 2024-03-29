import {Directive, Input, Optional, ElementRef, OnChanges, SimpleChanges, PLATFORM_ID, Inject, HostListener} from '@angular/core';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {Notifications} from '@anglr/common';
import {extend, nameof} from '@jscrpt/common';

import {HelpService} from '../../services/help.service';
import {renderMarkdown, handleHelpServiceError, handleRouterLink, updateRenderMarkdownConfig} from '../../misc/utils';
import {MD_HELP_NOTIFICATIONS, RENDER_MARKDOWN_CONFIG} from '../../misc/tokens';
import {RenderMarkdownConfig} from '../../misc/renderMarkdown.config';
import {DEFAULT_RENDER_MARKDOWN_CONFIG} from '../../misc/renderMarkdownConfig.default';

/**
 * Directive that renders markdown inside
 */
@Directive(
{
    selector: '[renderMarkdown]'
})
export class RenderMarkdownDirective implements OnChanges
{
    //######################### protected fields #########################

    /**
     * Indication whether is code running in browser
     */
    protected isBrowser: boolean = isPlatformBrowser(this._platformId);

    /**
     * Current value of config
     */
    protected config: RenderMarkdownConfig;

    //######################### public properties - inputs #########################

    /**
     * Markdown string to be rendered
     */
    @Input()
    public renderMarkdown: string|undefined|null;

    /**
     * Source string, used for obtaining markdown, using help service
     */
    @Input()
    public source: string|undefined|null;

    /**
     * Base url for md
     */
    @Input()
    public baseUrl: string|undefined|null;

    /**
     * Path for static assets
     */
    @Input()
    public assetsPathPrefix: string|undefined|null;

    //######################### public methods - host #########################

    /**
     * Process click for anchors
     * @param target - Target that was clicked
     */
    @HostListener('click', ['$event'])
    public processClick(target: MouseEvent): boolean
    {
        return handleRouterLink(target, this._router, this._document);
    }

    //######################### constructor #########################
    constructor(@Optional() protected _helpSvc: HelpService,
                protected _element: ElementRef<HTMLElement>,
                protected _router: Router,
                protected _route: ActivatedRoute,
                @Optional() @Inject(MD_HELP_NOTIFICATIONS) protected _notifications: Notifications,
                @Inject(DOCUMENT) protected _document: Document,
                @Inject(PLATFORM_ID) protected _platformId: Object,
                @Inject(RENDER_MARKDOWN_CONFIG) @Optional() protected _renderMarkdownConfig?: RenderMarkdownConfig)
    {
        this._renderMarkdownConfig = extend(true, {}, DEFAULT_RENDER_MARKDOWN_CONFIG, this._renderMarkdownConfig ?? {});

        this.config = extend(true, {}, this._renderMarkdownConfig ?? {});
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        //renders markdown provided, more priority
        if(nameof<RenderMarkdownDirective>('renderMarkdown') in changes && this.renderMarkdown)
        {
            this._renderMarkdown(this.renderMarkdown);
        }

        //uses source for obtaning markdown
        if(nameof<RenderMarkdownDirective>('source') in changes && this.source && !this.renderMarkdown)
        {
            this._loadMarkdown();
        }

        if(nameof<RenderMarkdownDirective>('assetsPathPrefix') in changes ||
           nameof<RenderMarkdownDirective>('baseUrl') in changes)
        {
            this.config = extend(true, {}, this._renderMarkdownConfig ?? {});

            updateRenderMarkdownConfig(this.config, this.baseUrl, this.assetsPathPrefix);
        }
    }

    //######################### public methods #########################

    /**
     * Redirects to not found page
     */
    public showNotFound(): void
    {
    }

    /**
     * Filters out parts of markdown that should not be processed
     * @param md - Markdown to be filtered
     */
    public filterMd(md: string): Promise<string>
    {
        return Promise.resolve(md);
    }

    /**
     * Filters out parts of html that should not be rendered
     * @param html - Html to be filtered
     */
    public filterHtml(html: string): Promise<string>
    {
        return Promise.resolve(html);
    }

    //######################### protected methods #########################

    /**
     * Loads markdown using source
     */
    protected _loadMarkdown(): void
    {
        if(!this.source || !this._helpSvc)
        {
            return;
        }

        this._helpSvc.get(this.source)
            .pipe(handleHelpServiceError(this.showNotFound.bind(this), this._notifications))
            .subscribe(content => this._renderMarkdown(content));
    }

    /**
     * Renders markdown
     * @param markdown - Markdown to be rendered
     */
    protected async _renderMarkdown(markdown: string): Promise<void>
    {
        this._element.nativeElement.innerHTML = await this.filterHtml(renderMarkdown(await this.filterMd(markdown), this.config, this._router, this._route, this._document));

        this._scrollIntoView();
    }

    /**
     * Scrolls into view fragment element
     */
    protected _scrollIntoView(): void
    {
        if(this.isBrowser && this._route.snapshot.fragment)
        {
            const element = this._document.getElementById(this._route.snapshot.fragment);

            if(element)
            {
                element.scrollIntoView({behavior: 'smooth'});
            }
        }
    }
}