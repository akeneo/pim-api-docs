## Ask only what you need
Design queries to request only the data required, avoiding over-fetching and under-fetching scenarios. Use field-level granularity to specify precisely which fields are needed for each request.  
By asking only for essential data, you minimize network traffic, reduce server load, and optimize overall API performance.

## Gzip compression
We support request compression. Feel free to utilize it by including the following code in your request header: 
`Accept-Encoding: gzip, deflate, br, zstd`

Our tests have shown noticeable improvements, so don't hesitate to take advantage of it!

## Variables usages
Requests do not need to be dynamically generated. You can also use static request with variable parameters, like the example below with the $limit variable.
```graphql [snippet:GraphQL]
query MyQuery($limit: Int) {
  products(limit:$limit ) {
    items {
      uuid
    }
  }
}
```
You can also run this query using cURL or your favorite development language.
``` bash [snippet:Bash]
curl -X POST https://graphql.sdk.akeneo.cloud \
-H 'Content-Type: application/json' \
-H 'X-PIM-URL: https://xxxxxxx.demo.cloud.akeneo.com' \
-H 'X-PIM-CLIENT-ID: xxxxxx' \
-H 'X-PIM-TOKEN: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
-d '{
    "query": "query myProductQuery($limit: Int) {products(limit: $limit) {items {uuid}}}",
    "variables": {
        "limit": 10
    }
}'
```

## Deprecations
While deprectaed fields and arguments are higly visible using the graphiQL interface, it is less obvious using a client library.  
On the graphiQL ui deprecated fields will appears in orange with an underline and a deprecation message.

On queries you have several ways to get this information.
- The `queryInformation` field holds a `deprecations` field that contains all the deprecated arguments and fields for this particular query.
- Query logs also have three entries to expose deprecation information: deprecations, deprecations_keys, deprecations_count.
- To finish the `deprecations_count` value is also added to the response header under `X-DEPRECATION-NUMBER`.

## Restrict loaded attributes
Product and ProductModel queries have a special argument called `attributesToLoad`.
This argument is not mandatory but will greatly improve the response time. If you need only a limited number of attributes in your query, you should pass it to attributeToLoad.  
More details are available in the [Rest API documentation](https://api.akeneo.com/documentation/filter.html#filter-product-values).


::: panel-link And now, check the existing [limitations](/graphql/setup/limitations.html)
:::
