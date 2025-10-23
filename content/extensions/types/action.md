# Action Extensions

## Overview

An **action** UI extension executes external tasks in the background when triggered by a user. When clicked, the PIM sends product/context data to your server endpoint via HTTP POST, executes your external logic, and displays a notification to the user when complete.

Actions are perfect for triggering workflows, executing batch operations, or integrating with external automation systems without requiring embedded UI.

## Use Cases

Action extensions are ideal for:

- **Workflow Triggers**: Start approval processes or external workflows
- **Batch Operations**: Trigger bulk updates or data synchronization
- **External System Integration**: Push data to ERP, CRM, or other systems
- **Data Validation**: Run external validation rules
- **Notification Systems**: Send alerts or notifications to external services
- **Export Operations**: Generate reports or export data to external storage

## Key Characteristics

### Single Execution
An action cannot be executed multiple times simultaneously. This ensures tasks are processed in a controlled manner and prevents duplicate operations.

### Menu Deactivation
During execution, the action button is disabled to prevent further interactions until the current task completes.

### Notification on Completion
A notification appears once your server responds, informing users of the task status (success or failure).

### Timeout
The PIM HTTP client has a timeout of 5 seconds. Your endpoint must respond within this time.

### HTTP POST Method
All requests use the POST method with JSON body containing context data.

### Optional Signature
Configure a `secret` to cryptographically sign the request body using SHA-512 protocol.

## Configuration

### Required Fields

- **name**: Technical identifier (no spaces or special characters)
- **position**: Where the action appears
- **type**: Must be `"action"`
- **configuration**:
  - **default_label**: The text displayed on the button
  - **url**: Your server endpoint that handles the action

### Optional Fields

- **configuration.secret**: Secret key for SHA-512 signature (32+ characters)
- **configuration.labels**: Localized button text
- **credentials**: Authentication headers for your endpoint
- **version**: Your extension version

## Example Configuration

### Basic Action

```json
{
  "name": "export_to_erp",
  "version": "1.0.0",
  "type": "action",
  "position": "pim.product.header",
  "configuration": {
    "url": "https://api.example.com/export-product",
    "default_label": "Export to ERP"
  }
}
```

### Action with Security

```json
{
  "name": "secure_export",
  "version": "1.0.0",
  "type": "action",
  "position": "pim.product.header",
  "configuration": {
    "url": "https://api.example.com/secure-export",
    "secret": "your-secret-key-min-32-chars-long",
    "default_label": "Secure Export",
    "labels": {
      "en_US": "Secure Export",
      "fr_FR": "Export sécurisé"
    }
  },
  "credentials": [
    {
      "type": "Bearer Token",
      "value": "your_auth_token"
    }
  ]
}
```

## Available Positions

Action extensions can be placed in:

| Position | Context | Data Sent |
|----------|---------|-----------|
| `pim.product.header` | Single product | `productUuid` |
| `pim.product-model.header` | Root product model | `productModelCode` |
| `pim.sub-product-model.header` | Sub product model | `productModelCode` |
| `pim.product-grid.action-bar` | Multiple products/models | `productUuids[]`, `productModelCodes[]` |
| `pim.product.index` | Product list page | No product data |

See the [Positions documentation](/extensions/positions.html) for visual examples.

## Request Format

### Workflow

Here's how an action executes:

[![action-extension-schema.png](../../img/extensions/ui-extensions/action-extension-schema.png)](../../img/extensions/ui-extensions/action-extension-schema.png)

### POST Body Structure

The PIM sends a JSON payload containing:

```json
{
  "data": { /* position-specific product data */ },
  "context": {
    "locale": "en_US",
    "channel": "ecommerce",
    "category": "master_category"  // only for grid actions
  },
  "user": {
    "uuid": "e05cc457-b8ac-43b1-baa7-c4c112091ad8",
    "username": "julia",
    "groups": ["Manager", "All"]
  },
  "timestamp": 1739948408
}
```

### Data by Position

#### Product Header (`pim.product.header`)

```json
{
  "data": {
    "productUuid": "ecfddba2-59bf-4d35-bd07-8ceeefde51fd"
  },
  "context": {
    "locale": "en_US",
    "channel": "ecommerce"
  },
  "user": {
    "uuid": "e05cc457-b8ac-43b1-baa7-c4c112091ad8",
    "username": "julia",
    "groups": ["Manager", "All"]
  },
  "timestamp": 1739948408
}
```

#### Product Model Header (`pim.product-model.header`)

```json
{
  "data": {
    "productModelCode": "apollon"
  },
  "context": { /* ... */ },
  "user": { /* ... */ },
  "timestamp": 1739948408
}
```

#### Product Grid Action Bar (`pim.product-grid.action-bar`)

::: warning
Maximum 500 selected products and product models combined.
:::

