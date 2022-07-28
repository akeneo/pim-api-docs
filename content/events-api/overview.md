# 👋 Welcome to the Events API basics documentation!

You are probably asking yourself a ton of questions about our Events API, that's why we made this article.

::: warning
The Events API feature is only available since the **5.0 version** and for **SaaS** customers.

Please note that the events API feature is not currently available for **Apps**.
:::

Using the Akeneo Events API, you will receive events on product creation, product update, and product deletion. 
The feature is working as well on simple products as on product models and variants.

Simple products and product variants have similar event formats, but events related to product models are a bit different. That is why we detailed each event type format in our [Events API Reference](../events-reference/events-reference-serenity/products.html)

::: info 
For more information, please read our help center article [What is an event subscription?](https://help.akeneo.com/pim/serenity/articles/what-is-an-event-subscription.html) to discover which type of events Akeneo PIM triggers and in what cases. 
It explains to Akeneo PIM users how to set up their PIM to use an extension that uses events to synchronize Akeneo PIM product data with other applications. 
::: 

## The event loop

Many apps built using the Events API will follow the same abstract event-driven sequence:

1. A user (UI or technical) creates a circumstance that triggers an Akeneo PIM event.
2. Your server receives a JSON payload describing that event.
3. Your server acknowledges receiving the event.
4. Your business logic decides what to do about that event.
5. Your server carries out that decision.

Using the REST API with the Events API empowers your app to do much more than just listen and reply to messages.

Please, note that the volume of events will vary depending on:
- the payload size (that mainly depends on the product values and product associations),
- and the activity on your Akeneo PIM (meaning the number of events that happened on your PIM).

For example, when a user makes product updates on Akeneo PIM, the requests you receive contain one event each because Akeneo PIM sends requests as an event arises.

And when an app bulk edits hundreds of products through the REST API, the requests you receive contain 10 events each to send a maximum of events as soon as possible.

::: tips
Your Request URL might receive *many* event requests.  
Consider decoupling the way you process and react to events.
:::

