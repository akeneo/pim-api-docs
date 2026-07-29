# Getting Started

This guide takes you from a freshly provisioned project on the Extension Platform to a "hello world" app deployed and reachable at a live URL, following the same steps as [Upsun's own get started guide](https://developer.upsun.com/docs/get-started).

## Prerequisites

Before you start, you need:

1. **A provisioned project**: Akeneo has created your Upsun organization and project, and given you an admin account on it. Provisioning isn't self-service — if you don't have this yet, reach out to your Akeneo contact.
2. **Git**: installed locally, with a local clone (or a new repository) for your app.

::: info
You don't need a PIM extension configured yet to complete this guide. Wiring your deployed app up to an `action`, `iframe`, or `data-component` extension, an Event Platform webhook, or a Custom App happens after your app is live — see [Going further](#going-further) below.
:::

## 1. Install the CLI tool

The Extension Platform CLI, `akeneo-extension-platform`, wraps the standard Upsun CLI with a few conveniences for Akeneo-provisioned projects.

```bash
curl -sfSk https://cli.extension.akeneo.cloud/installer | sh
```

Once installed, confirm it can see your provisioned project:

```bash
akeneo-extension-platform project:info
```

## 2. Add the project as a git remote

Since your project is already created (Akeneo provisioned it for you), point a local repository at it:

```bash
akeneo-extension-platform project:set-remote
```

This adds a `upsun` git remote pointing at your project. It's the deploy mechanism end-to-end: every push to that remote triggers a build and a deploy.

::: info
Already have an app hosted on GitHub, GitLab, or Bitbucket? You don't have to switch to pushing on this new remote. Connect that repository directly with `akeneo-extension-platform integration:add --type github` (or `gitlab`, `bitbucket`) instead, and a push to your existing repo's branch triggers the build and deploy on its own — see [Upsun's source integrations documentation](https://developer.upsun.com/docs/integrations/source) for the provider-specific setup (each needs an access token or similar from that provider).
:::

## 3. Initialize your project configuration

Run:

```bash
akeneo-extension-platform init
```

This generates a `.upsun/config.yaml` in your project root, either from a guided, non-AI walkthrough or by letting Upsun analyze your repository and propose a configuration for you. Either way, review the result before deploying — it defines your `routes`, `services` (Postgres, Redis, a queue, as needed), the `applications.app` runtime, and your `build`/`deploy` hooks.

## 4. Deploy

Commit the generated configuration and push it:

```bash
git add .upsun/config.yaml
git commit -m "Add Upsun configuration"
akeneo-extension-platform push
```

This triggers a build (per your `.upsun/config.yaml` `build` hook) followed by a deploy (`deploy` hook). Every subsequent push to that branch redeploys automatically the same way.

Once the deploy finishes, the CLI prints the URL of the environment it just deployed. You can also get it at any point with:

```bash
akeneo-extension-platform environment:url
```

or by opening the environment in the Upsun Console (`akeneo-extension-platform web`).

Open it — you should see a hello-world response.

## Going further

At this point you have a deployed, reachable app.

**Starting from a working example instead of hello world**: rather than building up from `init`'s generated configuration, you can start from one of the app templates in the [`extension-platform-demo-apps`](https://github.com/akeneo/extension-platform-demo-apps/tree/main) catalog — pick whichever matches your stack. This is an alternative to the steps above, not the default path: use it if you want a working reference to adapt rather than a blank project to build up yourself.

**Connecting your app to the PIM**: your deployed app isn't yet connected to anything in your PIM. Depending on what you're building:

- **Receiving an `action` extension call**: configure the extension in the PIM and verify the `signature` header — see [Extensions: Action](/extensions/action.html).
- **Calling back into the PIM API, or handling credentials**: see [Extensions: Credentials](/extensions/credentials.html).
- **Receiving Event Platform webhooks**: see the [Event Platform documentation](/event-platform/getting-started.html).
- **Serving as a Custom App backend**: see [Custom apps](/apps/create-custom-app.html).

**Everything else about running on Upsun** — local development (`tunnel:open`), scaling resources, backing services, custom domains, and the full `.upsun/config.yaml` reference — is covered in [Upsun's own documentation](https://developer.upsun.com/docs); this guide only covers what's specific to getting a PIM-connected backend running.

::: panel-link [Learn about the platform's infrastructure and resources](/extension-platform/infrastructure-and-resources.html)
