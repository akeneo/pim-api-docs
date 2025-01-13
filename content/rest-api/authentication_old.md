# Authentication

:::warning
This documentation is related to the API authentication on old PIM version (<=V3.0).
If you have a PIM SaaS sandbox or a PIM version (>V3.0), you should read this [documentation](/documentation/authentication.html) instead.
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
