# Akeneo Event Platform

## Akeneo Event Platform Overview

The **Akeneo Event Platform (AEP)** seamlessly integrates with Akeneo PIM through a subscription-based event system. External applications can subscribe to specific events triggered within Akeneo PIM, enabling faster data updates and synchronization than continuous polling.

AEP ensures smooth and efficient responses to changes in your PIM, such as product updates, deletions, and other significant events, enhancing your system’s responsiveness and connectivity.

## What AEP Is Not

To set the right expectations, here's what AEP is **not**:

- **Not a Data Storage Solution**: AEP streams and distribute events but does not store event data permanently.
- **Not a Replacement for Akeneo PIM API**: AEP complements the Akeneo PIM API by offering event-driven capabilities but does not replace its core functionalities.
- **Not a Business Logic Handler**: AEP transmits events to subscribed endpoints but does not handle complex business logic or workflows.
- **Not the v2 of the Akeneo Event API**: AEP is a new platform with distinct functionalities and should not be considered as the next version of [Akeneo's Event API](https://api.akeneo.com/events-documentation/overview.html). AEP offers more granular event handling compared to the Event API and retries capabalities.

## Usage Conditions

Before using AEP, make sure you meet the following prerequisites:

- Access to the PIM for the authentication credential
- For subscription destinations
  - **`PubSub`** & **`HTTPS`** subscription are offered
  - For PubSub destination, make sure you meet [the requirements](/akeneo-event-platform/concepts.html#pub-sub-subscription)
  - For HTTPS destination, make sure you meet [the requirements](/akeneo-event-platform/concepts.html#https-subscription)

- You can have up to 20 subscribers for each PIM instance.
- Each subscriber can have up to 20 subscriptions.

### Authentication

- AEP uses OAuth2-based authentication to secure event transmission. Each application or connection interacting with AEP must authenticate using client credentials.
- [Obtain your OAuth2 credentials](/akeneo-event-platform/getting-started.html) from the Akeneo PIM instance you are integrating with.

::: panel-link [Explore Key Concepts to deepen your understanding of the Akeneo Event Platform](/akeneo-event-platform/concepts.html)
:::
