# Security

We use [`OAuth2`](https://oauth.net/2/) to authenticate users in the API and
[`Symfony ACLs`](http://symfony.com/doc/2.7/security/acl.html) to handle authorizations.

## Authentication

### Create an OAuth client

The first operation to do is to authorize third-party applications to use the API. For that, you need to create a client id.
A client id identifies a client application.

To increase security, the OAuth protocol specifies that a client id comes with a secret. They are always generated, used and revoked together.

To create a new pair of client id / secret, use the following command:

```bash
php app/console pim:oauth-server:create-client \
    --grant-type="password" \
    --grant-type="refresh_token"
```

You will get something like:

```bash
A new client has been added:
client_id: 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s
secret: 5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s
```

These keys must be transmitted by the administrator to any third-party application wanting to use the API.

Client ids allow two things:
- asking a token for a specific user,
- refreshing an expired token.

:::info
In case you want to give a time-limited access, you can create the client id without specifying the
`--grant-type="refresh_token"` option. This way, the client application can only access the API until the first token
expires, then will be unable to refresh it.
:::

:::warning
Client ids are not enough to access the API, it's the role of tokens. See [Getting a token](documentation.html#get-a-token) section for more details.
:::

### Revoke an OAuth client

To revoke a client id use the following command:

```bash
php app/console pim:oauth-server:revoke-client your-client-id
```

#### Example
```bash
php app/console pim:oauth-server:revoke-client 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s
```

:::warning
Client ids can be revoked at any moment by the administrator. In this case, all tokens created with the revoked client id will be invalidated and the application using this client id will be unable to ask for a new one.
:::

### List all OAuth clients

To get the list of all existing client ids use the following command:

```shell
php app/console pim:oauth-server:list-clients
```

You will get this answer.
```bash
+----------------------------------------------------+----------------------------------------------------+
| Client id                                          | Secret                                             |
+====================================================+====================================================+
| 3e2iqilq2ygwk0ccgogkcwco8oosckkkk4gkoc0k4s8s044wss | 44ectenmudus8g88w4wkws84044ckw0k4w4kg0sokoss84oko8 |
| 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s | 5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s |
+----------------------------------------------------+----------------------------------------------------+
```

### Get a token

A client id has been created and provided to the client application. The last information needed to use the API is the token.

First, you will have to encode in base64 the secret id and the secret given by the administrator with a `:` in between.

```bash
client_id:secret
3e2iqilq2ygwk0ccgogkcwco8oosckkkk4gkoc0k4s8s044wss:44ectenmudus8g88w4wkws84044ckw0k4w4kg0sokoss84oko8

base64 encoded
M2UyaXFpbHEyeWd3azBjY2dvZ2tjd2NvOG9vc2Nra2trNGdrb2MwazRzOHMwNDR3c3M6NDRlY3Rlbm11ZHVzOGc4OHc0d2t3czg0MDQ0Y2t3MGs0dzRrZzBzb2tvc3M4NG9rbzg=
```

To get a valid token, the client application must send the following request:

```bash
curl -X POST http://your-host/api/oauth/v1/token \
    -H "Content-Type: application/json" \
    -H "Authorization: Basic YOUR_BASE_64_CLIENT_ID_AND_SECRET" \
    -d '{
        "grant_type": "password",
        "username": your_username,
        "password": your_password
    }'
```

#### Example

**Request**
```bash
curl -X POST http://my-favorite-pim.com/api/oauth/v1/token \
    -H "Content-Type: application/json" \
    -H "Authorization: Basic M2UyaXFpbHEyeWd3azBjY2dvZ2tjd2NvOG9vc2Nra2trNGdrb2MwazRzOHMwNDR3c3M6NDRlY3Rlbm11ZHVzOGc4OHc0d2t3czg0MDQ0Y2t3MGs0dzRrZzBzb2tvc3M4NG9rbzg=" \
    -d '{
        "grant_type": "password",
        "username": "peter",
        "password": "peter4ever"
    }'
```

**Response**
```http
HTTP/1.1 200 OK

{
    "access_token": "NzFiYTM4ZTEwMjcwZTcyZWIzZTA0NmY3NjE3MTIyMjM1Y2NlMmNlNWEyMTAzY2UzYmY0YWIxYmUzNTkyMDcyNQ",
    "expires_in": 3600,
    "token_type": "bearer",
    "scope": null,
    "refresh_token": "MDk2ZmIwODBkYmE3YjNjZWQ4ZTk2NTk2N2JmNjkyZDQ4NzA3YzhiZDQzMjJjODI5MmQ4ZmYxZjlkZmU1ZDNkMQ"
}
```

Detail of the information given in the response:
- `access_token` is the information that must be included in every requests to the API for the client application to be authorized (see the example below).
- `expires_in` is the token lifespan (in seconds). By default, it lasts 1 hour.
- `refresh_token` is a special token used only to refresh your `access_token` after it expired.


### Access a resource

Use the token that you got before in every request to the API.

#### Example

```bash
curl https://demo.akeneo.com/api/rest/v1/categories \
    -H "Authorization: Bearer NzFiYTM4ZTEwMjcwZTcyZWIzZTA0NmY3NjE3MTIyMjM1Y2NlMmNlNWEyMTAzY2UzYmY0YWIxYmUzNTkyMDcyNQ"
```

:::info
There are only 2 routes that do not require authentication:
 - the root of the API, that lists all the available endpoints. See [this section](/documentation.html#list-of-available-endpoints) for more info.
 - and of course, the root to get tokens. Pretty logic, isn't it!
:::


### Refresh an expired token

For security reasons, access tokens have a certain lifespan. A client application using an expired token will be unable to request the API.

After a token has expired, the client application can ask for a new token by calling:

```bash
curl -X POST http://your-host/api/oauth/v1/token\
    -H "Content-Type: application/json" \
    -H "Authorization: Basic YOUR_BASE_64_CLIENT_ID_AND_SECRET" \
    -d "grant_type"=refresh_token \
    -d "refresh_token"=REFRESH_TOKEN
```

#### Example

**Request**
```bash
curl -X POST http://your-host/api/oauth/v1/token \
    -H "Content-Type: application/json" \
    -H "Authorization: Basic M2UyaXFpbHEyeWd3azBjY2dvZ2tjd2NvOG9vc2Nra2trNGdrb2MwazRzOHMwNDR3c3M6NDRlY3Rlbm11ZHVzOGc4OHc0d2t3czg0MDQ0Y2t3MGs0dzRrZzBzb2tvc3M4NG9rbzg=" \
    -d "grant_type"=refresh_token \
    -d "refresh_token"=MDk2ZmIwODBkYmE3YjNjZWQ4ZTk2NTk2N2JmNjkyZDQ4NzA3YzhiZDQzMjJjODI5MmQ4ZmYxZjlkZmU1ZDNkMQ 
```

**Response**
```http
HTTP/1.1 200 OK

{
  "access_token": "MjkxYjM0ZGU0OGQzN2MzNmRmOGFkMzgxODdhMDZiNmE1MTI2ZDJmYmM5MTBhZWFiMGY0ZjE3YzJhOTJkOGRlZA",
  "expires_in": 3600,
  "token_type": "bearer",
  "scope": null,
  "refresh_token": "MTU2OWI5NGYwZTU2MThmMjE3MzRmYmIyMjlmYzU5Zjc3ZDhlM2E5YzQyMmIyMDVhOGY2OWQ3MTM0MTMzNmZlYw"
}
```

The response is the same as when asking for the initial token except that it contains a new `access_token` and `refresh_token`. You can then use the new `access_token` in every request you make to the API.

## Authorization

Like when using the PIM through the UI, ACLs are here to define what a user can and cannot do.
In the role form, a `Web API permissions` tab includes several ACLs specially crafted for the API.

![Web API permission tab screenshot](img/activate_api_access.png)

### Overall access

The first ACL `Overall Web API access` means that if enable for a role, each user depending on that role will have access to the Web API.

### Catalog structure access

You can tune more finely this permission by restricting or allowing the access to the entities of the catalog structure (categories, families, attributes, attribute options, channels and locales). The table below lists all the availables ACLs.

| Permission name | If enable, you will be able to |
|-----------------|-------------------|
| List categories | GET on `/categories` and on `/categories/{category_code}`|
| List families | GET on `/families` and on `/families/{family_code}`|
| List attributes | GET on `/attributes` and on `/attributes/{attribute_code}` |
| List attribute options | GET on `/attributes/{attribute_code}/options` and on `/attributes/{attribute_code}/options/{attribute_option_code}` |
| List channels | GET on `/channels` |
| List locales | GET on `/locales` |
| Create and update categories | POST and PATCH on `/categories/{category_code}` |
| Create and update families | POST and PATCH on `/families/{family_code}` |
| Create and update attributes | POST and PATCH on `/attributes/{attribute_code}` |
| Create and update attribute options | POST and PATCH on `/attributes/{attribute_code}/options/{attribute_option_code}` |

:::warning
As accessing the API grants higher privileges than when using the UI, we strongly recommend creating one or more dedicated users with specific roles for the web API.
:::

:::info
Note that if a role has `Overall Web API` access, then it means that the users depending on that role will be able to make requests on products. There is no way to only restrict the access on products for now. 
:::