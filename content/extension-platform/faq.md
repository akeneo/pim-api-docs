# FAQ

### Who's responsible if my hosted app goes down or has a bug?

It depends on where the problem is. Akeneo supports its own integrations, provisioning, and billing; the Upsun team supports the Platform's infrastructure; and the application code you deploy is yours to debug and fix. See [Where to escalate](/extension-platform/monitoring-and-troubleshooting.html#where-to-escalate) for who to contact in each case.

### Can I bring my own Upsun/Platform.sh account instead of the Akeneo-provisioned one?

No. Provisioning isn't self-service. Akeneo creates your organization and project (and an admin account on it) as part of the Extension Platform offering, billed through your Akeneo relationship rather than a separate Upsun contract.

### What languages/runtimes are supported?

Any language or runtime that the Platform itself supports. It's not limited to PHP or Node: those are just the languages used in the available demo apps.

### Where do I see what this is costing me?

Cost and usage data is available in your Akeneo customer portal. For details on billing, see the [Help Desk article on the Extension Platform](https://help.akeneo.com/extensions/extension-platform) rather than this documentation.

### Can I use this hosting for something unrelated to a PIM extension?

Yes. It's a general-purpose backend host connected to the PIM. Running an Event Platform webhook receiver or a custom workflow with no PIM extension involved at all is just as valid a use case as hosting an extension backend.

### Can I use this to host a Custom App instead of an extension backend?

Yes. [Custom Apps](/apps/create-custom-app.html) are a distinct concept from the four extension types, but they need a backend too, and the Extension Platform can host that just as well.
