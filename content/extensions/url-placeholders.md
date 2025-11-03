# URL Placeholders

## Overview

URL placeholders allow you to create dynamic URLs that incorporate contextual data from the PIM. When a user clicks a link or triggers an action, placeholders in the URL are automatically replaced with actual product attribute values.

This feature is available for:
- **Link** extensions
- **Action** extensions
- **Data Component** extensions

## Basic Syntax

Placeholders use the pattern `%attribute_code%`, where `attribute_code` is the code of a PIM attribute.

### Example

**Configured URL:**
```
https://www.google.com/search?q=%name%&tbm=shop&gl=us
```

**When clicked on a product with name "Blue Widget":**
```
https://www.google.com/search?q=Blue%20Widget&tbm=shop&gl=us
```

## Valid Placeholder Attributes

### Product Identifiers

These are always available and unique:

- **`%uuid%`** - Product UUID (for products)
  ```
  https://api.example.com/products/%uuid%
  → https://api.example.com/products/abc-123-def-456
  ```

- **`%code%`** - Product model code (for product models)
  ```
  https://api.example.com/models/%code%
  → https://api.example.com/models/tshirt-model
  ```

- **Identifier attributes** - Any attribute of type `identifier`
  ```
  https://api.example.com/items/%sku%
  → https://api.example.com/items/WIDGET-001
  ```

### Text Attributes

Any attribute of type `text` or `textarea` can be used:

- **`%name%`** - Product name
- **`%description%`** - Product description
- **`%short_description%`** - Short description
- **Custom text attributes** - Any text attribute you've defined

**Important:** For localizable or scopable attributes, the value for the **current user's locale and channel** will be used.

## Placeholder Positions

Placeholders can appear anywhere in your URL:

### In Path

```
https://example.com/products/%sku%/details
https://erp.com/%uuid%/inventory
https://api.com/v1/items/%sku%/pricing
```

### In Query Parameters

```
https://google.com/search?q=%name%
https://api.com/products?sku=%sku%&locale=%locale%
https://tool.com/check?product=%name%&user=%username%
```

### As Subdomain

```
https://%tenant%.example.com/products/%sku%
```

### Multiple Placeholders

```
https://api.com/products/%sku%?name=%name%&category=%category%
https://example.com/%sku%/%name%/details
```

## Context-Aware Values

### Locale and Channel

For localizable or scopable attributes, the placeholder uses the current user's context:

**Product has:**
```json
{
  "name": [
    { "locale": "en_US", "scope": null, "data": "Blue Widget" },
    { "locale": "fr_FR", "scope": null, "data": "Widget Bleu" }
  ]
}
```

**User viewing in `en_US`:**
```
%name% → Blue Widget
```

**User viewing in `fr_FR`:**
```
%name% → Widget Bleu
```

### Missing Values

If an attribute value is empty or doesn't exist:

**Behavior:**
- The placeholder is replaced with an empty string
- URL becomes: `https://example.com/products//details`

**Best practices:**
- Choose attributes that are always populated
- Handle missing values on your server
- Provide default values in your application

## URL Encoding

Attribute values are automatically URL-encoded:

```
%name% = "Blue & Red Widget"
→ Blue%20%26%20Red%20Widget
```

```
%description% = "Size: 10\" x 12\""
→ Size%3A%2010%22%20x%2012%22
```

You don't need to encode manually - the PIM handles this automatically.

## Examples by Extension Type

### Link Extension

Open product in Google Shopping:

```json
{
  "name": "google_shopping",
  "type": "link",
  "position": "pim.product.header",
  "configuration": {
    "url": "https://www.google.com/search?q=%name%&tbm=shop",
    "default_label": "Search Google Shopping"
  }
}
```

Open product in ERP by SKU:

```json
{
  "name": "view_in_erp",
  "type": "link",
  "position": "pim.product.header",
  "configuration": {
    "url": "https://erp.example.com/items/%sku%",
    "default_label": "View in ERP"
  }
}
```

### Action Extension

Export product to external system:

```json
{
  "name": "export_product",
  "type": "action",
  "position": "pim.product.header",
  "configuration": {
    "url": "https://api.example.com/export/%uuid%",
    "default_label": "Export Product"
  }
}
```

Trigger workflow for specific SKU:

```json
{
  "name": "start_workflow",
  "type": "action",
  "position": "pim.product.header",
  "configuration": {
    "url": "https://workflow.example.com/start?sku=%sku%&name=%name%",
    "default_label": "Start Workflow"
  }
}
```

### Data Component Extension

Fetch inventory by product UUID:

```json
{
  "name": "inventory_data",
  "type": "data_component",
  "position": "pim.product.panel",
  "configuration": {
    "url": "https://inventory.example.com/api/products/%uuid%",
    "default_label": "Inventory Status"
  }
}
```

Get pricing data by SKU and locale:

```json
{
  "name": "pricing_info",
  "type": "data_component",
  "position": "pim.product.panel",
  "configuration": {
    "url": "https://pricing.example.com/api/prices?sku=%sku%&locale=%user_locale%",
    "default_label": "Pricing Information"
  }
}
```

## Advanced Use Cases

### RESTful APIs

Build RESTful URLs with product identifiers:

```
GET https://api.example.com/v1/products/%uuid%
GET https://api.example.com/v1/items/%sku%/inventory
POST https://api.example.com/v1/products/%uuid%/sync
```

### Query String Building

Combine multiple attributes in query parameters:

```
https://search.example.com/products?
  sku=%sku%&
  name=%name%&
  brand=%brand%&
  category=%category%
```

### Deep Linking

Link to specific sections of external applications:

```
https://tool.example.com/app/products/%sku%/edit
https://cms.example.com/pages/product-%uuid%
https://analytics.example.com/reports/%sku%/performance
```

### Multi-Tenant Systems

Include tenant information:

```
https://%tenant%.saas-app.com/products/%sku%
https://api.example.com/%tenant%/products/%uuid%
```

## Special Placeholders

Beyond product attributes, some system values are available:

### User Information
- `%user_username%` - Current username
- `%user_locale%` - User's UI locale
- `%user_catalog_locale%` - User's catalog locale
- `%user_catalog_scope%` - User's catalog channel

### System Information
- `%tenant%` - PIM tenant identifier
- `%position%` - Extension position

**Example:**
```
https://api.example.com/data?
  product=%uuid%&
  user=%user_username%&
  locale=%user_catalog_locale%&
  tenant=%tenant%
```

::: panel-link Security Overview [Next](/extensions/credentials.html)
:::
