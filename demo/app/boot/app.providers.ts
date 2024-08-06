import {ClassProvider, ValueProvider, Provider, EnvironmentProviders, importProvidersFrom, provideExperimentalZonelessChangeDetection} from '@angular/core';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter, withComponentInputBinding, withHashLocation} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {LocalPermanentStorage} from '@anglr/common/store';
import {GlobalizationService, providePosition, provideLoggerConfig, DeveloperConsoleSink, LogLevelEnricher, TimestampEnricher, LogLevel, ConsoleComponentSink, providePermanentStorage} from '@anglr/common';
import {ReservedSpaceValidationErrorsContainerComponent, ValidationErrorRendererFactoryOptions, VALIDATION_ERROR_MESSAGES, VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS} from '@anglr/common/forms';
import {MovableTitledDialogComponent, TitledDialogServiceOptions, TitledDialogService, provideConfirmationDialogOptions} from '@anglr/common/material';
import {FloatingUiDomPosition} from '@anglr/common/floating-ui';
import {assetsPathPrefixExtension, GfmHeadingIdExtension, IncludeMarkdownExtension, provideMarkdownRendererExtensions} from '@anglr/md-help';
import {MermaidExtension} from '@anglr/md-help/mermaid';
import {baseUrlExtension} from '@anglr/md-help/baseurl';
import {HighlightJsExtension} from '@anglr/md-help/highlightjs';

import {routes} from './app.component.routes';
import {GlobalizationService as GlobalizationServiceImpl} from '../services/globalization/globalization.service';

/**
 * Array of providers that are used in app module
 */
export const appProviders: (Provider|EnvironmentProviders)[] =
[
    //######################### ROUTER #########################
    provideRouter(routes,
                  withComponentInputBinding(),
                  withHashLocation()),

    //######################### CLIENT HYDRATION #########################
    provideClientHydration(),

    //######################### HTTP CLIENT #########################
    provideHttpClient(withInterceptorsFromDi(),),

    //######################### ZONELESS #########################
    provideExperimentalZonelessChangeDetection(),

    //######################### GLOBALIZATION SERVICE #########################
    <ClassProvider>
    {
        provide: GlobalizationService,
        useClass: GlobalizationServiceImpl
    },

    //######################### PERMANENT STORAGE #########################
    providePermanentStorage(LocalPermanentStorage),

    //######################### LOGGER #########################
    provideLoggerConfig(config => config
        .writeTo(ConsoleComponentSink)
        .writeTo(DeveloperConsoleSink)
        .enrichWith(LogLevelEnricher)
        .enrichWith(TimestampEnricher)
        .minimumLevel(LogLevel.Information)
        .messageTemplate('{{timestamp}} [{{logLevel}}] {{messageLog}}')),

    //######################### VALIDATION ERRORS #########################
    <ValueProvider>
    {
        provide: VALIDATION_ERROR_MESSAGES,
        useValue:
        {
            required: 'Položka je povinná.',
            number: 'Položka musí byť číslo.',
            pattern: 'Položka nie je v požadovanom formáte.',
            minValue: 'Nedodržaná minimálna povolená hodnota.',
            maxValue: 'Nedodržaná maximálna povolená hodnota.',
            minlength: 'Nedodržaná minimálna dĺžka.',
            maxlength: 'Nedodržaná maximálna dĺžka.',
            birthNumber: 'Nesprávny formát rodného čísla.',
            email: 'Položka musí byť email.',
            availableUsername: 'Prihlasovacie meno je použité',
        }
    },
    <ValueProvider>
    {
        provide: VALIDATION_ERROR_RENDERER_FACTORY_OPTIONS,
        useValue: <ValidationErrorRendererFactoryOptions>
        {
            container: ReservedSpaceValidationErrorsContainerComponent
        }
    },

    //######################### MARKDOWN #########################
    provideMarkdownRendererExtensions(GfmHeadingIdExtension,
                                      HighlightJsExtension,
                                      baseUrlExtension('test/'),
                                      MermaidExtension,
                                      assetsPathPrefixExtension('xawe'),
                                      IncludeMarkdownExtension,),

    //######################### TITLED DIALOG #########################
    importProvidersFrom(MatDialogModule),
    TitledDialogService,
    <ValueProvider>
    {
        provide: TitledDialogServiceOptions,
        useValue: new TitledDialogServiceOptions(MovableTitledDialogComponent)
    },

    //######################### CONFIRMATION DIALOG #########################
    provideConfirmationDialogOptions(
    {
        cssClasses:
        {
            closeButton: 'btn btn-danger margin-right-small',
        },
        confirmationText: 'Prajete si pokračovať?',
        dialogCancelText: 'Nie',
        dialogConfirmText: 'Áno',
    }),

    //######################### POSITION #########################
    providePosition(FloatingUiDomPosition),
];
