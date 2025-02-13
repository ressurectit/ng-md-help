import {Router} from '@angular/router';
import {isBlank} from '@jscrpt/common';

/**
 * Handles click event
 * @param event - Mouse event that occured
 * @param router - Router that is used for changing url
 * @param document - HTML document instance
 */
export function handleRouterLink(event: MouseEvent, router: Router, document: Document): boolean
{
    const target = event.target as HTMLElement;
    const href = target.attributes['href' as any];

    //not anchor
    if(target.nodeName != 'A' || isBlank(href?.value))
    {
        return true;
    }

    let hrefValue: string = href.value;
    const currentUrl = getCurrentUrlPrefix(document);
    hrefValue = hrefValue.replace(new RegExp(`^${currentUrl}`), '');

    //absolute url to different page
    if(hrefValue.indexOf('http') === 0)
    {
        return true;
    }

    const parsedUrl = router.parseUrl(hrefValue);

    if(parsedUrl.root.hasChildren())
    {
        router.navigateByUrl(parsedUrl).then(success =>
        {
            //scroll into view
            if(parsedUrl.fragment && success)
            {
                document.querySelector(`#${parsedUrl.fragment}`)?.scrollIntoView({behavior: 'smooth'});
            }
        });
    }
    else if(parsedUrl.fragment)
    {
        document.querySelector(`#${parsedUrl.fragment}`)?.scrollIntoView({behavior: 'smooth'});
    }

    event.preventDefault();
    event.stopPropagation();

    return false;
}

/**
 * Gets current URL prefix (contains protocol and host)
 * @param document - Html document to be used for computation of current URL prefix
 */
export function getCurrentUrlPrefix(document: Document): string
{
    return `${document.location.protocol}//${document.location.host}`;
}
