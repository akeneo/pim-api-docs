# _Step 2_ | Cook your connector

In this step, there are 2 sub-steps.

## Find your connector on our marketplace

We have good news for you. Maybe the connector you have in mind already exists!

Indeed, we have a marketplace on which our dear ecosystem publishes its own tools and connectors.

So, we definitely recommend you to take a look at it and try to find a connector that can suit your use case. It will save you a lot of time!

1. Navigate to the [marketplace](https://marketplace.akeneo.com/extensions/add-ons?edition=all&version=all&api_use=1&sort=date) website.  
The results are already filtered to show you the API-based connectors only.
1. In this list of connectors, try to find the one that can fit your use case best.

You found what you were looking for? Great! You can now install your connector and go directly to the [third step of this tutorial](/getting-started/connect-the-pim-4x/step-3.html).

Couldn't find any connector that suits you?  
It is the case for our example in this tutorial. We want to connect the PIM to our ERP but the marketplace doesn't provide any connector that covers this use case.  
Alright! So let's build it ourselves!

## Build your very own connector

In the case you can't find an already cooked connector on our marketplace, you will have to develop it. 

Below are the macro steps to successfully go through this development.
1. Have your connection use case in mind
2. Find out what are the third-party connection possibilities
3. Choose your integration frequency
4. Explore our API reference
5. Think about your architecture
6. Orchestrate your global connector

Those steps are detailed below, illustrated by our tutotrial example.

### 1- Have your connection use case in mind

We know it can seem a bit obvious but it really is the first step for a successful connection between the PIM and your third-party. You need to have at least the global scenario of your connection in mind.

#### In this tutorial
_You want to connect your ERP. Each day, new products are created in your ERP. You want those new products to be sent over to the PIM so that you can enrich them, in the PIM, the day after._

### 2- Find out what are the third-party connection possibilities

Take a closer look at the software you want to connect to. How can you extract the data you will need? Does it have an API? Does it allow exporting flat files?  

#### In this tutorial
_In our example, let's say that you took a look at your ERP and discovered that, like many ERPs, it is a bit old-school. It only provides exports of products in XML files._

### 3- Choose your integration frequency
Define at which frequency you want your connector to integrate data into the PIM or retrieve it, if it is a destination. You need to choose this frequency carefully as it can have an impact on the PIM load.

#### In this tutorial
_In our example, as stated above, we know that every day, new products are created in the ERP. So we define that our connector will integrate new products, once a day at midnight, outside working hours, to lower as much as possible the PIM load._

### 4- Explore our API reference
In this step, you will need to find in our [API reference](api-reference-index.html) the endpoints you will need to achieve such connection. 

#### In this tutorial
_For our example, you will need to create and update products in the PIM so we will mainly need this endpoint: [Patch](/api-reference.html#patch_products) on products._

### 5- Think about your architecture
Choose the architecture you want for your connector. Indeed, you will have two options here:
    - You have access to the third-party code source and can develop your connector directly in it.
    - You can otherwise create a middleware that will sit right in the middle of the third-party you want to connect, and the PIM.

#### In this tutorial
_For our example, we choose the second option as little chances are that your ERP accepts external development into its base code. Here, you will have to develop your connector as a middleware._

### 6- Orchestrate your global connector

A crucial step. In most cases, you will need to manually map some PIM information with the data sent or received in the software you want to connect.

#### In this tutorial
_For our example, here is the global orchestration of our connector. First, every evening, you will extract the list of products that were created/updated during the day, in an XML file. Then, this file is read by your connector. ERP products are transformed into PIM products, by applying a mapping of the ERP information with the right attributes of the PIM. To finish, the connector sends the PIM products by using the [patch](/api-reference.html#patch_products) endpoint of our API._

## Some pro tips

As we want you to build the best connector ever, here are some tips to help you cook it the right way.

### Start small
The use case we took here is really simple, as you can see. In real life, connections may be a bit more tricky with a lot of different use cases to handle.

We highly recommend you to **start small**. Focus on one single use case at first. Then, when the first one is robust and approved, add some more.

Don't try to do everything at once, they are high chances you won't see the end of it and your connector won't be usable.

### UI or not UI?

Some connectors also require the developement of a UI. For example, it can be very useful in the case you want your final users to be able to input some configuration. Indeed, in some cases, you may want to ask them for product, channel or locale selections.

Another option is to provide a configuration file to input this configuration. It's usually faster to develop but keep in mind that you will be far from delivering the best UX for your final users. :wink:

### Think scalability and performance

It is really important that you take into consideration the scalability and performance of your connector.

As stated previously, again, we advise you to start small. Benchmark your connector with a small volume, then test it with a real-life catalog volume.

To help you in this task, here are examples of questions you can ask yourself:
- _"How many products, assets, reference entities or options your connector will handle?"_
- _"How big are your products, assets or reference entities in terms of number of attributes completed?"_

Also, don't forget to think about the fact that every API call you are doing has an impact on the **PIM load**. Always keep in mind that your connector won't be the only one connected to the PIM. Try to have a load print as low as possible. To do so, you can use caches for example.

### Test, test and test

Testing should not be optional. You will need to test your full use case and also focus on all the edge cases that can happen.

### Use the PHP client

If you want to use PHP to build your connector, we highly recommend the use of our PHP client.

It encapsulates a lot of complexity, like dealing with pagination or the authentication. In the end, you will save a lot of time by using it.

If you are not a PHP developer, you can take a look out there and find if our community already provided a client for your favorite language. If not, feel free to contribute. :wink:

::: panel-link Now that you created your connector, let's move on to [The PIM connection binding phase](/getting-started/connect-the-pim-4x/step-3.html)
:::
