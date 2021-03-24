# _Step 3_ |  Make the REST API request

Alright! You're all set now. Let's launch this request.

1. In Postman, in the `Collections` panel, click on `Your very first collection`.
2. Click on the `The authentication request` request.
![Authent request in the postman collection](/img/getting-started/very-first-request-collection-in-postman.png)
3. Hit the blue `Send` button.
![Send authent request](/img/getting-started/send-authent-request.png)
In the response area, you should get an answer similar to the one below.
![Response area for authent request](/img/getting-started/authentication-response.png)
4. Now, click on `Your very first request` in the `Collections` tab.
5. You can see the request we are about to launch. It is using the endpoint referenced [here](/api-reference.html#get_products). We are going to ask your PIM to give us its first 100 products.
![Your very first request](/img/getting-started/your-very-first-request.png)
6. Are you ready? Hit the blue `Send` button.
In the response area, you can see a list of 100 products in json format. 

:tada: **You've just did your first REST API call!**

::: warning
The response area is showing you an empty list of products?  
It's totally normal, it means that your are using the Entreprise edition. To view products, you need to configure the permissions linked to the connection.  
To do so, create a user group that has view rights over your category trees and then, link this user group to your connection. :wink:
For more details, don't hesitate to browse our [help center documentation](https://help.akeneo.com/pim/articles/manage-your-connections.html#configure-the-connection-user-group).
:::

::: info
The authentication token only lasts for one hour. This means that after one hour your token will expire. And you will receive an error message that looks like this.
![401 token expired](/img/getting-started/token-expiration-in-postman.png)
Don't panic! You just have to send the `The authentication request` again and you'll be all good. :wink:
:::

