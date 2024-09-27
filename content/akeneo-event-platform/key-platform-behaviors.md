
# Key platform behaviors

Your subscribing service implementation and architecture must deal with the following capabilities and constraints to consume events from the platform at its best.

## At least once

We're not in a "at most once" paradigm but in a **`at least once`** one. This paradigm involves two things your service must compose with:

- Expect duplicates
- Expect un-ordered events

To help identify duplicated events and deal with un-ordered events if it's something critical for your business, you can rely on both fields  **`id`** and **`time`** from the event, which provide unique identifiers and publication timestamp for each event.

## Optimized throughput

Our delivery engine will try to deliver events as fast as possible but will adapt the throughput within the limits described in this section.

If your subscription has an HTTPS destination, please respond with `429 Too Many Requests` when your system is overloaded: this way, the delivery engine will slow down, retry undelivered events, and gradually increase the throughput when your system gets back to recovers (i.e., when it responds `200 OK` again).

Please note that if the throughput drops too significantly, the suspension policy will be triggered ([see bellow](/akeneo-event-platform/concepts.html#suspension-policy.html)).

## Delivery timeout

Specifically for the HTTPS destination type, the delivery timeout ensures that messages are processed within a specified  time frame. Your endpoint is expected to handle requests within **`3 seconds`**.  If processing exceeds this duration, the event will enter the retry process ([see bellow](/akeneo-event-platform/concepts.html#retry-policy-for-transient-failures.html)).

Under normal circumstances, your HTTPS endpoint must handle the event as fast as possible.
**Our recommendation** is to put the message in a `queuing system` or in a `database` for asynchronous processing.

## Retry policy for transient failures

Our retry policy helps ensure event delivery during transient failures, allowing for multiple attempts to deliver messages when temporary issues arise. The retry back-off mechanism is managed internally and is not configurable on a per-tenant basis.

If your destination is unable to ingest an event, we will retry deliver as follow:
 - First retry: 5 minutes after the previous attempt.
 - Second retry: 10 minutes after the previous attempt.
 - Third retry: 20 minutes after the previous attempt.

These retries are on a best-effort basis and apply only to transient errors or timeouts. After **three retry attempts**, the message is dropped.
This type of failure may trigger the suspension policy ([see bellow](/akeneo-event-platform/concepts.html#suspension-policy.html)).

## Suspension policy

Our system enforces a strict suspension policy to ensure the integrity and reliability of event delivery. We distinguish two types of suspension conditions: criteria-based suspensions and threshold-based suspensions.

### Criteria-Based Suspension:

Your subscription is immediately suspended if you meet one of these conditions:

- Your HTTPS endpoint responds with a `404 Not Found` HTTP status.
- Your HTTPS endpoint responds with `3xx Redirection` HTTP statuses, as we do not support redirections.
- We're not authorized to publish message in your Google Cloud Topic.

### Threshold-Based Suspension:

This type of suspension is based on the success rate of your HTTPS endpoint. If the success rate drops below 95% within the last rolling hour, your subscription will be suspended.

Here are the errors type that decrease the success rate:

- `5XX Server Error` HTTP statuses
- `429 Too Many Requests` HTTP statuses (while the minimum rate threshold is exceeded)
- `4xx Client Error Response` HTTP status

When the platform suspends your subscription, a notification will be sent to the technical email address you provided, along with contextual information about the suspension.

::: panel-link Let's see the API reference! [Next](/akeneo-event-platform/api-reference.html)
:::