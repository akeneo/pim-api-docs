# Data Component Extensions

## Overview

A **data component** UI extension queries data from a predefined endpoint and displays it in a collapsible panel on the product edit form. It helps users complete product information by showing relevant external data without leaving the PIM.

The panel is accessed via a button in the header of the form and can be opened and closed by clicking the button. Data is displayed in a structured, read-only format.

## Use Cases

Data component extensions are perfect for:

- **Supplementary Product Data**: Display additional product information from external systems
- **Real-time Inventory**: Show current stock levels or availability
- **Pricing Information**: Display pricing data from external pricing engines
- **Compliance Data**: Show certification or regulatory information
- **Validation Results**: Display results from external validation services
- **Competitor Data**: Show pricing or availability from competitor monitoring tools
- **Translation Status**: Display translation progress or quality scores
- **ERP Integration**: Show ERP-specific data alongside PIM data

## Key Characteristics

### Raw JSON Display
The extension expects data in JSON format and displays it as-is. Sections are collapsible to help navigate complex data structures.

### GET HTTP Method
Requests use the GET method to fetch data from your endpoint.

### Optional Signature
Configure a `secret` to sign requests using SHA-512 protocol for security.

### Authenticated Calls
Add [credentials](/extensions/security/credentials.html) to the extension for endpoints requiring authentication.

### No Data Modification
Data components are read-only. Users can view but not edit the displayed information.

## Configuration

### Required Fields

- **name**: Technical identifier (no spaces or special characters)
- **position**: Must be a panel position (see Available Positions)
- **type**: Must be `"data_component"`
- **configuration**:
  - **default_label**: The label on the panel button
  - **url**: Your data endpoint (GET request)

### Optional Fields

- **configuration.secret**: Secret key for request signing (32+ characters)
- **configuration.labels**: Localized button labels
- **credentials**: Authentication headers for your endpoint
- **version**: Your extension version

## Example Configuration

### Basic Data Component

```json
{
  "name": "inventory_data",
  "version": "1.0.0",
  "type": "data_component",
  "position": "pim.product.panel",
  "configuration": {
    "url": "https://api.example.com/inventory",
    "default_label": "Inventory Info"
  }
}
```

### With Authentication

```json
{
  "name": "secure_pricing",
  "version": "1.0.0",
  "type": "data_component",
  "position": "pim.product.panel",
  "configuration": {
    "url": "https://api.example.com/pricing",
    "secret": "your-secret-key-min-32-chars-long",
    "default_label": "Pricing Data",
    "labels": {
      "en_US": "Pricing Data",
      "fr_FR": "Données de tarification"
    }
  },
  "credentials": [
    {
      "type": "Bearer Token",
      "value": "your_api_token"
    }
  ]
}
```

### With Dynamic URL

Using placeholders to include product identifiers:

```json
{
  "name": "erp_data",
  "version": "1.0.0",
  "type": "data_component",
  "position": "pim.product.panel",
  "configuration": {
    "url": "https://erp.example.com/products/%uuid%/details",
    "default_label": "ERP Details"
  }
}
```

## Available Positions

Data component extensions can only be placed in panel positions:

| Position | Context |
|----------|---------|
| `pim.product.panel` | Simple products and variant products |
| `pim.category.tab` | Category edit pages |
| `pim.product.tab` | Product tab (alternative to panel) |

See the [Positions documentation](/extensions/positions.html) for visual examples of panel locations.

## Request Format

### URL Query Parameters

The PIM sends context data as query parameters (similar to iframe extensions):

```
GET https://api.example.com/data?product[uuid]=abc-123&user[username]=julia
```

**Parameters include:**
- `product[uuid]` or `product[code]`: Product identifier
- `user[username]`, `user[email]`, etc.: User context
- `user[catalog_locale]`, `user[catalog_scope]`: Configured locale/channel
- `position`: Extension position
- `tenant`: PIM instance identifier

### URL Placeholders

Your URL can use placeholders that are replaced with product data:

```
https://api.example.com/products/%uuid%/inventory
https://erp.example.com/items/%sku%
```

See [URL Placeholders](/extensions/integration/url-placeholders.html) for details.

## Response Format

### Expected JSON Structure

Your endpoint should return valid JSON. The data component displays the structure as-is:

```json
{
  "inventory": {
    "total_stock": 150,
    "available": 120,
    "reserved": 30,
    "locations": [
      {
        "warehouse": "Main",
        "quantity": 100
      },
      {
        "warehouse": "Secondary",
        "quantity": 50
      }
    ]
  },
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### Display Format

The data component renders JSON in a collapsible tree structure:

- **Objects**: Collapsible sections
- **Arrays**: Numbered items
- **Primitives**: Display values directly

### Example Display

```
▼ inventory
  total_stock: 150
  available: 120
  reserved: 30
  ▼ locations
    ▼ [0]
      warehouse: "Main"
      quantity: 100
    ▼ [1]
      warehouse: "Secondary"
      quantity: 50
