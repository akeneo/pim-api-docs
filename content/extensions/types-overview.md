# Extension Types

Extensions are organized into distinct types. Choose the type that aligns precisely with your intended use case and requirements.

## Available Extension Types

| Type | Purpose 
|------|---------|
| [Link](#link) | Open external content in new tab |
| [Action](#action) | Execute background tasks |
| [Data Component](#data-component) | Display external data in panel |
| [Iframe](#iframe) | Embed external content in PIM |
| [Custom Component](#custom-component) | Build rich JavaScript applications |

## Link

A **link** extension opens your external content in a new browser tab. This is the simplest extension type, perfect for directing users to external tools or documentation.

**Common Use Cases:**
- Link to external documentation
- Open related records in external systems
- Direct users to admin panels

**Learn more:** [Link Extensions](/extensions/link.html)

## Iframe

An **iframe** extension embeds external content directly within the PIM using an HTML iframe element. The external application loads inside the PIM interface.

**Common Use Cases:**
- Display external tools without leaving PIM
- Show contextual information from third-party systems

**Learn more:** [Iframe Extensions](/extensions/iframe.html)

## Action

An **action** extension executes external tasks in the background when triggered by a user. The PIM calls your API and displays a notification when complete.

**Common Use Cases:**
- Trigger external workflows
- Execute batch operations
- Integrate with external automation systems

**Learn more:** [Action Extensions](/extensions/action.html)

## Data Component
// TODO: to review completely
A **data component** extension displays data from an external endpoint in a collapsible panel on product edit forms. This helps complete product information without leaving the PIM.

**Common Use Cases:**
- Display supplementary product data
- Show real-time inventory information
- Present external validation results

**Learn more:** [Data Component Extensions](/extensions/data-component.html)

## Custom Component

A **custom component** extension is a JavaScript application built with the Akeneo Extension SDK that runs securely within the PIM. This is the most powerful extension type, allowing full custom UI and logic.

**Common Use Cases:**
- Build custom product enrichment tools
- Create interactive data visualizations
- Develop complex business logic within PIM

**Learn more:** [Custom Component Extensions](/advanced-extensions/overview.html)

::: panel-link Extensions positions [Next](/extensions/positions.html)
:::
