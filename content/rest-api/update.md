# Update behavior

## Patch rules

::: info
In accordance with [`JSON definition`](http://www.json.org), what is called object in this documentation is a data structure indexed by alphanumeric keys, arrays don't have any key.
:::

A PATCH request updates only the specified keys according to the following rules:
 - Rule 1: If the value is an object, it will be merged with the old value.
 - Rule 2: If the value is not an object, it will replace the old value.
 - Rule 3: For non-scalar values (objects and arrays) data types must match.
 - Rule 4: Any data in non specified properties will be left untouched.

### Rule 1: Object update
If the value is an object, it will be merged with the old value.

#### Example
**Original resource**
```json
{
  "code": "boots",
  "parent": "master",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes"
  }
}
```

**PATCH request body**
```json
{
  "labels": {
    "de_DE": "Stiefel"
  }
}
```

**Resulting resource**
```json
{
  "code": "boots",
  "parent": "master",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes",
    "de_DE": "Stiefel"
  }
}
```

### Rule 2: Non object update
If the value is not an object, it will replace the old value.

#### First example
**Original resource**
```json
{
  "code": "boots",
  "parent": "master",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes"
  }
}
```

**PATCH request body**
```json
{
  "parent": "clothes"
}
```

**Resulting resource**
```json
{
  "code": "boots",
  "parent": "clothes",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes"
  }
}
```

#### Second example
**Original resource**
```json
{
  "identifier": "boots-4846",
  "categories": ["shoes", "boots"]
}
```

**PATCH request body**
```json
{
  "categories": ["boots"]
}
```

**Resulting resource**
```json
{
  "identifier": "boots-4846",
  "categories": ["boots"]
}
```

### Rule 3: Validation on data types
For non-scalar values (objects and arrays) data types must match.

#### Example
**Original resource**
```json
{
  "code": "boots",
  "parent": "master",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes"
  }
}
```

**PATCH request body**
```json
{
  "labels": null
}
```

**Resulting resource**
```json
{
  "code": "boots",
  "parent": "clothes",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes"
  }
}
```
Nothing has changed and a 422 error is returned.
```http
HTTP/1.1 422 Unprocessable entity

{
  "code": 422,
  "message": "Property `labels` expects an array as data, `NULL` given. Check the standard format documentation."
}
```

### Rule 4: Non specified properties
Any data in non specified properties will be left untouched.

#### Example
**Original resource**
```json
{
  "code": "boots",
  "parent": "master",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes"
  }
}
```

**PATCH request body**
```json
{
}
```

**Resulting resource**
```json
{
  "code": "boots",
  "parent": "master",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes"
  }
}
```

## Concrete use cases

### Move a category
You want to move the `boot` category from the category `master` to the category `shoes`. Here is how you can achieve it.

**Original resource**
```json
{
  "code": "boots",
  "parent": "master",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes"
  }
}
```

**PATCH request body**
```json
{
  "parent": "shoes"
}
```

**Resulting resource**
```json
{
  "code": "boots",
  "parent": "shoes",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes"
  }
}
```

### Modify a category label
For the locale `fr_FR`, you want to change the label of the category `boots` from `Bottes` to `Bottines`. Here is how you can achieve it.

**Original resource**
```json
{
  "code": "boots",
  "parent": "master",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottes"
  }
}
```

**PATCH request body**
```json
{
  "labels": {
    "fr_FR": "Bottines"
  }
}
```

**Resulting resource**
```json
{
  "code": "boots",
  "parent": "master",
  "labels": {
    "en_US": "Boots",
    "fr_FR": "Bottines"
  }
}
```

### Place a product in a new category
You want to place the product `boots-4846` in the new category `winter_collection`. Here is how you can achieve it.

**Original resource**
```json
{
  "identifier": "boots-4846",
  "categories": ["shoes", "boots"]
}
```

**PATCH request body**
```json
{
  "categories": ["shoes", "boots", "winter_collection"]
}
```

**Resulting resource**
```json
{
  "identifier": "boots-4846",
  "categories": ["shoes", "boots", "winter_collection"]
}
```

### Remove a product from a category
You want to remove the product `boots-4846` from the category `boots`. Here is how you can achieve it.

**Original resource**
```json
{
  "identifier": "boots-4846",
  "categories": ["shoes", "boots"]
}
```

**PATCH request body**
```json
{
  "categories": ["shoes"]
}
```

**Resulting resource**
```json
{
  "identifier": "boots-4846",
  "categories": ["shoes"]
}
```

## Update product values

The PATCH behavior described above is quite intuitive. However, applying a PATCH containing [product values](/concepts/products.html#focus-on-the-products-values) on a product is a bit different.

::: info
In the examples below only products values are represented, but usually products also include other information as specified in the standard format.
:::
::: panel-link Don't know what a product value is? [Check the product value section](/concepts/products.html#focus-on-the-product-values)
:::

### Add a product value
You want to add the `description` of the product `boots-4846` for the `en_US` locale.

**Original resource**
```json
{
  "identifier": "boots-4846",
  "values": {
    "name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "Mug"
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "This mug is a must-have!"
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "identifier": "boots-4846",
  "values": {
    "name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "Mug"
      }
    ],
    "short_description": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "This mug is a must-have!"
      }
    ]
  }
}
```

::: info 
Wondering how to format the `data` property in these product values? In fact, it depends on the attribute type. [More details right here!](/concepts/products.html#focus-on-the-products-values)
:::

### Modify a product value

#### First example
You want to modify the `name` of the product `boots-4846` for the `en_US` locale.

**Original resource**
```json
{
  "identifier": "boots-4846",
  "values": {
    "name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "Mug"
      }
    ],
    "short_description": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "This mug is a must-have!"
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "Incredible mug"
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "identifier": "boots-4846",
  "values": {
    "name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "Incredible mug"
      }
    ],
    "short_description": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "This mug is a must-have!"
      }
    ]
  }
}
```

#### Second example
You want to modify the `name` of the product `boots-4846` for the `fr_FR` locale but the `name` on the `en_US` locale is already set.

**Original resource**
```json
{
  "identifier": "boots-4846",
  "values": {
    "name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "Incredible mug"
      },
      {
        "locale": "fr_FR",
        "scope": null,
        "data": "Tasse"
      }
    ],
    "short_description": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "This mug is a must-have!"
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "name": [
      {
        "locale": "fr_FR",
        "scope": null,
        "data": "Tasse extraordinaire"
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "identifier": "boots-4846",
  "values": {
    "name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "Incredible mug"
      },
      {
        "locale": "fr_FR",
        "scope": null,
        "data": "Tasse extraordinaire"
      }
    ],
    "short_description": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "This mug is a must-have!"
      }
    ]
  }
}
```

::: info 
Wondering how to format the `data` property in these product values? In fact, it depends on the attribute type. [More details right here!](/concepts/products.html#focus-on-the-products-values)
:::

### Erase a product value
You want to erase the `name` of the product `boots-4846` for the `en_US` locale.

**Original resource**
```json
{
  "identifier": "boots-4846",
  "values": {
    "name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "Incredible mug"
      }
    ],
    "short_description": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "This mug is a must-have!"
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": null
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "identifier": "boots-4846",
  "values": {
    "name": [
      {
        "locale": "en_US",
        "scope": null,
        "data": null
      }
    ],
    "short_description": [
      {
        "locale": "en_US",
        "scope": null,
        "data": "This mug is a must-have!"
      }
    ]
  }
}
```


::: info 
Wondering how to format the `data` property in these product values? In fact, it depends on the attribute type. [More details right here!](/concepts/products.html#focus-on-the-products-values)
:::

## Update reference entity record values

Applying a PATCH on a reference entity record containing values is also a bit different. Below we present three use cases to update these reference entity record values.

::: panel-link Don't know what a reference entity record value is? [Check the reference entity record value section](/concepts/reference-entities.html#focus-on-the-reference-entity-record-values)
:::

### Add a reference entity record value
You want to add the `short_description` of the reference entity record `kartell` for the `en_US` locale.

**Original resource**
```json
{
  "code": "kartell",
  "values": {
    "description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Kartell was founded in 1949 in Italy. Today, it's a well-known brand that sells high-end furniture."
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "The famous Italian brand"
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "code": "kartell",
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "The famous Italian brand"
      }
    ],
    "description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Kartell was founded in 1949 in Italy. Today, it's a well-known brand that sells high-end furniture."
      }
    ]
  }
}
```

::: info 
Wondering how to format the `data` property in these reference entity record values? In fact, it depends on the attribute type. [More details right here!](/concepts/reference-entities.html#focus-on-the-reference-entity-record-values)
:::

### Modify a reference entity record value

#### First example
You want to modify the `short_description` of the `kartell` reference entity record for the `en_US` locale.

**Original resource**
```json
{
  "code": "kartell",
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "The famous Italian brand"
      }
    ],
    "description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Kartell was founded in 1949 in Italy. Today, it's a well-known brand that sells high-end furniture."
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "A well-known manufacturer of high-end furniture"
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "code": "kartell",
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "A well-known manufacturer of high-end furniture"
      }
    ],
    "description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Kartell was founded in 1949 in Italy. Today, it's a well-known brand that sells high-end furniture."
      }
    ]
  }
}
```

#### Second example
You want to modify the `short_description` of the `kartell` reference entity record for the `fr_FR` locale but the `short_description` on the `en_US` locale is already set.

**Original resource**
```json
{
  "identifier": "kartell",
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "A well-known manufacturer of high-end furniture"
      },
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "Kartell, éditeur de meubles"
      }
    ],
    "description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Kartell was founded in 1949 in Italy. Today, it's a well-known brand that sells high-end furniture."
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "short_description": [
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "L'éditeur italien de meubles de haute qualité"
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "code": "kartell",
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "A well-known manufacturer of high-end furniture"
      },
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "L'éditeur italien de meubles de haute qualité"
      }
    ],
    "description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Kartell was founded in 1949 in Italy. Today, it's a well-known brand that sells high-end furniture."
      }
    ]
  }
}
```

::: info 
Wondering how to format the `data` property in these reference entity record values? In fact, it depends on the attribute type. [More details right here!](/concepts/reference-entities.html#focus-on-the-reference-entity-record-values)
:::

### Erase a reference entity record value
You want to erase the `short_description` of the `kartell` reference entity record for the `en_US` locale.

**Original resource**
```json
{
  "code": "kartell",
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "A well-known manufacturer of high-end furniture"
      }
    ],
    "description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Kartell was founded in 1949 in Italy. Today, it's a well-known brand that sells high-end furniture."
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": null
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "code": "kartell",
  "values": {
    "short_description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": null
      }
    ],
    "description": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Kartell was founded in 1949 in Italy. Today, it's a well-known brand that sells high-end furniture."
      }
    ]
  }
}
```

::: info 
Wondering how to format the `data` property in these reference entity record values? In fact, it depends on the attribute type. [More details right here!](/documentation/resources.html#reference-entity-record-values)
:::


## Update asset values

Applying a PATCH on an asset containing values is also a bit different. Below we present three use cases to update these asset values.

::: panel-link Don't know what an asset value is? [Check the asset value section](/concepts/asset-manager.html#focus-on-the-asset-values)
:::

### Add an asset value
You want to add the `warning_message` of the `allie_jean_picture` asset for the `en_US` locale and `mobile` channel.

**Original resource**
```json
{
  "code": "allie_jean_picture",
  "values": {
    "alt_tag": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Allie jean, blue"
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "warning_message": [
      {
        "locale": "en_US",
        "channel": "mobile",
        "data": "Retouched photo."
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "code": "allie_jean_picture",
  "values": {
    "alt_tag": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Allie jean, blue"
      }
    ],
    "warning_message": [
      {
        "locale": "en_US",
        "channel": "mobile",
        "data": "Retouched photo."
      }
    ]
  }
}
```

### Modify an asset value

#### First example
You want to modify the `warning_message` of the `allie_jean_picture` asset for the `en_US` locale and the `mobile` channel.

**Original resource**
```json
{
  "code": "allie_jean_picture",
  "values": {
    "alt_tag": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Allie jean, blue"
      }
    ],
    "warning_message": [
      {
        "locale": "en_US",
        "channel": "mobile",
        "data": "Retouched photo."
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "warning_message": [
      {
        "locale": "en_US",
        "channel": "mobile",
        "data": "Not retouched photo."
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "code": "allie_jean_picture",
  "values": {
    "alt_tag": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Allie jean, blue"
      }
    ],
    "warning_message": [
      {
        "locale": "en_US",
        "channel": "mobile",
        "data": "Not retouched photo."
      }
    ]
  }
}
```

#### Second example
You want to modify the `alt_tag` of the `allie_jean_picture` asset for the `fr_FR` locale but the `alt_tag` on the `en_US` locale is already set.

**Original resource**
```json
{
  "code": "allie_jean_picture",
  "values": {
    "alt_tag": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Allie jean, blue"
      },
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "Veste Amor, bleu"
      }
    ],
    "warning_message": [
      {
        "locale": "en_US",
        "channel": "mobile",
        "data": "Not retouched photo."
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "alt_tag": [
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "Jean Allie, bleu"
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "code": "allie_jean_picture",
  "values": {
    "alt_tag": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Amor jacket, blue"
      },
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "Jean Allie, bleu"
      }
    ],
    "warning_message": [
      {
        "locale": "en_US",
        "channel": "mobile",
        "data": "Not retouched photo."
      }
    ]
  }
}
```

### Erase an asset value
You want to erase the `alt_tag` of the `allie_jean_picture` asset for the `en_US` locale.

**Original resource**
```json
{
  "code": "allie_jean_picture",
  "values": {
    "alt_tag": [
      {
        "locale": "en_US",
        "channel": null,
        "data": "Amor jacket, blue"
      },
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "Jean Allie, bleu"
      }
    ],
    "warning_message": [
      {
        "locale": "en_US",
        "channel": "mobile",
        "data": "Not retouched photo."
      }
    ]
  }
}
```

**PATCH request body**
```json
{
  "values": {
    "alt_tag": [
      {
        "locale": "en_US",
        "channel": null,
        "data": null
      }
    ]
  }
}
```

**Resulting resource**
```json
{
  "code": "allie_jean_picture",
  "values": {
    "alt_tag": [
      {
        "locale": "en_US",
        "channel": null,
        "data": null
      },
      {
        "locale": "fr_FR",
        "channel": null,
        "data": "Jean Allie, bleu"
      }
    ],
    "warning_message": [
      {
        "locale": "en_US",
        "channel": "mobile",
        "data": "Not retouched photo."
      }
    ]
  }
}
```

::: info 
Wondering how to format the `data` property in these asset values? In fact, it depends on the attribute type. [More details right here!](/concepts/asset-manager.html#focus-on-the-asset-values)
:::
