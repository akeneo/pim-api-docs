# Key Platform Behaviors

## Asynchronous Processing

The PX Insights API processes reviews asynchronously. When you submit reviews to the `/api/v1/reviews/ingest/async` endpoint, it is placed in a processing queue. This approach offers several benefits:

- **Improved reliability**: Requests return quickly without waiting for review processing to complete.
- **Enhanced scalability**: The system handles large volumes of reviews without performance degradation.
- **Simplified client logic**: You don’t need to implement complex retry or timeout handling in your client application.

## Error Handling, Retries, and Rate Limiting

The PX Insights API intelligently manages errors, retries, and rate limiting to ensure reliable operation:

### Automatic Error Handling and Retries

When reviews are submitted:

1. The API acknowledges receipt of the data immediately.
2. If errors occur during processing, the system retries automatically using intelligent backoff strategies.
3. Permanent failures are logged and made available for review by administrators.

### PIM Rate Limiting Management

PX Insights includes built-in logic to handle rate limits when interacting with your Akeneo PIM:

1. **Automatic throttling**: The system respects your PIM’s API rate limits and adjusts request frequency accordingly.
2. **Queue prioritization**: During high-load periods, requests are queued and prioritized based on system conditions.
3. **Back-pressure handling**: If the PIM API becomes unavailable or overloaded, PX Insights reduces throughput and retries later.
4. **Automatic recovery**: Once rate limits reset or the PIM becomes responsive again, processing resumes automatically — no action required on your side.

These mechanisms ensure stability and performance, even under heavy load, without requiring additional logic in your integration.

## ID Reconciliation

PX Insights uses a flexible and reliable ID reconciliation system to associate each review with the correct product in your PIM.

1. **Direct product identification**: If your request includes `product_type` and either `product_uuid` or `product_model_code`, PX Insights uses these for direct mapping.
2. **Metadata-based matching**: If direct identifiers are missing, PX Insights uses the `metadata` object — typically the `sku` — to find the matching product.
3. **Flexible mapping logic**: Additional metadata fields can be leveraged to improve matching accuracy where needed.

To maximize reconciliation success, always include at least one reliable identifier — preferably the `sku` — in the `metadata` object of your request.

::: panel-link Let's see the API reference! [Next](/px-insights/api-reference.html)
:::
