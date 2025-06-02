# Products

The **Product** is the central resource of our PIM and, when you think about it, it makes perfect sense since what we are doing is Product Management. :wink:

In the sections below, you will find all the different flavors of products you can find in the PIM.  
Each section below contains an explanation of the concept behind these resources. You will find out more about their usage in the PIM and their JSON format in order for them to interact with the REST API.

## Product
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

The product is the central entity of the PIM. This is the entity that holds all the information concerning products.

It can be classified in several categories. It can belong to a group and inherit its attributes from a family. It can hold associations with other products or group of products.

In other words, this really is the heart entity of the PIM.

In the Akeneo UI, in the 1.7 version, you can find the products in the `Enrich`/`Products` menu. Since the 2.0, it's below the `Products` menu.

Below is an example of a product in the UI.

::: version-screenshots id="products" 2.x![Products in the Akeneo UI](/img/concepts/products_ui.png) 1.7![Products in the Akeneo UI](/img/concepts/v1.7/products_ui.png)
:::

Below is the JSON standard format representing a product.

```json
{
  "uuid": "fc24e6c3-933c-4a93-8a81-e5c703d134d5",
  "family": "clothing",
  "parent": "jack_brown",
  "categories": [
    "tshirts"
  ],
  "enabled": true,
  "values": {
    "sku": [
      {
        "locale": null,
        "scope": null,
        "data": "1111111195"
      }
    ],
    "ean": [
      {
        "locale": null,
        "scope": null,
        "data": "1234567890207"
      }
    ],
    "size": [
      {
        "locale": null,
        "scope": null,
        "data": "s"
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
    "color": [
      {
        "locale": null,
        "scope": null,
        "data": "brown"
      }
    ],
    "name": [
      {
        "locale": null,
        "scope": null,
        "data": "jack"
      }
    ],
    "erp_name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "Jack"
      }
    ],
    "collection": [
      {
        "locale": null,
        "scope": null,
        "data": [
          "summer_2017"
        ]
      }
    ]
  },
  "created": "2017-10-05T11:25:48+02:00",
  "updated": "2017-10-05T11:25:48+02:00",
  "associations": {},
  "quantified_associations": {},
  "metadata": {
    "workflow_status": "working_copy"
  },
  "quality_scores": [
      {
          "scope": "ecommerce",
          "locale": "en_US",
          "data": "A"
      }
  ],
  "completenesses": [
    {
      "scope": "ecommerce",
      "locale": "en_US",
      "data": 45
    },
    {
      "scope": "ecommerce",
      "locale": "fr_FR",
      "data": 90
    }
  ]
}
```

::: warning
Note that the `parent` field is only available starting from the v2, as this is a brand new feature introduced in the v2.0.
:::

::: warning
Note that the `metadata` field is only available starting from the v2 and as it is an Enterprise Edition feature, you won't have this field on a Community Edition PIM.
:::

::: warning
The `quantified_associations` field is only available since the 5.0.
:::

::: warning
Note that the `quality_scores` field is only available since the 5.0 and when the `with_quality_scores` query parameter is set to `true`.
:::

::: warning
Note that the `completenesses` field is only available since the 6.0, and when the `with_completenesses` query parameter is set to `true`.
:::

