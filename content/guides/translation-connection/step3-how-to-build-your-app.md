# How to build your App?

## Follow the guide!

Now that you have a good overview of Akeneo PIM data, you are probably wondering how your online translation App will interact with Julia while being compatible with all of our PIM editions.

The best way to do this is to develop an App! We have ["complete guide"](https://api.akeneo.com/apps/introduction.html) to help you to connect it to the PIM.

![Translation App overview](../../img/guides/translation-connection-macro.svg)

:::tips
Please don't hesitate to read our ["4 reasons why you should use our API"](https://api.akeneo.com/documentation/why-the-api.html#4-reasons-why-you-should-use-our-api) page!
:::

We suggest following our method which leans on some useful existing PIM features to interact with Julia.

This method is based the specifications of [GlobalLink Connect for Akeneo](https://marketplace.akeneo.com/extension/globallink-connect-akeneo) from the [Translations.com](https://www.translations.com) company.

## Some pre-requisites

First of all, we're going to ask Julia to do some work!  
Indeed, in order for your App to interact with Julia, we will have to ask her to **check some pre-requisites** and to **add some additional data** in her PIM.

### Check Julia's PIM data

Then, in order for your App to be able to add translations, Julia's PIM must be correctly set up.

:::warning
That's why you must check with Julia that in her PIM:
* All locales required for translations have been activated.
* All attributes requiring translation for products or product models are set to "localizable".
:::

### Create a translation attribute group

First, in order not to confuse these new product attributes with some of her other product attributes, it is necessary for Julia to create **a specific attribute group** named `Translations`.

To create this attribute group:
1. Go to `Settings > Attribute groups`
2. Click on `CREATE` in the top-right corner
3. Add a new attribute group with the code and label: `Translations`.


### Create translation attributes

Then, Julia must create 6 new attributes in this attribute group:

* `Translation submission name`: This attribute allows Julia to set a name for her translation project. It'll also allow her to easily find the project in the interface of your online translation solution. Set up this attribute as followed:
  - Attribute type: text
  - Attribute code: `translationName`
  - Attribute label: `Translation submission name`
  - Attribute group: `Translations`
  - Usable in grid: enabled
* `Translation submitter`: This attribute allows Julia to associate her name with her translation project. Among its options, this simple select attribute should list all the possible contributor names. Set up this attribute as followed:
  - Attribute type: simple select  
  - Attribute code: `translationSubmitter`
  - Attribute label: `Translation submitter`
  - Attribute group: `Translations`
  - Usable in grid: enabled
* `Translation queued`: This attribute allows Julia to define if a product needs to be translated. Set up this attribute as followed:
  - Attribute type: Yes/No (Boolean)
  - Attribute code: `translationQueued`
  - Attribute label: `Translation queued`
  - Attribute group: `Translations`
  - Usable in grid: enabled
* `Translation locales`: This attribute allows Julia to choose one or more target locales for her translation project. This multi-select attribute should contain, in its `options`, all the possible destination locales Julia can use for her translation requests. These same `locales` must already exist in Akeneo PIM and in your online translation tool. Set up this attribute as followed:
  - Attribute type: multi-select
  - Attribute code: `translationLocales`
  - Attribute label: `Translation locales`
  - Attribute group: `Translations`
  - Usable in grid: enabled
* `Translation due date`: This attribute allows Julia to indicate when she would like her products to be translated. Set up this attribute as followed:
  - Attribute type: date
  - Attribute code: `translationDate`
  - Attribute label: `Translation due date`
  - Attribute group: `Translations`
  - Usable in grid: enabled  
* `Translation status`: This attribute allows your translator to give a status about the translation project to Julia. As this attribute has a `Read only` property, it can't be modified by Julia. This status can only be modified by your App through the API and set the translation project status for each desired locale. This attribute contains these options:    
  |      Code      |     Label      |
  | :------------- | :------------- |
  | INPROGRESS     | In progress    |
  | TRANSLATED     | Translated     |
  | CANCELLED      | Cancelled      |
  Then, set up this attribute as followed:
  - Attribute type: simple select  
  - Attribute code: `translationStatus`
  - Attribute label: `Translation status`
  - Attribute group: `Translations`  
  - Value per locale: enabled (in order to have a status for each locale)    
  - Read only: enabled (can only be modified via API)   
  - Usable in grid: enabled

::: tips
To create an attribute:
1. Go to `Settings > Attributes`
2. Click on `CREATE ATTRIBUTE` in the top-right corner of the screen
:::

:::info
This list of attributes is not exhaustive and may need to be adapted depending on your online translation solution and the information required to perform a translation project.
:::

Once the `Translation` attribute group and its attributes have been created, Julia needs to assign the `Translations` attribute group to all existing families.

:::tips
Julia can do this by using this [bulk action](https://help.akeneo.com/pim/serenity/articles/product-mass-actions.html) process:
1. Go to `Settings > Families`
2. Select all families
3. Click on `BULK ACTIONS` at the bottom of the page
4. Select `Set attributes requirements` and then click on `NEXT`
5. Click on `ADD BY GROUPS` and `ADD` the `Translations` attribute group
6. Click on `CONFIRM`
:::

And that's it! Congratulations! 🎉  
Everything is now ready for Julia to receive the PIM products she wants to translate!

## Julia's translation process

As you have understood, Julia will use the previous PIM attributes to define which of her products are to be translated and how they will be processed.

Now let's see how Julia will work with these new PIM translation features.

### Select the products to be translated

First, Julia needs to select the product she wants to translate:
1. Go to `Products`
2. Select the "source" locale
3. Select the products (and/or product models) you want to translate

:::tips
For a seamless product selection, Julia can use her PIM grid [filtering](https://help.akeneo.com/pim/serenity/articles/products-grid.html#use-filters) system or create a [specific view](https://help.akeneo.com/pim/serenity/articles/manage-your-views.html).
:::

### Perform a "bulk action"

Then, she needs to perform a [bulk action](https://help.akeneo.com/pim/serenity/articles/product-mass-actions.html) on these products.

For this action, Julia has to:
1. Click on `BULK ACTIONS` at the bottom of the page
2. Select `Edit attributes values` and click on `NEXT`
3. In `SELECT ATTRIBUTES`, search and select these 5 translation attributes and click on `ADD`:
    * Translation submission name
    * Translation submitter
    * Translation queued
    * Translation locales
    * Translation due date
4. Now set the translation attributes:
    * `Translation name`: Enter the desired name for the translation project,
    * `Translations submitter`: select Julia's name,
    * `Translation queued`: Select `Yes` to enable the attribute,
    * `Translation locales`: select the desired target locales for translation,
    * `Translation due date`: select the translation deadline.
5. Click on `NEXT` and `CONFIRM` to launch the bulk action.

After this last action, the bulk action will run and Julia will be notified in the Akeneo PIM notification bar once it is successfully executed.

With these new attributes, your App is now ready to go! Let's see how it'll behave on the other side of the App.

### How it works with your App?

**Find products with the "translation queued" status enabled**

At regular intervals, your App will need to retrieve products where the `Translation queued` attribute has been set to enable (set to `true`).

You can do this by using our PIM [API filtering system](https://api.akeneo.com/documentation/filter.html#filter-on-product-values) on product attribute value.

**Tell Julia that her translation project is "in progress"**

Then, your App needs to set the "translation queued" attribute to `false` (To prevent the product from being reprocessed by the App) and change the `Translation status` attribute to `IN PROGRESS` to indicate Julia that the translation is being processed by one of your translators.

**Retrieve "text" product attributes**

You have 2 possibilities to develop this action:

* The simplest but less automatic way is that, directly in your App configuration, Julia and Peter declare the exhaustive list of text attributes to be translated (by product family). Then, your App has to consult this list one family at a time.
* The other way is that your App can analyze the PIM product families to determine which attributes have a "text" type and, therefore, can be translated. It must also check that the attribute is "localizable".

:::info
We suggest that you develop the first solution during the first iteration of your App. If in your projects Julia handles a large number of product families with many attributes to translate, you can then upgrade your App with the second solution.
:::

:::tips
Using the ["get a list of products"](https://api.akeneo.com/api-reference.html#get_products) API endpoint (with the correct filter), your App will retrieve a JSON structure of each localizable products.

Then, with the help of the family code of these products, your App will be able to call the ["get the list of attributes"](https://api.akeneo.com/api-reference.html#get_attributes) API endpoint to retrieve each attribute type that composes this product family.

By analyzing these types, you will be able to define for your translator which are the textual attributes they need to translate.
:::

**What about simple and multi select attribute types?**

We mentioned [earlier](step2-understand-akeneo-pim.html#pim-product-data-that-can-be-translated) that it would be interesting for your App to allow the translation of "simple" or "multi select" type attributes.

To do so, Julia and Peter can declare the exhaustive list of "simple" or "multi select" attributes in your App configuration, just as they do for "text" attributes.

When Julia requests the translation of a product, your App will then automatically translate the "options" of the "simple" or "multi select" attributes that have not been translated yet.  

:::tips
To perform this action, your App can use the ["get list of attribute options"](https://api.akeneo.com/api-reference.html#get_attributes__attribute_code__options) API endpoint.
:::

**Tell Julia that her translation project is either finished...**

When the translation is finished, your translator needs to set the `Translation status` attribute to `TRANSLATED` and to send all the translated product data back in the PIM.

**...or has been cancelled.**

If, for some reason, the translation project has been canceled, your translator needs to set the `Translation status` attribute to `CANCELLED` and to send this product data back into the PIM.

:::info
To develop these App actions, and to understand our API, please follow our [wonderful dedicated API documentation](https://api.akeneo.com)!
:::

### Check the "Translation status"

Now let's go back to Julia's side and see how she can check her translation project status.

As the `Translation status` has been declared as `Usable in grid`, Julia can:
* [Customise her grid](https://help.akeneo.com/pim/serenity/articles/products-grid.html#customise-the-grid) to add the `Translation status` attribute: this will allow her to sort her products according to their translation status.
* Add the `Translation status` attribute in her [grid filters](https://help.akeneo.com/pim/serenity/articles/products-grid.html#use-filters): this will allow her to filter only products with a specific translation status and create a dedicated [view](https://help.akeneo.com/pim/serenity/articles/manage-your-views.html#work-with-the-views) for this feature.

Of course, she can do the same for all the other "Translation" attributes.

As you can see, without any PIM customization and with a few developments on your App, Julia can build some powerful translation features in her PIM!

## How to start?

**Our recommendation: always listen to your customer's needs first!**

We are aware that it is difficult and expensive in terms of investment to achieve a 100% complete online translation App that is flexible enough to adapt to any Julia's project.

**Our advice: adopt an Agile approach!**

* Interview your future potential customers about their needs
* Set priorities based on the most generic needs
* Develop in successive iterations
