# Overview

_All the essential things you need to know._

By using the Akeneo Events API, you will receive events on: product creation, product update, and product deletion. 
The feature is working as well on simple products as on product models and variants.

Simple products and product variants have similar event formats, but events related to product models are a bit different that is why we detailed each event type format in our [Events API Reference](../events-reference/events-reference-serenity/product-models.html)

::: info 
For more information, please read our help center article [What is an event subscription?](https://help.akeneo.com/pim/serenity/articles/what-is-an-event-subscription.html) to discover which type of events the Akeneo PIM triggers and in what cases. 
It explains to the Akeneo PIM users how to setup their PIM to use an extension that uses events to synchronize the Akeneo PIM product data with other applications. 
::: 

## The event loop

Many apps built using the Events API will follow the same abstract event-driven sequence:

1. A user (UI or technical) creates a circumstance that triggers an event in Akeneo PIM.
2. Your server receives a JSON payload describing that event.
3. Your server acknowledges receiving the event.
4. Your business logic decides what to do about that event.
5. Your server carries out that decision.

Using the REST API with the Events API empowers your app to do much more than just listen and reply to messages.

::: tips
The volume of events will vary depending on:
- the payload size (that mainly depends on the product values and product associations),
- and the activity on your Akeneo PIM (meaning the number of events that happened into your PIM).

Your Request URL might receive *many* events and requests. Consider decoupling the way you process and react to events.
:::
