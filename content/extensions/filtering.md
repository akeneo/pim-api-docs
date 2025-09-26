# Filter and display UI extensions

You may want to create UI extensions that are only available to certain user groups or for specific products. This can be achieved by filtering UI extensions based on user groups and product selection.

### Filter UI extension by user groups

You can filter the user groups allowed to see and execute an UI extension by using the permissions tab on the UI extensions creation/edition form.

[![ui-extension-permissions.png](../img/extensions/ui-extensions/ui-extension-permissions.png)](../img/extensions/ui-extensions/ui-extension-permissions.png)

### Filter UI extension by product selection
You can filter the products that can be selected by an UI extension by using the product selection tab on the UI extensions creation/edition form.

[![ui-extension-product-selection.png](../img/extensions/ui-extensions/ui-extension-product-selection.png)](../img/extensions/ui-extensions/ui-extension-product-selection.png)

### Order UI extensions

In addition to the filtering capacity, you can order the UI extension in the UI using the `weight` field on the creation/update form. This will determine the order in which extensions are displayed in the **header** and **tab** positions.

[![ui-extension-product-selection.png](../img/extensions/ui-extensions/weight.png)](../img/extensions/ui-extensions/weight.png)

### UI extensions statuses

Extensions can have three different statuses: `Active`, `Inactive` and `To update`.

* `Active` extensions are displayed for user on the UI.
* `Inactive` extensions are only visible in Extensions list page and must be enabled for user use.
* Extensions `To update`, have this status due to an incorrect or outdated configuration. They must be updated or deleted. This may result from a migration or update of the PIM. Most time the credentials or secret fields are the cause. To update it just open it in the UI add a new value on the missing fileds and save the extension. It will pass on `Inactive` status.  


::: panel-link API [Next](/extensions/api.html)
:::
