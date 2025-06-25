# Limitations

Our API facilitates the integration of Akeneo PIM with external systems.
To maintain optimal user experience and platform stability, our platform employs various protection mechanisms to prevent over-usage.

To guarantee fair usage, please adhere to the following usage guidelines:

## Maximum Concurrent API Calls

- Per PIM Connection: Up to 4 concurrent API calls are allowed for each individual PIM connection.
- Per PIM Instance: Up to 10 concurrent API calls are allowed across the entire PIM instance.


## Rate Limits Within a Specific Amount of Time

- General API Requests: up to 100 API requests per second per PIM instance.
- [updating & creating attribute options](https://api.akeneo.com/api-reference.html#patch_attributes__attribute_code__options):  up to 3 API requests per second per PIM instance.


## Handling Over-Usage

If your API usage exceeds these limits, the platform’s protection mechanisms may be triggered, resulting in blocked requests and  HTTP status code 429 responses.
As a REST API consumer, you have to keep in mind that your integration with Akeneo PIM should anticipate this throttling and should be able to handle failures.

Bursts are allowed, but continuous over-usage will trigger the protection sooner.

To effectively manage and mitigate over-usage, we recommend implementing the following strategies:

**Check for "Retry-After"**

   If the HTTP 429 response includes a "Retry-After" header, wait the specified number of seconds before retrying.

**Implement Exponential Backoff**

   Use increasing delays between retry attempts (e.g., 10s, 30s, 60s) to reduce the load on the API.

**Use Batch Endpoints**

   Combine multiple requests into a single API call using batch endpoints to minimize the number of calls.

**Implement a Cache Layer**

   Cache frequently accessed data on the client side to reduce repetitive API requests and improve response times.
   