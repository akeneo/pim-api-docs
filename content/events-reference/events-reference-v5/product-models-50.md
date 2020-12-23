# Product models
TODO

## Product model created

### Format
A product model created event follows this format:
::: event_api_reference content/events-reference/events-reference-serenity/resources/product-model-created.yml
:::

### Example
```json
{
    "events": [
        {
            "action": "product_model.created",
            "event_id": "c306e088-fb76-479c-bbc0-18fef19da75d",
            "event_date": "2020-10-20T09:13:59+00:00",
            "author": "erp",
            "author_type": "api",
            "pim_source": "https://demo.akeneo.com",
            "data": {
                "resource": {
                    "code": "sunglasses",
                    "family": "accessories",
                    "family_variant": "accessories_colorsize",
                    "parent": null,
                    "categories": [
                        "master_accessories_sunglasses",
                        "supplier_zaro"
                    ],
                    "enabled": true,
                    "values": {
                        "collection": [
                            {
                                "locale": null,
                                "scope": null,
                                "data": [
                                    "winter_2020"
                                ]
                            }
                        ],
                        "image": [
                            {
                                "locale": null,
                                "scope": null,
                                "data": "9/9/c/c/99cc83f105199c667505cfa8ec1458c8be4f0814_sunglasses.jpg",
                                "_links": {
                                    "download": {
                                        "href": "http://demo.akeneo.com/api/rest/v1/media-files/9/9/c/c/99cc83f105199c667505cfa8ec1458c8be4f0814_sunglasses.jpg/download"
                                    }
                                }
                            }
                        ],
                        "ean": [
                            {
                                "locale": null,
                                "scope": null,
                                "data": "1234567890316"
                            }
                        ],
                        "name": [
                            {
                                "locale": null,
                                "scope": null,
                                "data": "Sunglasses"
                            }
                        ],
                        "weight": [
                            {
                                "locale": null,
                                "scope": null,
                                "data": {
                                    "amount": "800.0000",
                                    "unit": "GRAM"
                                }
                            }
                        ],
                        "description": [
                            {
                                "locale": "en_US",
                                "scope": "ecommerce",
                                "data": "<p>Brown and gold sunglasses</p>"
                            }
                        ]
                    },
                    "created": "2020-10-20T08:30:28+00:00",
                    "updated": "2020-10-20T09:13:59+00:00",
                    "associations": {
                        "PACK": {
                            "groups": [],
                            "products": [],
                            "product_models": []
                        },
                        "SUBSTITUTION": {
                            "groups": [],
                            "products": [],
                            "product_models": []
                        },
                        "UPSELL": {
                            "groups": [],
                            "products": [],
                            "product_models": []
                        },
                        "X_SELL": {
                            "groups": [],
                            "products": [],
                            "product_models": []
                        }
                    },
                    "quantified_associations": [],
                    "metadata": {
                        "workflow_status": "working_copy"
                    }
                }
            }
        }
    ]
}
```

## Product model udpated
TODO
 
## Product model removed
TODO
