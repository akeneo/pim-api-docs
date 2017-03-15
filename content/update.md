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

## Patch product values

The PATCH behavior described above is quite intuitive. However, applying a PATCH containing product values on a product is a bit different.

::: info
In the examples below only products values are represented, but usually products also include other information as specified in the standard format.
:::
::: panel-link Don't know what a product value is? [Check the product value section](/documentation/resources.html#product-values)
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

### Modify a product value

#### First example
You want to add the `name` of the product `boots-4846` for the `en_US` locale.

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
You want to add the `name` of the product `boots-4846` for the `fr_FR` locale but the `name` on the `en_US` locale is already set.

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

