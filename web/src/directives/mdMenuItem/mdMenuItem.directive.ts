import {Directive, Input, HostListener, ElementRef} from '@angular/core';
import {Subject, Observable} from 'rxjs';

/**
 * Directive used for highligting active menuitem and also reacts to changes of new menuitem selected
 */
@Directive(
{
    selector: '[mdMenuItem]'
})
export class MdMenuItemDirective
{
    //######################### protected fields #########################

    /**
     * Subject that is used for emitting click
     */
    protected _clickSubject: Subject<void> = new Subject<void>();

    //######################### public properties - inputs #########################

    /**
     * Relative path for markdown file
     */
    @Input({alias: 'mdMenuItem', required: true})
    public mdPath: string|undefined|null;

    //######################### public properties #########################

    /**
     * Occurs when directive is clicked
     */
    public get click(): Observable<void>
    {
        return this._clickSubject.asObservable();
    }

    //######################### constructor #########################
    constructor(protected _element: ElementRef<HTMLElement>)
    {
    }

    //######################### public methods - host #########################

    /**
     * Handles click event on element
     * @internal
     */
    @HostListener('click', ['$event'])
    public clickHandler(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();
        
        this._clickSubject.next();
    }

    //######################### public methods #########################

    /**
     * Sets active css class
     * @param cssClass - Css class to be set
     * @param active - Indication whether set as active
     */
    public setActive(cssClass: string, active: boolean = true): void
    {
        if(active)
        {
            this._element.nativeElement.classList.add(cssClass);
        }
        else
        {
            this._element.nativeElement.classList.remove(cssClass);
        }
    }
}