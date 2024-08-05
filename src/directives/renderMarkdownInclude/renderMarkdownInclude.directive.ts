import {Directive} from '@angular/core';

import {RenderMarkdownDirective} from '../renderMarkdown/renderMarkdown.directive';

/**
 * Directive used for custom rendering of markdown with support of INCLUDEMD syntax
 */
@Directive(
{
    selector: '[renderMdInclude]',
    standalone: true,
})
export class RenderMarkdownIncludeDirective extends RenderMarkdownDirective
{
    //######################### public methods #########################

    // /**
    //  * Filters out parts of markdown that should not be processed
    //  * @param md - Markdown to be filtered
    //  */
    // public override async filterMd(md: string): Promise<string>
    // {
    //     let matches: RegExpExecArray|null;

    //     while((matches = /@INCLUDEMD#(.*?)@/.exec(md)))
    //     {
    //         let includeMd = await lastValueFrom(this._http.get(matches[1], {responseType: 'text'}));

    //         includeMd = includeMd?.replace(/\/#\//g, '/');

    //         md = md.replace(/@INCLUDEMD#(.*?)@/, includeMd ?? '');
    //     }

    //     return md;
    // }
}