# Create an app

In this step, you are going to create an app. :rocket:

Creating an app is the primary step that will allow to connect your PIM. So let's see how to do that! You'll see, it's easy as a breeze.

## You said `app`?

Well, maybe you are not familiar with what an app is. Let me help you here.

In a few words, an app can be seen as a door for the PIM. It allows you to push data into or pull data from the PIM. 

Apps are directly declared into the UI of the PIM. To declare an app, you should follow this simple rule: **One app corresponds to one specific data flow**, aka one specific connection.

Alright!

::: info
Want to dig a bit deeper into the app notion? Visit the dedicated help center [article about it](https://help.akeneo.com/articles/what-is-an-app.html). :wink:
:::

## Step by step

Remember, we took as an example, an ERP connection for the purpose of this tutorial.  
As an app corresponds to one specific connection, we will name our app: `My ERP`.

Follow these steps:
1. Log into your 4.x PIM.  
_Sidenote: This tutorial is dedicated to 4.x PIM. Here is the one for [older PIM version](/getting-started/create-a-connector-old)._
1. Click on the `System` menu.
1. Click on the `Apps` submenu.
1. Click on the `Create` button.
![App creation button]()
1. In the `Label` field, enter `My ERP`.  
_Sidenote: the code of the app is automatically generated based on the label. You can modify it if you want._
![App creation popin](/img/getting-started/app-creation-popin-my-erp.png)
1. Choose the flow type of your app. For this tutorial, pick `Source`.  
_"But why?"_ - you will say. If you remember our use case, our connection is going to request data from the ERP to send it to the PIM. So this connection can be considered as a data "source" for our PIM. :wink:  
![Flow type selection](/img/getting-started/source-flow-type-selection.png)
_Sidenote: Interested in knowing more about this flow type? Read this [help center section](https://help.akeneo.com/articles/manage-your-apps.html#choose-your-flow-type)._

You're done! :tada:  
Your `My ERP` app is now created. The screen displays the setting page of your app, as well as the automatically generated credentials of the app. You will need them in the next step.

::: panel-link And now, let's dig into the creation of the connector in itself [The connector coding phase](/getting-started/connect-the-pim-4x/step-2.html)
:::
