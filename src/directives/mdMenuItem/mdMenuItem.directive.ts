import {Directive, HostListener, Input} from '@angular/core';
import {Router} from '@angular/router';

//TODO: active css class handle

/**
 * Directive that is used for applying markdown navigation
 */
@Directive(
{
    selector: '[mdMenuItem]',
    standalone: true,
})
export class MdMenuItemDirective
{
    //######################### public properties - inputs #########################

    /**
     * Path to be navigated to
     */
    @Input({required: true, alias: 'mdMenuItem'})
    public path!: string|null;

    //######################### constructor #########################
    constructor(protected router: Router,)
    {
    }
    
    //######################### protected methods - host #########################

    /**
     * Navigates to path
     * @param event - Event that occured
     */
    @HostListener('click', ['$event'])
    protected navigate(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        if(!this.path)
        {
            return;
        }
        
        this.router.navigate([`/${this.path}`]);
    }
}