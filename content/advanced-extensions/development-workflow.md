# Development Workflow

## Getting Started

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

## Examples

To help you with development, we have created several examples in the `examples/` folder.

| Example                  | Description                                                                          | Link                                                                    |
|--------------------------|--------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| **Quickstart**           | A basic "Hello World" example to get you started with the fundamental project setup. | [Go to Quickstart](./examples/quickstart/README.md)                     |
| **Stock Data on Panel**  | A more advanced example showing how to fetch and display external data in a panel.   | [Go to Stock Data on Panel](./examples/stock_data_on_panel/README.md)   |

## Development Commands

### Initial Setup
```bash
make start
```
This will install dependencies, configure your environment, and create the extension in your PIM for the first time.

### Manual Update
To upload your changes to Akeneo, use the following command. This will build the extension for development and push it to the PIM.
```bash
make update-dev
```

### Automatic Updates (Hot-Reload)
To have your extension automatically update every time you save a code change, run the watch command:
```bash
make watch
```
This is highly recommended for an efficient development workflow.

### Production Build
Once your project is finished, you can build it for production with the command:
```bash
make build
```
This will create an optimized production build in `dist/`.

To deploy this production version, use:
```bash
make update
```

## Customization

### Application Logic
All the frontend logic is located in `src/App.tsx`. Please update this file to match your needs.

### Extension Configuration
The `extension_configuration.json` file can be use to define how your UI extension behaves and appears within Akeneo PIM. Below is a detailed breakdown of its properties.

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

#### Credentials Object
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

::: panel-link [Learn more about how to manage your credentials](/advanced-extensions/sdk-credentials.html)
:::
