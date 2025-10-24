# Getting started
In this section, you will learn how to create your first Custom Component in under a minute. By following this quick guide, you'll gain the skills needed to effectively use the UI for creating and managing UI Extensions.

## Prerequisites

Before building custom component extensions, you'll need:

1. **JavaScript/TypeScript Knowledge**: Familiarity with modern JavaScript
2. **Node.js and npm**: For dependency management
3. **Akeneo Extension SDK**: [The official SDK for building extensions](https://github.com/akeneo/extension-sdk)
4. **Development Environment**: A code editor and terminal
5. **PIM Access**: A connection, an app or the proper permissions to create and manage UI Extensions in the PIM

## Development Workflow

Building a Custom Component extension follows a streamlined three-step process:

### 1. Clone the SDK Repository and Setup

Start by cloning the [Akeneo Extension SDK repository](https://github.com/akeneo/extension-sdk) which provides ready-to-use example projects. Navigate to one
of the example directories (e.g., `examples/quickstart` for beginners or `examples/stock_data_on_panel` for advanced usage) and follow the setup instructions
in its `README.md`. These examples serve as templates for building your own JavaScript application with access to PIM APIs, user context, and secure external
API calls.

### 2. Build and Prepare Your Script

The SDK repository provides a ready-to-use build configuration based on Vite and npm, with convenient Makefile commands to streamline your development
workflow. Once you've developed your custom component, use the provided build tools to transpile and minify your code:

```bash
# Build your extension for production
make build
# or
npm run build
```

This will:
- Transpile modern JavaScript/TypeScript to browser-compatible code
- Bundle all dependencies into a single file
- Minify the code for optimal performance
- Output a deployable JavaScript file in the dist/ directory

The resulting bundle is optimized to run directly within the PIM's secure sandbox environment.

3. Upload Your Extension

Via PIM UI (Recommended):

1. Navigate to the UI-extensions list, in the `PIM System > Ui Extensions`
2. Click Create and select Custom Component
3. Fill in the form:
    - Choose a name for your extension, the name is a technical field and should not contain spaces or specials characters
    - Enter a **default label**, this label will be displayed in the ui. You can name your extension in referebnce to its purpose (e.g., "link to ERP")
    - Leave the position to the default value **Product Tab**

    ::: info
    There is 8 positions available for the type Custom Component:

    - Product Tab
    - Product Model Tab
    - Sub-Product Model Tab
    - Product panel
    - Product Model panel
    - Sub-Product Model panel
    - Category Tab
    - Activity Tab
    :::

  - Upload your built JavaScript file from the dist/ folder
4. Save to create a new extension

::: info
  Note that once created, it is possible to partialy update an extension and load a new script fiel for example.
:::

Via API:

You can also deploy extensions programmatically using the REST API. This is particularly useful for CI/CD workflows and automated deployments. See the
#api-deployment section for detailed examples.


### Test the component

Find your newly created UI-extension in the UI:
- **Product Tab** → On the left section of a product enrichment page (also a variant product), an extensions section should appears

::: warning
You might need to refresh the page to see the button appear
:::    

- Click on the extension label in the extension section
- The quickstart example open and display information from the PIM api.

**Congratulation**, you have created your first custom component

::: panel-link [Learn more about our SDK](/advanced-extensions/sdk-in-depth.html)
:::