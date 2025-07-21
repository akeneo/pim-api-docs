## Benchmark Your subscription

## Why should you benchmark your subscription?

The purpose of benchmarking is to test whether your destination endpoint can handle the event load from the PIM.  
This allows you to evaluate the performance and reliability of your infrastructure through a controlled stress test, ensuring it is prepared for production use.  
To facilitate this, we offer a dedicated endpoint that initiates a benchmark test, simulating a customizable event load from the PIM.

## How to benchmark your subscription?

### Configure a subscription for benchmark

To begin, follow our standard getting started guide available [here](/event-platform/getting-started.html).
The only difference in the setup process is during the subscription creation step, detailed [here](/event-platform/getting-started.html#4-create-a-subscription). 
You must set the `source` property of your subscription to `benchmark` instead of `pim`.

### Trigger the benchmark

Send a `POST` request to the following endpoint: `https://event.prd.sdk.akeneo.cloud/api/v1/benchmark`.

Here is an example of benchmark call:

```bash [snippet:Shell]
    curl --request POST 'https://event.prd.sdk.akeneo.cloud/api/v1/benchmark' \
--header "X-PIM-URL: $TARGET_PIM_URL" \
--header "X-PIM-TOKEN: $PIM_API_TOKEN" \
--header "X-PIM-CLIENT-ID: $CLIENT_ID" \
--header 'Content-Type: application/json' \
--data-raw '{
  "type": "com.akeneo.benchmark.v1.test",
  "count": 1000,
  "size": "10"
}'
```

#### Body properties

- `type:` The type of benchmark event to launch. Currently, `com.akeneo.benchmark.v1.test` is the only available option.
- `count (optional):` A limit on the number of events to be sent. For example, `50` (default `1000`).
- `size (optional):` The size of the event payload in kb. Max is 10 kb.
- `custom_data (optional):` A field to include custom data in the event payload. This can be used to add additional information relevant to your benchmark test.

::: info
You can find the full request in our [Postman collection](/event-platform/getting-started.html#4-create-a-subscription).  
:::

## Analyzing the results

After the benchmark test is complete, you should carefully analyze the results on your end. 
Look for any processing errors, timeouts, or missing events in your system.
If you encounter issues, it may indicate that your infrastructure is not sufficiently scaled to handle the full production load from the PIM and may require adjustments.
