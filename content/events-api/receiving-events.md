# Receiving Events

Your Event API Request URL will receive events matching your subscriptions. An event could be delivered with a dedicated message or in a message that gathers several events. 

Be careful as some events can be sent in the wrong order, more than one time or get lost altogether.

This is why the `event_id` and `event_date` are important:

- The `event_id` allows you to track the events you have already processed. You will not receive events older than **1 hour**, so no need to keep track of them past that.
- The `event_date` allows you to not processing an event if you receive an older event after a newer one.

## Events API Request URLs

Request URL receives an HTTP POST containing data in response to activity.

In the Events API, your Events API Request URL is the target location where all the events your connection is subscribed to will be delivered, regardless of the event type.

Since your connected application will have only one Request URL, maybe you'll need to do an additional dispatch or routing server-side after receiving event data.

Your Request URL will receive JSON-based payloads containing wrapped event types.

## Performance considerations

The volume of events will vary depending on:

- the events you subscribe to,
- the size,
- and the activity on your Akeneo PIM.

Your Request URL might receive *many* events and requests. Consider decoupling the way you process and react to events.
