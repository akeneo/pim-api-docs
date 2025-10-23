## Data component
A **data component** UI extension is designed to query data from an predefined endpoint and display them in a **colapsible panel** on the product edit form. It aims to ease the completion of product information without leaving the PIM. The panel is accessible via a button on the header of the form. It can be opened and closed by clicking the button.

Please note the following key points regarding its functionality:

* Raw data display: The extension expect queried data to be of JSON format and will display it as it is. To ease navigation, section are collapsible.
* GET HTTP method: The request being sent to the destination is a GET request.
* Signature: It's possible to configure a secret to sign the body of the POST request sent to the destination (SHA-512 protocol).
* Authenticated calls: Thanks to the possibilty of adding [credentials](/extensions/credentials.html) to the extension, you are able to query endpoints requiring authentication.


## Available Positions

Data component extensions can only be placed in panel positions:

| Position | Context |
|----------|---------|
| `pim.product.panel` | Simple products and variant products |
| `pim.category.tab` | Category edit pages |
| `pim.product.tab` | Product tab (alternative to panel) |

See the [Positions documentation](/extensions/positions.html) for visual examples of panel locations.

## Limitations

- **Read-only display**: Cannot edit data within the panel
- **JSON format only**: Other formats not supported
- **No custom styling**: Display format is controlled by PIM
- **Limited interactivity**: No buttons or form controls
- **Single request**: Data loads once when panel opens (no auto-refresh)

## When to Use Another Type

Consider these alternatives:

- **Need interactive UI?** → Use [Iframe Extensions](/extensions/types/iframe.html)
- **Need to trigger actions?** → Use [Action Extensions](/extensions/types/action.html)
- **Just need a link?** → Use [Link Extensions](/extensions/types/link.html)
- **Need complex logic?** → Use [Custom Component Extensions](/extensions/types/custom-component.html)

## Learn More

- [URL Placeholders](/extensions/integration/url-placeholders.html) - Dynamic URLs
- [Credentials](/extensions/security/credentials.html) - Authentication methods
- [Positions](/extensions/positions.html) - Where to place panels
- [API Reference](/extensions/api.html) - Programmatic management

::: panel-link Custom Component Extensions [Next](/extensions/types/custom-component.html)
:::