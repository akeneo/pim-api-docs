# Monitoring and Troubleshooting

## What you can see

Deployment status, application logs, resource metrics (CPU, memory, disk), and request-level APM are all available through the Upsun Console or the `akeneo-extension-platform` CLI on your project — the same tooling covered in [Getting started](/extension-platform/getting-started.html).

## Common failure modes

A few issues worth knowing about before you hit them:

**Signature validation failures**: usually a wrong secret, or testing with a stale `timestamp`. See [Extensions: Action](/extensions/action.html#signature) for the verification algorithm and replay-attack window.

**Webhook events arriving before the corresponding local record exists**: if your app receives an Event Platform webhook for something it doesn't know about yet (a product it hasn't synced), don't treat that as an error — deliberately ignoring updates for unknown entities, rather than auto-creating them from a webhook payload, is a common and reasonable design choice.

**Build or deploy hook failures**: check your `.upsun/config.yaml` `build`/`deploy` hooks first — most failures here are a missing dependency or a command that assumes a file that isn't present yet.

**Missing environment variables after a fresh environment is provisioned**: variables set on one environment (e.g. `main`) aren't automatically copied to a new one branched from it — set them explicitly on each environment that needs them.

## Billing and usage

Cost and usage data for your project is available in your Akeneo customer portal. This isn't documented here — see the Help Desk for details on billing.

## Where to escalate

Akeneo owns provisioning (creating your project and admin account); day-to-day operation of what you deploy is yours to self-serve through the Upsun Console/CLI. Reach out to your Akeneo contact for anything provisioning-related — a new environment, access issues — rather than support requests about your own application's behavior.

::: panel-link [FAQ](/extension-platform/faq.html)
