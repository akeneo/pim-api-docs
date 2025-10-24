# API Deployement

// TODO: j'ai collé en vrac des trucs à réorganiser et à completer

## Development Workflow

To get started with an example, navigate to one of the project folders (e.g., `examples/quickstart`) and follow the instructions in its `README.md` file.

The general workflow is:

1.  **Run the setup command**:
    ```bash
    make start
    ```
    This command installs dependencies, helps you configure your environment, and creates the UI extension in your PIM for the first time.

2.  **Develop and Update**:
    Modify the source code in the `src/` directory. To see your changes in the PIM, you can either:
    - Run `make update-dev` to manually build and push an update.
    - Run `make watch` to automatically update the extension whenever you save a file.

This streamlined process, powered by the shared `Makefile`, handles building, API token management, and uploading for you.

To help you with development, we have created several examples in the `examples/` folder.

| Example                  | Description                                                                          | Link                                                                    |
|--------------------------|--------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| **Quickstart**           | A basic "Hello World" example to get you started with the fundamental project setup. | [Go to Quickstart](./examples/quickstart/README.md)                     |
| **Stock Data on Panel**  | A more advanced example showing how to fetch and display external data in a panel.   | [Go to Stock Data on Panel](./examples/stock_data_on_panel/README.md)   |

## API Commands for SDK Deployment

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

### Quick Start Example

Here's a simple example showing how to use the SDK to list assets from a specific family:

```typescript
// Access the Asset API
const assetApi = PIM.api.asset_v1;

// List assets with filters
const listParams = {
  assetFamilyCode: 'packshots',
};

// Call the API and handle the response
try {
  const assetList = await assetApi.list(listParams);
  console.log('Assets found:', assetList);
} catch (error) {
  console.error('Error fetching assets:', error);
}
```

// TODO: c'est le readme du quick start, y'a surement des choses à récupérer

# SDK script example: Quickstart
This is a quickstart example for building a UI extension.

## Prerequisites
Before you begin, you need an active connection to an Akeneo PIM sandbox.
To learn more about setting up your connection, please follow the instructions in the [official documentation](https://api.akeneo.com/getting-started/connect-the-pim-4x/step-1.html#you-said-connection).

## Get started
To begin, run the setup command:
```bash
make start
```
...and follow the interactive instructions in your terminal. This will install dependencies, configure your environment, and create the extension in your PIM for the first time.

## Development

### Uploading changes
To upload your changes to Akeneo, use the following command. This will build the extension for development and push it to the PIM.
```bash
make update-dev
```

### Automatic updates (hot-reload)
To have your extension automatically update every time you save a code change, run the watch command:
```bash
make watch
```
This is highly recommended for an efficient development workflow.

## Customization

### Application logic
All the frontend logic is located in `src/App.tsx`. Please update this file to match your needs.

### Extension configuration
The `extension_configuration.json` file is crucial for defining how your UI extension behaves and appears within Akeneo PIM. Below is a detailed breakdown of its properties.

| Key | Type | Description | Required |
| --- | --- | --- | --- |
| `name` | `string` | A unique identifier for your extension. It's recommended to use a descriptive name, like `my-app-name`. | Yes |
| `type` | `string` | Defines the type of extension. For SDK scripts, this should always be `sdk_script`. | Yes |
| `position` | `string` | Determines where the extension will be displayed in the PIM interface. Examples: `pim.product.panel`, `pim.activity.navigation.tab`. See the [official documentation](https://api.akeneo.com/extensions/positions.html#available-positions-for-ui-extensions) for all available positions. | Yes |
| `file` | `string` | The path to the compiled JavaScript file for your extension, relative to the project root. This is used by the build process (Vite) to name the output file. Example: `dist/my-app.js`. | Yes |
| `configuration` | `object` | An object containing display settings for your extension. | Yes |
| `configuration.default_label` | `string` | The default label for your extension, displayed if no translation is available for the user's locale. | Yes |
| `configuration.labels` | `object` | A key-value map of translations for your extension's label. The key is the locale (e.g., `en_US`, `fr_FR`) and the value is the translated label. | No |
| `credentials` | `array` | An array of objects defining credentials that your extension may need to interact with external services. Each object represents a credential. | No |

#### Credentials object
Each object in the `credentials` array can have the following properties:

| Key | Type | Description |
| --- | --- | --- |
| `code` | `string` | A unique code to identify the credential within your extension. |
| `type` | `string` | The type of authentication. Supported values are `Bearer Token`, `Basic Auth`, and `Custom Header`. |
| `value` | `string` or `object` | The value(s) for the credential. For `Bearer Token` or `Custom Header`, this is a string. For `Basic Auth`, this is an object with `username` and `password`. |

**Example of `credentials`:**
```json
{
  "credentials": [
    {
      "code": "code_to_identify_the_credential",
      "type": "Bearer Token",
      "value": "your_auth_token"
    },
    {
      "code": "code_to_identify_the_credential",
      "type": "Basic Auth",
      "value": {
        "username": "your_username",
        "password": "your_password"
      }
    },
    {
        "code": "code_to_identify_the_credential",
        "type": "Custom Header",
        "value": {
          "header_key": "your_header_key",
          "header_value": "your_header_value"   
        }
    }
  ]
}
```

## Build for production
Once your project is finished, you can build it for production with the command:
```bash
make build
```
This will create an optimized production build in `dist/demo.js`.

To deploy this production version, use:
```bash
make update
```

## API reference
Several choices are offered to deep dive into our API, to discover all the endpoints, and their request/response schema:

- You can <a href="https://api.akeneo.com/api-reference-index.html#UIExtensions" target="_blank">consult this static documentation</a>
- Discover it thanks to <a href="https://api.akeneo.com/files/Akeneo%20PIM%20API.postman_collection.json" target="_blank">the postman collection</a> (see the [Postman section](https://api.akeneo.com/extensions/getting-started.html#using-postman))

::: panel-link [Learn more about how to manage your credentials](/advanced-extensions/sdk-credentials.html)
:::