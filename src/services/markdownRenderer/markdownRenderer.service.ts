import {inject, Injectable} from '@angular/core';
import {Marked} from 'marked';

import {MARKDOWN_RENDERER_EXTENSIONS} from '../../misc/tokens';

// const x: Unsubscribable

/**
 * Service used for rendering markdown
 */
@Injectable({providedIn: 'root'})
export class MarkdownRenderer
{
    //######################### protected fields #########################

    /**
     * Instance of marked that is being used for markdown processing
     */
    protected marked: Marked;

    //######################### constructor #########################
    constructor()
    {
        const extensions = inject(MARKDOWN_RENDERER_EXTENSIONS);

        this.marked = new Marked(
        {
            async: true,
            useNewRenderer: true,
        },
        ...extensions.map(itm => itm.markedExtension));
    }

    //######################### public methods #########################

    /**
     * Transforms markdown into HTML
     * @param markdown - Markdown to be transformed
     * @param options - Overrides global options during rendering
     */
    public async transformMarkdown(markdown: string): Promise<string>
    {
        return await this.marked.parse(markdown);
    }
}