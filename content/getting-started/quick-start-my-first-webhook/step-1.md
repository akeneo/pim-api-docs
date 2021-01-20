# _Step 1_ | Receive my first set of data

Here, you will connect an event subscription to a fake endpoint and receive your first data. :rocket:

## Create a Bin on Mockbin

[Mockbin](http://mockbin.org/) allows you to generate custom endpoints to test, mock, and track HTTP requests & responses between libraries, sockets and APIs.
Go to [mockbin.org/bin/create](http://mockbin.org/bin/create) to create your Bin and if needed change the configuration to respond with a 200 status.

![Create Bin on Mockbin](/img/getting-started/quick-start-my-first-webhook/create-mockbin.png)

Then click on `Create Bin` and go to the history of your Bin.
Alright! Mockbin is ready to receive our first piece of data from PIM webhooks.

## Send data to Mockbin

Now, log into your 5.x or Serenity PIM and go to the event subscriptions page of the connection you created before.
Fill in the URL field with the URL of your Bin and click on the `Test` button. 

::: warning
Don't forget to save your configuration before leaving the page.
:::

![Event subscriptions configuration](/img/getting-started/quick-start-my-first-webhook/event-subscription-configuration.png)

You should see that the response of Mockbin is 200! :tada:

## Receive data on Mockbin

Go back to your Bin history, refresh it and let's see how the magic happens!
You are going to be amazed by the first piece of data you just received. Click on details and tada :tada:

![Mockbin test details](/img/getting-started/quick-start-my-first-webhook/mockbin-test-details.png)

Now you can play with the API and update a product to receive the event in your Bin! If you don't know how to run an API call follow this guide: [Your first tutorial](/getting-started/your-first-tutorial-4x/welcome.html).

::: info
If it's not the case :disappointed: don't burst out in tears just yet and let me help you. There are several ways for you to find out what went wrong.  
If you're in a Serenity or Flexibility environment, your server is correctly configured by us. :rocket: So it must be a permission problem!  
If you are on an Enterprise Edition, you may want to take a look at your permissions. To do so, follow check out our [What is an event subscription?](https://help.akeneo.com/pim/serenity/articles/what-is-an-event-subscription.html) page to find out more about the configuration.  
If it's not a permission issue, you may want to make sure your server is able to send data. You can check by using a curl on the Bin URL from your server.    
In the details of your Mockbin Bin, you will find the curl command you need to run!
:::

![Product created details](/img/getting-started/quick-start-my-first-webhook/product-created-details.png)

::: panel-link Let's move on the second step of this tutorial [Create your own Symfony app to display event subscriptions data](/getting-started/quick-start-my-first-webhook/step-2.html)
:::
