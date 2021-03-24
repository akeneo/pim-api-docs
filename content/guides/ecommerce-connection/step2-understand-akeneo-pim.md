# Understand Akeneo PIM

## Versions and editions

First, it is crucial for you to understand there are several types of PIMs at Akeneo, depending on its version and edition.

To know more about the different PIM versions, you can consult [this article](https://www.akeneo.com/blog/akeneo-introduces-a-simpler-product-release-cycle/) to understand our PIM release cycle.

You can also consult ["what's new ?" page](https://help.akeneo.com/pim/serenity/whats-new.html) or our [release notes](https://www.akeneo.com/release-notes/) to understand the scope of each version.

To finish, you'll find what our last supported PIM versions are on our [helpdesk platform](http://helpdesk.akeneo.com/). If you can't access it, please [contact us](https://www.akeneo.com/contact/).

Then, in order to understand our different editions and their capabilities, you can consult our [dedicated page](https://www.akeneo.com/compare-editions/) on our website.

## Features and data model

Play with our PIM!

It is crucial to understand the PIM features and data model in order to create a great eCommerce connector.

The best way to become an expert at Akeneo PIM is to play with it!  
Here, you can access our [Akeneo PIM Community Edition demo platform](https://demo.akeneo.com) (login/password: admin / admin).

:::warning
Please note that this Akeneo PIM CE demo instance is for exploratory purposes only and will only allow you to start getting familiar with Akeneo PIM. This instance is reset frequently and is therefore not intended to be used to build a connector.
:::

If you need an Akeneo PIM **Enterprise Edition** instance to start developing your connector, please [contact us](https://www.akeneo.com/contact/).

## Acquire PIM knowledge

We advise you to take a look at our [Helpcenter](https://help.akeneo.com/pim/index.html) where you'll find a lot of documentation about all our features

If you feel that a comprehensive training program would allow you to know everything about Akeneo PIM, we got you covered as well with our [training sessions](https://www.akeneo.com/training/). Don't hesitate to register!

In the context of building an eCommerce connector, here is a selection of  PIM concepts you'll need to master before developing anything:
- The [product](/concepts/products.html#product),
- The [product model](/concepts/products.html#product-model),
- The [family](/concepts/catalog-structure.html#family),
- The [family variant](/concepts/catalog-structure.html#family-variant),
- The [attribute](/concepts/catalog-structure.html#attribute),
- The [attribute option](/concepts/catalog-structure.html#attribute-option),
- The [attribute group](/concepts/catalog-structure.html#attribute-group-v2),
- The [category](/concepts/catalog-structure.html#category),
- The [association type](/concepts/catalog-structure.html#association-type),
- The [channel](/concepts/target-market-settings.html#channel),
- The [reference entity](/concepts/reference-entities.html),
- The [asset](/concepts/asset-manager.html).

:::info
If you need to go deeper, the purpose of the next chapters is not to redo the PIM documentation but to explain where to find the information and, above all, to point out PIM features/properties to be taken into consideration **in a context of developing an eCommerce connector**.
:::

## Product

### Product and Product model
**What is a product?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/create-a-product.html#mainContent) to know everything about products.

**What is a product model?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-products-variants.html#what-is-a-product-model) to know everything about product models.

::: info
* A product model is used to enrich products' common properties.

* A product can be:
  * A structure that represents a ”simple” product with no variation (no parent)
  * A structure that represents the last level of a product variation (with a product model as parent).

|   Common    |  Variation level 1 |
| :---------- | :----------------: |
|Product Model|     Products       |         

|  Common     | Variation level 1   | Variation level 2     |
| :---------- | :-----------------: | :--------------------:|                           
|Product model| Product models      | Products              |

* The structure of a product with variation (Product models+Product) is defined in the family variant.

* A product inherits the attributes defined in its product models.

* A product varies along a variation axis which is one of the product attributes which can be of type:
  * Simple select
  * Simple reference data
  * Reference entity single link (EE only)
  * Measurement
  * Boolean (Yes/No)
:::

### Published Product

**What is a “published” product?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/publish-workflow.htm) to know everything about “published” products.

::: info
* A “published” product is only used by some of our customers who need to organize their PIM work by having 2 versions of the product:
  * A version in draft mode
  * A "published" version ready to be exported
:::


## Catalog structure

### Family

**What is a family?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-a-family.html) to know everything about families.

::: info
* A family is a set of attributes for product
* The family properties define:
  * Which attribute is the product label
  * Which attribute is the main picture
:::

### Family variant

**What is a family variant?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-products-variants.html#what-is-a-family-variant) to know everything about family variants.

::: info
* A family variant defines the structure of products with variants (Product model(s) + Products) and gives you this information:
  * Number of variation levels
  * Attribute(s) defined as an axis of variation
  * Distribution of attributes by variation level
:::

### Attribute

**What is an attribute?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute.html) to know everything about attributes.

::: info
* Some attributes are just a link to a specific PIM data structure (Simple and multi select, Asset collection, Reference entity single and multiple links, Metric)
* Some attributes can be **"scopable"** (attribute content dedicated to a specific **"channel"**) **and/or** **"localizable"** (attribute content dedicated to a specific PIM **"locale"**)
:::

### Attribute option

**What is an option?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/manage-your-attributes.html#manage-simple-and-multi-selects-attribute-options) to know everything about options

::: info
* Options for simple and multi select attributes can be translated in any enabled locale in the PIM.
:::

### Attribute group

**What is an attribute group?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute-group.html) to know everything about attribute groups.

::: info
* Attribute groups are for Akeneo PIM internal purposes only (To organize product attributes and to set permissions for Akeneo PIM EE contributors)
:::


### Category

**What is a category?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-a-category.html) to know everything about Akeneo PIM categories.

::: info
* An Akeneo PIM category is just a label (no associated structure or rich information).
* A category label can be translate in any enable locale in the PIM.
* A product or a product model can be associated to one or more categories.
* You can have different category trees in Akeneo PIM.
:::

### Association
**What is an association?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/products-associations.html) to know everything about product associations.

::: info
* Akeneo PIM have different type of association (Cross-sell, up-sell, substitution, pack…) but a customer can also build “custom” association types.
* A product “association” can be at product level and/or at product model level.
* New: since the 5.0, we have quantity for association. Please consult this [dedicated documentation](https://help.akeneo.com/pim/serenity/updates/2020-07.html#new-association-type-with-quantities).
:::

## Target marketing settings

### Channel
**What is a channel?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-a-channel.html) to know everything about channels.

::: info
* A channel (scope) defines a selection of products and information to export for a specific destination (like eCommerce).

It works like a filter on the product catalog and has the following properties:

  * It is linked to a category tree (and only one!)
  * It has one or more enabled locales
  * It has one or several currencies
  * It has a dedicated completeness
  * It has its own measurement conversions.
:::

### Locale
**What is a locale?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-a-locale.html) to know everything about locales.

::: info
* A locale allow to translate some product information
* Only some specific product attributes can be declared as "localizable" (different content for this attribute compared to PIM enabled locales).
* There is no default locale in the PIM.
:::

### Currency
**What is a currency?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/manage-your-currencies.html) to know everything about currencies.

::: info
* A currency is applied to "Price" attribute type.
:::

### Measurement
**What is a measurement?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-measurements.html) to know everything about measurements.

::: info
* A measurement family is used to gather the units concerning the same product measurement.
* A measurement attribute is based on a measurement family.
:::

## Reference entities

### Reference entity

**What is a reference entity?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-reference-entities.html) to know everything about Reference entities.

::: info
* A reference entity has its own attributes (in its properties).
* A reference entity defines also a set of attributes for its *reference entities records*
:::

### Reference entity record

**What is a Reference entity record?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-reference-entities.html#what-is-a-record) to know everything about reference entity records.

::: info
* A Reference entity record may be related to one or several products
:::

### Reference entity attribute

**What is a Reference entity attribute?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/manage-reference-entities.html#define-its-records-attributes) to know everything about reference entity attributes.

::: info
* A reference entity attribute can be localizable or scopable
* You can have a reference entity record link to another reference entity record through a "reference entity single or multiple link" attribute...
:::

### Reference entity option

**What is a reference entity option?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/manage-reference-entities.html#manage-the-options) to know everything about reference entity options.

::: info
* Options for simple and multi select Reference entity attributes can be translated in any enabled locale in the PIM.
:::

## Asset management

### Asset

**What is an asset?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-assets.html) to know everything about assets.

::: info
* An asset can represent an image, a video or a file (i.e PDF)
* An asset is a structure with asset attributes like label, description, file or URL…
* An asset is associated to a product or a product model through an “asset collection attribute”.
* An “asset collection attribute“ can be localizable (Different assets for different locales) and/or scopable (Different assets for different destination channel)
:::

### Asset attributes

**What is an asset attribute?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-assets.html#what-are-the-asset-attributes) to know everything about asset attributes.

::: info
* An asset attribute can be localizable and/or scopable.
* A media link asset attribute is an attribute that handle URL (external media from a CDN for example).
* A media link asset attribute can have a "prefix" and a "suffix" to complete the media link asset attribute value and composed the final URL.
* A media file asset attribute is an attribute that handle binaries hosted by Akeneo PIM.
* A media file or media link attribute have a “type” in its properties to defined the if it is an image, a video, a file...
:::

### Asset options

**What is an asset option?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/manage-asset-families.html#manage-the-options) to know everything about asset option.

::: info
* Options for simple and multi select asset attributes can be translated in any enabled locale in the PIM.
:::

### Asset family

**What is an asset family?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-assets.html#what-is-an-asset-family) to know everything about asset families.

::: info
* An asset family is a set of attributes for assets
* The asset family properties define:
  * Which asset attribute is the main media attribute.
  * Which attribute is the main picture.
:::
