# Security

We use [`OAuth2`](https://oauth.net/2/) to authenticate users in the API and
[`Symfony ACLs`](http://symfony.com/doc/2.7/security/acl.html) to handle authorizations.

## Authentication

### Create an API connection

The first operation to do is to authorize third-party applications to use the API. For that, you need to create a client id.
A client id identifies a client application.

To increase security, the OAuth protocol specifies that a client id comes with a secret. They are always generated, used and revoked together. This set of credentials is called `API connection` inside the PIM.

There are two ways to create these credentials.

#### With the PIM UI (2.0 only)

Log in in your favorite PIM and click on the `System` menu. Then select the `API connections` entry. Here, you should find a `Create` button. When you click on it, the interface asks you for a label. Give a name that will represents what is going to do the connector or tool that will be using this access to the API.

When you confirm, the PIM automatically generates a client id and secret, that you will find in the API connections grid. You can then use the credentials to authenticate your calls made with the API.

#### With a command line

To create a new pair of client id / secret, use the following command directly on the PIM server.

**With the 2.0 version**
```bash
php bin/console pim:oauth-server:create-client "Magento connector" \
    --grant_type="password" \
    --grant_type="refresh_token" \
    --env=prod
```

**With the 1.7 version**
```bash
php app/console pim:oauth-server:create-client \
    --grant_type="password" \
    --grant_type="refresh_token" \
    --env=prod \
    --label="Magento connector"
```

You will get something like:

```bash
A new client has been added:
client_id: 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s
secret: 5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s
label: Magento connector
```

:::info
You have to give a label to your pair of client id / secret when you create them. This is useful to remember which application you give this pair of credentials to.
:::

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
Client ids are not enough to access the API, it's the role of tokens. See [Getting a token](/documentation/security.html#get-a-token) section for more details.
:::

### Revoke an API connection

API connections can be revoked at any moment by the administrator. In this case, all tokens created with the revoked client id of the API connection will be invalidated and the application using this connection will be unable to ask for a new one.

#### With the PIM UI (2.0 only)

You can revoke an API connection, in the `API connections` entry you will find in the `System` menu.

#### With a command line

Alternatively, you can also use the following command on the PIM server.

**With the 2.0 version**
```bash
php bin/console pim:oauth-server:revoke-client the-client-id --env=prod
```

**With the 1.7 version**
```bash
php app/console pim:oauth-server:revoke-client the-client-id --env=prod
```

We ask for a confirmation when you revoke a client.
```bash
This operation is irreversible. Are you sure you want to revoke this client? (Y/n)
```
If you type Y, the client is then revoke and you will receive this message.
```bash
Client with public id 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s and secret 5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s has been revoked.
```

### List all API connections

#### With the PIM UI (2.0 only)

Just click on the `API connections` entry you will find in the `System` menu to see the full list of API connections that have been created.

#### With a command line

To get the list of all existing API connections use the following command:

**With the 2.0 version**
```shell
php bin/console pim:oauth-server:list-clients --env=prod
```

**With the 1.7 version**
```shell
php app/console pim:oauth-server:list-clients --env=prod
```

You will get this answer.
```bash
+----------------------------------------------------+----------------------------------------------------+-------------------+
| Client id                                          | Secret                                             |  Label            |
+====================================================+====================================================+===================+
| 3e2iqilq2ygwk0ccgogkcwco8oosckkkk4gkoc0k4s8s044wss | 44ectenmudus8g88w4wkws84044ckw0k4w4kg0sokoss84oko8 | ERP connector |
| 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s | 5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s | Print catalog connector |
| 4_5e6kfzmath8gowk0s000kkgc0o44cwgwsockwk0ccss4sw0w | 2nwha9mzk2w4so0cgokwocswoc48s0sg44wgg40kkokgg4w0go | Magento connector |
+----------------------------------------------------+----------------------------------------------------+-------------------+
```

### Get a token

An API connection was created and its client id and secret were provided to the client application. The last information needed to use the API is the token.

First, you will have to encode in base64 the secret id and the secret given by the administrator with a `:` in between.

```
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

:::info
The content type `application/x-www-form-urlencoded` is also supported.
:::

:::warning
If you experience any error, please check the [troubleshooting guide](/documentation/troubleshooting.html#missing-client-id).
:::

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
 - the root of the API, that lists all the available endpoints. See [this section](/documentation/overview.html#list-of-available-endpoints) for more info.
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

![Web API permission tab screenshot](/img/activate_api_access.png)

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
| List attribute group *(2.0 only)* | GET on `/attribute-groups` and on `/attributes-groups/{attribute_groups_code}` |
| List association types *(2.0 only)* | GET on `/association-types` and on `/association-types/{association_type_code}` |
| List channels | GET on `/channels` and on `/channels/{channel_code}` |
| List locales | GET on `/locales` and on `/locales/{locale_code}` |
| List currencies *(2.0 only)*  | GET on `/currencies` and on `/currencies/{currency_code}` |
| Create and update categories | POST and PATCH on `/categories/{category_code}` <br/> PATCH on `/categories` |
| Create and update families | POST and PATCH on `/families/{family_code}` <br/> PATCH on `/families` |
| Create and update attributes | POST and PATCH on `/attributes/{attribute_code}` <br/> PATCH on `/attributes`|
| Create and update attribute options | POST and PATCH on `/attributes/{attribute_code}/options/{attribute_option_code}` <br/> PATCH on `/attributes/{attribute_code}/options` |
| Create and update attribute groups *(2.0 only)* | POST and PATCH on `/attribute-groups/{attribute_group_code}` <br/> PATCH on `/attribute-groups` |
| Create and update association types *(2.0 only)* | POST and PATCH on `/association-types/{association_type_code}` <br/> PATCH on `/association-types` |
| Create and update channels *(2.0 only)* | POST and PATCH on `/channels/{channel_code}` <br/> PATCH on `/channels` |

:::warning
As accessing the API grants higher privileges than when using the UI, we strongly recommend creating one or more dedicated users with specific roles for the web API.
:::

:::info
Note that if a role has `Overall Web API` access, then it means that all the users depending on that role will be able to make requests on products. There is no way to only restrict the access on products, except if you are using a 2.0 Entreprise Edition. In this case, the EE permissions based on user groups are applied on the API.
:::
