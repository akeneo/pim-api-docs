# Best practices

## Handling 429 Responses for HTTPS destinations

The platform can send many events in a short time, potentially causing overload and leading to `500` responses from your side. In such cases, event will enter the [retry mecanism](/event-platform/concepts.html##retry-policy-for-transient-failures) and your subscription may be suspended. By implementing a proper `429` response mechanism, you will optimize the event reception flow thanks to our [optimizez throughput](/event-platform/concepts.html#optimized-throughput).

If your 429 responses contains a `Retry-after` header, the platform **will not take it into account**.

## Suspending and Resuming Subscriptions

If you are unable to guarantee a positive response when events are sent (e.g. during infrastructure maintenance) you may decide to **`suspend/resume`** your subscription to avoid it being suspended in accordance with our [suspension policy](/event-platform/concepts.html#suspension-policy).
During the **suspension period**, events in the pipeline and new events generated by the PIM **`can't be recovered`**.
You'll be able to receive new events as soon as you resume the subscription.

## Ignoring Duplicate Events

Due to the scalable and distributed nature of our service, in addition with its ability to provide some retry capability in case of temporary failure, you might receive the same event multiple times. To identify and handle these duplicate events, you can rely on the `id` of the event. This allows you to process each event only once and maintain data integrity.

## Implement Reconciliation Processes

Your app shouldn't rely solely on receiving data from the Event Platform. Because you may not receive events if you suspend your subscription or your server is not able to handle them during the maximum retry period, you should implement reconciliation jobs to periodically fetch data from the PIM.

You could do this in the background or offer reconciliation and syncing options to the user. For example, your app's UI could contain a button that triggers a manual reconciliation process by calling the relevant API endpoint and fetching the requested data.


## Batch your PIM API calls

You must be prepared to ingest events from the event platform with a significant throughput. But you must be gentle on the Akeneo PIM API, and respect the PIM API rate limits.

- Do not call back the Akeneo PIM API synchronously when you receive an event: always store the event and implement a background process to handle data retrieval asynchronously.
- You'll receive a lot of unitary events. Ensure your background process can make batch calls to the PIM API.
    - example: you receive 9 product update events in your PubSub Topic, and your background process pulls 10 messages every second from the PubSub queue. You make 1 API call on the get list of products endpoint instead of 9 unitary calls.

::: panel-link Let's see some integration examples ! [Next](/event-platform/integration-examples.html)
:::