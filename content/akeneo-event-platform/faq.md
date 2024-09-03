# FAQ
### What are the limits of subscriptions & subscribers?

The **only** Event Platform limits are: 

- Up to 20 subscribers per PIM instance
- Up to 20 subscriptions per subscriber
- No limit on the type of events 

### Is the order of events guaranteed?
TODO duplicates and contradictory

Yes and no. From a sequence perspective, yes, but if there's an issue with your destination and the event doesn't go through on the first attempt but only after a retry, then no, we can't guarantee the sequence. 

Our event platform is reliable and resilient. However, we cannot guarantee this for the destination you may configure.
Consequently, and especially in the case of a retired event, you should check the ID and the time of publication of the event to process it properly.

### What are the subscription destinations proposed for the Event Platform? Can I request another one?

Subscription destinations:

- HTTPS - generic
- Google Cloud Pub Sub

We will add other subscription channels based on feedback.

TODO add a link to a google form to automatically gather this feedback with preconfigured list of destination we envision

### What does it mean that we guarantee at least once delivery?

One of the core principles of the Event Platform is the concept of delivering at least once. This approach ensures that events **are always delivered** following our [Retry policy](/akeneo-event-platform/concepts.html#retry-policies) . 

Working under the assumption of at least once delivery, especially within the context of an event-driven architecture, is a responsible approach to reliably processing events, and this is what we want to provide to our customers and partners. 

**Why "At-Least Once" Delivery?**

TODO duplicates
An event may be sent multiple times in the "at least once" delivery model. This can happen if the event platform doesn't receive a confirmation of successful receipt from the destination (such as an HTTP 200 status or a Pub/Sub acknowledgement). For instance, we send a message that is received and processed by the destination, but if the event platform does not get the acknowledgement, it will retry sending the message to ensure delivery.

### What happens if my app or connection is removed from the PIM?

Your subscriber and all linked subscriptions are removed (revoked). You will be notified by email. 

### Can we pause the event reception when our target destination is under maintenance or unavailable?

Yes, you can call the API to suspend your subscription and stop receiving messages. [More details](/akeneo-event-platform/best-practices.html#suspending-and-resuming-subscriptions-during-migration)

### Does Event Platform come with the user interface or dashboards?

No, the Event Platform is currently a technical-first product and does not include specific interfaces.

This may evolve based on feedback.


TODO "Latency ?"
TODO "Region from where events are sent"
