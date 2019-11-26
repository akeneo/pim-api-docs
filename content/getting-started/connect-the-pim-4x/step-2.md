# Cook your connector

In this step, there are 2 sub-steps.

## Find your connector on our marketplace

We have good news for you. Maybe the connector you have in mind already exists!

Indeed, we have a marketplace on which our dear ecosystem publishes its own tools and connectors.

So, we definitely recommend you to take a look at it and try to find a connector that can suits your use case. It will save you a lot of time!

1. Navigate to the [marketplace](https://marketplace.akeneo.com/search?edition=1) website.  
The results are already filtered to show you the API-based connectors only.
1. Try to find in this list of connectors the one that can fit your use case best.

You find your luck? Great! You can now install your connector and go directly to the [third step of this tutorial](/getting-started/connect-the-pim-4x/step3.html).

Couldn't find any connector that suits you?  
It is the case for our example in this tutorial. We want to connect the PIM to our ERP but the marketplace doesn't provide any connector that covers this use case.  
Alright! So let's build it by ourselves!

## Cook your very own connector

In the case you can't find an already cooked connector on our marketplace, you will have to develop it. Below are the macro steps to go successfully through this development.

1. Have your connection use case in mind.  
In this tutorial, we want to connect to our ERP. Each day, new products are created into my ERP. I want those new products to be sent over to my PIM so that I can enrich them, in the PIM, the day after.
1. Take a closer look to the software you wan to connect to. How can you extract the data you will need? Does it have an API? Does it allows exporting flat files?  
In our example, we took a look at our ERP and discovered that, like many ERPs, it is a bit _old-school_. It only provides exports of products in XML files.
1. Find in our [API reference](api-reference-index.html) the endpoints you will need to achieve such connection.  
For our example, we will need to create and update products in the PIM so we will mainly need this endpoint: [Patch](/api-reference.html#patch_products) on products.
1. Orchestrate your global connector. In most cases, you will need to manually map some PIM information with the data sent or received in the software you want to connect to.  
For our example, here is the global orchestration of our connector. First, we will extract each evening, in an XML file, the list of products that were created/updated during the day. Then, this file is read by our connector. ERP products are transformed into PIM products, by applying a mapping of the ERP information with the right attributes of the PIM. To finish, the connector sends the PIM products by using the [patch](/api-reference.html#patch_products) endpoint of our API.

### Some tips to help you in your connector cooking

#### Start small
The use case we took here is really simple, as you can see. In real life, connections maybe a bit more tricky with a lot of different use cases to handle.

We highly recommend you to **start small**. Focus on one single use case at first. Then, when the first one is robust and approved, add some more.

Don't try to do everything at once, they are high chances you won't see the end of it and your connector won't be usable.

### Use the PHP client

If you are a PHP developer, we highly recommend the use of our PHP client.

It encapsulates a lot of complexity, like dealing with pagination or the authentication. In the end, you will save a lot of time by using it.

If you are not a PHP developer, you can take a look out there and find if our community already provided a client for your favorite language. If not, feel free to contribute. :wink:




