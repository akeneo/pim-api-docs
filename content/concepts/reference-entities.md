# Reference entities

You want to manage rich data information around your products? The Reference entities are here to help you with this task.

They are designed to store complex information related to products. So neat! :rocket:

There are several resources available to interact with the Reference Entities feature via the REST API.  
Each section below contains an explanation of the concept behind these resources You will find out more about their usage in the PIM and their JSON format in order for them to interact with the REST API. 

::: info
The Reference Entities is an Entreprise only feature, meaning all the following resources are only available in the Entreprise Edition.
:::

## Reference entity
::: availability versions=3.x,4.0,5.0,6.0,7.0,SaaS editions=EE
:::

Reference entities are objects that are related to products but have their own attributes and lifecycle. A reference entity can be for example the brands, the ranges, the manufacturers, the colors, the materials or the care instructions... And so many other entities.

In the Akeneo UI, you can find the reference entities in the `Entities` menu. Below is an example of the `Brand` reference entity with its [records](#reference-entity-record) in the UI.

![Reference entity](/img/concepts/reference_entity_ui.png)

Below is the JSON format representing a reference entity.

```json
{
  "code": "brand",
  "labels": {
    "en_US": "Brand",
    "fr_FR": "Marque"
  },
  "image": "0/2/d/6/54d81dc888ba1501a8g765f3ab5797569f3bv756c_ref_img.png"
}
```

::: panel-link Want more details about the reference entity resource? [Check its endpoints here!](/api-reference.html#Referenceentity)
:::

## Reference entity attribute
::: availability versions=3.x,4.0,5.0,6.0,7.0,SaaS editions=EE
:::

Reference entities have attributes that allow to describe their [records](#reference-entity-record).

::: warning
Note that the "Reference entity attribute" resource is not the same as the "Attribute" resource, even though they have a lot in common. The first one is used to describe reference entities records, the second one is use to describe products.
:::

In the Akeneo UI, you can find the attributes that compose a given reference entity by following these simple steps. From the `Entities` menu, choose a reference entity and then, click on `Attributes`. Below is an example of the  `Designer` entity attributes in the UI.

![Reference entity attributes](/img/concepts/reference_entity_attribute_ui.png)

The JSON format for a reference entity attribute can differ according to its type. Below are some examples for each attribute type.

Format for the `text` attribute type
```json
{
  "code": "description",
  "labels": {
    "en_US": "Description",
    "fr_FR": "Description"
  },
  "type": "text",
  "value_per_locale": true,
  "value_per_channel": false,
  "is_required_for_completeness": true,
  "max_characters": null,
  "is_textarea": true,
  "is_rich_text_editor": true,
  "validation_rule": null,
  "validation_regexp": null
}
```

Format for the `image` attribute type
```json
{
  "code": "photo",
  "labels": {
    "en_US": "Photo",
    "fr_FR": "Photo"
  },
  "type": "image",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": true,
  "allowed_extensions": ["jpg"],
  "max_file_size": "10"
}
```

Format for the `number` attribute type (_since the 3.2 version_)
```json
{
    "code": "creation_year",
    "labels": {
        "en_US": "Creation year",
        "fr_FR": "Année de création"
    },
    "type": "number",
    "value_per_locale": false,
    "value_per_channel": false,
    "is_required_for_completeness": false,
    "decimals_allowed": false,
    "min_value": "1800",
    "max_value": "2100"
}
```

Format for the `single option` and `multiple options` attribute types
```json
{
  "code": "nationality",
  "labels": {
    "en_US": "Nationality",
    "fr_FR": "Nationalité"
  },
  "type": "single_option",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": false
}
```
```json
{
  "code": "sales_areas",
  "labels": {
    "en_US": "Sales areas",
    "fr_FR": "Zones de vente"
  },
  "type": "multiple_options",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": true
}
```

Format for the `reference entity single link` and `reference entity multiple links` attribute types
```json
{
  "code": "country",
  "labels": {
    "en_US": "Country",
    "fr_FR": "Pays"
  },
  "type": "reference_entity_single_link",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": false,
  "reference_entity_code": "country"
}
```
```json
{
  "code": "designers",
  "labels": {
    "en_US": "Designers",
    "fr_FR": "Designeurs"
  },
  "type": "reference_entity_multiple_links",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": true,
  "reference_entity_code": "designer"
}
```

Format for the `asset collection` attribute type
```json
{
  "code": "brand",
  "labels": {
    "en_US": "Brand",
    "fr_FR": "Marque"
  },
  "type": "asset_collection",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": false,
  "asset_family_identifier": "logos"
}
```

::: warning
You can have at max 100 attributes to describe the structure of one given reference entity.    
As a consequence, when you ask for the list of attributes of one given reference entity, you'll see that the response is not paginated. It won't cause any performance issue, since you can't have more than 100 attributes per reference entity.
:::

::: panel-link Want more details about the reference entity attribute resource? [Check its endpoints here!](/api-reference.html#Referenceentityattribute)
:::

## Reference entity attribute option
::: availability versions=3.x,4.0,5.0,6.0,7.0,SaaS editions=EE
:::

Some type of attributes of reference entities can offer a list of choices. These available choices are reference entity attribute options.

::: warning
Note that the "Reference entity attribute option" resource is not the same as the "Attribute option" resource, even though they have a lot in common. The first one is an option of an attribute used to describe reference entities records, the second one is an option of an attribute used to describe products.
:::

Only attribute of type `single option` or `multiple options` can have options.

In the Akeneo UI, here are the steps to manage the options of a reference entity attribute with single and multiple options:
1. Select a reference entity in the `Entities` menu
1. Then, click on `Attributes`
1. Click on `Edit` for a single or multiple options attribute. An edit pop-in opens. 
1. Then, click on `Manage options`. Here you are! You can view and edit the options of your attribute.  

The screenshot below shows the screen where you can manage your options.

![Reference entity attribute options in the Akeneo UI](/img/concepts/reference_entity_attribute_options_ui.png)

Below is the JSON format representing these reference entity attribute options.

```json
{
  "code": "europe",
  "labels": {
    "en_US": "Europe",
    "fr_FR": "Europe"
  }
}
```
```json
{
  "code": "asia",
  "labels": {
    "en_US": "Asia",
    "fr_FR": "Asie"
  }
}
```

::: warning
You can have at max 100 options per attribute. If you want to have more, it makes totally sense to create a new reference entity that you can then use as an attribute.  
As a consequence of this limit, when you ask for the list of attribute options of one given attribute, you'll see that the response is not paginated. It won't cause any performance issue, since you can't have more than 100 options per attribute.
:::

::: panel-link Want more details about the reference entity attribute option resource? [Check its endpoints here!](/api-reference.html#Referenceentityattributeoption)
:::

## Reference entity record
::: availability versions=3.x,4.0,5.0,6.0,7.0,SaaS editions=EE
:::

Reference entities have been introduced in the PIM in the 3.0 version.

A record holds all the information of a reference entity. A record can be related to one or more products.

Let's give an example to be clearer. For the "Brand" reference entity, a record could be all the information regarding the "Kartell" brand.

In the Akeneo UI, you can find the reference entity records in the `Entities` menu by selecting one of the entity of your choice. Below is an example of the record of a reference entity in the UI.

![Reference entity record](/img/concepts/reference_entity_record_ui.png)

Below is the JSON standard format representing a reference entity record.

```json
{
  "code": "kartell",
  "values": {
    "label": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Kartell"
      }
    ],
    "image": [
      {
        "locale": null,
        "channel": null,
        "data": "0/c/b/0/0cb0c0e115dedba676f8d1ad8343ec207ab54c7b_image.jpg"
      }
    ],
    "description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Kartell, the Italian furniture company that sells modern and remarkable pieces of furnitures."
      },
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "Kartell, l'éditeur de meuble italien spécialisé dans la signature de belle pièces au design contemporain."
      }
    ],
    "designer":[
      {
        "locale": null,
        "channel": null,
        "data": "starck"
      }
    ],
    "country": [
      {
        "locale": null,
        "channel": null,
        "data": "italy"
      }
    ],
    "creation_year":[
    {
        "locale": null,
        "channel": null,
        "data": "1949"
      }
    ],
    "photo":[
    {
        "locale": null,
        "channel": null,
        "data": "5/1/d/8/51d81dc778ba1501a8f998f3ab5797569f3b9e25_img.png"
      }
    ]
  }
}
```

::: panel-link Want more details about the reference entity record resource? [Check its endpoints here!](/api-reference.html#Referenceentityrecord)
:::

## Focus on the reference entity record values

Reference entity record values hold all the information of a reference entity record. In concrete terms, it is the values of the attributes you will find in the record of a reference entity.

In the REST API, the reference entity record values are in the property `values` of the reference entity record.

### The global format

Reference entity record values follow the same format as [product values](/concepts/products.html#focus-on-the-product-values): 
```json
{
  "values": {
    ATTRIBUTE_CODE: [
      {
        "locale": LOCALE_CODE,
        "channel": CHANNEL_CODE,
        "data": DATA_INFORMATION
      }
    ]
  }
}
```
In this formula:
 - `ATTRIBUTE_CODE` is the code of an attribute of the reference entity record,
 - `LOCALE_CODE` is the code of a locale when the attribute is localizable, should be equal to `null` otherwise. [Check some examples here.](#the-locale-and-channel-format)
 - `CHANNEL_CODE` is the code of a channel when the attribute is scopable, should be equal to `null` otherwise. [Check some examples here.](#the-locale-and-channel-format)
 - `DATA_INFORMATION` is the value stored for this attribute for this locale (if attribute is localizable) and this channel (if the attribute is scopable). Its type and format depend on the attribute type. [Check some examples here.](#the-data-format)

### The `data` format
The table below describes the format of the `data` property for each [reference entity attribute](#reference-entity-attribute) type.

| Attribute type / Format| Example |
| ----------------- | -------------- |
| **Text** <br> _string_ | `"A well-known manufacturer of high-end furniture"` |
| **Image** <br> _string_ | `"5/1/d/8/51d81dc778ba1501a8f998f3ab5797569f3b9e25_img.png"` |
| **Number** <br> _string_ | `"1949"` |
| **Simple select** <br> _string_ | `"yellow"` |
| **Multi select** <br> _Array[string]_ | `["leather", "cotton"]` |
| **Reference entity simple select** <br> _string_ | `"italy"` |
| **Reference entity multi select** <br> _Array[string]_ | `["starck", "dixon"]` |
| **Asset collection** <br> _Array[string]_| `["packshot", "badge"]`|

### The `locale` and `channel` format

The reference entity record values can be localizable and/or scopable. Here are some examples to illustrate those different possibilities.

::: info
Reference entity record values should be **localizable** whenever you want to enrich different values among your activated locales.  
Reference entity record values should be **scopable** whenever you want to enrich different values among your channels.
:::

#### Reference entity record values of a localizable attribute

The `short_description` attribute is localizable but not scopable, so it can hold several data values, up to one for each locale.
```json
{
  "short_description": [
    {
      "locale": "en_US",
      "channel": null,
      "data": "A well-known manufacturer of high-end furniture"
    },
    {
      "locale": "fr_FR",
      "channel": null,
      "data": "Un fabricant renommé de meubles de qualité"
    }
  ]
}
```
:::info
Note that the `channel` property is set to `null` in this case.
:::

#### Reference entity record values of a scopable attribute

The `image` attribute is scopable but not localizable, so it can hold several data values, up to one for each channel.
```json
{
  "image": [
    {
      "locale": null,
      "channel": "ecommerce",
      "data": "5/1/d/8/51d81dc778ba1501a8f998f3ab5797569f3b9e25_img_ecommerce.png"
    },
    {
      "locale": null,
      "channel": "mobile",
      "data": "c/4/d/8/51d81dc778ba1501a8f998f3ab57975610g7867i_img_mobile.png"
    }
  ]
}
```
:::info
Note that the `locale` property is set to `null` in this case.
:::

#### Reference entity record values of a localizable and scopable attribute

The `description` attribute is both scopable and localizable, so it can hold several data values, up to one for each couple of channels and locales.
```js
{
  "description": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "Calligaris is a well-known manufacturer of high-end furniture that was founded in Italy in 1923."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "Calligaris is an Italian manufacturer of high-end furniture. It was founded in 1923 in Italy in the small town of Manzano. Its creator is Antonio Calligaris, a craftman specialized in the creation of wood chairs."
    },
    {
      "locale": "fr_FR",
      "channel": "mobile",
      "data": "Calligaris est un fabricant de meubles renommé qui fut fondé en 1923 en Italie."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Calligaris est un fabricant italien de meubles de luxe. L'entreprise a été fondé en 1923 en Italie dans la petite ville de Manzano. Son créateur, Antonio Calligaris, était un artisan spécialisé dans la fabrication de chaises en bois."
    }
  ]
}
```

#### Reference entity record value of a non localizable, non scopable attribute

The `creation_year` attribute is neither scopable nor localizable, so it can hold only one data value.
```json
{
  "creation_year": [
    {
      "locale": null,
      "channel": null,
      "data": "1949"
    }
  ]
}
```
:::info
Note that the `locale` and `channel` properties are all set to `null` in this case.
:::

::: panel-link Want to update reference entity record values? [Here you go!](/documentation/update.html#update-reference-entity-record-values)
:::

## Reference entity media file
::: availability versions=3.x,4.0,5.0,6.0,7.0,SaaS editions=EE
:::

Reference entity media files corresponds to the images that you can link to the records of your reference entities and also, to the images that you can directly link to your reference entities.

In the Akeneo UI, you can find these media files in the detail of a record. In the screenshot below, there are two record media files: 
- the first image with the logo of the brand,
- the second image inside the `Photo` attribute.

![Reference entity record](/img/concepts/reference_entity_record_ui.png)

You can also find media files in the properties of a reference entity, as shown in the screenshot below. 

![Reference entity record](/img/concepts/reference_entity_media_file_ui.png)

::: panel-link Want more details about the reference entity media file resource? [Check its endpoints here!](/api-reference.html#Referenceentitymediafile)
:::
