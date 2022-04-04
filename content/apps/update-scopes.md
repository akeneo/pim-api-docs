# Update access scopes

::: warning
**This feature is only available on SaaS platforms.**
:::

It's possible to update the access scopes of an already connected app.
The access scope update process requires app users to consent to new scopes changes. 

If your app needs to change the initial scope list, it must initiate an authorization request with the entire list of access scopes your app needs. The authorization request follows the usual OAuth 2.0 protocol through which the app will be able to retrieve a new Access Token that reflects new requested scopes.

Through Akeneo REST API, connected apps can notify Akeneo PIM users who can manage your app that the authorization scopes your app requires have changed. 

To do so, use the following `POST` method, with parameters below:

```
https://my-pim.cloud.akeneo.com/connect/apps/v1/scopes/update?scope=[REQUESTED_SCOPES]
```
Requirements:
- `scopes`: query parameter to specify app new scope list as a space-separated string
- `Authorization: Bearer [AccessToken]`: header to authenticate your app
- `Content-Type: application/json`: header for the response format

Response: `"Ok"`

The notification will warn them and entice them to open your app so that you can initiate an authorization request with the entire list of required scopes.

But please, be aware that **this endpoint does not update any access scopes**. It is only meant to provide a way for an app to warn Akeneo PIM. 

::: warning
**Not all users of Akeneo PIM can manage scopes changes.**  
Some users might only have the rights to use your app but not manage it on the Akeneo PIM side. For this reason, it is up to your app to be able to function as per usual until it retrieves a new Access Token.
:::

::: panel-link Next step [How to test your App?](/apps/how-to-test-my-app.html)
:::
