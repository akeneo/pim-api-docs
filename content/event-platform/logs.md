## Logs API Overview

The **Logs** functionality allows you to retrieve a detailed and paginated list of logs from the Event Platform, providing transparency and traceability for events processed within the system. Using the Logs API, you can filter logs based on multiple parameters, such as time range, type of log, or specific identifiers, to easily diagnose issues or audit activity.

### Key Features
- **Pagination Support**: Retrieve logs page by page for efficient handling of large datasets.
- **Customizable Filters**: Narrow down results using filters like date range, log type (e.g., "action" or "error") or subscriber and subscription IDs.
- **Enhanced Traceability**: Each log entry includes metadata to track events and troubleshoot effectively.

### How to Use the Logs API
To see the full list of available query parameters and example requests, refer to the **[Logs API Documentation](https://storage.googleapis.com/akecld-prd-sdk-aep-prd-api-assets/openapi_specification.html#tag/Logs/operation/get_logs)**.

### Understanding Logs

Logs provide detailed insights into system events, which can be categorized as **action** or **error**. Below is a breakdown of the log fields and their purposes.

#### Log Fields Overview

| **Field**           | **Type**    | **Description**                                                                                  | **Example**                                   |
|---------------------|-------------|--------------------------------------------------------------------------------------------------|-----------------------------------------------|
| `log_id`            | String      | Unique identifier for the log. Useful for tracking specific log entries.                         | `f32a1b1a-98df-4d5c-9e93-75e213678b3e`       |
| `log_type`          | String      | Type of the log, indicating whether it is an **action** or an **error**.                         | `error`                                       |
| `timestamp`         | Date-Time   | The time when the log was created, in RFC 3339 format.                                           | `2024-11-15T12:34:56Z`                        |
| `subscriber_id`     | String      | The unique identifier of the subscriber associated with the log.                                 | `aa0f5c91-41ea-4c06-b3a3-af765e2ab07f`       |
| `subscription_id`   | String      | The unique identifier of the subscription linked to the log.                                     | `72c265f6-22ac-401a-ba75-d1b30c4653e5`       |
| `operation`         | String      | Describes the operation or event related to the log (e.g., event delivery failure).              | `failed_to_deliver_event`                     |
| `error_type`        | String      | Indicates the specific type of error, if the log represents an error.                            | `validation_error`                            |
| `error_reason`      | String      | Stable, machine-readable cause of a delivery failure (delivery error logs only). Drawn from a fixed set of values and safe to filter on, unlike the free-text `error_message`. | `connection_refused`                          |
| `error_code`        | Integer     | The error code associated with the error (if present). For HTTPS destinations, this is the HTTP status code returned by your endpoint. For destinations that are not reached over HTTP, such as Pub/Sub, Kafka, and AMQP 1.0, no HTTP exchange takes place and this value is an internal transport code that carries no meaning outside the platform: use `error_reason` to identify the cause. | `400`                                         |
| `error_message`     | String      | A detailed message describing the error, helpful for diagnosing issues.                          | `Invalid request`                             |
| `documentation_url` | String      | Link to the section of this page explaining the cause reported in `error_reason` and what to check. Present on delivery error logs. | `https://api.akeneo.com/event-platform/logs.html#connection_refused` |
| `request`           | Object      | Represents the HTTP request data related to the log, if applicable.                              | `{ "url": "/api/v1/events", "method": "POST" }` |
| `response`          | Object      | Represents the HTTP response data related to the log, if applicable.                             | `{ "status": 500, "body": "Internal Server Error" }` |

### Log Types Explained

The `log_type` field specifies the nature of the log. The two main types are:

#### 1. **Action Logs**
Action logs represent events performed by either the system or the user. These logs indicate successful operations, such as updates, deletions, or other actions.

**Example**:  
A user suspends a subscription.

```json
{
  "log_id":"0193642e-1083-7e37-93c1-04df60e0f5b6",
  "log_type":"action",
  "timestamp":"2024-11-25T16:36:00Z",
  "operation":"subscription_suspended_by_the_user",
  "subscriber_id":"019363c4-6e22-7dd4-a811-6aab07f1d474",
  "subscription_id":"019363c6-139b-7412-a020-75934c917645",
  "request":{
    "body":"",
    "method":"POST",
    "url":"/api/v1/subscribers/019363c4-6e22-7dd4-a811-6aab07f1d474/subscriptions/019363c6-139b-7412-a020-75934c917645/suspend"
  },
  "response":{
    "id":"019363c6-139b-7412-a020-75934c917645",
    "config":{
      "url":"https://my.webhook.com",
      "secret":{
        "primary":"***redacted***",
        "secondary":"***redacted***"
      }
    },
    "events":[
      "com.akeneo.pim.v1.product.deleted",
      "com.akeneo.pim.v1.product.updated"
    ],
    "type":"https",
    "source":"pim",
    "subject":"https://mypim.cloud.akeneo.com",
    "status":"suspended",
    "subscriber_id":"019363c4-6e22-7dd4-a811-6aab07f1d474",
    "created_at":"2024-11-25T14:42:25.819268Z",
    "updated_at":"2024-11-25T16:35:56.766198Z"
  }
}
```

#### 2. **Error Logs**
Error logs indicate failures in processing events or requests. They include additional fields like error_type, error_code, and error_message to help diagnose the issue.

**Example**:
An error occurs when trying to deliver an event, possibly due to a timeout or an issue with the destination service.

```json
{
  "log_id": "019362ca-c547-7364-9274-8d3cf7c3d130",
  "log_type": "error",
  "timestamp": "2024-11-25T10:07:56Z",
  "operation": "failed_to_deliver_event",
  "subscriber_id": "019363c4-6e22-7dd4-a811-6aab07f1d474",
  "subscription_id": "01934a2c-1491-7bea-bced-5176bf92ff3c",
  "error_type": "failed_delivery",
  "error_reason": "destination_timeout",
  "error_code": 500,
  "error_message": "an error was returned when calling the destination, or it took too long to respond",
  "request": {},
  "response": {}
}
```

When filtering or alerting on delivery failures, prefer `error_reason` over `error_code` and `error_message`. The latter two can be generic: a transport failure (timeout, DNS, TLS, connection refused, ...) is reported with a `500` error code and a free-text message, which does not tell the failures apart. `error_reason` is drawn from a fixed set of values, so it is stable and safe to filter on.

This matters even more for destinations that are not reached over HTTP, such as Pub/Sub, Kafka, and AMQP 1.0. No HTTP request is made to those destinations, so `error_code` holds an internal transport code rather than a status returned by your system, and it should not be interpreted as one. Below, a Kafka subscription whose credentials were rejected: the cause is only readable in `error_reason`.

```json
{
  "log_id": "019362ca-c547-7364-9274-8d3cf7c3d130",
  "log_type": "error",
  "timestamp": "2024-11-25T10:07:56Z",
  "operation": "failed_to_deliver_event",
  "subscriber_id": "019363c4-6e22-7dd4-a811-6aab07f1d474",
  "subscription_id": "01934a2c-1491-7bea-bced-5176bf92ff3c",
  "error_type": "failed_delivery",
  "error_reason": "authentication_failed",
  "error_code": 404,
  "error_message": "authentication was rejected by the destination",
  "request": {},
  "response": {}
}
```

### Delivery Failure Causes

Every delivery error log carries an `error_reason` and a `documentation_url` pointing at the matching section below. Each one tells you what the platform observed and what to check on your side.

Unless stated otherwise, the platform retries the delivery: a failure does not mean the event is lost.

#### destination_timeout

Your endpoint accepted the connection but did not answer in time.

Acknowledge the event first and process it asynchronously. An endpoint that does its own work before responding will time out again as soon as your volume grows.

#### dns_lookup_failure

The domain name of your endpoint could not be resolved.

Check that the domain still exists, that it resolves publicly and not only inside your own network, and that a recent DNS change has propagated.

#### invalid_certificate

The TLS certificate presented by your endpoint was rejected.

Check its expiry date and that the intermediate certificates are served alongside it. A certificate valid in a browser can still be rejected here, because browsers carry intermediates that a server-to-server client does not.

#### invalid_tls_handshake

The TLS negotiation failed before any request was sent.

Check the TLS versions and cipher suites your endpoint accepts. This also happens when the address answers in plain HTTP while the subscription is configured in HTTPS.

#### connection_reset

Your endpoint closed the connection while the request was in flight.

Look at what sits in front of your application: a proxy, a load balancer or a firewall dropping connections that exceed a size or duration limit is the usual cause.

#### connection_refused

Nothing accepted the connection on the target port.

Check that your service is running and listening on the port of the configured URL, and that no firewall rejects our calls.

#### network_unreachable

No network route to your endpoint.

Check that the address is reachable from the public internet. An address that only resolves inside a private network cannot be reached.

#### unexpected_eof

Your endpoint closed the connection without answering.

Often the sign of a crash while processing the event, or of a component in front closing idle connections too aggressively.

#### server_goaway

Your endpoint asked to close the HTTP/2 connection while the request was being sent.

Check the connection limits of your HTTP/2 server, in particular the maximum number of requests or the maximum lifetime of a connection.

#### client_closed_connection

The connection was closed before the exchange completed.

Same checks as `unexpected_eof`: stability of your endpoint and the timeouts of whatever sits in front of it.

#### destination_not_found

Your destination reported that the target does not exist, and the subscription was suspended.

For an HTTPS subscription, check that the URL is complete and still routed. For Pub/Sub or Kafka, check that the topic and the project exist. Fix the configuration, then resume the subscription.

#### destination_redirected

Your endpoint answered with a redirection, and the subscription was suspended.

The platform does not follow redirects, because a redirect can silently send your events elsewhere. Configure the final URL directly, then resume the subscription.

#### authentication_failed

Your destination rejected the credentials.

Check the credentials configured on the subscription and whether they were rotated on your side. On Kafka, also check the SASL mechanism.

#### topic_not_found

The target topic does not exist, and the subscription was suspended.

Check the topic name and the project or cluster it belongs to. Create it or fix the configuration, then resume the subscription.

#### invalid_destination_configuration

The destination could not be initialised from the configuration of the subscription.

Check the configuration as a whole: broker address, security settings, and for Kafka the TLS material. This is a configuration problem, not a transient failure.

#### publish_rejected

Your broker refused to accept the message.

Check the quotas, the maximum message size and the write permissions of the account used by the subscription.

#### destination_failure

Your destination answered with an error the platform cannot attribute to a more precise cause. This is the catch-all.

Read `error_code` and `error_message` on the log, and `response` when present, which carries the body your own system returned.

### Notes on Logs
Logs are only available for a rolling window of 30 days. Ensure you retrieve any required log data within this period to avoid losing critical information.


#### Error Log Deduplication

To optimize log management and reduce redundancy, error logs are automatically **deduplicated**. If multiple errors with the same `subscription_id` and `error_message` occur within a **5-minute window**, they are consolidated into a single log entry.

When deduplication occurs:
- The **`timestamp`** of the error log is updated to reflect the latest occurrence within the deduplication window.
- Only one log entry is retained for the batch of identical errors.

**Example:**
If three errors with the same `subscription_id` and `error_message` are generated between 10:00 AM and 10:05 AM, only one log entry will be visible in the system, and its `timestamp` will show the time of the last occurrence (e.g., `10:04:59 AM`).

This mechanism ensures efficient error tracking without overwhelming the system with repetitive entries, while still preserving the traceability of recurring issues.
