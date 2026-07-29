# Overview

The Extension Platform is a customizable cloud hosting solution under the Akeneo brand, allowing the execution of custom solutions connected to your PIM.

It can run the backend behind an `action`, `iframe`, or `data-component` extension — the server that receives the POST, serves the iframe, or answers the GET that those extension types call out to. It can just as easily run the backend for a [Custom App](/apps/create-custom-app.html), consume [Event Platform](/event-platform/overview.html) webhooks, or run custom workflows that aren't tied to any PIM extension at all. It's a general-purpose place to run your backend, connected to the PIM.

## Where it fits

The Extension Platform is a hosting solution integrated into the Akeneo ecosystem — if you already have an Akeneo product contract, you don't need a separate contract with Upsun to use it. Under the hood it runs on [Upsun](https://upsun.com) (formerly Platform.sh), but it was built with one purpose in mind: giving customers and partners a place to run the custom solutions their integration needs, most often the backend for a UI extension or a Custom App. It's designed to be used together with the PIM API and Event Platform, not as a replacement for either.

Some examples of what customers run on it:

- An `action` extension endpoint that triggers a custom workflow.
- An Event Platform webhook receiver.
- A full custom app — front end, database, background jobs — serving as the backend for a [Custom App](/apps/create-custom-app.html).
- The backend for a Custom Component, when it needs server-side logic beyond what runs in the [Akeneo-hosted sandbox](/advanced-extensions/overview.html).

::: panel-link [Getting Started](/extension-platform/getting-started.html)
