# PAM _- Deprecated_

PAM stands for Product Asset Management. It's the way to handle your product assets in older versions of the PIM (from v1.7 to v3.2).

::: warning
With the introduction of our brand new way to handle assets, the [Asset Manager](/concepts/asset-manager.html), the PAM feature will be removed from the v4.0 of the PIM. As a result, **from now on, all the API resources regarding the PAM assets are deprecated**. They are not available anymore starting from the v4.0. 
:::

To understand why we deprecated this feature, we recommend you to read this [Medium post](https://medium.com/akeneo-labs/between-stability-and-innovation-c2d2dd61a804), we wrote on this special occasion.  

Also, don't hesitate to take a look at the [Asset Manager documentation](/concepts/asset-manager.html) to discover this new feature and how much more efficient it will be to handle your precious assets. :rocket:

## PAM asset
::: availability versions=2.1,2.2,2.3,3.x editions=EE
:::

::: warning
This resource is **deprecated** and is removed from the API since the 4.0. As a result, from now on, all the endpoints regarding this resource are deprecated. To understand why, we recommend you to read this [Medium post](https://medium.com/akeneo-labs/between-stability-and-innovation-c2d2dd61a804), we wrote on this special occasion.  
Also, did you know that since the 3.2, you can handle your assets thanks to the Asset Manager, the brand new efficient way to manage your product assets within the PIM.  
[Eager to know more about these new assets? It's right here!](/concepts/asset-manager.html#asset)
:::

An asset is the EE entity that allows to hold a file which can be an image, a video, a document... In the PIM, you can find all your assets in a library called PAM (Product Asset Manager). In this library, you can manage and classify your assets into their own categories, called [asset categories](/concepts/pam.html#asset-category).

Once you upload your asset into the PAM, you can then associate it to your products thanks to a specific attribute type, called `Asset collection`. This attribute allows you to select several assets in one single attribute.

An asset can be localizable, this way you can have a different file for each of your locales. The PIM can also automatically generates variations of your reference file for each of your channels. So neat!

::: warning
Do not confuse assets and media files. Those are totally different entities. The first one is only available in the EE, whereas the second is available in both CE & EE PIM.
The main difference is that the media files cannot be classified, they are not reusable among products and you can only have one media file per media attribute. 
Also, assets are really more powerful, you can automatically generate variations of your file depending on your channel.
:::

In the Akeneo UI in v2.x, you can find the PAM, where all the assets are stored, in the `Assets` menu. Below is a screenshot of the PAM.

![Assets in the Akeneo UI](/img/concepts/assets_ui.png)

Below is the JSON standard format representing an asset, that is not localizable.

```json
{
  "code":"tshirt_artemis_main_picture",
  "categories": ["tshirts_assets"],
  "description": "The main picture of the Artemis t-shirt",
  "localizable": false,
  "tags": ["tshirts", "red", "summer"],
  "end_of_use": "2019-09-01T00:00:00+0200",
  "variations": [
    {
      "_link": {
       "download": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/variations/ecommerce/no_locale/download"
        },
        "self": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/variations/ecommerce/no_locale"
        }
      },
      "locale":null,
      "scope": "e_commerce",
      "code": "7/5/8/e/758e39d48va7b42a55001434fd3d7b6cf3189b7f_tshirt_artemis_main_picture-ecomerce.jpg"
    },{
      "_link": {
       "download": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/variations/print/no_locale/download"
        },
        "self": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/variations/print/no_locale"
        }
      },
      "locale": null,
      "scope": "print",
      "code": "7/5/8/e/759e39d48va7b42a55002434fd3d7b6cf3189b7f_tshirt_artemis_main_picture-print.jpg"
    }
  ],
  "reference_files":[
    {
      "_link": {
       "download": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/reference-files/no_locale/download"
        },
        "self": {
         "href": "https://demo.akeneo.com/api/rest/v1/assets/myasset/reference-files/no_locale"
        }
      },
      "locale": null,
      "code": "7/5/8/e/759e39d48va7b42a55002434fd3d7b6cf3189b7f_tshirt_artemis_main_picture.jpg"
    }
  ]  
}
```

::: panel-link Want more details about the asset resource? [Check its endpoints here!](/api-reference.html#Asset)
:::

## PAM asset category
::: availability versions=2.1,2.2,2.3,3.x editions=EE
:::

::: warning
This resource is **deprecated** and is removed from the API since the 4.0. As a result, from now on, all the endpoints regarding this resource are deprecated. To understand why, we recommend you to read this [Medium post](https://medium.com/akeneo-labs/between-stability-and-innovation-c2d2dd61a804), we wrote on this special occasion.  
Also, did you know that since the 3.2, you can handle your assets thanks to the Asset Manager, the brand new efficient way to manage your product assets within the PIM. In the Asset Manager, categories can be modelized thanks to a [single or multiple options attribute](/concepts/asset-manager.html#the-single-and-multiple-options-attributes) in your [asset family](/concepts/asset-manager.html#asset-family).  
[Eager to know more about the Asset Manager? It's right here!](/concepts/asset-manager.html#concepts-resources)
:::

An asset category allows you to organise your assets. Asset categories are really similar to classical product categories. They constitute asset category trees and you can have multiple asset category trees with an unlimited number of levels (categories, subcategories, subsubcategories..).

:::info
An asset can be classified in several asset categories.
:::

In the Akeneo UI in v2.x, you can find the asset categories under the `Settings`/`Asset categories` menu.

![Asset categories in the Akeneo UI](/img/concepts/asset_categories_ui.png)

Below is the JSON standard format representing asset categories. Notice how it's really similar to the product categories format.
```json
// An asset root category
{
  "code": "asset_main_catalog",
  "labels":{
    "en_US": "Asset main catalog",
    "fr_FR": "Catalogue d'assets principal"
   },
  "parent": null
}
```
```json
// An asset subcategory
{
  "code": "prioritized_images",
  "labels":{
    "en_US": "Prioritized images",
    "fr_FR": "Images priorisées"
   },
  "parent": "asset_main_catalog"
}
```

::: panel-link Want more details about the asset category resource? [Check its endpoints here!](/api-reference.html#Assetcategory)
:::

## PAM asset tags
::: availability versions=2.1,2.2,2.3,3.x editions=EE
:::

::: warning
This resource is **deprecated** and is removed from the API since the 4.0. As a result, from now on, all the endpoints regarding this resource are deprecated. To understand why, we recommend you to read this [Medium post](https://medium.com/akeneo-labs/between-stability-and-innovation-c2d2dd61a804), we wrote on this special occasion.  
Also, did you know that since the 3.2, you can handle your assets thanks to the Asset Manager, the brand new efficient way to manage your product assets within the PIM. In the Asset Manager, tags can be modelized thanks to a [single or multiple options attribute](/concepts/asset-manager.html#the-single-and-multiple-options-attributes) in your [asset family](/concepts/asset-manager.html#asset-family).  
[Eager to know more about the Asset Manager? It's right here!](/concepts/asset-manager.html#concepts-resources)
:::

An asset tag allows you to tag your asset so that you can later easily filter on them.

::: info
An asset can have several tags.
:::

In the Akeneo UI in v2.x, you can view asset tags when you are on the `Properties` tab on the asset form.

Below is the JSON format representing asset tags.
```json
{
  "code": "christmas"
}
```

::: panel-link Want more details about the asset tag resource? [Check its endpoints here!](/api-reference.html#Assettag)
:::
