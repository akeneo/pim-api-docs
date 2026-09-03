# Concepts

How the platform actually works, beyond the getting-started walkthrough: the deploy model, what you configure on your app, and what you manage around it.

## Environments and branching

Every git branch you push becomes its own environment, with its own live URL — pushing a new branch doesn't redeploy your existing environment, it creates a separate one alongside it. A new environment inherits its configuration and data from the branch (environment) it was created from. Deleting the branch removes the environment with it.

This is what makes it practical to deploy a feature branch or a PR for review without touching what's already live — see [Upsun's documentation on environments](https://developer.upsun.com/docs/environments) for the full lifecycle (activating, deactivating, merging).

## Your app's configuration

Everything in this section is declared in the `.upsun/config.yaml` you generated with `init` in [Getting started](/extension-platform/getting-started.html) — this is what that file actually describes.

### Languages and runtimes

Any language or runtime [supported by the Platform](https://developer.upsun.com/docs) works here — this isn't limited to PHP or Node. The Symfony and Node examples referenced elsewhere in these docs (and in the [demo apps catalog](https://github.com/akeneo/extension-platform-demo-apps/tree/main)) are demo material to help you get started, not an indication of what's supported.

### Backing services

Your `.upsun/config.yaml` file can declare backing services alongside your application — commonly Postgres, Redis, or a message queue.

### Scheduled jobs and background workers

`.upsun/config.yaml` treats `workers` (long-running processes, e.g. a queue consumer) and `crons` (scheduled jobs) as first-class deploy concepts alongside your main application — declare them there rather than bolting on your own scheduler or process manager.

### Persistent storage

You can declare mounts for anything that needs to persist across deploys — a local image cache, for example. Anything not declared as a mount is wiped and rebuilt on every deploy, so don't rely on the local filesystem for anything you need to keep.

### Resource sizing

New environments start with minimal default resources. Size CPU, memory, and disk per application with:

```bash [snippet:Shell]
akeneo-extension-platform resources:set --size <app-name>:<size>
```

See [Upsun's documentation on managing resources](https://developer.upsun.com/docs/manage-resources) for sizing guidance and autoscaling.

## Project administration

Things you manage around your app, separately from `.upsun/config.yaml`.

### Environment variables and secrets

[Extensions: Credentials](/extensions/credentials.html) and [Custom Apps](/apps/create-custom-app.html) cover what credentials your app typically needs (a PIM API client ID/secret, for example) and how the PIM side is configured. This is about the other end: getting those values onto your deployed app.

Set them as project or environment variables rather than committing them to your repository:

```bash [snippet:Shell]
akeneo-extension-platform variable:create --level environment --sensitive PIM_CLIENT_SECRET <value>
```

`--sensitive` keeps the value out of logs and build output. Variables set on one environment aren't automatically copied to a new one branched from it — set them explicitly on each environment that needs them (this is a common source of "it worked on my other environment" confusion).

### Team access

The admin account Akeneo provisions for you isn't the only way to access the project — that admin can invite teammates directly, without going through Akeneo for each one:

```bash [snippet:Shell]
akeneo-extension-platform user:add teammate@example.com -r admin
```

Access can be scoped per project or per environment (`admin`, `contributor`, `viewer`) — see [Upsun's documentation on administering users](https://developer.upsun.com/docs/administration/users) for the full set of roles.

### Custom domains

You're not limited to the default `*.platformsh.site` URL — you can attach your own domain:

```bash [snippet:Shell]
akeneo-extension-platform domain:add your-domain.com
```

See [Upsun's documentation on domains](https://developer.upsun.com/docs/domains) for DNS and certificate setup.

::: panel-link [Monitoring and troubleshooting](/extension-platform/monitoring-and-troubleshooting.html)
