# Asset Manager
The Asset Manager is a brand new and more efficient way to manage the assets linked to your products/product models inside the PIM. :rocket:

The assets of the Asset Manager will be way more powerful than before. They will benefit from 4 major new features:
- the possibility to define a flexible structure, thanks to the [asset families](#the-asset-family),
- the possibility to automatize the link with your products, thanks to the [product link rules](#focus-on-the-product-link-rule) and the [naming convention](#focus-on-the-naming-convention),
- the possibility to refer to both external and internal binaries, thanks to the [media link](#the-media-link-attribute) and the [media file](#the-media-file-attribute) attribute types,
- the posibility to have flexible asset [transformations](#focus-on-the-transformations).

Below, you'll find an illustration of this wonderful new feature.

![Asset manager schema](/img/concepts/asset-manager.svg)

This part of the documentation introduces all the REST API resources our team created to interact with the Asset Manager.

::: info
The Asset Manager is an Entreprise only feature, meaning all the following resources are only available in the Entreprise Edition.
:::

## Asset family
::: availability versions=3.2,4.0,5.0,SaaS editions=EE
:::

An asset family gathers a number of assets that share a common attribute structure. In other words, an asset family can be considered as a template for its assets.

An asset family is made of [asset attributes](#the-asset-attribute). Unlike the [product families](/concepts/catalog-structure.html#family), asset attributes are not shared between asset families.

Below are some examples of asset families, along with their asset attributes.

![Asset family scheme](/img/concepts/asset-family.svg)

For each asset family you can:
- define which attribute will be used as the main media of this family. We call it :`attribute_as_main_media`.  In the data grids, product or asset, we will display the preview of the media stored/linked to this attribute (image, pdf, Youtube, Vimeo). By default, the attribute as main media is the first media link or media file attribute that was created in this family.
- define what we call a _naming convention_. It enables you to easily extract important information from your asset code or main media filename, such as the SKU of the product related to this asset. See [below](#focus-on-the-naming-convention) for more details on this feature.
- define the way the PIM will automatically link the assets of this family to your products/product models. It is the `product link rule`. [Below](#focus-on-the-product-link-rule), you'll find the specific format of this rule.
- define several transformations for your [media file attributes](#the-media-file-attribute). Don't hesitate to read the [Transformations section](#focus-on-the-transformations) to learn more and also, discover their JSON format.

Here is the JSON format representing an example of asset family.

```json
{
  "code": "packshots",
  "labels": {
    "en_US": "Pachskots",
    "fr_FR": "Packshots"
  },
  "attribute_as_main_media": "main_image",
  "naming_convention": {
    "source": {
        "property": "main_asset_image",
        "channel": null,
        "locale": null
    },
    "pattern": "/(?P<product_ref>.*)\\.jpg/",
    "abort_asset_creation_on_error": true
  },
  "product_link_rules": [
    {
      "product_selections": [
        {
          "field": "sku",
          "operator": "=",
          "value": "{{product_ref}}"
        }
      ],
      "assign_assets_to": [
        {
          "attribute": "model_pictures",
          "mode": "replace"
        }
      ]
    }
  ],
  "transformations": [
    {
      "label": "Thumbnail plus black and white transformation",
      "filename_suffix": "_thumbnailBW",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [
        {
          "type": "resize",
          "parameters": {
            "width": 150,
            "height": 150
          }
        },
        {
          "type": "colorspace",
          "parameters": {
            "colorspace": "grey"
          }
        }
      ]
    }
  ]
}
```

::: panel-link Want more details about the asset family resource? [Check its endpoints here!](/api-reference.html#Assetfamily)
:::

## Focus on the naming convention
::: availability versions=4.0,5.0,SaaS editions=EE

We noticed that you, our dear customers 🥰, usually name your asset files or asset codes using precious information:
- the SKU of the product corresponding to the asset,
- the locale into which your user guides are translated,
- the asset function: _Is it a frontview, backview,...?_,
- ...

The idea of the naming convention feature is to be able to extract those pieces of information and use them to automatically enrich your assets with new attributes.

By defining a naming convention, for each [asset family](#the-asset-family), the PIM will be able to split the asset code or the main media filename, in order to extract the information you want and use it to populate asset attributes.
This operation is done automatically by the PIM upon each asset creation.

::: info
This naming convention is defined at the [asset family](#the-asset-family) level.
:::

::: tips
The naming convention is perfect to automatically populate the asset attributes that will then be used by the [product link rule](#focus-on-the-product-link-rule). :wink:
:::

The JSON format of the naming convention contains several parts:
- the [`source` part](#the-source-string),
- the [`pattern` part](#the-split-pattern),
- a [boolean stating whether to abort the asset creation in case there was an error during the application of the naming convention](#abortion-on-error).
```json
{
    "source": {...},
    "pattern": A_REGEXP,
    "abort_asset_creation_on_error": A_BOOLEAN
}
```

#### Examples
```json
{
    "source": {
        "property": "main_asset_image",
        "channel": null,
        "locale": null
    },
    "pattern": "/(?P<product_ref>.*)-.*-(?P<attribute_ref>.*)\\.jpg/",
    "abort_asset_creation_on_error": true
}
```

Still not comfortable with the naming convention? Don't hesitate to go through the next sections where we detail each part of the naming convention format.

### The source string

The `source` property allows you to define on which string the split will be applied. It can be either:
- the asset code,
- the code of the main media attribute of your family.

It follows this format:
```json
{
  "source": {
    "property": CODE_OR_ATTRIBUTE_CODE,
    "locale": SOURCE_LOCALE_CODE,
    "channel": SOURCE_CHANNEL_CODE
  },...
}
```

In this formula:
 - `CODE_OR_ATTRIBUTE_CODE` can be either:
     + the _"code"_ string: when you want the asset code to be used as the source string,
     + the code of the main media asset attribute of the family: when you want the filename of the main media to be used as the source string.
 - `SOURCE_LOCALE_CODE` is an existing locale code when `CODE_OR_ATTRIBUTE_CODE` is the code of the main media asset attribute of the family and this one is localizable.
 - `SOURCE_CHANNEL_CODE` is an existing channel code when `CODE_OR_ATTRIBUTE_CODE` is the code of the main media asset attribute of the family and this one is scopable.

::: warning
The `property`, `locale` and `channel` properties are mandatory.

The `locale` property should be set to `null` if:
- `CODE_OR_ATTRIBUTE_CODE` is equal to _"code"_,
- `CODE_OR_ATTRIBUTE_CODE` is equal to the code of the main media attribute and this one is not localizable.

The `channel` property should be set to `null` if:
- `CODE_OR_ATTRIBUTE_CODE` is equal to _"code"_,
- `CODE_OR_ATTRIBUTE_CODE` is equal to the code of the main media attribute and this one is not scopable.  
:::

### The split pattern

The `pattern` property allows you to define how the PIM should split the [source string](#the-source-string). Then, the result of the split will automatically populate the corresponding asset attributes.

The split pattern should be a string. It should be given as a regular expression.  
In order for the PIM to know into which asset attributes the result of the split should be sent, this regular expression should contain one or several named capture groups.  
Note that the names of these capture groups should be equal to the code of existing asset attribute of the family and these asset attributes can only be [`text` attributes](#the-text-attribute) and [`number` attributes](#the-number-attribute).

::: warning
These asset attributes cannot be localizable neither scopable.
:::

::: tips
Not comfortable with regular expressions? You can try yours [right here](https://regex101.com/)!
:::

Let's take an example to make this clearer!
```regexp
/^(?P<product_ref>.*)_(?P<attribute_ref>.*)\\.jpg$/
```
The regexp above will split the source string into three parts, thanks to two named capture groups:
- `(?P<product_ref>.*)` is the first capture group. It is named `product_ref`. So, the result of this capture will be sent into the `product_ref` asset attribute. The `product_ref` attribute should exist in the asset family.
- `(?P<attribute_ref>.*)` is the second capture group. It is named `attribute_ref`. So, the result of this capture will be sent to the `attribute_ref` asset attribute. The `attribute_ref` attribute should exist in the asset family.
Let's say our source string is equal to `allie_jean-picture-packshot.png`. After the naming convention application, the `product_ref` asset attribute will contain the value "allie_jean" and the `attribute_ref` asset attribute will contain the value "packshot".

### Abortion on error

Sometimes, the application of the naming convention will fail. For example, it is the case if the regular expression did not capture any group. In this case, you can choose if you still want the corresponding asset to be created. As a result, the asset won't be created and you will be able to submit it again with a better filename/code for example.

To allow this behavior, set the `abort_asset_creation_on_error` to `true`.

If you want the asset to be created even if the naming convention application failed, set the property to `false`.


## Focus on the product link rule
::: availability versions=3.2,4.0,5.0,SaaS editions=EE

The product link rule enables you to automatically link assets to products/product models, based on asset names or attributes. This rule is defined at the [asset family](#the-asset-family) level.  

This rule is launched by the PIM after the asset creation.

::: warning
To use the product link rules on product models, you should use the "identifier" of the model in the `field` of the product selections part.
:::

::: info
You can have up to **two** different product link rules for one given asset family.
:::

The JSON format of the product link rules is an array of product link rules. A product link rule is divided into two parts:
- the `product_selections` part,
- the `assign_assets_to` part.

```json
{
  "product_link_rules": [
    {
      "product_selections": [...],
      "assign_assets_to": [...]
    }
  ]
}
```

#### Examples
**With one product link rule**
```json
{
  "product_link_rules": [
    {
      "product_selections": [
        {
          "field": "sku",
          "operator": "=",
          "value": "{{product_ref}}",
          "locale": null,
          "channel": null
        }
      ],
      "assign_assets_to": [
        {
          "mode": "replace",
          "attribute": "user_instructions",
          "locale": "{{locale}}",
          "channel": null
        }
      ]
    }
  ]
}
```

**With two product link rules**
```json
{
  "product_link_rules": [
    {
      "product_selections": [
        {
          "field": "categories",
          "operator": "IN",
          "value": ["men_clothes"]
        }
      ],
      "assign_assets_to": [
        {
          "mode": "add",
          "attribute": "ambient_image",
          "locale": null,
          "channel": null
        }
      ]
    },
    {
      "product_selections": [
        {
          "field": "categories",
          "operator": "IN",
          "value": ["women_clothes"]
        }
      ],
      "assign_assets_to": [
        {
          "mode": "add",
          "attribute": "ambient_image",
          "locale": null,
          "channel": null
        }
      ]
    }
  ]
}
```

::: warning
A piece of advice: when defining two different rules on an asset family, make sure you define different product selections in each rule, as shown in the example above. Why? Because you could experience performance issues. If you want to assign your assets to two different product attributes on a given selection of products, use one single rule, with two assigments in the `assign_assets_to` field. See the [Product value assigment](#product-value-assignment) section for an example.
:::

Looks barbaric? Don't freak out! The following sections are here to help you understand this rule and how you can make the most of it. You'll see, it's super powerful! :)

### Product selection

The first part of the rule is a property called `product_selections`. This property will allow you to define a selection of products for which you want to automatically link the assets of the asset family.

In one single product link rule, you can define one or several product selections.

The `product_selections` property follows this format:
```json
{
  "product_selections": [
    {
      "field": FIELD_NAME,
      "operator": OPERATOR_NAME,
      "value": VALUE,
      "locale": SELECTION_LOCALE_CODE,
      "channel": SELECTION_CHANNEL_CODE
    },...
  ]
}
```

In this formula:
 - `FIELD_NAME` is the name of the field used to select your products. It can be a product attribute or a property of the product like categories for example.
 - `OPERATOR_NAME` is the name of the operator that will allow you to make your selection of products. Several operators are available depending on the `FIELD_NAME` you provided before.
 - `VALUE` is a value whose type corresponds to the `FIELD_NAME` you provided before.
 - `SELECTION_LOCALE_CODE` is an existing locale code when `FIELD_NAME` is the code of a localizable product attribute.
 - `SELECTION_CHANNEL_CODE` is an existing channel code when `FIELD_NAME` is the code of a scopable product attribute.

::: warning
The `field`, `operator` and `value` properties are mandatory.
:::

::: warning
The `locale` and `channel` properties should not appear in your product selection, whenever you are using the following `FIELD_NAME`: `categories`, `family` and `enable`.  
But they are mandatory when the `FIELD_NAME` is a product attribute code.
If the `FIELD_NAME` is the code of an attribute that is not localizable, the `locale` property should be set to `null`.  
If the `FIELD_NAME` is the code of an attribute that is not scopable, the `channel` property should be set to `null`.  
:::

#### Example
Here is a concrete example to make it clearer.
If you want to select the products which are both enabled and classified in the `men` category, you can use the following syntax.
```json
{
  "product_selections": [
    {
      "field": "enabled",
      "operator": "=",
      "value": "true"
    },
    {
      "field": "categories",
      "operator": "IN",
      "value": ["men"]
    }
  ]
}
```

::: info
As you can see above, you can use multiple conditions to make your selection. Those conditions are cumulated. In the example, we select the products that are **both** enabled and in the `men` category.
:::

Here is the list of the fields you can use to select your products:
- among the product properties:
  + the [product family](#selection-via-product-family),
  + the [product categories](#selection-via-product-categories),
  + the [product status](#select-via-the-product-status),
- among the product attributes:
  + the [identifier attribute](#select-via-identifier-attribute),
  + the [text attributes](#select-via-text-attribute),
  + the [simple/multi select attributes](#select-via-simplemulti-select-attribute).

#### Selection via product family
To associate your assets to a given set of products, you can use their family. In this case, use the keyword `family` as the `FIELD_NAME`.

The table below summarizes the operators available when you select products per family as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `IN` | _Array of existing family codes_ | Selects products that are respectively in the given families |
| `NOT IN` | _Array of existing family codes_ | Selects products that are respectively not in the given families |

**Example**  
The following selection will select the products belonging to the `accessories` family.

```json
{
  "product_selections": [
    {
      "field": "family",
      "operator": "IN",
      "value": ["accessories"]
    }
  ]
}
```

#### Selection per product categories
To associate your assets to a given set of products, you can use their categories. In this case, use the keyword `categories` as the `FIELD_NAME`.

The table below summarizes the operators available when you select per categories as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `IN` | _Array of existing category codes_ | Selects the products that are in the given categories |
| `NOT IN` | _Array of existing category codes_ | Selects the products that are not in the given categories |
| `IN OR UNCLASSIFIED` | _Array of existing category codes_ | Selects the products that are in the given categories or that are not classified in any categories |
| `IN CHILDREN` | _Array of existing category codes_ | Selects the products that are in the children of the given categories |
| `NOT IN CHILDREN` | _Array of existing category codes_ | Selects the products that are not in the children of the given categories |
| `UNCLASSIFIED` | _No value_ | Selects the products that are not classified into any category |

**Example**  
The following selection will select the products belonging to the `bohemian_style` category.

```json
{
  "product_selections": [
    {
      "field": "categories",
      "operator": "IN",
      "value": ["bohemian_style"]
    }
  ]
}
```

#### Selection per product status
To associate your assets to a given set of products, you can use their status. In this case, use the keyword `enabled` as the `FIELD_NAME`.

The table below summarizes the operator available when you select per status as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `=` | _string: "true" or "false"_ | Selects products that are enabled (`"true"`) or disabled (`"false"`) |

**Example**  
The following selection will select the products that are enabled.

```json
{
  "product_selections": [
    {
      "field": "enabled",
      "operator": "=",
      "value": "true"
    }
  ]
}
```

#### Selection per identifier attribute

To associate your assets to a given set of products, you can use their identifier. In this case, use the code of the identifier attribute you have in your product family as the `FIELD_NAME`.

The table below summarizes the operators available when you select per identifier attribute as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `CONTAINS`  | _String_ | Selects products whose identifier contains a specific value |
| `DOES NOT CONTAIN` | _String_ | Selects products whose identifier does not contain a specific value  |
| `=`  | _String_ | Selects products that have exactly the given identifier |
| `!=` | _String_ | Selects products whose identifier is not the given one |

**Example**  
The following selection will select the product with the `sku_54628` SKU, knowing that `sku` is the code of the identifier attribute.

```json
{
  "product_selections": [
    {
      "field": "sku",
      "operator": "=",
      "value": "sku_54628",
      "locale": null,
      "channel": null
    }
  ]
}
```

#### Selection per text attribute

To associate your assets to a given set of products, you can use one of their text attributes. In this case, use the code of one of the text attributes from your product family as the `FIELD_NAME`.

The table below summarizes the operators available when you select per text attribute as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `STARTS WITH` | _String_ | Selects products with a text attribute that begins with the given value |
| `CONTAINS`  | _String_ | Selects products with a text attribute that contains the given value |
| `DOES NOT CONTAIN` | _String_ | Select products with a text attribute that does not contain the given value |
| `=`  | _String_ | Selects products with a text attribute value that is an exact match to the given value |
| `!=` | _String_ | Select products with a text attribute value that differs from the given value |


**Example**  
The following selection will select the products that have the words `bohème chic`, in their `description` attribute, on `fr_FR` locale and on the `ecommerce` channel.

```json
{
  "product_selections": [
    {
      "field": "description",
      "operator": "CONTAINS",
      "value": "bohème chic",
      "locale": "fr_FR",
      "channel": "ecommerce"
    }
  ]
}
```

#### Selection per simple/multi select attribute

To associate your assets to a given set of products, you can use one of their simple select attributes or multi select attributes. In this case, use the code of one of the simple/multi select attributes from your product family as the `FIELD_NAME`.

The table below summarizes the operators available when you select per simple/multi select attribute as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `IN` | _Array of existing simple/multi select option codes_ | Select products having a specific option in the respective simple select attribute |
| `NOT IN`  | _Array of existing simple/multi select option codes_ | Select products not having a specific option in the respective simple select attribute |

**Example**  
The following selection will select the products that have the `range_style` simple select set to `bohemian_chic`, `bohemian_chic` being an option of the simple select `range_style` attribute.

```json
{
  "product_selections": [
    {
      "field": "range_style",
      "operator": "IN",
      "value": ["bohemian_chic"],
      "locale": null,
      "channel": null
    }
  ]
}
```

### Product value assignment
Once you have chosen and selected the products you want to apply the rule on, it is time to think about where, in the products, you want to assign those assets.

This is done in the second part of the product link rule, in the `assign_assets_to` property.
Thanks to this property, you will define to which product value you want to assign your assets. In other words, which attribute, locale and scope of the products you want to link your assets to. You can also decide whether you want to add new assets or replace the existing ones inside this product attribute.

The `assign_assets_to` property follows this format:
```json
{
  "assign_assets_to": [
      {
        "mode": MODE_NAME,
        "attribute": ATTRIBUTE_CODE,
        "locale": LOCALE_CODE,
        "channel": CHANNEL_CODE
      },...
    ]
}
```

In this formula:
- `MODE_NAME` allows you to choose if you want to add or replace the current values of the asset collection you want your assets to be assigned to.
- `ATTRIBUTE_CODE` is the code of the product attribute in which you want to link your asset. This attribute should be an asset collection attribute.
- `LOCALE_CODE` is an existing locale code when `ATTRIBUTE_CODE` is the code of a localizable attribute.
- `CHANNEL_CODE` is an existing channel code when `ATTRIBUTE_CODE` is the code of a scopable attribute.

::: warning
All the fields of this formula are mandatory.
:::

::: warning
If the `ATTRIBUTE_CODE` is the code of an attribute that is not localizable, the `locale` property should be set to `null`.  
If the `ATTRIBUTE_CODE` is the code of an attribute that is not scopable, the `channel` property should be set to `null`.  
:::

For the `mode`, you can decide between two values:
- `add`: this mode allows you to add the new assets to the asset collection attribute. They will appear after all the assets already existing in the attribute.
- `replace`: this mode allows you to replace all the previously existing assets by the new ones, within the asset collection attribute.

#### Example
Imagine, in the family of the products you [selected](#product-selection) before, you have the `user_instructions` asset collection attribute. This attribute is localizable. If you want to add the assets to this attribute, on the `en_US` locale, without replacing the existing ones, you can use the following syntax.

```json
{
  "assign_assets_to": [
    {
      "mode": "add",
      "attribute": "user_instructions",
      "locale": "en_US",
      "channel": null
    }
  ]
}
```

::: info
You can provide multiple actions in one single rule. Let's take an example. Say you want to assign the asset to two different attributes of your product, the `main_image` one and the `images` one.

```json
{
  "assign_assets_to": [
    {
      "mode": "replace",
      "attribute": "main_image",
      "locale": null,
      "channel": null
    },
    {
      "mode": "add",
      "attribute": "images",
      "locale": null,
      "channel": null
    }
  ]
}
```
:::

### Asset values extrapolation
"Asset values extrapolation"? What the hell is that? It's the clever naming I just came up with to explain one last thing about the product link rule.

You now know how to [select your products](#product-selection), and then [assign your assets in the right product attribute](#product-value-assignment). That's a good start.

But in some cases, you might need the rule to be a bit more powerful so it answers your expectations.  
As an example is better than 10,000 words, let's imagine this situation.

#### An example
You put all your user guides in the same asset family, called `user_instructions`.  
On the one hand, you have an asset of this family, let's say the user guide for a particular TV, the `XMLD500` TV. This user guide asset has the following code: `XMLD500_fr_FR_user_guide`. It is the French version of the user guide for this TV.  
On the other hand, you have your TV with the following SKU: `XMLD500`. The product sheet of this TV has an asset attribute collection called `user_guides`. It is localizable.  
Now, what you want is to automatically link the `XMLD500_fr_FR_user_guide` to the `XMLD500` product, in the right attribute on the right locale, ie the French locale.

How do you do that? I'll tell you. You're gonna need "asset value extrapolation".

"Asset value extrapolation" is a mechanism by which you can target specific asset values in various fields of the product link rule so that they can be interpreted depending on the asset it is currently linking.

Not sure you understood, so let's write the product link rule for my previous example.

```json
{
  "product_link_rules": [
    {
      "product_selections": [
        {
          "field": "sku",
          "operator": "EQUALS",
          "value": "{{product_ref}}",
          "locale": null,
          "channel": null
        }
      ],
      "assign_assets_to": [
        {
          "mode": "replace",
          "attribute": "user_guides",
          "locale": "{{locale}}",
          "channel": null
        }
      ]
    }
  ]
}
```

As a prerequisite for this rule to work, we would need two new attributes in the structure of our `user_instructions` asset family. One named `product_ref`, and the other `locale`.  
In our example, for our `XMLD500_fr_FR_user_guide` asset, we would store the string `XMLD500` into the `product ref` attribute and `fr_FR` in the `locale` attribute.

::: tips
To populate the `product_ref` and `locale` attributes, you have three options:
- enrich that information manually in the PIM interface,
- in the case you have a connector creating assets in the PIM, you can code this step directly in your connector,
- or since the v4.0, you can use the naming convention feature if the information is already stored in your asset code or in the filename of your main media file. :wink: Eager to know more? Take a look at the [naming convention focus section](#focus-on-the-naming-convention).
:::

In fine, below is the JSON of our dear `XMLD500_fr_FR_user_guide` asset, once we added those new attributes.

```json
{
  "code": "XMLD500_fr_FR_user_guide",
  "family": "user_instructions",
  "values": {
    "media_preview": [
      {
        "locale": null,
        "channel": null,
        "data": "XMLD500_fr_FR_user_guide.pdf"
      }
    ],
    "product_ref":[
      {
        "locale": null,
        "channel": null,
        "data": "XMLD500"
      }
    ],
    "locale": [
      {
        "locale": null,
        "channel": null,
        "data": "fr_FR"
      }
    ]
  }
}
```

So, now that our asset is ready, whenever the rule is launched, the PIM will automatically extrapolate the rule. It will replace the curlies reference, `{{product_ref}}` and `{{locale}}` by their actual values in the asset it's currently trying to link to products.

The PIM, whenever it wants to link the `XMLD500_fr_FR_user_guide` asset to the right product, will interpret the rule as if it was written like this:
```json
{
  "product_link_rules": [
    {
      "product_selections": [
        {
          "field": "sku",
          "operator": "EQUALS",
          "value": "XMLD500",
          "locale": null,
          "channel": null
        }
      ],
      "assign_assets_to": [
        {
          "mode": "replace",
          "attribute": "user_instructions",
          "locale": "fr_FR",
          "channel": null
        }
      ]
    }
  ]
}
```

In other words, it's going to select the product with the following  SKU: `XMLD500` and assign the asset to the `user_instructions` product attribute on the `fr_FR` locale. Exactly what we wanted. ;)

#### Extrapolated properties

As you saw in the previous example, to notify the PIM a property of the rule  should be extrapolated, you will need to use the following syntax: `"{{code_of_an_asset_attribute}}"`.

This way, the PIM will know that it needs to replace this string by the value stored inside the `code_of_an_asset_attribute` attribute of the given asset it currently wants to link.

You can use this super power - the extrapolation - in the following properties of the rule:
- in the product selection part:
  + `field`,
  + `value`,
  + `locale`,
  + `channel`,
- in the assignment part:
  + `attribute`,
  + `locale`,
  + `channel`.

:::info
The extrapolation mechanism can be used in combination with strings. For more details, see the examples below.
:::

::: warning
When using the extrapolation mechanism, you should only refer to non scopable and non localizable asset attributes.
:::


#### Some other examples

**Example 1**
Let's consider the `amor_red_model_picture` and `amor_blue_model_picture` assets for this example. Those two assets are in the same asset family.
```json
{
  "code": "amor_red_model_picture",
  "family": "model_pictures",
  "values": {
    "media_preview": [
      {
        "locale": null,
        "channel": null,
        "data": "amor_red_model_picture.jpg"
      }
    ],
    "product_ref":[
      {
        "locale": null,
        "channel": null,
        "data": "amor"
      }
    ],
    "model_is_wearing_size": [
      {
        "locale": null,
        "channel": null,
        "data": "s"
      }
    ],
    "main_color": [
      {
        "locale": null,
        "channel": null,
        "data": "red"
      }
    ]
  }
}
```
```json
{
  "code": "amor_blue_model_picture",
  "family": "model_pictures",
  "values": {
    "media_preview": [
      {
        "locale": null,
        "channel": null,
        "data": "amor_blue_model_picture.jpg"
      }
    ],
    "product_ref":[
      {
        "locale": null,
        "channel": null,
        "data": "amor"
      }
    ],
    "model_is_wearing_size": [
      {
        "locale": null,
        "channel": null,
        "data": "S"
      }
    ],
    "main_color": [
      {
        "locale": null,
        "channel": null,
        "data": "blue"
      }
    ]
  }
}
```
We want these assets to be automatically linked to their respective products: `sku_amor_blue` and `sku_amor_red`.

To do this, you'll use the following product link rule.

```json
{
  "product_link_rules": [
    {
      "product_selections": [
        {
          "field": "sku",
          "operator": "EQUALS",
          "value": "sku_{{product_ref}}_{{main_color}}",
          "locale": null,
          "channel": null
        }
      ],
      "assign_assets_to": [
        {
          "mode": "replace",
          "attribute": "pictures",
          "locale": null,
          "channel": null
        }
      ]
    }
  ]
}
```

You can use the extrapolation mechanism in combination with strings, see below, in the `value` field of the `product_selections` property.  
For the `amor_blue_model_picture`, the `value` field will be extrapolated to `sku_armor_blue`. For the `amor_red_model_picture`, the `value` field will be extrapolated to `sku_armor_red`.

**Example 2**
Let's consider the `men_women_ambient_picture` and `children_ambient_picture` assets for this example. Those two assets are in the same asset family.
```json
{
  "code": "men_women_ambient_picture",
  "family": "ambient_images",
  "values": {
    "media_preview": [
      {
        "locale": null,
        "channel": null,
        "data": "men_women_ambient_picture.jpg"
      }
    ],
    "product_categories":[
      {
        "locale": null,
        "channel": null,
        "data": ["men", "women"]
      }
    ]
  }
}
```
```json
{
  "code": "children_ambient_picture",
  "family": "ambient_images",
  "values": {
    "media_preview": [
      {
        "locale": null,
        "channel": null,
        "data": "children_ambient_picture.jpg"
      }
    ],
    "product_categories":[
      {
        "locale": null,
        "channel": null,
        "data": ["children"]
      }
    ]
  }
}
```
We want these assets to be automatically linked to the products of the respective categories they refer to: the `men` and `women` categories for the `men_women_ambient_picture` and the `children` category for the `children_ambient_picture`.

To do this, you'll use the following product link rule.
```json
{
  "product_link_rules": [
    {
      "product_selections": [
        {
          "field": "categories",
          "operator": "IN",
          "value": "{{product_categories}}"
        }
      ],
      "assign_assets_to": [
        {
          "mode": "add",
          "attribute": "ambient_image",
          "locale": null,
          "channel": null
        }
      ]
    }
  ]
}
```
As you can see above, you can use the extrapolation mechanism to refer to an array.  
For the `men_women_model_picture`, the `value` field will be extrapolated to `["men","women"]`. For the `children_ambient_picture`, the `value` field will be extrapolated to `["children"]`.

## Focus on the transformations
::: availability versions=4.0,5.0,SaaS editions=EE

For each [asset family](#the-asset-family), you can define transformations. They allow you to ask the PIM to automatically generate one or several new variations of a given media file for each asset belonging to your family.

Let's take an example to make it much clearer.

Say we have a `packshots` asset family. In its structure, it has 2 media file attributes:
- the `main_image` attribute in which the main image of your packshot is stored,
- the `thumbnail` attribute in which you want a smaller version of the main image, stored in `main_image`.

![Asset family transformation example](/img/concepts/asset-family-for-transformation.svg)

The PIM can automatically generate the thumbnail version of your main image for you, and this is all thanks to the definition of a transformation!

![Asset transformation example](/img/concepts/asset-transformation.svg)

For each transformation, we define:
- a media file attribute that will be used as the source for your transformation and wisely called *source* attribute: in our example, the `main_image` attribute,
- a media file attribute in which the generated file will be stored, called the *target* attribute: in our example, the `thumbnail` attribute,
- a set of ordered operations to perform on the source picture to generate the target one: in our example, a resizing.

::: info
You can have up to **10** different transformations for one given asset family and each transformation can perform several operations.
:::

The JSON format of the transformations is an array of transformations. A transformation is composed of several parts:
- a [label](#label), to name your transformation,
- a [filename part](#target-filename),
- the [`source` part](#source-file),
- the [`target` part](#target-file),
- the [`operations` part](#transformation-operations).

```json
{
  "transformations": [
    {
      "label": "Your transformation label",
      "filename_prefix": "a_prefix",
      "filename_suffix": "a_suffix",
      "source": {...},
      "target": {...},
      "operations": [...]
    }
  ]
}
```

#### Examples
**With one transformation**
```json
{
  "transformations": [
    {
      "label": "Thumbnail generation",
      "filename_suffix": "_thumbnail",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

**With two transformations**
```json

{
  "transformations": [
    {
      "label": "Resize ecommerce",
      "filename_prefix": "ecom_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "variations",
        "channel": "ecommerce",
        "locale": null
      },
      "operations": [{
        "type": "scale",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Resize print",
      "filename_prefix": "print_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "variations",
        "channel": "print",
        "locale": null
      },
      "operations": [{
        "type": "scale",
        "parameters": {
          "width": 2500,
          "height": 2500
        }
      }]
    }
  ]
}
```

Still not comfortable with transformations? Don't hesitate to go through the next sections where we detail each part of the transformation format.

### Label

It's just a string and it's basically the name you want to give to your transformation.  
It will be used in error messages whenever your transformation failed to generate your variations.

### Source file

The `source` property allows you to define in which attribute value the media file you want to use as the source file for your transformation is stored.

It follows this format:
```json
{
  "source": {
    "attribute": MEDIA_FILE_ATTRIBUTE_NAME,
    "locale": SOURCE_LOCALE_CODE,
    "channel": SOURCE_CHANNEL_CODE
  },...
}
```

In this formula:
 - `MEDIA_FILE_ATTRIBUTE_NAME` is the code of the asset attribute that holds the source file. This asset attribute should be a `media_file` attribute, defined in the asset family.
 - `SOURCE_LOCALE_CODE` is an existing locale code when `MEDIA_FILE_ATTRIBUTE_NAME` is the code of a localizable asset attribute.
 - `SOURCE_CHANNEL_CODE` is an existing channel code when `MEDIA_FILE_ATTRIBUTE_NAME` is the code of a scopable asset attribute.

::: warning
The `attribute`, `locale` and `channel` properties are mandatory.
If the `MEDIA_FILE_ATTRIBUTE_NAME` is the code of an attribute that is not localizable, the `locale` property should be set to `null`.  
If the `MEDIA_FILE_ATTRIBUTE_NAME` is the code of an attribute that is not scopable, the `channel` property should be set to `null`.
:::

::: info
There are additional business rules regarding this `target` property whenever you have multiple transformations for the same asset family. See the [Dealing with several transformations](#dealing-with-several-transformations) section for more details.
:::

### Target file

The `target` property allows you to define on which attribute value the PIM should generate the new variation.

It follows this format:
```json
{
  "target": {
    "attribute": MEDIA_FILE_ATTRIBUTE_NAME,
    "locale": TARGET_LOCALE_CODE,
    "channel": TARGET_CHANNEL_CODE
  },...
}
```

In this formula:
 - `MEDIA_FILE_ATTRIBUTE_NAME` is the code of the asset attribute that holds the target file. This asset attribute should be a `media_file` attribute, defined in the asset family.
 - `TARGET_LOCALE_CODE` is an existing locale code when `MEDIA_FILE_ATTRIBUTE_NAME` is the code of a localizable asset attribute.
 - `TARGET_CHANNEL_CODE` is an existing channel code when `MEDIA_FILE_ATTRIBUTE_NAME` is the code of a scopable asset attribute.

::: warning
The `attribute`, `locale` and `channel` properties are mandatory.
If the `MEDIA_FILE_ATTRIBUTE_NAME` is the code of an attribute that is not localizable, the `locale` property should be set to `null`.  
If the `MEDIA_FILE_ATTRIBUTE_NAME` is the code of an attribute that is not scopable, the `channel` property should be set to `null`.
:::

::: info
There are additionnal business rules regarding this `target` property whenever you have multiple transformations for the same asset family. See the [Dealing with several transformations](#dealing-with-several-transformations) section for more details.
:::

### Target filename

You can give a name to the generated target file. By default, the naming is based on the filename of the source file. You can define a suffix and/or a prefix that will be concatenated to this filename and be used as the filename of the target file.

To do this, use:
- the `filename_prefix` property, the string that will be prepended to the source filename.
- the `filename_suffix` property, the string that will be appended to the source filename.

You can use both properties if you want to suffix and prefix the source filename.

::: warning
You need to define at least either a suffix or a prefix, as the target filename can't be the same as the source filename.
:::

::: info
Suffix and prefix can only contain alphanumeric characters, the following characters: `_`, `-`, `.` and space.
:::

Let's take an example to make this much clearer. Let's say you have a file named `amor_red_model_picture.jpg`. You want to generate a thumbnail version of this file and you want the new generated file to be named `amor_red_model_picture_160x160.jpg`. Then, use the following properties in your transformation for the generated file to be named properly.
```json
{
  ...,
  "filename_prefix": null,
  "filename_suffix": "_160x160",
  ...
}
```

### Transformation operations

The `operations` property allows you to define which image transformations should be applied to your source file to generate the target file.

In one single transformation, you can define one or several operations.

If you have several operations for the same asset family, note that they will be performed in the same order as defined in the `operations` array. So be sure to choose the right order for what you wish to accomplish.

::: warning
Defining the same operation type twice in the same transformation is forbidden as it would totally make no sense.
:::

The `operations` property follows this format:
```json
{
  "operations": [{
      "type": OPERATION_NAME,
      "parameters": OPERATION_PARAMETERS,
    },...
  ]
}
```

In this formula:
 - `OPERATION_NAME` is the name of the operation that should be perfomed on the source file. The complete list of available operations is detailed below.
 - `OPERATION_PARAMETERS` is the set of parameters for the operation. It depends on the `OPERATION_NAME` chosen before.

::: warning
The `type` and `parameters` properties are mandatory.
:::

::: info
To do operations on your media, we always convert them to .png first, to avoid compression related losses. As a result, this conversion can increase the size of your images. To reduce your file size, we provide an `optimize_jpeg` operation to convert them back to compressed jpeg files :wink:.
:::

Let's now detail the available operation names as well as their corresponding parameters.

#### Thumbnail
::: availability versions=4.0,5.0,SaaS editions=EE

With the `thumbnail` type, you can automatically generate a thumbnail. It keeps the image proportions and crops it if needed.

There are 2 available parameters for this operation.

| Operator name & format | Description |
| ----------------- | -------------- |
| `width` <br> _integer > 0_ | The width of the generated thumbnail in pixels |
| `height` <br> _integer > 0_ | The height of the generated thumbnail in pixels |

::: info
Both parameters are required.
:::

#### Scale
::: availability versions=4.0,5.0,SaaS editions=EE

With the `scale` type, you can resize images while keeping the width/height proportions.

There are 3 available parameters for this operation.

| Operator name & format | Description |
| ----------------- | -------------- |
| `width` <br>_integer > 0_ | The new width of the image in pixels |
| `height` <br>_integer > 0_ | The new height of the image in pixels |
| `ratio` <br>_integer > 0_ | The ratio (in %) for the image resizing. If defined, this parameter will take priority over the 2 other parameters.|

::: info
There should be at least one of the 3 parameters defined.
:::

#### Change of colorspace
::: availability versions=4.0,5.0,SaaS editions=EE

With the `colorspace` type, you can change the image's colorspace. For example, you can turn it to black and white.

There is one available parameter for this operation: `colorspace`. It allows you to choose which colorspace you want your image to be turned into. It should be one of the following values:
- `rgb`,
- `cmyk`,
- `grey`.

::: info
The `colorspace` parameter is required.
:::

#### Resolution
::: availability versions=4.0,5.0,SaaS editions=EE

With the `resolution` type, you can change the image resolution.

There are 3 available parameters for this operation.

| Operator name & format | Description |
| ----------------- | -------------- |
| `resolution-x` <br>_integer > 0_ | The new horizontal resolution |
| `resolution-y` <br>_integer > 0_ | The new vertical resolution |
| `resolution-unit` <br>_string, either "ppi" or "ppc"_ | The unit in which the `resolution-x` and `resolution-y` properties were given |

::: info
All parameters are required.
:::

#### Resize
::: availability versions=4.0,5.0,SaaS editions=EE

With the `resize` type, you can resize images without keeping the width/height proportions.

There are 2 available parameters for this operation.

| Operator name & format | Description |
| ----------------- | -------------- |
| `width` <br>_integer > 0_ | The new width of the image in pixels |
| `height` <br>_integer > 0_ | The new height of the image in pixels |

::: info
Both parameters are required.
:::

#### Optimize jpeg
::: availability versions=SaaS editions=EE

::: info
Even if you upload a jpeg image in your asset manager, we automatically convert it into a png for each operation, in order to avoid quality loss. If you want to convert your images back to jpeg, you can put this operation last.
:::

With the `optimize_jpeg` type, you can convert your images to jpeg and change their .jpeg quality.

There is 1 available parameter for this operation.

| Operator name & format | Description |
| ----------------- | -------------- |
| `quality` <br>_0 < integer < 100_ | The jpeg quality of the image |

::: info
This parameter is required.
:::


### Dealing with several transformations

As stated before, you can define up to 10 transformations per asset family. So if you need several transformations for one given family, you will need to observe some business rules.

#### Unicity of the target value
In the same asset family, you cannot have two transformations with the same target, i.e. exactly the same `attribute`, `channel` and `locale` in your `target` property.

Otherwise, your first generated target file may be erased by the next transformation.

**Example**  
This example will generate an error.
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "t1_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "t2_",
      "source": {
        "attribute": "main_image_2",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

#### Non-unicity of the source value

In the same asset family, you can have two transformations with the same source, i.e. exactly the same `attribute`, `channel` and `locale` in your `source` property.

Indeed, it allows you to generate different versions of your source file.

**Example**  
This example is completely valid - even if in this case we create the exact same image twice in two different attributes, A bit useless if you ask, but still, it works. :wink:
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "t1_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "t2_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail_2",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

#### Unicity of the target filename
In the same asset family, you cannot have two transformations with the same target filename, i.e. exactly the same `source`, `filename_prefix` and `filename_suffix`.

Otherwise, the PIM would create two files called exactly the same way, which can cause you trouble if you want to retrieve them.

**Example**  
This example will generate an error.
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "thumbnail_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "thumbnail_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail_2",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

#### A source value cannot be a target value

In the same asset family, you cannot have two transformations with the first one defining a source value as the target value of the second one. And vice versa.

**Examples**
This example will generate an error.
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "t1_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "t2_",
      "source": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail_2",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

This other example will also generate an error.
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "t1_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "t2_",
      "source": {
        "attribute": "main_image_2",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

But *NOT* this one. Because the source attribute value of the first transformation is different from the target attribute value of the second transformation, as they are referencing different channels.
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "t1_",
      "source": {
        "attribute": "main_image",
        "channel": "ecommerce",
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "t2_",
      "source": {
        "attribute": "main_image_2",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "main_image",
        "channel": "print",
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

## Asset attribute
::: availability versions=3.2,4.0,5.0,SaaS editions=EE
:::

In an asset family, an asset attribute is a characteristic of an asset for this given family. It helps to describe and qualify an asset.
An asset attribute can have a value per channel and/or per locale.

::: warning
Note that the "Asset attribute" resource is not the same as the "Attribute" resource, even though they have a lot in common. The first one is used to describe assets, the second one is used to describe products.
:::

There are several types of asset attributes, that will allow you to handle different types of data:
- the [`text` attribute](#the-text-attribute),
- the [`single and multiple options` attributes](#the-single-and-multiple-options-attributes),
- the [`number` attribute](#the-number-attribute),
- the [`media file` attribute](#the-media_file-attribute),
- the [`media link` attribute](#the-media-link-attribute).

::: warning
You can have a maximum of 100 attributes to describe the structure for one given asset family.    
As a consequence, when you ask for the list of attributes for one given asset family, you'll see the response is not paginated. It won't cause any performance issue, since you can't have more than 100 attributes per asset family.
:::

### The `text` attribute
The text attribute is useful to hold textual information such as a description, a warning mention or whatever other information you can think of and which is basically made of a bunch of characters.

Here is an example of a `text` attribute.
![An example of a text asset attribute](/img/concepts/text-asset-attribute.svg)

And here is the JSON format of the `text` attribute type.
```json
{
  "code": "warning_mention",
  "labels": {
    "en_US": "Warning mention",
    "fr_FR": "Avertissement"
  },
  "type": "text",
  "value_per_locale": true,
  "value_per_channel": false,
  "is_required_for_completeness": false,
  "is_read_only": false,
  "max_characters": 50,
  "is_textarea": false,
  "is_rich_text_editor": null,
  "validation_rule": null,
  "validation_regexp": null
}
```

### The `single and multiple options` attributes
The single and multiple options attributes are useful to hold data that can be selected among a list of choices. The single option attribute allows the selection of one single value, whereas the multiple options can hold one or several values.

Here are some examples of a `single option` and `multiple options` attributes.
![Examples of a single and a multiple options asset attributes](/img/concepts/single-and-multiple-options-asset-attributes.svg)

And here is the JSON format of the `single option` attribute type.
```json
{
  "code": "model_is_wearing_size",
  "labels": {
    "en_US": "Model is wearing size",
    "fr_FR": "Le mannequin porte la taille"
  },
  "type": "single_option",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": true,
  "is_read_only": false
}
```
And here is the JSON format of the `multiple options` attribute type.
```json
{
  "code": "main_colors",
  "labels": {
    "en_US": "Main colors",
    "fr_FR": "Couleurs principales"
  },
  "type": "multiple_options",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": true,
  "is_read_only": false
}
```

### The `number` attribute
The number attribute is useful to hold numeral information, such as a number of pages or a video duration.

Here is an example of a `number` attribute.
![An example of a number asset attribute](/img/concepts/number-asset-attribute.svg)

And here is the JSON format of the `number` attribute type.
```json
{
  "code": "number_of_pages",
  "labels": {
    "en_US": "Number of pages",
    "fr_FR": "Nombre de pages"
  },
  "type": "number",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": true,
  "is_read_only": false
}
```

### The `media_file` attribute
The media file attribute is useful to hold the binaries of a file, a file being a picture, a pdf, a video...

Here is an example of a `media_file` attribute.
![An example of a media file asset attribute](/img/concepts/media-file-asset-attribute.svg)

And here is the JSON format of the `media_file` attribute type, for an image.
```json
{
  "code": "picture",
  "labels": {
    "en_US": "Picture",
    "fr_FR": "Photo"
  },
  "type": "media_file",
  "media_type": "image",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": true,
  "is_read_only": false,
  "allowed_extensions": ["jpg"],
  "max_file_size": "10"
}
```

::: info
The media type defines the type of the asset.  
It allows the preview display of the media.
The available media types that you can put in the `media_type` field are:
- _"image"_,
- _"pdf"_ (starting from the v4),
- _"other"_.
:::

### The `media link` attribute
The media link attribute type comes in pretty handy whenever you want your asset to refer to an external file, not hosted inside the PIM. For example, it can be very useful if you already have all your assets stored in a CDN or a DAM. The illustration below gives you an idea of how this attribute type can be used in such a case.
![Assets stored in a DAM](/img/concepts/asset-dam-link.svg)

Here are examples of several media link asset attributes.
![Examples of media link asset attributes](/img/concepts/media-link-asset-attributes.svg)

Below is the JSON format of the `media_link` attribute type.
```json
{
  "code": "media_link",
  "labels": {
    "en_US": "Media link",
    "fr_FR": "Lien vers le média"
  },
  "type": "media_link",
  "value_per_locale": false,
  "value_per_channel": false,
  "is_required_for_completeness": false,
  "is_read_only": false,
  "prefix": "dam.com/my_assets/",
  "suffix": null,
  "media_type": "image"
}
```

::: info
The media type defines the type of the asset whose URL is stored in the media link attribute.  
It allows the preview display of the media link.
The available media types that you can put in the `media_type` field are:
- _"image"_,
- _"pdf"_ (starting from the v4),
- _"youtube"_ (starting from the v4),
- _"vimeo"_ (starting from the v4),
- _"other"_.
:::

::: panel-link Want more details about the asset attribute resource? [Check its endpoints here!](/api-reference.html#Assetattribute)
:::

## Asset
::: availability versions=3.2,4.0,5.0,SaaS editions=EE
:::

An asset is a flexible object that makes it possible to enrich products with images, videos, documents…

An asset must be part of an asset family. That way, it will have its own attributes and lifecycle.

Below are some examples of assets.

![Asset examples](/img/concepts/asset.svg)

Below is the JSON format representing an example of an asset of the Asset Manager.

```json
{
  "code": "sku_54628_picture1",
  "family": "frontview",
  "values": {
    "media_preview": [
      {
        "locale": null,
        "channel": null,
        "data": "sku_54628_picture1.jpg"
      }
    ],
    "alt_tag":[
      {
        "locale": "en_US",
        "channel": null,
        "data": "Amor jacket, blue"
      },
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "Veste Amor, bleu"
      }
    ],
    "model_is_wearing_size": [
      {
        "locale": null,
        "channel": null,
        "data": "s"
      }
    ],
    "photographer": [
      {
        "locale": null,
        "channel": null,
        "data": "ben_levy"
      }
    ],
    "main_colors": [
      {
        "locale": null,
        "channel": null,
        "data": ["red","purple"]
      }
    ],
    "end_of_use_date": [
      {
        "locale": null,
        "channel": "ecommerce",
        "data": "02/03/2021"
      }
    ]
  }
}
```

Assets can be linked to products and product models, in order to enrich them.  
Here are the steps to follow to link assets to your products:
1. Create a [`pim_catalog_asset_collection` product attribute](/concepts/catalog-structure.html#attribute),
2. Put this attribute within the [families](/concepts/catalog-structure.html#familiy) of the products you want to link your assets to.
3. Assign your assets to these products either:
- manually, in the `Assets` tab of the product form in the PIM UI,
- by API using the [product](/api-reference.html#patch_products) POST and PATCH endpoints by adding the asset codes in the asset collection data,
- automatically thanks to the [product link rule](#focus-on-the-product-link-rule), detailed in the paragraph below.

::: info
Assets can also be assigned to **product models**. You can alternateively use the [product model](/api-reference.html#patch_product_models) POST and PATCH endpoints, by adding the asset codes in the asset collection data. Or, in the `Assets` tab of the product model form in the PIM UI.
:::

An asset can hold one or several files. This comes in pretty handy if, for instance, you want to have one user instruction pdf file per language, aka per locale.

#### Example
```json
{
  "code": "user_instructions_TV_2948430",
  "family": "user_guides",
  "values": {
    "pdf_preview": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "user_instructions_TV_2948430_en.pdf"
      },
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "user_instructions_TV_2948430_fr.pdf"
      }
    ]
}
```

::: info
When you are searching for the information of an asset on a product, if you do not know the asset family code, you can retrieve it by calling this endpoint `/api/rest/v1/attributes/AssetCollectionAttributeCode`, `AssetCollectionAttributeCode` being the code of the asset collection attribute containing the asset you are interested in.  
In the answer, you'll find in the `reference_data_name` property, the code of the family linked to your asset collection attribute, and therefore linked to your current asset.
:::


::: panel-link Want more details about the asset resource? [Check its endpoints here!](/api-reference.html#Asset)
:::

## Focus on the asset values

Asset values hold all the information of an asset. More specifically, they are the values of the attributes you will find in a given asset.

In the REST API, the asset values are in the `values` property of the asset.

### The global format

Asset values follow the same format as [product values](/concepts/products.html#focus-on-the-product-values) or [reference entity record values](/concepts/reference-entities.html#reference-entity-record-values):
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
 - `ATTRIBUTE_CODE` is the code of an asset attribute,
 - `LOCALE_CODE` is the code of a locale when the attribute is localizable. When it's not, it should be `null`. [Check some examples here.](#the-locale-and-channel-format)
 - `CHANNEL_CODE` is the code of a channel when the attribute is scopable. When it's not, it should be `null`. [Check some examples here.](#the-locale-and-channel-format)
 - `DATA_INFORMATION` is the value stored for this attribute, this locale (if the attribute is localizable) and this channel (if the attribute is scopable). Its type and format depend on the attribute type. [Check some examples here.](#the-data-format)

### The `data` format

The table below describes the format of the `data` property for each [asset attribute](#asset-attribute) type.

| Attribute type / Format| Example |
| ----------------- | -------------- |
| **Text** <br> _string_ | `"Scott, 2-seat sofa, grey"` |
| **Media file** <br> _string_ | `"5/1/d/8/51d81dc778ba1501a8f998f3ab5797569f3b9e25_img.png"` |
| **Single option** <br> _string_ | `"s"` |
| **Multiple options** <br> _Array[string]_ | `["leather", "cotton"]` |
| **Number** <br> _string_ | `"1"` |
| **Media link** <br> _string_ | `"sku_54628_picture1.jpg"` |

### The `locale` and `channel` format

The asset values can be localizable and/or scopable. Here are some examples to illustrate those different possibilities.

::: info
Asset values should be **localizable** whenever you want to enrich different values among your activated locales.  
Asset values should be **scopable** whenever you want to enrich different values among your channels.
:::

#### Asset values of a localizable attribute

The `alt_tag` attribute is localizable but not scopable, so it can hold several data values, up to one per locale.
```json
{
  "alt_tag": [
    {
      "locale": "en_US",
      "channel": null,
      "data": "Amor jacket, blue"
    },
    {
      "locale": "fr_FR",
      "channel": null,
      "data": "Veste Amor, bleu"
    }
  ]
}
```
:::info
Note that the `channel` property is set to `null` in this case.
:::

#### Asset values of a scopable attribute

The `end_of_use_date` attribute is scopable but not localizable, so it can hold several data values, up to one per channel.
```json
{
  "end_of_use_date": [
    {
      "locale": null,
      "channel": "ecommerce",
      "data": "02/03/2021"
    },
    {
      "locale": null,
      "channel": "print",
      "data": "03/02/2021"
    }
  ]
}
```
:::info
Note that the `locale` property is set to `null` in this case.
:::

#### Asset values of a localizable and scopable attribute

The `warning_message` attribute is both scopable and localizable, so it can hold several data values, up to one for each couple of channels and locales.
```json
{
  "warning_message": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "Retouched photo."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "Retouched photograph, not contractual."
    },
    {
      "locale": "fr_FR",
      "channel": "mobile",
      "data": "Photo retouchée."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Photographie retouchée, non contractuelle."
    }
  ]
}
```

#### Asset value of a non localizable, non scopable attribute

The `photographer` attribute is neither scopable nor localizable, so it can hold only one data value.
```json
{
  "photographer": [
    {
      "locale": null,
      "channel": null,
      "data": "Ben Levy"
    }
  ]
}
```
:::info
Note that the `locale` and `channel` properties are both set to `null` in this case.
:::

## Asset attribute option
::: availability versions=3.2,4.0,5.0,SaaS editions=EE
:::

Some types of asset attributes can offer a list of choices. These available choices are asset attribute options.

::: warning
Note that the "Assets attribute option" resource is not the same as the "Attribute option" resource, even though they have a lot in common. The first one is an option of an attribute used to describe assets, the second one is an option of an attribute used to describe products.
:::

Only `single option` or `multiple options` attributes can have options.

Below is an example of an attribute option, used inside an asset.
![Asset attribute option example](/img/concepts/asset-attribute-option.svg)

Below is the JSON format representing this asset attribute option and some other.

```json
{
  "code": "size_27",
  "labels": {
    "en_US": "Size 27",
    "fr_FR": "Taille 36"
  }
}
```
```json
{
  "code": "small",
  "labels": {
    "en_US": "S",
    "fr_FR": "S"
  }
}
```
```json
{
  "code": "medium",
  "labels": {
    "en_US": "M",
    "fr_FR": "M"
  }
}
```
```json
{
  "code": "large",
  "labels": {
    "en_US": "L",
    "fr_FR": "L"
  }
}
```

::: warning
You can have a maximum of 100 options per attribute.
As a consequence, when you ask for the list of attribute options for one given attribute, you'll see that the response is not paginated. It won't cause any performance issue, since you can't have more than 100 options per attribute.
:::

::: panel-link Want more details about the asset attributes option resource? [Check its endpoints here!](/api-reference.html#Assetattributeoption)
:::


## Asset media file
::: availability versions=3.2,4.0,5.0,SaaS editions=EE
:::

Asset media files correspond to the binaries of the images that you can link to your assets.

Below we illustrate an example of an asset media file linked to an asset.

![Asset media file](/img/concepts/asset-media-file.svg)

::: panel-link Want more details about the asset media file resource? [Check its endpoints here!](/api-reference.html#Assetmediafile)
:::
