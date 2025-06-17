# Quotas and Limitations

To ensure optimal performance and system stability, PX Insights enforces certain technical limitations. Understanding these limits will help you design an effective integration strategy.

## Queue-Based Processing

PX Insights uses an asynchronous queue-based system to process review data. This approach offers significant advantages:

- **No API rate limiting**: Since all requests are pushed to a queue, there are no rate limits on the API endpoints
- **High throughput**: You can send large volumes of reviews without worrying about overwhelming the system
- **Reliable processing**: The queue ensures all reviews are processed, even during peak loads

While there are no artificial rate limits imposed on the API, we recommend following the best practices outlined below for optimal performance.

## Payload Limitations

To maintain system performance, we enforce the following constraints on request payloads:

| Parameter | Limitation | Notes |
|-----------|------------|-------|
| Maximum reviews per request | 100 reviews | For larger batches, split into multiple requests |
| Maximum review text length | 10,000 characters | Longer texts will be truncated |
| Maximum request payload size | 5 MB | Includes all review data and metadata |
| Supported score range | 1-5 | Integer values only |

## Processing Time Expectations

While PX Insights processes reviews asynchronously, you can expect the following processing times under normal conditions:

- **Standard processing**: Reviews are typically processed within 5-10 minutes
- **High-volume periods**: During peak times, processing may take up to 30 minutes

## Troubleshooting Missing Reviews

If your reviews don't appear in the PIM after the expected processing time (30+ minutes), it's likely due to an ID reconciliation failure:

### Common causes:
1. **Missing product identifier**: Ensure you've included at least one product identifier (preferably `sku`) in the `metadata` object
2. **Invalid identifiers**: Verify that the product identifiers in your requests match exactly with those in your PIM
3. **Product not found**: Confirm that the products referenced actually exist in your PIM catalog

### Resolution steps:
1. Check your request payload to ensure the `product_identification` section includes valid metadata
2. Verify that your `origin` field is correctly specified
3. For direct mapping, ensure both `product_type` and either `product_uuid` or `product_model_code` are accurate
4. For metadata-based matching, confirm that your metadata contains identifiers that can be found in your PIM

::: warning
Reviews without successful product reconciliation will not be stored and displayed in the PIM until they can be properly associated with a product.
:::

## Best Practices

To optimize your experience with PX Insights:

1. **Batch sensibly**: While you can send up to 100 reviews per request, consider using smaller batches (20-50) for more predictable processing
2. **Parallel processing**: You can send multiple requests in parallel without concerns about rate limiting
3. **Schedule large imports**: For initial data loads or large migrations, consider scheduling the work during off-peak hours for fastest processing
4. **Review processing status**: For large imports, consider implementing a monitoring mechanism to track overall progress

::: panel-link Let's explore the key platform behaviors! [Next](/px-insights/key-platform-behaviors.html)
:::
