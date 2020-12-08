# Catalog structure

In the PIM, products are structured thanks to the Catalog structure entities.

Each section below contains an explanation of the concept behind these resources. You will find out more about their usage in the PIM and their JSON format in order for them to interact with the REST API.

## Category
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

A category is a way of classifying products. Categories constitute category trees and in Akeneo, you can have multiple category trees with an unlimited number of levels (categories, subcategories, subsubcategories..).

:::info
A product can be classified in one or n categories.
:::

In the Akeneo UI in v2.x, you can find the categories in the `Settings`/`Categories` menu. In the 1.7, you'll find it in the `Enrich`/`Categories` menu.

::: version-screenshots id="categories" 2.x![Categories in the Akeneo UI](/img/concepts/categories_ui.png) 1.7![Categories in the Akeneo UI](/img/concepts/v1.7/categories_ui.png)
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

::: panel-link Want more details about the category resource? [Check its endpoints here!](/api-reference.html#Category)
:::

## Attribute
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

An attribute is a characteristic of a product. Each product is composed of a variety of attributes.

Depending on your Akeneo Edition version, you can have up to 13 attribute types: text and text area, simple or multiselect, boolean (yes/no), date, image, price, number, metric, assets (digital resources like a video, picture, PDF file...).

An attribute can be localizable. It means that it can have different values for each locale. This allows you to manage translations of your products according to the activated PIM locales. For instance, a localizable attribute will enable you to have one article name for each locale activated in your PIM. It is mostly used for text or (simple or multi) select attributes.

Some attributes can be shown only for specific locales. We will call them locale specific. For instance, a cold resistance attribute only for Russia, a Canadian tax only for Canada.

Finally, an attribute can be scopable. An attribute is scopable if its values differ for each channel. For instance, you might have one short description for your e-commerce website, maybe one even shorter for your mobile app but a long one for your print catalog.

Below is the list of attribute types and their description:

| Attribute | Attribute type | Description |
| --------------- | --------------- | --------------- |
| Identifier | pim_catalog_identifier | a code to identify your product, this code must be unique. It can be a SKU, a MPN... This attribute is mandatory to create products. |
| Text | pim_catalog_text | a single-line text field that can contain up to 255 characters, it is usually used for a product name. |
| Text area | pim_catalog_textarea | a multi-line text field that can be used for a product description. |
| Simple select | pim_catalog_simpleselect | a single-choice list coming with custom options. Only one value can be selected among the available options. |
| Multi select | pim_catalog_multiselect | a multi-choice list coming with custom options. More than one value can be selected amongst the available options. |
| Yes/No | pim_catalog_boolean | a boolean attribute |
| Date | pim_catalog_date | a date field, the PIM will display a calendar to choose the date, which includes day, month and year. |
| Number | pim_catalog_number | a single-line field that can only contain digits. |
| Measurement | pim_catalog_metric | a single-line field composed of a first field containing a value and a second field containing a measurement unit. It allows you to automatically convert measurement values to others to fit your export needs. |
| Price | pim_catalog_price_collection | a price attribute with values per currency. The displayed values will depend on the currencies enabled in the PIM. |
| Image | pim_catalog_image | a drag and drop down zone to upload an image (extensions allowed: gif, jfif, jif, jpeg, jpg, pdf, png, psd, tif, tiff) |
| File | pim_catalog_file | a drag and drop down zone to upload a file (allowed extensions: csv, doc, docx, mp3, pdf) |
| Asset collection (Enterprise Edition only) | pim_catalog_asset_collection | an advanced attribute type to manage several digital resources like pictures, pdf files, Youtube videos... |
| Reference entity single link (Enterprise Edition only) | akeneo_reference_entity | allows enriching common data related to products with a rich content (text, images...), more complex than just a code and labels. |
| Reference entity multiple links (Enterprise Edition only) | akeneo_reference_entity_collection | the same as above but allowing you to manage multiple links |
| Reference data simple select | pim_reference_data_simpleselect | allows you to manage any kind of data that has its own properties, as a single-choice select. |
| Reference data multi select | pim_reference_data_multiselect | allows you to manage any kind of data that has its own properties, as a multi-choice select. |

In the Akeneo UI, you can find the attributes in the `Settings`/`Attributes` menu. Below is an example of one attribute in the UI.

::: version-screenshots id="attributes" 2.x![Attributes in the Akeneo UI](/img/concepts/attributes_ui.png) 1.7![Attributes in the Akeneo UI](/img/concepts/v1.7/attributes_ui.png)
:::

Below is the JSON standard format representing this attribute.

```json
{
  "code": "auto_exposure",
  "type": "pim_catalog_boolean",
  "group": "technical",
  "group_labels": {
    "de_DE": "Technische",
    "en_US": "Technical",
    "fr_FR": "Technique"
  },
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

::: warning
Note that the `group_labels` field is only available in Serenity.
:::

::: panel-link Want more details about the attribute resource? [Check its endpoints here!](/api-reference.html#Attribute)
:::

## Attribute option
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

Some type of attributes offers list of choices. These available choices are attribute options.

Only attribute of type simple select, multiselect, reference data simple select and reference data multiselect can have options.

In the Akeneo UI, you can find the attribute options in the `Settings`/`Attributes` menu, then select a simple or multiselect attribute and go to the `Values` tab in the attribute form. Below is an example of the attribute options of the attribute `camera_brand` in the UI.

::: version-screenshots id="attribute_options" 2.x![Attribute options in the Akeneo UI](/img/concepts/attribute_options_ui.png) 1.7![Attribute options in the Akeneo UI](/img/concepts/v1.7/attribute_options_ui.png)
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

::: panel-link Want more details about the attribute option resource? [Check its endpoints here!](/api-reference.html#Attributeoption)
:::

## Family
::: availability versions=1.7,2.x,3.x,4.0,Serenity editions=CE,EE
:::

A family is a set of attributes that are shared by products belonging to this family. In other words, a family can be considered as a template for products. A product family can use all of the attributes available in the PIM. Several families of products can use the same attributes. 

When a product is associated to a family, the product automatically inherits from all attributes defined at the family level. 

The family helps managing the product’s completeness as you can say at the family level, which family attributes are required for the completeness calculation.

::: info
A product can belong to only one family.

Nevertheless, a product does not have to belong to a family. In this case, it has no default attributes.
:::

In the Akeneo UI, you can find the families in the `Settings`/`Families` menu. Below is an example of a family in the UI.

::: version-screenshots id="families" 2.x![Families in the Akeneo UI](/img/concepts/families_ui.png) 1.7![Families in the Akeneo UI](/img/concepts/v1.7/families_ui.png)
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

::: panel-link Want more details about the family resource? [Check its endpoints here!](/api-reference.html#Family)
:::

## Family variant
::: availability versions=2.x,3.x,4.0,Serenity editions=CE,EE
:::

The family variant is the entity used to modelize the products with variants.

From a single place, in a family variant, you will define all the structure for products with variants. You will define the number of variant levels, the variant axes and the distribution of attributes between common attributes or specific attributes for a variant.

In the Akeneo UI, you can find the family variants of one given family by going under the `Settings`/`Families` menu. Then, select one family and click on the `Variants` tab. All the variants of your family are right here!

![Family variants in the Akeneo UI](/img/concepts/family_variants_ui.png)

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

## Attribute group _(v2+)_

To facilitate the work of Julia inside the PIM, we gather attributes into groups. These groups are called `Attribute groups`.

In the Akeneo UI, you can find the attribute groups in the `Settings`/`Attribute groups` menu. Below is a screenshot of all attribute groups in the UI.

![Attribute groups in the Akeneo UI](/img/concepts/attribute_groups_ui.png)

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

::: panel-link Want more details about the attribute group resource? [Check its endpoints here!](/api-reference.html#Attributegroup)
:::

## Association type
::: availability versions=2.x,3.x,4.0,Serenity editions=CE,EE
:::

In the PIM, a product can be associated to another. You can create an association type to specify what is the nature of this association.

In the Akeneo UI, you can find the association types in the `Settings`/`Association types` menu. Below is an example of an association type in the UI.

![Association types in the Akeneo UI](/img/concepts/association_types_ui.png)

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

::: panel-link Want more details about the association type resource? [Check its endpoints here!](/api-reference.html#Associationtype)
:::
