# Link with products and product models
Can we agree on the fact that assets that are linked to zero products are kind of useless?  
So here we go! We already explained what an asset was in the new Asset Manager and how you can structure it. Now, it's time to see how the link is done with both products, and product models.

## A new attribute type
To link assets to your products, you are going to use a new attribute type called `pim_catalog_asset_collection`. There are two simple steps to use this new attribute in your products:
1. Create an attribute of this type,
2. Put this attribute within the families of the products you want to link your assets to.

For now, you can only perform these two actions via the API, as the UI hasn't been developed yet. But don't worry, we describe those simple actions in the paragraphs below.

### Step 1 - Create a `pim_catalog_asset_collection` attribute

To create a `pim_catalog_asset_collection` attribute, use the traditional [POST endpoint on the Attribute resource](/api-reference.html#post_attributes) with the following body, for example.
```json
{
  "code": "my_new_asset_collection",
  "type": "pim_catalog_asset_collection",
  "localizable": false,
  "scopable": false,
  "labels": {
    "en_US": "My new assets",
    "fr_FR": "Mes nouvelles ressources numériques"
  },
  "reference_data_name":"packshots"
}
```
In this example, we create an asset collection named `My new assets`, that will allow assets from the `packshots` family.
As you can see, the new asset collection attribute can be localizable, scopable, both or neither.

### Step 2 - Add the new attribute to your families

To add this newly created attribute to the structure of an existing family, send a request using the [PATCH endpoint of the Family resource](/api-reference.html#patch_families__code_) with the following body.
```json
{
  "attributes": ["an_attribute_already_in_the_family","another_attribute_already_in_the_family","a_third_attribute_already_in_the_family","my_new_asset_collection"]
}
```

You're done! Congrats. :)

## Format of the product values
As you can see in the example below, the format of the values of this new asset collection is **an array of asset codes**.  
This format also works with to product models.

#### Example
This is an example of a product with a localizable asset collection attribute called `model_pictures`. It holds different selections of assets, one selection for each activated locale. In this example, we imagine that we want to have totally different assets depending on the locale.
```json
{
  "identifier": "1111111195",
  "family": "clothing",
  "parent": "jack_brown",
  "categories": [
    "tshirts"
  ],
  "enabled": true,
  "values": {
    "model_pictures": [
      {
        "locale": "en_US",
        "scope": null,
        "data": ["picture_enUS_front","picture_enUS_back"]
      },
      {
        "locale": "fr_FR",
        "scope": null,
        "data": ["picture_frFR_front","picture_frFR_back"]
      }
    ]
  }
}
```

::: info
As you may have noticed in the example above, the new asset collection attribute is still able to hold one or several assets.
:::

## How to link your assets

Assets can be assigned to **products** either:
- manually, using the [product](/api-reference.html#patch_products) POST and PATCH endpoints by adding the asset codes in the asset collection data,
- or automatically thanks to the [product link rule](#focus-on-the-product-link-rule), detailed in the paragraph below.

Assets can only be manually assigned to **product models**, using the [product model](/api-reference.html#patch_product_models) POST and PATCH endpoints, by adding the asset codes in the asset collection data.

