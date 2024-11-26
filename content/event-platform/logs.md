## Logs API Overview

The **Logs** functionality allows you to retrieve a detailed and paginated list of logs from the Event Platform, providing transparency and traceability for events processed within the system. Using the Logs API, you can filter logs based on multiple parameters, such as time range, type of log, or specific identifiers, to easily diagnose issues or audit activity.

### Key Features
- **Pagination Support**: Retrieve logs page by page for efficient handling of large datasets.
- **Customizable Filters**: Narrow down results using filters like date range, log type (e.g., "action" or "error") or subscriber and subscription IDs.
- **Enhanced Traceability**: Each log entry includes metadata to track events and troubleshoot effectively.

### How to Use the Logs API
To see the full list of available query parameters and example requests, refer to the **[Logs API Documentation](https://storage.googleapis.com/akecld-prd-sdk-aep-prd-api-assets/openapi_specification.html#tag/Logs/operation/get_logs)**.

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
  "subscriber_id": "",
  "subscription_id": "01934a2c-1491-7bea-bced-5176bf92ff3c",
  "error_type": "failed_delivery",
  "error_code": 500,
  "error_message": "an error was returned when calling the destination, or it took too long to respond",
  "request": {},
  "response": {}
}
```

### Notes on Logs
Logs are only available for a rolling window of 30 days Ensure you retrieve any required log data within this period to avoid losing critical information.


#### Error Log Deduplication

To optimize log management and reduce redundancy, error logs are automatically **deduplicated**. If multiple errors with the same `subscription_id` and `error_message` occur within a **5-minute window**, they are consolidated into a single log entry.

When deduplication occurs:
- The **`timestamp`** of the error log is updated to reflect the latest occurrence within the deduplication window.
- Only one log entry is retained for the batch of identical errors.

**Example:**
If three errors with the same `subscription_id` and `error_message` are generated between 10:00 AM and 10:05 AM, only one log entry will be visible in the system, and its `timestamp` will show the time of the last occurrence (e.g., `10:04:59 AM`).

This mechanism ensures efficient error tracking without overwhelming the system with repetitive entries, while still preserving the traceability of recurring issues.
