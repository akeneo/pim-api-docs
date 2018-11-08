# Resources

_A small presentation of each entity accessible through the API and their associated standard format_

For each resources, we defined a JSON standard format which is used to retrieve, create and update data in the PIM.

## Main catalog entities

### Locale
A locale is a combination of a language (English, German, French...) and a country (United States, United Kingdom, France...). Examples: English UK (en_GB), English US (en_US), English AU (en_AU).

You can have one or more locales activated in your PIM.

In the Akeneo UI, you can find the locales in the `Settings`/`Locales` menu.

::: versions id="locales" 2.x![Locales in the Akeneo UI](/img/screenshots/v2.0/locales_ui.png) 1.7![Locales in the Akeneo UI](/img/screenshots/v1.7/locales_ui.png)
:::

Below is the JSON standard format representing this set of locales.

```json
{
  "code":"en_US",
  "enable":true
}
```
```json
{
  "code":"de_DE",
  "enable": true
}
```
```json
{
  "code":"fr_FR",
  "enable": true
}
```

::: panel-link Want more details about the locale resource? [Check its endpoint here!](/api-reference.html#get_locales)
:::

### Channel
A channel refers to a place where your product information will be visible: for example, a website, a print catalog or a mobile application.
Actually, a channel defines a selection of products and information to export.

:::info
A channel is also known as a «scope» in the Akeneo PIM.
:::

In the Akeneo UI, you can find them in the `Settings`/`Channels` menu.

::: versions id="channels" 2.x![Channels in the Akeneo UI](/img/screenshots/v2.0/channels_ui.png) 1.7![Channels in the Akeneo UI](/img/screenshots/v1.7/channels_ui.png)
:::

Below is the JSON standard format representing this set of channels when requested through the API.

```json
{
  "code":"ecommerce",
  "currencies": [
    "USD",
    "EUR"
  ],
  "locales": [
    "de_DE",
    "en_US",
    "fr_FR"
  ],
  "category_tree": "master",
  "conversion_units": [],
  "labels":{
       "en_US":"Ecommerce",
       "de_DE":"Ecommerce",
       "fr_FR":"E-commerce"
   }
}
```
```json
{
  "code":"mobile",
  "currencies": [
    "USD",
    "EUR"
  ],
  "locales": [
    "de_DE",
    "en_US",
    "fr_FR"
  ],
  "category_tree": "master",
  "conversion_units": [],
  "labels":{
       "en_US":"Mobile",
       "de_DE":"Mobil",
       "fr_FR":"Mobile"
   }
}
```
```json
{
  "code":"print",
  "currencies": [
    "USD",
    "EUR"
  ],
  "locales": [
    "de_DE",
    "en_US",
    "fr_FR"
  ],
  "category_tree": "master",
  "conversion_units": [],
  "labels":{
       "en_US":"Print",
       "de_DE":"Drucken",
       "fr_FR":"Impression"
   }
}
```

::: panel-link Want more details about the channel resource? [Check its endpoint here!](/api-reference.html#get_channels)
:::

### Category

A category is a way of classifying products. Categories constitute category trees and in Akeneo, you can have multiple category trees with an unlimited number of levels (categories, subcategories, subsubcategories..).

:::info
A product can be classified in one or n categories.
:::

In the Akeneo UI in v2.x, you can find the categories in the `Settings`/`Categories` menu. In the 1.7, you'll find it in the `Enrich`/`Categories` menu.

::: versions id="categories" 2.x![Categories in the Akeneo UI](/img/screenshots/v2.0/categories_ui.png) 1.7![Categories in the Akeneo UI](/img/screenshots/v1.7/categories_ui.png)
:::

Below is the JSON standard format representing a set of categories.

```json
// A root category
{
  "code":"master",
  "labels":{
    "en_US": "Master catalog",
    "de_DE": "Hauptkatalog",
    "fr_FR": "Catalogue principal"
   },
  "parent":null
}
```
```json
// A subcategory
{
  "code":"tvs_projectors",
  "labels":{
    "en_US": "TVs and projectors",
    "de_DE": "TVs und projectoren",
    "fr_FR": "Téléviseurs et projecteurs"
   },
  "parent":"master"
}
```

::: panel-link Want more details about the category resource? [Check its endpoints here!](/api-reference.html#Categories)
:::

### Attribute

An attribute is a characteristic of a product. Each product is composed of a variety of attributes.

Depending on your Akeneo Edition version, you can have up to 13 attribute types: text and text area, simple or multiselect, boolean (yes/no), date, image, price, number, metric, assets (digital resources like a video, picture, PDF file...).

An attribute can be localizable. It means that it can have different values for each locale. This allows you to manage translations of your products according to the activated PIM locales. For instance, a localizable attribute will enable you to have one article name for each locale activated in your PIM. It is mostly used for text or (simple or multi) select attributes.

Some attributes can be shown only for specific locales. We will call them locale specific. For instance, a cold resistance attribute only for Russia, a Canadian tax only for Canada.

Finally, an attribute can be scopable. An attribute is scopable if its values differ for each channel. For instance, you might have one short description for your e-commerce website, maybe one even shorter for your mobile app but a long one for your print catalog.

In the Akeneo UI, you can find the attributes in the `Settings`/`Attributes` menu. Below is an example of one attribute in the UI.

::: versions id="attributes" 2.x![Attributes in the Akeneo UI](/img/screenshots/v2.0/attributes_ui.png) 1.7![Attributes in the Akeneo UI](/img/screenshots/v1.7/attributes_ui.png)
:::

Below is the JSON standard format representing this attribute.

```json
{
  "code": "auto_exposure",
  "type": "pim_catalog_boolean",
  "group": "technical",
  "localizable": false,
  "scopable": false,
  "labels": {
    "de_DE": "Auto exposure",
    "en_US": "Auto exposure",
    "fr_FR": "Auto exposure"
  },
  "unique": false,
  "useable_as_grid_filter": true,
  "allowed_extensions": null,
  "metric_family": null,
  "default_metric_unit": null,
  "reference_data_name": null,
  "available_locales": null,
  "max_characters": null,
  "validation_rule": null,
  "validation_regexp": null,
  "wysiwyg_enabled": null,
  "number_min": null,
  "number_max": null,
  "decimals_allowed": null,
  "negative_allowed": null,
  "date_min": null,
  "date_max": null,
  "max_file_size": null,
  "minimum_input_length": null,
  "sort_order": 39
}
```

::: panel-link Want more details about the attribute resource? [Check its endpoints here!](/api-reference.html#Attributes)
:::

### Attribute option

Some type of attributes offers list of choices. These available choices are attribute options.

Only attribute of type simple select, multiselect, reference data simple select and reference data multiselect can have options.

In the Akeneo UI, you can find the attribute options in the `Settings`/`Attributes` menu, then select a simple or multiselect attribute and go to the `Values` tab in the attribute form. Below is an example of the attribute options of the attribute `camera_brand` in the UI.

::: versions id="attribute_options" 2.x![Attribute options in the Akeneo UI](/img/screenshots/v2.0/attribute_options_ui.png) 1.7![Attribute options in the Akeneo UI](/img/screenshots/v1.7/attribute_options_ui.png)
:::

Below is the JSON standard format representing these attribute options.

```json
{
  "code": "canon_brand",
  "attribute": "camera_brand",
  "sort_order": 1,
  "labels": {
    "de_DE": "Canon",
    "en_US": "Canon",
    "fr_FR": "Canon"
  }
}
```
```json
{
  "code": "nikon_brand",
  "attribute": "camera_brand",
  "sort_order": 1,
  "labels": {
    "de_DE": "Nikon",
    "en_US": "Nikon",
    "fr_FR": "Nikon"
  }
}
```

::: panel-link Want more details about the attribute option resource? [Check its endpoints here!](/api-reference.html#Attributeoptions)
:::

### Family

A family is a set of attributes that are shared by products belonging to this family. In other words, a family can be considered as a template for products. A product family can use all of the attributes available in the PIM. Several families of products can use the same attributes. 

When a product is associated to a family, the product automatically inherits from all attributes defined at the family level. 

The family helps managing the product’s completeness as you can say at the family level, which family attributes are required for the completeness calculation.

::: info
A product can belong to only one family.

Nevertheless, a product does not have to belong to a family. In this case, it has no default attributes.
:::

In the Akeneo UI, you can find the families in the `Settings`/`Families` menu. Below is an example of a family in the UI.

::: versions id="families" 2.x![Families in the Akeneo UI](/img/screenshots/v2.0/families_ui.png) 1.7![Families in the Akeneo UI](/img/screenshots/v1.7/families_ui.png)
:::

Below is the JSON standard format representing this family.

```json
{
  "code": "camcorders",
  "attributes": [
    "description",
    "image_stabilizer",
    "name",
    "optical_zoom",
    "picture",
    "power_requirements",
    "price",
    "release_date",
    "sensor_type",
    "sku",
    "total_megapixels",
    "weight"
  ],
  "attribute_as_label": "name",
  "attribute_as_image": "picture",
  "attribute_requirements": {
    "ecommerce": [
      "description",
      "name",
      "price",
      "sensor_type",
      "sku",
      "total_megapixels"
    ],
    "mobile": [
      "description",
      "name",
      "price",
      "sensor_type",
      "sku",
      "total_megapixels"
    ],
    "print": [
      "description",
      "name",
      "price",
      "sensor_type",
      "sku",
      "total_megapixels"
    ]
  },
  "labels": {
    "en_US": "Camcorders",
    "fr_FR": "Caméscopes numériques",
    "de_DE": "Digitale Videokameras"
  }
}
```

::: panel-link Want more details about the family resource? [Check its endpoints here!](/api-reference.html#Families)
:::

### Family variant (2.x only)

The family variant is the entity used to modelize the products with variants.

From a single place, in a family variant, you will define all the structure for products with variants. You will define the number of variant levels, the variant axes and the distribution of attributes between common attributes or specific attributes for a variant.

In the Akeneo UI, you can find the family variants of one given family by going under the `Settings`/`Families` menu. Then, select one family and click on the `Variants` tab. All the variants of your family are right here!

![Family variants in the Akeneo UI](/img/screenshots/v2.0/family_variants_ui.png)

Below is the JSON standard format representing this family variant.

```json
{
  "code": "clothing_color_size",
  "labels": {
    "de_DE": "Kleidung nach Farbe und Größe",
    "en_US": "Clothing by color and size",
    "fr_FR": "Vêtements par couleur et taille"
  },
  "variant_attribute_sets": [
    {
      "level": 1,
      "axes": [
        "color"
      ],
      "attributes": [
        "variation_name",
        "variation_image",
        "composition",
        "color",
        "material"
      ]
    },
    {
      "level": 2,
      "axes": [
        "size"
      ],
      "attributes": [
        "sku",
        "weight",
        "size",
        "ean"
     ]
    }
  ]
}
```

::: warning
Endpoints for the family variants are only available starting the 2.0 version.
:::

::: panel-link Want more details about the family variant resource? [Check its endpoints here!](/api-reference.html#get_families__family_code__variants)
:::

## Secondary catalog entities

### Association type (2.x only)

In the PIM, a product can be associated to another. You can create an association type to specify what is the nature of this association.

In the Akeneo UI, you can find the association types in the `Settings`/`Association types` menu. Below is an example of an association type in the UI.

![Association types in the Akeneo UI](/img/screenshots/v2.0/association_types_ui.png)

Below is the JSON standard format representing these association types.

```json
{
  "code":"upsell",
  "labels":{
     "en_US":"Upsell",
     "fr_FR":"Vente incitative"
  }
}
```
```json
{
  "code":"cross-sell",
  "labels":{
     "en_US":"Cross sell",
     "fr_FR":"Vente croisée"
  }
}
```

::: warning
Endpoints for the association types are only available starting the 2.0 version.
:::

::: panel-link Want more details about the association type resource? [Check its endpoints here!](/api-reference.html#Associationtypes)
:::

### Attribute group (2.x only)

To facilitate the work of Julia inside the PIM, we gather attributes into groups. These groups are called `Attribute groups`.

In the Akeneo UI, you can find the attribute groups in the `Settings`/`Attribute groups` menu. Below is a screenshot of all attribute groups in the UI.

![Attribute groups in the Akeneo UI](/img/screenshots/v2.0/attribute_groups_ui.png)

Below is the JSON standard format representing these attribute groups.

```json
{
  "code":"technical",
  "sort_order":0,
  "attributes": ["weight","width","height"],
  "labels":{
     "en_US":"Technical",
     "fr_FR":"Informations techniques"
  }
}
```
```json
{
  "code":"marketing",
  "sort_order":1,
  "attributes": ["marketing_name","description"],
  "labels":{
     "en_US":"Marketing",
     "fr_FR":"Marketing"
  }
}
```

::: warning
Endpoints for the attribute groups are only available starting the 2.0 version.
:::

::: panel-link Want more details about the attribute group resource? [Check its endpoints here!](/api-reference.html#Attributegroups)
:::

### Currency (2.x only)
If you want to store price information inside your PIM, you will need currencies.

In the Akeneo UI, you can find the currencies in the `Settings`/`Currencies` menu. Below is a screenshot of all currencies in the UI.

![Currencies in the Akeneo UI](/img/screenshots/v2.0/currencies_ui.png)

Below is the JSON standard format representing a currency.

```json
{
  "code":"EUR",
  "enabled":true
}
```

::: warning
Endpoints for the currencies are only available starting the 2.0 version.
:::

::: panel-link Want more details about the currency resource? [Check its endpoints here!](/api-reference.html#Currencies)
:::

### Measure family (2.x only)
If you want to store metrics regarding your product such as weight, height or power inside your PIM, you will need measure families. These entities will be really helpful in the case you are requesting products for a given channel and you want these metrics attributes to be converted into the units you specified in your channel.

Below is an example of one of these metrics attributes.

![Metrics attribute](/img/screenshots/v2.0/metrics_attributes.png) 

Below is the JSON standard format representing a measure family.

```json
{
   "code":"AREA",
   "standard":"SQUARE_METER",
   "units":[
     {
       "code":  "ACRE",
       "convert": {"mul": 4046.856422},
       "symbol": "A",
     },{
        "code":  "ARE",
        "convert": {"mul":  100},
        "symbol": "a"
      },...
   ]
}
```

::: warning
Endpoints for the measure families are only available starting the 2.0 version.
:::

::: panel-link Want more details about the measure family resource? [Check its endpoints here!](/api-reference.html#Measurefamilies)
:::

### Media file
A media file can be an image (a photo, an illustration, etc.), a video (demonstration of a product, an animation, etc.), an audio file (music, podcast, etc.), other multimedia (PDF file) or office documents (.xlsx, .docx, .csv, etc.). It can also be any exotic format you could use.

It is used as the attribute value of a product, i.e. a product value.

In the Akeneo UI, you can find media files in the product form when they are associated to a media attribute.

::: versions id="media-files" 2.x![Media files in the Akeneo UI](/img/screenshots/v2.0/media_files_ui.png) 1.7![Media files in the Akeneo UI](/img/screenshots/v1.7/media_files_ui.png)
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

::: panel-link Want more details about the media file resource? [Check its endpoints here!](/api-reference.html#Mediafiles)
:::

### Asset (since 2.1 and EE only)
An asset is the EE entity that allows to hold a file which can be an image, a video, a document... In the PIM, you can find all your assets in a library called PAM (Product Asset Manager). In this library, you can manage and classify your assets into their own categories, called [asset categories](/documentation/resources.html#asset-category-21-only).

Once you upload your asset into the PAM, you can then associate it to your products thanks to a specific attribute type, called `Asset collection`. This attribute allows you to select several assets in one single attribute.

An asset can be localizable, this way you can have a different file for each of your locales. The PIM can also automatically generates variations of your reference file for each of your channels. So neat!

::: warning
Do not confuse assets and media files. Those are totally different entities. The first one is only available in the EE, whereas the second is available in both CE & EE PIM.
The main difference is that the media files cannot be classified, they are not reusable among products and you can only have one media file per media attribute. 
Also, assets are really more powerful, you can automatically generate variations of your file depending on your channel.
:::

In the Akeneo UI in v2.x, you can find the PAM, where all the assets are stored, in the `Assets` menu. Below is a screenshot of the PAM.

![Assets in the Akeneo UI](/img/screenshots/v2.0/assets_ui.png)

Below is the JSON standard format representing an asset, that is not localizable.

```json
{
  "code":"tshirt_artemis_main_picture",
  "categories": ["tshirts_assets"],
  "description": "The main picture of the Artemis t-shirt",
  "localizable": false,
  "tags": ["tshirts", "red", "summer"],
  "end_of_use": "2019-09-01T00:00:00+0200",
  "variations": [
    {
      "_link": {
       "download": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/variations/ecommerce/no_locale/download"
        },
        "self": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/variations/ecommerce/no_locale"
        }
      },
      "locale":null,
      "scope": "e_commerce",
      "code": "7/5/8/e/758e39d48va7b42a55001434fd3d7b6cf3189b7f_tshirt_artemis_main_picture-ecomerce.jpg"
    },{
      "_link": {
       "download": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/variations/print/no_locale/download"
        },
        "self": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/variations/print/no_locale"
        }
      },
      "locale": null,
      "scope": "print",
      "code": "7/5/8/e/759e39d48va7b42a55002434fd3d7b6cf3189b7f_tshirt_artemis_main_picture-print.jpg"
    }
  ],
  "reference_files":[
    {
      "_link": {
       "download": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/reference-files/no_locale/download"
        },
        "self": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/reference-files/no_locale"
        }
      },
      "locale": null,
      "code": "7/5/8/e/759e39d48va7b42a55002434fd3d7b6cf3189b7f_tshirt_artemis_main_picture.jpg"
    }
  ]  
}
```

::: panel-link Want more details about the asset resource? [Check its endpoints here!](/api-reference.html#Assets)
:::

### Asset category (since 2.1 and EE only)
An asset category allows you to organise your assets. Asset categories are really similar to classical product categories. They constitute asset category trees and you can have multiple asset category trees with an unlimited number of levels (categories, subcategories, subsubcategories..).

:::info
An asset can be classified in several asset categories.
:::

In the Akeneo UI in v2.x, you can find the asset categories under the `Settings`/`Asset categories` menu.

![Asset categories in the Akeneo UI](/img/screenshots/v2.0/asset_categories_ui.png)

Below is the JSON standard format representing asset categories. Notice how it's really similar to the product categories format.
```json
// An asset root category
{
  "code": "asset_main_catalog",
  "labels":{
    "en_US": "Asset main catalog",
    "fr_FR": "Catalogue d'assets principal"
   },
  "parent": null
}
```
```json
// An asset subcategory
{
  "code": "prioritized_images",
  "labels":{
    "en_US": "Prioritized images",
    "fr_FR": "Images priorisées"
   },
  "parent": "asset_main_catalog"
}
```

::: panel-link Want more details about the asset category resource? [Check its endpoints here!](/api-reference.html#Assetcategories)
:::

### Asset tags (since 2.1 and EE only)
An asset tag allows you to tag your asset so that you can later easily filter on them.

::: info
An asset can have several tags.
:::

In the Akeneo UI in v2.x, you can view asset tags when you are on the `Properties` tab on the asset form.

Below is the JSON format representing asset tags.
```json
{
  "code": "christmas"
}
```

::: panel-link Want more details about the asset tag resource? [Check its endpoints here!](/api-reference.html#Assettags)
:::

## Products

### Product

The product is the central entity of the PIM. This is the entity that holds all the information concerning products.

It can be classified in several categories. It can belong to a group and inherit its attributes from a family. It can hold associations with other products or group of products.

In other words, this really is the heart entity of the PIM.

In the Akeneo UI, you can find the products in the `Enrich`/`Products` menu. Below is an example of a product in the UI.

::: versions id="products" 2.x![Products in the Akeneo UI](/img/screenshots/v2.0/products_ui.png) 1.7![Products in the Akeneo UI](/img/screenshots/v1.7/products_ui.png)
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
  "metadata": {
    "workflow_status": "working_copy"
  }
}
```

::: warning
Note that the `parent` field is only available in the 2.x versions, as this is a brand new feature introduced in the v2.0.
:::

::: warning
Note that the `metadata` field is only available in the 2.x versions and as it is an Enterprise Edition feature, you won't have this field on a Community Edition PIM.
:::

::: panel-link Want more details about the product resource? [Check its endpoints here!](/api-reference.html#Products)
:::

#### Product values

Product values hold all the information of the product. In concrete terms, it is the values of the product attributes.

In the API, the product values are in the property `values` of the product entity.

A product value follows this format:
```json
{
  "values": {
    ATTRIBUTE_CODE: [
      {
        "locale": LOCALE_CODE,
        "scope": CHANNEL_CODE,
        "data": DATA_INFORMATION
      }
    ]
  }
}
```
In this formula:
 - `ATTRIBUTE_CODE` is the code of an attribute of the product,
 - `LOCALE_CODE` is the code of a locale when the attribute is localizable, should be equal to `null` otherwise,
 - `CHANNEL_CODE` is the code of a channel when the attribute is scopable, should be equal to `null` otherwise,
 - `DATA_INFORMATION` is the value stored for this attribute for this locale (if attribute is localizable) and this channel (if the attribute is scopable). Its type and format depend on the attribute type as you can see in the table below.

| Attribute type / Format| Example |
| ----------------- | -------------- |
| **pim_catalog_identifier** <br> _string_ | `"12348716"` |
| **pim_catalog_text** <br> _string_ | `"Tshirt long sleeves"` |
| **pim_catalog_textarea** <br> _string_ | `"Tshirt long sleeves\nWinter special, 100% whool"` |
| **pim_catalog_file** <br> _string_ | `"f/2/e/6/f2e6674e076ad6fafa12012e8fd026acdc70f814_myFile.pdf"` |
| **pim_catalog_image** <br> _string_ | `"f/4/d/1/f4d12ffbdbe628ba8e0b932c27f425130cc23535_myImage.jpg"` |
| **pim_catalog_date** <br> _string, ISO-8601 format_ | `"2012-03-13T00:00:00+01:00"` |
| **pim_catalog_simpleselect** <br> _string_ | `"xs"` |
| **pim_catalog_reference_data_simpleselect** <br> _string_ | `"bouroullec"` |
| **pim_catalog_multiselect** <br> _Array[string]_ | `["leather", "cotton"]` |
| **pim_catalog_reference_data_multiselect** <br> _Array[string]_ | `["red", "black", "grey"]` |
| **pim_catalog_number** when `decimals_allowed` attribute property is set to `true` <br> _string_ | `"89.897"` |
| **pim_catalog_number** when `decimals_allowed` attribute property is set to `false` <br> _integer_ | `42` |
| **pim_catalog_boolean** <br> _boolean_ | `true` |
| **pim_catalog_metric** when `decimals_allowed` attribute property is set to `true` <br> _Object{"amount": string, "unit": string}_ | `{"amount":"-12.78","unit":"KILOWATT"}` |
| **pim_catalog_metric** when `decimals_allowed` attribute property is set to `false` <br> _Object{"amount": integer, "unit": string}_ | `{"amount":13,"unit":"KILOWATT"}` |
| **pim_catalog_price** when `decimals_allowed` attribute property is set to `true` <br> _Array[Object{"amount": string, "currency": string}]_ | `[{"amount":"45.00","currency":"USD"}, {"amount":"56.53","currency":"EUR"}]` |
| **pim_catalog_price** when `decimals_allowed` attribute property is set to `false` <br> _Array[Object{"amount": integer, "currency": string}]_ | `[{"amount":45,"currency":"USD"}, {"amount":56,"currency":"EUR"}]` |
| **pim_assets_collection** <br> _Array[string]_ | `["my_first_asset_code", "my_second_asset_code"]` |

**Product values of a localizable attribute**

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

**Product values of a scopable attribute**

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

**Product values of a localizable and scopable attribute**

The `description` attribute is both scopable and localizable, so it can hold several data values, up to one for each couple of channels and locales.
```js
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

**Product value of a non localizable, non scopable attribute**

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

::: panel-link Want to update product values? [Here you go!](/documentation/update.html#patch-product-values)
:::


### Product model (2.x only)

The product model gathers similar products that differ in some aspects, and allows the enrichment of their common properties.

It's like a product, but it's not a product! It can be categorized and it's composed of product values. For more information about what are the "product values", take a look to this dedicated piece of [documentation](/documentation/resources.html#product-values).

In the Akeneo UI, product models are displayed in the grid, exactly like classical products. To distinguish them from products, notice the small pile of pictures: it symbolizes the fact that a product model gathers several products with different variants.

![Product models in the grid](/img/screenshots/v2.0/product_models_in_the_grid.png)

It's also possible to enrich product model. Below, you can find a screenshot of what the UI looks like.

![Product models in the PEF](/img/screenshots/v2.0/product_models_in_the_pef.png)

To finish, below is the JSON standard format representing a product model. Notice how much it's closed to the product standard format!

```json
{
  "code": "jack",
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
  "metadata": {
    "workflow_status": "working_copy"
  }
}
```

::: warning
Endpoints for the product models are only available starting the 2.0 version.
:::

::: warning
Note that the `metadata` field is only available since the 2.3 version and as it is an Enterprise Edition feature, you won't have this field on a Community Edition PIM.
:::

::: panel-link Want more details about the product model resource? [Check its endpoints here!](/api-reference.html#Productmodels)
:::

### Published product (2.x and EE only)

A published product is a product that was published by a user in order to freeze a given version of the product. It can be very useful when you want to work on a new version of your product for the next collection for example, but in the meantime, you still want to export the previous version of your product to your channels.

::: warning
This is an Enterprise Edition feature. So you won't be able to call this endpoint if you are working on a Community Edition PIM. ;)
:::

In the Akeneo UI in v2.x, you can find the published products by clicking on the `...` button in the top right corner, when you are on the products grid. Then select the `Published products` option. You will then see a grid really similar to the classical product grid.

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

::: panel-link Want more details about the published product resource? [Check its endpoints here!](/api-reference.html#Publishedproducts)
:::
