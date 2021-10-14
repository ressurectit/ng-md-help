import {NgModule} from '@angular/core';

import {RenderMarkdownDirective} from '../directives/renderMarkdown/renderMarkdown.directive';
import {RenderMarkdownIncludeDirective} from '../directives/renderMarkdownInclude/renderMarkdownInclude.directive';
import {MdMenuItemDirective} from '../directives/mdMenuItem/mdMenuItem.directive';
import {MdMenuComponent} from '../components/mdMenu/mdMenu.component';
import {RenderMarkdownPipe} from '../pipes/renderMarkdown.pipe';

/**
 * Module used for processing markdown
 */
@NgModule(
{
    declarations:
    [
        RenderMarkdownDirective,
        RenderMarkdownIncludeDirective,
        MdMenuComponent,
        MdMenuItemDirective,
        RenderMarkdownPipe,
    ],
    exports:
    [
        RenderMarkdownDirective,
        RenderMarkdownIncludeDirective,
        MdMenuComponent,
        MdMenuItemDirective,
        RenderMarkdownPipe,
    ]
})
export class MarkdownModule
{
}