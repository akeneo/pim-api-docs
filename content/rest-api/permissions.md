# Permissions

In some connector use cases, you will need to restrict the access to the API.
There are two ways to handle this in the API, depending on the wanted result:
- if you want to restrict the access to some API endpoints, use [the ACLs authorizations](#endpoint-access-restrictions).
- if you want to restrict the access to certain parts of your product catalog, use the [Entreprise Edition permissions](#catalog-permissions-ee-only) _(only available in the Entreprise Edition)_.

Please see below for more details about both permission systems. 

Before diving into those sections, here is one key piece of information you need: those permissions are enforced thanks to the API user you use [whenever you ask for a token](/documentation/authentication.html#token-generation). All the API calls launched with the generated token afterwards will then benefit from the permissions defined by the user group and the user role of this API user.  
In other words, you will need to define for your API user:
- a role, if you want to use the ACLs permissions, 
- and a group if you want to use the EE permissions.

[Can't remember how to get this API user? See here to find out how!](/documentation/authentication.html#api-user-creation)

## Endpoint access restrictions

Like when using the PIM through the UI, we use ACLs to define which endpoint a connection can or cannot use.

Here are the simple steps to follow to configure those permissions.

1. Log into your favorite PIM.
1. Navigate to the `System/Roles` menu.
1. Click on the `Create role` button.
1. Input a new name for the user role you are creating, `ERP connection user role` for example.
1. In the `Users` tab, select the [API user you created earlier](/documentation/authentication.html#api-user-creation).
1. In the `Web API permissions` tab, select the permissions you want to give to your API user.

::: versions id="web_api_permission" 2.x![Web API permission tab screenshot](/img/rest-api/activate_api_access.png) 1.7![Web API permission tab screenshot](/img/rest-api/v1.7/activate_api_access.png)
:::

We strongly recommend you to create **dedicated user roles** for your API users, different from the user roles that you use for your UI users. So go ahead and create one user role for every API connection you will need.

::: warning
Do not give any UI permissions to your API user roles.
:::

### Overall access

The first ACL `Overall Web API access` means that if enabled, each user under that role will have access to the Web API.

You will need to give at least this ACL to all the API user roles you created before for them to be able to call the API.

::: warning
Do not give this permission to your UI user role as it makes no sense to give API access to UI users.
:::

:::info
Note that if a role has `Overall Web API` access, then it means that all the users under that role will be able to make requests on products, product models and published products.  
There is no way to only restrict access to products, except if you are using a 2.x Enterprise Edition. In this case, the EE permissions based on user groups are applied to the API for the products and the published products.
:::

### Catalog structure access

You can fine-tune even more this permission by restricting or allowing access to the entities of the catalog structure (categories, families, attributes, attribute options, channels and locales). The table below lists all the ACLs available.

| Permission name | If enabled, you will be able to |
|-----------------|-------------------|
| List categories | GET on `/categories` and on `/categories/{category_code}`|
| List families | GET on `/families` and on `/families/{family_code}`|
| List family variants *(2.x only)* | GET on `/families/{family_code}/variants` and on `/families/{family_code}/variants/{variant_code}`|
| List attributes | GET on `/attributes` and on `/attributes/{attribute_code}` |
| List attribute options | GET on `/attributes/{attribute_code}/options` and on `/attributes/{attribute_code}/options/{attribute_option_code}` |
| List attribute group *(2.x only)* | GET on `/attribute-groups` and on `/attributes-groups/{attribute_groups_code}` |
| List association types *(2.x only)* | GET on `/association-types` and on `/association-types/{association_type_code}` |
| List channels | GET on `/channels` and on `/channels/{channel_code}` |
| List locales | GET on `/locales` and on `/locales/{locale_code}` |
| List currencies *(2.x only)*  | GET on `/currencies` and on `/currencies/{currency_code}` |
| Create and update categories | POST and PATCH on `/categories/{category_code}` <br/> PATCH on `/categories` |
| Create and update families | POST and PATCH on `/families/{family_code}` <br/> PATCH on `/families` |
| Create and update family variants *(2.x only)* | POST and PATCH on `/families/{family_code}/variants` and on `/families/{family_code}/variants/{variant_code}`|
| Create and update attributes | POST and PATCH on `/attributes/{attribute_code}` <br/> PATCH on `/attributes`|
| Create and update attribute options | POST and PATCH on `/attributes/{attribute_code}/options/{attribute_option_code}` <br/> PATCH on `/attributes/{attribute_code}/options` |
| Create and update attribute groups *(2.x only)* | POST and PATCH on `/attribute-groups/{attribute_group_code}` <br/> PATCH on `/attribute-groups` |
| Create and update association types *(2.x only)* | POST and PATCH on `/association-types/{association_type_code}` <br/> PATCH on `/association-types` |
| Create and update channels *(2.x only)* | POST and PATCH on `/channels/{channel_code}` <br/> PATCH on `/channels` |

## Catalog permissions _(EE only)_

The Entreprise Edition permissions based on the user groups are also enforced in the API.

Those permissions are really powerful and make it possible to create great workflows around product enrichment with the API. There are 3 ways to benefit from those permissions. They are detailed in the following sections.

::: warning
Those permissions were introduced in the API starting from the 2.0 version.
:::

::: info
All the permissions describe here, apply to both product and product model updates.
:::

### Hide a part of your catalog
With these powerful permissions, you can hide a whole part of your product catalog. It is the very first power of these permissions.

The EE permissions can be based on three different levels:
- you can hide products that are inside one or several given **category**,
- you can hide the product information of the attributes that are inside one or several given **attribute group**,
- you can hide the translated product information of one or several given **locale**.

It can be very useful in the case:
- you don't want your third party-connector to mess up with this part of the product catalog.  
_For example, you have products created in the PIM coming from your ERP and you want them to be created only in your `ERP` category tree. You can use the EE permissions to hide the other trees from your connector, this way, it will only be able to create products in the `ERP` tree._
- you don't want your third-party connector to be aware of this part of the product catalog.  
_For example, you are a reseller and you provide an API connection to one of your supplier for him to push its product data into the PIM. But you don't want him to be able to access or erase any data that does not concern his products. In this case, you can give him access only to the category containing his products, and not to the other suppliers categories. Pretty neat, right?_

To enable these powers:
1. Log in into your favorite PIM and navigate to the `System/User groups` menu.
1. Click on the `Create group` button and input a new name for the user group you are creating, `ERP connection user group` for example.
![New ERP connection user group](/img/rest-api/erp-connection-user-group.png)
1. In the `Users` tab, select the [API user you created earlier](/documentation/authentication.html#api-user-creation).
![API user in the user group](/img/rest-api/my-erp-user-in-group.png)
1. Then, navigate to the `Settings/Categories` menu, if you want to benefit from permissions on categories, otherwise jump to step 9.
1. For each category you want to hide from your API calls, go in the `Permissions` tab.
1.  Remove the group you just created from the `Allowed to view products`, `Allowed to edit products` and `Allowed to own products` inputs. Don't forget to click on the `Save` button.
![Permissions for hide mode](/img/rest-api/hide-permission-mode.png)
1. Then, navigate to the `Settings/Locales` menu, if you want to benefit from permissions on locales, otherwise jump to step 10.
1. For each locale you want to hide from your API calls, go in the `Permissions` tab.
1.  Remove the group you just created from the `Allowed to view information`, `Allowed to edit information` inputs. Don't forget to click on the `Save` button.
1. Then, navigate to the `Settings/Attribute groups` menu.
1. For each locale you want to hide from your API calls, go in the `Permissions` tab.
1.  Remove the group you just created from the `Allowed to view attributes`, `Allowed to edit attributes` inputs. Don't forget to click on the `Save` button.

That's it! :tada:

Don't hesitate to test your configuration by calling the [GET product endpoint](/api-reference.html#get_products__code_) on a product.  
If this product is classified only inside the categories you hide, you should receive a 404, meaning that your configuration worked. 🙂  
If you hide a locale, you won't be able to receive the values of the given locale. Check the product body of the answer!
If you hide a whole attribute group, you won't be able to receive the values of the attributes that are inside this attribute group. Marvelous!

::: info
Note you also won't be able to call any PATCH or POST endpoints on the products you hide thanks to categories.
:::

### Read-only mode on your catalog

The same way you can hide a part of your product catalog, you can also only give a view right to your API user, disabling the right to update products.

This can be pretty useful whenever you only want to share your catalog in a read-only mode. :wink:

To enable this possibility:
1. Log in into your favorite PIM.
1. Navigate to the `System/User groups` menu.
1. Click on the `Create group` button.
1. Input a new name for the user group you are creating, `ERP connection user group` for example.
![New ERP connection user group](/img/rest-api/erp-connection-user-group.png)
1. In the `Users` tab, select the [API user you created earlier](/documentation/authentication.html#api-user-creation).
![API user in the user group](/img/rest-api/my-erp-user-in-group.png)
1. Then, navigate to the `Settings/Categories` menu.
1. For each category you wish put in read-only mode, go in the `Permissions` tab.
1. Add the group you just created into the `Allowed to view products` input.
1. If your user group is already set into the `Allowed to own products` and `Allowed to edit products` inputs, remove it. 
![Permissions for read-only mode](/img/rest-api/read-only-permission-mode.png)
1. Don't forget to click on the `Save` button.

That's it! :tada:

Don't hesitate to test your configuration by calling the [PATCH product endpoint](/api-reference.html#patch_products__code_) with an update in the body of your product. You should receive a 403, saying that you don't have the right update this product, exactly the expected behavior!

### Proposals of product information updates

The second power of these permissions is that for some **given categories**, you can define that the PATCH API endpoints will only be able to create modification proposals on your product values, instead of directly applying the update on them.  
Your PIM users will then be able to validate or reject them directly in the PIM UI. This is perfect if you want to easily control the product information that is pushed from outside into your product catalog. :wink:

To enable this possibility:
1. Log in into your favorite PIM.
1. Navigate to the `System/User groups` menu.
1. Click on the `Create group` button.
1. Input a new name for the user group you are creating, `ERP connection user group` for example.
![New ERP connection user group](/img/rest-api/erp-connection-user-group.png)
1. In the `Users` tab, select the [API user you created earlier](/documentation/authentication.html#api-user-creation).
![API user in the user group](/img/rest-api/my-erp-user-in-group.png)
1. Then, navigate to the `Settings/Categories` menu.
1. For each category you wish to only create proposals, go in the `Permissions` tab.
1.  Add the group you just created into the `Allowed to view products` and `Allowed to edit products` inputs.
1. If your user group is already set into the `Allowed to own products` input, remove it. 
![Permissions for proposals](/img/rest-api/proposal-permission-mode.png)
1. Don't forget to click on the `Save` button.

That's it! :tada:

Don't hesitate to test your configuration by calling the [PATCH product endpoint](/api-reference.html#patch_products__code_) with an update in the body of your product. A draft of your product will be created.  
You will then need to send your draft for approval by using [this API endpoint](/api-reference.html#post_proposal).  
If it works correctly, the owners of the categories in which is classified the product you try to update earlier, will receive in their Proposals screen, a new proposal like the one below.

![Proposal generated by the API](/img/rest-api/proposal-by-api.png)

::: info
Proposals can be created only on product updates, not on product creations. :wink:
:::

::: tips
Having trouble creating proposals on one given product?   
As soon as your product is at least owned in one category by your API user group, the API will directly apply the updates, instead of creating a draft and then a proposal.  
So be sure to verify that your product is only classified in categories for which your API user group does not own it.
:::
