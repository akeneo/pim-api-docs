# Getting started

This guide provides step-by-step instructions to connect your Akeneo PIM to AI-powered tools using Model Context Protocol (MCP). By the end of this guide, you will have configured your MCP client and be able to interact with your PIM using natural language.

## Before You Start

::: info
Note: We’re transitioning MCP Access to General Availability. Starting March 2026, Akeneo MCP may require additional commercial activation depending on your package. Contact your Akeneo Customer Success Manager (CSM) for more details. For early access please use the [MCP Access Request form](https://docs.google.com/forms/d/e/1FAIpQLScifhHRVMC6ssVk19jzmt-2S0MCb9UDS8wxh2F9LirHoyNzBw/viewform).
:::

::: danger
MCP access is governed by the **API key configured in the MCP connection settings**, not by individual named-user permissions in the PIM.

This means:
- MCP actions are executed with the **permission level of the configured API key**.
- Those permissions may **not match a specific user’s PIM permissions**.
- Anyone with access to the MCP connection (via the AI tool using that API key) can perform actions allowed by that API key, including write/edit if enabled.
:::

::: tips
**Best practice:** _We strongly recommend creating a dedicated API user for MCP Access and applying the **Principle of Least Privilege** (grant only the scopes absolutely necessary for your AI use case). Where supported, enforce this further in your MCP client by enabling only the tools/actions you need._
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

::: warning
Since API credentials are used to connect your AI Agent to the Akeneo MCP Server, you must ensure the permissions of those credentials are limited to the actions you intend the AI Agent to perform (particularly for data edition).
:::

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

::: info
If Node.js is not already installed on your machine, install it using `brew install node` (macOS only).
:::

### VS Code-based IDEs (including VS Code, Cursor, Google Antigravity...)

Add this configuration to your IDE's MCP settings.

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

**Note:** Configuration location varies by IDE:
- **Cursor**: Settings → Tools & MCP
- **Google Antigravity**: Three dots menu (...) → MCP Servers → Manage MCP Servers → View raw config
- **VS Code**: Refer to the [official IDE documentation](https://code.visualstudio.com/api/extension-guides/ai/mcp)

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