import {Directive, ElementRef, PLATFORM_ID, input, InputSignal, effect, inject, HostListener} from '@angular/core';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';

import {MarkdownRenderer} from '../../services';
import {handleRouterLink} from '../../misc/utils';

/**
 * Directive that renders markdown inside of attached element
 */
@Directive(
{
    selector: '[renderMarkdown]',
    standalone: true,
})
export class RenderMarkdownDirective
{
    //######################### protected fields #########################

    /**
     * Indication whether is code running in browser
     */
    protected isBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID));

    /**
     * Html element on which is this directive attached to
     */
    protected element: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    /**
     * Instance of angular router
     */
    protected router: Router = inject(Router);

    /**
     * Instance of current activated route
     */
    protected route: ActivatedRoute = inject(ActivatedRoute);

    /**
     * Instance of markdown renderer used for transformation of markdown
     */
    protected markdownRenderer: MarkdownRenderer = inject(MarkdownRenderer);

    /**
     * Instance of html document
     */
    protected document: Document = inject(DOCUMENT);

    //######################### public properties - inputs #########################

    /**
     * Markdown string to be rendered
     */
    public renderMarkdown: InputSignal<string|undefined|null> = input();

    /**
     * Base url for md
     */
    public baseUrl: InputSignal<string|undefined|null> = input();

    /**
     * Path for static assets
     */
    public assetsPathPrefix: InputSignal<string|undefined|null> = input();

    //######################### constructor #########################
    constructor()
    {
        effect(() =>
        {
            const renderMarkdown = this.renderMarkdown();

            if(renderMarkdown)
            {
                this.runRenderMarkdown(renderMarkdown);
            }
            else
            {
                this.runRenderMarkdown(this.element.nativeElement.textContent ?? '');
            }
        });
    }

    //######################### protected methods - host #########################

    /**
     * Process click for anchors
     * @param target - Target that was clicked
     */
    @HostListener('click', ['$event'])
    protected processClick(target: MouseEvent): boolean
    {
        return handleRouterLink(target, this.router, this.document);
    }

    //######################### protected methods #########################

    /**
     * Renders markdown
     * @param markdown - Markdown to be rendered
     * @param options - Options to be used for rendering
     */
    protected async runRenderMarkdown(markdown: string): Promise<void>
    {
        this.element.nativeElement.innerHTML = await this.markdownRenderer.transformMarkdown(markdown);

        this.scrollIntoView();
    }

    /**
     * Scrolls into view fragment element
     */
    protected scrollIntoView(): void
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