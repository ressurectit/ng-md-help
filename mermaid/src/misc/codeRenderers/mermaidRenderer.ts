import {CodeRenderer} from '@anglr/md-help/web';
import {generateId} from '@jscrpt/common';
import mermaid from 'mermaid';

/**
 * Code renderer using mermaid
 */
export const MermaidCodeRenderer: CodeRenderer = (code: string, _language: string|undefined, _isEscaped: boolean) =>
{
    return mermaid.render(generateId(12), code);
};