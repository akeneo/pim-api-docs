# Products

The **Product** is the central resource of our PIM and, when you think about it, it makes perfect sense since what we are doing is Product Management. :wink:

In the sections below, you will find all the different flavors of products you can find in the PIM.  
Each section below contains an explanation of the concept behind these resources. You will find out more about their usage in the PIM and their JSON format in order for them to interact with the API. 

## Product
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
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
  "identifier": "1111111195",
  "family": "clothing",
  "parent": "jack_brown",
  "categories": [
    "tshirts"
  ],
  "enabled": true,
  "values": {
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
  }
}
```

::: warning
Note that the `parent` field is only available starting from the v2, as this is a brand new feature introduced in the v2.0.
:::

::: warning
Note that the `metadata` field is only available starting from the v2 and as it is an Enterprise Edition feature, you won't have this field on a Community Edition PIM.
:::

::: warning
Note that the `quantified_associations` field is only available in Serenity.
:::

::: panel-link Want more details about the product resource? [Check its endpoints here!](/api-reference.html#Product)
:::

## Focus on the product values

Product values hold all the information of the product. They are part of the [Product resource](#product). In concrete terms, it is the values of the product attributes.

In the API, the product values are in the property `values` of the product entity.

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
        "linked_data": LINKED_DATA
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
 - `LINKED_DATA` containing the attribute option labels if the attribute is a simple or multi select. [Check some examples here.](#the-linked_data-format) This property if for now, only available in Serenity.
 
### The `data` format
The sections below describe the format of the `data` property for each [product attribute](/concepts/catalog-structure.html#attribute) type.

#### Text and text area attributes
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

Whenever the attribute's type is either `pim_catalog_text` or `pim_catalog_textarea`, the `data` field should contain a string.

**Example**
```json
{
  "values": {
    "description": [
      {
        "data": "Tshirt long sleeves\nWinter special, 100% whool"
      }
    ]
  }
}
```

#### Media file attributes
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

Whenever the attribute's type is either `pim_catalog_file` or `pim_catalog_image`, the `data` field should contain a string, that should be the code of a [product media file](#product-media-file).

**Example**
```json
{
  "values": {
    "packshot": [
      {
        "data": "f/2/e/6/f2e6674e0766acdc70f814_myFile.pdf"
      }
    ]
  }
}
```

#### Date attribute
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_date`, the `data` field should contain a string, in ISO-8601 format.

**Example**
```json
{
  "values": {
    "packshot": [
      {
        "data": "f/2/e/6/f2e6674e0766acdc70f814_myFile.pdf"
      }
    ]
  }
}
```

#### Simple and multi select attribute
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_simpleselect`, the `data` field should contain a string, that should be the code of an [attribute option](/concepts/catalog-structure.html#attribute-option).

##### Example
```json
{
  "values": {
    "main_color": [
      {
        "data": "blue"
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
        "data": ["leather", "cotton"]
      }
    ]
  }
}
```

#### Reference data simple and multi select attribute
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_reference_data_simpleselect`, the `data` field should contain a string, that should be the code of a reference data attribute option.

##### Example
```json
{
  "values": {
    "designer": [
      {
        "data": "bouroullec"
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
        "data": ["winter_2019", "spring_2020"]
      }
    ]
  }
}
```

#### Number attribute
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
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
        "data": 40
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
        "data": "89.897"
      }
    ]
  }
}
```

#### Metric attribute
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_metric`, the `data` field should contain:
- an integer, whenever the `decimals_allowed` property of the attribute is set to `false`.
- a string representing a number, whenever the `decimals_allowed` property of the attribute is set to `true`.

##### Examples
```json
{
  "values": {
    "power": [
      {
        "data": {
          "amount":10,
          "unit": "KILOWATT"
        }
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
        "data": {
          "amount":"25.45",
          "unit": "CENTIMETER"
        }
      }
    ]
  }
}
```

