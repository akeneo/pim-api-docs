# Using OAuth 2.0 to connect an App

::: warning
**This feature is available for our partners using an Akeneo sandbox environment. It will be available for all soon.**
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

Check the [OAuth 2.0 spec](https://datatracker.ietf.org/doc/html/rfc6749#section-5.2) for the possible error codes.


::: panel-link Next step [Using OpenID Connect to authenticate users](/apps/using-openid.html)
:::
