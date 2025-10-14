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

Only use one logical operator (`and` OR `or`) at the root level of your query.

**Valid:**
```json
{
    "and": [
        {"code": {"operator": "=", "value": "asset1"}},
        {"code": {"operator": "!=", "value": "asset2"}}
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

## Using the `AND` operator

The `and` operator returns assets that match **all** of the specified conditions.

### Example: Filter by code and date

Find assets with specific codes that were updated after January 1st, 2024:

```
/api/rest/v1/asset-manager/assets?search={
    "and": [
        {"code": {"operator": "IN", "value": ["product_image_001", "product_image_002"]}},
        {"updated": {"operator": ">", "value": "2024-01-01T00:00:00Z"}}
    ]
}
```

### Example: Filter by code and attributes

Find specific assets that are complete with a specific color in the US market:

```
/api/rest/v1/asset-manager/assets?search={
    "and": [
        {"code": {"operator": "STARTS_WITH", "value": "product_"}},
        {"complete": {"operator": "=", "value": true, "context": {"channel": "ecommerce", "locales": ["en_US"]}}},
        {
            "values": {
                "main_color": {
                    "operator": "IN",
                    "value": ["red", "blue"],
                    "locale": "en_US"
                }
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
/api/rest/v1/asset-manager/assets?search={
    "or": [
        {"code": {"operator": "=", "value": "hero_image"}},
        {"code": {"operator": "=", "value": "thumbnail"}}
    ]
}
```

::: info
For this simple case, using the `IN` operator is more efficient:
```json
{"code": {"operator": "IN", "value": ["hero_image", "thumbnail"]}}
```
:::

### Example: Multi-language search

Find assets with "summer" in the English title OR "été" in the French title:

```
/api/rest/v1/asset-manager/assets?search={
    "or": [
        {
            "values": {
                "title": {
                    "operator": "CONTAINS",
                    "value": "summer",
                    "locale": "en_US"
                }
            }
        },
        {
            "values": {
                "title": {
                    "operator": "CONTAINS",
                    "value": "été",
                    "locale": "fr_FR"
                }
            }
        }
    ]
}
```

## Combining `AND` and `OR` operators

You can nest operators to create complex queries.

### Example: Search with alternatives

Find assets where the alt text contains "shoes" OR the category is "footwear" or "accessories":

```
/api/rest/v1/asset-manager/assets?search={
    "and": [
        {"code": {"operator": "STARTS_WITH", "value": "img_"}},
        {
            "or": [
                {
                    "values": {
                        "alt_text": {
                            "operator": "CONTAINS",
                            "value": "shoes",
                            "locale": "en_US"
                        }
                    }
                },
                {
                    "values": {
                        "category": {
                            "operator": "IN",
                            "value": ["footwear", "accessories"],
                            "channel": "ecommerce"
                        }
                    }
                }
            ]
        }
    ]
}
```

### Example: Date range with multiple code patterns

Find assets with codes starting with "img_" OR "vid_" that were updated in 2024:

```
/api/rest/v1/asset-manager/assets?search={
    "and": [
        {
            "or": [
                {"code": {"operator": "STARTS_WITH", "value": "img_"}},
                {"code": {"operator": "STARTS_WITH", "value": "vid_"}}
            ]
        },
        {"updated": {"operator": ">=", "value": "2024-01-01T00:00:00Z"}},
        {"updated": {"operator": "<=", "value": "2024-12-31T23:59:59Z"}}
    ]
}
```

## Filterable properties

### Asset properties

You can filter on these asset properties:

- `code` - Asset code (string)
- `updated` - Last update date (ISO 8601 date string)
- `complete` - Completeness status (boolean with optional context)

#### Example with completeness context

```json
{
    "complete": {
        "operator": "=",
        "value": true,
        "context": {
            "channel": "ecommerce",
            "locales": ["en_US", "fr_FR"]
        }
    }
}
```

### Attribute values

You can filter on asset attribute values using the `values` property:

```json
{
    "values": {
        "attribute_code": {
            "operator": "CONTAINS",
            "value": "search_term",
            "locale": "en_US",
            "channel": "ecommerce"
        }
    }
}
```

The `locale` and `channel` parameters are optional and depend on your attribute configuration (localizable/scopable).

## Performance best practices

### 1. Order filters efficiently in AND operations

Place the most selective filters first to reduce the dataset early:

**Better:**
```json
{
    "and": [
        {"code": {"operator": "IN", "value": ["specific_asset"]}},
        {"complete": {"operator": "=", "value": true}},
        {"updated": {"operator": ">", "value": "2024-01-01"}}
    ]
}
```

**Less efficient:**
```json
{
    "and": [
        {"updated": {"operator": ">", "value": "2024-01-01"}},
        {"complete": {"operator": "=", "value": true}},
        {"code": {"operator": "IN", "value": ["specific_asset"]}}
    ]
}
```

### 2. Use specific operators

Prefer exact matches over text searches when possible:

**Better:** `{"operator": "=", "value": "exact_code"}`
**Less efficient:** `{"operator": "CONTAINS", "value": "exact_code"}`

### 3. Optimize OR operations

OR operations can be expensive on large datasets. Consider:
- Using the `IN` operator instead of multiple `=` conditions with OR
- Restructuring your query if possible
- Limiting the number of OR conditions

**Better:**
```json
{"code": {"operator": "IN", "value": ["asset1", "asset2", "asset3"]}}
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

Only include `locale` and `channel` context when necessary:

```json
{
    "complete": {
        "operator": "=",
        "value": true,
        "context": {
            "channel": "ecommerce"
        }
    }
}
```
