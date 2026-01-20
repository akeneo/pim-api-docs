# FAQ
### What is the difference between the old Event API and the new Event Platform? 
The old Event API has significant scalability, reliability, and functionality limitations, making it unsuitable for modern, large-scale integrations. On the other hand, the new Event Platform is designed with a technical-first approach, offering broader event coverage, higher capacity, and the flexibility needed for seamless integrations. This comparison table illustrates the major differences between the two, demonstrating how the new Event Platform is a better choice for developers and businesses alike.

| **Feature**                      | **Old Event API**                                     | **New Event Platform**                               |
|----------------------------------|-------------------------------------------------------|------------------------------------------------------|
| **Event Coverage**               | Limited to product and product models                 | [Wide range of events](/event-platform/available-events.html) beyond just product and product models |
| **Capacity**                     | 4,000 events per hour with a maximum of 3 subscribers | Unlimited events subject to quotas only, handles larger volumes |
| **Payload**                      | Full product imprint without details on changes                                         | Lightweight payload, providing only the identifier of the updated entity (delta payload is a part of the roadmap) |
| **Performance**                  | Limited by low capacity and full payloads             | Optimized for high volume of events and fastest throughput  |
| **Interface & Dashboard**        | Includes a usage dashboard                            | API-first product with no interface or dashboard |
| **Reliability & Scalability**    | Limited reliability, prone to bottlenecks             | Designed for high reliability and scalability with attached retry mechanism in place       |
| **Usage Context**                | Suitable for small-scale integrations                 | Ideal for large-scale, real-time integrations        |
| **Integration Approach**         | Standalone notifications                              | Intended for use with GraphQL outbound for seamless integration |



### Are the events sent in order ?

Yes and no. From a sequence perspective, yes, an event emitted by the PIM is likely to be sent to your destination in the same order but nothing is done internally to guarantee it. 

If there's an issue with your destination and the event doesn't go through on the first attempt but only after a retry, then you'll face un-ordered events for sure.

Consequently, and especially in the case of a retried event, you should check the ID and the time of publication of the event to process it properly.

### Why am I not receiving events immediately after creating or updating a subscription?

When you create or update a subscription, there is a synchronization delay of several minutes before it becomes fully active. This delay is due to the propagation time between the subscription management service and the event delivery service. We recommend waiting a few minutes after subscription creation or modification before expecting to receive events.

### What are the subscription destinations proposed? Can I request another one?

Subscription destinations:

- HTTPS - generic, can be considered as a Webhook feature
- Google Cloud Pub Sub

We will consider adding other subscription destinations based on feedback. Please [fill-in this form](https://forms.gle/XsZ7rovRnqfAn4xF9) to propose & upvote new destination types.

### What happens if my app or connection is removed from the PIM?

Your subscriber and all linked subscriptions are instantaneously revoked resulting in the following impacts:
- You'll no longer be able to be authenticated to the Event Platform Management API
- Your configured subscription destination will no longer receive events from this PIM
- You will be notified of this action on the contact email associated with the subscriber

### Can we pause the event reception when our target destination is under maintenance or unavailable?

Yes, you can call the management API to suspend your subscription and stop receiving messages. [More details](/event-platform/best-practices.html#suspending-and-resuming-subscriptions-during-migration)

### Does Event Platform come with an user interface or dashboards?

No, the Event Platform is currently a technical-first product and does not include specific interfaces.

This may evolve based on feedback.

### I configured an HTTPS destination endpoint hosted in US, should I expect any latency ?

Our platform will send events from EU region.
According to our cloud provider, latency from EU to US through public internet is below 100ms.

### Can I retrieve past events ?

The platform streams and distribute events, and offer a retry mecanism in case of temporary failures.

The platform do not offer a way to query past events, we do not store any event data.

### Should I expect a throttle on the number of events sent by the platform like in the existing Akeneo Event API ?

Akeneo's Event API have some core limitations such as a `4.000 event/hour` limit.

Event Platform is a new platform with distinct functionalities and should not be considered as the next version of [Akeneo's Event API](https://api.akeneo.com/events-documentation/overview.html). 

The new platform offers more granular event handling compared to the Event API, every events will be tried to be delivered and retried in case of failure.

### My subscription is repeatedly suspended, I resume it all the time and I loose events, why ?

According to our delivery timeout strict policy, we want your subscribing service to acknowledge the reception of the event as fast as it can in order for our platform to deliver events continuously.

Resuming suspended subscription several times indicates than you might change the way you deals with event consumption.

If at some point we see that you resumed a suspended subscription too frequently, we reserve the right to revoke or delete it.
