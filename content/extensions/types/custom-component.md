# Custom Component Extensions

## Overview

A **custom component** extension is a JavaScript application built with the Akeneo Extension SDK that runs securely within the PIM. Unlike other extension types that load external URLs, custom components are JavaScript code that executes directly in the PIM's secure sandbox.

This is the most powerful extension type, allowing you to build rich, interactive user interfaces with full access to PIM APIs, all without requiring external hosting infrastructure.

## Use Cases

Custom component extensions are ideal for:

- **Custom Product Enrichment Tools**: Build specialized interfaces for product data entry
- **Interactive Data Visualizations**: Create charts, graphs, and dashboards
- **Complex Business Logic**: Implement custom validation, calculations, or workflows
- **PIM Data Manipulation**: Create, update, or delete PIM resources programmatically
- **Multi-step Wizards**: Guide users through complex processes
- **Custom Integrations**: Connect PIM data with external APIs
- **Real-time Data Display**: Show live data from external sources
- **Advanced Search and Filtering**: Build custom search interfaces

## Key Characteristics

### Secure Sandbox Execution
Your code runs in a secure JavaScript environment (SES - Secure ECMAScript) that:
- Prevents access to sensitive PIM internals
- Isolates your code from other extensions
- Protects against malicious code execution

### Direct PIM API Access
Your component has authenticated access to:
- Product and Product Model APIs
- Catalog Structure (families, attributes, categories)
- Asset Manager and Reference Entities
- Target Market Settings (channels, locales, currencies)
- User context and navigation

### Automatic Authentication
All API calls are automatically authenticated using the current user's session. Your component can only perform operations the logged-in user has permission to do.

### No External Hosting Required
Your JavaScript code is deployed directly to the PIM. No need for:
- Web servers
- Domain names
- SSL certificates
- Infrastructure management

### Modern JavaScript Development
Build with modern tools and frameworks:
- TypeScript support
- npm packages
- Module bundlers
- Local development with hot reload

## Prerequisites

Before building custom component extensions, you'll need:

1. **JavaScript/TypeScript Knowledge**: Familiarity with modern JavaScript
2. **Node.js and npm**: For dependency management
3. **Akeneo Extension SDK**: The official SDK for building extensions
4. **Development Environment**: A code editor and terminal
5. **PIM Access**: A connection or app with appropriate permissions

## Quick Start

### 1. Install the SDK

```bash
npm install @akeneo/extension-sdk
```

### 2. Basic Custom Component

Here's a minimal custom component that displays product information:

```javascript
import { PIM } from '@akeneo/extension-sdk';

// Initialize the SDK
PIM.initialize();

// Get current product context
const context = await PIM.context.get();
console.log('Current product:', context.product);

// Fetch product data
const product = await PIM.api.product.get(context.product.uuid);

// Display product name
document.getElementById('app').innerHTML = `
  <h1>${product.values.name[0].data}</h1>
  <p>SKU: ${product.identifier}</p>
`;
```

### 3. Accessing User Context

```javascript
// Get current user information
const user = await PIM.user.get();
console.log('Current user:', user.username);
console.log('User locale:', user.catalogLocale);
console.log('User channel:', user.catalogScope);
```

### 4. Making External API Calls

```javascript
// Call external APIs with credentials
const response = await PIM.api.external.call({
  url: 'https://api.example.com/data',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

console.log('External data:', response);
```

## Configuration

### Deployment Configuration

Custom components are deployed via API with configuration including:

```json
{
  "name": "my_custom_tool",
  "version": "1.0.0",
  "type": "custom_component",
  "position": "pim.product.tab",
  "configuration": {
    "default_label": "Custom Tool",
    "labels": {
      "en_US": "Custom Tool",
      "fr_FR": "Outil personnalisé"
    }
  },
  "source_code": "/* your bundled JavaScript code */"
}
```

### Available Positions

Custom components can be placed in most positions:

| Position | Context | SDK Access |
|----------|---------|------------|
| `pim.product.tab` | Product edit page | Full product context |
| `pim.product-model.tab` | Product model edit | Full model context |
| `pim.category.tab` | Category edit page | Category context |
| `pim.product.panel` | Product side panel | Product context |
| `pim.activity.navigation.tab` | Activity navigation | Global context |

## Available SDK APIs

The Akeneo Extension SDK provides access to major PIM resources:

### Product Management
- **Products**: Get, create, update, delete products by UUID
- **Product Models**: Manage product models and variants
- **Media Files**: Upload and manage product media

### Catalog Structure
- **Families**: Access family definitions
- **Family Variants**: Manage product variant structures
- **Attributes**: Access attribute definitions
- **Categories**: Read and manage category trees
- **Association Types**: Manage product associations

### Asset Management
- **Assets**: Full asset lifecycle management
- **Asset Families**: Manage asset family definitions
- **Media Files**: Asset media file operations

### Reference Entities
- **Reference Entities**: Manage reference entity definitions
- **Records**: Create and update reference entity records

### System Configuration
- **Channels**: Access channel (scope) configuration
- **Locales**: Access available locales
- **Currencies**: Access currency configuration
- **Measurement Families**: Access measurement units

