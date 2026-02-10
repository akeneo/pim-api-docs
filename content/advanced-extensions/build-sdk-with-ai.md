# Building Custom Components with AI

Custom components (a part of the Extension Framework) allow you to extend the Akeneo PIM interface to meet your specific business needs.

While traditional development requires deep knowledge of JavaScript and the Akeneo SDK, you can significantly accelerate your workflow—or even build functional extensions from scratch—using Generative AI.

Depending on your goals and the tools you use, AI can assist with everything from rapid UI prototyping to generating production-ready logic.

## Choose your approach

Your choice of AI tool should depend on the complexity of the extension you aim to build.

### For UI Mockups and Simple Logic

**Tools:** [ChatGPT](https://chatgpt.com/), [Gemini](https://gemini.google.com/), [Claude (Web)](https://claude.ai/)

General-purpose conversational AI is excellent for "look and feel." If you need a simple UI extension or a visual mockup to show stakeholders, these tools can generate HTML/CSS and basic JavaScript quickly.

::: warning
These models may struggle with complex state management or the specifics of the Akeneo SDK, often leading to "hallucinated" code that is difficult to debug.
:::

### For Advanced Logic and API Integration

**Tools:** [Cursor](https://cursor.com/), [Claude Code](https://claude.ai/), [GitHub Copilot](https://github.com/features/copilot)

If your goal is a functional component that interacts with Akeneo data, we recommend using an **AI-native IDE** (like Cursor) or a code agent such as **Claude Code**. These tools have better "reasoning" capabilities and can index your entire project folder to understand context.

## Step 1: Provide context

AI is only as good as the context you provide. Before asking the AI to write code, "prime" it by providing the structure of a valid Akeneo extension.

1. **Point to** the [official documentation](https://api.akeneo.com/advanced-extensions/overview.html) for Custom Components.
2. **Use Examples:** Point your AI to the [Akeneo Extension SDK Examples](https://github.com/akeneo/extension-sdk/tree/main/examples) repository.
3. **Code Injection:** If the AI doesn't have web access, copy the code from a simple example (like the Quickstart example) and paste it into the chat. Tell the AI: *"This is the standard structure for an Akeneo PIM extension. Use this as a template for everything we build."*

## Step 2: Define your scope

Start small. Instead of asking for a "full project management dashboard," start with a single functional element.

- **Draft the UI:** Describe the look and feel. Use frameworks the AI knows well (like Tailwind CSS or standard HTML/CSS) to ensure the design is clean.
- **Add Logic Iteratively:** Once the UI looks right, ask the AI to add functionality, such as fetching a product name or displaying user permissions.

## Step 3: Connect to Akeneo Data

To make your component functional, you must use the Akeneo SDK. If your AI isn't sure how to handle data fetching, feed it the following documentation links to ensure it uses the correct methods:

- **SDK Core Concepts:** [SDK In-depth Overview](https://api.akeneo.com/advanced-extensions/overview.html)
- **User Information:** [Accessing User Context](https://api.akeneo.com/advanced-extensions/sdk-in-depth.html#user-information)
- **Data Fetching:** [Connecting with PIM Data](https://api.akeneo.com/advanced-extensions/sdk-in-depth.html#available-features)
- **Interface contract:** [Examples repository](https://github.com/akeneo/extension-sdk/blob/main/examples/common/global.d.ts)

## Step 4: Testing and Deployment

Once the AI generates your code (typically a single JavaScript file or a small project structure), you need to upload it to your PIM to see it in action.

1. **Bundle your code:** If the AI provides multiple files, ask it: *"Can you provide a script to compile this into a single JavaScript file compatible with the Akeneo Extension SDK?"*
2. **Upload:** Use the [PIM UI deployment](https://api.akeneo.com/advanced-extensions/ui-deployment.html#ui-deployment) or [API deployment](https://api.akeneo.com/advanced-extensions/api-deployment.html#api-deployment) documentation to upload your extension.
3. **Isolated Testing:** To avoid disrupting other users in a staging environment, use the **Filter by users** feature under the extension permission tab in the PIM UI. This allows you to restrict the visibility of the new component to only your user account while you debug.

## Summary: From Concept to Component

| Goal | Suggested Tool | AI Involvement |
| --- | --- | --- |
| **Quick Mockup** | ChatGPT / Gemini | 90% (AI generates UI) |
| **Data-driven Tool** | Cursor / Claude Code | 70% (AI writes logic, you guide) |
| **Complex Integration** | Code agent + Manual Review | 50% (AI handles boilerplate, you debug) |

By combining a clear functional goal with the right AI prompts and Akeneo’s SDK documentation, you can build sophisticated custom components without being a JavaScript expert.