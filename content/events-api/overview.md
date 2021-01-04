# Overview

_All the essential things you need to know._

## Scope of the Events API

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
            "event_date": "2020-01-01T00:00:00+00:00",
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
| event_id | The event_id is the unique identifier of the event. It allows you to be sure that you received the same event only one time. | `6ad821d8-2468-4632-89d2-92e442c72313` | UUID V4|
| event_date | The event_date contains the date and time of the event. | 2020-01-01T00:00:00+00:00 | Format ISO 8601 |
| author | The author attribute tells you who performed the action. | `julia` or `magento_0000` | |
| author_type | The author_type is the type of user who performed the action. It can be a UI user, like Julia, or a REST API call coming from another application. | `ui` or `api` | |
| pim_source | The pim_source attribute helps you to identify which Akeneo PIM sent the event. | `staging.akeneo.com` | From `AKENEO_PIM_URL` environment variable |
| data | The data wrapper contains the product data. Learn more about the data wrapper, including its JSON schema, on our REST API website: https://api.akeneo.com/api-reference.html#get_products | | |
