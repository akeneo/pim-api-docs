# Getting started

This guide provides step-by-step instructions to connect your Akeneo PIM to AI-powered tools using the Model Context Protocol (MCP). By the end of this guide, you will have configured your MCP client and be able to interact with your PIM using natural language.

## Before You Start

### What you'll need

**From your Akeneo PIM:**

1. Your PIM instance URL (e.g., `https://yourcompany.akeneo.com`)
2. API credentials:
    - Client ID
    - Client secret
    - Username
    - Password

**To create API credentials in Akeneo:**

1. Log into your PIM
2. Go to **Connect > Connection settings**
3. Click **Create**
4. Save your credentials

::: info
Need more details? See the [complete guide for creating API credentials](https://api-dev.akeneo.com/documentation/authentication.html#client-idsecret-generation) in the Akeneo documentation.
:::

## Quick Setup

Our hosted server is available at:

[`https://server.mcp.akeneo.cloud/mcp`](https://server.mcp.akeneo.cloud/mcp)

**No installation needed!** Just configure your client with the URL above.

## Connecting Your Client

### Claude Desktop

Add this to your Claude Desktop config file (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "akeneo-mcp": {
          "command": "npx",
          "args": [
              "mcp-remote",
              "https://server.mcp.akeneo.cloud/mcp",
              "--header",
              "X-Akeneo-API-URL:https://yourcompany.akeneo.com",
              "--header",
              "X-Akeneo-Client-ID:your_client_id",
              "--header",
              "X-Akeneo-Client-Secret:your_client_secret",
              "--header",
              "X-Akeneo-Username:your_username",
              "--header",
              "X-Akeneo-Password:your_password"
          ]
    }
  }
}
```

### Cursor IDE

Add this configuration to Cursor's MCP settings.

```json
{
  "mcpServers": {
    "akeneo-mcp": {
      "type": "http",
      "url": "https://server.mcp.akeneo.cloud/mcp",
      "headers": {
        "X-Akeneo-API-URL": "https://yourcompany.akeneo.com",
        "X-Akeneo-Client-ID": "your_client_id",
        "X-Akeneo-Client-Secret": "your_client_secret",
        "X-Akeneo-Username": "your_username",
        "X-Akeneo-Password": "your_password"
      }
    }
  }
}
```

::: info
To avoid unnecessary calls and potential trial and error, don't hesitate to use codes/SKUs/UUIDs with your LLM (instead of labels) when referring to a specific product, attribute, category or family.
:::

## Test Your Connection

Once configured, try these natural language queries:

- `"Show me the name of my first 10 products"`
- `"List all product families"`
- `"What attributes are available?`

## Learn More

- **Model Context Protocol:** [modelcontextprotocol.io](https://modelcontextprotocol.io/)
- Understand [MCP Servers and Clients](https://modelcontextprotocol.io/docs/learn/architecture)
- [MCP Server concepts](https://modelcontextprotocol.io/docs/learn/server-concepts)

**Ready to start?** Configure your client with the production URL and your Akeneo credentials, then try: `"Show me the name of my first 10 products"`