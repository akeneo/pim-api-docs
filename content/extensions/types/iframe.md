# Iframe Extensions

## Overview

An **iframe** UI extension embeds external content directly within the PIM using an HTML iframe element. Your web application loads inside the PIM interface, allowing users to interact with it without leaving their current context.

An iframe (inline frame) is an HTML element that allows you to embed another HTML document within the current document. It is commonly used to display content from another source, such as a webpage, video, or interactive application.

For more detailed information about iframes, refer to the [Mozilla Developer Network (MDN) documentation on iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

## Use Cases

Iframe extensions are ideal for:

- **External Dashboards**: Embed analytics or business intelligence tools
- **Third-Party Tools**: Integrate external applications seamlessly
- **Custom Interfaces**: Display custom-built tools within PIM context
- **Contextual Information**: Show data from external systems alongside PIM data
- **Interactive Forms**: Embed forms for data collection or validation

## Configuration

To create an iframe UI extension, you need to specify:

### Required Fields

- **name**: Technical identifier (no spaces or special characters)
- **position**: Where the iframe appears (see [Available Positions](/extensions/positions.html))
- **type**: Must be `"iframe"`
- **configuration**:
  - **default_label**: The label displayed on the tab/button
  - **secret**: Secret key for JWT token generation (security)
  - **url**: The URL of your web application

### Optional Fields

- **labels**: Localized labels (object with locale codes as keys)
- **version**: Your extension version for tracking

## Example Configuration

### Basic Iframe

```json
{
  "name": "my_dashboard",
  "version": "1.0.0",
  "type": "iframe",
  "position": "pim.product.tab",
  "configuration": {
    "url": "https://dashboard.example.com/product-view",
    "secret": "your-secret-key-min-32-chars",
    "default_label": "Product Dashboard",
    "labels": {
      "en_US": "Product Dashboard",
      "fr_FR": "Tableau de bord produit"
    }
  }
}
```

### Iframe with Credentials

For authenticated external endpoints:

```json
{
  "name": "secure_dashboard",
  "version": "1.0.0",
  "type": "iframe",
  "position": "pim.product.tab",
  "configuration": {
    "url": "https://dashboard.example.com/secure",
    "secret": "your-secret-key-min-32-chars",
    "default_label": "Secure Dashboard"
  },
  "credentials": [
    {
      "type": "Bearer Token",
      "value": "your_api_token_here"
    }
  ]
}
```

## Available Positions

Iframe extensions can be placed in:

| Position | Location | Context | Communication |
|----------|----------|---------|---------------|
| `pim.product.tab` | Product edit page tab | Simple products and variants | Yes |
| `pim.product-model.tab` | Product model tab | Root product models | Yes |
| `pim.sub-product-model.tab` | Sub-product model tab | Sub-product models | Yes |
| `pim.category.tab` | Category edit page tab | Categories | Yes |
| `pim.product-grid.action-bar` | Product grid action bar | Multiple products | Yes |
| `pim.activity.navigation.tab` | Activity navigation tab | Global context | No |
| `pim.product.panel` | Product right panel | Simple products and variants | Yes |
| `pim.product-model.panel` | Product model right panel | Root product models | Yes |
| `pim.sub-product-model.panel` | Sub-product model right panel | Sub-product models | Yes |

See the [Positions documentation](/extensions/positions.html) for visual examples.

## How Iframes Receive Context

The PIM automatically passes contextual information to your iframe in two ways:

### 1. Query Parameters (Default)

For most positions, the PIM sends context data as URL query parameters:

```
https://your-app.com/?user[username]=julia&product[uuid]=abc-123&position=pim.product.tab
```

**Always included:**
- User information (uuid, username, email, locale, catalog_locale, catalog_scope)
- Extension position
- Tenant identifier

**Position-specific:**
- Product tab: `product[uuid]`, `product[identifier]`
- Product model tab: `product[code]`
- Category tab: `category[code]`

### 2. PostMessage API (Advanced)

For positions like `pim.product-grid.action-bar` (where many products may be selected), the PIM uses the PostMessage API to send data.

Your iframe receives context data and can request updates dynamically. This is also useful for modern frameworks like React where the iframe may load before components.

**Learn more:** [Iframe Communication](/extensions/integration/iframe-communication.html)

## Security Considerations

::: warning
**Important security notice**

For production deployments with sensitive data, implement proper security measures to protect your iframe application.
:::

Iframe extensions should implement:

1. **Content Security Policy (CSP)**: Control what resources can be loaded
2. **JWT Token Verification**: Validate requests using the secret key
3. **HTTPS Only**: Always use secure connections

**Learn more:** [Iframe Security](/extensions/security/iframe-security.html)

## Quick Start Example

Here's a minimal HTML page that can be embedded as an iframe extension:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Iframe Extension</title>
</head>
<body>
    <h1>Product Information</h1>
    <div id="info"></div>

    <script>
        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const productUuid = params.get('product[uuid]');
        const username = params.get('user[username]');

        // Display information
        document.getElementById('info').innerHTML = `
            <p>Product UUID: ${productUuid || 'N/A'}</p>
            <p>User: ${username || 'N/A'}</p>
        `;

        // Listen for PostMessage events
        window.addEventListener('message', (event) => {
            console.log('Received message from PIM:', event.data);
        });
    </script>
</body>
</html>
```

## Best Practices

### 1. Optimize Loading Performance
- Minimize initial load time
- Show loading indicators
- Lazy load heavy resources

### 2. Responsive Design
- Design for various iframe sizes
- Handle different panel widths
- Consider mobile viewports

### 3. Error Handling
- Display friendly error messages
- Handle missing context data gracefully
- Log errors for debugging

### 4. Security
- Always use HTTPS
- Implement JWT token validation
- Set appropriate CSP headers

### 5. User Experience
- Maintain consistent styling with PIM
- Provide clear navigation
- Show loading states

## Limitations

- **Same-origin policy**: Your iframe has limited access to parent window
- **Size constraints**: Iframe dimensions are controlled by the PIM
- **Performance**: Each iframe loads a complete web page
- **Browser compatibility**: Some browsers have stricter iframe policies

## Advanced Topics

### Communication Patterns
Learn how to exchange data with the PIM using PostMessage:
- [Iframe Communication](/extensions/integration/iframe-communication.html)

### Security Implementation
Implement JWT token validation and CSP headers:
- [Iframe Security](/extensions/security/iframe-security.html)

### Authentication
Add credentials for authenticated API calls:
- [Credentials](/extensions/security/credentials.html)

## When to Use Another Type

Consider these alternatives if iframe extensions don't meet your needs:

- **Simple link needed?** → Use [Link Extensions](/extensions/types/link.html)
- **Need background processing?** → Use [Action Extensions](/extensions/types/action.html)
- **Just displaying data?** → Use [Data Component Extensions](/extensions/types/data-component.html)
- **Need full SDK access?** → Use [Custom Component Extensions](/extensions/types/custom-component.html)

## Learn More

- [Iframe Communication](/extensions/integration/iframe-communication.html) - PostMessage patterns
- [Iframe Security](/extensions/security/iframe-security.html) - JWT and CSP
- [Positions](/extensions/positions.html) - Where to place your extension
- [API Reference](/extensions/api.html) - Programmatic management

::: panel-link Action Extensions [Next](/extensions/types/action.html)
:::
