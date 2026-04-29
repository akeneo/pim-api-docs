# Key platform behaviors

Your subscribing service implementation and architecture must deal with the following capabilities and constraints to consume events from the platform at its best.

## At least once

We're not in a "at most once" paradigm but in a **`at least once`** one. This paradigm involves two things your service must compose with:

- Expect duplicates
- Expect un-ordered events

To help identify duplicated events and deal with un-ordered events if it's something critical for your business, you can rely on both fields  **`id`** and **`time`** from the event, which provide unique identifiers and publication timestamp for each event.

## Optimized throughput

If your subscription has an HTTPS destination, our delivery engine adapts the event delivery rate based on your system's capacity, operating within these limits:

**Maximum rate:** `100` events per second

**Minimum rate:** `1` event per second


The throughput automatically adjusts between these limits based on your endpoint's responses:
- `200 OK`: The delivery rate gradually increases up to the maximum rate
- `429 Too Many Requests`: The delivery rate decreases to prevent system overload

::: warning
Events that are throttled and remain undelivered for more than one hour will negatively impact your success rate, as it indicates a potential queuing risk. This may trigger the [suspension policy](/event-platform/key-platform-behaviors.html#suspension-policy).
:::

Consider using another [subscription type](/event-platform/concepts.html#subscription-types) to get around these limitations.


## Delivery timeout

Specifically for the HTTPS destination type, the delivery timeout ensures that messages are processed within a specified  time frame. Your endpoint is expected to handle requests within **`5 seconds`**.  If processing exceeds this duration, the event will enter the retry process ([see bellow](/event-platform/concepts.html#retry-policy-for-transient-failures)).

Under normal circumstances, your HTTPS endpoint must handle the event as fast as possible.
**Our recommendation** is to put the message in a `queuing system` or in a `database` for asynchronous processing.

## Retry policy for transient failures

Our retry policy helps ensure event delivery during transient failures, allowing for multiple attempts to deliver messages when temporary issues arise. The retry back-off mechanism is managed internally and is not configurable on a per-tenant basis.

If your destination is unable to ingest an event, we will retry deliver as follow:
 - First retry: 5 minutes after the previous attempt.
 - Second retry: 10 minutes after the previous attempt.
 - Third retry: 20 minutes after the previous attempt.

These retries are on a best-effort basis and apply only to transient errors or timeouts. After **three retry attempts**, the message is dropped.
This type of failure may trigger the suspension policy ([see bellow](/event-platform/key-platform-behaviors.html#suspension-policy)).

## Suspension policy

Our system enforces a strict suspension policy to ensure the integrity and reliability of event delivery. We distinguish two types of suspension conditions: criteria-based suspensions and threshold-based suspensions.

### Criteria-Based Suspension:

Your subscription is immediately suspended if you meet one of these conditions:

- Your HTTPS endpoint responds with a `404 Not Found` HTTP status.
- Your HTTPS endpoint responds with `3xx Redirection` HTTP statuses, as we do not support redirections.
- We're not authorized to publish message in your Google Cloud Topic.

### Threshold-Based Suspension:

This type of suspension is based on the success rate of your HTTPS endpoint. If the success rate drops below 90% within the last rolling hour, your subscription will be suspended.

Here are the errors type that decrease the success rate:

- `5XX Server Error` HTTP statuses
- `429 Too Many Requests` HTTP statuses (while the event remains undelivered for more than one hour)
- `4xx Client Error Response` HTTP status
- Delivery timeout

When the platform suspends, revokes, or resumes your subscription, a notification is sent on the channels configured on your subscriber. By default an email is sent to the `technical_email` you provided; you can also opt into a webhook notification on a URL of your choice. See [Notification webhooks](#notification-webhooks) below for the contract.

## Notification webhooks

When `webhook` is in your subscriber's `notification_channels`, the Event Platform sends a `POST` request to your `notification_webhook_url` whenever any of your subscriptions transitions to `suspended`, `revoked`, or `resumed`. The exact event is conveyed in the `notification_type` field of the payload, which is one of `subscription.suspended.system`, `subscription.suspended.user`, `subscription.revoked`, or `subscription.resumed`.

### Configuration

To receive webhook notifications, set the relevant fields on your Subscriber via the [Management API](/event-platform/api-reference.html):

```json [snippet:Subscriber configuration]
{
  "name": "example subscriber",
  "contact": {
    "technical_email": "ops@example.com",
    "notification_channels": ["webhook"],
    "notification_webhook_url": "https://your-app.example.com/akeneo-notifications",
    "notification_webhook_secret": "a-shared-secret-of-16-to-256-chars"
  }
}
```

- `notification_channels` accepts `email`, `webhook`, or both. Defaults to `["email"]` if omitted. Send `[]` in a PATCH request to clear the value and revert to the default.
- `notification_webhook_url` must be HTTPS. The platform does not follow redirects.
- `notification_webhook_secret` must be 16–256 characters. It is never returned in API responses.

### Payload

The request body is JSON with `Content-Type: application/json`:

```json [snippet:Notification payload]
{
  "notification_type": "subscription.suspended.system",
  "timestamp": "2026-04-29T12:34:56Z",
  "subscription_id": "018e1ec5-29da-78ad-aae6-92065b9ca2a6",
  "subscriber_id": "018e1ec5-29da-78ad-aae6-92065b9ca2a5",
  "destination": "https://my-app.example.com/webhook",
  "events": [
    "com.akeneo.pim.v1.product.created",
    "com.akeneo.pim.v1.product.updated"
  ],
  "reason": "Success rate dropped below 90%",
  "subject": "https://example.cloud.akeneo.com/"
}
```

| Field             | Type                | Description                                                                                                                                       |
|-------------------|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `notification_type` | string (enum)     | One of `subscription.suspended.system`, `subscription.suspended.user`, `subscription.revoked`, `subscription.resumed`.                            |
| `timestamp`       | string (RFC3339)    | UTC timestamp set when the platform built the payload.                                                                                             |
| `subscription_id` | string (UUID)       | The Subscription whose status changed.                                                                                                           |
| `subscriber_id`   | string (UUID)       | The Subscriber owning the Subscription.                                                                                                           |
| `destination`     | string              | The Subscription destination (HTTPS URL or Pub/Sub topic identifier).                                                                            |
| `events`          | array of strings    | The event types this Subscription is configured to receive.                                                                                       |
| `reason`          | string (optional)   | Human-readable reason for the status change. Present when applicable.                                                                            |
| `subject`         | string (URI)        | The PIM URL associated with the Subscriber.                                                                                                       |

### Signature verification

Each request is signed with HMAC-SHA256 over the **raw request body**, using the `notification_webhook_secret` registered on the Subscriber. The signature mechanism mirrors the one used for [event delivery](/event-platform/concepts.html#hmac-signature-for-webhook-payloads) — same algorithm, same headers — except notification webhooks use a single secret (no primary/secondary rotation).

The platform sets these headers on every request:

| Header                          | Value                                                                                       |
|---------------------------------|---------------------------------------------------------------------------------------------|
| `X-AKENEO-SIGNATURE-PRIMARY`    | Hex-encoded HMAC-SHA256 of the raw request body, computed with `notification_webhook_secret`. |
| `X-AKENEO-SIGNATURE-ALGORITHM`  | Algorithm identifier — currently always `HmacSHA256`.                                       |
| `Content-Type`                  | `application/json`                                                                           |
| `User-Agent`                    | `akeneo/event-platform`                                                                      |

To verify on your end:

1. Read `X-AKENEO-SIGNATURE-PRIMARY` from the request headers.
2. Recompute HMAC-SHA256 of the **raw request body** using your `notification_webhook_secret`.
3. Hex-encode the result and compare it to the received signature using a constant-time comparison.

```javascript [snippet:Node.js verification]
const crypto = require('crypto');

const secret = process.env.AKENEO_NOTIFICATION_SECRET;
const receivedSignature = req.header('X-AKENEO-SIGNATURE-PRIMARY');

const computedSignature = crypto
  .createHmac('sha256', secret)
  .update(req.rawBody)
  .digest('hex');

const valid = crypto.timingSafeEqual(
  Buffer.from(computedSignature, 'hex'),
  Buffer.from(receivedSignature, 'hex')
);

if (!valid) {
  return res.status(401).end();
}
```

::: warning
Always verify against the **raw request body bytes**, not a re-serialized JSON object. If your framework parses the body before you can access it, configure it to expose the raw body (for example, with `express.json({ verify: (req, _res, buf) => { req.rawBody = buf } })`).
:::

::: info
Use a constant-time string comparison (`crypto.timingSafeEqual` in Node.js, `hash_equals` in PHP, `hmac.compare_digest` in Python) to avoid leaking signature bytes via timing side channels.
:::

### Delivery and fallback

Reply with a `2xx` status within **5 seconds** to acknowledge the notification. Any other response is treated as a delivery failure: the platform retries up to **3 times** with delays of 1s and 2s between attempts. `5xx` and `429` responses are retried within that budget; other `4xx` responses are not. The platform does **not** follow redirects, so `3xx` responses also count as failures.

If all webhook attempts fail and `email` is not in your `notification_channels`, the platform falls back to sending an email notification to your `technical_email` so that critical status changes are never silently lost.

::: panel-link Let's see the API reference! [Next](/event-platform/api-reference.html)
:::
