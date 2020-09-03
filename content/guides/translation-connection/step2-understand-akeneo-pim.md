# Understand Akeneo PIM

## Versions and editions

First, it is crucial for you to understand that Akeneo PIM exists in different flavours, depending on its version and edition.

To know more about the different PIM versions, you can consult [this article](https://www.akeneo.com/blog/akeneo-introduces-a-simpler-product-release-cycle/) to understand our PIM release cycle.

You can also consult our [release notes](https://www.akeneo.com/release-notes/) and our ["new key features released" page](https://help.akeneo.com/pim/serenity/whats-new.html) to understand what are our last Akeneo supported **versions** and the features we have added in each one.

Then, in order to understand our different **editions** and their capabilities, you can consult our [dedicated page](https://www.akeneo.com/compare-editions/) on our website.

## PIM features and data model

>Let's play with Akeneo PIM!

It is crucial to understand the PIM features and data model in order to create a great eCommerce connector.

The best way to become an expert in Akeneo PIM is to play with it!  
You can access our [Akeneo PIM Community Edition demo platform](https://demo.akeneo.com) (login/password: admin / admin).

:::warning
Please note that this Akeneo PIM CE demo instance is for exploratory purposes only and will only allow you to start getting familiar with Akeneo PIM. This instance is reset frequently and is therefore not intended to be used to build a connector.
:::

If you need an Akeneo PIM **Enterprise Edition** instance to start developing your connector, please [contact us](https://www.akeneo.com/contact/).

### Acquire PIM knowledge

We advise you to take a look at our [Helpcenter](https://help.akeneo.com/pim/index.html) where you'll find a lot of documentation about all our features.

If you feel that a comprehensive training program would allow you to know everything about Akeneo PIM, we got you covered as well with our [training sessions](https://www.akeneo.com/training/). Don't hesitate to register!

In the context of developing an online Translation connector, here is a selection of PIM concepts you'll need to master before developing anything:
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

Now that you have a good overview and knowledge of Akeneo PIM, you are probably wondering **what types of PIM data** you can consider in the context of your translation service.

As you may have understood, Akeneo PIM is a powerful and flexible tool that can be structured **in so different ways** to meet customer needs.

For example, a PIM product structure **can be different from one product to another** : each type of product have its own [**family**](https://help.akeneo.com/pim/serenity/articles/what-is-a-family.html#mainContent).

Some product attributes may be "[**localizable**](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute.html#specific-properties-of-attributes)" (different attribute values compared to PIM locales) AND/OR "[**scopable**](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute.html#specific-properties-of-attributes)" (different attribute values compared to PIM channels).

:::info
To find out which Akeneo product attribute types to consider, please consult first our [PIM attribute types list](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute.html#akeneo-attribute-types).
:::

And you will find below the **localizable text attribute type list** you could consider in the context of your connector :

|  Product attribute type  |        Comments     |  
| :----------------------- | :-----------------: |  
| Text                     |                     |
| Text area                | This attribute can be declared as a "rich" text (with some HTML tags )     |
| Simple select            | This attribute contains option IDs but theses options can be localizable |
| Multiple select          | This attribute contains option IDs but theses options can be localizable |
