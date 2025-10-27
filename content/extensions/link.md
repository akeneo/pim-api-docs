## Link
A **link** UI extension is crafted to open your external content in a new tab.

To create a `link` UI extension, mandatory fields are `name`, `position`, `type`, and `configuration`. Inside `configuration`, mandatory options are `default_label` and `url`.

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

::: panel-link Iframe Extensions [Next](/extensions/iframe.html)
:::