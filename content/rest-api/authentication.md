# Authentication

:::warning
This documentation concerns `Connector` development only.

If you develop an `App` please consult this [documentation](/apps/authentication-and-authorization.html) instead.
:::

For security reasons, to access the REST API, you will need to be authenticated.
To authenticate your REST API calls, the PIM will provide you a pair of client ID and secret. [See here to discover how](#client-idsecret-generation).

Client IDs allow two things:
- to ask for a token for a specific API user,
- to refresh an expired token.

This means that you will also need to [create an API user](#api-user-creation) in order to get this token. 

Once you get its username and password, together with the client ID and the secret, you will eventually be able to generate a token for the REST API. This is the _key_ to finally access the REST API. See [here for more details](#token-generation).

## Client ID/secret generation

Depending on your PIM version, there are two different ways to generate these client IDs/secrets:
- User of a v4 or newer PIM, you can follow [these simple steps](#since-the-pim-v4).
- Using a PIM v2.x or v3.x? [Follow the instructions right here.](#with-a-v2x-and-3x-pim)
- Still using the v1.7? [Here you go!](#with-a-v17-pim)

::: tips
**You don't know your PIM version?**  
You can find it in the `version` line of the `System/System information` page.  
If the version looks like a datetime, you use one of our SaaS offers, so please check the _Since the PIM v4_ paragraph.
:::

### Since the PIM v4 
Since the PIM v4, there is one unique and streamlined way to generate your client ID and secret. See by yourself!

1. Log into your favorite PIM.
1. Depending on the version you use, go to the `System/Connections` menu (before the v6) or the `Connect/Connection settings` menu.
1. Click on `Create`.
1. Input a label for your connection, `ERP` for example.
1. Select a type flow. [_Don't know what it is? More info here._](https://help.akeneo.com/pim/articles/manage-your-connections.html#choose-your-flow-type)
1. Click on `Save`.

Congrats! You officially created your very first connection to the PIM. :tada:

You can now find the client ID and secret in the `Credentials` section of the connection you've just created.

[Not comfortable with the **Connection** notion? We explain everything right here!](https://help.akeneo.com/pim/articles/what-is-a-connection.html)

::: info
In case your secret leaked, you can easily revoke it and generate a new one for your connection by clicking on the dedicated icon, on the right side of the secret.
:::

### With a v2.x and 3.x PIM

In 2.x or 3.X, you will need to create what we called an `API connection`. 

1. Log into your favorite PIM.
1. Navigate to the `System/API connections` menu. 
1. Click on `Create`. 
1. Input a label for your connection, `ERP connection` for example.
1. Click on `Save`.

The PIM automatically generates a client ID and secret, that you will find in the API connections grid.

::: info
In case your secret leaked, you can revoke an API connection by clicking on the `Revoke` button. It is located in the `API connections` entry you will find under the `System` menu.  
Note that it will totally delete your whole API connection, i.e. you will have to create a new one.
:::

### With a v1.7 PIM

In v1.7, to generate a new client ID and secret, you need to use the following command directly on the PIM server.

```bash
php app/console pim:oauth-server:create-client \
    --grant_type="password" \
    --grant_type="refresh_token" \
    --env=prod \
    --label="ERP connection"
```

You will get something like:

```bash
A new client has been added:
client_id: 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s
secret: 5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s
label: ERP connection
```

:::info
You have to give a label to your pair of client id / secret when you create them. This is useful to remember which application you give this pair of credentials to.
:::

#### Secret revocation
In case your secret leaked, you can revoke it by using the following command:
```bash
php app/console pim:oauth-server:revoke-client the-client-id --env=prod
```
We ask for a confirmation when you revoke a client.
```bash
This operation is irreversible. Are you sure you want to revoke this client? (Y/n)
```
If you type Y, the client is then revoked and you will receive this message.
```bash
Client with public id 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s and secret 5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s has been revoked.
```

#### List all API connections
Just run the following command, still on your PIM server.
```shell
php app/console pim:oauth-server:list-clients --env=prod
```

You will get this answer.
```bash
+----------------------------------------------------+----------------------------------------------------+-------------------+
| Client id                                          | Secret                                             |  Label            |
+====================================================+====================================================+===================+
| 3e2iqilq2ygwk0ccgogkcwco8oosckkkk4gkoc0k4s8s044wss | 44ectenmudus8g88w4wkws84044ckw0k4w4kg0sokoss84oko8 | Print catalog connection |
| 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s | 5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s | ERP connection |
| 4_5e6kfzmath8gowk0s000kkgc0o44cwgwsockwk0ccss4sw0w | 2nwha9mzk2w4so0cgokwocswoc48s0sg44wgg40kkokgg4w0go | Magento connection |
+----------------------------------------------------+----------------------------------------------------+-------------------+
```

## API user creation

You now have a client ID and a secret.  But the request to get this token needs a username and a password.

::: tips
**You don't know your PIM version?**  
You can find it in the `version` line of the `System/System information` page.  
If the version looks like a datetime, you use one of our SaaS offers, so please check the _Since the PIM v4_ paragraph.
::: 

### Since the PIM v4

Since the PIM v4, this username and password are automatically generated whenever you create a connection in the UI. Depending on the version you use, navigate to the `System/Connections` menu (before the v6) or the `Connect/Connection settings` menu, click on your connection and find your username and password in the `Credentials` section.

You may need to regenerate a password if you haven't saved it anywhere. Indeed, for security reasons, the PIM can only show it to you once, after the connection is created. There is a `Regenerate` button close to the hidden password if needed. :wink:

### With a v1.7, 2.x and 3.x PIM

In previous versions of the PIM, you need to navigate to the `System/Users` menu in your PIM UI and create a new user. We strongly advise you to create specific API users. Do not re-use UI users. 🙂


## Token generation

You now have a client ID, a secret, a username and a password. The last information needed to use the REST API is the token.

First, you will have to encode the client ID and the secret, in base64, with a `:` in between.

```
client_id:secret
4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s:5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s

base64 encoded
NGdtNHJub2l6cDhnc2tna2swODBzc29vODAwNDBnNDRrc293d2d3ODQ0azQ0c2MwMHM6NWR5dm8xejZ5MzRzbzRvZ2tna3N3ODhvb2tvb3dzMDBjZ29jNDg4a2NzOHdrNGM0MHM=
```

To get a valid token, the client application must send the following request:

```bash
curl -X POST http://your-host/api/oauth/v1/token \
    -H "Content-Type: application/json" \
    -H "Authorization: Basic YOUR_BASE_64_CLIENT_ID_AND_SECRET" \
    -d '{
        "grant_type": "password",
        "username": "your_API_username",
        "password": "its_password"
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
    -H "Authorization: Basic NGdtNHJub2l6cDhnc2tna2swODBzc29vODAwNDBnNDRrc293d2d3ODQ0azQ0c2MwMHM6NWR5dm8xejZ5MzRzbzRvZ2tna3N3ODhvb2tvb3dzMDBjZ29jNDg4a2NzOHdrNGM0MHM=" \
    -d '{
        "grant_type": "password",
        "username": "myERPuser",
        "password": "64bngr78"
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
- `access_token` must be included in every request to the REST API for the client application to be authorized (see the example below).
- `expires_in` is the token lifespan (in seconds). By default, it lasts 1 hour.
- `refresh_token` is a special token used only to refresh your `access_token` after it expired.


## Access a resource

Use the token that you just got for every request to the REST API.

#### Example

```bash
curl https://demo.akeneo.com/api/rest/v1/categories \
    -H "Authorization: Bearer NzFiYTM4ZTEwMjcwZTcyZWIzZTA0NmY3NjE3MTIyMjM1Y2NlMmNlNWEyMTAzY2UzYmY0YWIxYmUzNTkyMDcyNQ"
```

:::info
There are only 2 routes that do not require authentication:
 - the root of the REST API, that lists all the available endpoints. See [this section](/documentation/overview.html#list-of-available-endpoints) for more info.
 - and of course, the route to get tokens. Pretty logic, isn't it!
:::


## Refresh an expired token

For security reasons, access tokens have a certain lifespan. A client application using an expired token will be unable to request the REST API.

After a token has expired, the client application can ask for a new token by calling:

```bash
curl -X POST http://your-host/api/oauth/v1/token \
    -H "Content-Type: application/json" \
    -H "Authorization: Basic YOUR_BASE_64_CLIENT_ID_AND_SECRET" \
    -d '{
        "refresh_token" : "REFRESH_TOKEN",
        "grant_type": "refresh_token"
    }'
```

#### Example

**Request**
```bash
curl --location --request POST 'http://my-favorite-pim.com/api/oauth/v1/token' \
-H 'Content-Type: application/json' \
-H 'Authorization: Basic M18xc3duZzU0ZHY2ODB3MG84Z2N3Y3d3ODRzd2tvYzA0NG9jc2c0b2N3azRjYzAwY2swdzozc3VhaHhlODhsaWNvdzAwZzBvODBnY2NnZ2d3OGNza2c0d2NvOHdvb293dzQ4ODBzbw==' \
-d '{
    "refresh_token" : "OTI5MDE4ZjBiNjUyNWEyOTA5ZWQxNjE0ZDJiZTAzZTIwZjQ5ZDJmMDlhYzk4OTdjNzgzMTVkZDlmNTlmZjY3OQ",
    "grant_type": "refresh_token"
 }'
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

The response is the same as when asking for the initial token, except that it contains a new `access_token` and a new `refresh_token`. You can then use this `access_token` for every REST API request you do within an hour.

::: info
By default, the refresh token expiration is set at 1209600 seconds (14 days).
:::