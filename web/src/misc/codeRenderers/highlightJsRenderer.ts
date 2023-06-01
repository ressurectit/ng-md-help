import hljs from 'highlight.js';

import {CodeRenderer} from './codeRenderer.interface';

/**
 * Code renderer using highlight js
 */
export const HighlightJsCodeRenderer: CodeRenderer = (code: string, language: string|undefined, _isEscaped: boolean) =>
{
    language ??= 'unknown';

    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';

    return `<pre><code class="hljs language-${language}">${hljs.highlight(validLanguage, code).value}</code></pre>`;
};