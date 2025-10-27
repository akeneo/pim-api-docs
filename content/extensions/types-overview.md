# Extension Types

UI extensions are categorized by type, which determines their capabilities and use cases. Choose the type that best suits your requirements.

## Available Extension Types

| Type | Purpose | Embedded in PIM | External URL | Requires Coding |
|------|---------|-----------------|--------------|-----------------|
| [Link](#link) | Open external content in new tab | No | Yes | No |
| [Iframe](#iframe) | Embed external content in PIM | Yes | Yes | No |
| [Action](#action) | Execute background tasks | No | Yes | No |
| [Data Component](#data-component) | Display external data in panel | Yes | Yes | No |
| [Custom Component](#custom-component) | Build rich JavaScript applications | Yes | No | Yes (JavaScript/SDK) |

## Link

A **link** extension opens your external content in a new browser tab. This is the simplest extension type, perfect for directing users to external tools or documentation.

**Common Use Cases:**
- Link to external documentation
- Open related records in external systems
- Direct users to admin panels

**Learn more:** [Link Extensions](/extensions/types/link.html)

## Iframe

An **iframe** extension embeds external content directly within the PIM using an HTML iframe element. The external application loads inside the PIM interface.

**Common Use Cases:**
- Embed dashboards
- Display external tools without leaving PIM
- Show contextual information from third-party systems

**Learn more:** [Iframe Extensions](/extensions/types/iframe.html)

## Action

An **action** extension executes external tasks in the background when triggered by a user. The PIM sends data to your endpoint and displays a notification when complete.

**Common Use Cases:**
- Trigger external workflows
- Execute batch operations
- Integrate with external automation systems

**Learn more:** [Action Extensions](/extensions/types/action.html)

## Data Component

A **data component** extension displays data from an external endpoint in a collapsible panel on product edit forms. This helps complete product information without leaving the PIM.

**Common Use Cases:**
- Display supplementary product data
- Show real-time inventory information
- Present external validation results

**Learn more:** [Data Component Extensions](/extensions/types/data-component.html)

## Custom Component

A **custom component** extension is a JavaScript application built with the Akeneo Extension SDK that runs securely within the PIM. This is the most powerful extension type, allowing full custom UI and logic.

**Common Use Cases:**
- Build custom product enrichment tools
- Create interactive data visualizations
- Develop complex business logic within PIM

**Requirements:**
- JavaScript/TypeScript knowledge
- Akeneo Extension SDK
- Local development environment

**Learn more:** [Custom Component Extensions](/extensions/types/custom-component.html)

## Choosing the Right Type

Consider these questions when selecting an extension type:

1. **Do you already have a web application?**
   - Yes → Use **Link** (new tab) or **Iframe** (embedded)
   - No → Use **Custom Component** (build with SDK)

2. **Do you need to trigger server-side actions?**
   - Yes → Use **Action**

3. **Do you need to display read-only data?**
   - Yes → Use **Data Component** or **Iframe**

4. **Do you need rich interactivity and custom UI?**
   - Yes → Use **Custom Component** or **Iframe**

5. **Do you want to avoid hosting infrastructure?**
   - Yes → Use **Custom Component** (runs in PIM)
   - No → Use **Link**, **Iframe**, **Action**, or **Data Component**

## Next Steps

- Explore detailed documentation for each type
- Review [Available Positions](/extensions/positions.html) to see where extensions can be placed
- Check the [Getting Started](/extensions/getting-started.html) guide for a hands-on tutorial

::: panel-link Link Extensions [Next](/extensions/link.html)
:::
