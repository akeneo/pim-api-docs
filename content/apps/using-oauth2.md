# Using OAuth 2.0 to connect an App

The PIM uses OAuth 2.0 to manage the authorization of Apps.

![App activation diagram](../img/apps/app-activation-sequence-diagram.png)


## Credentials

To begin, you must obtain valid OAuth 2.0 client credentials by registering your App on the
[Akeneo Marketplace](https://marketplace.akeneo.com/node/add/extension).

Then, when any user want to connect his PIM to your App, the authorization process will go through the following steps.

::: info
In the following examples, we will use those fictional urls:  
`https://my-pim.cloud.akeneo.com` for the PIM  
`https://my-app.example.com/oauth/activate` for your App Activation URL  
`https://my-app.example.com/oauth/callback` for your App Callback URL
::::

## Activation URL

Your App must expose an activation URL.  
When the PIM user sees your App in his PIM marketplace, he can click on the "Connect" button
and he will be redirected to this activation URL with the PIM URL in the query.

```

https://my-app.example.com/oauth/activate?pim_url=https%3A%2F%2Fmy-pim.cloud.akeneo.com
```

## Authorization Request

The user landed on your Activation URL and when you are ready to do so, you must start the Authorization Request.
Like any other OAuth 2.0 application, you simply have to redirect the user to the Authorization Server (the PIM)
with the following parameters:

```

https://my-pim.cloud.akeneo.com/connect/apps/v1/authorize?
    response_type=code&
    client_id=[OAUTH_CLIENT_ID]&
    redirect_uri=[CALLBACK_URL]&
    scope=[REQUESTED_SCOPES]&
    state=[STATE]
```

::: info
You can consult the list of [availables scopes](https://help.akeneo.com).
::::

::: warning
To protect your App from cross-site request forgery, you should send a random string in the `state` parameter.
:::

## Authorization Response

The user will now have the opportunity to accept your authorization request and grant you the requested scopes.
When he does so, he is redirected to the callback URL with the following parameters:

```

https://my-app.example.com/oauth/callback?
    code=[AUTHORIZATION_CODE]&
    state=[STATE]
```

::: warning
To protect your App from cross-site request forgery, you must validate that the received state is identical
to the one you sent.
:::

## Access Token Request

Now that you have received an authorization code, you can exchange this code against an access token.

The PIM expect the following parameters in the request: 
- `client_id`
- `code`
- `grant_type`
- `code_identifier`
- `code_challenge`

### What's the Code Challenge ?

To validate the App identity, instead of sending your client secret, the PIM requires a code challenge, 
different for each Access Token Request, alongside the OAuth client id.
The code challenge is composed of 2 keys:
- `code_identifier`: high-entropy cryptographic random string
- `code_challenge`: sha256 hash of the concatenation of `code_identifier` and `client_secret`

Here is a PHP example:
```php

$codeIdentifier = bin2hex(random_bytes(30));
$codeChallenge = hash('sha256', $codeIdentifier . '[CLIENT_SECRET]');
```

### Token Request

From your server, you must do the following request to the PIM REST API,
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
  "token_type": "bearer"
}
```

### Token Error Response

If your Access Token Request is refused, you will receive a JSON response with the error:

```json

{
  "error": "[ERROR_CODE]"
}
```

Check the [OAuth 2.0 spec](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1) for the possible error codes.

**Next step**: we will show you a simple [implementation of this steps with a PHP example](/apps/create-app-in-php.html).
