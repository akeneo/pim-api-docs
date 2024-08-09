# Concepts

## Events

### Events Format

Our platform uses the [CloudEvents specification](https://github.com/cloudevents/spec) to standardize event data across services. CloudEvents provides a consistent structure for event data, ensuring interoperability and simplifying event handling. Each event includes essential metadata such as the event type, source, ID, and timestamp.

example of a event payload for a productDeleted event

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

## Event Overview

Here is the list of all the available events :

|  Event family       |  event |
|----------|-----------------------------------------------|
| **product** | `com.akeneo.pim.v1.product.created`<br/>`com.akeneo.pim.v1.product.updated`<br/>`com.akeneo.pim.v1.product.deleted`     |
| **product model** | `com.akeneo.pim.v1.product-model.created`<br/>`com.akeneo.pim.v1.product-model.updated`<br/>`com.akeneo.pim.v1.product-model.deleted`      |
| **asset** | `com.akeneo.pim.v1.asset.created`<br/>`com.akeneo.pim.v1.asset.updated`<br/>`com.akeneo.pim.v1.asset.deleted`     |
| **reference entity** | `com.akeneo.pim.v1.reference-entity-record.updated`<br/>`com.akeneo.pim.v1.reference-entity-record.deleted`   |
| **category** | `com.akeneo.pim.v1.category.created`<br/>`com.akeneo.pim.v1.category.updated`<br/>`com.akeneo.pim.v1.category.deleted`     |
| **family** | `com.akeneo.pim.v1.family.updated`<br/>`com.akeneo.pim.v1.family.deleted`     |
| **attribute** | `com.akeneo.pim.v1.attribute.updated`<br/>`com.akeneo.pim.v1.attribute.deleted`<br/>`com.akeneo.pim.v1.attribute-option.updated`<br/>`com.akeneo.pim.v1.attribute-option.deleted`<br/>`com.akeneo.pim.v1.attribute-group.updated`<br/>`com.akeneo.pim.v1.attribute-group.deleted`     |
| **connection** | `com.akeneo.pim.v1.app.deleted`<br/>`com.akeneo.pim.v1.connection.deleted`     |

Events are dispatched regardless of their triggers. Possible triggers include:

- **Interface Change**: When a client modifies data directly through the user interface.
- **API Change**: When data is updated via the API, whether by the client or through an app/connection.
- **Mass Action Change**: When multiple entities are updated at once, typically during bulk operations.
- **Rules Change**: When the rule engine is used to make modifications.
- **Import Change**: When data is brought in via the import engine.

For more event specific details, consult our [event list page](/akeneo-event-platform/available-events.html).

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
