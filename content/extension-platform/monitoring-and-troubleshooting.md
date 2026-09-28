# Monitoring and troubleshooting

## What you can see

Deployment status, application logs, and resource metrics (CPU, memory, disk) are all available both through the Platform Console and through the `akeneo-extension-platform` CLI/API on your project — the same tooling covered in [Getting started](/extension-platform/getting-started.html).

For anything you can't diagnose from logs and metrics alone:

- **SSH into a running environment**: `akeneo-extension-platform environment:ssh` (alias `ssh`) opens a shell in the environment, useful for inspecting files or running one-off commands directly.
- **Blackfire**: for request-level performance profiling and APM beyond raw resource metrics, connect [Blackfire](https://www.blackfire.io/) as an add-on to your project.

## Common failure modes

A few issues worth knowing about before you hit them:

**Signature validation failures**: usually a wrong secret, or testing with a stale `timestamp`. See [Extensions: Action](/extensions/action.html#signature) for the verification algorithm and replay-attack window.

**Webhook events arriving before the corresponding local record exists**: if your app receives an Event Platform webhook for something it doesn't know about yet (a product it hasn't synced), don't treat that as an error — deliberately ignoring updates for unknown entities, rather than auto-creating them from a webhook payload, is a common and reasonable design choice.

**Build or deploy hook failures**: check your `.upsun/config.yaml` `build`/`deploy` hooks first — most failures here are a missing dependency or a command that assumes a file that isn't present yet.

**Missing environment variables after a fresh environment is provisioned**: variables set on one environment (e.g. `main`) aren't automatically copied to a new one branched from it — set them explicitly on each environment that needs them.

## Billing and usage

Cost and usage data for your project is available in your Akeneo customer portal. This isn't documented here: for details on billing, see the [Help Desk article on the Extension Platform](https://help.akeneo.com/extensions/extension-platform).

## Where to escalate

- **Akeneo's integrations, provisioning, and billing**: issues with the PIM API, extensions, or Event Platform themselves, or with your project (a new project, account access), go through your Akeneo contact.
- **Platform or infrastructure issues**: a stuck deploy, an infrastructure error, or anything on the runtime side is the Upsun team's responsibility, so contact Upsun support directly through the Platform; you don't need to go through Akeneo for this.
- **Your application's behavior**: that's your code, so debugging it is on you, using the tooling above.

::: panel-link [FAQ](/extension-platform/faq.html)
