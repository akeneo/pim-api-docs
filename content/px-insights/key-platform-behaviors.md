# Key Platform Behaviors

## Asynchronous Processing

The PX Insights API processes your reviews asynchronously. When you submit reviews to the `/api/v1/reviews/ingest/async` endpoint, they are placed in a queue for processing. This approach offers several benefits:

- **Improved reliability**: Your requests complete quickly without waiting for the entire processing to finish
- **Better scalability**: The system can handle large volumes of reviews without performance degradation
- **Reduced client complexity**: You don't need to implement complex retry logic in your client applications

## Error Handling, Retries, and Rate Limiting

The PX Insights API intelligently manages errors, retries, and rate limiting to ensure reliable operation:

### Automatic Error Handling and Retries

When you push your reviews into the system:

1. The API acknowledges receipt of your data immediately
2. If processing errors occur, the system will automatically retry based on intelligent backoff strategies
3. Permanent failures are logged and can be reviewed by administrators

### PIM Rate Limiting Management

PX Insights includes built-in rate limiting management when interacting with your Akeneo PIM:

1. **Automatic throttling**: The system respects the PIM API rate limits and automatically adjusts request frequency
2. **Queue prioritization**: During high-volume operations, requests are intelligently queued and prioritized
3. **Back-pressure handling**: If the PIM API becomes temporarily unavailable or overloaded, PX Insights will automatically reduce throughput and retry operations
4. **Transparent resumption**: Processing continues automatically once rate limits reset without requiring any action from you

These robust mechanisms eliminate the need for you to implement complex retry logic or rate limiting in your integration, ensuring smooth operations even during high-volume processing.

## ID Reconciliation

When processing reviews, PX Insights uses a sophisticated ID reconciliation mechanism to associate reviews with the correct products in your PIM:

1. **Direct product identification**: If you provide `product_uuid` or `product_model_code` and `product_type` in the request, the system will use these for direct mapping
2. **Metadata-based matching**: If direct identifiers are not available, the system will use the `metadata` object (particularly the `sku` field) to locate the corresponding product in your PIM
3. **Flexible mapping**: Additional metadata fields can be used to improve matching accuracy

To ensure successful product matching, always include at least one reliable identifier (preferably the `sku`) in the `metadata` object of your request.


::: panel-link Let's see the API reference! [Next](/px-insights/api-reference.html)
:::
