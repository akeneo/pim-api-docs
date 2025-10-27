# MCP Capabilities

When you interact with the Akeneo MCP Server through natural language (for example with Claude, Cursor, or VS Code), your AI assistant automatically calls **MCP Tools** behind the scenes.

These tools represent the "capabilities" of the Akeneo MCP Server — for instance:

- `get_product` - Retrieve a specific product by UUID or identifier
- `search_products` - Search for products with filters
- `families` - List all product families
- `attributes` - List attributes with filtering options
- `edit_product` - Update product information
- `categories` - List categories
- And more...

Your LLM interprets your intent (e.g. *"Show me all disabled products"*) and dynamically selects and fills the right tool parameters (e.g. calling `search_products` with `enabled=false`).

## List & Debug The MCP Capabilities

If you want to **see, explore, or debug these tools directly**, there are a few options:

### MCP Inspector

[MCP Inspector](https://github.com/modelcontextprotocol/inspector) is an open-source web app created by the Model Context Protocol team. It lets you **connect to any MCP server**, visualize its declared tools, schemas, prompts, and resources, and even **manually trigger tool calls.**

**How to use it:**

1. Go to [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
2. Connect to the Akeneo MCP Server at `https://server.mcp.akeneo.cloud/mcp`
3. Add your Akeneo credentials as headers:
   - `X-Akeneo-API-URL`: Your PIM URL
   - `X-Akeneo-Client-ID`: Your client ID
   - `X-Akeneo-Client-Secret`: Your client secret
   - `X-Akeneo-Username`: Your username
   - `X-Akeneo-Password`: Your password
4. Browse available tools and test them directly

### Postman

Postman now includes built-in support for MCP requests. You can directly query an MCP server, list its tools, and call them using the Postman interface.

**How to use it:**

1. In Postman, create a new **"MCP"** Collection
2. Set the server URL to `https://server.mcp.akeneo.cloud/mcp`
3. Add headers (optional if you just want to list the tools):
   ```json
   X-Akeneo-API-URL: "https://your-pim.akeneo.com"
   X-Akeneo-Client-ID: "your_client_id"
   X-Akeneo-Client-Secret: "your_client_secret"
   X-Akeneo-Username: "your_username"
   X-Akeneo-Password: "your_password"
   ```
4. Click **"Run"** to see the full list of capabilities
5. Select a tool (e.g. `get_product`) and test it directly

## Understanding Tool Responses

When you call MCP tools directly, you'll get detailed information:

- **API Response**: The actual data from your Akeneo PIM
- **Endpoint Used**: Shows which REST API endpoint was called
- **Parameters Used**: Shows the search filters and parameters applied
- **Metadata**: Additional context about the operation

This is exactly what your LLM sees when processing your natural language requests, giving you full visibility into how the MCP server works.

## Learn More

- **Model Context Protocol:** [modelcontextprotocol.io](https://modelcontextprotocol.io/)
- Understand [MCP Servers and Clients](https://modelcontextprotocol.io/docs/learn/architecture)
- [MCP Server concepts](https://modelcontextprotocol.io/docs/learn/server-concepts)
