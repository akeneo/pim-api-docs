# _Step 3_ | Identify your connector in the PIM

In the very first step of this tutorial, you created a connection in the PIM.  
Here, we are going to associate this connection to the connector you've built (or downloaded from the marketplace).

By doing so, you will be able to easily monitor the data flows between your connector and the PIM.

1. In your PIM, go under `System`/`Connections`.
2. In the overview of all your connections, click on the one we created in step 1, aka `My ERP`.
3. In the `Credentials` section of the screen, you will find the "key" to the link between your connection and your connectors: the credentials.
![Connection credentials](/img/getting-started/connection-credentials.png)
4. Thanks to the _copy_ icon on the left side of the table, copy each credential fields: the client id, the secret, the username and the password.
![Copy icon](/img/getting-started/connection-credentials-copy-icon.png)
5. Paste them into your connector so that it will use these credentials to be authenticated over the REST API.
6. In the `Permissions` section of your connection, you also need to carefully set up the permissions you want for your connection. For more information on this step, don't hesitate to browse [our help center documentation right here](https://help.akeneo.com/pim/serenity/articles/manage-your-connections.html#set-the-permissions). :wink:  
If you want to explore what you can do thanks to those permissions, there is also a [documentation about their superpowers](/documentation/permissions.html#catalog-permissions-ee-only). Go read it!

That's it! :tada:

Whenever your connector will start making REST API calls, you will be able to check whether your connector is actually working. Indeed, we got you covered with the **Connection dashboard**.  
To access this screen, click on the `Activity` menu and then on the `Connection dashboard` submenu.

Here, you can follow the number of products that were updated or created in the past seven days. In our tutorial, it's perfect, because we are updating/creating products coming from our ERP. So we can verify that products are actually created/updated by our connector. 😊

And... that's it! :tada: You now know how to properly connect the PIM. :wink:
