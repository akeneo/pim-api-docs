# Concepts

## Subscriber

A subscriber represents the connection to a specific PIM instance and acts as the key reference for managing subscriptions and receiving events. It requires a connection to this PIM, so each subscriber is tied to **a single PIM instance and connection**. In a multi-tenant context—such as when your App is installed on multiple PIM instances—users must create a separate subscriber for each PIM instance to ensure accurate event handling across all instances.


The following properties represent a subscriber:

| Property | Value | Description                                                                     |
| --- | --- |---------------------------------------------------------------------------------|
| `id` | Automatically populated | Identifier of the subscriber inside the Event Platform                   |
| `name` | Populated by the user at creation | Name of the subscriber                                                          |
| `subject` | From `X-PIM-URL` header parameter | URL of the targeted source                                                      |
| `technical_email` | Populated by the user at creation | A contact email will be used to notify you in case of unexpected behaviour       |
| `status` | Automatically populated | The subscriber status                                                           |

The statuses for a subscriber are:

| Status | Description |
| --- | --- |
| `active` | The destination will receive notifications for events tracked by the subscriber |
| `deleted` | The subscriber is inactive and cannot be reactivated |

For comprehensive details on managing subscribers, consult the complete API reference [here](/event-platform/api-reference.html).

## Subscription

A subscription is an enrollment for one or more event types from a specified source to a particular destination. By adding a new subscription, you ensure that you receive notifications whenever a tracked event occurs in your Akeneo system. Each subscription is linked to a single subscriber.

The following properties represent a subscription:

| Property | Value | Description |
| --- | --- | --- |
| `id` | Automatically populated | Identifier of the subscription within the Event Platform |
| `source` | Populated by the user at creation | Source of the event (currently, the only source available is `pim`) |
| `subject` | From `X-PIM-URL` header parameter | URL of the targeted source |
| `type` | Populated by the user at creation | Type of the subscription (currently, there are three available types:  `https`, `pubsub`, and `kafka`) |
| `events` | Populated by the user at creation | A list of events that the subscription is tracking |
| `status` | Automatically populated | The subscription status |
| `config` | Populated by the user at creation | The subscription configuration is based on the subscription type. See below for further details. |

The statuses for a subscription are:

| Status | Description                                                                                                                                                                                                                                                                            |
| --- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `active` | The destination will receive notifications for events monitored by the subscription                                                                                                                                                                                                    |
| `deleted` | The subscription is inactive and cannot be reactivated                                                                                                                                                                                                                                 |
| `suspended` | The subscription can be suspended by the platform due to excessive errors, or manually by the user. However, you can resume it. Suspending a subscription stops all events from being sent to it. Events are not saved and are lost until the subscription is resumed |
| `revoked` | The subscription has been automatically revoked because the connection or the app linked to the subscriber was removed from the PIM                                                                                                                                                    |

## Subscription types

