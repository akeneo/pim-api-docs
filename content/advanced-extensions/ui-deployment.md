# TODO add screenshots

# UI Deployment

## Overview

You can deploy your UI extensions directly through the Akeneo PIM user interface. This method doesn't require an API token - you simply need to be logged into your PIM instance.

## When to Use UI Deployment

**Use the UI method when:**
- You're making manual, one-time deployments
- You don't have API access configured
- You prefer a visual interface for managing extensions
- You're testing a new extension before automating deployment

## How to Upload an Extension via UI

1. **Log into your Akeneo PIM** with appropriate permissions

2. **Navigate to the UI Extensions section**:
   - Go to System → Extensions → UI Extensions

3. **Create or Update an Extension**:
   - Click on "Create" to add a new extension, or select an existing extension to update it

4. **Fill in the Extension Details**:
   - **Name**: Enter a unique identifier for your extension (e.g., `my-custom-panel`)
   - **Type**: Select `SDK Script`
   - **Position**: Choose where your extension should appear in the PIM (e.g., `pim.product.panel`, `pim.activity.navigation.tab`)
   - **Labels**: Add display labels for different locales

5. **Upload Your Script File**:
   - Click the file upload button
   - Select your compiled JavaScript file (e.g., `dist/my-app.js`)
   - The file will be uploaded to the PIM

6. **Configure Credentials (Optional)**:
   - If your extension needs to communicate with external services, you can add credentials directly in the UI:
     - **Bearer Token**: For simple token-based authentication
     - **Basic Auth**: For username/password authentication
     - **Custom Header**: For custom HTTP headers

7. **Save and Activate**:
   - Click "Save" to store your extension configuration
   - The extension will be immediately available in the configured position

::: panel-link [Learn about API-based deployment](/advanced-extensions/api-deployment.html)
:::

::: panel-link [Back to development workflow](/advanced-extensions/development-workflow.html)
:::
