# Use cases examples

:::tips
We highly recommend using specific product codes, SKUs, or UUIDs with your LLM (instead of labels) when referring to a specific product, attribute, category or family to avoid unnecessary calls and potential trial and error.
:::

:::warning
All the examples below are demo data, and you must adapt the queries regarding your `attributes codes`, `locales`, `product model code` ...
:::

This page provides examples of how to use the Akeneo MCP Server. Simply type your request in natural language, and the MCP server will automatically use the appropriate tools and prompts behind the scenes to fulfill your request.

:::info
The Akeneo MCP Server automatically selects the right tools and specialized prompts based on your request. For simple queries like "show me all families", it uses basic tools. For complex analysis like "check FIC compliance", it uses specialized prompts that perform multi-step operations.
:::

If you want to explore the Akeneo MCP capabilities, check our [MCP Capabilities](/mcp/capabilities.html) page to learn how to list and debug available tools and prompts.

## Simple Examples

### Request all families

**User Input:**
```
"Show me all product families"
```

**Response Example:**
```json
{
  "families": [
    {
      "code": "electronics",
      "labels": [
        {
          "localeCode": "en_US",
          "localeValue": "Electronics"
        }
      ],
      "attributeAsLabel": "name",
      "attributeAsImage": "packshot"
    }
  ],
  "count": 1,
  "endpoint_used": "/api/rest/v1/families"
}
```

**Human-Readable Output:**
```
I found 1 product family in your PIM:

🏷️ **Electronics** (electronics)
- Label: Electronics (EN)
- Label attribute: name
- Image attribute: packshot
```

### Get product information

**User Input:**
```
"Show me the details for product 'ABC123'"
```

**Response Example:**
```json
{
  "product": {
    "uuid": "12345678-1234-1234-1234-123456789abc",
    "identifier": "ABC123",
    "enabled": true,
    "family": {
      "code": "electronics",
      "labels": [
        {
          "localeCode": "en_US",
          "localeValue": "Electronics"
        }
      ]
    },
    "categories": [
      {
        "code": "smartphones",
        "labels": [
          {
            "localeCode": "en_US",
            "localeValue": "Smartphones"
          }
        ]
      }
    ],
    "values": {
      "name": [
        {
          "locale": "en_US",
          "channel": null,
          "data": "Premium Smartphone"
        }
      ],
      "description": [
        {
          "locale": "en_US", 
          "channel": null,
          "data": "High-end smartphone with advanced features"
        }
      ],
      "price": [
        {
          "locale": null,
          "channel": "ecommerce",
          "data": "999.99"
        }
      ]
    }
  },
  "endpoint_used": "/api/rest/v1/products-uuid/12345678-1234-1234-1234-123456789abc"
}
```

**Human-Readable Output:**
```
📱 **Premium Smartphone** (ABC123)
- **Status:** ✅ Enabled
- **Family:** Electronics
- **Categories:** Smartphones
- **Description:** High-end smartphone with advanced features
- **Price:** $999.99 (ecommerce channel)
- **UUID:** 12345678-1234-1234-1234-123456789abc
```

### Search products by criteria

**User Input:**
```
"Find all enabled products in the electronics family with price over 500"
```

**Response Example:**
```json
{
  "products": [
    {
      "uuid": "12345678-1234-1234-1234-123456789abc",
      "identifier": "ABC123",
      "enabled": true,
      "family": {
        "code": "electronics",
        "labels": [
          {
            "localeCode": "en_US",
            "localeValue": "Electronics"
          }
        ]
      },
      "values": {
        "name": [
          {
            "locale": "en_US",
            "channel": null,
            "data": "Premium Smartphone"
          }
        ],
        "price": [
          {
            "locale": null,
            "channel": "ecommerce", 
            "data": "999.99"
          }
        ]
      }
    },
    {
      "uuid": "87654321-4321-4321-4321-cba987654321",
      "identifier": "XYZ789",
      "enabled": true,
      "family": {
        "code": "electronics",
        "labels": [
          {
            "localeCode": "en_US",
            "localeValue": "Electronics"
          }
        ]
      },
      "values": {
        "name": [
          {
            "locale": "en_US",
            "channel": null,
            "data": "Gaming Laptop"
          }
        ],
        "price": [
          {
            "locale": null,
            "channel": "ecommerce",
            "data": "1299.99"
          }
        ]
      }
    }
  ],
  "count": 2,
  "endpoint_used": "/api/rest/v1/products-uuid",
  "parameters_used": {
    "search": "{\"enabled\":[{\"operator\":\"=\",\"value\":true}],\"family\":[{\"operator\":\"=\",\"value\":\"electronics\"}],\"price\":[{\"operator\":\">\",\"value\":500}]}",
    "limit": 10,
    "page": 1
  }
}
```

**Human-Readable Output:**
```
🔍 Found 2 enabled electronics products over $500:

1. **Premium Smartphone** (ABC123)
   - Price: $999.99
   - UUID: 12345678-1234-1234-1234-123456789abc

2. **Gaming Laptop** (XYZ789)
   - Price: $1,299.99  
   - UUID: 87654321-4321-4321-4321-cba987654321
```

### Get attribute information

**User Input:**
```
"What attributes are available for the electronics family?"
```

**Response Example:**
```json
{
  "attributes": [
    {
      "code": "name",
      "labels": [
        {
          "localeCode": "en_US",
          "localeValue": "Name"
        }
      ],
      "type": "pim_catalog_text",
      "group": {
        "code": "marketing",
        "labels": [
          {
            "localeCode": "en_US",
            "localeValue": "Marketing"
          }
        ]
      }
    },
    {
      "code": "description",
      "labels": [
        {
          "localeCode": "en_US",
          "localeValue": "Description"
        }
      ],
      "type": "pim_catalog_textarea",
      "group": {
        "code": "marketing",
        "labels": [
          {
            "localeCode": "en_US",
            "localeValue": "Marketing"
          }
        ]
      }
    },
    {
      "code": "price",
      "labels": [
        {
          "localeCode": "en_US",
          "localeValue": "Price"
        }
      ],
      "type": "pim_catalog_price_collection",
      "group": {
        "code": "pricing",
        "labels": [
          {
            "localeCode": "en_US",
            "localeValue": "Pricing"
          }
        ]
      }
    }
  ],
  "count": 3,
  "endpoint_used": "/api/rest/v1/attributes",
  "parameters_used": {
    "page": 1,
    "limit": 50,
    "with_count": "false"
  }
}
```

**Human-Readable Output:**
```
📋 Available attributes for electronics family:

**Marketing Group:**
- **name** (Text) - Name
- **description** (Textarea) - Description

**Pricing Group:**  
- **price** (Price Collection) - Price

Total: 3 attributes found
```

### Update product information

**User Input:**
```
"Update product 'ABC123' description to 'Latest generation smartphone with 5G connectivity'"
```

**Response Example:**
```json
{
  "status": "success",
  "message": "Product updated successfully",
  "product_uuid": "12345678-1234-1234-1234-123456789abc",
  "endpoint_used": "/api/rest/v1/products-uuid/12345678-1234-1234-1234-123456789abc",
  "api_response": "No content (update successful)"
}
```

**Human-Readable Output:**
```
✅ **Product Updated Successfully**

- **Product:** ABC123 (12345678-1234-1234-1234-123456789abc)
- **Action:** Description updated to "Latest generation smartphone with 5G connectivity"
- **Status:** Success
```