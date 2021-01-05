
# Receiving Events

Your Event API Request URL will receive events matching your subscriptions. The message which delivers these events can contain up to 10 events.

Be careful as some events can be sent in the wrong order, more than once, or get lost altogether. This is why the `event_id` and `event_datetime` are essential.

- The `event_id` allows you to track the events you have already processed. You will not receive events older than **1 hours**, so no need to keep track of them passed that.
- The `event_datetime` allows you to not processing an event if you receive an older event after a newer one.

## Events API Request URLs

Request URL receives an HTTP POST containing data in response to activity.

In the Events API, your Events API Request URL is the target location. Akeneo PIM will deliver all the events, regardless of the event type, to this location

Since your connected application will have only one Request URL, maybe you'll need to do an additional dispatch or routing server-side after receiving event data.

Your Request URL will receive JSON-based payloads containing wrapped event types.


