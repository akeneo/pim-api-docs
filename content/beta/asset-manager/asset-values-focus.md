# Focus on the asset values

Asset values hold all the information of an asset. More specifically, they are the values of the attributes you will find in a given asset.

In the API, the asset values are in the `values` property of the asset.

## The global format

Asset values follow the same format as [product values](/documentation/resources.html#product-values) or [reference entity record values](/documentation/resources.html#reference-entity-record-values):
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
 - `LOCALE_CODE` is the code of a locale when the attribute is localizable. When it's not, it should be `null`,
 - `CHANNEL_CODE` is the code of a channel when the attribute is scopable. When it's not, it should be `null`,
 - `DATA_INFORMATION` is the value stored for this attribute, this locale (if the attribute is localizable) and this channel (if the attribute is scopable). Its type and format depend on the attribute type as you can see in the table in the section below.

## The `data` format

The following table summarizes the format of the `data` value depending on the attribute type.

| Attribute type / Format| Example |
| ----------------- | -------------- |
| **Text** <br> _string_ | `"Scott, 2-seat sofa, grey"` |
| **Media file** <br> _string_ | `"5/1/d/8/51d81dc778ba1501a8f998f3ab5797569f3b9e25_img.png"` |
| **Single option** <br> _string_ | `"s"` |
| **Multiple options** <br> _Array[string]_ | `["leather", "cotton"]` |
| **Number** <br> _string_ | `"1"` |
| **Media link** <br> _string_ | `"sku_54628_picture1.jpg"` |

## Localizable and scopable asset values
Asset values can be localizable and/or scopable. Here are some examples to illustrate those different possibilities.

::: info
Asset values should be **localizable** whenever you want to enrich different values among your activated locales.  
Asset values should be **scopable** whenever you want to enrich different values among your channels.
:::

### Asset values of a localizable attribute

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

### Asset values of a scopable attribute

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

### Asset values of a localizable and scopable attribute

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

### Asset value of a non localizable, non scopable attribute

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

## Update asset values

Below we present three use cases to update these asset values.

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
