# Key Platform Behaviors

## Asynchronous Processing

The PX Insights API processes your reviews asynchronously. When you submit reviews to the `/api/v1/reviews/ingest/async` endpoint, they are placed in a queue for processing. This approach offers several benefits:

- **Improved reliability**: Your requests complete quickly without waiting for the entire processing to finish
- **Better scalability**: The system can handle large volumes of reviews without performance degradation
- **Reduced client complexity**: You don't need to implement complex retry logic in your client applications

## Error Handling and Automatic Retries

The PX Insights API automatically handles errors and retries failed operations. When you push your reviews into the system:

1. The API acknowledges receipt of your data immediately
2. If processing errors occur, the system will automatically retry based on intelligent backoff strategies
3. Permanent failures are logged and can be reviewed by administrators

This robust error handling mechanism eliminates the need for you to implement complex retry logic in your integration.

## ID Reconciliation

When processing reviews, PX Insights uses a sophisticated ID reconciliation mechanism to associate reviews with the correct products in your PIM:

1. **Direct product identification**: If you provide `product_uuid` or `product_model_code` and `product_type` in the request, the system will use these for direct mapping
2. **Metadata-based matching**: If direct identifiers are not available, the system will use the `metadata` object (particularly the `sku` field) to locate the corresponding product in your PIM
3. **Flexible mapping**: Additional metadata fields can be used to improve matching accuracy

To ensure successful product matching, always include at least one reliable identifier (preferably the `sku`) in the `metadata` object of your request.


::: panel-link Let's see the API reference! [Next](/px-insights/api-reference.html)
:::
