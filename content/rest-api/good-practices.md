# Good practices

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

**Use Batch Endpoints**

   Combine multiple requests into a single API call using batch endpoints to minimize the number of calls.

**Implement a Cache Layer**

   Cache frequently accessed data on the client side to reduce repetitive API requests and improve response times.

## Retry strategy

When integrating with any external API, it's important to anticipate and gracefully handle potential issues. While we strive for high availability, there are rare occasions where you might encounter server-side errors or network instability.

The following responses indicate transient problems that are useful to retry:

- HTTP 408, 429, and 5xx response codes.
- Socket timeouts and TCP disconnects.


**Understanding 5xx Errors**

   A 5xx status code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request. These errors are usually transient, meaning they are often resolved quickly without any action required on your part beyond a retry. Building your system to anticipate and gracefully handle these temporary server-side issues is crucial for a resilient integration.

**Good Practices for Retries**

   When faced with a 5xx error, the recommended approach is to implement a retry mechanism. This involves making the same API request again after a short delay. However, simply retrying immediately can exacerbate issues if the server is truly overloaded. Here are some best practices for implementing intelligent retries:

1. **Exponential Backoff with Jitter**

      This is the most critical principle for retries. Instead of retrying after a fixed delay, you should increase the delay exponentially between successive retries. This prevents overwhelming our servers with repeated requests during a period of instability and gives the server time to recover. To avoid a "thundering herd" problem where many clients retry at the exact same moment, introduce a small, random amount of "jitter" to your backoff times.

      How it works:

      Initial Delay: Start with a small delay (e.g., 100ms, 500ms, or 1 second).

      Subsequent Delays: Double or exponentially increase the delay for each subsequent retry. For example: 1s, 2s, 4s, 8s, 16s, etc.

      Jitter: Add a small, random deviation to your calculated delay.

      Example Exponential Backoff with Jitter (Conceptual):
      ```
      retry_delay = initial_delay
      for attempt in range(max_retries):
         try:
            make_api_request()
            break // Success, exit loop
         except (5xx error):
            sleep(retry_delay + random_jitter)
            retry_delay *= backoff_factor // e.g., 2
      ```

2. **Maximum Number of Retries**

   Define a reasonable maximum number of retry attempts. Continuously retrying indefinitely can lead to resource exhaustion on your end and unnecessary load on our servers. Typically, 5 to 8 retries with exponential backoff are sufficient for most transient issues. If the error persists after the maximum retries, it's likely a more significant problem that requires alerting and manual intervention.

3. **Idempotency**

   Ensure that your API requests are idempotent where possible. An idempotent operation is one that can be applied multiple times without changing the result beyond the initial application. For example, creating a new product might not be idempotent (running it twice creates two products), but updating product's data is often idempotent (running it twice results in the same updated product).

   If an operation is idempotent, you don't need to worry about unintended side effects if a retry successfully processes a request that might have been partially processed or stalled on the server during the initial attempt.

4. **Monitoring and Alerting**

   Implement robust monitoring and alerting for API integration failures. If your retry mechanisms are consistently being triggered or if requests are failing even after retries, it indicates a more persistent issue. Alerts will notify your team promptly so they can investigate and take appropriate action.


By following these best practices, you can build a highly resilient integration with our API, ensuring that transient errors do not disrupt your operations and that your system can gracefully handle unforeseen circumstances.