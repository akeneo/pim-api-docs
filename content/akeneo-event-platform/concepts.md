# Concepts

## Retry policies

In distributed systems, ensuring reliable message processing is crucial. Retry policies help manage transient failures and guarantee message delivery even when encountering issues.

Here, we outline the key **retry policies** implemented in our system.

### ACK timeout

ACK timeout ensures that messages are acknowledged within a specified period. In our system, the ACK timeout is set to **`3 seconds`**. If an acknowledgment isn't received within this timeframe, the message is retried. This mechanism prevents message loss due to slow consumers or network delays, ensuring timely processing.

### At least once

The **"at least once"** delivery guarantee means that we resend events if a `HTTP 200 OK` response isn't received within **`3 seconds`**. This policy ensures that no message is lost, though it may result in duplicate deliveries.

Additionally, due to this system, **the order of events may be unpredictable**. Developers should design their systems to handle potential duplicates gracefully, ensuring idempotent processing.

To help identify duplicated events, use the **`X-Correlation-ID`** header, along with **`eventId`** and **`publicationTime`**, which provide unique identifiers and timestamps for each event.

### Retry back-off

Back-off policies manage the intervals between retry attempts. We handle retry back-off internally, and it is not configurable per tenant.

Instead of immediate retries, the system waits for a specified back-off period, which can vary depending on the service load. **If the retry limit is reached without a successful acknowledgment, the event is lost.**

Proper handling of transient issues through back-off and retry helps maintain system stability and reliability under varying loads.

### Revocation policies

Our system enforces strict revocation policies to maintain the integrity and reliability of event delivery.

If your endpoint responds with a `HTTP 404` Not Found status, we will revoke your subscription, necessitating the creation of a new subscription.

In cases where your endpoint fails repeatedly with `HTTP 429` Too Many Requests or `5XX` Server Error statuses, we will suspend your subscription. You will then need to manually resume it using the API.

For both revocations and suspensions, we will send a notification to the **technical email address** you provided, keeping you informed of any actions taken.

::: panel-link <!-- TODO TEXT PANEL LINK -->[Next](/akeneo-event-platform/getting-started.html)
:::
