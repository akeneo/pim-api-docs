# Filter assets with logical operators

::: availability versions=SaaS editions=EE

When filtering assets via the REST API, you can use logical operators (`AND`, `OR`) to build complex queries that combine multiple conditions.

## Overview

The logical operator format allows you to:
- Explicitly combine multiple filters using `AND` and `OR` operators
- Nest conditions to any depth for precise filtering
- Build complex queries that match your exact requirements
- Filter by asset properties (code, dates, completeness) and attribute values

## Query format rules

When using logical operators, follow these rules:

### Rule 1: Single root operator

Only use one logical operator (`and` OR `or`) at the root level of your query, without any other filter next to it.

**Valid:**
```json
{
    "and": [
        {"code": {"operator": "IN", "value": ["asset1", "asset2"]}},
        {"title": {"operator": "!=", "value": "Draft", "locale": "en_US"}}
    ]
}
```

**Invalid:**
```json
{
    "and": [...],
    "or": [...]
}
```

**Invalid:**
```json
{
    "and": [...],
    "code": [{"operator": "IN", "value": ["asset1"]}]
}
```

### Rule 2: Flexible nesting

Within a logical operator's array, you can freely nest additional operators and filters:

```json
{
    "and": [
        {
            "or": [
                {"code": {"operator": "=", "value": "asset1"}},
                {"code": {"operator": "=", "value": "asset2"}}
            ]
        },
        {"updated": {"operator": ">", "value": "2024-01-01"}}
    ]
}
```

### Rule 3: One object per filter

Inside a logical operator, every filter is a single object, including `code` and `updated`, which take an array of conditions at the root of the query:

**Valid:**
```json
{"and": [{"updated": {"operator": ">", "value": "2024-01-01T00:00:00Z"}}]}
```

**Invalid:**
```json
{"and": [{"updated": [{"operator": ">", "value": "2024-01-01T00:00:00Z"}]}]}
```

### Rule 4: At most 100 items per operator

Each `and` and `or` array holds between 1 and 100 items.

## Using the `AND` operator

The `and` operator returns assets that match **all** of the specified conditions.

### Example: Filter by code and date

Find assets with specific codes that were updated after January 1st, 2024:

```
/api/rest/v1/asset-families/model_pictures/assets?search={
    "and": [
        {"code": {"operator": "IN", "value": ["product_image_001", "product_image_002"]}},
        {"updated": {"operator": ">", "value": "2024-01-01T00:00:00Z"}}
    ]
}
```

### Example: Filter by completeness and attributes

Find assets that are complete on the `ecommerce` channel in US English, with a red or blue main color:

```
/api/rest/v1/asset-families/model_pictures/assets?search={
    "and": [
        {"complete": {"operator": "=", "value": true, "channel": "ecommerce", "locales": ["en_US"]}},
        {
            "main_color": {
                "operator": "IN",
                "value": ["red", "blue"],
                "locale": "en_US"
            }
        }
    ]
}
```

## Using the `OR` operator

The `or` operator returns assets that match **any** of the specified conditions.

### Example: Find specific assets by code

Find assets with code "hero_image" OR "thumbnail":

```
/api/rest/v1/asset-families/model_pictures/assets?search={
    "or": [
        {"code": {"operator": "=", "value": "hero_image"}},
        {"code": {"operator": "=", "value": "thumbnail"}}
    ]
}
```

::: info
For this simple case, using the `IN` operator is more efficient:
```json
{"code": [{"operator": "IN", "value": ["hero_image", "thumbnail"]}]}
```
:::

### Example: Multi-language search

Find assets with "summer" in the English title OR "été" in the French title:

```
/api/rest/v1/asset-families/model_pictures/assets?search={
    "or": [
        {
            "title": {
                "operator": "CONTAINS",
                "value": "summer",
                "locale": "en_US"
            }
        },
        {
            "title": {
                "operator": "CONTAINS",
                "value": "été",
                "locale": "fr_FR"
            }
        }
    ]
}
```

## Combining `AND` and `OR` operators

You can nest operators to create complex queries.

### Example: Search with alternatives

Find assets whose title starts with "img_", where the alt text contains "shoes" OR the category is "footwear" or "accessories":

