# Getting Started

In this section, you will learn how to create your first Custom Component extension quickly.
This quick guide will help you understand the basic workflow for creating and managing Extensions.

## Prerequisites

Before building custom component extensions, you'll need:

1. **JavaScript/TypeScript Knowledge**: Familiarity with modern JavaScript
2. **Node.js and npm**: For dependency management
3. **Akeneo Extension SDK**: [The official SDK for building extensions](https://github.com/akeneo/extension-sdk)
4. **Development Environment**: A code editor and terminal
5. **PIM Access**: A connection, an app, or the proper permissions to create and manage Extensions in the PIM

## Quick Start: Three Steps to Your First Extension

### 1. Setup Your Project

Clone the [Akeneo Extension SDK repository](https://github.com/akeneo/extension-sdk) and navigate to an example project:

```bash
git clone https://github.com/akeneo/extension-sdk.git
cd extension-sdk/examples/quickstart
make start
```

The `make start` command will:
- Install dependencies
- Help you configure your environment
- Create the extension in your PIM for the first time

::: info
The SDK repository provides ready-to-use example projects that serve as templates for building your own extensions. Start with `examples/quickstart` for a basic setup, or explore `examples/stock_data_on_panel` for a more advanced example.
:::

### 2. Build Your Extension

Once you've developed your custom component, build it for deployment:

```bash
make build
```

This creates an optimized, production-ready JavaScript file in the `dist/` directory.

### 3. Deploy Your Extension

You have two options for deploying your extension:

**Option A: Via PIM UI** (No API token required)
- Navigate to System → Extensions → UI Extensions
- Click "Create" and upload your built JavaScript file
- Configure the extension name, position, and labels
- [Learn about UI deployment](/advanced-extensions/ui-deployment.html)

**Option B: Via API** (For automation and CI/CD)
- Use the REST API to programmatically deploy extensions
- Ideal for automated workflows and managing multiple environments
- [Learn about API deployment](/advanced-extensions/api-deployment.html)

## Testing Your Extension

After deployment, find your extension in the PIM:

1. Navigate to a product enrichment page
2. Look for the "Extensions" section on the left panel
3. Click on your extension's label
4. The quickstart example will display information from the PIM API

::: warning
You may need to refresh the page for the extension to appear.
:::

**Congratulations!** You've created your first custom component.

::: panel-link [Learn more about our SDK](/advanced-extensions/sdk-in-depth.html)