```json
{
  "data": {
    "productUuids": [
      "63139bf3-a7f7-4eaa-ba5e-6ffc8a2f14e9",
      "6fa3bd36-6b5a-4e80-afcd-c224fdf6f3ea"
    ],
    "productModelCodes": ["armor", "apollon"]
  },
  "context": {
    "locale": "en_US",
    "channel": "ecommerce",
    "category": "master_men_blazers"
  },
  "user": { /* ... */ },
  "timestamp": 1739948408
}
```

#### Product Index (`pim.product.index`)

```json
{
  "data": {},  // empty - no specific product context
  "context": { /* ... */ },
  "user": { /* ... */ },
  "timestamp": 1739948408
}
```

## Implementing Your Endpoint

### Basic Node.js Example

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/export-product', async (req, res) => {
  const { data, context, user, timestamp } = req.body;

  try {
    // Your business logic here
    const productUuid = data.productUuid;
    await exportProductToERP(productUuid, context);

    // Return success
    res.status(200).json({
      success: true,
      message: 'Product exported successfully'
    });
  } catch (error) {
    // Return error
    res.status(500).json({
      success: false,
      message: 'Export failed: ' + error.message
    });
  }
});
```

### With Signature Verification

```javascript
const crypto = require('crypto');

function verifySignature(body, signature, secret, timestamp) {
  // Verify timestamp to prevent replay attacks
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) { // 5 minute window
    return false;
  }

  // Calculate expected signature
  const payload = JSON.stringify(body);
  const expected = crypto
    .createHmac('sha512', secret)
    .update(payload)
    .digest('hex');

  return signature === expected;
}

app.post('/secure-export', (req, res) => {
  const signature = req.headers['x-akeneo-signature'];
  const secret = process.env.ACTION_SECRET;

  if (!verifySignature(req.body, signature, secret, req.body.timestamp)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process request...
});
```

## Security

### Request Signing

When you configure a `secret`, the PIM includes an `X-Akeneo-Signature` header containing a SHA-512 HMAC of the request body.

**Your endpoint should:**
1. Verify the signature matches
2. Check the timestamp to prevent replay attacks
3. Reject requests with invalid signatures

### Replay Attack Prevention

Use the `timestamp` field to ensure requests are recent:

```javascript
const FIVE_MINUTES = 300; // seconds
const now = Math.floor(Date.now() / 1000);

if (Math.abs(now - timestamp) > FIVE_MINUTES) {
  return res.status(401).json({ error: 'Request expired' });
}
```

### Authentication

Add credentials to include authentication headers in requests:

```json
{
  "credentials": [
    {
      "type": "Bearer Token",
      "value": "your_api_token"
    }
  ]
}
```

See [Credentials documentation](/extensions/security/credentials.html) for all authentication methods.

## Best Practices

### 1. Fast Response Times
Your endpoint must respond within 5 seconds:
- Process data asynchronously if possible
- Queue long-running tasks
- Return immediately with job ID

### 2. Meaningful Responses
Return clear status messages:

```json
{
  "success": true,
  "message": "Export started. Job ID: 12345"
}
```

### 3. Error Handling
Handle errors gracefully:

```json
{
  "success": false,
  "message": "Export failed: Product not found in ERP"
}
```

### 4. Idempotency
Make actions idempotent to handle retries safely:
- Check if operation already completed
- Use unique identifiers for operations
- Store operation state

### 5. Logging
Log all requests for debugging and audit:
- Request timestamp
- User information
- Operation result
- Error details

## URL Placeholders

Action URLs support dynamic placeholders:

```json
{
  "url": "https://api.example.com/products/%uuid%/export"
}
```

This is useful for REST APIs where the resource ID is in the path.

See [URL Placeholders](/extensions/integration/url-placeholders.html) for details.

## Limitations

- **5-second timeout**: Your endpoint must respond quickly
- **No retry mechanism**: Failed requests are not automatically retried
- **No progress updates**: Users don't see real-time progress
- **500 item limit**: Grid actions limited to 500 products/models
- **Single execution**: One action at a time per extension

## When to Use Another Type

Consider these alternatives:

- **Need to display UI?** → Use [Iframe Extensions](/extensions/types/iframe.html)
- **Just need a link?** → Use [Link Extensions](/extensions/types/link.html)
- **Need to show data?** → Use [Data Component Extensions](/extensions/types/data-component.html)
- **Need complex logic?** → Use [Custom Component Extensions](/extensions/types/custom-component.html)

## Learn More

- [Credentials](/extensions/security/credentials.html) - Authentication methods
- [URL Placeholders](/extensions/integration/url-placeholders.html) - Dynamic URLs
- [Positions](/extensions/positions.html) - Where to place actions
- [API Reference](/extensions/api.html) - Programmatic management

::: panel-link Data Component Extensions [Next](/extensions/types/data-component.html)
:::
