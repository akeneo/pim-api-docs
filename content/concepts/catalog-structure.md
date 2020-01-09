# Catalog structure

In the PIM, products are structured thanks to the Catalog structure entities.

Each section below contains an explanation of the concept behind these resources. You will find out more about their usage in the PIM and their JSON format in order for them to interact with the API.

## Category
::: availability versions=1.7,2.0,2.1,2.2,2.3,3.0,3.1,3.2,4.0 editions=CE,EE
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
::: availability versions=1.7,2.0,2.1,2.2,2.3,3.0,3.1,3.2,4.0 editions=CE,EE
:::

An attribute is a characteristic of a product. Each product is composed of a variety of attributes.

Depending on your Akeneo Edition version, you can have up to 13 attribute types: text and text area, simple or multiselect, boolean (yes/no), date, image, price, number, metric, assets (digital resources like a video, picture, PDF file...).

An attribute can be localizable. It means that it can have different values for each locale. This allows you to manage translations of your products according to the activated PIM locales. For instance, a localizable attribute will enable you to have one article name for each locale activated in your PIM. It is mostly used for text or (simple or multi) select attributes.

Some attributes can be shown only for specific locales. We will call them locale specific. For instance, a cold resistance attribute only for Russia, a Canadian tax only for Canada.

Finally, an attribute can be scopable. An attribute is scopable if its values differ for each channel. For instance, you might have one short description for your e-commerce website, maybe one even shorter for your mobile app but a long one for your print catalog.

In the Akeneo UI, you can find the attributes in the `Settings`/`Attributes` menu. Below is an example of one attribute in the UI.

::: version-screenshots id="attributes" 2.x![Attributes in the Akeneo UI](/img/concepts/attributes_ui.png) 1.7![Attributes in the Akeneo UI](/img/concepts/v1.7/attributes_ui.png)
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

::: panel-link Want more details about the attribute resource? [Check its endpoints here!](/api-reference.html#Attribute)
:::

## Attribute option
::: availability versions=1.7,2.0,2.1,2.2,2.3,3.0,3.1,3.2,4.0 editions=CE,EE
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
::: availability versions=1.7,2.0,2.1,2.2,2.3,3.0,3.1,3.2,4.0 editions=CE,EE
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
::: availability versions=2.0,2.1,2.2,2.3,3.0,3.1,3.2,4.0 editions=CE,EE
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
::: availability versions=2.0,2.1,2.2,2.3,3.0,3.1,3.2,4.0 editions=CE,EE
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
