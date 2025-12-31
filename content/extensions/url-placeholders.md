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
https://api.com/products?sku=%sku%
https://tool.com/check?product=%name%
```

### Multiple Placeholders

```
https://api.com/products/%sku%?name=%name%&category=%category%
https://example.com/%sku%/%name%/details
```

::: warning
If the URL begins with a placeholder, we won't verify its validity. The link might not work when used.
:::

## Context-Aware Values

### Locale and Channel

If you create a placeholder with a localizable or scopable attributes, the placeholder uses the current user's context:

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

If an attribute value is empty or doesn't exist, the placeholder is replaced with an empty string

::: panel-link Credentials [Next](/extensions/credentials.html)
:::