```
/api/rest/v1/asset-families/model_pictures/assets?search={
    "and": [
        {"title": {"operator": "STARTS WITH", "value": "img_", "locale": "en_US"}},
        {
            "or": [
                {
                    "alt_text": {
                        "operator": "CONTAINS",
                        "value": "shoes",
                        "locale": "en_US"
                    }
                },
                {
                    "category": {
                        "operator": "IN",
                        "value": ["footwear", "accessories"],
                        "channel": "ecommerce"
                    }
                }
            ]
        }
    ]
}
```

### Example: Date range with multiple title patterns

Find assets whose title starts with "img_" OR "vid_" that were updated in 2024:

```
/api/rest/v1/asset-families/model_pictures/assets?search={
    "and": [
        {
            "or": [
                {"title": {"operator": "STARTS WITH", "value": "img_", "locale": "en_US"}},
                {"title": {"operator": "STARTS WITH", "value": "vid_", "locale": "en_US"}}
            ]
        },
        {"updated": {"operator": "BETWEEN", "value": ["2024-01-01T00:00:00Z", "2024-12-31T23:59:59Z"]}}
    ]
}
```

## Filterable properties

### Asset properties

You can filter on these asset properties:

| Property  | Operators | Allowed value type |
|-----------|-----------|--------------------|
| `code`    | `=` | asset code |
|           | `IN` | array of asset codes |
| `updated`, `created` | `=`, `!=`, `<`, `>` | date or datetime <br> _Format: ISO 8601_ |
|           | `BETWEEN`, `NOT BETWEEN` | array of two dates or datetimes <br> _Format: ISO 8601_ |
|           | `SINCE LAST N DAYS` | integer |
| `complete` | `=` | boolean, with the required `channel` and `locales` properties |

See [Filter assets](/documentation/filter.html#filter-assets) for the details of each property.

#### Example with completeness

```json
{
    "complete": {
        "operator": "=",
        "value": true,
        "channel": "ecommerce",
        "locales": ["en_US", "fr_FR"]
    }
}
```

### Attribute values

You can filter on asset attribute values using the attribute code as a key:

```json
{
    "attribute_code": {
        "operator": "CONTAINS",
        "value": "search_term",
        "locale": "en_US",
        "channel": "ecommerce"
    }
}
```

Give the `locale` for a localizable attribute, and the `channel` for a scopable attribute.

Each attribute type accepts its own operators: see [Filter assets by attribute values](/documentation/filter.html#by-attribute-values) for the list. Any other operator returns a `422` error that names the filter.

## Performance best practices

### 1. Order filters efficiently in AND operations

Place the most selective filters first to reduce the dataset early:

**Better:**
```json
{
    "and": [
        {"code": {"operator": "IN", "value": ["specific_asset"]}},
        {"complete": {"operator": "=", "value": true, "channel": "ecommerce", "locales": ["en_US"]}},
        {"updated": {"operator": ">", "value": "2024-01-01"}}
    ]
}
```

**Less efficient:**
```json
{
    "and": [
        {"updated": {"operator": ">", "value": "2024-01-01"}},
        {"complete": {"operator": "=", "value": true, "channel": "ecommerce", "locales": ["en_US"]}},
        {"code": {"operator": "IN", "value": ["specific_asset"]}}
    ]
}
```

### 2. Use specific operators

Prefer exact matches over text searches when possible:

**Better:** `{"operator": "=", "value": "exact_title"}`
**Less efficient:** `{"operator": "CONTAINS", "value": "exact_title"}`

### 3. Optimize OR operations

OR operations can be expensive on large datasets. Consider:
- Using the `IN` operator instead of multiple `=` conditions with OR
- Restructuring your query if possible
- Limiting the number of OR conditions

**Better:**
```json
{"code": [{"operator": "IN", "value": ["asset1", "asset2", "asset3"]}]}
```

**Less efficient:**
```json
{
    "or": [
        {"code": {"operator": "=", "value": "asset1"}},
        {"code": {"operator": "=", "value": "asset2"}},
        {"code": {"operator": "=", "value": "asset3"}}
    ]
}
```

### 4. Minimize context combinations

Only include the `locale` and `channel` properties of an attribute filter when the attribute is localizable or scopable, and only ask for the completeness on the locales you need:

```json
{
    "complete": {
        "operator": "=",
        "value": true,
        "channel": "ecommerce",
        "locales": ["en_US"]
    }
}
```
