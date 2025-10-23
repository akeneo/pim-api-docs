# Custom Component Extensions

## Overview

A **custom component** extension is a JavaScript application built with the **Akeneo Extension** SDK that runs securely within the PIM. Unlike other extension types that load external URLs, custom components are JavaScript code that executes directly in the PIM's secure sandbox.

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

## Available Positions

Data component extensions can only be placed in panel positions:

| Position | Context |
|----------|---------|
| `pim.product.panel` | Simple products and variant products |
| `pim.category.tab` | Category edit pages |
| `pim.product.tab` | Product tab (alternative to panel) |

See the [Positions documentation](/extensions/positions.html) for visual examples of panel locations.

## Prerequisites

Before building custom component extensions, you'll need:

1. **JavaScript/TypeScript Knowledge**: Familiarity with modern JavaScript
2. **Node.js and npm**: For dependency management
3. **Akeneo Extension SDK**: The official SDK for building extensions
4. **Development Environment**: A code editor and terminal
5. **PIM Access**: A connection or app with appropriate permissions

## Integration Architecture

Applications you will build are designed to run within the Akeneo PIM application itself, executing in a secure sandbox environment. This architecture provides several benefits:

1. **Direct Access**: Your code runs within the PIM context, allowing direct access to the current context.
2. **Security**: The SDK code operates in a secure sandbox environment using the [SES (Secure ECMAScript)](https://github.com/endojs/endo) library, which restricts access to potentially harmful JavaScript capabilities.
3. **Controlled API Access**: All API calls are automatically authenticated using the current user's session.

## Important Constraints

When developing with the SDK, keep these constraints in mind:

- **Restricted Environment**: Your code runs in a secure sandbox that limits JavaScript capabilities.
- **External Access**: Direct network requests (fetch, XMLHttpRequest) to external services are not allowed. All API interactions must go through the SDK methods. There is a specific method available to allow access to external resources.
- **DOM Access**: Limited access to the DOM is provided, with restrictions on what elements can be modified.
- **Global State**: The sandbox isolates your code from affecting the global state of the PIM application.
- **Resources**: Your script should be efficient as it runs within the PIM application context.

## Permissions and Access Control

The SDK operates under the permissions of the currently logged-in user. This means:

- **Inherited Permissions**: All API calls made through the SDK inherit the Web API permissions of the user who is currently logged into the PIM.
- **Role-Based Access**: What your extension can do depends entirely on the role and permissions assigned to the user running it.
- **Permission Variations**: The same extension may have different capabilities depending on who is using it.
- **Error Handling**: Your code should gracefully handle permission-denied scenarios, as different users may have different access levels.

For example, if a user doesn't have permission to edit products, any SDK calls attempting to update products will fail, even if your code is technically correct. Always design your extensions with these permission constraints in mind.

You can refer to the [Akeneo Web API permissions documentation](https://api.akeneo.com/documentation/permissions.html) for more details on the permission system.

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

```js
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

## TypeScript Support

The SDK comes with comprehensive TypeScript declarations (`global.d.ts`), providing rich intellisense and autocompletion in compatible editors. This makes development faster and helps prevent errors by ensuring you're using the API correctly.

Benefits of the TypeScript declarations:
- **Autocomplete**: Get suggestions for available methods and properties
- **Type Checking**: Catch type errors before runtime
- **Documentation**: View parameter descriptions and requirements directly in your editor
- **Improved Developer Experience**: Navigate the SDK easily with proper typing

## Available Features

The SDK provides access to the following API resources:

### Product Management
- **Product UUID API** (`PIM.api.product_uuid_v1`): Create, update, and retrieve products by UUID
- **Product Model API** (`PIM.api.product_model_v1`): Work with product models
- **Product Media File API** (`PIM.api.product_media_file_v1`): Upload and manage product images and files

### Attribute Management
- **Attribute API** (`PIM.api.attribute_v1`): Manage product attributes
- **Attribute Group API** (`PIM.api.attribute_group_v1`): Organize attributes into groups
- **Attribute Option API** (`PIM.api.attribute_option_v1`): Work with attribute options

### Catalog Structure
- **Family API** (`PIM.api.family_v1`): Manage product families
- **Family Variant API** (`PIM.api.family_variant_v1`): Work with family variants
- **Category API** (`PIM.api.category_v1`): Manage the category tree
- **Association Type API** (`PIM.api.association_type_v1`): Define product associations

### Asset Management
- **Asset API** (`PIM.api.asset_v1`): Create and manage assets
- **Asset Family API** (`PIM.api.asset_family_v1`): Work with asset families
- **Asset Attribute API** (`PIM.api.asset_attribute_v1`): Manage asset attributes
- **Asset Attribute Option API** (`PIM.api.asset_attribute_option_v1`): Work with asset attribute options
- **Asset Media File API** (`PIM.api.asset_media_file_v1`): Upload and manage asset files

### Reference Entities
- **Reference Entity API** (`PIM.api.reference_entity_v1`): Manage reference entities
- **Reference Entity Attribute API** (`PIM.api.reference_entity_attribute_v1`): Work with reference entity attributes
- **Reference Entity Attributes Option API** (`PIM.api.reference_entity_attribute_option_v1`): Manage reference entity attributes option
- **Reference Entity Record API** (`PIM.api.reference_entity_record_v1`): Manage reference entity records

### System & Configuration
- **System API** (`PIM.api.system`): Get system information
- **Currency API** (`PIM.api.currency_v1`): Work with currencies
- **Channel API** (`PIM.api.channel_v1`): Manage channels
- **Locale API** (`PIM.api.locale_v1`): Work with locales
- **Measurement Family API** (`PIM.api.measurement_family_v1`): Manage measurement families

## Common Patterns

Most API methods follow these common patterns:

### List Resources
```js
// List with optional filtering and pagination
const listParams = {
  // Required parameters specific to the resource
  // Optional filters, search, pagination
};
const items = await PIM.api.resource_v1.list(listParams);
```

### Get a Single Resource
```js
// Fetch a specific resource by its identifier
const getParams = {
  // Required parameters to identify the resource
};
const item = await PIM.api.resource_v1.get(getParams);
```

### Create or Update Resources
```js
// Create or update a resource
const upsertParams = {
  // Resource identifier
  // Data to create or update
};
const response = await PIM.api.resource_v1.upsert(upsertParams);
```

```js
// Patch a resource
const patchParams = {
  // Resource identifier
  // Data to patch
};
const response = await PIM.api.resource_v1.patch(patchParams);
```

```js
// Create a resource
const createParams = {
  // Resource identifier
  // Data to create
};
const response = await PIM.api.resource_v1.create(createParams);
```

## User Context

The SDK provides access to the current user context through:

```js
// Get user information
const currentUser = PIM.user;
console.log(`Current user: ${currentUser.first_name} ${currentUser.last_name}`);

// Get contextual information (if available)
const context = PIM.context;
if ('product' in context) {
  console.log(`Current product UUID: ${context.product.uuid}`);
}
```

## Navigation within the PIM

The SDK provides a navigation method that allows you to open new tabs, but only within the Akeneo PIM application. This is useful for directing users to different sections of the PIM from your extension:

```js
// Navigate to a product edit page
PIM.navigate.internal('#/enrich/product/6b7546f8-929c-4ba3-b7ed-d55b61753313');

// Navigate to a category page
PIM.navigate.internal('#/enrich/product-category-tree/');

// Navigate to an asset page
PIM.navigate.internal('#/asset/video/asset/absorb_video/enrich');
```

Important limitations to keep in mind:
- This navigation method can **only** open tabs within the PIM application
- It cannot be used to navigate to external websites or applications
- The paths must be valid PIM routes that the user has permission to access
- Navigation will open in a new tab, preserving the current extension context

Use this feature to create helpful shortcuts or workflows that connect your extension's functionality with standard PIM screens.

The position you choose will determine where and how your extension is presented to users in the PIM interface.

## External API Calls

The SDK provides a secure gateway for making calls to external APIs and services. Since direct network requests (fetch, XMLHttpRequest) are not allowed within the sandbox environment, the SDK offers a dedicated method for external communication:

```js
// Make a GET request to an external API
const response = await PIM.api.external.call({
  method: 'GET',
  url: 'https://api.example.com/data',
  headers: {
    'my_super_header': 'your super header value',
    'Content-Type': 'application/json'
  }
});

// Make a POST request with a body
const createResponse = await PIM.api.external.call({
  method: 'POST',
  url: 'https://api.example.com/items',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'New Item',
    description: 'Item description'
  })
});
```

#### Authenticated calls and credentials:
You have the ability to make authenticated calls using the `external.call` method. To do so you have to specify as a paramter the code of the credential you want to use. The specified credential will be used as headers in the generated requests.

```js
// Make a request using stored credentials
const secureResponse = await PIM.api.external.call({
  method: 'GET',
  url: 'https://api.secure-service.com/data',
  credentials_code: 'my_registered_credentials' // Reference credentials stored in PIM
});
```

Important considerations for external calls:
- This is the **only method** allowed for accessing external resources from your extension
- All external domains must be allowlisted in your extension configuration
- For security reasons, requests are proxied through the PIM server
- **Never hardcode credentials** in your extension code as it runs in the browser and can expose sensitive information
- Always use the `credentials_code` parameter to reference credentials that are securely stored in the PIM configuration
- The credential management is handled through the extension configuration in the PIM admin interface
- The method supports standard HTTP methods (GET, POST, PUT, DELETE, etc.)
- Responses are returned as promises that can be handled with async/await

The external gateway provides a secure way to integrate your extension with external systems while maintaining the security of the PIM environment.

## Error Handling

The SDK methods return promises that you can handle with try/catch:

```js
try {
  const result = await PIM.api.resource_v1.method(params);
  // Process successful result
} catch (error) {
  // Handle errors
  console.error('API Error:', error.message);
  // You may want to check for specific error types/codes
}
```

## Troubleshooting

### SES_UNCAUGHT_EXCEPTION: TypeError: Cannot assign to read only property 'constructor' of object '[object Object]'

**What this error means:**

This error occurs when your code (or a library you're using) attempts to modify a property that is protected and cannot be changed.

**Common causes:**

1. **Your code is trying to reassign `constructor`**
   - Check if you're directly assigning to `.constructor` anywhere in your code
   - Look for patterns like `obj.constructor = ...` or `prototype.constructor = ...`

2. **A library you're using has compatibility issues**
   - Some older libraries may try to modify built-in objects in ways that aren't allowed in secure environments
   - Check if the error occurs after importing a specific library
   - Try updating the library to the latest version

3. **Attempting to modify frozen or sealed objects**
   - You may be trying to change properties on objects created with `Object.freeze()` or `Object.seal()`

**How to fix it:**

✅ **Review your code** - Search for any direct assignments to `constructor` properties

✅ **Check your dependencies** - Identify which library is causing the issue by temporarily removing imports

✅ **Update libraries** - Ensure all packages are up-to-date, as newer versions often fix these issues

✅ **Use alternative approaches** - Instead of modifying `constructor`, consider:
   - Creating new objects with the desired properties
   - Using a different property name for your data
   - Using composition instead of inheritance

### SES_UNCAUGHT_EXCEPTION: ReferenceError: process is not defined

**What this error means:**

This error occurs when your code (or a library you're using) tries to access the `process` object, which is a Node.js global variable that doesn't exist in browser environments.

**Common causes:**

1. **A library expects a Node.js environment**
   - Some libraries are designed for Node.js and assume `process` is available
   - This commonly happens with libraries that check `process.env` for environment variables

2. **Your code references `process` directly**
   - Check if you're using `process.env.VARIABLE_NAME` or similar in your code
   - Browser code should use `import.meta.env.VARIABLE_NAME` instead (in Vite)

3. **Missing polyfills or configuration**
   - Your build tool may need to be configured to provide browser-compatible shims

**How to fix it:**

✅ **Add polyfills to your build configuration**

If you're using **Vite**, add this to your `vite.config.js`:
```javascript
export default {
  define: {
    global: {},
    process: {
      env: {},
    },
  },
}

If you're using webpack, add this to your webpack.config.js:
module.exports = {
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
}
```

## When to Use Another Type

Consider these alternatives:

- **Already have a web app?** → Use [Iframe Extensions](/extensions/types/iframe.html)
- **Simple link needed?** → Use [Link Extensions](/extensions/types/link.html)
- **Just displaying data?** → Use [Data Component Extensions](/extensions/types/data-component.html)
- **Background tasks?** → Use [Action Extensions](/extensions/types/action.html)

## Learn More

- [Example Projects](https://github.com/akeneo/extension-sdk) - Sample code on GitHub
- [Positions](/extensions/positions.html) - Where to place your component

::: panel-link Url placeholders [Next](/extensions/integration/url-placeholder.html)
:::
