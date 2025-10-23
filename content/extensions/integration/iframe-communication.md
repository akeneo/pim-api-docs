# Iframe Communication

## Overview

Iframe extensions can communicate with the PIM using the [PostMessage API](https://developer.mozilla.org/docs/Web/API/Window/postMessage). This enables bidirectional data exchange between your embedded application and the PIM interface.

Communication patterns vary by position and use case. This guide covers all available communication mechanisms.

## Default Query Parameters

For most positions, the PIM automatically sends contextual information as URL query parameters when loading your iframe.

### Always Included

These parameters are sent for all iframe positions:

- `user[uuid]` - User's unique identifier
- `user[id]` - User's legacy ID
- `user[username]` - Username
- `user[email]` - Email address
- `user[ui_locale]` - User interface language (e.g., `en_US`)
- `user[catalog_locale]` - Catalog locale setting (except `pim.product-grid.action-bar`)
- `user[catalog_scope]` - Catalog channel/scope (except `pim.product-grid.action-bar`)
- `position` - Extension position identifier
- `tenant` - PIM instance/tenant identifier

### Position-Specific Parameters

#### Product Tab (`pim.product.tab`)
- `product[uuid]` - Product UUID
- `product[identifier]` - Product identifier value

#### Product Model Tabs
For `pim.product-model.tab` and `pim.sub-product-model.header`:
- `product[code]` - Product model code

#### Category Tab (`pim.category.tab`)
- `category[code]` - Category code

### Example URL

If your configured URL is:
```
https://customerwebsite.com/iframe/
```

The called URL becomes:
```
https://customerwebsite.com/iframe/?position=pim.product.tab&user[username]=julia&product[uuid]=abc-123
```

### Accessing Query Parameters

```javascript
// Parse URL parameters
const params = new URLSearchParams(window.location.search);

const productUuid = params.get('product[uuid]');
const username = params.get('user[username]');
const position = params.get('position');

console.log('Product:', productUuid);
console.log('User:', username);
console.log('Position:', position);
```

## PostMessage Communication

For positions where query parameters are insufficient (like bulk operations), or when you need dynamic updates, use the PostMessage API.

### Receiving Messages from PIM

Your iframe can listen for messages sent by the PIM:

```javascript
window.addEventListener('message', (event) => {
  // Always verify the origin for security
  if (event.origin !== 'https://your-pim-domain.com') {
    return;
  }

  console.log('Received from PIM:', event.data);

  // Handle the message
  handlePimMessage(event.data);
});
```

### Product Grid Action Bar Data

For the **product grid action bar position** (`pim.product-grid.action-bar`), passing product information via query parameters would create excessively long URLs. Instead, the PIM uses PostMessage.

**After iframe loads**, the PIM sends:

```json
{
  "data": {
    "productUuids": [
      "63139bf3-a7f7-4eaa-ba5e-6ffc8a2f14e9",
      "6fa3bd36-6b5a-4e80-afcd-c224fdf6f3ea",
      "78f38e4a-8d25-41e1-8e09-42a9c246689a"
    ],
    "productModelCodes": ["armor", "apollon"]
  },
  "context": {
    "locale": "en_US",
    "channel": "ecommerce"
  },
  "user": {
    "uuid": "4ebad9a4-7728-4d90-9db0-9e5a5c6a4d45",
    "username": "admin",
    "groups": ["IT support", "All"]
  }
}
```

**Example implementation:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Bulk Action Extension</title>
</head>
<body>
    <h1>Selected Products</h1>
    <div id="product-list"></div>

    <script>
        window.addEventListener('message', (event) => {
            // Verify origin
            if (event.origin !== 'https://your-pim.cloud.akeneo.com') {
                return;
            }

            const { data, context, user } = event.data;

            // Display selected products
            const list = document.getElementById('product-list');
            list.innerHTML = `
                <p>Selected Products: ${data.productUuids.length}</p>
                <p>Selected Models: ${data.productModelCodes.length}</p>
                <p>Context: ${context.locale} - ${context.channel}</p>
            `;

            // Process the selection
            processProducts(data.productUuids, data.productModelCodes);
        });
    </script>
</body>
</html>
```

### Requesting Context Data

For modern frameworks (React, Vue, etc.) where the iframe may load before components mount, you can explicitly request context data:

```javascript
// Request context from PIM
window.parent.postMessage(
  {
    type: 'request_context'
  },
  "*"
);

// Then listen for the response
window.addEventListener('message', (event) => {
  if (event.data.type === 'CONTEXT_DATA') {
    handleContext(event.data);
  }
});
```

**React example:**

```jsx
import { useEffect, useState } from 'react';

function ProductPanel() {
  const [context, setContext] = useState(null);

  useEffect(() => {
    // Request context on mount
    window.parent.postMessage({ type: 'request_context' }, '*');

    // Listen for response
    const handleMessage = (event) => {
      if (event.data.type === 'CONTEXT_DATA') {
        setContext(event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!context) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product: {context.data.productUuid}</h1>
      <p>User: {context.user.username}</p>
    </div>
  );
}
```

## Context Change Events

For product and product model positions, the PIM propagates **context changes** to your iframe when the user changes locale or channel.

**Applies to positions:**
- `pim.product-model.header`
- `pim.sub-product-model.header`
- `pim.product.header`

**Message format:**

```json
{
  "context": {
    "locale": "en_US",
    "channel": "ecommerce"
  },
  "user": {
    "uuid": "c71228d3-695c-4ded-8f3d-b3ed881a1f59",
    "username": "admin",
    "groups": ["IT support", "All"]
  }
}
```

**Handling context changes:**

```javascript
window.addEventListener('message', (event) => {
  const message = event.data;

  // Check if this is a context change
  if (message.context && message.user) {
    console.log('Context changed!');
    console.log('New locale:', message.context.locale);
    console.log('New channel:', message.context.channel);

    // Reload data for new context
    reloadDataForContext(message.context);
  }
});
```

## Reloading the Parent Page

After performing an action in your iframe, you may need to refresh the parent PIM page to reflect changes. Due to browser security constraints, direct access to the parent window is restricted.

**To trigger a page reload:**

```javascript
window.parent.postMessage(
  {
    type: 'reload_parent'
  },
  "*"
);
```

This instructs the PIM to reload the current page.

**Use cases:**
- After updating product data
- After saving changes
- After completing a workflow

**Example with confirmation:**

```javascript
async function saveProductChanges(productUuid, changes) {
  try {
    // Save changes via API
    await saveToAPI(productUuid, changes);

    // Show success message
    showNotification('Changes saved successfully');

    // Reload parent to show changes
    window.parent.postMessage({ type: 'reload_parent' }, '*');
  } catch (error) {
    showError('Failed to save changes');
  }
}
```

## Complete Communication Example

Here's a comprehensive example showing all communication patterns:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Product Enhancement Tool</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        .loading { color: #999; }
        .error { color: #c00; }
        .success { color: #090; }
    </style>
</head>
<body>
    <div id="app">
        <p class="loading">Loading...</p>
    </div>

    <script>
        let currentContext = null;

        // Initialize
        function init() {
            // Request context data
            window.parent.postMessage({ type: 'request_context' }, '*');

            // Listen for messages
            window.addEventListener('message', handleMessage);
        }

        function handleMessage(event) {
            // Verify origin (important for security!)
            // if (event.origin !== 'https://your-pim.cloud.akeneo.com') return;

            const message = event.data;

            // Handle different message types
            if (message.type === 'CONTEXT_DATA' || (message.data && message.user)) {
                handleContextData(message);
            } else if (message.context && !message.data) {
                handleContextChange(message);
            }
        }

        function handleContextData(message) {
            currentContext = message;

            const { data, context, user } = message;

            // Render UI
            const app = document.getElementById('app');
            app.innerHTML = `
                <h2>Product Enhancement Tool</h2>
                <div>
                    <strong>Product:</strong> ${data.productUuid || 'N/A'}
                </div>
                <div>
                    <strong>User:</strong> ${user.username}
                </div>
                <div>
                    <strong>Context:</strong> ${context.locale} - ${context.channel}
                </div>
                <button onclick="enhanceProduct()">Enhance Product</button>
            `;
        }

        function handleContextChange(message) {
            console.log('Context changed:', message.context);

            // Update current context
            currentContext.context = message.context;
            currentContext.user = message.user;

            // Reload data for new context
            loadProductData(currentContext.data.productUuid, message.context);
        }

        async function enhanceProduct() {
            const app = document.getElementById('app');

            try {
                // Perform enhancement
                await performEnhancement(currentContext.data.productUuid);

                app.innerHTML += '<p class="success">Enhancement complete!</p>';

                // Wait a moment then reload parent
                setTimeout(() => {
                    window.parent.postMessage({ type: 'reload_parent' }, '*');
                }, 1000);
            } catch (error) {
                app.innerHTML += `<p class="error">Error: ${error.message}</p>`;
            }
        }

        async function performEnhancement(productUuid) {
            // Your enhancement logic here
            return new Promise(resolve => setTimeout(resolve, 1000));
        }

        async function loadProductData(productUuid, context) {
            console.log('Loading data for:', productUuid, context);
            // Your data loading logic
        }

        // Start the application
        init();
    </script>
</body>
</html>
```

## Best Practices

### 1. Always Verify Origin
Protect against malicious messages:

```javascript
window.addEventListener('message', (event) => {
  // Check origin
  const allowedOrigins = [
    'https://your-pim.cloud.akeneo.com',
    'https://staging-pim.cloud.akeneo.com'
  ];

  if (!allowedOrigins.includes(event.origin)) {
    console.warn('Rejected message from:', event.origin);
    return;
  }

  // Process message
  handleMessage(event.data);
});
```

### 2. Request Context Explicitly
Don't assume context is available immediately:

```javascript
// ✅ Good - request and wait
requestContext();
waitForContext().then(renderApp);

// ❌ Bad - assume it's there
const context = window.pimContext; // undefined!
```

### 3. Handle Missing Data
Not all positions provide all data:

```javascript
const productUuid = params.get('product[uuid]');

if (!productUuid) {
  showMessage('No product context available');
  return;
}
```

### 4. Debounce Context Changes
Context may change rapidly as users switch locales:

```javascript
let contextChangeTimeout;

function handleContextChange(newContext) {
  clearTimeout(contextChangeTimeout);

  contextChangeTimeout = setTimeout(() => {
    reloadData(newContext);
  }, 500); // Wait 500ms for changes to settle
}
```

### 5. Clean Up Listeners
Remove event listeners when appropriate:

```javascript
function cleanup() {
  window.removeEventListener('message', messageHandler);
}

// In React
useEffect(() => {
  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);
```

## Debugging

### Log All Messages

```javascript
window.addEventListener('message', (event) => {
  console.group('PostMessage Received');
  console.log('Origin:', event.origin);
  console.log('Data:', event.data);
  console.groupEnd();

  // Your handling code
});
```

### Test Context Requests

```javascript
// Send request
console.log('Requesting context...');
window.parent.postMessage({ type: 'request_context' }, '*');

// Log response
window.addEventListener('message', (event) => {
  console.log('Context received:', event.data);
});
```

## Security Considerations

PostMessage communication has security implications:

1. **Always validate origin** - Check `event.origin`
2. **Validate message structure** - Ensure expected fields exist
3. **Sanitize data** - Don't trust message content blindly
4. **Use HTTPS** - Secure communication channel
5. **Implement JWT verification** - See [Iframe Security](/extensions/security/iframe-security.html)

## Learn More

- [Iframe Extensions](/extensions/types/iframe.html) - Basic iframe setup
- [Iframe Security](/extensions/security/iframe-security.html) - JWT and authentication
- [Positions](/extensions/positions.html) - Available iframe positions
- [MDN: PostMessage API](https://developer.mozilla.org/docs/Web/API/Window/postMessage)

::: panel-link URL Placeholders [Next](/extensions/integration/url-placeholders.html)
:::
