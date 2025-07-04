# Concepts

## Subscriber

A subscriber represents the connection to a specific PIM instance and acts as the key reference for managing subscriptions and receiving events. It requires a connection to this PIM, so each subscriber is tied to **a single PIM instance and connection**. In a multi-tenant context—such as when your App is installed on multiple PIM instances—users must create a separate subscriber for each PIM instance to ensure accurate event handling across all instances.


The following properties represent a subscriber:

| Property | Value | Description                                                                     |
| --- | --- |---------------------------------------------------------------------------------|
| `id` | Automatically populated | Identifier of the subscriber inside the Event Platform                   |
| `name` | Populated by the user at creation | Name of the subscriber                                                          |
| `subject` | From `X-PIM-URL` header parameter | URL of the targeted source                                                      |
| `technical_email` | Populated by the user at creation | A contact email will be used to notify you in case of unexpected behaviour       |
| `status` | Automatically populated | The subscriber status                                                           |

The statuses for a subscriber are:

| Status | Description |
| --- | --- |
| `active` | The destination will receive notifications for events tracked by the subscriber |
| `deleted` | The subscriber is inactive and cannot be reactivated |

For comprehensive details on managing subscribers, consult the complete API reference [here](/event-platform/api-reference.html).

## Subscription

A subscription is an enrollment for one or more event types from a specified source to a particular destination. By adding a new subscription, you ensure that you receive notifications whenever a tracked event occurs in your Akeneo system. Each subscription is linked to a single subscriber.

The following properties represent a subscription:

| Property | Value | Description |
| --- | --- | --- |
| `id` | Automatically populated | Identifier of the subscription within the Event Platform |
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

