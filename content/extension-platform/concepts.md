# Concepts

A few things about how the platform behaves that aren't obvious from the getting-started walkthrough alone.

## Environments and branching

Every git branch you push becomes its own environment, with its own live URL — pushing a new branch doesn't redeploy your existing environment, it creates a separate one alongside it. A new environment inherits its configuration and data from the branch (environment) it was created from. Deleting the branch removes the environment with it.

This is what makes it practical to deploy a feature branch or a PR for review without touching what's already live — see [Upsun's documentation on environments](https://developer.upsun.com/docs/environments) for the full lifecycle (activating, deactivating, merging).

## Environment variables and secrets

[Extensions: Credentials](/extensions/credentials.html) and [Custom apps](/apps/create-custom-app.html) cover what credentials your app typically needs (a PIM API client ID/secret, for example) and how the PIM side is configured. This is about the other end: getting those values onto your deployed app.

Set them as project or environment variables rather than committing them to your repository:

```bash
akeneo-extension-platform variable:create --level environment --sensitive PIM_CLIENT_SECRET <value>
```

`--sensitive` keeps the value out of logs and build output. Variables set on one environment aren't automatically copied to a new one branched from it — set them explicitly on each environment that needs them (this is a common source of "it worked on my other environment" confusion).

## Resource sizing

New environments start with minimal default resources. Size CPU, memory, and disk per application with:

```bash
akeneo-extension-platform resources:set --size <app-name>:<size>
```

See [Upsun's documentation on managing resources](https://developer.upsun.com/docs/manage-resources) for sizing guidance and autoscaling.

## Team access

The admin account Akeneo provisions for you isn't the only person who can access the project — that admin can invite teammates directly, without going through Akeneo for each one:

```bash
akeneo-extension-platform user:add teammate@example.com -r admin
```

Access can be scoped per project or per environment (`admin`, `contributor`, `viewer`) — see [Upsun's documentation on administering users](https://developer.upsun.com/docs/administration/users) for the full set of roles.

## Custom domains

You're not limited to the default `*.platformsh.site` URL. Attaching your own domain to a production-facing backend uses Upsun's own domain feature:

```bash
akeneo-extension-platform domain:add your-domain.com
```

See [Upsun's documentation on domains](https://developer.upsun.com/docs/domains) for DNS and certificate setup.

::: panel-link [Infrastructure and resources](/extension-platform/infrastructure-and-resources.html)
