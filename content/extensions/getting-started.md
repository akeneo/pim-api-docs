# Getting started
In this section, you will learn how to create your first Extension in under a minute. By following this quick guide, you'll gain the skills needed to effectively use the UI for creating and managing Extensions.

### Prerequisites
Having the proper [permission](https://help.akeneo.com/extensions/ui-extentions#permissions) to create and manage Extensions.

### Access the Extensions management Interface

- Navigate to the Extensions list, in the `PIM System > Extensions`

### Create a New Extension Link

- Click on **Create > Link**
- In the form:
    - Choose a **name** for your Extension, the name is a technical field and should not contain spaces or specials characters
    - Enter a **label**, this label will be displayed in the UI. You can name your Extension in reference to its purpose (e.g., "link to Google")
    - Leave the position to the default value **Product Header**

    ::: info
    There is 3 positions available for the type Link:

    - Product Header
    - Product Model Header
    - Sub-Product Model Header

    see more in [positions](/extensions/positions.html)
    :::

    - In the **URL** field, paste the following **URL**: https://www.google.com/search?q=%uuid%

### Test the link

Find your newly created Extension in the UI:
- **Product Header** → At the top section of a product or variant enrichment page.

::: warning
You need to refresh the page to see the button appear
:::    

- Click on the newly created button
- A new tab opens following the configured URL. It uses the current value of the product UUID!

**Congratulations**, you have created your first Extension!

## Administration of Extensions
For an overview of the Extension administration panel and permissions, see our [Help Center](https://help.akeneo.com/extensions/ui-extentions).

::: panel-link Extensions available types [Next](/extensions/types-overview.html)
:::
