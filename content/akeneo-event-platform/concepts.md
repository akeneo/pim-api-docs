# Concepts

## Subscriber

### What is a subscriber?

Simply put, a subscriber represents a connection to a specific event source, like a PIM. While you can attach multiple subscribers to your source, the general recommendation is to configure only one. However, your setup will require creating various subscribers for a multi-tenant context.

The following properties represent a subscriber:

| Property | Value | Description                                                                     |
| --- | --- |---------------------------------------------------------------------------------|
| `id` | Automatically populated | Identifier of the subscriber inside the Akeneo Event Platform                   |
| `tenant_id` | Automatically populated | The tenant identifier (an Akeneo PIM identifier) of the subscriber-targeted PIM |
| `client_id` | From `X-PIM-CLIENT-ID` header parameter | The App/connection client_id that has been used to create the subscriber        |
| `name` | Populated by the user at creation | Name of the subscriber                                                          |
| `subject` | From `X-PIM-URL` header parameter | URL of the targeted source                                                      |
| `technical_email` | Populated by the user at creation | A contact email will be used to notify you in case of unexpected behavior       |
| `status` | Automatically populated | The subscriber status                                                           |

The statuses for a subscriber are:

| Status | Description |
| --- | --- |
| `active` | The destination will receive notifications for events tracked by the subscriber |
| `deleted` | The subscriber is inactive and cannot be reactivated |

For comprehensive details on managing subscribers, you can consult the complete API reference [here](/akeneo-event-platform/api-reference.html).

## Subscription

### What is a subscription?

A subscription is an enrollment for one or more event types from a specified source to a particular destination. By adding a new subscription, you ensure that you receive notifications whenever a tracked event occurs in your Akeneo system. Each subscription is linked to a single subscriber.

The following properties represent a subscription:

| Property | Value | Description |
| --- | --- | --- |
| `id` | Automatically populated | Identifier of the subscription within the Akeneo Event Platform |
| `source` | Populated by the user at creation | Source of the event (currently, the only source available is `pim`) |
| `subject` | From `X-PIM-URL` header parameter | URL of the targeted source |
| `type` | Populated by the user at creation | Type of the subscription (currently, there are two available types:  `https` and `pubsub`) |
| `events` | Populated by the user at creation | A list of events that the subscription is tracking |
| `status` | Automatically populated | The subscription status |
| `config` | Populated by the user at creation | The subscription configuration, based on the subscription type. See below for further details. |

The statuses for a subscription are:

| Status | Description |
| --- | --- |
| `active` | The destination will receive notifications for events monitored by the subscription |
| `deleted` | The subscription is inactive and cannot be reactivated |
| `suspended` | The subscription has been deactivated by the event platform itself due to excessive errors, or manually by the user. However, you can resume it. Suspending a subscription stops all events from being sent to it. Events are not saved and are lost until the subscription is resumed |
| `revoked` | The subscription has been automatically deactivated because the destination responded with an HTTP 404. You can manually reactivate it. Suspending a subscription halts all event deliveries to this subscription. Events are not saved and are lost until the subscription is resumed |

### Best practices

#### HTTP subscription

##### Configuration

For the `https` type, the `config` property requires:

- a URL using the HTTPS protocol;
- a URL that accepts HEAD requests and responds with an HTTP status code other than 404 or 5xx.

Additionally, it requires at least a primary secret (with an optional secondary secret) to sign the messages sent to the specified URL.

```json

"url": "https://your_webhook_url",
"secret": {
    "primary": "your_primary_secret_to_sign_the_payload",
    "secondary": "your_secondary_secret_to_sign_the_payload"
}
```

##### HMAC signature for webhook payloads

HMAC (Hash-based Message Authentication Code) is a method used to verify the integrity and authenticity of a message. Using a secret key shared between the sender and receiver, HMAC ensures that the payload is untampered and originates from a trusted source.

For HTTPS subscriptions, we sign each payload using the secret you provided in the configuration.

We include the signature in the payload headers:

- `X-AKENEO-SIGNATURE-PRIMARY`: Contains the signature using your provided primary secret.
- `X-AKENEO-SIGNATURE-SECONDARY`: Contains the signature using your provided secondary secret if you have one.
- `X-AKENEO-SIGNATURE-ALGORITHM`: The algorithm we used to sign the payload (currently always `HmacSHA256`).

We generate two signatures for each payload to facilitate secret rotation on your side.

To verify the signature on your end:

1. Receive the payload and extract the signature from the headers.
2. Using the shared secret key, compute the HMAC signature of the received payload using the same algorithm.
3. Compare the computed HMAC signature with the received HMAC signature.

This is the easiest way to ensure the message you receive is from us.

#### Pub/Sub subscription

##### Configuration

For the `pubsub` type, the `config` property requires both the project ID and the topic ID.

```json

"project_id": "your_google_project_id",
"topic_id": "your_google_topic_id"
```

##### Allow the Akeneo Event Platform to publish in your Pub/Sub topic

To use a Pub/Sub subscription, you need to complete a few additional steps to ensure we have permission to publish into your Pub/Sub topic:

- In the Google Cloud console, go to “**Pub/Sub > Topics**”
- Next to the topic you want to use, click “**…**” and then “**View permissions**”
- Click on **ADD PRINCIPAL**
- Past the following service account address into the “**New principals**” text box: `delivery-sa@akecld-prd-sdk-aep-prd.iam.gserviceaccount.com`
- In the Role drop-down list, select “**Pub/Sub**” and “**Pub/Sub Publisher**”
- Click “**Save**”

For comprehensive details on managing subscriptions, consult the complete API reference [here](/akeneo-event-platform/api-reference.html).

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

::: panel-link Now that you're familiar with the basic concepts, let's get started! [Next](/akeneo-event-platform/getting-started.html)
:::
