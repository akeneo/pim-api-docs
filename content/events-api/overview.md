# Overview

_All the essential things you need to know._

By using the Akeneo Events API, you will receive events on: product creation, product update, and product deletion. 
The feature is working as well on simple products as on product models and variants.

Simple products and product variants have similar event formats, but events related to product models are a bit different that is why we detailed each event type format in our [Events API Reference](../events-reference/events-reference-serenity/product-models.html)

::: info 
For more information, please read our help center article [What is an event subscription?](https://help.akeneo.com/pim/serenity/articles/what-is-an-event-subscription.html) to discover which type of events the Akeneo PIM triggers and in what cases. 
It explains to the Akeneo PIM users how to setup their PIM to use an extension that uses events to synchronize the Akeneo PIM product data with other applications. 
::: 

## The event loop

Many apps built using the Events API will follow the same abstract event-driven sequence:

1. A user (UI or technical) creates a circumstance that triggers an event in Akeneo PIM.
2. Your server receives a JSON payload describing that event.
3. Your server acknowledges receiving the event.
4. Your business logic decides what to do about that event.
5. Your server carries out that decision.

Using the REST API with the Events API empowers your app to do much more than just listen and reply to messages.

::: tips
The volume of events will vary depending on:
- the payload size (that mainly depends on the product values and product associations),
- and the activity on your Akeneo PIM (meaning the number of events that happened into your PIM).

Your Request URL might receive *many* events and requests. Consider decoupling the way you process and react to events.
:::

### Events dispatched as JSON

When an event in your subscription occurs, we'll send an HTTP POST request to your Request URL. 

The event will be in the `Content-Type: application/json` format:

```json
{
    "events": [
        {
            "action": "product.created",
            "author": "julia",
            "author_type": "ui",
            "event_id": "6ad821d8-2468-4632-89d2-92e442c72313",
            "event_datetime": "2020-01-01T00:00:00+00:00",
            "pim_source": "staging.akeneo.com",
            "data": {
                "resource": {...}
            }
        }
    ]
}
```

### Request header

| Name | Example | Format |
| ---- | ------- | ------ |
| x-akeneo-request-signature | `d4582dd13a7b654c212d70b4c705e0ab0c0e6eb7f6524080f4d39121f88e6061` | |
| x-akeneo-request-timestamp | `1602520454` | Unix timestamp in seconds |

### Request body

| Name | Description | Example | Format |
| ---- | ----------- | ------- | ------ |
| action | The action property helps you identify the API event type you received, which action has been done in the PIM. | `product.created` | `[resource_name].[event_name]` |
| event_id | The event_id is the unique identifier of the event. It allows you to ensure you received the same API event only one time. | `6ad821d8-2468-4632-89d2-92e442c72313` | UUID V4|
| event_datetime | The event_datetime contains the date and time of the event. | 2020-01-01T00:00:00+00:00 | Format ISO 8601 |
| author | The author property tells you who performed the action. | `julia` or `magento_0000` | |
| author_type | The author_type is the type of user who performed the action. It can be a UI user, like Julia, or a REST API call coming from another application. | `ui` or `api` | |
| pim_source | The pim_source property helps you to identify which Akeneo PIM sent the event. | `staging.akeneo.com` | From `AKENEO_PIM_URL` environment variable |
| data | The data wrapper contains the product data. Learn more about the data wrapper, including its JSON schema, on our REST API website: https://api.akeneo.com/api-reference.html#get_products | | |

