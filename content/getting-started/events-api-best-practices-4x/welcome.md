# Best practices to use the Events API with your connector

This page presents best practices and recommendations you might need while implementing the Events API inside an API based connector.

First, if you need help setting up a connector to use the Events API, look at the [Quick start my first webhook](/getting-started/quick-start-my-first-webhook/welcome.html) guide.

## Configure your server

Setup the server and the domain of your connector to be reachable from Akeneo PIM (Firewall, DNS, …).

You can verify the connectivity with the help of a `Test` button [available on the event subscription configuration page](https://help.akeneo.com/pim/serenity/articles/manage-event-subscription.html#request-url-configuration-verification).

### HTTPS endpoint

Your endpoint should expose a valid HTTPS certificate and use an up-to-date TLS implementation, to make sure the information is transmitted securely.

### Extension side limits

If you're having trouble receiving messages, consider increasing the limit size of the request body of your server:

- [Apache](https://httpd.apache.org/docs/current/mod/core.html#limitrequestbody)
- [Nginx](http://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size)

## Handle API events asynchronously

### Connector scalability

The Events API can send a lot of requests to your connector endpoint. The default value is 4000 requests per hour maximum and each one may contain up to 10 events (see [limits and scalability](/events-documentation/limits-and-scalability.html#limit-of-event-api-requests-per-hour)).

It means that your connector needs to be able to handle up to 40,000 events per hour.

However, each of these events (like `product.updated`) may require additional calls to Akeneo PIM Rest API.

For example, get the product's family's attributes and types or fetch more data for the reference entities and assets attributes.

If you do each of these operations synchronously for the 40,000 events, your connector (and the Akeneo PIM Rest API) won't be able to handle the load.

### Connector response time

At the same time, your connector needs to acknowledge quickly (under 500ms) that a request sent by the Events API has been handled successfully.

So it excludes, even more, processing the events synchronously upon receiving them.

### Recommendations

We recommend you process the API events asynchronously.

It means that you should store the events somewhere (to be processed later) for each Events API request you receive and reply immediately to the Events API with a successful response.

::: tips
A typical solution for this would be to store the events in a database or a [message queue](https://en.wikipedia.org/wiki/Message_queue).
:::

![Connector with Message Queue](/img/getting-started/events-api-best-practices/connector-with-message-queue.png)

It allows you to take the time you need later to process each of the events properly and to optimize the operation in doing so (like fetching the necessary data on the PIM for multiple products at once).

It's also easier for you to have more than one process, consuming those events, and be able to handle them even faster.

## Keep synchronizing your data with the PIM

An important point of the Events API is that you should not rely solely on it to keep your data up-to-date with the PIM.

### Events delivery

Akeneo PIM Events API has no retry mechanism:

- If the connector is unreachable or returns an error to an event request, the PIM will not try to re-send it.

- The Events API comes with a limitation on the number of requests sent per hour (see the paragraph about the [limits of Events API requests](/events-documentation/limits-and-scalability.html#limit-of-event-api-requests-per-hour)).

  If this quota is reached, events transmission will be delayed until the quota is reset.

- In the same way, your connector might be limiting the number of incoming requests (maybe with a _429 Too Many Requests_ status code).

  Unfortunately, the Events API doesn't handle this scenario yet and will keep trying to send you event API requests.

  Keep in mind that events older than 2 hours will be discarded by the Events API.

With all of this in mind, it's easy to see that your connector must still be able to synchronize its data periodically with the PIM (via the Rest API).

## Ignore events that are not relevant

### Events ordering

The Events API doesn't guarantee the delivery of the events in order.

As an example, you may receive two update events on the same product but not in chronological order (the oldest one arriving after the newest). In this case, you should simply ignore the outdated event based on the `updated` date of the product.

## Return correct HTTP response codes

The Events API is logging the status of the response sent by your connector. It can help debug any issue you would encounter with the Events API.

It means that we log a `200 OK` response when we receive a successful request and an error code when it's not. So you may want to answer Events API requests with proper error codes.
