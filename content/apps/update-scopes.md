# Update access scopes

::: warning
**This feature is only available on SaaS platforms.**
:::

It's possible to update the access scopes of an already connected app.
The access scope update process requires app users to consent to new scopes addition. 

If your app needs to change the access scopes, it must initiate a new authorization request with all access scopes needed, even the access scopes that are already granted. This new authorization request follows the usual OAuth 2.0 protocol and will end with a new Access Token that reflects updated scopes.

::: warning
**Some users are not allowed to grant new access scopes in the Akeneo PIM**.  
You should not force users to go through the Authorization process if you haven't received the new access scopes, you could end up in an infinite loop. Consequently, your App must be able to function as usual without the new access scopes.
  
More information on our Help Center: [Who can manage and open Apps?](https://help.akeneo.com/pim/serenity/articles/manage-your-apps.html#who-can-manage-and-open-apps)
:::

## Notify a PIM your app requires an authorization update

Through Akeneo REST API, connected apps can notify Akeneo PIM users who can manage your app that the authorization scopes your app requires have changed. 

To do so, use the following `POST` method, with parameters below:

```
https://my-pim.cloud.akeneo.com/connect/apps/v1/scopes/update?scope=[REQUESTED_SCOPES]
```
Requirements:
- `scopes`: query parameter to specify app new scope list as a space-separated string
- `Authorization: Bearer [AccessToken]`: header to authenticate your app
- `Content-Type: application/json`: header for the response format

The notification will warn them and entice them to open your app so that you can initiate an authorization request with the entire list of required scopes.

<img class="img-responsive in-article" alt="Updated scopes - PIM notification" src="../img/apps/update-scopes-notification.png" style="max-width: 500px;">

::: warning
Please, be aware that **this endpoint does not update any access scopes**.  
It is only meant to provide a way for an app to warn Akeneo PIM. 
:::

::: panel-link Next step [How to test your App?](/apps/how-to-test-my-app.html)
:::
