# Product models
TODO

## Product model created
TODO

## Product model udpated
TODO
 
## Product model removed

### Format
A product model removed event follows this format:
::: event_api_reference content/events-reference/events-reference-v5/resources/product-model-removed-50.yml
:::

### Example
```json
{
    "events": [
        {
            "action": "product_model.removed",
            "event_id": "c306e088-fb76-479c-bbc0-18fef19da75d",
            "event_date": "2020-10-20T09:13:59+00:00",
            "author": "peter",
            "author_type": "ui",
            "pim_source": "https://demo.akeneo.com",
            "data": {
                "resource": {
                    "code": "sunglasses"
                }
            }
        }
    ]
}
```