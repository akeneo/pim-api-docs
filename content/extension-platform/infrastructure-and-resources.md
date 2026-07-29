# Infrastructure and Resources

This page covers what's available on the platform in plain terms. For the full reference — the complete `.upsun/config.yaml` schema, autoscaling, backups, custom domains — see [Upsun's own documentation](https://developer.upsun.com/docs).

## Languages and runtimes

Any language or runtime [supported by Upsun](https://developer.upsun.com/docs) works here — this isn't limited to PHP or Node. The Symfony and Node examples referenced elsewhere in these docs (and in the [demo apps catalog](https://github.com/akeneo/extension-platform-demo-apps/tree/main)) are demo material to help you get started, not an indication of what's supported.

## Backing services

Your `.upsun/config.yaml` can declare backing services alongside your application — commonly Postgres, Redis, or a message queue.

::: info
For anything that handles an incoming `action` extension call or an Event Platform webhook, respond `202 Accepted` immediately and hand the actual work off to a worker reading from a queue, rather than doing it inline in the HTTP response. Both apps in the [demo apps catalog](https://github.com/akeneo/extension-platform-demo-apps/tree/main) follow this pattern.
:::

## Scheduled jobs and background workers

`.upsun/config.yaml` treats `workers` (long-running processes, e.g. a queue consumer) and `crons` (scheduled jobs) as first-class deploy concepts alongside your main application — declare them there rather than bolting on your own scheduler or process manager.

## Persistent storage

You can declare mounts for anything that needs to persist across deploys — a local image cache, for example. Anything not declared as a mount is wiped and rebuilt on every deploy, so don't rely on the local filesystem for anything you need to keep.

::: panel-link [Monitoring and troubleshooting](/extension-platform/monitoring-and-troubleshooting.html)
