# _Step 1_ | Create a Connection

In this step, you are going to create what we call a `Connection`. :rocket:

Creating a connection is essential if you want to use the API. So let's see how to do that! You'll see, it's easy as a breeze.

## You said `Connection`?

Well, maybe you are not familiar with what a connection is. Let me help you here.

In a few words, a connection can be seen as a door for the PIM. It allows you to push data into or pull data from the PIM. 

Connections are declared directly into the UI of the PIM. To declare a connection, you should follow this simple rule: **One connection corresponds to one specific data flow.**

Alright!  
_But what's the link with this tutorial, you'll say._  
The goal of this guide is to make your very first request with the API, right? So, by making this API request, you are going to either pull or push data into the PIM. As connections are the entrypoint for this kind of flows, you will need them. Let's create one!

::: info
Want to dig a bit deeper into the connection notion? Visit the dedicated help center [article about it](https://help.akeneo.com/articles/what-is-a-connection.html). :wink:
:::

## Step by step

For the purpose of this tutorial, we will name your connection: `My very first connection`.

Follow these steps:
1. Log into your 4.x PIM.  
_Sidenote: This tutorial is dedicated to 4.x PIM. Here is the one for [older PIM version](/getting-started/your-first-tutorial-old)._
1. Click on the `System` menu.
1. Click on the `Connections` submenu.
1. Click on the `Create` button.
![Connection creation button](/img/getting-started/connection-creation-button.png)
1. In the `Label` field, enter `My very first connection`.  
_Sidenote: the code of the connection is automatically generated based on the label._
![Connection creation popin](/img/getting-started/connection-creation-popin.png)
1. Choose the flow type of your connection. For this tutorial, pick `Destination` as we are going to make an API request that will retrieve products from your PIM. So your PIM is going to send data to a destination: you. :wink:  
![Flow type selection](/img/getting-started/flow-type-selection.png)
_Sidenote: Interested in knowing more about what is the use of the flow type? Read this [help center section](https://help.akeneo.com/articles/manage-your-connections.html#choose-your-flow-type)._

You're done! :tada:  
Your connection is now created. The screen displays the setting page of your connection, as well as the automatically generated credentials of the connection. You will need them in the next step.

::: panel-link And now, let's configure the tool that will make the API request [The Postman set up](/getting-started/your-first-tutorial-4x/step-2.html)
:::
