# Capture and replay

A subscription can be suspended by the platform when your destination fails, or by you, for example during a maintenance of your system. While it is suspended, the Event Platform no longer delivers its events. Instead, it automatically **captures** them, with nothing to enable: every event the subscription would have received is kept for a limited time. Once the subscription is resumed, you can ask the platform to **replay** these missed events to your destination.

This page explains what is captured, how long it is kept, and how to replay it.

## What is captured

The platform captures an event when all these conditions are met:

- The subscription is `suspended`, whether the platform suspended it (see the [suspension policy](/event-platform/key-platform-behaviors.html#suspension-policy)) or you suspended it yourself.
- The event is one of the event types the subscription tracks, and it matches the subscription filter, if any. You never get back an event you would not have received while active.
- The subscription was suspended **less than 10 days ago**.

::: warning
The platform does not capture events for `revoked` or `deleted` subscriptions, nor events dropped after the [retry policy](/event-platform/key-platform-behaviors.html#retry-policy-for-transient-failures).
:::

## How long captured events are kept

Capture stops **10 days** after the suspension started, and each captured event is kept **10 days**. To get everything back, resume the subscription and start the replay within 10 days of the suspension.

## Supported subscription types

Replay is available for subscriptions with an **HTTPS** destination only.

## How to replay missed events

Replaying takes three steps: check what is waiting, resume the subscription, then request the replay and follow it.

All the calls below use the same headers as the rest of the [Event Platform API](/event-platform/api-reference.html), and the environment variables set in the [getting started guide](/event-platform/getting-started.html).

### 1. Check what is waiting

The preview tells you how many events a replay would send, without sending anything. It works while the subscription is still suspended, so you can check before resuming it.

```bash [snippet:Shell]
    curl --request GET "https://event.prd.sdk.akeneo.cloud/api/v1/subscribers/$SUBSCRIBER_ID/subscriptions/$SUBSCRIPTION_ID/replays/dry-run" \
--header "X-PIM-URL: $TARGET_PIM_URL" \
--header "X-PIM-TOKEN: $PIM_API_TOKEN" \
--header "X-PIM-CLIENT-ID: $CLIENT_ID"
```

Response example:
```json [snippet:Response]
    {
    "as_of": "2026-09-08T12:00:00Z",
    "replayable_event_count": 42,
    "oldest_available_at": "2026-08-29T12:00:00Z",
    "newest_available_at": "2026-09-08T11:59:00Z",
    "replay_available": false,
    "blocking_reason": "subscription_suspended"
}
```

- `replayable_event_count` is exact at the `as_of` time. It can change right after: new events keep being captured and old ones expire.
- `oldest_available_at` tells you how far back a replay can reach today.
- When `replay_available` is `false`, `blocking_reason` says why:
  - `subscription_suspended`: resume the subscription first.
  - `replay_in_progress`: a replay of this subscription is already running.
  - `daily_quota_consumed`: this subscription already had its replay today. Try again tomorrow (UTC).

### 2. Resume the subscription

A replay can only start on an `active` subscription. Make sure your destination is able to receive events again, then [resume the subscription](/event-platform/api-reference.html).

::: warning
New events are delivered as soon as the subscription is active again, while the replay sends the older ones in the background. Your destination receives both at the same time.
:::

### 3. Request the replay

```bash [snippet:Shell]
    curl --request POST "https://event.prd.sdk.akeneo.cloud/api/v1/subscribers/$SUBSCRIBER_ID/subscriptions/$SUBSCRIPTION_ID/replays" \
--header "X-PIM-URL: $TARGET_PIM_URL" \
--header "X-PIM-TOKEN: $PIM_API_TOKEN" \
--header "X-PIM-CLIENT-ID: $CLIENT_ID"
```

The platform records the replay and answers at once with `202 Accepted`, whatever the number of events:

```json [snippet:Response]
    {
    "replay_id": "01996f2a-7c3e-7d1a-9e4b-2f3c4d5e6f70",
    "status": "pending",
    "requested_at": "2026-09-22T12:00:00Z",
    "selection_cutoff": "2026-09-22T12:00:00Z",
    "status_path": "/api/v1/subscribers/01945f27-3412-76e9-8d46-820f769b2ba3/subscriptions/77777777-7777-7777-7777-777777777777/replays/01996f2a-7c3e-7d1a-9e4b-2f3c4d5e6f70"
}
```

The replay covers the events captured before `selection_cutoff`. If nothing is replayable, the platform answers `200 OK` with `"status": "empty"`, creates no replay and does not use your daily quota.

The request is refused with `409 Conflict` when the subscription is still suspended, when a replay is already pending or running, or when the daily quota is used. The error message says which.

### 4. Follow the replay

Use the `status_path` returned above:

```bash [snippet:Shell]
    curl --request GET "https://event.prd.sdk.akeneo.cloud/api/v1/subscribers/$SUBSCRIBER_ID/subscriptions/$SUBSCRIPTION_ID/replays/$REPLAY_ID" \
--header "X-PIM-URL: $TARGET_PIM_URL" \
--header "X-PIM-TOKEN: $PIM_API_TOKEN" \
--header "X-PIM-CLIENT-ID: $CLIENT_ID"
```

Response example:
```json [snippet:Response]
    {
    "replay_id": "01996f2a-7c3e-7d1a-9e4b-2f3c4d5e6f70",
    "status": "running",
    "requested_at": "2026-09-22T12:00:00Z",
    "selection_cutoff": "2026-09-22T12:00:00Z",
    "last_progress_at": "2026-09-22T12:05:00Z",
    "completed_at": null,
    "claimed_count": 1200,
    "delivered_count": 1150,
    "retry_count": 20,
    "expired_count": 0
}
```

| Field | Description |
| --- | --- |
| `claimed_count` | Events the replay has taken so far |
| `delivered_count` | Events delivered to your destination so far |
| `retry_count` | Delivery attempts that failed and were scheduled again. It only grows: a high value with a low `delivered_count` means your destination keeps rejecting the events |
| `expired_count` | Events that reached the end of their 10-day retention before being delivered. They will not be sent |
| `terminal_reason` | Why the replay did not complete. Only present once it is over |

Poll every few minutes at most: a replay runs at a bounded pace, so its counters do not move faster than that.

## Replay statuses

| Status | Description |
| --- | --- |
| `pending` | The replay is recorded and has not sent any event yet |
| `running` | Events are being sent |
| `completed` | Every event covered by the replay was delivered |
| `partial` | The replay ended, but some events expired or could not be delivered |
| `aborted` | The subscription was suspended while the replay ran |
| `failed` | The replay stopped because of a platform failure |

`completed`, `partial`, `aborted` and `failed` are final. Once the subscription is deleted or revoked, its replays can no longer be read: the status endpoint answers `404 Not Found`.

After an `aborted` replay, the events not sent yet stay available until the end of their retention: resume the subscription and request a new replay.

## How events are replayed

- **Oldest first, at a bounded pace.** Replayed events are sent in the order they were captured, at a pace slower than live delivery. A large backlog can take several hours, or more than a day.
- **Same events, flagged as replayed.** A replayed event is the CloudEvent you would have received, with the same `id` and `time`. It carries two extra CloudEvent extension attributes, so you can tell it from a live event:
  - `replay`: always `true`.
  - `replayedat`: the time the event was replayed, in UTC (for example `2026-09-22T12:05:00.123456789Z`).
- **At least once.** As with live delivery, an event can reach you twice. Deduplicate on the CloudEvent `id`, and do not rely on the order between replayed and live events. See [At least once](/event-platform/key-platform-behaviors.html#at-least-once).
- **Retries until delivered or expired.** If your destination fails or answers `429 Too Many Requests`, the event is retried later, with a growing delay. Unlike live delivery, it is not dropped after three attempts: it is retried until it is delivered or reaches the end of its retention.
- **Suspension stops the replay.** If your destination answers in a way that suspends the subscription (for example a `404 Not Found`), the replay ends as `aborted`. Fix the destination, resume, and request a new replay.

## Quotas

- One pending or running replay per subscription at a time.
- One successfully completed replay per subscription per UTC day. A replay that ends `partial`, `aborted` or `failed` frees the daily slot, so you can request another one the same day.

::: panel-link Let's see how to read the logs! [Next](/event-platform/logs.html)
:::
