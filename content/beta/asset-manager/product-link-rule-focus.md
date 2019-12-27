# Focus on the product link rule

The product link rule enables you to automatically link assets to products, based on assets name or attributes. This rule is defined at the [asset family](#the-asset-family) level.  

This rule is launched by the PIM after the asset creation.

::: warning
The product link rule is only available to link assets to products. Yet, linking assets to product models has to be done manually, for now.
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
          "operator": "EQUALS",
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

## Product selection

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



### Selection via product family
To associate your assets to a given set of products, you can use their family. In this case, use the keyword `family` as the `FIELD_NAME`.

The table below summarizes the operators available when you select products via family as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `IN` | _Array of existing family codes_ | Selects products that are respectively in the given families |
| `NOT IN` | _Array of existing family codes_ | Selects products that are respectively not in the given families |

#### Example
The following selection will select the products belonging to the `accesories` family.

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

### Selection via product categories
To associate your assets to a given set of products, you can use their categories. In this case, use the keyword `categories` as the `FIELD_NAME`.

The table below summarizes the operators available when you select via categories as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `IN` | _Array of existing category codes_ | Selects the products that are in the given categories |
| `NOT IN` | _Array of existing category codes_ | Selects the products that are not in the given categories |
| `IN OR UNCLASSIFIED` | _Array of existing category codes_ | Selects the products that are in the given categories or that are not classified in any categories |
| `IN CHILDREN` | _Array of existing category codes_ | Selects the products that are in the children of the given categories |
| `NOT IN CHILDREN` | _Array of existing category codes_ | Selects the products that are not in the children of the given categories |
| `UNCLASSIFIED` | _No value_ | Selects the products that are not classified into any category |

#### Example
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

### Select via the product status
To associate your assets to a given set of products, you can use their status. In this case, use the keyword `enabled` as the `FIELD_NAME`.

The table below summarizes the operator available when you select per status as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `=` | _string: "true" or "false"_ | Selects products that are enabled (`"true"`) or disabled (`"false"`) |

#### Example
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

### Select via identifier attribute

To associate your assets to a given set of products, you can use their identifier. In this case, use the code of the identifier attribute you have in your product family as the `FIELD_NAME`.

The table below summarizes the operators available when you select via identifier attribute as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `CONTAINS`  | _String_ | Selects products whose identifier contains a specific value |
| `DOES NOT CONTAIN` | _String_ | Selects products whose identifier does not contain a specific value  |
| `=`  | _String_ | Selects products that have exactly the given identifier |
| `!=` | _String_ | Selects products whose identifier is not the given one |

#### Example
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

### Select via text attribute

To associate your assets to a given set of products, you can use one of their text attributes. In this case, use the code of one of the text attributes from your product family as the `FIELD_NAME`.

The table below summarizes the operators available when you select via text attribute as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `STARTS WITH` | _String_ | Selects products with a text attribute that begins with the given value |
| `CONTAINS`  | _String_ | Selects products with a text attribute that contains the given value |
| `DOES NOT CONTAIN` | _String_ | Select products with a text attribute that does not contain the given value |
| `=`  | _String_ | Selects products with a text attribute value that is an exact match to the given value |
| `!=` | _String_ | Select products with a text attribute value that differs from the given value |


#### Example
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

### Select via simple/multi select attribute

To associate your assets to a given set of products, you can use one of their simple select attributes or multi select attributes. In this case, use the code of one of the simple/multi select attributes from your product family as the `FIELD_NAME`.

The table below summarizes the operators available when you select via simple/multi select attribute as well as the allowed value type you can have as a `VALUE`.

| Operator | Allowed value type | Selection description |
| ----------------- | -------------- | ------------------ |
| `IN` | _Array of existing simple/multi select option codes_ | Select products having a specific option in the respective simple select attribute |
| `NOT IN`  | _Array of existing simple/multi select option codes_ | Select products not having a specific option in the respective simple select attribute |

#### Example
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

## Product value assignment
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
- `add`: this mode allows you to add the new assets inside the asset collection attribute. They will appear after all the assets already existing in the attribute.
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
  "main_image": [
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

## Asset values extrapolation
"Asset values extrapolation"? What the hell is that? It's the clever naming I just came up with to explain one last thing about the product link rule.

You now know how to [select your products](#product-selection), and then [assign your assets in the right product attribute](#product-value-assignment). That's a good start.

But in some cases, you might need the rule to be a bit more powerful so it answers your expectations.  
As an example is better than 10,000 words, let's imagine this situation.

### An example
You put all your user guides in the same asset family, called `user_instructions`.  
On the one hand, you have an asset of this family, let's say the user guide for a particular TV, the `XMLD500` TV. This user guide asset has the following code: `XMLD500_fr_FR_user_guide`. It is the French version of the user guide for this TV.  
On the other hand, you have your TV which SKU is `XMLD500`. The product sheet of this TV has an asset attribute collection called `user_guides`. It is localizable.  
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
In our example, for our `XMLD500_fr_FR_user_guide` asset, we would store the string `XMLD500` into the `product ref` attribute and `fr_FR` in the `locale` attribute

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

::: info
Those two new attributes can be easily filled by using the API and a simple regular expression on the code of the asset, as both information, the product reference and the locale are already in the code.
:::

So, now that our asset is ready, whenever the rule is launched, the PIM will automatically extrapolate the rule, by replacing the curlies reference, `{{product_ref}}` and `{{locale}}`, by their real values in the asset it's currently trying to link to products.

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

In other words, it's going to select the product which SKU is `XMLD500` and assign the asset to the `user_instructions` product attribute on the `fr_FR` locale. Exactly what we wanted. ;)

### Extrapolated properties

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
The extrapolation mechanism can be used in combination with strings. For more details, see the [example](/beta/asset-manager/product-link-rule-focus.html#example-1) below.
:::

::: warning
When using the extrapolation mechanism, you should only refer to non scopable and non localizable asset attributes.
:::


### Some other examples

#### Example 1
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

You can use the extrapolation mechanism in combination with strings, as you can see in the example below, in the `value` field of the `product_selections` property.  
For the `amor_blue_model_picture`, the `value` field will be extrapolated to `sku_armor_blue`. For the `amor_red_model_picture`, the `value` field will be extrapolated to `sku_armor_red`.

#### Example 2
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
We want these assets to be automatically linked to the products of the respective categories they refers to: the `men` and `women` categories for the `men_women_ambient_picture` and the `children` category for the `children_ambient_picture`.

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

