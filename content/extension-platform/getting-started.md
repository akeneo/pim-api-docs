# Getting started

This guide takes you from a freshly provisioned project on the Extension Platform to your app deployed and reachable at a live URL.

You can follow it with your own app, or start from one of the app templates in the [`extension-platform-demo-apps`](https://github.com/akeneo/extension-platform-demo-apps/tree/main) catalog if you'd rather adapt a working example than start from scratch. Pick the template that matches your stack, clone it, and follow the same steps below.

## Prerequisites

Before you start, you need:

1. **A provisioned project**: Akeneo has created your organization and project, and given you an admin account on it. Provisioning isn't self-service. If you don't have this yet, reach out to your Akeneo contact.
2. **Git**: installed locally. Run `git --version` to confirm it's installed.
3. **An app to deploy**: a local Git repository containing a web app that answers HTTP requests, in any language the Platform supports. The steps below generate the hosting configuration for it, not the app itself. If you don't have one yet, clone one of the [demo apps](https://github.com/akeneo/extension-platform-demo-apps/tree/main).

::: info
You don't need a PIM extension configured yet to complete this guide. Wiring your deployed app up to an [`action`](/extensions/action.html), [`iframe`](/extensions/iframe.html), or [`data-component`](/extensions/data-component.html) extension, an Event Platform webhook, or a Custom App happens after your app is live. See [Going further](#going-further) below.
:::

## 1. Install the CLI tool

The Extension Platform CLI, `akeneo-extension-platform`, wraps the standard Upsun CLI with a few conveniences for Akeneo-provisioned projects.

```bash [snippet:Shell]
curl -sfS https://cli.extension.akeneo.cloud/installer | sh
```

Log in with the admin account Akeneo gave you. This opens a browser window to complete the authentication:

```bash [snippet:Shell]
akeneo-extension-platform login
```

Then confirm the CLI can see your provisioned project:

```bash [snippet:Shell]
akeneo-extension-platform project:info
```

## 2. Add the project as a git remote

Your project is itself a git repository, and pushing to it is what triggers a build and deploy (you'll do that in step 4). From your app's repository, point it at the project:

```bash [snippet:Shell]
akeneo-extension-platform project:set-remote
```

This adds an `upsun` git remote pointing at your project.

::: info
Already have an app hosted on GitHub, GitLab, or Bitbucket? You don't have to push to this remote at all. Connect that repository directly instead, either from the Platform Console or with `akeneo-extension-platform integration:add --type github` (or `gitlab`, `bitbucket`). A push to your existing repo's branch then triggers the build and deploy on its own. See [Upsun's source integrations documentation](https://developer.upsun.com/docs/integrations/source) for the provider-specific setup (each needs an access token or similar from that provider).
:::

## 3. Initialize your project configuration

Run:

```bash [snippet:Shell]
akeneo-extension-platform init
```

This generates a `.upsun/config.yaml` in your project root. It doesn't add or change any application code. The command offers two ways to build the file:

- **A step-by-step guide**: you answer questions about your app and the services it needs.
- **AI-assisted configuration**: the tool sends a sanitized digest of your repository to OpenAI and proposes a configuration based on it. To see exactly what would be sent, run `akeneo-extension-platform init --digest`.

Either way, review the result before deploying. The file defines your `routes`, your `services` (Postgres, Redis, or a queue, as needed), the `applications.app` runtime, and your `build`/`deploy` hooks.

## 4. Deploy

Commit the generated configuration and push it:

```bash [snippet:Shell]
git add .upsun/config.yaml
git commit -m "Add Upsun configuration"
akeneo-extension-platform push
```

`akeneo-extension-platform push` pushes your current branch to the project and waits for the build and deploy to finish, showing their progress. A plain `git push upsun <branch>` works too, but returns without waiting.

The push triggers a build (your `.upsun/config.yaml` `build` hook) followed by a deploy (`deploy` hook). Every subsequent push to the same branch redeploys it the same way. Each branch you push gets its own environment, so pushing a different branch creates a new one instead (see [Environments and branching](/extension-platform/concepts.html#environments-and-branching)).

Once the deploy finishes, the CLI prints the URL of the environment it just deployed. You can also get it at any point with:

```bash [snippet:Shell]
akeneo-extension-platform environment:url
```

or by opening the environment in the Platform Console (`akeneo-extension-platform web`).

Open it: you should see your app's response.

## Going further

At this point you have a deployed, reachable app, but it isn't yet connected to anything in your PIM. Depending on what you're building:

- **Receiving an `action` extension call**: configure the extension in the PIM and verify the `signature` header. See [Extensions: Action](/extensions/action.html).
- **Calling back into the PIM API, or handling credentials**: see [Extensions: Credentials](/extensions/credentials.html).
- **Receiving Event Platform webhooks**: see the [Event Platform documentation](/event-platform/getting-started.html).
- **Serving as a Custom App backend**: see [Custom Apps](/apps/create-custom-app.html).

**Environments, variables, resource sizing, team access, and custom domains**: see [Concepts](/extension-platform/concepts.html) for how these work on this platform.

**Want more detail on any of these steps?** This guide follows the same steps as [Upsun's own get started guide](https://developer.upsun.com/docs/get-started). For everything else about running on the Platform (local development via `tunnel:open`, the full `.upsun/config.yaml` reference, and anything not covered above), see [Upsun's own documentation](https://developer.upsun.com/docs). This guide only covers what's specific to getting a PIM-connected backend running.

::: panel-link [Learn how environments, variables, and team access work](/extension-platform/concepts.html)
