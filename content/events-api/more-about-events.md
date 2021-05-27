# More about events

## EE permission application

::: warning
The following paragraph is for EE customers.
:::

You may ask yourself how EE permissions apply to the event subscription. 
Indeed, Akeneo PIM uses the permissions related to the connection user group to filter what it has to send or not. 

That's why when you enable the event subscription & setup your connection permissions, you have to keep in mind the following information:
- **Akeneo PIM sends events on products your connection can view.** 

To receive an event, your connection user group must, at least, view one of the product categories.  
N.b. If the product has no category at all, the connection will receive the event. 

- **Akeneo PIM sends product events even if the updated values aren't accessible by the connection.** 

For example, Julia updates the ERP code of a product. Your e-commerce connection doesn't have access to the attribute group containing the ERP code but will receive an event anyway.  
Another example, Julia updates the Italian description of the product. Your e-commerce connection doesn't have access to the Italian locale but will receive an event anyway.  
However, Akeneo PIM applies the EE permissions to the data it sends. So, the payload doesn't contain values the connection can't access. 

## Event format

If you need details about the event format, please take a look at our [Events API Reference](/events-reference/events-reference-serenity/products.html)