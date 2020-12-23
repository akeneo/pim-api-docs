# Overview

_All the essential things you need to know._

## Scope of the Events API

### Events dispatched as JSON

When an event in your subscription occurs, we'll send an HTTP POST request to your Request URL. 

The event will be in the `Content-Type: application/json` format:

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
TODO

### Request body
TODO