#### Price attribute
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_price`, the `data` field should contain:
- an integer, whenever the `decimals_allowed` property of the attribute is set to `false`.
- a string representing a number, whenever the `decimals_allowed` property of the attribute is set to `true`.

##### Examples
```json
{
  "values": {
    "recommended_price": [
      {
        "data": {
          "amount":200,
          "unit": "USD"
        }
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
        "data": {
          "amount":"25.50",
          "unit": "EUR"
        }
      }
    ]
  }
}
```

#### Boolean attribute
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

Whenever the attribute's type is `pim_catalog_boolean`, the `data` field should contain either `true` or `false`.

##### Example
```json
{
  "values": {
    "is_smart": [
      {
        "data": "true"
      }
    ]
  }
}
```

#### Reference entity single and multiple links attribute
::: availability versions=3.x,4.0,Serenity editions=EE
:::

Whenever the attribute's type is `akeneo_reference_entity`, the `data` field should contain a string, that should be the code of a [reference entity record](/concepts/reference-entities.html#reference-entity-record).

##### Example
```json
{
  "values": {
    "designer": [
      {
        "data": "bouroullec"
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
        "data": ["winter_2019", "spring_2020"]
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
        "data": ["guarantee_notice", "how_to_guide"]
      }
    ]
  }
}
```

#### Asset Manager asset collection attribute
::: availability versions=3.2,4.0,Serenity editions=EE
:::

Whenever the attribute's type is `pim_catalog_asset_collection`, the `data` field should contain an array of strings, each string being the code of an [Asset Manager asset](/concepts/asset-manager.html#asset).

##### Example
```json
{
  "values": {
    "model_pictures": [
      {
        "data": ["allie_jean_frontview", "allie_jean_backview"]
      }
    ]
  }
}
```

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
      "data": "Tshirt long sleeves"
    },
    {
      "locale": "fr_FR",
      "scope": null,
      "data": "Tshirt manches longues"
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
      "data": "2012-03-13T00:00:00+01:00"
    },
    {
      "locale": null,
      "scope": "mobile",
      "data": "2012-04-23T00:00:00+01:00"
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
      "data": "Akeneo Mug"
    },
    {
      "locale": "de_DE",
      "scope": "print",
      "data": "Akeneo Mug"
    },
    {
      "locale": "en_US",
      "scope": "mobile",
      "data": "Akeneo Mug"
    },
    {
      "locale": "en_US",
      "scope": "print",
      "data": "Akeneo Mug"
    },
    {
      "locale": "fr_FR",
      "scope": "mobile",
      "data": "Mug Akeneo"
    },
    {
      "locale": "fr_FR",
      "scope": "print",
      "data": "Mug Akeneo"
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
      "data": "black"
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
::: availability versions=Serenity editions=CE,EE
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
          "attribute": "color",
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

## Product model
::: availability versions=2.x,3.x,4.0,Serenity editions=CE,EE
:::

The product model gathers similar products that differ in some aspects, and allows the enrichment of their common properties.

It's like a product, but it's not a product! It can be categorized and it's composed of product values. For more information about what are the "product values", take a look to this dedicated piece of [documentation](/concepts/products.html#focus-on-the-product-values).

In the Akeneo UI, product models are displayed in the grid, exactly like classical products. To distinguish them from products, notice the small pile of pictures: it symbolizes the fact that a product model gathers several products with different variants.

![Product models in the grid](/img/concepts/product_models_in_the_grid_ui.png)

It's also possible to enrich product model. Below, you can find a screenshot of what the UI looks like.

![Product models in the PEF](/img/concepts/product_models_in_the_pef_ui.png)

To finish, below is the JSON standard format representing a product model. Notice how much it's closed to the product standard format!

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

::: panel-link Want more details about the product model resource? [Check its endpoints here!](/api-reference.html#Productmodel)
:::

## Published product
::: availability versions=2.x,3.x,4.0,Serenity editions=EE
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
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
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
