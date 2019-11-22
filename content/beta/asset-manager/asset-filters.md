# Asset filters

When requesting a [list of assets via the API](/api-reference.html#get_assets), you can apply filters to get only the ones you want and also the kind of information you want in them.

## Filter assets by update date

You can filter the assets by their update date.

Below is the operator allowed to filter on this property, as well as the corresponding type of value expected in the `search` query parameter.

:::info
Note that dates should follow the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601).
:::

| Operator | Allowed value type | Filter description |
| ----------------- | -------------- | ------------------ |
| `>` | datetime <br> _Format: ISO 8601_ | Only returns assets that were <br> updated after the given day and hour |

#### Example
To get the assets that were updated since the 4th of July 2016 at 10am (UTC), you can use the following URL.

```
/api/rest/v1/asset-families/model_pictures/assets?search={"updated":[{"operator":">","value":"2018-07-04T10:00:00Z"}]}
```

## Filter asset values by locale
If you want to receive assets with only the asset values of specific locales, as well as the attribute values of the non localizable attributes, you can specify it thanks to the `locales` query parameter.

#### Example 1
Imagine that without this filter you get these asset values:
```json
{
  "warning_mention": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "Photo retouched."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "Photo retouched. This does not necessarily reflect the reality."
    },
    {
      "locale": "fr_FR",
      "channel": "mobile",
      "data": "Photo retouchée."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Photo retouchée, ne représentant pas forcément la réalité."
    }
  ],
  "model_is_wearing_size":[
    {
      "locale": null,
      "channel":null,
      "data":"small"
    }
  ]
}
```

To get only the asset values regarding the `en_US` locale (+ the attribute values of the non localizable attributes), you can use the following URL.
```
/api/rest/v1/asset-families/model_pictures/assets?locales=en_US
```

As a result you will receive the following answer:
```json
{
  "warning_mention": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "Photo retouched."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "Photo retouched. This does not necessarily reflect the reality."
    }
  ],
  "model_is_wearing_size":[
    {
      "locale": null,
      "channel":null,
      "data":"small"
    }
  ]
}
```

#### Example 2
You can also filter asset values on several locales at the same time.
```
/api/rest/v1/asset-families/model_pictures/assets?locales=en_US,fr_FR
```



## Filter asset values by channel
There is also a `channel` query parameter that will allow you to get only the asset values for a specific channel, as well as the asset values of the non scopable attributes.

:::warning
Note that you cannot use this filter on several channels.
:::

#### Example
Imagine that without this filter you get these asset values:
```json
{
  "warning_mention": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "Photo retouched."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "Photo retouched. This does not necessarily reflect the reality."
    },
    {
      "locale": "fr_FR",
      "channel": "mobile",
      "data": "Photo retouchée."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Photo retouchée, ne représentant pas forcément la réalité."
    }
  ],
  "model_is_wearing_size":[
    {
      "locale": null,
      "channel":null,
      "data":"small"
    }
  ]
}
```

To get only the attribute values regarding the `ecommerce` channel (+ the attribute values of the non scopable attributes), you can use the following URL.
```
/api/rest/v1/asset-families/model_pictures/assets?channel=ecommerce
```

As a result you will receive the following answer:
```json
{
  "warning_mention": [
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "Photo retouched. This does not necessarily reflect the reality."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Photo retouchée, ne représentant pas forcément la réalité."
    }
  ],
  "model_is_wearing_size":[
    {
      "locale": null,
      "channel":null,
      "data":"small"
    }
  ]
}
```
