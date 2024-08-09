# Best practices

## Queuing Events

To maintain performance with a high volume of subscriptions, the event platform requires a response within the specified time limit, please refer to [this page](/akeneo-event-platform/concepts.html#ack-timeout) to know more. Handle received events using a queue or asynchronously to ensure you acknowledge the event quickly, before processing it.

## Handling 429 Responses

The platform can send a large number of events in a short time, potentially causing overload and leading to `500` responses from your side. In such cases, your subscription may be suspended. By implementing a proper `429` response mechanism, you can delay event processing to maintain service stability and avoid suspension.

<!-- TODO rework paragraph after this PR is merged -->
<!-- https://github.com/akeneo/event-platform/pull/144 -->

## Suspending and Resuming Subscriptions During Migration

If you plan to perform a data migration, suspend your subscription to avoid to avoid receiving events [you cannot handle](/akeneo-event-platform/concepts.html#retry-policy). Once the migration is complete, simply resume your subscription to receive new events. Events triggered when your subscription was suspended will not be sent. This ensures a smooth transition and uninterrupted service.

## Ignoring Duplicate Events

In some cases, such as response delays, you might receive the same event multiple times. To identify and handle these duplicate events, check the `X-Correlation-ID` header. This allows you to process each event only once and maintain data integrity.

## Implement Reconciliation Processes

Your app shouldn't rely solely on receiving data from the Akeneo event platform. Because you may not receive event in case you suspend your subscription, or your server is not able to handle the events over the maximum retry, you should implement reconciliation jobs to periodically fetch data from the PIM.

You could do this in the background or offer reconciliation and syncing options to the user. For example, the UI of your app could contain a button that triggers a manual reconciliation process by calling the relevant API endpoint and fetching the requested data.

::: panel-link Let's see some integration examples ! [Next](/akeneo-event-platform/integration-examples.html)
:::