::: info
We will consider adding other subscription destinations based on feedback. Please [fill-in this form](https://forms.gle/XsZ7rovRnqfAn4xF9) to propose & upvote new destination types.
:::


### Pub/Sub subscription

This is the **preferred and most resilient method** for consuming events. It leverages Google Cloud's managed messaging service.

#### Key Advantages

- **Managed Scalability & Reliability:** Google Pub/Sub inherently handles high throughput and traffic bursts, absorbing the complexities of scaling.
- **Reduced Infrastructure Burden:** Significantly lowers the operational overhead and risk for the customer.
- **Simplified Integration:** Easier setup and maintenance compared to managing a custom HTTP endpoint.

#### Configuration

For the `pubsub` subscription type, the `config` property needed when creating the subscription requires both the project ID and the topic ID.

```json[snippet:PubSub subscription]

{
    "source": "pim",
    "subject": "https://my-pim.cloud.akeneo.com",
    "events": [
        "com.akeneo.pim.v1.product.updated"
    ],
    "type": "pubsub",
    "config": {
        "project_id": "your_google_project_id",
        "topic_id": "your_google_pubsub_topic_id"
    }
}
```

#### Allow the Event Platform to publish in your Pub/Sub topic

To use a Pub/Sub subscription, you need to complete a few additional steps to ensure we have permission to publish into your Pub/Sub topic:

- In the Google Cloud console, go to "**Pub/Sub > Topics**"
- Next to the topic you want to use, click "**…**" and then "**View permissions**"
- Click on **ADD PRINCIPAL**
- Past the following service account address into the "**New principals**" text box: `delivery-sa@akecld-prd-sdk-aep-prd.iam.gserviceaccount.com`
- In the Role drop-down list, select "**Pub/Sub**" and "**Pub/Sub Publisher**"
- Click "**Save**"

For some configuration, you might also need our GCP project number : `973566433018`

For comprehensive details on managing subscriptions, consult the complete API reference [here](/event-platform/api-reference.html).

### HTTPS subscription

This option pushes events directly to a HTTP endpoint. It offers flexibility but requires careful infrastructure planning.

#### Critical Requirements & Considerations

- **Strong Infrastructure:** The endpoint must be highly available and designed to handle variable event loads.
    - This also depends on the **source PIM's size and activity**. A small PIM with few SKUs won't generate the same volume as a large instance with many jobs. Thus, the **HTTP endpoint** can be adjusted based on the PIM's intended use.
- **Mandatory Rate Limiting (HTTP 429):**
    - Our platform **dynamically adjusts its delivery rate from 1 to 100 events per second.**
    - This adaptive mechanism **relies entirely on the endpoint correctly returning an `HTTP 429 "Too Many Requests"` status** when its capacity is reached. [ref](https://api.akeneo.com/event-platform/key-platform-behaviors.html#optimized-throughput)

::: warning
Endpoints without proper HTTP 429 handling are at high risk of being overwhelmed, leading to event loss and subscription suspension.
:::

- **Fast Acknowledgement:** Endpoints must respond with an `HTTP 200 OK` within **5 seconds**. Delays trigger retries and can lead to suspension. [ref](https://api.akeneo.com/event-platform/key-platform-behaviors.html#delivery-timeout)
    - **Recommendation:** Implement an asynchronous processing model (e.g., using an internal queue) to acknowledge events quickly and process them separately.
- **Suspension Policy:** Subscriptions may be suspended due to repeated errors (e.g., `4xx`/`5xx` status codes, timeouts, misconfigured SSL). [ref](https://api.akeneo.com/event-platform/key-platform-behaviors.html#suspension-policy)


#### Configuration

For the `https` type, the `config` property requires:

- a URL using the HTTPS protocol;
- an endpoint accessible through public internet, without any form of authentication or redirection.

Additionally, it requires at least a primary secret (with an optional secondary secret) to sign the messages sent to the specified URL.

```json[snippet:Https subscription]

{
  "source": "pim",
  "subject": "https://my-pim.cloud.akeneo.com",
  "events": [
    "com.akeneo.pim.v1.product.updated"
  ],
  "type": "https",
  "config": {
    "url": "https://your_webhook_url",
    "secret": {
      "primary": "your_primary_secret_to_sign_the_payload",
      "secondary": "your_secondary_secret_to_sign_the_payload"
    }
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

**Example: Verifying an HMAC signature in Node.js**

You can use your programming language of choice to implement HMAC verification. Below is an example in Node.js, which demonstrates how to compute the HMAC signature using the SHA-256 algorithm and compare it with the received signature.

```
const crypto = require('crypto');

const secret = 'your_primary_secret_value';
const receivedSignature = req.header('X-AKENEO-SIGNATURE-PRIMARY');

// Compute the HMAC signature using the request body
const computedSignature = crypto
  .createHmac('sha256', secret)
  .update(JSON.stringify(req.body))
  .digest('hex');

// Compare computed signature with the received one
if (computedSignature !== receivedSignature) {
  // Handle the case where the signature does not match
  return;
}

// If the signatures match, the payload is verified and can be processed ✅
```

##### Webhooks IP Range

If you want to add an additional layer of security, you can whitelist our service’s IP range.

We currently use a static IP address provided by Google Cloud: `34.140.80.128`

**However, we cannot guarantee that this IP address will remain unchanged indefinitely.** Therefore, we strongly recommend whitelisting the `europe-west1` IP ranges from [Google Cloud's IP ranges list](https://www.gstatic.com/ipranges/cloud.json) to ensure continuous access.

## Subscription Filters

When configuring a subscription, you can optionally define a **filter** to receive **only the events that match specific criteria**.

**Regardless of the destination type, we strongly advise to utilize event filters.** This ensures you only subscribe to and receive events that are relevant to your specific integration needs.

You can find the list of currently available filters and the correct syntax to use [here](/event-platform/available-filters.html).

### Example
Let’s say you want to receive only the events triggered by a specific user, identified by the UUID `ea0fe94f-417e-4078-a40b-38645ba90ebe`.
You can configure your subscription with the following filter:

```json[snippet:Filtered subscription]
{
  "source": "pim",
  "subject": "https://my-pim.cloud.akeneo.com",
  "events": [
    "com.akeneo.pim.v1.product.updated"
  ],
  "type": "https",
  "config": {
    "url": "https://your_webhook_url",
  }
  "filter": "user=\"ea0fe94f-417e-4078-a40b-38645ba90ebe\""
}
```

## Events Format

Our platform standardises event data across services using the [CloudEvents specification](https://github.com/cloudevents/spec). CloudEvents provides a consistent structure for event data, ensuring interoperability and simplifying event handling. Each event includes essential metadata such as the event type, source, ID, and timestamp.

The cloud event will be sent in a [structured mode](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md#message), meaning the event data and its metadata are in the payload you'll receive. This apply to every subscription destination type.


Example of an event payload for a productDeleted event

```json[snippet:Event]

{
  "specversion": "1.0",
  "id": "018e197c-dfe2-70f8-9346-1a8e016f5fbb",
  "source": "pim",
  "type": "com.akeneo.pim.v1.product.deleted",
  "subject": "0190fe8a-6213-76ce-8a9f-ba36a5ef555a",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.deleted.schema.json",
  "time": "2024-03-07T15:16:37Z",
  "data": {
    "product": {
      "uuid": "3444ec1b-058e-4208-9b6c-284f47a7aa17"
    }
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "api"
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

::: panel-link Authorization and authentication requirements [Next](/event-platform/authentication-and-authorization.html)
:::
