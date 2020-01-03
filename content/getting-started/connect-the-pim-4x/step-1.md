# _Step 1_ | Create a connection

In this step, you are going to create what we call a `Connection`. :rocket:

Creating a connection is the primary step that will allow to connect your PIM. So let's see how to do so! You'll see, it's easy as a breeze.

## You said `Connection`?

Well, maybe you are not familiar with what a connection is. Let me help you here.

In a few words, a connection can be considered as a door for the PIM. It allows you to push data into or pull data from the PIM.

Connections are directly declared into the UI of the PIM. To declare a connection, you should follow this simple rule: **One connection corresponds to one specific data flow**.

Alright!

::: info
Want to dig a bit deeper into the connection notion? Visit the dedicated help center [article about it](https://help.akeneo.com/articles/what-is-a-connection.html). :wink:
:::

## Step by step

Remember, as an example, we took an ERP connection for the purpose of this tutorial.  
As a connection corresponds to one specific connection, we will name our connection: `My ERP`.

Follow these steps:
1. Log into your 4.x PIM.  
_Sidenote: This tutorial is dedicated to 4.x PIMs. Here is the one for [older PIM versions](/getting-started/create-a-connector-old)._
1. Click on the `System` menu.
1. Click on the `Connections` submenu.
1. Click on the `Create` button.
![Connection creation button](/img/getting-started/connection-creation-button.png)
1. In the `Label` field, enter `My ERP`.  
_Sidenote: the code of the connection is automatically generated based on the label. You can modify it if you want._
![Connection creation popin](/img/getting-started/connection-creation-erp-popin.png)
1. Choose the flow type of your connection. For this tutorial, pick `Source`.  
_"But why?"_ - you will say. If you remember our use case, our connection is going to request data from the ERP to send it to the PIM. So this connection can be considered as a data "source" for our PIM. :wink:  
![Flow type selection](/img/getting-started/source-flow-type-selection.png)
_Sidenote: Interested in knowing more about this flow type? Read this [help center section](https://help.akeneo.com/articles/manage-your-connections.html#choose-your-flow-type)._

You're done! :tada:  
Your `My ERP` connection is now created. The screen should now display the setting page of your connection, as well as the credentials of the app, that were generated automatically upon creation. Please care about those, you will need them for the last step.

::: panel-link And now, let's dig into the creation of the connector itself [The connector cooking phase](/getting-started/connect-the-pim-4x/step-2.html)
:::
