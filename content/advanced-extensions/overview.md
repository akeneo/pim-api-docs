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

::: panel-link [Getting Started](/advanced-extensions/getting-started.html)
:::