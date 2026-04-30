# Notification webhooks

When a Subscription transitions to `suspended`, `revoked`, or `resumed`, the Event Platform notifies you on the channels configured on your Subscriber. The available channels are `email` (default) and `webhook`. This page describes the webhook channel: when it fires, how to configure it, the payload format, how to verify signatures, and the delivery contract.

When `webhook` is in your subscriber's `notification_channels`, the Event Platform sends a `POST` request to your `notification_webhook_url` whenever any of your subscriptions transitions to `suspended`, `revoked`, or `resumed`. The exact event is conveyed in the `notification_type` field of the payload, which is one of `subscription.suspended.system`, `subscription.suspended.user`, `subscription.revoked`, or `subscription.resumed`.

## Configuration

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

## Payload

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

## Delivery and fallback

Reply with a `2xx` status within **5 seconds** to acknowledge the notification. Any other response is treated as a delivery failure: the platform retries up to **3 times** with delays of 1s and 2s between attempts. `5xx` and `429` responses are retried within that budget; other `4xx` responses are not. The platform does **not** follow redirects, so `3xx` responses also count as failures.

If all webhook attempts fail and `email` is not in your `notification_channels`, the platform falls back to sending an email notification to your `technical_email` so that critical status changes are never silently lost.

::: panel-link Let's see the API reference! [Next](/event-platform/api-reference.html)
:::
