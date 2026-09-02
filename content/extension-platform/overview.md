# Overview

The Extension Platform is Akeneo-branded cloud hosting for extending and customizing the Akeneo Product Cloud.

Extensions, Custom Apps, and Event Platform webhooks all need somewhere to run: a server that answers when the PIM calls, or a page the PIM embeds. The Extension Platform is that somewhere, provisioned and managed by Akeneo rather than by you.

Under the hood, it runs on [Upsun](https://upsun.com) (formerly Platform.sh), which builds, deploys, and scales your application automatically from a git push.

## Examples

A few examples of what you can run on it:

| Example | What runs on the Extension Platform |
|---|---|
| An [`action`](/extensions/action.html) extension that triggers a custom workflow | The endpoint receiving the `action` POST |
| A Custom Component that needs a database | The server-side logic behind it |
| Reacting to PIM changes as they happen | An Event Platform webhook receiver |
| A full [Custom App](/apps/create-custom-app.html) | The whole application — front end, database, background jobs |

::: panel-link [Getting Started](/extension-platform/getting-started.html)
