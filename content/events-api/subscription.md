# Subscribe and Receive events

## Subscribing to events

To subscribe events, you need to start by configuring an Akeneo PIM. 
You will find all the steps to follow in the Help center page [Subscribe to **events**](https://help.akeneo.com/pim/serenity/articles/manage-event-subscription.html):
- how to activate the event subscription,
- how and where to setup and verify your server URL,
- how to manage the Akeneo PIM permissions to filter events.

### Events API Request URLs

Request URL receives an HTTP POST containing data in response to activity.

In the Events API, your Events API Request URL is the target location. Akeneo PIM will deliver all the events, regardless of the event type, to this location.

Since your connected application will have only one Request URL, maybe you'll need to do an additional dispatch or routing server-side after receiving event data.

Your Request URL will receive JSON-based payloads containing wrapped event types.


## Receiving Events

Your Event API Request URL will receive events matching your subscriptions. The message which delivers these events can contain up to 10 events.

:warning: Be careful as some events can be sent in the wrong order, more than once, or get lost altogether. 

This is why the `event_id` and `event_datetime` are essential.
- The `event_id` allows you to track the events you have already processed. You will not receive events older than **1 hours**, so no need to keep track of them passed that.
- The `event_datetime` allows you to not processing an event if you receive an older event after a newer one.


### Events dispatched as JSON

When an event occurs, Akeneo PIM send an HTTP POST request to your Request URL. 
This request is JSON-based (`Content-Type: application/json`) and contains wrapped events. 

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
| event_datetime | The event_datetime contains the date and time of the event. | `2020-01-01T00:00:00+00:00` | Format ISO 8601 |
| author | The author property tells you who performed the action. | `Julia` or `magento_0000` | |
| author_type | The author_type is the type of user who performed the action. Like Julia, it can be a UI user or a REST API call coming from another application. | `ui` or `api` | |
| pim_source | The pim_source property helps you to identify which Akeneo PIM sent the event. | `demo.akeneo.com` | From `AKENEO_PIM_URL` environment variable |
| data | The data wrapper contains the product data. Learn more about the data wrapper, including its JSON schema, on our [REST API reference.](/api-reference.html#get_products) | | |

