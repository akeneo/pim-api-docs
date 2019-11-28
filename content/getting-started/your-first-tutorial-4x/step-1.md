# Create an app

In this step, you are going to create an app. :rocket:

Creating an app is essential if you want to use the API. So let's see how to do that! You'll see, it's easy as a breeze.

## You said `app`?

Well, maybe you are not familiar with what an app is. Let me help you here.

In a few words, an app can be seen as a door for the PIM. It allows you to push data into or pull data from the PIM. 

Apps are declared directly into the UI of the PIM. To declare an app, you should follow this simple rule: **One app corresponds to one specific data flow.**

Alright!  
_But what's the link with this tutorial, you'll say._  
The goal of this guide is to make your very first request with the API, right? So, by making this API request, you are going to either pull or push data into the PIM. As apps are the entrypoint for this kind of flows, you will need them. Let's create one!

::: info
Want to dig a bit deeper into the app notion? Visit the dedicated help center [article about it](https://help.akeneo.com/articles/what-is-an-app.html). :wink:
:::

## Step by step

For the purpose of this tutorial, we will name your app: `My very first app`.

Follow these steps:
1. Log into your 4.x PIM.  
_Sidenote: This tutorial is dedicated to 4.x PIM. Here is the one for [older PIM version](/getting-started/my-first-tutorial-old)._
1. Click on the `System` menu.
1. Click on the `Apps` submenu.
1. Click on the `Create` button.
![App creation button]()
1. In the `Label` field, enter `My very first app`.  
_Sidenote: the code of the app is automatically generated based on the label._
![App creation popin](/img/getting-started/app-creation-popin.png)
1. Choose the flow type of your app. For this tutorial, pick `Destination` as we are going to make an API request that will retrieve products from your PIM. So your PIM is going to send data to a destination: you. :wink:  
![Flow type selection](/img/getting-started/flow-type-selection.png)
_Sidenote: Interested in knowing more about what is the use of the flow type? Read this [help center section](https://help.akeneo.com/articles/manage-your-apps.html#choose-your-flow-type)._

You're done! :tada:

::: panel-link And now, let's configure the tool that will make the API request [The Postman set up](/getting-started/my-first-tutorial-4x/step-2.html)
:::
