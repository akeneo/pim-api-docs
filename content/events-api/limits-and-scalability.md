# Limits and Scalability

## PIM side limits

To not degrade the performance of the PIM certain limitations can be configured.

### Number of event subscriptions

By default, you can only subscribe to `3` events. To change this behavior update the value of the parameter `webhook_active_event_subscriptions_limit` in the `config/services/pim_parameters.yml` file.

### Limit of event API requests per hour

By default the amount of event API requests per hour is `4000`, to change this behavior update the value of the parameter `webhook_requests_limit` in `config/services/pim_parameters.yml` file

### Event API Batch size

By default, each event API request contains `10` events. To change this behavior update the value of the parameter `webhook_max_bulk_size` in the `config/services/pim_parameters.yml` file.

### Request timeout

By default, each event API request has a timeout of `0.5` seconds. To change this behavior update the value of the parameter `webhook_timeout` in the `config/services/pim_parameters.yml` file.

### Pubsub message retention duration

By default, Pubsub keeps messages for 2 hours.


## Extension side limits

If you're having trouble receiving messages, consider increasing the limit size of request body of your server

* [Apache](https://httpd.apache.org/docs/current/mod/core.html#limitrequestbody)
* [Nginx](http://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size)

## Problems and resolution

// TODO
