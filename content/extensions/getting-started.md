# Extensions

The **Extensions** solution is designed to enhance and customize the PIM user experience by allowing you to add new features and functionalities tailored to your specific business needs.

By leveraging the Extensions solution, you can take advantage of various plugins and customizations that improve usability and streamline processes. Whether you need to automate repetitive tasks, or generate advanced reports for better insights, the Extensions solution provides the flexibility to enhance the PIM experience. Our comprehensive documentation and support resources will guide you through the process of discovering creating, and managing extensions, empowering you to maximize the value of your product information.

# Getting started
In this section, you will learn how to create your first UI Extension in under a minute. By following this quick guide, you'll gain the skills needed to effectively use the UI for creating and managing UI Extensions.

### Prerequisites
Having the proper permisison to create and manage UI-Extensions.

### Access the UI-extensions management Interface

- Navigate to the UI-extensions list, in the `PIM System > Ui Extensions`
screenshot

### Create a New UI-extension Link

- Click on **Create > Link**
- In the form:
    - Choose a name for your extension, the name is a technical field and should not contain spaces or specials characters
    - Leave the position to the default value **Product Header**

    ::: info
    There is 3 position available for the type Link:

    - Product Header
    - Product Model Header
    - Sub-Product Model Header

    see more in [positions](/extensions/positions.html)
    :::

    - Enter a **default label**, this label will be displayed in the ui. You can name your extension in referebnce to its purpose (e.g., "link to ERP")
    - In the **URL** field, paste the following **URL**: https://www.google.com/search?q=%uuid%

### Test the link

Find your newly created UI-extension in the UI:
- **Product Header** → At the top section of a product enrichment page (also a variant product)

::: warning
You might need to refresh the page to see the button appear
:::    

- Click on the newly created button
- A new tab open following the configured URL. It uses the current value of the product uuid!

**Congratulation**, you have created your first UI-extension!
Learn more about the availables types of UI-extension in the [Types section](/extensions/types.html).

## Administration of UI extensions
For a deeprer overview of the Ui extension administration panel and permissions, see our [Help Center](https://help.akeneo.com/extensions/ui-extentions).

::: panel-link UI extensions available types [Next](/extensions/types.html)
:::
