# Link Extensions

## Overview

A **link** UI extension opens your external content in a new browser tab. This is the simplest extension type, requiring no complex integration or hosting infrastructure.

When a user clicks the link button in the PIM interface, a new tab opens with your specified URL. The URL can include dynamic placeholders that are replaced with contextual data (product UUID, attribute values, etc.).

## Use Cases

Link extensions are perfect for:

- **External Documentation**: Link to product-specific documentation or guidelines
- **External Systems**: Open related records in ERP, CRM, or other business systems
- **Admin Panels**: Direct users to configuration or management interfaces
- **Search Tools**: Link to external search engines with pre-filled product data
- **Reporting Tools**: Open analytics or reporting dashboards

## Configuration

To create a link UI extension, you need to specify:

### Required Fields

- **name**: Technical identifier (no spaces or special characters)
- **position**: Where the link appears (see [Available Positions](/extensions/positions.html))
- **type**: Must be `"link"`
- **configuration**:
  - **default_label**: The text displayed on the button
  - **url**: The destination URL (can include [placeholders](/extensions/integration/url-placeholders.html))

### Optional Fields

- **labels**: Localized button text (object with locale codes as keys)
- **version**: Your extension version for tracking

## Example Configuration

### Basic Link

```json
{
  "name": "view_in_erp",
  "version": "1.0.0",
  "type": "link",
  "position": "pim.product.header",
  "configuration": {
    "url": "https://erp.example.com/products",
    "default_label": "View in ERP"
  }
}
```

### Link with Dynamic URL

Using placeholders to include product data in the URL:

```json
{
  "name": "google_shopping_search",
  "version": "1.0.0",
  "type": "link",
  "position": "pim.product.header",
  "configuration": {
    "url": "https://www.google.com/search?q=%name%&tbm=shop",
    "default_label": "Search on Google Shopping",
    "labels": {
      "en_US": "Search on Google Shopping",
      "fr_FR": "Rechercher sur Google Shopping"
    }
  }
}
```

When clicked on a product with name "Blue Widget", this opens:
```
https://www.google.com/search?q=Blue%20Widget&tbm=shop
```

### Link with Multiple Placeholders

```json
{
  "name": "external_inventory",
  "type": "link",
  "position": "pim.product.header",
  "configuration": {
    "url": "https://inventory.example.com/check?sku=%sku%&name=%name%",
    "default_label": "Check Inventory"
  }
}
```

## Available Positions

Link extensions can be placed in the following positions:

| Position | Location | Context |
|----------|----------|---------|
| `pim.product.header` | Product edit page header | Simple products and variants |
| `pim.product-model.header` | Product model header | Root product models |
| `pim.sub-product-model.header` | Sub-product model header | Sub-product models |

See the [Positions documentation](/extensions/positions.html) for visual examples.

## URL Placeholders

Link URLs support dynamic placeholders that are replaced with product data:

- **Product identifiers**: `%uuid%`, `%code%`, `%sku%` (or any identifier attribute)
- **Text attributes**: `%name%`, `%description%`, etc.
- Placeholders use the current locale/channel context

**Example**: `https://example.com/%sku%/details` becomes `https://example.com/ABC123/details`

For complete placeholder documentation, see [URL Placeholders](/extensions/integration/url-placeholders.html).

## Best Practices

### 1. Use Descriptive Labels
Make button labels clear and action-oriented:
- ✅ "View in ERP"
- ✅ "Check Stock Levels"
- ❌ "Link"
- ❌ "Click Here"

### 2. Handle Missing Data
If your URL uses placeholders, consider what happens if the attribute is empty:
- Provide default values in your external application
- Use fallback logic on your server
- Choose attributes that are always populated

### 3. Validate URLs
Ensure your base URL is correct before deploying:
- Test with real product data
- Check that placeholders are properly replaced
- Verify the target page handles URL parameters

### 4. Consider Localization
Provide translated labels for all supported locales:

```json
{
  "labels": {
    "en_US": "View Documentation",
    "fr_FR": "Voir la documentation",
    "de_DE": "Dokumentation ansehen"
  }
}
```

### 5. Use HTTPS
Always use HTTPS URLs for security:
- ✅ `https://example.com`
- ❌ `http://example.com`

## Limitations

- Links always open in a new browser tab (no control over this behavior)
- No way to receive data back from the opened page
- Cannot execute JavaScript in the PIM context
- Users must have network access to the target URL

## When to Use Another Type

Consider these alternatives if link extensions don't meet your needs:

- **Need to embed content?** → Use [Iframe Extensions](/extensions/types/iframe.html)
- **Need to trigger server actions?** → Use [Action Extensions](/extensions/types/action.html)
- **Need to display data in PIM?** → Use [Data Component Extensions](/extensions/types/data-component.html)
- **Need custom JavaScript logic?** → Use [Custom Component Extensions](/extensions/types/custom-component.html)

## Learn More

- [Getting Started Guide](/extensions/getting-started.html) - Create your first link extension
- [URL Placeholders](/extensions/integration/url-placeholders.html) - Dynamic URL patterns
- [Positions](/extensions/positions.html) - Where to place your extension
- [API Reference](/extensions/api.html) - Programmatic extension management

::: panel-link Iframe Extensions [Next](/extensions/types/iframe.html)
:::
