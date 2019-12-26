# _Step 2_ | Generate your credentials

In this step, you are going to generate your credentials. :rocket:

Indeed, you will need an API user, a password, a client ID and a secret if you want the connector you just cooked, to work. So let's get those credentials!

::: info
_Best practice_  
We strongly advise you to create **one set of credentials** for each one of your connectors.  
Indeed, it will ease a lot your migration to the PIM v4, in case you are planning for it.
:::

## Create an API user

First, we will create an API user for your connector.  
Remember, as an example, we took an ERP connection for the purpose of this tutorial.  
So let's create an API user called `myERPuser` in the PIM. At the same time, you will be asked for a password: enter `myERPuserPassword`, for example (or something else more secure! :wink:).

::: info
_Best practice_  
Always create a dedicated user for each one of your connectors.  
We also strongly recommend you not to use a real user, as a UI user will never do the same actions than an API user.
:::

## Create an API user role

Then, we are going to create a dedicated user role for your connector. We will name it `My ERP connector role`, for our tutorial example. 

1. Click on `System` menu.
1. Click on the `Role` submenu. 
1. From here, you should be able to create a role, click on `Create role`.
![Role creation](/img/getting-started/role-creation.png)
1. Once in the role form, give a name to the role you are creating: `My ERP connector role`.
![Role naming](/img/getting-started/role-naming-my-erp-connector.png)
1. Go to the `Web API Permissions` tab and activate the access to the Web API by clicking on `Overall Web API access`.
![Permission activation](/img/getting-started/permission-activation.png)
1. Still in this tab, select the other permissions needed for your connector's API calls to work.  
_In the case of our ERP example, we don't need to activate other permissions, as the connector will only create products and this permission is already granted by the `Overall Web API access` above._
1. Click on the `Users` tab and tick the box next to the `myERPuser` to associate your API user to this new role.
![Permission assignation](/img/getting-started/permission-assignation-my-erp-user.png)
1. Click on the `Save` button.

::: info
_Best practice_  
Do not - under any condition :wink: - re-use a user role that is assigned to real users. Indeed, we highly recommend you to create a dedicated user role for each one of your connectors.  
This way, you can give this user role, exactly the API permissions needed for your connector to work.
:::

## Get your client ID and secret

Next, you will need to generate a client ID and a secret for your connection.

::: info
_Best practice_  
Generate one set of client ID/secret by connector. Indeed, we advise you not to share them between your connectors.  
It will simplify the management of these credentials. For example, in case one of the secret leaks, it won't impact all your connectors at once. :wink:
:::

Depending on your PIM version (v1.7 or v2/v3), there are two methods to generate your client ID and secret.

If you are using a v2 or V3 PIM, [create an API connection](#by-creating-an-API-connection).  
If you are using a v1.7, [launch a command line](#by-command-line-for-v17-pim-only).

### By creating an API connection

We will create an API connection. We will call it, for the purpose of this tutorial: `ERP`

::: warning
This feature is only available since the 2.0 version. If you are trying to use the API on a 1.7 PIM, please have a look to the [second method below](#get-your-credentials-via-command-line-).
:::

1. Click on the `System` menu.
1. Click on the `API connections` submenu.
1. Click on the `Create` button.
![API connections empty screen](/img/getting-started/api-connections-empty-screen.png)
The following popin should be then displayed.
![API connection creation popin](/img/getting-started/api-connection-creation-popin.png)
1. Enter `ERP` in the label field and click on the `Save` button.  
You API connection appears in the API connections table and should look like this:
![My very first API connection](/img/getting-started/my-erp-connection.png)

And that's it! :tada:

### By command line for v1.7 PIM only

::: warning
Use this method only if you are using a v1.7 PIM.
:::

1. Launch this command line on your PIM.
```
php app/console pim:oauth-server:create-client \
    --label="ERP connection"
    --grant_type="password" \
    --grant_type="refresh_token" \
    --env=prod
```
You will get something like:
```
A new client has been added:
client_id: 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s
secret: 5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s
label: ERP connection
```

Easy, right? 🙂

## Configure your connector with the credentials

Thanks to the previous steps, you now have:
- a username,
- a password for this user,
- a client ID,
- a secret.

Give this set of credentials to the connector you cooked in step 1.  
They will authenticate all its API calls.

You can now use your connector for real and test the entire workflow, from the product creation in your ERP to their creation into the PIM, for our tutorial example.

And... that's it! :tada: You now know how to properly connect the PIM. :wink:



