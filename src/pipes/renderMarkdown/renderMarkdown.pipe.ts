import {inject, Pipe, PipeTransform} from '@angular/core';

import {MarkdownRenderer} from '../../services';

/**
 * Converts markdown string into html
 */
@Pipe({name: 'renderMarkdown', standalone: true})
export class RenderMarkdownPipe implements PipeTransform
{
    //######################### protected properties #########################

    /**
     * Instance of markdown renderer that converts markdown into html
     */
    protected markdownRenderer: MarkdownRenderer = inject(MarkdownRenderer);

    //######################### public methods - implementation of PipeTransform #########################
    
    /**
     * Converts markdown string into html
     * @param markdown - Markdown string to be converted
     */
    public transform(markdown: string): Promise<string>
    {
        return this.markdownRenderer.transformMarkdown(markdown);
    }
}