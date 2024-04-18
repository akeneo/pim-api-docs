# What is GraphQL?

GraphQL is an open-source query language and runtime environment designed specifically for APIs, allowing clients to specify exactly what data they need without requiring multiple endpoints.
To execute GraphQL queries, you need to send POST HTTP requests to a specific endpoint which can be accessed via the following URL: [https://graphql.sdk.akeneo.cloud](https://graphql.sdk.akeneo.cloud/).
For example, the query below gets products with their uuid and family.

```graphql [snippet:GraphQL]

{
  products {
    items {
      uuid
      family {
        code
      }
    }
  }
}

```
The response is a JSON object.

```json [snippet:JSON]

{
  "data": {
    "products": {
      "items": [
        {
          "uuid": "002844f9-a470-42e2-8268-ddfd8f646593",
          "family": {
            "code": "roofing_nailers"
          }
        },
        {
          "uuid": "002e7b83-c81b-4d28-a0c4-b0806c04eeea",
          "family": {
            "code": "heated_jackets"
          }
        }
      ]
    }
  }
}
```
