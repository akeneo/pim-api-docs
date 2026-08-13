# FAQ

### Who's responsible if my hosted app goes down or has a bug?

Akeneo handles support for its own integrations (the PIM API, extensions, Event Platform) and for provisioning and billing. Issues with the platform itself (Upsun's infrastructure, runtime, routing) go directly through the Platform's own support, since that's the Upsun team's responsibility. The application code you deploy is yours: its behavior, its dependencies, and keeping it running are on you (or your partner) to debug and fix.

### Can I bring my own Upsun/Platform.sh account instead of the Akeneo-provisioned one?

No. Provisioning isn't self-service — Akeneo creates your organization and project (and an admin account on it) as part of the Extension Platform offering, billed through your Akeneo relationship rather than a separate Upsun contract.

### What languages/runtimes are supported?

Any language or runtime that the Platform itself supports. It's not limited to PHP or Node — those are just the languages used in the available demo apps.

### Where do I see what this is costing me?

Cost and usage data is available in your Akeneo customer portal — see the Help Desk for details rather than this documentation.

### Can I use this hosting for something unrelated to a PIM extension?

Yes. It's a general-purpose backend host connected to the PIM — running an Event Platform webhook receiver or a custom workflow with no PIM extension involved at all is just as valid a use case as hosting an extension backend.

### Can I use this to host a Custom App instead of an extension backend?

Yes. [Custom Apps](/apps/create-custom-app.html) are a distinct concept from the four extension types, but they need a backend too, and the Extension Platform can host that just as well.
