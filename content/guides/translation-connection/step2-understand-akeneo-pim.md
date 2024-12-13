# Understand Akeneo PIM

To become an Akeneo PIM master, we have many different tools to help you!

## PIM features and data model

### Acquire PIM knowledge

First of all, we advise you to take a look at our [Helpcenter](https://help.akeneo.com/pim/index.html) where you'll find a lot of documentation about all our features.

Then, if you feel like it wasn't enough, we designed a comprehensive training program to share everything we know about Akeneo PIM. As you can see, we got you covered as well with our [training sessions](https://partner-akademy.akeneo.com/app-development-journey). Don't hesitate to register!

Before you actually start coding to develop your online translation App, here is a selection of PIM concepts you'll need to master:
- The [product](/concepts/products.html#product),
- The [product model](/concepts/products.html#product-model),
- The [family](/concepts/catalog-structure.html#family),
- The [family variant](/concepts/catalog-structure.html#family-variant),
- The [attribute](/concepts/catalog-structure.html#attribute),
- The [attribute option](/concepts/catalog-structure.html#attribute-option),
- The [channel](/concepts/target-market-settings.html#channel),
- The [reference entity](/concepts/reference-entities.html),
- The [asset](/concepts/asset-manager.html).

### PIM product data that can be translated

Now that you have a good overview and knowledge of Akeneo PIM, you are probably wondering **what types of PIM data** you can take into account here. 

It is now crystal clear for you that, Akeneo PIM is a powerful and flexible tool that can be structured **in so many different ways** to meet customer needs.

For example, a PIM product structure **can be different from one product to another**: each type of product has its own [**family**](https://help.akeneo.com/pim/serenity/articles/what-is-a-family.html#mainContent).

Some product attributes may be "[**localizable**](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute.html#specific-properties-of-attributes)" (different attribute values for each PIM locale) AND/OR "[**scopable**](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute.html#specific-properties-of-attributes)" (different attribute values for each PIM channel).

:::info
To find out which Akeneo product attribute types to take into account, please consult first our [PIM attribute types list](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute.html#akeneo-attribute-types).
:::

In order to help you, here is the **localizable text attribute type list** we recommend you to use:

|  Product attribute type  |        Comments     |  
| :----------------------- | :-----------------: |  
| Text                     |                     |
| Text area                | This attribute can be declared as a "rich" text (with some HTML tags )     |
| Simple select            | This attribute contains option IDs but these options can be localizable |
| Multiple select          | This attribute contains option IDs but these options can be localizable |
