# Changelog

## Version 9.0.0 (2023-05-01)

### BREAKING CHANGES

- minimal supported version of `@angular` is `16.0.3`
- minimal supported version of `@rxjs` is `7.5.7`
- minimal supported version of `@anglr/common` is `16.0.0`
- minimal supported version of `@jscrpt/common` is `3.4.0`
- dropped support of `NodeJs` lower than `16.14`
- *subpackage* `@anglr/md-help/web`
    - updated `BaseHelpComponent` component
        - protected property `_isBrowser` renamed to `isBrowser`
        - protected property `_baseUrl` renamed to `baseUrl`
        - protected property `baseUrl` is now nullable correctly
        - protected property `_assetsPathPrefix` renamed to `assetsPathPrefix`
        - protected property `assetsPathPrefix` is now nullable correctly
        - protected propert `_charMap` was removed, not needed anymore
        - protected property `_route` renamed to `route`
        - protected property `_helpSvc` renamed to `helpSvc`
        - protected property `_router` renamed to `router`
        - protected property `_notifications` renamed to `notifications`
        - protected property `_document` renamed to `document`
        - protected property `_platformId` renamed to `platformId`
        - protected property `_renderMarkdownConfig` renamed to `renderMarkdownConfig`
        - public property `content` is now nullable correctly
    - updated `updateRenderMarkdownConfig` function
        - removed `charMap` argument, not needed anymore
    - updated `RenderMarkdownConfig` interface
        - removed `charMap` property
    - updated `RenderMarkdownPipe` pipe
        - removed last parameter of transform
    - updated `MdMenuComponent` component
        - protected property `assetsPathPrefix` is now nullable correctly
    - updated `RenderMarkdownDirective` directive
        - removed property `charMap`
        - protected property `_isBrowser` renamed to `isBrowser`
        - protected property `_config` renamed to `config`
        - protected property `renderMarkdown` is now nullable correctly
        - protected property `source` is now nullable correctly
        - protected property `baseUrl` is now nullable correctly
        - protected property `assetsPathPrefix` is now nullable correctly

## Version 8.0.0 (2022-02-17)

### Features

- new `RenderMarkdownConfig` interface as config for render markdown function
    - property `codeRenderers` code renderer configuration
        - new `CodeRenderersConfig` interface as code renderers configuration
    - property `charMap` char map used for normalization of ids and anchor fragments
    - property `baseUrl` base url used for routing links
    - property `assetsPathPrefix` path for static assets
- new `DEFAULT_RENDER_MARKDOWN_CONFIG` default configuration for `RenderMarkdownConfig`
- new `RENDER_MARKDOWN_CONFIG` as injection token used for injecting render markdown config
- new `CodeRenderer` interface as code renderer that handles rendering block of code
- new `HighlightJsCodeRenderer` function as code renderer using highlight js
- new `updateRenderMarkdownConfig` function that updates render markdown config with custom values
- new `MD_HELP_NOTIFICATIONS` injection token used for injecting notifications service used in this md help package
- new `RenderMarkdownPipe` pipe that converts markdown string into html
- added *subpackage* `@anglr/md-help/mermaid`
- *subpackage* `@anglr/md-help/mermaid`
    - new `MermaidCodeRenderer` function as code renderer using mermaid

### BREAKING CHANGES

- minimal supported version of *Angular* is `12.0.0`
- minimal supported version of `@jscrpt/common` is `1.2.0`
- minimal supported version of `marked` is `2.0.0`
- minimal supported version of `highlight.js` is `10.6.0`
- minimal supported version of `mermaid` is `8.9.2`
- no longer depends on `@anglr/notifications` instead uses `@anglr/common` version `9.0.0`
- `RenderMarkdownDirective` constructor has new optional parameter
- `RenderMarkdownIncludeDirective` constructor has new optional parameter
- `BaseHelpComponent` constructor has new optional parameter
- `renderMarkdown` function has new signature, added new parameter with configuration and moved some parameters into it
- `GlobalNotificationsService` replaced with `Notifications` from `@anglr/common` package, using `MD_HELP_NOTIFICATIONS` `InjectionToken`

## Version 7.0.1

- added `RenderMarkdownIncludeDirective` supporting import of another markdowns (one level)
- fixed `handleRouterLink`, now checks *anchors* only with `href` attribute
- `RenderMarkdownIncludeDirective` now handles *hash* routes in *markdown*
- `BaseHelpComponent` has no default *baseUrl* now
- `renderMarkdown` does not automatically prefix links with `/`
- added `hljs` css class to `<code>` when rendering code
- `handleRouterLink` now supports also redirecting to absolute URL with same *origin* and performs *scrollIntoView*
- added `getCurrentUrlPrefix` which computes *origin*
- `renderMarkdown` now correctly normalize ids and anchor fragments
- `@jscrpt/common@1.1.1` is required

## Version 7.0.0

- updated to latest stable *Angular* 9
- added generating of API doc

## Version 6.0.2

- added new component `MdMenuComponent` allowing to create *markdown* menu, used together with `RenderMarkdownDirective`
- added new directive `MdMenuItemDirective` allowing to tag html element as navigation element in *markdown* pages
- added new directive `RenderMarkdownDirective` that can be used for rendering markdown

## Version 6.0.1

- added protected `_baseUrl` property to `BaseHelpComponent` for href resolving in md files

## Version 6.0.0

- Angular IVY ready (APF compliant package)
- added support for ES2015 compilation
- Angular 8

## Version 5.0.2
- added protected `_filterMd` method to `BaseHelpComponent` for filtering markdown input

## Version 5.0.1
 - added protected `_filterHtml` method to `BaseHelpComponent` for filtering markdown html result

## Version 5.0.0
 - `@anglr/md-help` is now marked as *sideEffects* free
 - stabilized for angular v6

## Version 5.0.0-beta.1
 - aktualizácia balíčkov `Angular` na `6`
 - aktualizácia `Webpack` na verziu `4`
 - aktualizácia `rxjs` na verziu `6`

## Version 4.0.0
- basic class for help component
- help methods for gulp transformation into static html

