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

## Limitations and Considerations

### 1. URL Beginning with Placeholder

::: warning
If your URL **begins** with a placeholder, the PIM cannot validate it as a valid URL. The link may not work when used.
:::

**Problematic:**
```
%base_url%/products/%sku%
```

**Better:**
```
https://example.com/%sku%
```

### 2. Complex Attributes Not Supported

These attribute types don't work as placeholders:
- Price collections (use simple price attributes)
- Metric values
- Multi-select options
- Table attributes
- Asset collections

**Supported:**
- Simple text/textarea
- Identifier attributes
- Single select (will use option code)
- Boolean (returns true/false)
- Date

### 3. Maximum URL Length

Be mindful of URL length limits:
- Most browsers support up to 2048 characters
- Servers may have lower limits
- Consider attribute value lengths

### 4. Special Characters

Some characters in attribute values may cause issues:
- Forward slashes `/` in path placeholders
- Equals signs `=` in query parameters
- Ampersands `&` in query strings

The PIM URL-encodes values, but plan accordingly.

## Testing Placeholders

### 1. Create Test Products

Create products with known attribute values:
```
SKU: TEST-001
Name: Test Product
Description: This is a test
```

### 2. Check Replaced URLs

After clicking/triggering:
1. Check browser network tab
2. Verify correct values were substituted
3. Ensure URL is properly formed

### 3. Test Edge Cases

- Empty attribute values
- Special characters (quotes, ampersands)
- Very long attribute values
- Non-ASCII characters (Chinese, Arabic, etc.)
- Missing attributes

## Best Practices

### 1. Use Reliable Attributes

Choose attributes that are:
- Always populated
- Consistently formatted
- Valid for all products
- Unlikely to contain problematic characters

### 2. Validate on Your Server

Don't trust that values will always be present:

```javascript
app.get('/api/products/:uuid', (req, res) => {
  const uuid = req.params.uuid;

  if (!uuid || uuid === '') {
    return res.status(400).json({ error: 'Missing product UUID' });
  }

  // Process request
});
```

### 3. Document Your URLs

Keep documentation of which placeholders you're using:

```javascript
/**
 * Inventory API Endpoint
 *
 * URL Pattern: https://inventory.example.com/api/products/%uuid%
 * Placeholders:
 *   - %uuid%: Product UUID (always present)
 */
```

### 4. Test Internationalization

If using localizable attributes:
- Test with multiple locales
- Verify encoding of non-ASCII characters
- Ensure your API handles different languages

### 5. Provide Fallbacks

On your server, handle missing or invalid values:

```javascript
function getProductBySku(sku) {
  if (!sku || sku.trim() === '') {
    throw new Error('Invalid SKU provided');
  }

  return database.findProduct({ sku });
}
```

## Troubleshooting

### Placeholder Not Replaced

**Symptoms:** URL contains literal `%attribute_code%`

**Causes:**
- Attribute code doesn't exist
- Attribute type not supported
- Typo in placeholder name

**Solution:**
- Verify attribute code in PIM
- Check attribute type
- Use exact attribute code (case-sensitive)

### Empty Values

**Symptoms:** URL has missing segments: `https://example.com//details`

**Causes:**
- Attribute value is empty
- Attribute not set for product
- Wrong locale/scope context

**Solution:**
- Ensure attributes are populated
- Choose required attributes
- Handle empty values on server

### Encoding Issues

**Symptoms:** Special characters not properly encoded

**Causes:**
- Server not handling URL encoding
- Double encoding

**Solution:**
- Let PIM handle encoding
- Don't encode placeholders in configuration
- Decode on server if needed

## Learn More

- [Link Extensions](/extensions/types/link.html) - Using placeholders in links
- [Action Extensions](/extensions/types/action.html) - Using placeholders in actions
- [Data Component Extensions](/extensions/types/data-component.html) - Using placeholders for data
- [Attributes Documentation](https://help.akeneo.com) - PIM attribute types

::: panel-link Security Overview [Next](/extensions/security/overview.html)
:::
