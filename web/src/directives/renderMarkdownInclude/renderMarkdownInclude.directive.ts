import {Directive, Optional, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Notifications} from '@anglr/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {RenderMarkdownDirective} from '../renderMarkdown/renderMarkdown.directive';
import {HelpService} from '../../services/help.service';
import {MD_HELP_NOTIFICATIONS, RENDER_MARKDOWN_CONFIG} from '../../misc/tokens';
import {RenderMarkdownConfig} from '../../misc/renderMarkdown.config';

/**
 * Directive used for custom rendering of markdown with support of INCLUDEMD syntax
 */
@Directive(
{
    selector: '[renderMdInclude]'
})
export class RenderMarkdownIncludeDirective extends RenderMarkdownDirective
{
    //######################### constructor #########################
    constructor(@Optional() helpSvc: HelpService,
                element: ElementRef<HTMLElement>,
                router: Router,
                route: ActivatedRoute,
                @Optional() @Inject(MD_HELP_NOTIFICATIONS) notifications: Notifications,
                @Inject(DOCUMENT) document: Document,
                @Inject(PLATFORM_ID) platformId: Object,
                protected _http: HttpClient,
                @Inject(RENDER_MARKDOWN_CONFIG) @Optional() renderMarkdownConfig?: RenderMarkdownConfig)
    {
        super(helpSvc, element, router, route, notifications, document, platformId, renderMarkdownConfig);
    }

    //######################### public methods #########################

    /**
     * Filters out parts of markdown that should not be processed
     * @param md - Markdown to be filtered
     */
    public override async filterMd(md: string): Promise<string>
    {
        let matches: RegExpExecArray|null;

        while((matches = /@INCLUDEMD#(.*?)@/.exec(md)))
        {
            let includeMd = await lastValueFrom(this._http.get(matches[1], {responseType: 'text'}));

            includeMd = includeMd?.replace(/\/#\//g, '/');

            md = md.replace(/@INCLUDEMD#(.*?)@/, includeMd ?? '');
        }

        return md;
    }
}