For complete API documentation, see [Available APIs](/extensions/development/available-apis.html).

## Development Workflow

### Local Development Setup

```bash
# Initialize a new extension project
make start

# This creates:
# - src/ directory for your source code
# - package.json with dependencies
# - Development configuration
```

### Development Mode

```bash
# Watch mode - auto-updates on file changes
make watch

# Manual update
make update-dev
```

### Build and Deploy

```bash
# Build production bundle
npm run build

# Deploy to PIM
make deploy
```

For detailed development setup, see [SDK Development Guide](/extensions/development/custom-component-sdk.html).

## Example Projects

The SDK includes example projects to help you get started:

### Quickstart Example
Basic extension demonstrating:
- SDK initialization
- Context access
- Product data fetching
- Simple UI rendering

### Stock Data Panel Example
Advanced extension showing:
- External API calls with authentication
- Real-time data display
- Error handling
- Loading states

## Common Patterns

### Fetching and Displaying Product Data

```javascript
import { PIM } from '@akeneo/extension-sdk';

async function displayProduct() {
  // Get current context
  const context = await PIM.context.get();

  // Fetch product details
  const product = await PIM.api.product.get(context.product.uuid);

  // Access attributes
  const name = product.values.name?.[0]?.data || 'No name';
  const description = product.values.description?.[0]?.data || '';

  return { name, description };
}
```

### Updating Product Attributes

```javascript
async function updateProductPrice(productUuid, newPrice) {
  await PIM.api.product.patch(productUuid, {
    values: {
      price: [{
        locale: null,
        scope: null,
        data: [{
          amount: newPrice,
          currency: 'USD'
        }]
      }]
    }
  });
}
```

### Navigating to Other Products

```javascript
// Navigate to another product
PIM.navigate.internal('pim_enrich_product_edit', {
  uuid: 'product-uuid-here'
});

// Navigate to product list
PIM.navigate.internal('pim_enrich_product_index');
```

### Calling External APIs

```javascript
async function fetchExternalData(productSku) {
  try {
    const response = await PIM.api.external.call({
      url: `https://api.example.com/products/${productSku}`,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer TOKEN' // Configured in extension credentials
      }
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch external data:', error);
    throw error;
  }
}
```

## Best Practices

### 1. Error Handling
Always handle errors gracefully:

```javascript
try {
  const product = await PIM.api.product.get(uuid);
  renderProduct(product);
} catch (error) {
  showErrorMessage('Unable to load product');
  console.error(error);
}
```

### 2. Loading States
Show loading indicators for async operations:

```javascript
setLoading(true);
try {
  const data = await fetchData();
  renderData(data);
} finally {
  setLoading(false);
}
```

### 3. User Permissions
Respect user permissions - API calls will fail if the user lacks permission:

```javascript
try {
  await PIM.api.product.patch(uuid, changes);
} catch (error) {
  if (error.status === 403) {
    showMessage('You do not have permission to edit this product');
  }
}
```

### 4. Performance
- Cache data when appropriate
- Use pagination for large lists
- Debounce user input
- Minimize DOM manipulations

### 5. TypeScript
Use TypeScript for better type safety:

```typescript
import { PIM, Product } from '@akeneo/extension-sdk';

async function getProduct(uuid: string): Promise<Product> {
  return await PIM.api.product.get(uuid);
}
```

## Security Considerations

### Sandbox Limitations
Your code runs in a secure sandbox with limited capabilities:
- **No DOM access** to parent PIM pages
- **No global state** access
- **No network requests** except via `PIM.api.external.call()`
- **Limited JavaScript APIs** for security

### Data Access
Your extension can only:
- Access data the current user has permission to see
- Perform operations the user is authorized to do
- Call external APIs with configured credentials

### External API Calls
Use `PIM.api.external.call()` instead of fetch():
- ✅ `PIM.api.external.call({ url: '...' })`
- ❌ `fetch('https://...')` (blocked by sandbox)

## Limitations

- **Sandbox restrictions**: Limited JavaScript APIs available
- **No direct DOM access**: Cannot modify parent PIM interface
- **API rate limits**: Subject to PIM API rate limiting
- **Bundle size**: Keep JavaScript bundles reasonably sized
- **Browser support**: Modern browsers only (ES6+)

## When to Use Another Type

Consider these alternatives:

- **Already have a web app?** → Use [Iframe Extensions](/extensions/types/iframe.html)
- **Simple link needed?** → Use [Link Extensions](/extensions/types/link.html)
- **Just displaying data?** → Use [Data Component Extensions](/extensions/types/data-component.html)
- **Background tasks?** → Use [Action Extensions](/extensions/types/action.html)

## Learn More

- [SDK Development Guide](/extensions/development/custom-component-sdk.html) - Detailed setup
- [Available APIs](/extensions/development/available-apis.html) - Complete API reference
- [Example Projects](https://github.com/akeneo/extension-sdk) - Sample code on GitHub
- [Positions](/extensions/positions.html) - Where to place your component

::: panel-link Iframe Communication [Next](/extensions/integration/iframe-communication.html)
:::
