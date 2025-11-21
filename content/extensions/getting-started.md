# Getting started
In this section, you will learn how to create your first Extension in under a minute. By following this quick guide, you'll gain the skills needed to effectively use the UI for creating and managing Extensions.

### Prerequisites
Having the proper permission to create and manage Extensions.
// TODO: add a link to helpdesk

### Access the Extensions management Interface

- Navigate to the Extensions list, in the `PIM System > Ui Extensions`

// TODO: reorder to match the form
### Create a New Extension Link

- Click on **Create > Link**
- In the form:
    - Choose a name for your extension, the name is a technical field and should not contain spaces or specials characters
    - Leave the position to the default value **Product Header**

    ::: info
    There is 3 positions available for the type Link:

    - Product Header
    - Product Model Header
    - Sub-Product Model Header

    see more in [positions](/extensions/positions.html)
    :::

    - Enter a **default label**, this label will be displayed in the UI. You can name your extension in reference to its purpose (e.g., "link to Google")
    - In the **URL** field, paste the following **URL**: https://www.google.com/search?q=%uuid%

### Test the link

Find your newly created UI-extension in the UI:
- **Product Header** → At the top section of a product or variant enrichment page.

::: warning
You need to refresh the page to see the button appear
:::    

- Click on the newly created button
- A new tab opens following the configured URL. It uses the current value of the product UUID!

// TODO: move to top page
**Congratulations**, you have created your first Extension!
Learn more about the availables types of Extension in the [Types section](/extensions/types-overview.html).

## Administration of UI extensions
For a deeprer overview of the Extension administration panel and permissions, see our [Help Center](https://help.akeneo.com/extensions/ui-extentions).

::: panel-link Extensions available types [Next](/extensions/types-overview.html)
:::
