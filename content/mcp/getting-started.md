# Getting started

This guide provides step-by-step instructions to connect your Akeneo PIM to AI-powered tools using the Model Context Protocol (MCP). By the end of this guide, you will have configured your MCP client and be able to interact with your PIM using natural language.

## Before You Start

::: info
Please note that this service is currently in the beta phase. As such, Akeneo reserves the right to modify the access conditions and the service's functionality in the future.

The Akeneo MCP Server is currently available by invitation only. To request access, please contact our team at [mcp@akeneo.com](mailto:mcp@akeneo.com).
:::

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

::: tips
Need more details? See the [complete guide for creating API credentials](https://api-dev.akeneo.com/documentation/authentication.html#client-idsecret-generation) in the Akeneo documentation.
:::

## Quick Setup

Our hosted server is available at:

[`https://server.mcp.akeneo.cloud/mcp`](https://server.mcp.akeneo.cloud/mcp)

**No installation needed!** Just configure your client with the URL above.

## Connecting Your Client

Configurations vary from one AI Agent to another. Please check your Agent's documentation for more details. Here are some examples:

### Claude CLI

Use the following command to add the Akeneo MCP Server to Claude CLI:

```bash
claude mcp add --transport http akeneo-mcp https://server.mcp.akeneo.cloud/mcp \
  -H "X-Akeneo-API-URL: https://yourcompany.akeneo.com" \
  -H "X-Akeneo-Client-ID: your_client_id" \
  -H "X-Akeneo-Client-Secret: your_client_secret" \
  -H "X-Akeneo-Username: your_username" \
  -H "X-Akeneo-Password: your_password"
```

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

## Test Your Connection

Once configured, try these natural language queries:

- `"Show me the sku of my first 10 products"`
- `"List all product families"`
- `"How many attributes are available?"`

You should receive accurate responses from your PIM. If you encounter any issues, verify your credentials are correct and that your PIM instance is accessible.

::: tips
For more detailed examples and use cases, see our [Use Cases Examples](/mcp/use-cases.html) page.
:::

**Ready to start?** Configure your client with the production URL and your Akeneo credentials, then try: `"Show me the name of my first 10 products"`