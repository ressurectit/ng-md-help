import {Inject, Optional, Pipe, PipeTransform} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {extend} from '@jscrpt/common';

import {RenderMarkdownConfig} from '../misc/renderMarkdown.config';
import {RENDER_MARKDOWN_CONFIG} from '../misc/tokens';
import {renderMarkdown, updateRenderMarkdownConfig} from '../misc/utils';
import {DEFAULT_RENDER_MARKDOWN_CONFIG} from '../misc/renderMarkdownConfig.default';

/**
 * Converts markdown string into html
 */
@Pipe({name: 'renderMarkdown'})
export class RenderMarkdownPipe implements PipeTransform
{
    //######################### constructor #########################
    constructor(protected _router: Router,
                protected _route: ActivatedRoute,
                @Inject(RENDER_MARKDOWN_CONFIG) @Optional() protected _config: RenderMarkdownConfig,
                @Inject(DOCUMENT) protected _document: Document,)
    {
        this._config = extend(true, {}, DEFAULT_RENDER_MARKDOWN_CONFIG, this._config);
    }

    //######################### public methods - implementation of PipeTransform #########################
    /**
     * Converts markdown string into html
     * @param markdown - Markdown string to be converted
     * @param baseUrl - Base url used for routing links
     * @param assetsPathPrefix - Path for static assets
     * @param charMap - Char map used for normalization of ids and anchor fragments
     */
    public transform(markdown: string, baseUrl?: string, assetsPathPrefix?: string, charMap?: Object): string
    {
        const config = extend(true, {}, this._config);

        updateRenderMarkdownConfig(config, charMap, baseUrl, assetsPathPrefix);

        return renderMarkdown(markdown, config, this._router, this._route, this._document);
    }
}