updated_at: "2025-01-15T10:30:00Z"
```

## Implementing Your Endpoint

### Basic Python Example

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/inventory', methods=['GET'])
def get_inventory():
    product_uuid = request.args.get('product[uuid]')

    # Fetch data from your system
    inventory_data = fetch_inventory(product_uuid)

    return jsonify({
        "current_stock": inventory_data['quantity'],
        "location": inventory_data['warehouse'],
        "last_updated": inventory_data['timestamp']
    })
```

### Node.js with Authentication

```javascript
const express = require('express');
const app = express();

app.get('/pricing', authenticateRequest, async (req, res) => {
  const productUuid = req.query['product[uuid]'];
  const locale = req.query['user[catalog_locale]'];

  try {
    const pricing = await getPricingData(productUuid, locale);

    res.json({
      base_price: pricing.base,
      discounted_price: pricing.discounted,
      currency: pricing.currency,
      valid_until: pricing.expiry
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch pricing data"
    });
  }
});
```

## Security

### Request Signing

When you configure a `secret`, the PIM includes an `X-Akeneo-Signature` header for verification.

```javascript
const crypto = require('crypto');

function verifySignature(url, signature, secret) {
  const expected = crypto
    .createHmac('sha512', secret)
    .update(url)
    .digest('hex');

  return signature === expected;
}

app.get('/secure-data', (req, res) => {
  const signature = req.headers['x-akeneo-signature'];
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  if (!verifySignature(fullUrl, signature, process.env.SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process request...
});
```

### Authentication

Add credentials for endpoints requiring authentication:

- **Bearer Token**: `Authorization: Bearer <token>`
- **Basic Auth**: `Authorization: Basic <base64>`
- **Custom Headers**: Any custom header/value pair

See [Credentials documentation](/extensions/security/credentials.html) for details.

## Best Practices

### 1. Keep Data Concise
Users review this data alongside product information:
- Return only relevant fields
- Use clear, descriptive field names
- Group related data logically

### 2. Handle Missing Products
Your endpoint may receive requests for products that don't exist in your system:

```json
{
  "error": "Product not found in inventory system",
  "product_uuid": "abc-123"
}
```

### 3. Optimize Response Time
Data loads when the panel is opened:
- Cache frequently accessed data
- Index by product identifier
- Keep queries fast (< 2 seconds)

### 4. Use Meaningful Field Names
The JSON keys are displayed to users:
- ✅ `"current_stock"`, `"warehouse_location"`
- ❌ `"qty"`, `"wh_loc"`

### 5. Include Timestamps
Help users understand data freshness:

```json
{
  "data": { /* ... */ },
  "last_updated": "2025-01-15T10:30:00Z",
  "source": "Inventory Management System"
}
```

### 6. Handle Errors Gracefully
Return meaningful error messages in JSON:

```json
{
  "error": true,
  "message": "Unable to connect to inventory system",
  "retry_after": 300
}
```

## Data Structure Examples

### Inventory Information

```json
{
  "summary": {
    "total_quantity": 1250,
    "available": 980,
    "on_order": 200,
    "reserved": 70
  },
  "warehouses": [
    {
      "id": "WH001",
      "name": "Main Warehouse",
      "quantity": 800,
      "location": "New York, USA"
    },
    {
      "id": "WH002",
      "name": "European Hub",
      "quantity": 450,
      "location": "Amsterdam, NL"
    }
  ],
  "next_restock_date": "2025-02-01"
}
```

### Pricing Data

```json
{
  "base_price": {
    "amount": 99.99,
    "currency": "USD"
  },
  "discounts": [
    {
      "type": "volume",
      "threshold": 10,
      "discount_percent": 5
    },
    {
      "type": "seasonal",
      "active_until": "2025-01-31",
      "discount_percent": 10
    }
  ],
  "competitive_pricing": {
    "market_average": 105.50,
    "position": "below_market"
  }
}
```

### Compliance Information

```json
{
  "certifications": [
    {
      "name": "CE Marking",
      "status": "valid",
      "expires": "2026-12-31"
    },
    {
      "name": "RoHS Compliance",
      "status": "valid",
      "expires": "2027-06-30"
    }
  ],
  "safety_warnings": [
    "Contains small parts - choking hazard"
  ],
  "restricted_countries": ["CN", "RU"]
}
```

## Limitations

- **Read-only display**: Cannot edit data within the panel
- **JSON format only**: Other formats not supported
- **No custom styling**: Display format is controlled by PIM
- **Limited interactivity**: No buttons or form controls
- **Single request**: Data loads once when panel opens (no auto-refresh)

## When to Use Another Type

Consider these alternatives:

- **Need interactive UI?** → Use [Iframe Extensions](/extensions/types/iframe.html)
- **Need to trigger actions?** → Use [Action Extensions](/extensions/types/action.html)
- **Just need a link?** → Use [Link Extensions](/extensions/types/link.html)
- **Need complex logic?** → Use [Custom Component Extensions](/extensions/types/custom-component.html)

## Learn More

- [URL Placeholders](/extensions/integration/url-placeholders.html) - Dynamic URLs
- [Credentials](/extensions/security/credentials.html) - Authentication methods
- [Positions](/extensions/positions.html) - Where to place panels
- [API Reference](/extensions/api.html) - Programmatic management

::: panel-link Custom Component Extensions [Next](/extensions/types/custom-component.html)
:::