::: info
We will consider adding other subscription destinations based on feedback. Please [fill-in this form](https://forms.gle/XsZ7rovRnqfAn4xF9) to propose & upvote new destination types.
:::


### Pub/Sub subscription

This is the **preferred and most resilient method** for consuming events. It leverages Google Cloud's managed messaging service.

#### Key Advantages

- **Managed Scalability & Reliability:** Google Pub/Sub inherently handles high throughput and traffic bursts, absorbing the complexities of scaling.
- **Reduced Infrastructure Burden:** Significantly lowers the operational overhead and risk for the customer.
- **Simplified Integration:** Easier setup and maintenance compared to managing a custom HTTP endpoint.

#### Configuration

For the `pubsub` subscription type, the `config` property needed when creating the subscription requires both the project ID and the topic ID.

```json[snippet:PubSub subscription]

{
    "source": "pim",
    "subject": "https://my-pim.cloud.akeneo.com",
    "events": [
        "com.akeneo.pim.v1.product.updated"
    ],
    "type": "pubsub",
    "config": {
        "project_id": "your_google_project_id",
        "topic_id": "your_google_pubsub_topic_id"
    }
}
```

#### Allow the Event Platform to publish in your Pub/Sub topic

To use a Pub/Sub subscription, you need to complete a few additional steps to ensure we have permission to publish into your Pub/Sub topic:

- In the Google Cloud console, go to "**Pub/Sub > Topics**"
- Next to the topic you want to use, click "**…**" and then "**View permissions**"
- Click on **ADD PRINCIPAL**
- Past the following service account address into the "**New principals**" text box: `delivery-sa@akecld-prd-sdk-aep-prd.iam.gserviceaccount.com`
- In the Role drop-down list, select "**Pub/Sub**" and "**Pub/Sub Publisher**"
- Click "**Save**"

For some configuration, you might also need our GCP project number : `973566433018`

For comprehensive details on managing subscriptions, consult the complete API reference [here](/event-platform/api-reference.html).

### HTTPS subscription

This option pushes events directly to a HTTP endpoint. It offers flexibility but requires careful infrastructure planning.

#### Critical Requirements & Considerations

- **Strong Infrastructure:** The endpoint must be highly available and designed to handle variable event loads.
    - This also depends on the **source PIM's size and activity**. A small PIM with few SKUs won't generate the same volume as a large instance with many jobs. Thus, the **HTTP endpoint** can be adjusted based on the PIM's intended use.
- **Mandatory Rate Limiting (HTTP 429):**
    - Our platform **dynamically adjusts its delivery rate from 1 to 100 events per second.**
    - This adaptive mechanism **relies entirely on the endpoint correctly returning an `HTTP 429 "Too Many Requests"` status** when its capacity is reached. [ref](https://api.akeneo.com/event-platform/key-platform-behaviors.html#optimized-throughput)

::: warning
Endpoints without proper HTTP 429 handling are at high risk of being overwhelmed, leading to event loss and subscription suspension.
:::

- **Fast Acknowledgement:** Endpoints must respond with an `HTTP 200 OK` within **5 seconds**. Delays trigger retries and can lead to suspension. [ref](https://api.akeneo.com/event-platform/key-platform-behaviors.html#delivery-timeout)
    - **Recommendation:** Implement an asynchronous processing model (e.g., using an internal queue) to acknowledge events quickly and process them separately.
- **Suspension Policy:** Subscriptions may be suspended due to repeated errors (e.g., `4xx`/`5xx` status codes, timeouts, misconfigured SSL). [ref](https://api.akeneo.com/event-platform/key-platform-behaviors.html#suspension-policy)


#### Configuration

For the `https` type, the `config` property requires:

- a URL using the HTTPS protocol;
- an endpoint accessible through public internet, without any form of authentication or redirection.

Additionally, it requires at least a primary secret (with an optional secondary secret) to sign the messages sent to the specified URL.

```json[snippet:Https subscription]

{
  "source": "pim",
  "subject": "https://my-pim.cloud.akeneo.com",
  "events": [
    "com.akeneo.pim.v1.product.updated"
  ],
  "type": "https",
  "config": {
    "url": "https://your_webhook_url",
    "secret": {
      "primary": "your_primary_secret_to_sign_the_payload",
      "secondary": "your_secondary_secret_to_sign_the_payload"
    }
  }
}
```

##### HMAC signature for webhook payloads

HMAC (Hash-based Message Authentication Code) is a method used to verify the integrity and authenticity of a message. Using a secret key shared between the sender and receiver, HMAC ensures that the payload is untampered and originates from a trusted source.

We sign each payload for HTTPS subscriptions using the secret you provided in the configuration.

We include the signature in the payload headers:

- `X-AKENEO-SIGNATURE-PRIMARY`: Contains the signature using the primary secret you provided.
- `X-AKENEO-SIGNATURE-SECONDARY`: Contains the signature using the secondary secret you provided if you have one.
- `X-AKENEO-SIGNATURE-ALGORITHM`: The algorithm we used to sign the payload (currently always `HmacSHA256`).

We generate two signatures for each payload to facilitate secret rotation on your side.

To verify the signature on your end:

1. Receive the payload and extract the signature from the headers.
2. Using the shared secret key, compute the HMAC signature of the received payload using the same algorithm.
3. Compare the computed HMAC signature with the received HMAC signature.

This is the easiest way to ensure the message you receive comes from our platform.

**Example: Verifying an HMAC signature in Node.js**

You can use your programming language of choice to implement HMAC verification. Below is an example in Node.js, which demonstrates how to compute the HMAC signature using the SHA-256 algorithm and compare it with the received signature.

```
const crypto = require('crypto');

const secret = 'your_primary_secret_value';
const receivedSignature = req.header('X-AKENEO-SIGNATURE-PRIMARY');

// Compute the HMAC signature using the request body
const computedSignature = crypto
  .createHmac('sha256', secret)
  .update(JSON.stringify(req.body))
  .digest('hex');

// Compare computed signature with the received one
if (computedSignature !== receivedSignature) {
  // Handle the case where the signature does not match
  return;
}

// If the signatures match, the payload is verified and can be processed ✅
```

##### Webhooks IP Range

If you want to add an additional layer of security, you can whitelist our service’s IP range.

We currently use a static IP address provided by Google Cloud: `34.140.80.128`

**However, we cannot guarantee that this IP address will remain unchanged indefinitely.** Therefore, we strongly recommend whitelisting the `europe-west1` IP ranges from [Google Cloud's IP ranges list](https://www.gstatic.com/ipranges/cloud.json) to ensure continuous access.

### Kafka subscription

This option delivers events to an Apache Kafka topic. It provides high-throughput, fault-tolerant event streaming capabilities for enterprise integrations.

#### Key Advantages

- **High Throughput:** Kafka is designed to handle high-volume event streams with low latency.
- **Durability & Reliability:** Events are persisted to disk and replicated across multiple brokers for fault tolerance.
- **Scalability:** Kafka clusters can be scaled horizontally to handle increasing event volumes.
- **Ordering Guarantees:** Events are delivered in order within each partition.

#### Configuration

For the `kafka` subscription type, the `config` property requires the Kafka cluster connection details and topic information.

```json[snippet:Kafka subscription]

{
    "source": "pim",
    "subject": "https://my-pim.cloud.akeneo.com",
    "events": [
        "com.akeneo.pim.v1.product.updated"
    ],
    "type": "kafka",
    "config": {
        "broker": "kafka-cluster.example.com:9092",
        "topic": "pim-events",
        "sasl_auth": {
            "mechanism": "plain",
            "username": "your_kafka_username",
            "password": "your_kafka_password"
        },
        "tls": {
            "server_name": "kafka.example.com",
            "ca_pem": "-----BEGIN CERTIFICATE-----\nMIIDsjCCApqgAwIBAgIBATANBgkqhkiG9w0BAQsFADBrMQswCQYDVQQGEwJVUzEJ\nMAcGA1UECBMAMRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMQkwBwYDVQQJEwAxCTAH\nBgNVBBETADEQMA4GA1UEChMHVGVzdCBDQTERMA8GA1UEAxMIa2Fma2EtY2EwHhcN\nMjUwOTA0MTQxNDMyWhcNMjYwOTA0MTQxNDMyWjBrMQswCQYDVQQGEwJVUzEJMAcG\nA1UECBMAMRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMQkwBwYDVQQJEwAxCTAHBgNV\nBBETADEQMA4GA1UEChMHVGVzdCBDQTERMA8GA1UEAxMIa2Fma2EtY2EwggEiMA0G\nCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDi2ZwtEbGR/5ERr7bYd5hj/Y49hM1E\nl50TRFW5JwEAPSpysT7dbHDffuYoRGpxTUg2wk2iqNk6t0eKLkhXRKEXW9Pgfnn0\njoyc8SXsEo6wcN30Ie4wuI7lg4ELJTaMgViciIDxpwCagAHakHOo5khWjfIsFeia\nDI1RNvC1fZ+/8r64B7zWnggGbAlP8dSihyNCmXTETPriIY8089I/PIhICJpvOzB9\nWbIr8Po+MJMd9/sf7wHsTKq5IMzAUgUzTIXPuQKnfcIGW+CFFX27In1qMGAICTjl\nGn6hMf0O88xJC6Tydn17WGEYC94aI/DRPLUAeywM5H8vzU8I+M98YV7fAgMBAAGj\nYTBfMA4GA1UdDwEB/wQEAwICpDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUH\nAwIwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU4zUGaDqlNmta3BAc5B0RjN1X\nhhYwDQYJKoZIhvcNAQELBQADggEBAF3HkOcPnIuRH3RNkZ49ye39w/nkATs7RNtu\nY7fBJgAC8x0SMsRIiVC85eAUUB2fFt+QpBw9DYrHkAwAHFRa4+mC0bR9Cx3ngVFk\nwXTMX1ZXwdJkok2oUj6QRXEYjqrXUheMr2EBYc4wKPdZVskBKq5zdK7RGFbGNB7Q\ngQW1UThJuPcjd86IrxlJqKhPNinFHrRQArPbvvEYo77npEA0fwJZSJp42zNn2UEd\nVKrBFc1nBv+OPcAmKmspu04frSmHO1/ug3JPispGWSR8GPD5OWQZQuS3taDfMq8X\nzP2PQ9cWo+xTUk2nUbETVIbP4DjNo6NgHx3bEVQFoTRTxd7aw4I=\n-----END CERTIFICATE-----",
            "client_cert_pem": "-----BEGIN CERTIFICATE-----\nMIIDoTCCAomgAwIBAgIBAjANBgkqhkiG9w0BAQsFADBrMQswCQYDVQQGEwJVUzEJ\nMAcGA1UECBMAMRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMQkwBwYDVQQJEwAxCTAH\nBgNVBBETADEQMA4GA1UEChMHVGVzdCBDQTERMA8GA1UEAxMIa2Fma2EtY2EwHhcN\nMjUwOTA0MTQxNDMyWhcNMjYwOTA0MTQxNDMyWjBzMQswCQYDVQQGEwJVUzEJMAcG\nA1UECBMAMRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMQkwBwYDVQQJEwAxCTAHBgNV\nBBETADEUMBIGA1UEChMLVGVzdCBDbGllbnQxFTATBgNVBAMTDGthZmthLWNsaWVu\ndDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALI3c9jCNZInBaLBvUss\ngfQ3xR3ebo8kX5qeuV/oMwLr1HjP8wriJ2zA+oMEqZyJrCmqlCr3tv+nSK/qUeF8\nAV7k84bEUofkumwa5t3fgd4wXtuU8ZD0iKzXkjcwZFIDuxOWsIMXX586LAtVU/RY\ncoWWLNbyel7xJz4qG+VoJngG4d2xyifUDQ4JCRKgK4Pav1DefAEC8QcaHKI8vxpc\nCKNJPFHq3PHg6KLCizEnklM/q07v6Zo5AsyNuarA1DRTtf9ivMwcUNkESotbjl1e\n7s2tHnnza3HOHQcTXMvmdNSVMnD4xkljMowdzcN3hodFHZfZB94gAG/dY0vf3n9D\n1qUCAwEAAaNIMEYwDgYDVR0PAQH/BAQDAgWgMBMGA1UdJQQMMAoGCCsGAQUFBwMC\nMB8GA1UdIwQYMBaAFOM1Bmg6pTZrWtwQHOQdEYzdV4YWMA0GCSqGSIb3DQEBCwUA\nA4IBAQAVhNIdcD3VrwVB8d6wmVAvemzV9Cv59bBko1t+/NISXryuiZMR1odY9X+r\niocmpZE7BkyFPFqhDch8ITTBjHRZIKw2O48TeAp0j74a7YzAzHMlt59aadLK3AlA\ntb7xc7pAZmk3EM1o7q1W15P1ASS42CAd4RHjSp+sGVU8wzxMQdqIJ8c8+1JEPp5X\nGNBNgBE8QcbTK9v0OBvZ0xfRwbyx3JvJpQxCq3sNEr3hdvrKdc4tapGB1Qo7reN7\nVM0lk/c2drM/vOq/jF+BjEJR18LuFXkxadOjSDDVYNb98PqoOTkudwG+cZDKOk7Y\nVWFW/VUPdZfyZcuUzvN5DOVqvpX+\n-----END CERTIFICATE-----",
            "client_key_pem": "-----BEGIN PRIVATE KEY-----\nMIIEowIBAAKCAQEAsjdz2MI1kicFosG9SyyB9DfFHd5ujyRfmp65X+gzAuvUeM/z\nCuInbMD6gwSpnImsKaqUKve2/6dIr+pR4XwBXuTzhsRSh+S6bBrm3d+B3jBe25Tx\nkPSIrNeSNzBkUgO7E5awgxdfnzosC1VT9FhyhZYs1vJ6XvEnPiob5WgmeAbh3bHK\nJ9QNDgkJEqArg9q/UN58AQLxBxocojy/GlwIo0k8Uerc8eDoosKLMSeSUz+rTu/p\nmjkCzI25qsDUNFO1/2K8zBxQ2QRKi1uOXV7uza0eefNrcc4dBxNcy+Z01JUycPjG\nSWMyjB3Nw3eGh0Udl9kH3iAAb91jS9/ef0PWpQIDAQABAoIBAACVq/yfDnvvQtZ4\n2j0f5UE+2ZeyfhxcGzAvqx4Ebf5pdaX70KlNeqGhtHCvmDraPMVaOOg3LdOC4fsp\nwqEBviNojt/3TuoBNxdZsz4xGIT5FaaUw4IdO0GN533k279lIbz7tpKHhhnIoBJd\nckwP6jhD+NuvqfUbx2wtyS+ketPT+ItRlq1siPRAWmpXgK+HU1xV07Ztt8TtuY3m\n6Od+BTauDh2NkEp79yrHcg1d3g3ryY6VH5QKw98WxoKr0Kmjxd/MiENuNvDO3gJ9\nW+fb4ixRK5wGLMsWpIqKoqLJbN6rbsKK9kUz4wu4YXKExK9hGKH43/TsvIkRrmZY\nG/TnJ/UCgYEA6u6D3k8FMlPcuivcyVozD1EPFhAjAPdUJhVbx8U2rdW8jyH67wrG\n/J2id14wwtjqtJ2AvkYWQcSCwt8itQFmz0cVVRi512e9mb8frNC7FyboEPuLUzEY\niIc42xC4KrkfoAGHJtTc+/FZ2XR7BEnxJC546jYZG7gAEPtP7sqMJmcCgYEAwjLk\nGkTomX5Ftaoim0dotltFOGPcIU0Z7XgVlmhJbQUxPImfJc77YQM0hSn7Emio7xvJ\neIbtRpAz7LzxEsAZiSogFZY9HuwlkWooW+6HOj2UUlKbgxoWd7QIu5Kf0IsGU1uI\nd/dQVgfNR8b9dPdWV2Uy9Dh3djcC3ZiWuOta+xMCgYEAz5SOWfiyW8SzzKADBrq3\nUPpLfTAm7ayb4saOgRZlePXZFRNuOJbqOb1DF3vXU+L8hzh/0B/3fIcZDvzAGvUx\nFUb2t2kQlB7q7ZVtdHI+TXeoJ5FLiudfiQsKFq5QPBe0tNmExK/izo5z2GtOYvy+\noDybxD6mstJC5L5Z42F+slMCgYA00CBGoJzdOYD9wbI9pnLsvO+bQVUZXV2Cvlio\nmd32HyZfv1Gft6WXoYaD/IHCZOIkfNsSwyb+PLNSW6P4JHQNYH5vQHeI1FH3NPaa\n4ci25w5SQRL32X1ounZxhJOf5F8pBkibz49yhhamwZAmYimCBQyRbFXYuWc3GotK\n6P7KLwKBgBol+DJMjqO0GNRbDOAUYKqxgJWVD2GerOSOkYtknUTzfLjfqumMaQrL\nUmdtEvplYiA53B8/+gYJ88x/1g01TWptDQUrye4rHL7FTTUBIY1fEJwQWSVQCCUm\nTyCQjkv2KXoRc+Evda4D8z+S2Xj3pDK/s+oh0/xGzLbbgFkxXCJp\n-----END PRIVATE KEY-----"
        }
    }
}
```

#### Authentication Examples

**Plain Authentication:**
```json
"sasl_auth": {
    "mechanism": "plain",
    "username": "your_kafka_username",
    "password": "your_kafka_password"
}
```

If you need other authentication methods (e.g., SCRAM or OAuth Bearer), please contact [our support team](https://www.akeneo.com/fr/support-help-center/).

#### TLS Configuration (Optional)

For secure connections, you can optionally configure TLS settings in the `config` object:

```json
"tls": {
    "server_name": "kafka.example.com",
    "ca_pem": "-----BEGIN CERTIFICATE-----\nMIIDsjCCApqgAwIBAgIBATANBgkqhkiG9w0BAQsFADBrMQswCQYDVQQGEwJVUzEJ\nMAcGA1UECBMAMRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMQkwBwYDVQQJEwAxCTAH\nBgNVBBETADEQMA4GA1UEChMHVGVzdCBDQTERMA8GA1UEAxMIa2Fma2EtY2EwHhcN\nMjUwOTA0MTQxNDMyWhcNMjYwOTA0MTQxNDMyWjBrMQswCQYDVQQGEwJVUzEJMAcG\nA1UECBMAMRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMQkwBwYDVQQJEwAxCTAHBgNV\nBBETADEQMA4GA1UEChMHVGVzdCBDQTERMA8GA1UEAxMIa2Fma2EtY2EwggEiMA0G\nCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDi2ZwtEbGR/5ERr7bYd5hj/Y49hM1E\nl50TRFW5JwEAPSpysT7dbHDffuYoRGpxTUg2wk2iqNk6t0eKLkhXRKEXW9Pgfnn0\njoyc8SXsEo6wcN30Ie4wuI7lg4ELJTaMgViciIDxpwCagAHakHOo5khWjfIsFeia\nDI1RNvC1fZ+/8r64B7zWnggGbAlP8dSihyNCmXTETPriIY8089I/PIhICJpvOzB9\nWbIr8Po+MJMd9/sf7wHsTKq5IMzAUgUzTIXPuQKnfcIGW+CFFX27In1qMGAICTjl\nGn6hMf0O88xJC6Tydn17WGEYC94aI/DRPLUAeywM5H8vzU8I+M98YV7fAgMBAAGj\nYTBfMA4GA1UdDwEB/wQEAwICpDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUH\nAwIwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU4zUGaDqlNmta3BAc5B0RjN1X\nhhYwDQYJKoZIhvcNAQELBQADggEBAF3HkOcPnIuRH3RNkZ49ye39w/nkATs7RNtu\nY7fBJgAC8x0SMsRIiVC85eAUUB2fFt+QpBw9DYrHkAwAHFRa4+mC0bR9Cx3ngVFk\nwXTMX1ZXwdJkok2oUj6QRXEYjqrXUheMr2EBYc4wKPdZVskBKq5zdK7RGFbGNB7Q\ngQW1UThJuPcjd86IrxlJqKhPNinFHrRQArPbvvEYo77npEA0fwJZSJp42zNn2UEd\nVKrBFc1nBv+OPcAmKmspu04frSmHO1/ug3JPispGWSR8GPD5OWQZQuS3taDfMq8X\nzP2PQ9cWo+xTUk2nUbETVIbP4DjNo6NgHx3bEVQFoTRTxd7aw4I=\n-----END CERTIFICATE-----",
    "client_cert_pem": "-----BEGIN CERTIFICATE-----\nMIIDoTCCAomgAwIBAgIBAjANBgkqhkiG9w0BAQsFADBrMQswCQYDVQQGEwJVUzEJ\nMAcGA1UECBMAMRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMQkwBwYDVQQJEwAxCTAH\nBgNVBBETADEQMA4GA1UEChMHVGVzdCBDQTERMA8GA1UEAxMIa2Fma2EtY2EwHhcN\nMjUwOTA0MTQxNDMyWhcNMjYwOTA0MTQxNDMyWjBzMQswCQYDVQQGEwJVUzEJMAcG\nA1UECBMAMRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMQkwBwYDVQQJEwAxCTAHBgNV\nBBETADEUMBIGA1UEChMLVGVzdCBDbGllbnQxFTATBgNVBAMTDGthZmthLWNsaWVu\ndDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALI3c9jCNZInBaLBvUss\ngfQ3xR3ebo8kX5qeuV/oMwLr1HjP8wriJ2zA+oMEqZyJrCmqlCr3tv+nSK/qUeF8\nAV7k84bEUofkumwa5t3fgd4wXtuU8ZD0iKzXkjcwZFIDuxOWsIMXX586LAtVU/RY\ncoWWLNbyel7xJz4qG+VoJngG4d2xyifUDQ4JCRKgK4Pav1DefAEC8QcaHKI8vxpc\nCKNJPFHq3PHg6KLCizEnklM/q07v6Zo5AsyNuarA1DRTtf9ivMwcUNkESotbjl1e\n7s2tHnnza3HOHQcTXMvmdNSVMnD4xkljMowdzcN3hodFHZfZB94gAG/dY0vf3n9D\n1qUCAwEAAaNIMEYwDgYDVR0PAQH/BAQDAgWgMBMGA1UdJQQMMAoGCCsGAQUFBwMC\nMB8GA1UdIwQYMBaAFOM1Bmg6pTZrWtwQHOQdEYzdV4YWMA0GCSqGSIb3DQEBCwUA\nA4IBAQAVhNIdcD3VrwVB8d6wmVAvemzV9Cv59bBko1t+/NISXryuiZMR1odY9X+r\niocmpZE7BkyFPFqhDch8ITTBjHRZIKw2O48TeAp0j74a7YzAzHMlt59aadLK3AlA\ntb7xc7pAZmk3EM1o7q1W15P1ASS42CAd4RHjSp+sGVU8wzxMQdqIJ8c8+1JEPp5X\nGNBNgBE8QcbTK9v0OBvZ0xfRwbyx3JvJpQxCq3sNEr3hdvrKdc4tapGB1Qo7reN7\nVM0lk/c2drM/vOq/jF+BjEJR18LuFXkxadOjSDDVYNb98PqoOTkudwG+cZDKOk7Y\nVWFW/VUPdZfyZcuUzvN5DOVqvpX+\n-----END CERTIFICATE-----",
    "client_key_pem": "-----BEGIN PRIVATE KEY-----\nMIIEowIBAAKCAQEAsjdz2MI1kicFosG9SyyB9DfFHd5ujyRfmp65X+gzAuvUeM/z\nCuInbMD6gwSpnImsKaqUKve2/6dIr+pR4XwBXuTzhsRSh+S6bBrm3d+B3jBe25Tx\nkPSIrNeSNzBkUgO7E5awgxdfnzosC1VT9FhyhZYs1vJ6XvEnPiob5WgmeAbh3bHK\nJ9QNDgkJEqArg9q/UN58AQLxBxocojy/GlwIo0k8Uerc8eDoosKLMSeSUz+rTu/p\nmjkCzI25qsDUNFO1/2K8zBxQ2QRKi1uOXV7uza0eefNrcc4dBxNcy+Z01JUycPjG\nSWMyjB3Nw3eGh0Udl9kH3iAAb91jS9/ef0PWpQIDAQABAoIBAACVq/yfDnvvQtZ4\n2j0f5UE+2ZeyfhxcGzAvqx4Ebf5pdaX70KlNeqGhtHCvmDraPMVaOOg3LdOC4fsp\nwqEBviNojt/3TuoBNxdZsz4xGIT5FaaUw4IdO0GN533k279lIbz7tpKHhhnIoBJd\nckwP6jhD+NuvqfUbx2wtyS+ketPT+ItRlq1siPRAWmpXgK+HU1xV07Ztt8TtuY3m\n6Od+BTauDh2NkEp79yrHcg1d3g3ryY6VH5QKw98WxoKr0Kmjxd/MiENuNvDO3gJ9\nW+fb4ixRK5wGLMsWpIqKoqLJbN6rbsKK9kUz4wu4YXKExK9hGKH43/TsvIkRrmZY\nG/TnJ/UCgYEA6u6D3k8FMlPcuivcyVozD1EPFhAjAPdUJhVbx8U2rdW8jyH67wrG\n/J2id14wwtjqtJ2AvkYWQcSCwt8itQFmz0cVVRi512e9mb8frNC7FyboEPuLUzEY\niIc42xC4KrkfoAGHJtTc+/FZ2XR7BEnxJC546jYZG7gAEPtP7sqMJmcCgYEAwjLk\nGkTomX5Ftaoim0dotltFOGPcIU0Z7XgVlmhJbQUxPImfJc77YQM0hSn7Emio7xvJ\neIbtRpAz7LzxEsAZiSogFZY9HuwlkWooW+6HOj2UUlKbgxoWd7QIu5Kf0IsGU1uI\nd/dQVgfNR8b9dPdWV2Uy9Dh3djcC3ZiWuOta+xMCgYEAz5SOWfiyW8SzzKADBrq3\nUPpLfTAm7ayb4saOgRZlePXZFRNuOJbqOb1DF3vXU+L8hzh/0B/3fIcZDvzAGvUx\nFUb2t2kQlB7q7ZVtdHI+TXeoJ5FLiudfiQsKFq5QPBe0tNmExK/izo5z2GtOYvy+\noDybxD6mstJC5L5Z42F+slMCgYA00CBGoJzdOYD9wbI9pnLsvO+bQVUZXV2Cvlio\nmd32HyZfv1Gft6WXoYaD/IHCZOIkfNsSwyb+PLNSW6P4JHQNYH5vQHeI1FH3NPaa\n4ci25w5SQRL32X1ounZxhJOf5F8pBkibz49yhhamwZAmYimCBQyRbFXYuWc3GotK\n6P7KLwKBgBol+DJMjqO0GNRbDOAUYKqxgJWVD2GerOSOkYtknUTzfLjfqumMaQrL\nUmdtEvplYiA53B8/+gYJ88x/1g01TWptDQUrye4rHL7FTTUBIY1fEJwQWSVQCCUm\nTyCQjkv2KXoRc+Evda4D8z+S2Xj3pDK/s+oh0/xGzLbbgFkxXCJp\n-----END PRIVATE KEY-----"
}
```

#### TLS Configuration Properties

| Property | Description | Required |
| --- | --- | --- |
| `server_name` | Server name for TLS verification | Yes |
| `ca_pem` | Certificate Authority (CA) certificate in PEM format | Yes |
| `client_cert_pem` | Client certificate in PEM format | Yes |
| `client_key_pem` | Client private key in PEM format | Yes |

#### Required Configuration Properties

| Property | Description | Required |
| --- | --- | --- |
| `broker` | Kafka broker address | Yes |
| `topic` | Name of the Kafka topic where events will be published | Yes |
| `sasl_auth` | SASL authentication configuration object | Yes |
| `tls` | TLS configuration for secure connections | No |

#### SASL Authentication Properties

| Property | Description | Required | Valid Values |
| --- | --- | --- | --- |
| `mechanism` | SASL authentication mechanism | Yes | `plain` |
| `username` | Username for authentication | Yes | String |
| `password` | Password for authentication | Yes | String |

#### Event Delivery Guarantees

- **At-least-once delivery:** Events are guaranteed to be delivered at least once to the Kafka topic.
- **Ordering:** Events are delivered in the order they were generated within each partition.
- **Retry mechanism:** Failed deliveries are automatically retried with exponential backoff.

#### Monitoring and Troubleshooting

- Monitor Kafka consumer lag to ensure your consumers are processing events in a timely manner.
- Set up alerts for failed deliveries and consumer group lag.
- Use Kafka's built-in monitoring tools to track topic health and performance.

## Subscription Filters

When configuring a subscription, you can optionally define a **filter** to receive **only the events that match specific criteria**.

**Regardless of the destination type, we strongly advise to utilize event filters.** This ensures you only subscribe to and receive events that are relevant to your specific integration needs.

You can find the list of currently available filters and the correct syntax to use [here](/event-platform/available-filters.html).

### Example
Let’s say you want to receive only the events triggered by a specific user, identified by the UUID `ea0fe94f-417e-4078-a40b-38645ba90ebe`.
You can configure your subscription with the following filter:

```json[snippet:Filtered subscription]
{
  "source": "pim",
  "subject": "https://my-pim.cloud.akeneo.com",
  "events": [
    "com.akeneo.pim.v1.product.updated"
  ],
  "type": "https",
  "config": {
    "url": "https://your_webhook_url",
  }
  "filter": "user=\"ea0fe94f-417e-4078-a40b-38645ba90ebe\""
}
```

## Events Format

Our platform standardises event data across services using the [CloudEvents specification](https://github.com/cloudevents/spec). CloudEvents provides a consistent structure for event data, ensuring interoperability and simplifying event handling. Each event includes essential metadata such as the event type, source, ID, and timestamp.

The cloud event will be sent in a [structured mode](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md#message), meaning the event data and its metadata are in the payload you'll receive. This apply to every subscription destination type.


Example of an event payload for a productDeleted event

```json[snippet:Event]

{
  "specversion": "1.0",
  "id": "018e197c-dfe2-70f8-9346-1a8e016f5fbb",
  "source": "pim",
  "type": "com.akeneo.pim.v1.product.deleted",
  "subject": "0190fe8a-6213-76ce-8a9f-ba36a5ef555a",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.deleted.schema.json",
  "time": "2024-03-07T15:16:37Z",
  "data": {
    "product": {
      "uuid": "3444ec1b-058e-4208-9b6c-284f47a7aa17"
    }
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "api"
    }
  }
}
```

|         |   |
|----------|-----------------------------------------------|
| `specversion` | The version of the CloudEvent specification used by the event     |
| `id` | The unique identifier of the event |
| `source`            | Identifies the context in which the event happened     |
| `type`         | The event type |
| `subject`         | The `subscriptionID` the event comes from |
| `datacontenttype`         | Content type of `data` value |
| `dataschema`         | Identifies the schema that `data` adheres to |
| `time`         | Timestamp of when the event happened |
| `data`         | The event JSON payload |

For more information, consult the [CloudEvents spec attributes](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md).

::: panel-link Authorization and authentication requirements [Next](/event-platform/authentication-and-authorization.html)
:::
