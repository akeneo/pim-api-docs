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

Your Event API Request URL will receive events matching your subscriptions. The message which delivers these events can contain up to `10` events.

::: warning
Be careful as some events can be sent in the wrong order, more than once, or get lost altogether.

This is why the `event_id` and `event_datetime` are essential.
- The `event_id` uniquely identify each event.
  This allows you to log the events you have already processed and not handle more than once.
- The `event_datetime` allows you to ignore an outdated event.

:::


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

| Name | Description |
| ---- | ------- |
| `X-Akeneo-Request-Signature` | The signature of the payload to verify the authenticity of the request
| `X-Akeneo-Request-Timestamp` | The time at which the request was sent (unix timestamp in seconds)

### Request body

| Name | Description | Example | Format |
| ---- | ----------- | ------- | ------ |
| `action` | Helps you identify the API event type you received, which action has been done in the PIM. | `product.created` | |
| `event_id` | Unique identifier of the event. It allows you to ensure you received the same API event only one time. | `6ad821d8-2468-4632-89d2-92e442c72313` | UUID V4|
| `event_datetime` | Contains the date and time of the event. | `2020-01-01T00:00:00+00:00` | Format ISO 8601 |
| `author` | Tells you who performed the action. | `Julia` or `magento_0000` | |
| `author_type` | Type of user who performed the action. Like Julia, it can be a UI user or a REST API call coming from another application. | `ui` or `api` | |
| `pim_source` | Identify which Akeneo PIM sent the event. | `demo.akeneo.com` | From `AKENEO_PIM_URL` environment variable |
| `data` | Contains the resource data. Learn more about the data wrapper, including its JSON schema, on our [Events API Reference](/events-reference/events-reference-serenity/products.html). | | |

