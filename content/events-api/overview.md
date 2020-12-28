# Overview

_All the essential things you need to know._

By using the Akeneo Events API, you will receive events on: product creation, product update, and product deletion. 
The feature is working on simple products and product models and variants. 

::: info 
For more information, please read our help center article [What is the event subscription?](https://help.akeneo.com/pim/serenity/articles/what-is-the-event-subscription.html) to discover which type of events the Akeneo PIM triggers and in what cases. 
It explains to the Akeneo PIM users how to setup their PIM to use an extension that uses events to synchronize the Akeneo PIM product data with other applications. 
::: 

## The event loop

Many apps built using the Events API will follow the same abstract event-driven sequence:

1. A user (UI or technical) creates a circumstance that triggers an event subscription to your application.
2. Your server receives a JSON payload describing that event.
3. Your server acknowledges receiving the event.
4. Your business logic decides what to do about that event.
5. Your server carries out that decision.

Using the REST API with the Events API empowers your app to do much more than just listen and reply to messages.
