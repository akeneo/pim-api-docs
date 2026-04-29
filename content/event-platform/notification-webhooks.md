# Notification webhooks

When a Subscription transitions to `suspended`, `revoked`, or `resumed`, the Event Platform notifies you on the channels you configured on your Subscriber. The available channels are `email` (default) and `webhook`. This page describes the webhook channel: when it fires, what it sends, and how to verify it.

## When notifications are sent

A POST request is sent to your `notification_webhook_url` whenever any of your Subscriber's Subscriptions transitions to one of the following states:

- `subscription.suspended.system` — the platform suspended the subscription, typically because of repeated delivery errors. See the [suspension policy](/event-platform/key-platform-behaviors.html#suspension-policy).
- `subscription.suspended.user` — you suspended the subscription manually via the API.
- `subscription.revoked` — the connection or app linked to the Subscriber was removed from the PIM, and all its Subscriptions have been revoked.
- `subscription.resumed` — a previously suspended subscription has been resumed.

## Subscriber configuration

To receive webhook notifications, set up your Subscriber with the relevant fields when creating or updating it via the [Management API](/event-platform/api-reference.html):

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

## Payload format

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
| `timestamp`       | string (RFC3339)    | UTC timestamp set when the platform built the payload. Use it to reject stale or replayed requests.                                              |
| `subscription_id` | string (UUID)       | The Subscription whose status changed.                                                                                                           |
| `subscriber_id`   | string (UUID)       | The Subscriber owning the Subscription.                                                                                                           |
| `destination`     | string              | The Subscription destination (HTTPS URL or Pub/Sub topic identifier).                                                                            |
| `events`          | array of strings    | The event types this Subscription is configured to receive.                                                                                       |
| `reason`          | string (optional)   | Human-readable reason for the status change. Present when applicable.                                                                            |
| `subject`         | string (URI)        | The PIM URL associated with the Subscriber.                                                                                                       |

## Signature verification

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

## Replay protection

The `timestamp` field in the body is signed along with the rest of the payload. We recommend rejecting any request whose `timestamp` is older than 5 minutes from your server's clock. This mitigates replay attacks if a signed request body is captured and resent later.

## Retry policy

The Event Platform attempts delivery up to **3 times** with delays of 1s and 2s between attempts. Each attempt has a **5 second** request timeout. The platform does **not** follow HTTP redirects.

Your endpoint should respond as quickly as possible. If you need to do heavy processing, acknowledge the request first and process asynchronously.

## Response handling

Your endpoint signals success or failure through the HTTP status code:

| Status code     | Treatment                                                          |
|-----------------|--------------------------------------------------------------------|
| `2xx`           | Delivery acknowledged. No retry.                                   |
| `3xx`           | Treated as failure. The platform does not follow redirects.        |
| `429`           | Rate-limited. Retried within the attempt budget.                   |
| Other `4xx`     | Permanent client error. No retry.                                  |
| `5xx`           | Transient server error. Retried within the attempt budget.         |

## Email fallback

If all webhook attempts fail and `email` is not in your `notification_channels`, the platform falls back to sending an email notification to your `technical_email` so that critical status changes are never silently lost.

::: panel-link Let's see the API reference! [Next](/event-platform/api-reference.html)
:::