::: panel-link Want more details about the product resource? [Check its endpoints here!](/api-reference.html#Productuuid)
:::

### Convert a variant product to a simple product
::: availability versions=6.0,7.0,SaaS editions=CE,EE
:::

A variant product, which has a product model as parent, can be converted to a simple product by removing its parent. To perform this action through the API, you just have to update the `parent` field to `null`.
By default all the former values, categories and associations (included those defined at the parent level) will be kept if they are not specified in the PATCH request.

## Focus on the product values

Product values hold all the information of the product. They are part of the [Product resource](#product). In concrete terms, it is the values of the product attributes.

In the REST API, the product values are in the property `values` of the product entity.

### The global format

A product value follows this format:
```json
{
  "values": {
    ATTRIBUTE_CODE: [
      {
        "locale": LOCALE_CODE,
        "scope": CHANNEL_CODE,
        "data": DATA_INFORMATION,
        "linked_data": LINKED_DATA,
        "attribute_type": ATTRIBUTE_TYPE,
        "reference_data_name": REFERENCE_DATA_NAME
      }
    ]
  }
}
```
In this formula:
 - `ATTRIBUTE_CODE` is the code of an attribute of the product,
 - `LOCALE_CODE` is the code of a locale when the attribute is localizable, should be equal to `null` otherwise. [Check some examples here.](#the-locale-and-scope-format)
 - `CHANNEL_CODE` is the code of a channel when the attribute is scopable, should be equal to `null` otherwise. [Check some examples here.](#the-locale-and-scope-format)
 - `DATA_INFORMATION` is the value stored for this attribute for this locale (if attribute is localizable) and this channel (if the attribute is scopable). Its type and format depend on the attribute type. [Check some examples here.](#the-data-format)
 - `LINKED_DATA` containing the attribute option labels if the attribute is a simple or multi select. [Check some examples here.](#the-linked_data-format) This property is only available since the 5.0.
 - `ATTRIBUTE_TYPE` is the type of the value's attribute. (Only available in the SaaS version)
 - `REFERENCE_DATA_NAME` is the reference entity code when the attribute type is `akeneo_reference_entity` or `akeneo_reference_entity_collection` OR Asset family code when the attribute type is `pim_catalog_asset_collection`. (Only available in the SaaS version)

:::info
Note that `attribute_type` and `reference_data_name` properties are read-only. You won't be able to patch or post it.
:::

### The `data` format
The sections below describe the format of the `data` property for each [product attribute](/concepts/catalog-structure.html#attribute) type.

#### Text and text area attributes
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

Whenever the attribute's type is either `pim_catalog_text` or `pim_catalog_textarea`, the `data` field should contain a string.

**Example**
```json
{
  "values": {
    "description": [
      {
        "locale": null,
        "scope": null,
        "data": "Tshirt long sleeves\nWinter special, 100% whool",
        "attribute_type": "pim_catalog_text"
      }
    ]
  }
}
```

#### Media file attributes
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

Whenever the attribute's type is either `pim_catalog_file` or `pim_catalog_image`, the `data` field should contain a string, that should be the code of a [product media file](#product-media-file).

**Example**
```json
{
  "values": {
    "packshot": [
      {
        "locale": null,
        "scope": null,
        "data": "f/2/e/6/f2e6674e0766acdc70f814_myFile.pdf",
        "attribute_type": "pim_catalog_file"
      }
    ]
  }
}
```

#### Date attribute
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_date`, the `data` field should contain a string, in ISO-8601 format.

**Example**
```json
{
  "values": {
    "packshot": [
      {
        "locale": null,
        "scope": null,
        "data": "2021-04-29T08:58:00.101Z",
        "attribute_type": "pim_catalog_date"
      }
    ]
  }
}
```

#### Simple and multi select attribute
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_simpleselect`, the `data` field should contain a string, that should be the code of an [attribute option](/concepts/catalog-structure.html#attribute-option).

##### Example
```json
{
  "values": {
    "main_color": [
      {
        "locale": null,
        "scope": null,
        "data": "blue",
        "attribute_type": "pim_catalog_simpleselect"
      }
    ]
  }
}
```

Whenever the attribute's type is `pim_catalog_multiselect`, the `data` field should contain an array of strings, each string being the code of an [attribute option](/concepts/catalog-structure.html#attribute-option).

##### Example
```json
{
  "values": {
    "materials": [
      {
        "locale": null,
        "scope": null,
        "data": ["leather", "cotton"],
        "attribute_type": "pim_catalog_multiselect"
      }
    ]
  }
}
```

#### Reference data simple and multi select attribute
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

::: warning
Reference Data is the ancestor of Reference Entities.  
On SaaS platforms, **users can't create Reference Data attributes anymore**.  
More information about Reference Data and Reference Entities in the following Help Center article: [Reference entities or reference data?](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute.html#reference-entities-or-reference-data)
:::

Whenever the attribute's type is `pim_catalog_reference_data_simpleselect`, the `data` field should contain a string, that should be the code of a reference data attribute option.

##### Example
```json
{
  "values": {
    "designer": [
      {
        "locale": null,
        "scope": null,
        "data": "bouroullec",
        "attribute_type": "pim_catalog_reference_data_simpleselect",
        "reference_data_name": "designer_ref"
      }
    ]
  }
}
```

Whenever the attribute's type is `pim_catalog_reference_data_multiselect`, the `data` field should contain an array of strings, each string being the code of a reference data attribute option.

##### Example
```json
{
  "values": {
    "collections": [
      {
        "locale": null,
        "scope": null,
        "data": ["winter_2019", "spring_2020"],
        "attribute_type": "pim_catalog_reference_data_multiselect"
      }
    ]
  }
}
```

#### Number attribute
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_number`, the `data` field should contain:
- an integer, whenever the `decimals_allowed` property of the attribute is set to `false`.
- a string representing a number, whenever the `decimals_allowed` property of the attribute is set to `true`.

##### Examples
```json
{
  "values": {
    "age": [
      {
        "locale": null,
        "scope": null,
        "data": 40,
        "attribute_type": "pim_catalog_number"
      }
    ]
  }
}
```
```json
{
  "values": {
    "typing_speed": [
      {
        "locale": null,
        "scope": null,
        "data": "89.897",
        "attribute_type": "pim_catalog_number"
      }
    ]
  }
}
```

#### Product link attribute
::: availability versions=SaaS editions=EE
:::

Whenever the attribute type is pim_catalog_product_link, the data field must contain:
- The `type` of the linked entity, with the value `product` or `product_model`
- The `identifier` or the `id` of the linked entity:
  - If type is `product`: either the UUID in the id key, or the identifier in the identifier key
  - If type is `product_model`: the product model code in the id key

##### Examples
```json
{
  "values": {
    "included_battery": [
      {
        "locale": null,
        "scope": null,
        "data": {
          "type": "product",
          "id": "fc24e6c3-933c-4a93-8a81-e5c703d134d5"
        },
        "attribute_type": "pim_catalog_product_link"
      }
    ]
  }
}
```
```json
{
  "values": {
    "included_battery": [
      {
        "locale": null,
        "scope": null,
        "data": {
          "type": "product",
          "identifier": "bl1850b"
        },
        "attribute_type": "pim_catalog_product_link"
      }
    ]
  }
}
```
```json
{
  "values": {
    "included_battery": [
      {
        "locale": null,
        "scope": null,
        "data": {
          "type": "product_model",
          "id": "my_super_battery"
        },
        "attribute_type": "pim_catalog_product_link"
      }
    ]
  }
}
```

#### Metric attribute
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_metric`, the `data` field should contain an object with following fields:
- `amount`: a string representing a number if the `decimals_allowed` property of the attribute is set to `true`, otherwise an integer, containing amount value
- `unit`: a string representing the metric unit for the specified amount

##### Examples
```json
{
  "values": {
    "power": [
      {
        "locale": null,
        "scope": null,
        "data": {
          "amount":10,
          "unit": "KILOWATT"
        },
        "attribute_type": "pim_catalog_metric"
      }
    ]
  }
}
```
```json
{
  "values": {
    "height": [
      {
        "locale": null,
        "scope": null,
        "data": {
          "amount":"25.45",
          "unit": "CENTIMETER"
        },
        "attribute_type": "pim_catalog_metric"
      }
    ]
  }
}
```

#### Price attribute
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_price`, the `data` field should contain an array of price objects, each containing:
- `amount`: a string representing a number if the `decimals_allowed` property of the attribute is set to `true`, otherwise an integer, containing amount value
- `currency`: a string representing the price currency for the specified amount

##### Examples
```json
{
  "values": {
    "recommended_price": [
      {
        "locale": null,
        "scope": null,
        "data": [
          {
            "amount":200,
            "currency": "USD"
          }
        ],
        "attribute_type": "pim_catalog_price"
      }
    ]
  }
}
```
```json
{
  "values": {
    "price": [
      {
        "locale": null,
        "scope": null,
        "data": [
          {
            "amount":"25.50",
            "currency": "EUR"
          }
        ],
        "attribute_type": "pim_catalog_price"
      }
    ]
  }
}
```

#### Boolean attribute
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_boolean`, the `data` field should contain either `true` or `false`.

##### Example
```json
{
  "values": {
    "is_smart": [
      {
        "locale": null,
        "scope": null,
        "data": true,
        "attribute_type": "pim_catalog_boolean"
      }
    ]
  }
}
```

#### Reference entity single and multiple links attribute
::: availability versions=3.x,4.0,5.0,6.0,7.0,SaaS editions=EE
:::

Whenever the attribute's type is `akeneo_reference_entity`, the `data` field should contain a string, that should be the code of a [reference entity record](/concepts/reference-entities.html#reference-entity-record).

##### Example
```json
{
  "values": {
    "designer": [
      {
        "locale": null,
        "scope": null,
        "data": "bouroullec",
        "attribute_type": "akeneo_reference_entity",
        "reference_data_name": "designer_ref"
      }
    ]
  }
}
```

Whenever the attribute's type is `akeneo_reference_entity_collection`, the `data` field should contain an array of strings, each string being the code of a [reference entity record](/concepts/reference-entities.html#reference-entity-record).

##### Example
```json
{
  "values": {
    "collections": [
      {
        "locale": null,
        "scope": null,
        "data": ["winter_2019", "spring_2020"],
        "attribute_type": "akeneo_reference_entity_collection",
        "reference_data_name": "designer_ref"
      }
    ]
  }
}
```

#### Asset Manager asset collection attribute
::: availability versions=3.2,4.0,5.0,6.0,7.0,SaaS editions=EE
:::

Whenever the attribute's type is `pim_catalog_asset_collection`, the `data` field should contain an array of strings, each string being the code of an [Asset Manager asset](/concepts/asset-manager.html#asset).

##### Example
```json
{
  "values": {
    "model_pictures": [
      {
        "locale": null,
        "scope": null,
        "data": ["allie_jean_frontview", "allie_jean_backview"],
        "attribute_type": "pim_assets_collection",
        "reference_data_name": "packshots"
      }
    ]
  }
}
```

#### PAM asset collection attribute _- Deprecated_
::: availability versions=2.1,2.2,2.3,3.x editions=EE
:::

Whenever the attribute's type is `pim_assets_collection`, the `data` field should contain an array of strings, each string being the code of a [PAM asset](/concepts/pam.html#asset).

##### Example
```json
{
  "values": {
    "userguides": [
      {
        "locale": null,
        "scope": null,
        "data": ["guarantee_notice", "how_to_guide"],
        "attribute_type": "pim_assets_collection",
        "reference_data_name": "guides_images"
      }
    ]
  }
}
```

#### Table attribute
::: availability versions=6.0,7.0,SaaS editions=EE,GE
:::

Whenever the attribute type is `pim_catalog_table`, the `data` field should contain an array of rows, where each row is a key-value object, the key being the `column` code, and the value being the cell value.

##### Example
```json
{
  "values": {
    "Food_composition": [
      {
        "locale": null,
        "scope": null,
        "data": [
          {
              "percentage": "28.5",
              "composition": "Cooked_wheat_semolin"
          },
          {
              "Origin": "France",
              "allergen": false,
              "percentage": "28.5",
              "composition": "Vegetables"
          },
          {
              "allergen": true,
              "percentage": "28",
              "composition": "Sauce"
          },
          {
              "Origin": "France",
              "allergen": false,
              "percentage": "10",
              "composition": "Cooked_cured_chicken_fillet"
          },
          {
              "Origin": "Spain",
              "allergen": false,
              "percentage": "5",
              "composition": "Pre_cooked_merguez"
          },
          {
              "composition": "Frozen"
          }
        ],
        "attribute_type": "pim_catalog_table"
      }
    ]
  }
}
```

:::warning
Please note that we have defined some limits in order to guarantee the PIM stability.
- The maximum number of rows in a table is set to **100**.
- The maximum number of table attributes within the PIM is set to **50**.
- The maximum number of filled cells per product is set to 8000, for all the table attributes on a given product page.
:::

### The `locale` and `scope` format

The product values can be localizable and/or scopable. Here are some examples to illustrate those different possibilities.

::: info
Product values should be **localizable** whenever you want to enrich different values among your activated locales.  
Product values should be **scopable** whenever you want to enrich different values among your channels.
:::

#### Product values of a localizable attribute

The `short_description` attribute is localizable but not scopable, so it can hold several data values, up to one for each locale.
```json
{
  "short_description": [
    {
      "locale": "en_US",
      "scope": null,
      "data": "Tshirt long sleeves",
      "attribute_type": "pim_catalog_textarea"
    },
    {
      "locale": "fr_FR",
      "scope": null,
      "data": "Tshirt manches longues",
      "attribute_type": "pim_catalog_textarea"
    }
  ]
}
```
:::info
Note that the `scope` property is set to `null` in this case.
:::

#### Product values of a scopable attribute

The `release_date` attribute is scopable but not localizable, so it can hold several data values, up to one for each channel.
```json
{
  "release_date": [
    {
      "locale": null,
      "scope": "ecommerce",
      "data": "2012-03-13T00:00:00+01:00",
      "attribute_type": "pim_catalog_date"
    },
    {
      "locale": null,
      "scope": "mobile",
      "data": "2012-04-23T00:00:00+01:00",
      "attribute_type": "pim_catalog_date"
    }
  ]
}
```
:::info
Note that the `locale` property is set to `null` in this case.
:::

#### Product values of a localizable and scopable attribute

The `description` attribute is both scopable and localizable, so it can hold several data values, up to one for each couple of channels and locales.
```json
{
  "description": [
    {
      "locale": "de_DE",
      "scope": "mobile",
      "data": "Akeneo Mug",
      "attribute_type": "pim_catalog_textarea"
    },
    {
      "locale": "de_DE",
      "scope": "print",
      "data": "Akeneo Mug",
      "attribute_type": "pim_catalog_textarea"
    },
    {
      "locale": "en_US",
      "scope": "mobile",
      "data": "Akeneo Mug",
      "attribute_type": "pim_catalog_textarea"
    },
    {
      "locale": "en_US",
      "scope": "print",
      "data": "Akeneo Mug",
      "attribute_type": "pim_catalog_textarea"
    },
    {
      "locale": "fr_FR",
      "scope": "mobile",
      "data": "Mug Akeneo",
      "attribute_type": "pim_catalog_textarea"
    },
    {
      "locale": "fr_FR",
      "scope": "print",
      "data": "Mug Akeneo",
      "attribute_type": "pim_catalog_textarea"
    }
  ]
}
```

#### Product value of a non localizable, non scopable attribute

The `main_color` attribute is neither scopable nor localizable, so it can hold only one data value.
```json
{
  "main_color": [
    {
      "locale": null,
      "scope": null,
      "data": "black",
      "attribute_type": "pim_catalog_simpleselect"
    }
  ]
}
```
:::info
Note that the `locale` and `scope` properties are all set to `null` in this case.
:::

::: panel-link Want to update product values? [Here you go!](/documentation/update.html#update-product-values)
:::

### The `linked_data` format
::: availability versions=5.0,6.0,7.0,SaaS editions=CE,EE
:::info
Note that this property is in read-only. You won't be able to patch or post it.
:::

The sections below describe the format of the `linked_data` property for `pim_catalog_simpleselect` and `pim_catalog_multiselect` types.

#### Simple select attribute
Whenever the attribute type is `pim_catalog_simpleselect`, the `linked_data` field will contain an object.

**Example**
```json
{
  "values": {
    "main_color": [
      {
        "data": "black",
        "linked_data": {
          "attribute": "main_color",
          "code": "black",
          "labels": {
            "en_US": "Black",
            "fr_FR": "Noir"
          }
        }
      }
    ]
  }
}
```

#### Multi select attribute
Whenever the attribute type is `pim_catalog_multiselect`, the `linked_data` field will contain an object.

**Example**
```json
{
  "values": {
    "collection": [
      {
        "locale": null,
        "scope": null,
        "data": [
          "winter_2016"
        ],
        "linked_data": {
          "winter_2016": {
            "attribute": "collection",
            "code": "winter_2016",
            "labels": {
              "en_US": "Winter 2016",
              "fr_FR": "Hiver 2016"
            }
          }
        }
      }
    ]
  }
}
```

#### Asset collection attribute
Whenever the attribute type is `pim_catalog_asset_collection`, the `linked_data` field will contain an object.

**Example**
```json
{
  "asset_collection": [
    {
      "locale": null,
      "scope": null,
      "data": [
        "left_side",
        "right_side"
      ],
      "linked_data": {
        "left_side": {
          "share_links": [
            {
              "attribute": "media",
              "scope": null,
              "locale": null,
              "_links": {
                "self": {
                  "href": "https://asset-delivery.akeneo.com/asset_family/media/left_side.png"
                }
              }
            },
            {
              "attribute": "secondary_media",
              "scope": null,
              "locale": null,
              "_links": {
                "self": {
                  "href": "https://asset-delivery.akeneo.com/asset_family/secondary_media/left_side.png"
                }
              }
            }
          ]
        },
        "right_side": {
          "share_links": [
            {
              "attribute": "media",
              "scope": null,
              "locale": null,
              "_links": {
                "self": {
                  "href": "https://asset-delivery.akeneo.com/asset_family/media/right_side.png"
                }
              }
            }
          ]
        }
      },
      "attribute_type": "pim_catalog_asset_collection",
      "reference_data_name": "asset_family"
    }
  ]
}
```

## Product model
::: availability versions=2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

The product model gathers similar products that differ in some aspects, and allows the enrichment of their common properties.

It's like a product, but it's not a product! It can be categorized and it's composed of product values. For more information about what are the "product values", take a look to this dedicated piece of [documentation](/concepts/products.html#focus-on-the-product-values).

In the Akeneo UI, product models are displayed in the grid, exactly like classical products. To distinguish them from products, notice the small pile of pictures: it symbolizes the fact that a product model gathers several products with different variants.

![Product models in the grid](/img/concepts/product_models_in_the_grid_ui.png)

It's also possible to enrich a product model. Below, you can find a screenshot of what the UI looks like.

![Product models in the PEF](/img/concepts/product_models_in_the_pef_ui.png)

To finish, below is the JSON standard format representing a product model. Notice how similar it is to the product standard format!

```json
{
  "code": "jack",
  "family": "clothing",
  "family_variant": "clothing_color_size",
  "parent": null,
  "categories": [],
  "values": {
    "name": [
      {
          "locale": null,
          "scope": null,
          "data": "jack"
      }
    ],
    "erp_name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "Jack"
      }
    ],
    "collection": [
      {
        "locale": null,
        "scope": null,
        "data": [
          "summer_2017"
        ]
      }
    ]
  },
  "created": "2017-10-05T11:24:46+02:00",
  "updated": "2017-10-05T11:24:46+02:00",
  "associations": {},
  "quantified_associations": {},
  "quality_scores": [
    {
      "scope": "ecommerce",
      "locale": "en_US",
      "data": "A"
    }
  ],
  "metadata": {
    "workflow_status": "working_copy"
  }
}
```

::: warning
Note that the `metadata` field is only available since the 2.3 version and as it is an Enterprise Edition feature, you won't have this field on a Community Edition PIM.
:::

::: warning
Note that the `family` field is only available since the 3.2 version.
:::

::: warning
Note that the `quality_scores` field is **only available since the 7.0 version** and when the `with_quality_scores` query parameter is set to `true`.
:::

::: panel-link Want more details about the product model resource? [Check its endpoints here!](/api-reference.html#Productmodel)
:::

## Published product _- Deprecated_
::: availability versions=2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=EE
:::

::: danger
**Important update: Published Products discontinuation.** This feature is no longer actively supported and will soon be retired. We recommend exploring alternative solutions. [Learn more in the help center](https://help.akeneo.com/en_US/serenity-take-the-power-over-your-products/important-update-deprecation-of-the-published-products-feature-from-akeneo-pim)
:::

A published product is a product that was published by a user in order to freeze a given version of the product. It can be very useful when you want to work on a new version of your product for the next collection for example, but in the meantime, you still want to export the previous version of your product to your channels.

::: warning
This is an Enterprise Edition feature. So you won't be able to call this endpoint if you are working on a Community Edition PIM. ;)
:::

In the Akeneo UI since the 2.0 version, you can find the published products by clicking on the `...` button in the top right corner, when you are on the products grid. Then select the `Published products` option. You will then see a grid really similar to the classical product grid.

Below is the JSON standard format representing a published product. Notice how totally similar to the classical product format it is!

```json
{
  "identifier": "11118726289",
  "family": "mp3",
  "parent": null,
  "categories": [
    "audio_video"
  ],
  "enabled": true,
  "values": {
    "name": [
      {
        "locale": null,
        "scope": null,
        "data": "MP3 player"
      }
    ],
    "weight": [
      {
        "locale": null,
        "scope": null,
        "data": {
          "amount": "600.0000",
          "unit": "GRAM"
        }
      }
    ],
    "color": [
      {
        "locale": null,
        "scope": null,
        "data": "glossy_red"
      }
    ]
  },
  "created": "2017-10-05T11:25:48+02:00",
  "updated": "2017-10-05T11:25:48+02:00",
  "associations": {}
}
```

::: warning
Endpoints for the published products are only available starting the 2.0 version.
:::

::: panel-link Want more details about the published product resource? [Check its endpoints here!](/api-reference.html#Publishedproduct)
:::

## Product media file
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
:::

A product media file can be an image (a photo, an illustration, etc.), a video (demonstration of a product, an animation, etc.), an audio file (music, podcast, etc.), other multimedia (PDF file) or office documents (.xlsx, .docx, .csv, etc.). It can also be any exotic format you could use.

It is used as the attribute value of a product, i.e. a product value.

In the Akeneo UI, you can find media files in the product form when they are associated to a media attribute.

::: version-screenshots id="media-files" 2.x![Media files in the Akeneo UI](/img/concepts/media_files_ui.png) 1.7![Media files in the Akeneo UI](/img/concepts/v1.7/media_files_ui.png)
:::

Below is the JSON standard format representing a media file.

```json
{
  "code": "1/d/7/f/1d7f0987000cea4d14908fe679af4e36ea3632ef_10806799_1356.jpg",
  "original_filename": "10806799-1356.jpg",
  "mime_type": "image/jpeg",
  "size": 16070,
  "extension": "jpg",
  "_links": {
    "download": {
      "href": "http://test-dev-feature-10.akeneo.com/api/rest/v1/media-files/1/d/7/f/1d7f0987000cea4d14908fe679af4e36ea3632ef_10806799_1356.jpg/download"
    }
  }
}
```

::: panel-link Want more details about the media file resource? [Check its endpoints here!](/api-reference.html#Mediafile)
:::
