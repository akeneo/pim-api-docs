# Deprecation FAQ

::: info 
The Event API will be retired on **December 31, 2026**.
:::

## Why Event API will be retired?

Event API no longer meets evolving needs of our customers:

- Impossibility to scale over 4000 events per hour and 3 event subscribers.
- Only two type of events are proposed. No possibility of choice.
- Akeneo doesn’t guarantee a delivery or retry system of events.
- Event API doesn’t support events related to Product Cloud.

This is why we built [Event Platform](../event-platform/overview.html) to succeed it.

## I have a critical integration with the Event API, what happens now? 

There is no immediate impact.
Until its retirement on December 31, 2026, Akeneo will continue supporting Event API.

We encourage you to start your migration to the new Event Platform as soon as possible to avoid any interruption in your integrations.

We provide you a dedicated [Migration Playbook](https://nowhere.com) to help you do so.

## Can I use both?

Yes, you can use both in parallel to ease your migration process.

Yet, we remind you that, in the end, Event API will be shut down.

## What are the benefits of the new Event Platform?

Event Platform comes with a lot of new benefits to cover previous lacks of Event API

- Much more event (+30 events available today)
- No restriction on number of events, quotas only
- “At least once” delivery guarantee & retry system in place
- Product deltas enable efficient updates

You can find more details [here](../event-platform/overview.html)

## What should I do to migrate to the new Event Platform?

You can follow our dedicated [Migration Playbook](https://nowhere.com) and the new [Event Platform](../event-platform/getting-started.html) documentation.

## I need help with this migration, what are my options?

For any help, you can always contact [Akeneo's Support](https://akeneo.atlassian.net/servicedesk/customer/portal/8)

## What should I do if the new Event Platform doesn’t cover my specific use case?

You can contact your CSM so we can find an appropriate answer to your needs.
