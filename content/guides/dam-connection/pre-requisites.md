# Prepare the structure in your DAM and your PIM

Before writing any line of code for the connector, you'll need to prepare your DAM and your PIM. By _preparation_, we mean adapting or creating a proper structure around your DAM or PIM assets, so that the connector will easily do its job, i.e. send assets from the DAM to the PIM.

## In your PIM

Everything begins with the creation of your asset families. You know, this really important entity that allows you to structure your PIM assets.

::: tips
Still not familiar with the asset family concept? You may need to read [this](/documentation/asset-manager-beta.html#the-asset-family) carefully.
:::

To create those asset families, you'll need the help of your PIM and DAM users. By analyzing together the assets already stored in your DAM, you'll find the perfect set of asset families with the right attribute structure to optimize your asset representation in the PIM. 

Here are some tips to help you with this task.

### Choose your asset families

First, you'll need to decide what will be the different asset families you will need to structure your assets in the PIM.

Below are some examples of asset families so that you have an idea on how to choose yours:
- `Packshots`: the family that gathers all the images of the product packshots,
- `User guides`: the family that gathers all the PDF user guides of your products,
- `Care instructions`: the family that gathers all the PDF care instructions of your products,
- `Videos`: the family that gathers all the videos of your products,
- ...

To help you decide, you can take into account the following statements:
- Assets of a given asset family share the same attribute structure, so make sure that all the assets belonging to the same family can be described using the same set of attributes,
- The [product link rule](/documentation/asset-manager-beta.html#focus-on-the-product-link-rule) is defined at the asset family level, so make sure that all the assets belonging to the same family are linked to your products the same way.

::: tips
This step is the most crucial one. You will need to put good thoughts into the creation of your asset families. As a result, it's a step that can hardly be automated, as it really depends on your users' needs.
:::

### Define the attributes of your asset families

Once you have chosen your asset families, you will define the set of attributes that structures each of them.

In the case of a DAM-PIM connection, in your asset family structure, you will have a mix of attributes coming from your DAM and some others that will only be on the PIM side.

Let's illustrate that with an example.

![Asset conversion](../../img/guides/asset-conversion.svg)

In this example, you can see that in the `Model picture` asset family we have:
- a `Code` and a `Label` that are created automatically when you create an asset family,
- a `DAM url` [media link attribute](/documentation/asset-manager-beta.html#the-media-link-attribute). This attribute is instrumental in the DAM-PIM connection. You can name it however you'd like. This is the attribute you will use to store the url of the source DAM file,
- a `Tags` attribute whose values will be supplied by the DAM. Indeed, there is also a `Tags` property on the DAM side and the enrichment of this property is done exclusively there. As we decided to also keep this information on the PIM side (for filtering purposes for example) we need it to send it over. This explains why this `Tags` attribute is in the asset family,
- a `Product reference` attribute whose value will be the product identifier to which the asset refers. In this example, this information is also supplied by the DAM as it appears in the DAM asset filename and can easily be extracted,
- two attributes `Model is wearing size` and `Warning mention` that only appear on the PIM side. These attributes will be enriched by marketers directly in the PIM. That's why they do not appear on the DAM side.

Still in this example, we decided that the `Photographer` property adds no value to the PIM side, so we didn't want this information to move from the DAM to the PIM. As a result, this information won't appear in the asset family, no attribute needs to be created.

::: warning
Do not create asset attributes for all your DAM properties. Some of them will be totally useless on the PIM side. We don't want to drown the PIM asset with useless information.  
To select properly which DAM properties should be sent to the PIM, you can ask yourself the following questions:
- Will it be useful to filter PIM assets so that marketers can find them more easily in the Asset Manager?
- Can this information be helpful for the enrichment of other assets or product attributes in the PIM?
- Does this information have to be sent to your final channels?  
If you answer `No` to all of these questions, it's likely that you don't need this DAM property to be part of your asset family structure.
:::

### Create the structure in the Asset Manager

Once you have a better idea of the modelization of your asset families, you can create them.  
For now, you can only create them via the API. Don't worry, the corresponding UI is coming soon but in the meantime, we advise you to use a script using the API. You can find an example of this script in our [DAM connector skeleton](introduction.html#the-skeleton).

To create an asset family with its attributes and its product link rules, you'll need to follow those steps: 
1. Create your asset family with its code and labels.  
2. Add asset attributes to your family.  
3. Add the product link rules to your asset family.

## In your DAM

There are 4 things you'll need to take into consideration.

### Which DAM assets are products related?

In your DAM, all kinds of assets are stored: assets for marketing purposes, assets for internal purposes, assets for your products...  
In our case, the only relevant ones are the DAM assets for products. They are what we call _product assets_.  
As they are the only ones we are going to send to your PIM, we need a way to identify these product assets inside your DAM.

::: warning
Do not skip this step. It's really important as you don't want to see all your DAM assets into your PIM. You only want to see the product assets, and that's it! :wink:
:::

Depending on your DAM capabilities and also, on how your DAM assets are already modelized, there are several ways to add this information within your DAM assets. Here is a list of suggestions:
- Your DAM supports categories/folders classification. You could use a dedicated category/folder, named `Product asset` for example, that will gather all your DAM product assets.
- Your DAM supports dynamic property/attribute defined for each asset. You could create a new boolean property/attribute, named "Product asset?" for example. Then, you set this property to true if the DAM asset is a product asset.

::: tips
Those are just suggestions. Don't hesitate to find the one that will best suit you and your DAM users.
:::


### Which asset family do your DAM product assets belong to?

In the PIM, in the Asset Manager, assets must belong to an [asset family](/documentation/asset-manager-beta.html#the-asset-family).  
So, at one point, whenever the connector creates an asset in the PIM, it will need to know in which family it should create it.  
As a result, we need this information to be on the DAM side, for each DAM asset.

::: info
You'll only need this information on product assets.
:::

Depending on your DAM capabilities and also on how your DAM assets are already modelized, there are several ways to add this information within your DAM assets. Here is a list of suggestions:
- Your DAM supports categories/folders classification. Each PIM asset family could have a dedicated DAM category/folder in which all your DAM product assets will be organized.
- Your DAM supports dynamic properties/attributes defined for each asset. You could create a new property/attribute named `PIM Asset family` whose options will be the code of the PIM asset families. Then, you enrich this property/attribute with the right PIM asset family on each of your DAM product assets.
- Your DAM supports tags. You could create one tag per PIM asset families and assign the right one to your DAM product assets.
- In the filename of your DAM assets, you could add the PIM asset family in which your asset will be created. For example: `allie_jean_packshots.png`, `packshots` being the code of an existing PIM asset family.

::: tips
Those are just suggestions. Don't hesitate to find the one that will best suit you and your DAM users.
:::

### To which locale do your localized DAM assets refer to? 

Some of your DAM product assets will be localized. For example, you can have several versions of the same product user guides: one in French and one in English.  

For these assets, you'll need to find a way to identify which locale they are referring to.

Depending on your DAM capabilities and also, on how your DAM assets are already modelized, there are several ways to add this information within your DAM assets. Here is a list of suggestions:
- Your DAM supports dynamic properties/attributes defined for each asset. You could create a new property/attribute named `Locale` whose options will be the code of the activated PIM locale. Then, you enrich this property/attribute with the right locale on each of your localized DAM product assets.
- In the filename of your localized DAM product assets, you could add the locale to which they refer. For example: `allie-jean_care-instructions_fr.png`, `fr` matches one of the PIM locale.

::: tips
Those are just suggestions. Don't hesitate to find the one that will best suit you and your DAM users.
:::

### To which product identifier do your DAM product assets refer to?

If you want your DAM assets to be automatically linked to your products once imported in your PIM, you'll need to have the SKU _(or whatever PIM attribute is used as identifier)_ of the product they are referring to stored on every DAM product assets.

::: tips
This step is only mandatory if you want your assets to be automatically linked to your products. In fact, it is also possible to do this operation *manually*.  
So don't bother if you can't have this information on the DAM side: marketers will manually assign assets directly in the UI of the PIM, once the DAM product assets are imported in the PIM Asset Manager.
:::

Depending on your DAM capabilities and also on how your DAM assets are already modelized, there are several ways to add this information within your DAM assets. Here is a list of suggestions:
- In the filename of your DAM product assets, you could add the SKU/identifier of the product they refer to. For example: `allie-jean_care-instructions_fr.png`, `allie-jean` being the SKU of an existing PIM product.
- Your DAM supports dynamic properties/attributes defined on each asset. You could create a new property/attribute named `sku` or `product_ref`. Then, you enrich this property/attribute with the right identifier on each of your DAM product assets. Those identifiers must match the ones used for your products in your PIM.

::: tips
Those are just suggestions. Don't hesitate to find the one that will best suit you and your DAM users.
:::
