/**
 * Code renderer that handles rendering block of code
 */
export interface CodeRenderer
{
    /**
     * Function that handles markdown code and renders correct block code for it
     */
    (code: string, language: string|undefined, isEscaped: boolean): string;
}