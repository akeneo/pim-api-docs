# Understand Akeneo PIM

## Introduction

### Where can I find the user documentation of Akeneo PIM?

We could spend a lot of time explaining you each PIM's features but there are quite a lot of them... the easiest way is to consult our user documentation that you can find in our [Akeneo Help center](https://help.akeneo.com/pim/index.html).

If you feel that a comprehensive training program would allow you to know everything about Akeneo PIM, we have a complete training program. Do not hesitate to register to one of our [training sessions](https://www.akeneo.com/training/).

### What are Akeneo PIM versions?

First you can consult [this article](https://www.akeneo.com/blog/akeneo-introduces-a-simpler-product-release-cycle/) to understand our PIM release cycle.

Then, in order to understand our latest versions and their functional scope, you can consult our [release notes](https://www.akeneo.com/release-notes/) on our website.

You can also consult our [helpdesk platform](http://helpdesk.akeneo.com/) to know what are our last supported PIM versions or if you don't have access to our Helpdesk platform, please [contact us](https://www.akeneo.com/contact/).

### What are Akeneo PIM editions?

In order to understand our edition and its capabilities, you can consult our [dedicated page](https://www.akeneo.com/compare-editions/) on our website.

### Can I have access to an Akeneo PIM platform?

What could be better than manipulating our PIM to understand its features?

**PIM Community Edition features**
We have a freely available Akeneo PIM Community Edition demo platform that will allow you to start getting familiar with Akeneo PIM:

[https://demo.akeneo.com](https://demo.akeneo.com)  
Login/Password: admin / admin

:::warning
Please note that this Akeneo PIM CE demo instance is for exploratory purposes only and will only allow you to start getting familiar with Akeneo PIM. This instance is reset frequently and is therefore not intended to be used to build a connector.
:::

**PIM Enterprise Edition features**

If you need an Akeneo PIM Enterprise Edition instance to start developing your connector, please [contact us](https://www.akeneo.com/contact/).

# Understand Akeneo PIM data

The purpose of this chapter is not to redo the PIM documentation but to explain where to find the information and, above all, to point out PIM features/properties to be taken into consideration in a context of developing an eCommerce connector.

## Attribute

**What is an attribute?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute.html) to know everything about attributes.

::: info
**Key points:**
* Some attributes are just a link to a specific PIM data structure (Simple and multi select, Asset collection, Reference entity single and multiple links, Metric)
* Some attributes can be **"scopable"** (attribute content dedicated to a specific **"channel"**) **and/or** **"localizable"** (attribute content dedicated to a specific PIM **"locale"**)
:::

## Attribute option

**What is an option?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/manage-your-attributes.html#manage-simple-and-multi-selects-attribute-options) to know everything about options

::: info
**Key points:**
* Options for simple and multi select attributes can be translated in any enabled locale in the PIM.
:::

## Attribute group

**What is an attribute group?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-an-attribute-group.html) to know everything about attribute groups.

::: info
**Key points:**
* Attribute groups are for Akeneo PIM internal purposes only (To organize product attributes and to set permissions for Akeneo PIM EE contributors)
:::

## Family

**What is a family?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-a-family.html) to know everything about families.

::: info
**Key points:**
* A family is a set of attributes for product
* The family properties define:
  * Which attribute is the product label
  * Which attribute is the main picture
:::

## Family variant

**What is a family variant?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-products-variants.html#what-is-a-family-variant) to know everything about family variants.

::: info
**Key points:**
* A family variant defines the structure of products with variants (Product model(s) + Products) and gives you this information:
  * Number of variation levels
  * Attribute(s) defined as an axis of variation
  * Distribution of attributes by variation level
:::

## Category

**What is a category?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-a-category.html) to know everything about Akeneo PIM categories.

::: info
**Key points:**
* An Akeneo PIM category is just a label (no associated structure or rich information).
* A category label can be translate in any enable locale in the PIM.
* A product or a product model can be associated to one or more categories.
* You can have different category trees in Akeneo PIM.
:::

## Asset

**What is a asset?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-assets.html) to know everything about assets.

::: info
**Key points:**
* An asset can represent an image, a video or a file (i.e PDF)
* An asset is a structure with asset attributes like label, description, file or URL…
* An asset is associated to a product or a product model through an “asset collection attribute”.
* An “asset collection attribute“ can be localizable (Different assets for different locales) and/or scopable (Different assets for different destination channel)
:::

## Asset attributes

**What is an asset attribute?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-assets.html#what-are-the-asset-attributes) to know everything about asset attributes.

::: info
**Key points:**
* An asset attribute can be localizable and/or scopable.
* A media link asset attribute is an attribute that handle URL (external media from a CDN for example).
* A media link asset attribute can have a "prefix" and a "suffix" to complete the media link asset attribute value and composed the final URL.
* A media file asset attribute is an attribute that handle binaries hosted by Akeneo PIM.
* A media file or media link attribute have a “type” in its properties to defined the if it is an image, a video, a file...
:::

## Asset options

**What is an asset option?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/manage-asset-families.html#manage-the-options) to know everything about asset option.

::: info
**Key points:**
* Options for simple and multi select asset attributes can be translated in any enabled locale in the PIM.
:::

## Asset family

**What is an asset family?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-assets.html#what-is-an-asset-family) to know everything about asset families.

::: info
**Key points:**
* An asset family is a set of attributes for assets
* The asset family properties define:
  * Which asset attribute is the main media attribute.
  * Which attribute is the main picture.
:::

## Reference entity

**What is a reference entity?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-reference-entities.html) to know everything about Reference entities.

::: info
**Key points:**
* A reference entity has its own attributes (in its properties).
* A reference entity defines also a set of attributes for its *reference entities records*
:::

## Reference entity record

**What is a Reference entity record?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-reference-entities.html#what-is-a-record) to know everything about reference entity records.

::: info
**Key points:**
* A Reference entity record may be related to one or several products
:::

## Reference entity attribute

**What is a Reference entity attribute?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/manage-reference-entities.html#define-its-records-attributes) to know everything about reference entity attributes.

::: info
**Key points:**
* A reference entity attribute can be localizable or scopable
* You can have a reference entity record link to another reference entity record through a "reference entity single or multiple link" attribute...
:::

## Reference entity option

**What is a reference entity option?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/manage-reference-entities.html#manage-the-options) to know everything about reference entity options.

::: info
**Key points:**
Options for simple and multi select Reference entity attributes can be translated in any enabled locale in the PIM.
:::

## Product/Product model
**What is a product?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/create-a-product.html#mainContent) to know everything about products.

**What is a product model?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-about-products-variants.html#what-is-a-product-model) to know everything about product models.

::: info
**Key points:**
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

# Published Product

**What is a “published” product?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/publish-workflow.htm) to know everything about “published” products.

::: info
**Key points:**
* A “published” product is only used by some of our customers who need to organize their PIM work by having 2 versions of the product:
  * A version in draft mode
  * A "published" version ready to be exported
:::

# Association
**What is an association?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/products-associations.html) to know everything about product associations.

::: info
**Key points:**
* Akeneo PIM have different type of association (Cross-sell, up-sell, substitution, pack…) but a customer can also build “custom” association types.
* A product “association” can be at product level and/or at product model level.
:::

# Channel
**What is a channel?**
Please read our [Akeneo help center](https://help.akeneo.com/pim/serenity/articles/what-is-a-channel.html) to know everything about channels.

::: info
**Key points:**
* A channel (scope) defines a selection of products and information to export for a specific destination (like eCommerce).

It works like a filter on the product catalog and has the following properties:

  * It is linked to a category tree (and only one!)
  * It has one or more enabled locales
  * It has one or several currencies
  * It has a dedicated completeness
  * It has its own measurement conversions.
:::
