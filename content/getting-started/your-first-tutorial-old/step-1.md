# _Step 1_ | Generate your credentials

You will need a client ID and a secret if you want to be able to make API requests. So let's get those credentials!

## Create an API user

To use the API, you need an API user. Create it in the PIM. You can call it `myAPIuser`. You will be asked for a password: enter `myAPIuserPassword`.

::: info
_Best practice:_ Always create a dedicated user when you want to use it to make your API calls. Do not re-use real users.
:::

## Create an API user role

Then, we are going to create a dedicated user role. We will name it `My API user role`. 

1. Click on `System` menu.
1. Click on the `Role` submenu. 
1. From here, you should be able to create a role, click on `Create role`.
![Role creation](/img/getting-started/role-creation.png)
1. Once in the role form, give a name to the role you are creating: `My API user role`.
![Role naming](/img/getting-started/role-naming.png)
1. Go to the `Web API Permissions` tab and activate the access to the Web API by clicking on `Overall Web API access.
![Permission activation](/img/getting-started/permission-activation.png)
1. Click on the `Users` tab and tick the box next to the `myAPIuser` to associate your API user to this new role.
![Permission assignation](/img/getting-started/permission-assignation.png)
1. Click on the `Save` button.

::: info
_Best practice:_ Do not - under any condition :wink: - re-use a user role that is assigned to real users. Indeed, we highly recommend you to create a dedicated user role for your API user.
:::

## Get you client ID and secret

Depending on your PIM version (v1.7 or v2/v3), there are two methods to generate your client ID and secret.

If you are using a v2 or V3 PIM, [create an API connection](#by-creating-an-API-connection).  
If you are using a v1.7, [launch a command line](#by-command-line-for-v17-pim-only).

### By creating an API connection

You will then need a client ID and a secret. To do so, we will create an API connection. We will call it, for the purpose of this example: `My very first API connection`

::: warning
This feature is only available since the 2.0 version. If you are trying to use the API on a 1.7 PIM, please have a look to the [second method below](#get-your-credentials-via-command-line-).
:::

1. Click on the `System` menu.
1. Click on the `API connections` submenu.
1. Click on the `Create` button.
![API connections empty screen](/img/getting-started/api-connections-empty-screen.png)
The following popin should be then displayed.
![API connection creation popin](/img/getting-started/api-connection-creation-popin.png)
1. Enter `My very first API connection` in the label field and click on the `Save` button.  
You API connection appears in the API connections table and should look like this:
![My very first API connection](/img/getting-started/my-very-first-api-connection.png)

And that's it! :tada:

Along with the username and the password we just created, these are your credentials to authenticate yourself when using the API.

::: panel-link And now, let's configure the tool that will make the API request [The Postman set up](/getting-started/my-first-tutorial-old/step-2.html)
:::

### By command line for v1.7 PIM only

::: warning
Use this method only if you are using a v1.7 PIM.
:::

1. Launch this command line on your PIM.
```
php app/console pim:oauth-server:create-client \
    --label="My very first API connection"
    --grant_type="password" \
    --grant_type="refresh_token" \
    --env=prod
```
You will get something like:
```
A new client has been added:
client_id: 4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s
secret: 5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s
label: My very first API connection
```

Easy, right? 🙂

Along with the username and the password we just created, these are your credentials to authenticate yourself when using the API.

::: panel-link And now, let's configure the tool that will make the API request [The Postman set up](/getting-started/your-first-tutorial-old/step-2.html)
:::

