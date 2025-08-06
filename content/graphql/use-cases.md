# Use cases examples

:::info
Most `responses` below have been truncated to make them more readable
:::

:::info
We highly recommend using `variables` to make your query dynamic.

[More details](/graphql/best-practices.html#variables-usages)
:::

:::warning
All the examples below are demo data, and you must adapt the queries regarding your `attributes codes`, `locales`, `product model code` ...
:::

## Product model and their variation axis + family information

``` graphql [snippet: Query] 

{
  productModels(limit: 1) {
    links {
      next
    }
    items {
      variationAxes
      code
      family {
        code
        labels
      }
    }
  }
}
```
```json [snippet: Response] 

{
  "data": {
    "productModels": {
      "links": {
        "next": "Acme Classic Mens Black PVC Work Boots"
      },
      "items": [
        {
          "code": "Acme Classic Mens Black PVC Work Boots",
          "variationAxes": [
            "shoe_size"
          ],
          "family": {
            "code": "rubber_boots",
            "labels": [
              {
                "localeCode": "en_US",
                "localeValue": "Rubber Boots"
              }
            ]
          }
        }
      ]
    }
  }
}
```

## Variations of a product model with variation values & attribute values

``` graphql [snippet: Query] 

{
  products(
    limit: 1
    locales: ["en_US"]
    # You must use the code of the model
    parent: "Acme Classic Mens Black PVC Work Boots"
  ) {
    links {
      next
    }
    items {
      uuid
      enabled
      variationValues
      attributes {
        code
        type
        values
      }
    }
  }
}
```
```json [snippet: Response] 

{
  "data": {
    "products": {
      "links": {
        "next": "0aa5198a-7442-4722-a4be-d874640d792a"
      },
      "items": [
        {
          "uuid": "0aa5198a-7442-4722-a4be-d874640d792a",
          "enabled": "true",
          "variationValues": [
            {
              "attributeType": "pim_catalog_simpleselect",
              "attributeCode": "shoe_size",
              "value": {
                "locale": null,
                "data": "10",
                "channel": null
              }
            }
          ],
          "attributes": [
            {
              "code": "brand",
              "type": "akeneo_reference_entity",
              "values": [
                {
                  "locale": null,
                  "data": "acme",
                  "channel": null
                }
              ]
            },
            {
              "code": "color",
              "type": "akeneo_reference_entity",
              "values": [
                {
                  "locale": null,
                  "data": "black",
                  "channel": null
                }
              ]
            },
            {
              "code": "packshot",
              "type": "pim_catalog_asset_collection",
              "values": [
                {
                  "locale": null,
                  "data": [
                    "images_image_1_acme_classic_mens_black_pvc_work_boots_1_jpg_products"
                  ],
                  "channel": null
                }
              ]
            },
            {
              "code": "sku",
              "type": "pim_catalog_identifier",
              "values": [
                {
                  "locale": null,
                  "data": "1273192978",
                  "channel": null
                }
              ]
            },
            {
              "code": "name",
              "type": "pim_catalog_text",
              "values": [
                {
                  "locale": "en_US",
                  "data": "Acme Classic Mens Size 10 Black PVC Work Boots",
                  "channel": null
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```

## Product with attributes, family, group & categories ...

``` graphql [snippet: Query] 

{
  products(
    limit: 1
    locales: "en_US"
  ) {
    items {
      uuid
      variationValues
      parent {
        code
      }
      family {
        code
        labels
      }
      categories {
        code
        labels
      }
      attributes {
        code
        labels
        sortOrder
        type
        group {
          code
          labels
          sortOrder
        }
      }
    }
  }
}
```
```json [snippet: Response] 

{
  "data": {
    "products": {
      "items": [
        {
          "uuid": "002844f9-a470-42e2-8268-ddfd8f646593",
          "variationValues": null,
          "parent": null,
          "attributes": [
            {
              "code": "condition",
              "labels": [
                {
                  "localeCode": "en_US",
                  "localeValue": "Condition"
                }
              ],
              "sortOrder": 93,
              "type": "pim_catalog_simpleselect",
              "group": {
                "code": "specifications",
                "labels": [
                  {
                    "localeCode": "en_US",
                    "localeValue": "Specifications"
                  }
                ],
                "sortOrder": 10
              }
            },
            {
              "code": "returnable",
              "labels": [
                {
                  "localeCode": "en_US",
                  "localeValue": "Returnable"
                }
              ],
              "sortOrder": 29,
              "type": "pim_catalog_simpleselect",
              "group": {
                "code": "warranty",
                "labels": [
                  {
                    "localeCode": "en_US",
                    "localeValue": "Warranty"
                  }
                ],
                "sortOrder": 12
              }
            },
            {
              "code": "description",
              "labels": [
                {
                  "localeCode": "en_US",
                  "localeValue": "Description"
                }
              ],
              "sortOrder": 6,
              "type": "pim_catalog_textarea",
              "group": {
                "code": "marketing",
                "labels": [
                  {
                    "localeCode": "en_US",
                    "localeValue": "Marketing"
                  }
                ],
                "sortOrder": 2
              }
            }
          ],
          "categories": [
            {
              "code": "erp_roofing_nailers",
              "labels": [
                {
                  "localeCode": "en_US",
                  "localeValue": "Roofing Nailers"
                }
              ]
            },
            {
              "code": "master_tools_air_compressors_tools_accessories_nail_guns_roofing_nailers",
              "labels": [
                {
                  "localeCode": "en_US",
                  "localeValue": "Roofing Nailers"
                }
              ]
            },
            {
              "code": "print_roofing_nailers",
              "labels": [
                {
                  "localeCode": "en_US",
                  "localeValue": "Roofing Nailers"
                }
              ]
            },
            {
              "code": "ridgid",
              "labels": [
                {
                  "localeCode": "en_US",
                  "localeValue": "RIDGID"
                }
              ]
            }
          ],
          "family": {
            "code": "roofing_nailers",
            "labels": [
              {
                "localeCode": "en_US",
                "localeValue": "Roofing Nailers"
              }
            ]
          }
        }
      ]
    }
  }
}
```

## Product with assets and reference entity attributes

When fetching product, you can automatically load:
* The linked `reference entity` or `asset family` linked to a product by requesting the object `relatedObject`
* The linked `reference entity records` or `asset` linked to a product by adding the parameter `withRelatedObjectValues: true` when requesting the `values`

`nestedObjectValueLevel: 1` is functionally equivalent to `withRelatedObjectValues: true`.

Use `nestedObjectValueLevel: 2` if you need to go one level deeper.

:::info
We recommand using the `nestedObjectValueLevel` argument, as we may deprecate `withRelatedObjectValues` in the future.
:::


:::info
To make the response more readable, we load only two attributes `packshot` and `badge`
:::

``` graphql [snippet: Query] 

{
  products(
    attributesToLoad: ["packshot", "badge"]
    locales: ["en_US"]
    limit: 1
  ) {
    items {
      uuid
      updated
      attributes {
        code
        type
        relatedObject {
          code
          labels
        }
        values(nestedObjectValueLevel: 1)
      }
    }
  }
}
```
```json [snippet: Response] 
{
  "data": {
    "products": {
      "items": [
        {
          "uuid": "002844f9-a470-42e2-8268-ddfd8f646593",
          "updated": "2024-04-11T14:30:04+00:00",
          "attributes": [
            {
              "code": "badge",
              "type": "akeneo_reference_entity_collection",
              "relatedObject": {
                "code": "badges",
                "labels": [
                  {
                    "localeCode": "en_US",
                    "localeValue": "Badges"
                  }
                ]
              },
              "values": [
                {
                  "locale": null,
                  "data": [
                    {
                      "code": "best_seller",
                      "values": {
                        "label": [
                          {
                            "locale": "en_US",
                            "channel": null,
                            "data": "Best Seller"
                          }
                        ],
                        "image": [
                          {
                            "locale": null,
                            "channel": null,
                            "data": "8/2/1/7/82178657041bde23d152365b37028f8246aed25d_bestseller.png"
                          }
                        ]
                      },
                      "created": "2023-10-10T06:41:49+00:00",
                      "updated": "2024-03-08T15:42:24+00:00"
                    },
                    {
                      "code": "sale",
                      "values": {
                        "label": [
                          {
                            "locale": "en_US",
                            "channel": null,
                            "data": "Sale"
                          }
                        ],
                        "image": [
                          {
                            "locale": null,
                            "channel": null,
                            "data": "5/c/4/3/5c431f4422c94ecd2e4bc63923c0843cf4c7519a_sale.png"
                          }
                        ]
                      },
                      "created": "2023-10-10T06:41:50+00:00",
                      "updated": "2023-10-10T06:41:50+00:00"
                    }
                  ],
                  "channel": null
                }
              ]
            },
            {
              "code": "packshot",
              "type": "pim_catalog_asset_collection",
              "relatedObject": {
                "code": "products",
                "labels": [
                  {
                    "localeCode": "en_US",
                    "localeValue": "Product Media"
                  }
                ]
              },
              "values": [
                {
                  "locale": null,
                  "data": [
                    {
                      "code": "images_image_2_1583540357_1370_2_jpg_products",
                      "values": {
                        "label": [
                          {
                            "locale": "en_US",
                            "channel": null,
                            "data": "RIDGID 15-Degree 1-3/4 in. Coil Roofing Nailer"
                          }
                        ],
                        "media": [
                          {
                            "locale": null,
                            "channel": null,
                            "data": "a/f/0/0/af0078e036905c5f16f35ceb36000d5f2b6d7e8c_1583540357_1370__2.jpg",
                            "links": {
                              "shareLink": "https://pim-url/products/images_image_2_1583540357_1370_2_jpg_products.jpg"
                            }
                          }
                        ],
                        "thumbnail": [
                          {
                            "locale": null,
                            "channel": null,
                            "data": "7/d/6/c/7d6ccf8e2e972bc7c43ad6e4a3cd336324aace8f_1583540357_1370__2_thumbnail.png"
                          }
                        ],
                        "ecommerce": [
                          {
                            "locale": null,
                            "channel": null,
                            "data": "b/0/c/5/b0c5fca0b3430ce6edabce5b94f769bda623a762_1583540357_1370__2_ecomm.png"
                          }
                        ],
                        "high_res": [
                          {
                            "locale": null,
                            "channel": null,
                            "data": "b/7/f/2/b7f25b32cd00bca45b2f4f01e5baa7faca723f86_1583540357_1370__2_highres.png"
                          }
                        ],
                        "b2b_thumbnail": [
                          {
                            "locale": null,
                            "channel": null,
                            "data": "5/5/f/1/55f1f31633bd23cf24108065cd861242e1fe04fb_1583540357_1370__2_b2b.png"
                          }
                        ],
                        "test_media_file": [
                          {
                            "locale": null,
                            "channel": null,
                            "data": "4/1/7/1/4171ed2c8551e4b6a0c7e15a41542e04de1204f6_Domain_Driven_Aggregate_Design___Training.pdf"
                          }
                        ]
                      },
                      "created": "2023-10-10T07:04:12+00:00",
                      "updated": "2024-04-17T13:26:51+00:00"
                    },
                    {
                      "code": "images_image_3_1583536696_1007_3_jpg_products",
                      "values": {
                        "label": [
                          {
                            "locale": "en_US",
                            "channel": null,
                            "data": "Dickies Nylon Work Suspenders"
                          }
                        ],
                        "media": [
                          {
                            "locale": null,
                            "channel": null,
                            "data": "4/2/c/0/42c0a1a53e3aae31716fcc41b769b6ba62ada25f_1583536696_1007__3.jpg",
                            "links": {
                              "shareLink": "https://pim-url/products/images_image_3_1583536696_1007_3_jpg_products.jpg"
                            }
                          }
                        ]
                      },
                      "created": "2023-10-10T07:04:36+00:00",
                      "updated": "2023-10-10T07:04:36+00:00"
                    }
                  ],
                  "channel": null
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```

## Families and their belonging attributes informations

``` graphql [snippet: Query] 
{
  families(
    locales: ["en_US"]
    limit: 1
  ) {
    links {
      next
    }
    items {
      code
      labels
      attributeAsLabel
      attributeAsImage
      attributes {
        code
        labels
        type
        sortOrder
        group {
          code
          labels
          sortOrder
        }
      }
    }
  }
}
```
```json [snippet: Response] 

{
  "data": {
    "families": {
      "links": {
        "next": "2"
      },
      "items": [
        {
          "code": "air_purifiers",
          "labels": [
            {
              "localeCode": "en_US",
              "localeValue": "Air Purifiers"
            }
          ],
          "attributeAsLabel": "name",
          "attributeAsImage": "packshot",
          "attributes": [
            {
              "code": "badge",
              "labels": [
                {
                  "localeCode": "en_US",
                  "localeValue": "Badge(s)"
                }
              ],
              "type": "akeneo_reference_entity_collection",
              "sortOrder": 9,
              "group": {
                "code": "ecommerce",
                "labels": [
                  {
                    "localeCode": "en_US",
                    "localeValue": "Ecommerce"
                  }
                ],
                "sortOrder": 5
              }
            },
            {
              "code": "best_seller",
              "labels": [
                {
                  "localeCode": "en_US",
                  "localeValue": "Best Seller"
                }
              ],
              "type": "pim_catalog_boolean",
              "sortOrder": 10,
              "group": {
                "code": "ecommerce",
                "labels": [
                  {
                    "localeCode": "en_US",
                    "localeValue": "Ecommerce"
                  }
                ],
                "sortOrder": 5
              }
            },
            {
              "code": "brand",
              "labels": [
                {
                  "localeCode": "en_US",
                  "localeValue": "Brand"
                }
              ],
              "type": "akeneo_reference_entity",
              "sortOrder": 1,
              "group": {
                "code": "erp",
                "labels": [
                  {
                    "localeCode": "en_US",
                    "localeValue": "ERP"
                  }
                ],
                "sortOrder": 1
              }
            }
          ]
        }
      ]
    }
  }
}
```

## Enabled locales

``` graphql [snippet: Query] 

{
  locales(enabled: true) {
    items {
      code
      enabled
    }
  }
}
```
```json [snippet: Response] 

{
  "data": {
    "locales": {
      "items": [
        {
          "code": "de_DE",
          "enabled": true
        },
        {
          "code": "en_GB",
          "enabled": true
        },
        {
          "code": "en_US",
          "enabled": true
        },
        {
          "code": "fr_FR",
          "enabled": true
        },
        {
          "code": "ja_JP",
          "enabled": true
        }
      ]
    }
  }
}
```

## Enabled currencies

``` graphql [snippet: Query] 

{
  currencies(enabled: true) {
    items {
      code
      enabled
    }
  }
}
```
```json [snippet: Response] 

{
  "data": {
    "currencies": {
      "items": [
        {
          "code": "EUR",
          "enabled": true
        },
        {
          "code": "GBP",
          "enabled": true
        },
        {
          "code": "USD",
          "enabled": true
        }
      ]
    }
  }
}
```

::: panel-link And now, let's discover how to integrate GraphQL into your project GraphQL [Next](/graphql/integration.html)
:::
