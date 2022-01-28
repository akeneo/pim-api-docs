# Using OpenID Connect to authenticate users

::: warning
**This feature is available for our partners using an Akeneo sandbox environment. It will be available for all soon.**
:::

::: tips
This is an optional feature in Apps, you can also use your own Authentication.
:::

To authenticate the users coming from Akeneo PIM, you can use the OpenID Connect protocol.

::: info
**What is OpenID Connect?**  
OpenID Connect is a simple identity layer on top of the OAuth 2.0 protocol.  
See [OpenID official website](https://openid.net/connect/) for more info.
:::

Basically, you use the same process as for Authorization, but you request an additional scope and you will receive,
alongside the Access Token, an ID Token containing the information of the current user.

![App authentication diagram](../img/apps/app-authentication-sequence-diagram.png)

## Authenticate during the first Authorization request

If a user is trying to connect your App for the first time, and you want to authenticate him, ask for OpenID scopes
during the [Authorization Request](/apps/using-oauth2.html#authorization-request).

```

https://my-pim.cloud.akeneo.com/connect/apps/v1/authorize?
    response_type=code&
    client_id=[OAUTH_CLIENT_ID]&
    scope=openid email profile read_products write_products&
    state=[STATE]
```

::: info
You can consult the list of [available authentication scopes](/apps/access-scopes.html#available-authentication-scopes).
:::

## Authenticate after the first Authorization request

If a user is trying to access your App from his Akeneo PIM, and you want to authenticate him, start an
[Authorization Request](/apps/using-oauth2.html#authorization-request),
**even if you already are connected to his Akeneo PIM**.

**During this new Authorization Request, you must request all the scopes your App needs**, including the Authorization
scopes, in addition to the OpenID scopes.

## Extracting user information from the ID Token

At the end of the OAuth 2.0 process, if your Access Token Request is accepted, you will receive a JSON response with
both tokens:

```json

{
  "access_token": "Y2YyYjM1ZjMyMmZlZmE5Yzg0OTNiYjRjZTJjNjk0ZTUxYTE0NWI5Zm",
  "token_type": "bearer",
  "scope": "openid email profile read_products write_products",
  "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOi8vM.XcmmANmSC2RHqWOI"
}
```

### Decoding the ID Token

An ID Token is a JWT composed of 3 parts encoded independently in base64: `header.payload.signature`.

We recommend using one of the libraries listed [here](https://jwt.io/libraries) with support for `RS256` to decode it
and retrieve the values inside the payload.

::: warning
It's not recommended to try to decode and verify the ID Token yourself.
:::

### Payload

Once you've decoded the payload, it will look like this:

```json

{
  "iss": "https://my-pim.cloud.akeneo.com",
  "jti": "c76d558d-d10a-4bac-b320-12c22e36b3db",
  "sub": "c6acd619-8a08-46c2-9a5e-41a175d9149d",
  "aud": "206f450e-09a1-44ed-a0b3-9dd80f980ace",
  "iat": 1643029678.467703,
  "exp": 1643033278.467703,
  "email": "john.doe@example.com",
  "firstname": "John",
  "lastname": "Doe"
}
```

| Field       | Description                          |
|-------------|--------------------------------------|
| `iss`       | URL of the token issuer              |
| `jti`       | Unique identifier for the token      |
| `sub`       | **Unique user id**                   |
| `aud`       | Id of the OAuth 2.0 client           |
| `iat`       | Timestamp of token creation          |
| `exp`       | Timestamp of token expiration        |
| `email`     | **(optional) Email of the user**     |
| `firstname` | **(optional) Firstname of the user** |
| `lastname`  | **(optional) Lastname of the user**  |

Additional information (`email`, `firstname`, `lastname`, ...) are only present if you requested the corresponding
authentication scopes and those were approved by the user.

::: warning
`email`, `firstname` and `lastname` are values that can be edited on Akeneo PIM and are not verified by
Akeneo. The only value that will truly identify a user is his unique user id in the subject claim (`sub`).
:::

### Signature

The ID Token sent by Akeneo PIM contains a signature, and you must verify it to guarantee that the payload has not be
tampered with.

To validate the signature, you must retrieve the public key available at the
URL `{PIM}/connect/apps/v1/openid/public-key`.

Then, follow the instructions of the library you are using.

::: warning
The pair of private/public keys are regenerated regularly for security reasons. You should always retrieve
the latest public key when validating a signature.
:::

::: panel-link Next step [Access scopes](/apps/access-scopes.html)
:::
