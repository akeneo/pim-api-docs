# Akeneo Event Platform

## Akeneo Event Platform Overview

The **Akeneo Event Platform (AEP)** seamlessly integrates with Akeneo PIM through a subscription-based event system. External applications can subscribe to specific events triggered within Akeneo PIM, enabling real-time data updates and synchronization.

AEP ensures smooth and efficient responses to changes in your PIM, such as product updates, deletions, and other significant events, enhancing your system’s responsiveness and connectivity.

## What AEP Is Not

To set the right expectations, here's what AEP is **not**:

- **Not a Data Storage Solution**: AEP streams real-time events but does not store event data permanently.
- **Not a Replacement for Akeneo PIM API**: AEP complements the Akeneo PIM API by offering event-driven capabilities but does not replace the core functionalities of the PIM API.
- **Not a Business Logic Handler**: AEP transmits events to subscribed endpoints but does not handle complex business logic or workflows.
- **Not the v2 of the Akeneo Event API**: AEP is a new platform with distinct functionalities and should not be considered as the next version of [Akeneo's Event API](https://api.akeneo.com/events-documentation/overview.html). AEP offers more granular event handling compared to the Event API.

## Requirements

Before using AEP, make sure you meet the following prerequisites:

- If you want to use a Pub/Sub subscription, you need to grant the Akeneo Event Platform publishing access. Follow these steps:
    1. In the Google Cloud Console, go to **Pub/Sub > Topics**.
    2. Next to the topic you want to use, click **...** and then **View permissions**.
    3. Click **ADD PRINCIPAL**.
    4. Paste the following service account address into the **New principals** text box: `delivery-sa@akecld-prd-sdk-aep-prd.iam.gserviceaccount.com`.
    5. In the Role drop-down list, select **Pub/Sub** and then **Pub/Sub Publisher**.
    6. Click **Save**.
- HTTP is not supported. Only HTTPS is allowed.
- For HTTPS destinations, ensure your server returns a 200 status code within 3 seconds when receiving messages containing events. See the [concept page]((/akeneo-event-platform/concepts.html)) about retry / revocation policy.
- For a subscription to an HTTPS destination, the URL must be valid and return a 200 status code after a HEAD request.
- The Akeneo Event Platform does not guarantee the delivery of events in order.
- Events are delivered at least once. While we strive for reliability, duplicate events may occur, so ensure your system is idempotent to handle potential duplicates.
- You can have up to 20 subscribers for each PIM instance.
- Each subscriber can have up to 20 subscriptions.

### Authentication

- AEP uses OAuth2-based authentication to secure event transmission. Each application or connection interacting with AEP must authenticate using client credentials.
- [Obtain your OAuth2 credentials](/akeneo-event-platform/getting-started.html) from the Akeneo PIM instance you are integrating with.

### Webhook Timeout Warning

- Ensure your webhook endpoints can respond within the within 3 seconds when receiving messages containing events. AEP expects timely responses to avoid event loss or unnecessary retries.

::: panel-link [Explore Key Concepts to deepen your understanding of the Akeneo Event Platform](/akeneo-event-platform/concepts.html)
:::
