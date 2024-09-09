# Concepts

## Subscriber

Simply put, a subscriber represents a connection to a specific event source, like a PIM. While you can attach multiple subscribers to your source, the general recommendation is to configure only one. However, your setup will require creating various subscribers for a multi-tenant context.

The following properties represent a subscriber:

| Property | Value | Description                                                                     |
| --- | --- |---------------------------------------------------------------------------------|
| `id` | Automatically populated | Identifier of the subscriber inside the Akeneo Event Platform                   |
| `tenant_id` | Automatically populated | The tenant identifier (an Akeneo PIM identifier) of the subscriber-targeted PIM |
| `client_id` | From `X-PIM-CLIENT-ID` header parameter | The App/connection client_id that has been used to create the subscriber        |
| `name` | Populated by the user at creation | Name of the subscriber                                                          |
| `subject` | From `X-PIM-URL` header parameter | URL of the targeted source                                                      |
| `technical_email` | Populated by the user at creation | A contact email will be used to notify you in case of unexpected behaviour       |
| `status` | Automatically populated | The subscriber status                                                           |

The statuses for a subscriber are:

| Status | Description |
| --- | --- |
| `active` | The destination will receive notifications for events tracked by the subscriber |
| `deleted` | The subscriber is inactive and cannot be reactivated |

For comprehensive details on managing subscribers, consult the complete API reference [here](/akeneo-event-platform/api-reference.html).

## Subscription

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
| `config` | Populated by the user at creation | The subscription configuration is based on the subscription type. See below for further details. |

The statuses for a subscription are:

| Status | Description                                                                                                                                                                                                                                                                            |
| --- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `active` | The destination will receive notifications for events monitored by the subscription                                                                                                                                                                                                    |
| `deleted` | The subscription is inactive and cannot be reactivated                                                                                                                                                                                                                                 |
| `suspended` | The subscription can be suspended by the platform due to excessive errors, or manually by the user. However, you can resume it. Suspending a subscription stops all events from being sent to it. Events are not saved and are lost until the subscription is resumed |
| `revoked` | The subscription has been automatically revoked because the connection or the app linked to the subscriber was removed from the PIM                                                                                                                                                    |

## Subscription types

### HTTPS subscription

#### Configuration

For the `https` type, the `config` property requires:

- a URL using the HTTPS protocol;
- a URL that accepts HEAD requests and responds with an HTTP status code other than 404 or 5xx.

Additionally, it requires at least a primary secret (with an optional secondary secret) to sign the messages sent to the specified URL.

```json
{
  "url": "https://your_webhook_url",
  "secret": {
    "primary": "your_primary_secret_to_sign_the_payload",
    "secondary": "your_secondary_secret_to_sign_the_payload"
  }
}
```

##### HMAC signature for webhook payloads

HMAC (Hash-based Message Authentication Code) is a method used to verify the integrity and authenticity of a message. Using a secret key shared between the sender and receiver, HMAC ensures that the payload is untampered and originates from a trusted source.

We sign each payload for HTTPS subscriptions using the secret you provided in the configuration.

We include the signature in the payload headers:

- `X-AKENEO-SIGNATURE-PRIMARY`: Contains the signature using the primary secret you provided.
- `X-AKENEO-SIGNATURE-SECONDARY`: Contains the signature using the secondary secret you provided if you have one.
- `X-AKENEO-SIGNATURE-ALGORITHM`: The algorithm we used to sign the payload (currently always `HmacSHA256`).

We generate two signatures for each payload to facilitate secret rotation on your side.

To verify the signature on your end:

1. Receive the payload and extract the signature from the headers.
2. Using the shared secret key, compute the HMAC signature of the received payload using the same algorithm.
3. Compare the computed HMAC signature with the received HMAC signature.

This is the easiest way to ensure the message you receive comes from our platform.

##### Webhooks IP Range

If you want to add an additional layer of security, you can whitelist our service’s IP range.

We currently use a static IP address provided by Google Cloud: `34.140.80.128`

