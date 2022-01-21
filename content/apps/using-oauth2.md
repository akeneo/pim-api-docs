# Using OAuth 2.0 to connect an App

::: warning
**For now, this feature is ONLY AVAILABLE on partner sandboxes Akeneo provides**
:::

Akeneo PIM uses **OAuth 2.0** to manage the authorization of Apps.

![App activation diagram](../img/apps/app-activation-sequence-diagram.png)


## Credentials

First, you must obtain valid OAuth 2.0 client credentials by submitting your App on the
[Akeneo Marketplace](https://marketplace.akeneo.com/how-submit-extension-akeneo-marketplace).

Then, when a user wants to connect their PIM to your App, the authorization process will go through the following steps.

::: info
In the following examples, we will use these fictional URLs:  
`https://my-pim.cloud.akeneo.com` for the PIM  
`https://my-app.example.com/oauth/activate` for your App Activation URL  
`https://my-app.example.com/oauth/callback` for your App Callback URL
::::

## Activation URL

Your App must expose an activation URL.  
Akeneo PIM users have access to an App marketplace in their PIM. When a PIM user connects your App from their PIM,
they are redirected to the activation URL you provided. The PIM URL they come from is in the query you receive.

```

https://my-app.example.com/oauth/activate?pim_url=https%3A%2F%2Fmy-pim.cloud.akeneo.com
```

## Authorization Request

The user landed on your Activation URL and when you are ready to do so, you must start the Authorization Request.
Like any other OAuth 2.0 application, you have to redirect the user to the Authorization Server (Akeneo PIM)
with the following parameters:

- `response_type` (required, must always be "code")
- `client_id` (required)
- `scope` (optional)
- `state` (recommended)

```

https://my-pim.cloud.akeneo.com/connect/apps/v1/authorize?
    response_type=code&
    client_id=[OAUTH_CLIENT_ID]&
    scope=[REQUESTED_SCOPES]&
    state=[STATE]
```

::: info
You can consult the list of [available scopes](/apps/access-scopes.html).
:::

::: warning
To protect your App from cross-site request forgery, you should send a random string in the `state` parameter.
:::

## Authorization Response

The user now has the opportunity to accept your authorization request and grant you the requested scopes.
When they end the activation process, they are redirected to the callback URL with the following parameters:

```

https://my-app.example.com/oauth/callback?
    code=[AUTHORIZATION_CODE]&
    state=[STATE]
```

::: warning
If you used a state to protect your App from cross-site request forgery, you must validate that the received
state is identical.
:::

## Access Token Request

Now that you have received an authorization code, you can exchange this code against an access token.

The PIM expects the following parameters in the request:
- `client_id` (required)
- `code` (required)
- `grant_type` (required, must always be "authorization_code")
- `code_identifier` (required)
- `code_challenge` (required)

### What's the Code Challenge?

To validate the App identity, Akeneo PIM requires a unique code challenge for each Access Token Request,
instead of the usual client secret.  
The code challenge is composed of 2 keys:
- `code_identifier`: high-entropy cryptographic random string
- `code_challenge`: sha256 hash of the concatenation of `code_identifier` and `client_secret`

Here is a PHP example:
```php

$codeIdentifier = bin2hex(random_bytes(30));
$codeChallenge = hash('sha256', $codeIdentifier . '[CLIENT_SECRET]');
```

### Token Request

From your server, you must make the following request to the PIM REST API
on the endpoint `/connect/apps/v1/oauth2/token`:

```

POST /connect/apps/v1/oauth2/token HTTP/1.1
Host: my-pim.cloud.akeneo.com
Content-Type: application/x-www-form-urlencoded

client_id=[OAUTH_CLIENT_ID]&code_identifier=[CODE_IDENTIFIER]&code_challenge=[CODE_CHALLENGE]
&code=[AUTHORIZATION_CODE]&grant_type=authorization_code
```

### Token Success Response

If your Access Token Request is accepted, you will receive a JSON response with the token:

```json

{
  "access_token": "Y2YyYjM1ZjMyMmZlZmE5Yzg0OTNiYjRjZTJjNjk0ZTUxYTE0NWI5Zm",
  "token_type": "bearer",
  "scope": "read_products write_products"
}
```

::: warning
You must **store the access token securely**. If you need to ask for a new one, you have to go through the same steps
and wait for the PIM user to manually grant you a new access token.
:::

::: info
An Access Token given to an App has no expiration date.  
However, be aware that it can be revoked at any moment by a PIM user.
:::

### Token Error Response

If your Access Token Request is refused, you will receive a JSON response with the error:

```json

{
  "error": "[ERROR_CODE]"
}
```

Check the [OAuth 2.0 spec](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1) for the possible error codes.

## Access scopes

Part of the app authorization process requires specifying which parts of Akeneo PIM data the App needs to access.
An App can request any of the access scopes listed below.

::: warning
**Akeneo PIM may not grant all requested scopes.**  
This is up to your App to check which scopes were granted when you receive an Access Token.  
For example, the Community edition will not be able to grant you scopes related to the Asset Manager because
it's a feature only available in the Enterprise edition.
:::

### Available authorization scopes

| Scope | Grants access to |
|-------|------------------|
| `read_products` | Read products |
| `write_products` | Write products |
| `delete_products` | Remove products |
| `read_catalog_structure` | Read attributes, attribute groups, families and family variants|
| `write_catalog_structure` | Write attributes, attribute groups, families and family variants |
| `read_attribute_options` | Read attribute options |
| `write_attribute_options` | Write attribute options  |
| `read_categories` | Read categories  |
| `write_categories` | Write categories |
| `read_channel_localization` | Read locales and currencies |
| `read_channel_settings` | Read channels |
| `write_channel_settings` | Write channels |
| `read_association_types` | Read association types |
| `write_association_types` | Write association types |
| `read_asset_families` <span class="label label-ee">EE</span> | Read asset families |
| `write_asset_families` <span class="label label-ee">EE</span> | Write assets families |
| `read_assets` <span class="label label-ee">EE</span> | Read assets |
| `write_assets` <span class="label label-ee">EE</span> | Write assets |
| `delete_assets` <span class="label label-ee">EE</span> | Remove assets |
| `read_reference_entities` <span class="label label-ee">EE</span> | Read reference entities |
| `write_reference_entities` <span class="label label-ee">EE</span> | Write reference entities |
| `read_reference_entity_records` <span class="label label-ee">EE</span> | Read reference entity records |
| `write_reference_entity_records` <span class="label label-ee">EE</span> | Write reference entity records |


### Available authentication scopes

| Scope | Grants access to |
|-------|------------------|
| `openid` | Get the user uuid to be able to identify them |
| `profile` | Read user first name and last name (information filled in the PIM user profile) |
| `email` | Read user email (information filled in the PIM user profile) |



::: panel-link Next step: we will show you a simple implementation of these steps [Create an App in PHP](/apps/create-app-in-php.html)
:::
