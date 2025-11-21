
# Custom Component Extensions

## What Are Custom Components?

A **custom component** extension is a JavaScript application built with the **Akeneo Extension SDK** that runs securely within the PIM. Unlike other extension types that load external URLs, custom components are self-contained JavaScript code that executes directly in the PIM's secure sandbox environment.

This is the most powerful extension type, allowing you to build rich, interactive user interfaces with full access to PIM APIs, all without requiring external hosting infrastructure.

[![simple_custom_extension_schema.png](../img/extensions/ui-extensions/simple_custom_extension_schema.png)](../img/extensions/ui-extensions/simple_custom_extension_schema.png)

## Why Use Custom Components?

Custom components are ideal when you need to:

- **Enhance Product Enrichment**: Build specialized interfaces for product data entry and validation
- **Visualize Data**: Create charts, graphs, and dashboards using PIM data
- **Implement Business Logic**: Add custom validation, calculations, or workflows
- **Integrate External Systems**: Connect PIM data with ERPs, DAMs, or other external services
- **Build Interactive Tools**: Create multi-step wizards or guided processes
- **Display Real-time Data**: Show live information from external APIs alongside PIM data
- **Customize User Experience**: Design interfaces tailored to your organization's specific needs

## Key Benefits

### Secure by Design
Your code runs in a secure sandbox environment that protects the PIM while giving you powerful capabilities.

### Authenticated Access
All API calls are automatically authenticated using the current user's session - no token management needed.

### No Infrastructure Required
Deploy directly to the PIM. No web servers, domain names, or SSL certificates to manage.

### Modern Development
Build with TypeScript, React, or your favorite JavaScript tools. Use npm packages and modern bundlers.

### Full PIM Access
Access products, assets, reference entities, catalog structure, and all PIM resources through simple APIs.

## How It Works

1. **Build**: Develop your extension using the SDK with access to TypeScript definitions and example projects
2. **Bundle**: Compile your code into a single JavaScript file
3. **Deploy**: Upload to the PIM via UI or API
4. **Run**: Your code executes in the sandbox with authenticated access to PIM APIs


## Understanding Your Responsibilities for Custom Components

Akeneo provides a powerful extension framework, the Akeneo SDK, and hosting for your Custom Components. This allows you to build and integrate custom solutions directly into your PIM.

While we provide the platform and the tools, it's essential to understand the division of responsibilities for any custom code you create.

Akeneo is responsible for the extension framework and the SDK, but **not** for the custom code you develop. You or your partner are solely responsible for the content, functionality, and maintenance of your Custom Component code.

### How Responsibility is Divided

To make it clear, here is a breakdown of what Akeneo manages versus what you (or your development partner) manage.

**What Akeneo is Responsible For:**

* **The Extension Framework:** The underlying architecture that allows your Custom Component to run.
* **The Akeneo SDK:** Providing and maintaining the official Software Development Kit to interact with our platform.
* **Component Hosting:** Providing the infrastructure to host the Custom Component javascript file.
* **Platform Security:** We implement all necessary security tools to make the PIM platform itself as safe as possible.

**What You Are Responsible For:**

* **All Custom Code:** You are 100% responsible for all code developed for your Custom Component.
* **Functionality & Results:** Akeneo is not responsible for the *outcome* or *result* of your custom developments.
* **Ongoing Maintenance:** You are responsible for testing, debugging, and maintaining your custom code, including any future updates.
* **Security of Your Code:** While our platform is secure, you are responsible for ensuring your custom code does not introduce new vulnerabilities.

### A Note on Code Examples

We may provide code examples or snippets to help you get started. Please note that these are for guidance and instructional purposes only.

**Using an example does not imply a guarantee that it will work** for your specific implementation or use case. You are responsible for adapting, testing, and verifying all code before using it in a production environment.

::: panel-link [Getting Started](/advanced-extensions/getting-started.html)
