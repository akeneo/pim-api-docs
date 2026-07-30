# Overview

The Extension Platform is Akeneo-branded cloud hosting for extending and customizing the Akeneo Product Cloud.

It can be the API server behind an `action` extension's POST or a `data-component` extension's GET, or the page shown inside an `iframe` extension. It can just as easily run a full [Custom App](/apps/create-custom-app.html), consume [Event Platform](/event-platform/overview.html) webhooks, or run custom workflows.

Under the hood, it runs on [Upsun](https://upsun.com) (formerly Platform.sh), which builds, deploys, and scales your application automatically from a git push.

## Examples

A few examples of what customers run on it:

| Example | What runs on the Extension Platform |
|---|---|
| An `action` extension that triggers a custom workflow | The endpoint receiving the `action` POST |
| A Custom Component that needs a database | The server-side logic behind it |
| Reacting to PIM changes as they happen | An Event Platform webhook receiver |
| A full [Custom App](/apps/create-custom-app.html) | The whole application — front end, database, background jobs |

::: panel-link [Getting Started](/extension-platform/getting-started.html)
