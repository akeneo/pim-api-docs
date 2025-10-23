# Custom Component SDK Development

## Overview

This guide covers the complete development workflow for building Custom Component extensions using the Akeneo Extension SDK. You'll learn how to set up your environment, develop locally, and deploy to production.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or later) and npm
- **Git** for version control
- **Code editor** (VS Code, WebStorm, etc.)
- **Access to PIM** with appropriate permissions
- **API credentials** (Connection or App)

## Installation

### Install the SDK

```bash
npm install @akeneo/extension-sdk
```

### Create a New Extension Project

The SDK provides a Makefile to bootstrap new projects:

```bash
# Clone the SDK repository or use the template
git clone https://github.com/akeneo/extension-sdk.git
cd extension-sdk

# Initialize your extension project
make start
```

This creates:
```
my-extension/
├── src/
│   └── index.js        # Your extension code
├── package.json         # Dependencies
├── webpack.config.js    # Build configuration
├── Makefile            # Development commands
└── .env                # PIM configuration (create this)
```

### Configure Environment

Create a `.env` file with your PIM credentials:

```env
PIM_URL=https://your-pim.cloud.akeneo.com
PIM_CLIENT_ID=your_client_id
PIM_CLIENT_SECRET=your_client_secret
PIM_USERNAME=your_username
PIM_PASSWORD=your_password
```

::: warning
Never commit `.env` files to version control. Add them to `.gitignore`.
:::

## Development Workflow

### 1. Start Development Server

```bash
# Watch mode - auto-updates on file changes
make watch
```

This:
- Watches your `src/` directory for changes
- Rebuilds on every save
- Automatically updates the extension in PIM

### 2. Manual Build and Deploy

```bash
# Build the extension
npm run build

# Deploy to PIM
make deploy
```

### 3. Update Development Extension

```bash
# Update existing extension in PIM
make update-dev
```

## Project Structure

### Basic Extension

```javascript
// src/index.js
import { PIM } from '@akeneo/extension-sdk';

// Initialize the SDK
PIM.initialize();

// Your application logic
async function init() {
  try {
    // Get current context
    const context = await PIM.context.get();
    console.log('Current product:', context.product);

    // Fetch product data
    const product = await PIM.api.product.get(context.product.uuid);

    // Render UI
    renderApp(product);
  } catch (error) {
    console.error('Initialization failed:', error);
    showError(error);
  }
}

function renderApp(product) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="extension-container">
      <h1>${product.values.name?.[0]?.data || 'Unnamed Product'}</h1>
      <p>SKU: ${product.identifier}</p>
      <button onclick="enhanceProduct()">Enhance</button>
    </div>
  `;
}

function showError(error) {
  document.getElementById('app').innerHTML = `
    <div class="error">Error: ${error.message}</div>
  `;
}

// Start the application
init();
```

### TypeScript Extension

```typescript
// src/index.ts
import { PIM, Product, Context } from '@akeneo/extension-sdk';

interface AppState {
  product: Product | null;
  loading: boolean;
  error: Error | null;
}

class ProductExtension {
  private state: AppState = {
    product: null,
    loading: true,
    error: null
  };

  async initialize(): Promise<void> {
    try {
      await PIM.initialize();

      const context: Context = await PIM.context.get();
      const product = await PIM.api.product.get(context.product.uuid);

      this.setState({ product, loading: false });
      this.render();
    } catch (error) {
      this.setState({
        error: error as Error,
        loading: false
      });
      this.renderError();
    }
  }

  private setState(updates: Partial<AppState>): void {
    this.state = { ...this.state, ...updates };
  }

  private render(): void {
    const { product } = this.state;
    if (!product) return;

    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="product-extension">
        <h1>${this.getProductName(product)}</h1>
        <p>SKU: ${product.identifier}</p>
      </div>
    `;
  }

  private getProductName(product: Product): string {
    return product.values.name?.[0]?.data || 'Unnamed Product';
  }

  private renderError(): void {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="error">
        Error: ${this.state.error?.message}
      </div>
    `;
  }
}

// Start the extension
new ProductExtension().initialize();
```

## Using Modern Frameworks

### React Extension

```bash
# Install React
npm install react react-dom

# Install types (TypeScript)
npm install --save-dev @types/react @types/react-dom
```

```tsx
// src/App.tsx
import React, { useEffect, useState } from 'react';
import { PIM, Product } from '@akeneo/extension-sdk';

export const App: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        await PIM.initialize();

        const context = await PIM.context.get();
        const productData = await PIM.api.product.get(context.product.uuid);

        setProduct(productData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const productName = product.values.name?.[0]?.data || 'Unnamed';

  return (
    <div className="product-extension">
      <h1>{productName}</h1>
      <p>SKU: {product.identifier}</p>
      <button onClick={() => handleEnhance(product)}>
        Enhance Product
      </button>
    </div>
  );
};

async function handleEnhance(product: Product) {
  try {
    await PIM.api.product.patch(product.uuid, {
      values: {
        // Your updates
      }
    });
    alert('Product enhanced!');
  } catch (error) {
    alert('Enhancement failed');
  }
}
```

```tsx
// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
```

### Vue Extension

```bash
# Install Vue
npm install vue

# Install types (TypeScript)
npm install --save-dev @vue/compiler-sfc
```

```vue
<!-- src/App.vue -->
<template>
  <div class="product-extension">
    <div v-if="loading">Loading...</div>

    <div v-else-if="error" class="error">
      Error: {{ error.message }}
    </div>

    <div v-else-if="product">
      <h1>{{ productName }}</h1>
      <p>SKU: {{ product.identifier }}</p>
      <button @click="handleEnhance">Enhance Product</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { PIM, Product } from '@akeneo/extension-sdk';