**However, we cannot guarantee that this IP address will remain unchanged indefinitely.** Therefore, we strongly recommend whitelisting the `europe-west1` IP ranges from [Google Cloud's IP ranges list](https://www.gstatic.com/ipranges/cloud.json) to ensure continuous access.

### Pub/Sub subscription

#### Configuration

For the `pubsub` subscription type, the `config` property required when creating the subscription property requires both the project ID and the topic ID.

```json
{
    "project_id": "your_google_project_id",
    "topic_id": "your_google_pubsub_topic_id"
}
```

#### Allow the Akeneo Event Platform to publish in your Pub/Sub topic

To use a Pub/Sub subscription, you need to complete a few additional steps to ensure we have permission to publish into your Pub/Sub topic:

- In the Google Cloud console, go to "**Pub/Sub > Topics**"
- Next to the topic you want to use, click "**…**" and then "**View permissions**"
- Click on **ADD PRINCIPAL**
- Past the following service account address into the "**New principals**" text box: `delivery-sa@akecld-prd-sdk-aep-prd.iam.gserviceaccount.com`
- In the Role drop-down list, select "**Pub/Sub**" and "**Pub/Sub Publisher**"
- Click "**Save**"

For comprehensive details on managing subscriptions, consult the complete API reference [here](/akeneo-event-platform/api-reference.html).

## Events Format

Our platform standardises event data across services using the [CloudEvents specification](https://github.com/cloudevents/spec). CloudEvents provides a consistent structure for event data, ensuring interoperability and simplifying event handling. Each event includes essential metadata such as the event type, source, ID, and timestamp.

Example of an event payload for a productDeleted event

```json[snippet:Event]

{
  "specversion": "1.0",
  "id": "018e197c-dfe2-70f8-9346-1a8e016f5fbb",
  "source": "akeneo-event-platform",
  "type": "com.akeneo.pim.v1.product.deleted",
  "subject": "0190fe8a-6213-76ce-8a9f-ba36a5ef555a",
  "datacontenttype": "application/json",
  "dataschema": "com.akeneo.pim.v1.product.deleted.schema.json",
  "time": "2024-03-07T15:16:37Z",
  "data": {
    "product": {
      "uuid": "3444ec1b-058e-4208-9b6c-284f47a7aa17"
    }
  }
}
```

|         |   |
|----------|-----------------------------------------------|
| `specversion` | The version of the CloudEvent specification used by the event     |
| `id` | The unique identifier of the event |
| `source`            | Identifies the context in which the event happened     |
| `type`         | The event type |
| `subject`         | The `subscriptionID` the event comes from |
| `datacontenttype`         | Content type of `data` value |
| `dataschema`         | Identifies the schema that `data` adheres to |
| `time`         | Timestamp of when the event happened |
| `data`         | The event JSON payload |

For more information, consult the [CloudEvents spec attributes](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md).

## Key platform behaviors

Your subscribing service implementation and architecture must deal with the following capabilities and constraints to consume events from the platform at its best.

### Delivery timeout

Specifically for the HTTPS destination type, the delivery timeout ensures that messages are processed within a specified period. Our system expect from your endpoint to process the request in **`3 seconds`**. If the request take longer than this duration, we stop trying to deliver it, the event will enter in the retry process.

Under normal circumstances, your HTTPS endpoint must handle the event as fast as it can.
**Our recommendation** is to put the message in a `queuing system` or in a `database`, and process the event asynchronously.

### At least once

We're not in a "at most once" paradigm but in a **`at least once`** one. This paradigm involves two things your service must compose with:

- Expect duplicates
- Expect un-ordered events

To help identify duplicated events and deal with un-ordered events if it's something critical for your business, you can rely on both fields  **`id`** and **`time`** from the event, which provide unique identifiers and publication timestamp for each event.

### Retry policy

Retry policies help manage transient failures and guarantee message delivery even when issues occur during a certain amount of time.
We handle retry back-off internally, and it is not configurable per tenant.

If our platform is unable to deliver the event we will try to deliver it again at the following pace:

TODO document when we will try to send the event again once implemented

### Suspension policy

Our system enforces strict suspension policy to maintain the integrity and reliability of event delivery.

Your subscription will be automatically suspend in the following cases:

- Your HTTPS endpoint respond with a `404 Not Found` http status, the subscription is suspended right away.
- Your HTTPS endpoint respond with `5XX Server Error` http status or do not respond within the delivery timeout period for more than `5%` of the requests during the last hour.
- We're not authorized to publish message in your Google Cloud Topic, the subscription is suspended right away

When the platform decide to suspend your subscription, it will notify the **technical email address** you provided with contextual information.

::: panel-link Now that you know the basic concepts, let's get started! [Next](/akeneo-event-platform/getting-started.html)
:::
