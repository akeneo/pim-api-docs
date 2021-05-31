# More about events

## Enterprise Edition (EE) permission application

::: warning
The following paragraph is for EE customers.
:::

You may ask yourself how EE permissions apply to the event subscription. 
Indeed, Akeneo PIM uses the permissions related to the connection user group to filter what it is supposed to send or not. 

That's why when you enable the event subscription & setup your connection permissions, you have to keep in mind the following information:
- **Akeneo PIM sends events on products your connection can view.** 

To receive an event, your connection user group must, at least, view one of the product categories.  
N.b. By default, if the product is `Unclassified`, the connection will receive the event. 

- **Akeneo PIM sends product events even if the updated values aren't accessible by the connection.** 

Here are a couple of examples to highlight different scenarios
### Permissions based on attribute groups
The ERP code of a product is updated. Your e-commerce connection doesn't have access to the attribute group containing the ERP code but will receive an event anyway. In the event payload, there will be no mention of the newly updated ERP code, to respect the permission granted at the attribute group level. 
### Permissions based on locales
Another example, the translation team updates the Italian description of the product. Your e-commerce connection doesn't have access to the Italian locale but will receive an event anyway. In the event payload, there will be no mention of the newly updated Italian description, to respect the permission granted at the locale level. 

## Event format

If you need details about the event format, please take a look at our [Events API Reference](/events-reference/events-reference-serenity/products.html)