const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

const productName = computed(() => {
  return product.value?.values.name?.[0]?.data || 'Unnamed Product';
});

onMounted(async () => {
  try {
    await PIM.initialize();

    const context = await PIM.context.get();
    product.value = await PIM.api.product.get(context.product.uuid);
  } catch (err) {
    error.value = err as Error;
  } finally {
    loading.value = false;
  }
});

async function handleEnhance() {
  if (!product.value) return;

  try {
    await PIM.api.product.patch(product.value.uuid, {
      values: {
        // Your updates
      }
    });
    alert('Product enhanced!');
  } catch (err) {
    alert('Enhancement failed');
  }
}
</script>

<style scoped>
.product-extension {
  padding: 20px;
}

.error {
  color: #c00;
}
</style>
```

## Building and Bundling

### Webpack Configuration

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'extension.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  mode: 'production'
};
```

### Build Scripts

```json
{
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack --mode development --watch",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  }
}
```

## Example Projects

The SDK includes example projects:

### 1. Quickstart Example

Basic extension demonstrating:
- SDK initialization
- Context access
- Product data fetching
- Simple UI rendering

Location: `examples/quickstart`

### 2. Stock Data Panel

Advanced extension showing:
- External API calls
- Authentication
- Real-time data display
- Error handling
- Loading states

Location: `examples/stock-data-panel`

### Running Examples

```bash
cd examples/quickstart
npm install
make start
```

## Deployment

### Build for Production

```bash
# Build optimized bundle
npm run build

# Verify bundle size
ls -lh dist/extension.js
```

### Deploy via API

```bash
# Using the Makefile
make deploy

# Or manually via curl
curl --request POST "$PIM_URL/api/rest/v1/ui-extensions" \
  --header "Authorization: Bearer $TOKEN" \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "name": "my_custom_extension",
    "version": "1.0.0",
    "type": "custom_component",
    "position": "pim.product.tab",
    "configuration": {
      "default_label": "My Extension",
      "labels": {
        "en_US": "My Extension"
      }
    },
    "source_code": "/* bundled code here */"
  }'
```

### Version Management

Update the version when deploying changes:

```json
{
  "version": "1.1.0"  // Increment for each deployment
}
```

## Debugging

### Browser DevTools

```javascript
// Add breakpoints in your code
debugger;

// Log SDK calls
PIM.api.product.get(uuid).then(product => {
  console.log('Product loaded:', product);
});
```

### Error Handling

```javascript
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

### Network Monitoring

Monitor API calls in browser DevTools Network tab:
- Filter by XHR/Fetch
- Check request/response payloads
- Verify authentication headers

## Testing

### Unit Tests with Jest

```javascript
// src/__tests__/product.test.ts
import { PIM } from '@akeneo/extension-sdk';

// Mock the SDK
jest.mock('@akeneo/extension-sdk');

describe('Product Extension', () => {
  it('loads product data', async () => {
    const mockProduct = {
      uuid: '123',
      identifier: 'SKU001',
      values: {
        name: [{ data: 'Test Product' }]
      }
    };

    (PIM.api.product.get as jest.Mock).mockResolvedValue(mockProduct);

    const product = await PIM.api.product.get('123');
    expect(product.identifier).toBe('SKU001');
  });
});
```

### Integration Tests

Test with actual PIM instance:

```javascript
describe('Integration Tests', () => {
  beforeAll(async () => {
    await PIM.initialize();
  });

  it('fetches real product', async () => {
    const context = await PIM.context.get();
    const product = await PIM.api.product.get(context.product.uuid);

    expect(product).toBeDefined();
    expect(product.uuid).toBe(context.product.uuid);
  });
});
```

## Best Practices

### 1. Error Boundaries

```javascript
class ErrorBoundary {
  constructor() {
    window.addEventListener('error', this.handleError);
    window.addEventListener('unhandledrejection', this.handleRejection);
  }

  handleError(event) {
    console.error('Application error:', event.error);
    this.showErrorUI(event.error.message);
  }

  handleRejection(event) {
    console.error('Promise rejection:', event.reason);
    this.showErrorUI(event.reason);
  }

  showErrorUI(message) {
    const app = document.getElementById('app');
    app.innerHTML = `<div class="error">Error: ${message}</div>`;
  }
}

new ErrorBoundary();
```

### 2. Performance Optimization

```javascript
// Debounce user input
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const handleSearch = debounce(async (query) => {
  const results = await searchProducts(query);
  renderResults(results);
}, 300);
```

### 3. Code Splitting

```javascript
// Lazy load heavy components
async function loadChart() {
  const { Chart } = await import('./Chart');
  return Chart;
}
```

### 4. Environment-Specific Code

```javascript
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.example.com'
  : 'http://localhost:3000';
```

## Troubleshooting

### Extension Not Loading

**Check:**
- Extension is deployed correctly
- User has permission to see extension
- Position is valid for current context
- JavaScript console for errors

### API Calls Failing

**Check:**
- User has permissions for the operation
- Product/resource exists
- Request payload is valid
- Network tab for error responses

### Build Failures

**Check:**
- Node.js version is compatible
- Dependencies installed (`npm install`)
- No TypeScript errors (`npm run type-check`)
- Webpack configuration correct

## Learn More

- [Custom Component Extensions](/extensions/types/custom-component.html) - Overview
- [Available APIs](/extensions/development/available-apis.md) - API reference
- [SDK GitHub](https://github.com/akeneo/extension-sdk) - Source code and examples

::: panel-link Available APIs [Next](/extensions/development/available-apis.html)
:::
