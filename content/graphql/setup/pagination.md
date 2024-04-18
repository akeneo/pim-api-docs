# Working with pagination

In our GraphQL API, we implement pagination in most queries to manage large datasets efficiently. Pagination breaks down query results into smaller, manageable chunks, improving performance and user experience. In the majority of our queries, there are by default 10 results per page, ensuring a balance between fetching sufficient data and maintaining optimal performance.
Pagination is facilitated by the `limit` argument when available, allowing users to specify the maximum number of results per page. The `limit` argument accepts values between 1 and 100, determining the maximum number of results returned on a single page.
This is a simple example:

```graphql [snippet:GraphQL]
{
  products(limit: 5) {
    items {
      name: attribute(code: "name")
    }
  }
}
```

The result should be similar to the next one:

```json [result:JSON]
{
  "data": {
    "products": {
      "items": [
        {
          "name": [
            {
              "locale": "en_US",
              "data": "Striped Cotton Button-Up Shirt",
              "attribute_type": "pim_catalog_text",
              "channel": null
            }
          ]
        },
        {
          "name": [
            {
              "locale": "en_US",
              "data": "Slim Fit Denim Jeans",
              "attribute_type": "pim_catalog_text",
              "channel": null
            }
          ]
        },
        {
          "name": [
            {
              "locale": "en_US",
              "data": "Knit Cardigan Sweater with Pockets",
              "attribute_type": "pim_catalog_text",
              "channel": null
            }
          ]
        },
        {
          "name": [
            {
              "locale": "en_US",
              "data": "Tailored Wool Blend Blazer",
              "attribute_type": "pim_catalog_text",
              "channel": null
            }
          ]
        },
        {
          "name": [
            {
              "locale": "en_US",
              "data": "Printed Floral Maxi Dress",
              "attribute_type": "pim_catalog_text",
              "channel": null
            }
          ]
        }
      ]
    }
  }
}
```

To request multiple pages of data one by one in GraphQL, additional information needs to be requested from GraphQL. At the top level inside the query, it's essential to include the `links` object with at least the `next` attribute, like this:

```graphql [snippet:GraphQL]
{
  products(limit: 5) {
    links {
      next
    }
    items {
      name: attribute(code: "name")
    }
  }
}
```

The result should be similar to the next one:

```json [result:JSON]
{
  "data": {
    "products": {
      "links": {
        "next": "d64e70f0-3b14-4e70-bce9-2711d8a3b7c1"
      },
      "items": [
        {
          "name": [
            {
              "locale": "en_US",
              "data": "Striped Cotton Button-Up Shirt",
              "attribute_type": "pim_catalog_text",
              "channel": null
            }
          ]
        },
        {
          "name": [
            {
              "locale": "en_US",
              "data": "Slim Fit Denim Jeans",
              "attribute_type": "pim_catalog_text",
              "channel": null
            }
          ]
        },
        {
          "name": [
            {
              "locale": "en_US",
              "data": "Knit Cardigan Sweater with Pockets",
              "attribute_type": "pim_catalog_text",
              "channel": null
            }
          ]
        },
        {
          "name": [
            {
              "locale": "en_US",
              "data": "Tailored Wool Blend Blazer",
              "attribute_type": "pim_catalog_text",
              "channel": null
            }
          ]
        },
        {
          "name": [
            {
              "locale": "en_US",
              "data": "Printed Floral Maxi Dress",
              "attribute_type": "pim_catalog_text",
              "channel": null
            }
          ]
        }
      ]
    }
  }
}

```

The value of the `next` attribute obtained from the `links` object should be inserted into the `page` argument of the subsequent request. This `next` value serves as a pointer or reference to the next page of data in the dataset. By passing this value to the `page` argument in the next query, the GraphQL server understands which portion of the dataset the client is requesting.
The next request should be something like:

```graphql [snippet:GraphQL]
{
  products(limit: 5, page: "d64e70f0-3b14-4e70-bce9-2711d8a3b7c1") {
    links {
      next
    }
    items {
      name: attribute(code: "name")
    }
  }
}
```

The result should show a max of 5 new results with potentially a new value for the `next` attribute.
When no more pages are available, the `next` value is set to `null`.
