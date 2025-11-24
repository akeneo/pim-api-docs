# API Deployment

## Overview

This page describes how to deploy Extensions programmatically using the Akeneo PIM REST API. This method is ideal for automated deployments, CI/CD pipelines, and managing extensions across multiple environments.

::: info
If you prefer a manual deployment method that doesn't require an API token, check out the [UI deployment guide](/advanced-extensions/ui-deployment.html).
:::

## Prerequisites

Before using the API to deploy extensions, you need:
- An active Akeneo PIM instance
- A valid API token with appropriate permissions
- Your extension built and ready to deploy (typically in the `dist/` folder)

[Learn how to connect to the PIM and generate API tokens](https://api.akeneo.com/getting-started/connect-the-pim-4x/step-1.html#you-said-connection)

## API Commands

### Uploading an SDK Extension

If you don't use our provided makefile to upload your extension to the Akeneo PIM, you can use the following curl command:

```bash
curl --location '{YOUR_PIM_HOST}/api/rest/v1/ui-extensions' \
  --header 'Authorization: Bearer {YOUR_API_TOKEN}' \
  --form 'name="sdk_script_extension"' \
  --form 'type="sdk_script"' \
  --form 'position="pim.activity.navigation.tab"' \
  --form 'file=@"{YOUR_PROJECT_PATH}/dist/demo.js"' \
  --form 'configuration[labels][en_US]="SDK script test extension"' \
  --form 'configuration[default_label]="SDK script test extension"'
```

You can also add credentials to your extension with additional form parameters:
```bash
  --form 'credentials[0][code]="credential_code_example"' \
  --form 'credentials[0][type]="Bearer Token"' \
  --form 'credentials[0][value]="token_value"'
```

### Updating an Existing SDK Extension

To update an existing extension, you need to include the extension UUID in the endpoint:

```bash
curl -X POST '{YOUR_PIM_HOST}/api/rest/v1/ui-extensions/{YOUR_EXTENSION_UUID}' \
  -H "Content-Type: multipart/form-data" \
  --header 'Authorization: Bearer {YOUR_API_TOKEN}' \
  --form 'name="sdk_script_extension"' \
  --form 'type="sdk_script"' \
  --form 'position="pim.activity.navigation.tab"' \
  --form 'file=@"{YOUR_PROJECT_PATH}/dist/demo.js"' \
  --form 'configuration[labels][en_US]="SDK script test extension"' \
  --form 'configuration[default_label]="SDK script test extension"'
```

::: info
You can find the extension UUID by listing all extensions using the API: `GET {YOUR_PIM_HOST}/api/rest/v1/ui-extensions`
:::

## Parameters Reference

### Required Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `name` | Unique identifier for your extension | `"my-custom-extension"` |
| `type` | Must be `sdk_script` for SDK extensions | `"sdk_script"` |
| `position` | Where the extension appears in the PIM UI | `"pim.product.panel"` |
| `file` | Path to your built JavaScript file | `@"/path/to/dist/app.js"` |
| `configuration[default_label]` | Default display label | `"My Extension"` |

### Optional Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `configuration[labels][{locale}]` | Localized labels | `configuration[labels][en_US]="My Extension"` |
| `credentials[{n}][code]` | Credential identifier | `credentials[0][code]="api_token"` |
| `credentials[{n}][type]` | Auth type: `Bearer Token`, `Basic Auth`, or `Custom Header` | `credentials[0][type]="Bearer Token"` |
| `credentials[{n}][value]` | Credential value(s) | `credentials[0][value]="token123"` |

## API Reference

Several choices are offered to deep dive into our API, to discover all the endpoints, and their request/response schema:

- You can <a href="https://api.akeneo.com/api-reference-index.html#UIExtensions" target="_blank">consult the static documentation</a>
- Discover it thanks to <a href="https://api.akeneo.com/files/akeneo-postman-collection.json" target="_blank">the postman collection</a>

::: panel-link [Learn more about the UI deployment](/advanced-extensions/ui-deployment.html)
:::
