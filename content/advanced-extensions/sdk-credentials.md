# Credentials

## Overview

Credentials allow your Extensions to make authenticated calls to external APIs and services. When you configure credentials for your extension, they are securely stored in the PIM and automatically included as headers in your API requests.

## Available Credential Methods

| Method               | Header Format                                      | Use Case |
|----------------------|----------------------------------------------------|----------|
| Bearer Token         | `Authorization: Bearer {token_value}`              | OAuth 2.0, API tokens |
| Basic Authentication | `Authorization: Basic {base64(username:password)}` | Username/password APIs |
| Custom Header        | `{custom_header_key}: {custom_header_value}`       | Custom authentication schemes |
| OAuth2               | `Authorization: Bearer {fetched_access_token}`     | APIs requiring a short-lived token obtained from a token endpoint |

With the first three methods, you store the exact value that is sent in the header. With **OAuth2**, you store the details of a token endpoint instead, and the PIM obtains the access token for you on each call. OAuth2 is specific to Custom Components, see [OAuth2 Credentials](#oauth2-credentials).

## Configuring Credentials

### Via the PIM UI

When creating or editing an Extension in the PIM interface, you can add credentials in the credentials section:

1. **Assign a Credential Code**: Enter a unique code to identify this credential (e.g., `erp_api_token`)
2. **Select Authentication Method**: Choose from Bearer Token, Basic Auth, Custom Header or OAuth2
3. **Enter Credential Values**:
   - **Bearer Token**: Enter the token value
   - **Basic Auth**: Enter username and password
   - **Custom Header**: Enter the header key and value
   - **OAuth2**: Select a grant type, then enter the token endpoint and client details
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

## OAuth2 Credentials

Many APIs do not accept a long-lived token. They expose a token endpoint, and expect you to exchange client credentials for a short-lived access token before every call. The OAuth2 credential type lets the PIM perform that exchange server-side, so your extension code never fetches, stores or refreshes a token itself.

::: warning
OAuth2 is only available on Custom Component extensions, where the token is used by `PIM.api.external.call()`. The other extension types, **Action**, **Link**, **Iframe** and **Data Component**, do not support it: the PIM does not offer the OAuth2 method when you configure their credentials, and a request sending one through the API is rejected with a validation error. Use Bearer Token, Basic Authentication or a Custom Header for those.
:::

### Grant Types

Two grant types are available, selected with the **Grant Type** field:

| Grant type | Field value | Use case |
|------------|-------------|----------|
| Client Credentials | `client_credentials` | Machine-to-machine authentication against an identity provider such as Okta or Auth0 |
| Password Grant | `password_grant` | Connecting to another Akeneo PIM's Web API, which requires client credentials plus a user account |

### Client Credentials Grant

| Field           | Required | Description |
|-----------------|----------|-------------|
| `token_url`     | Yes      | The token endpoint of your identity provider |
| `client_id`     | Yes      | The client identifier |
| `client_secret` | Yes      | The client secret |
| `scope`         | No       | The requested scope, if your provider expects one |
| `audience`      | No       | The requested audience, expected by some providers such as Auth0 |
| `header_name`   | No       | The header used to send the access token. Defaults to `Authorization`, with the token sent as `Bearer {access_token}`. Under any other header name, for example `X-PIM-TOKEN`, the raw token is sent without the `Bearer` prefix |

[![oauth2-credential-client-credentials.png](../../img/extensions/ui-extensions/oauth2-credential-client-credentials.png)](../../img/extensions/ui-extensions/oauth2-credential-client-credentials.png)

The PIM sends `grant_type=client_credentials` to the token endpoint, with `client_id` and `client_secret` in the request body.

```bash
curl --location '{YOUR_PIM_HOST}/api/rest/v1/ui-extensions' \
  --header 'Authorization: Bearer {YOUR_API_TOKEN}' \
  --form 'name="my_extension"' \
  --form 'type="sdk_script"' \
  --form 'credentials[0][code]="erp_oauth2"' \
  --form 'credentials[0][type]="OAuth2"' \
  --form 'credentials[0][value][grant_type]="client_credentials"' \
  --form 'credentials[0][value][token_url]="https://auth.example.com/oauth/token"' \
  --form 'credentials[0][value][client_id]="my_client_id"' \
  --form 'credentials[0][value][client_secret]="my_client_secret"' \
  --form 'credentials[0][value][scope]="products:read"'
```

::: info
Unlike the other credential types, whose `value` is a single string, an OAuth2 `value` is an object holding the grant type and its fields.
:::

### Password Grant

| Field           | Required | Description |
|-----------------|----------|-------------|
| `token_url`     | Yes      | The token endpoint, for example `https://your-pim.cloud.akeneo.com/api/oauth/v1/token` |
| `client_id`     | Yes      | The client identifier |
| `client_secret` | Yes      | The client secret |
| `username`      | Yes      | The username of the account used to authenticate |
| `password`      | Yes      | The password of that account |
| `scope`         | No       | The requested scope, if the token endpoint expects one |
| `header_name`   | No       | The header used to send the access token. Defaults to `Authorization`, with the token sent as `Bearer {access_token}`. Under any other header name, for example `X-PIM-TOKEN`, the raw token is sent without the `Bearer` prefix |

[![oauth2-credential-password-grant.png](../../img/extensions/ui-extensions/oauth2-credential-password-grant.png)](../../img/extensions/ui-extensions/oauth2-credential-password-grant.png)

The PIM sends `grant_type=password` to the token endpoint, with the username and password in the request body, and the client credentials as an HTTP Basic authentication header. Some providers only accept client credentials one way or the other, so check what your token endpoint expects before choosing a grant type.

::: warning
Use a dedicated API user for this connection rather than a personal account, since its username and password are stored to authenticate the connection. If the account is disabled or its password is rotated, every external call using this credential starts failing.
:::

### Token Lifecycle

The PIM requests a new access token for every external call. Nothing is cached, which costs one additional round-trip to the token endpoint per call, but means that a revoked token or a rotated secret takes effect immediately.

The token request itself is subject to the following constraints:

- The `token_url` must point to a publicly reachable address. Internal and private addresses are rejected, exactly as they are for the external call itself.
- The token endpoint must answer within 10 seconds.
- Redirects returned by the token endpoint are not followed.

### Editing an OAuth2 Credential

When you read an extension, `client_secret` and `password` are returned masked. Saving the extension with those masked values keeps the stored secrets untouched, so you can update the other fields without re-entering them.

::: warning
Changing `token_url` is the exception: the real `client_secret`, and the real `password` for the password grant, must be sent again in the same request. Otherwise the save is rejected, so that secrets are never sent to a different endpoint than the one they were entered for.
:::

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

**Example with OAuth2:**
```js
// Configured credential code: 'erp_oauth2'
// Type: OAuth2
// Grant Type: Client Credentials
// Token URL: 'https://auth.example.com/oauth/token'
// Client ID / Client Secret: (stored securely in PIM)

const erpOrders = await PIM.api.external.call({
  method: 'GET',
  url: 'https://erp.example.com/api/orders',
  credentials_code: 'erp_oauth2'
});
```

The PIM requests an access token from the token endpoint, then adds the header: `Authorization: Bearer {access_token}`. Your extension code is identical to the other credential types: nothing about the token exchange appears in it.

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

### Prefer Short-Lived Tokens

When the external API supports it, an OAuth2 credential is safer than a stored Bearer token: the PIM stores the client credentials rather than a token, the access token it obtains is short-lived, and revoking access on the provider side takes effect on the very next call.

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

### OAuth2 Token Fetch Failure

When the PIM cannot obtain an access token, the external call is not sent at all. It returns a `502` status with the following body:

```json
{
  "code": "OAUTH2_TOKEN_FETCH_FAILED",
  "message": "Unable to fetch an OAuth2 access token from the token endpoint.",
  "tokenEndpointStatusCode": 401
}
```

`tokenEndpointStatusCode` is the status returned by your token endpoint, which is the fastest way to tell the causes apart:
- `400` or `401`: the client credentials, or the username and password for the password grant, are wrong or no longer valid. Check also whether your provider expects them in the request body or as a Basic authentication header, which depends on the grant type you selected.
- `403`: the client is authenticated but not allowed to request this `scope` or `audience`.
- `404`: the `token_url` is wrong. A provider's authorization URL is not its token URL.

If the failure is not an HTTP status, check that the token endpoint is publicly reachable, answers within 10 seconds, and does not reply with a redirect.

::: panel-link FAQ [Next](/advanced-extensions/faq.html)
:::
