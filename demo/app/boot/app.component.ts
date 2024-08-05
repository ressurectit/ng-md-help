import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LOGGER, Logger} from '@anglr/common';

import version from '../../config/version.json';

/**
 * Application root component
 */
@Component(
{
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrl: 'app.component.scss',
    standalone: true,
    imports:
    [
        RouterOutlet,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent
{
    //######################### public properties - template bindings #########################

    /**
     * Current version of gui
     */
    public guiVersion: string = version.version;

    //######################### constructor #########################
    constructor(@Inject(LOGGER) logger: Logger,)
    {
        logger.verbose('Application is starting, main component constructed.');
    }
}