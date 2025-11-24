# Credentials

## Overview

Credentials allow your Extensions to make authenticated calls to external APIs and services. When you configure credentials for your extension, they are securely stored in the PIM and automatically included as headers in your API requests.

This system provides several key benefits:
- **Security**: Credentials are encrypted before storage and never exposed to the browser
- **Server-side Execution**: All authenticated API calls are made server-side
- **Ease of Use**: Simply reference a credential code in your extension - no manual header management needed
- **Multiple Authentication Methods**: Support for Bearer tokens, Basic Auth, and custom headers

## Available Credential Methods

| Method               | Header Format                                      | Use Case |
|----------------------|----------------------------------------------------|----------|
| Bearer Token         | `Authorization: Bearer {token_value}`              | OAuth 2.0, API tokens |
| Basic Authentication | `Authorization: Basic {base64(username:password)}` | Username/password APIs |
| Custom Header        | `{custom_header_key}: {custom_header_value}`       | Custom authentication schemes |

## Configuring Credentials

### Via the PIM UI

When creating or editing an Extension in the PIM interface, you can add credentials in the credentials section:

1. **Select Authentication Method**: Choose from Bearer Token, Basic Auth, or Custom Header
2. **Assign a Credential Code**: Enter a unique code to identify this credential (e.g., `erp_api_token`)
3. **Enter Credential Values**:
   - **Bearer Token**: Enter the token value
   - **Basic Auth**: Enter username and password
   - **Custom Header**: Enter the header key and value
4. **Save**: Credentials are encrypted and stored securely

[![basic-auth-credential.png](../../img/extensions/ui-extensions/basic-auth-credential.png)](../../img/extensions/ui-extensions/basic-auth-credential.png)

### Via the API

When deploying extensions via the REST API, you can include credentials in your request:

```bash
curl --location '{YOUR_PIM_HOST}/api/rest/v1/ui-extensions' \
  --header 'Authorization: Bearer {YOUR_API_TOKEN}' \
  --form 'name="my_extension"' \
  --form 'type="sdk_script"' \
  --form 'credentials[0][code]="api_credentials"' \
  --form 'credentials[0][type]="Bearer Token"' \
  --form 'credentials[0][value]="your_token_value"'
```

## Using Credentials in Your Extension

### External API Calls with Credentials

The SDK provides the `PIM.api.external.call()` method for making authenticated requests to external APIs. Use the `credentials_code` parameter to reference stored credentials:

```js
// Make an authenticated GET request
const response = await PIM.api.external.call({
  method: 'GET',
  url: 'https://api.example.com/data',
  credentials_code: 'api_credentials' // References the stored credential
});

const data = await response.json();
console.log('Data from external API:', data);
```

### Credential Codes

Each credential is identified by a unique **code** that you define when creating the credential. This code is used in your extension to reference which credential should be used for the API call.

**Example with Bearer Token:**
```js
// Configured credential code: 'erp_bearer_token'
// Type: Bearer Token
// Value: 'abc123xyz789'

const erpData = await PIM.api.external.call({
  method: 'GET',
  url: 'https://erp.example.com/api/products',
  credentials_code: 'erp_bearer_token'
});
```

The PIM will automatically add the header: `Authorization: Bearer abc123xyz789`

**Example with Basic Auth:**
```js
// Configured credential code: 'warehouse_auth'
// Type: Basic Authentication
// Username: 'api_user'
// Password: 'secret_password'

const inventory = await PIM.api.external.call({
  method: 'GET',
  url: 'https://warehouse.example.com/api/inventory',
  credentials_code: 'warehouse_auth'
});
```

The PIM will automatically add the header: `Authorization: Basic {base64(api_user:secret_password)}`

**Example with Custom Header:**
```js
// Configured credential code: 'custom_api_key'
// Type: Custom Header
// Header Key: 'X-API-Key'
// Header Value: 'my-secret-key-12345'

const externalData = await PIM.api.external.call({
  method: 'POST',
  url: 'https://service.example.com/api/data',
  credentials_code: 'custom_api_key',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query: 'products' })
});
```

The PIM will automatically add the header: `X-API-Key: my-secret-key-12345`

### Multiple Credentials

You can configure multiple credentials for a single extension and use different credentials for different API calls:

```js
// Use ERP credentials for inventory data
const inventory = await PIM.api.external.call({
  method: 'GET',
  url: 'https://erp.example.com/inventory',
  credentials_code: 'erp_credentials'
});

// Use CRM credentials for customer data
const customers = await PIM.api.external.call({
  method: 'GET',
  url: 'https://crm.example.com/customers',
  credentials_code: 'crm_credentials'
});
```

## Security Best Practices

### Never Hardcode Credentials

**❌ Don't do this:**
```js
// BAD: Credentials exposed in browser
const response = await PIM.api.external.call({
  method: 'GET',
  url: 'https://api.example.com/data',
  headers: {
    'Authorization': 'Bearer my-secret-token-12345' // NEVER DO THIS!
  }
});
```

**✅ Do this instead:**
```js
// GOOD: Use stored credentials
const response = await PIM.api.external.call({
  method: 'GET',
  url: 'https://api.example.com/data',
  credentials_code: 'api_token' // Secure, server-side
});
```

### Why This Matters

Your extension code runs in the user's browser. Any credentials hardcoded in your JavaScript file can be:
- Viewed in browser developer tools
- Extracted from network requests
- Stolen by malicious users

By using the `credentials_code` parameter:
- Credentials are stored encrypted in the PIM database
- API calls are made server-side by the PIM
- Credentials never reach the browser or client-side code
- Your sensitive data remains protected

### Additional Security Tips

1. **Rotate Credentials Regularly**: Update stored credentials periodically
2. **Use Least Privilege**: Grant only the minimum permissions needed for external APIs
3. **Monitor Usage**: Track which extensions are accessing external services
4. **Validate Responses**: Always validate data received from external APIs
5. **Handle Errors Gracefully**: Don't expose sensitive information in error messages

## Complete Example

Here's a complete example showing credential setup and usage:

```js
// Extension configuration has these credentials:
// - Code: 'product_api_token'
// - Type: Bearer Token
// - Value: (stored securely in PIM)

async function syncProductData(productUuid) {
  try {
    // Get product data from PIM
    const product = await PIM.api.product_uuid_v1.get({
      uuid: productUuid
    });

    // Send to external service using credentials
    const response = await PIM.api.external.call({
      method: 'POST',
      url: 'https://external-service.com/api/products',
      credentials_code: 'product_api_token',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sku: product.identifier,
        name: product.values.name,
        price: product.values.price
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Product synced successfully:', result);
      return result;
    } else {
      throw new Error(`API error: ${response.status}`);
    }
  } catch (error) {
    console.error('Sync failed:', error.message);
    // Handle error appropriately
  }
}
```

## Troubleshooting

### Credential Not Found

If you see an error about credentials not being found:
- Verify the `credentials_code` matches exactly what was configured
- Check that the credential is saved in the extension configuration
- Ensure the extension has been redeployed after adding credentials

### Unauthorized Errors

If external API calls return 401 or 403 errors:
- Verify the credential values are correct
- Check if the external API token has expired
- Ensure the external API endpoint allows requests from your PIM server IP

### Domain Allowlisting

Remember that external API domains must be allowlisted in your extension configuration for security purposes.
