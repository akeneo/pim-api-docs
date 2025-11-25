# Overview

The Akeneo MCP Server is a bridge between your Akeneo PIM instance and AI tools that support the Model Context Protocol (MCP). It lets you interact with your product catalog using natural language—search products, update attributes, check compliance, and more—all without leaving your IDE or AI assistant.

## What is the Model Context Protocol (MCP)?

The Model Context Protocol (MCP) is a standard for connecting AI assistants to data sources and tools. It enables AI models to interact with external systems in a structured and secure way.

::: info
Learn more about MCP at [modelcontextprotocol.io](https://modelcontextprotocol.io/)
:::

## Who is it for?

The potential usage is diverse and remains to be fully explored. Here are some ideas:
- **Product managers** manage catalogs
- **Developers** build PIM integrations  
- **Content teams** update product information
- **Compliance teams** validate product data

## Supported Clients

The Akeneo MCP Server works with any MCP-compatible client, such as:

- **Claude Desktop** - Desktop app with MCP support
- **Cursor** - AI-first code editor
- **VS Code** - With MCP extensions
- **Custom clients** - Any tool supporting MCP over HTTP

## Supported PIM data concepts

The Akeneo MCP server supports the following PIM data concepts:

| PIM data concept                     | Recovery           | Creation or update  |
|--------------------------------------|--------------------|---------------------|
| `product`                            | :white_check_mark: | :white_check_mark:  |
| `product model`                      | :white_check_mark: | :white_check_mark:  |
| `Product media file`                 | :x:                | :x:                 |
| `Jobs`                               | :x:                | :x:                 |
| `Family`                             | :white_check_mark: | :white_check_mark:  |
| `Family variant`                     | :white_check_mark: | :white_check_mark:  |
| `Attribute`                          | :white_check_mark: | :white_check_mark:  |
| `Attribute option`                   | :white_check_mark: | :white_check_mark:  |
| `Attribute group`                    | :white_check_mark: | :white_check_mark:  |
| `Association type`                   | :white_check_mark: | :white_check_mark:  |
| `Category`                           | :white_check_mark: | :white_check_mark:  |
| `Channel`                            | :white_check_mark: | :white_check_mark:  |
| `Locale`                             | :white_check_mark: | :x:                 |
| `Currency`                           | :white_check_mark: | :x:                 |
| `Measurement family`                 | :white_check_mark: | :white_check_mark:  |
| `Reference entity`                   | :white_check_mark: | :white_check_mark:  |
| `Reference entity attribute`         | :white_check_mark: | :white_check_mark:  |
| `Reference entity attribute option`  | :white_check_mark: | :white_check_mark:  |
| `Reference entity record`            | :white_check_mark: | :white_check_mark:  |
| `Reference entity media file`        | :x:                | :x:                 |
| `Asset family`                       | :white_check_mark: | :white_check_mark:  |
| `Asset attribute`                    | :white_check_mark: | :white_check_mark:  |
| `Asset attribute option`             | :white_check_mark: | :white_check_mark:  |
| `Asset`                              | :white_check_mark: | :white_check_mark:  |
| `Asset media file`                   | :x:                | :x:                 |
| `Catalog`                            | :x:                | :x:                 |
| `Catalog product`                    | :x:                | :x:                 |
| `Mapping schema for product`         | :x:                | :x:                 |
| `UI extension`                       | :x:                | :x:                 |
| `Workflow`                           | :x:                | :x:                 |
| `Workflow execution`                 | :x:                | :x:                 |
| `Workflow task`                      | :x:                | :x:                 |

## What You Can Do

Once connected, you can use natural language to interact with your PIM.
Here are some examples of requests that can be made:

### Search & Browse
- `"Show me all enabled products"`
- `"What families are available?"`
- `"Which products are deactivated on my ecommerce channel?"`
- `"Show me the products that need improvement on my ecommerce channel"`

### Update PIM data
- `"Update product 'Super T-shirt' with description 'Premium quality fabric'"`
- `"Adds my 'description' attribute to all my families"`
- `"Complete the missing labels for the options in my 'color' attribute"`

### Creation of new PIM data
- `"Create a 'tshirt' family with variations on two axes: size and color"`
- `"Created a new 'Color' reference entity with all the colors for our collection"`
- `"Add a new product to my 'tshirt' family, available in sizes S, M, L and XL and in white, black and red"`

### Check Compliance
- `"Analyze all products in the 'dairy' family for FIC compliance"`
- `"Check if all my products have the 'warranty duration' attribute fulfilled?"`
- `"Check if allergens are properly listed on my family's 'snack' products"`

### Discover Structure
- `"What attributes exist for color?"`
- `"Get options for the size attribute"`
- `"What are the attributes of my reference entity 'country'?"`

## Next Steps

Ready to get started? Check out our [Getting Started Guide](/mcp/getting-started.html) for detailed setup instructions.