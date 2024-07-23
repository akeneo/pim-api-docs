## Status and error codes

All GraphQL queries will always return an `HTTP status code 200` unlike most APIs, where error handling is almost synonymous with `HTTP codes. 401 - Unauthorized`, `200 - OK`. 
Handling errors in GraphQL is different with some challenges, and some ways to tackle them.

The status code `200 - OK` doesn't always mean that the GraphQL server was able to process the query.
Whenever an error occurs while processing a GraphQL query, its response to the client includes an `errors array` that contains each error that occurred.

The error will include these fields :
* `message`: The message of the error
* `location`: The location of the error in the query `line` and `column`
* `path`: The path to the field that caused the error on the query
* `extensions`: Additional details on the error. When the error comes from the PIM, this `extensions` field will also include two fields `http_code` and also `http_message` 

Here are some examples of errors: 

## Error regarding invalid query
Generally for these errors, the `extensions` **field will be missing**. 

### Wrong query
```graphql [snippet: Query]

{
    referenceEntitiesRecords(referenceEntity: "designers")
}
```
```json [snippet: Response]

{
  "errors": [
    {
      "message": "Field \"referenceEntitiesRecords\" of type \"ReferenceEntityRecordsCollection\" must have a selection of subfields. Did you mean \"referenceEntitiesRecords { ... }\"?",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ]
    }
  ]
}
```

### Wrong query parameter
```graphql [snippet: Query]

query MyQuery {
    # The search must be a valid JSON
    products(limit: 100, search: "parent!=null") {
        items {
            uuid
            parent {
                code
            }
        }
    }
}
```
```json [snippet: Response]

{
  "errors": [
    {
      "message": "the \"search\" parameter is not a valid JSON. Please see the documentation for help.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "products"
      ]
    }
  ],
  "data": {
    "products": null
  }
}
```

### One-query limitation
You can find more detail on the [Limitations - One-query](/graphql/limitations.html#one-query-limitation)

```graphql [snippet: Query]

{
    products {
        items {
            uuid
        }
    }
    categories {
        items {
            code
        }
    }
}
```
```json [snippet: Response]

{
  "errors": [
    {
      "message": "Operation Error: Only one selection is allowed at once, found 2"
    }
  ]
}
```

### Depth limitation
You can find more detail on the [Limitations - Depth](/graphql/limitations.html#depth-limitations)

```graphql [snippet: Query]

{
    products {
        items {
            uuid
            categories {
                code
            }
            simpleAssociations {
                type
                products {
                    uuid
                    parent {
                        code
                        categories {
                            code
                        }
                    }
                }
            }
        }
    }
}
```
```json [snippet: Response]

{
  "errors": [
    {
      "message": "Depth Error: Query depth limit of 6 for query: [products] exceeded, found 7."
    }
  ]
}
```

### Complexity limitation
You can find more detail on the [Limitations - Query complexity](/graphql/limitations.html#query-complexity-limitations)

```graphql [snippet: Query]

{
    products(limit: 100) {
        items {
            uuid
            categories {
                code
            }
            simpleAssociations {
                type
                products {
                    uuid
                    parent {
                        code
                    }
                }
            }
        }
    }
}
```
```json [snippet: Response]

{
  "errors": [
    {
      "message": "Cost Error: Query Cost limit of 5000 exceeded, found 6200. Reduce the limit argument or the requested fields"
    }
  ]
}
```


## Error from the PIM
For these errors, the `extensions` **field will always be present**.

### Invalid token Extensions[http-code]: 401
This error occurs mainly when authentication headers are invalid. More detail is available on [Api Rest - Response codes - 401](/documentation/responses.html#401-error)

```graphql [snippet: Query]

query MyQuery {
  products(limit: 100, channel: "abc") {
    items {
      uuid
  }
}
```
```json [snippet: Response]

{
  "errors": [
    {
      "message": "The access token provided is invalid.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "products"
      ],
      "extensions": {
        "http_code": 401,
        "http_message": "Request failed with status code 401"
      }
    }
  ],
  "data": {
    "products": null
  }
}
```

### Wrong data Extensions[http-code]: 422
This error occurs mainly when the data sent to the PIM are invalid. More detail is available on [Api Rest - Response codes - 422](/documentation/responses.html#422-error)


```graphql [snippet: Query]

query MyQuery {
  products(limit: 100, channel: "abc") {
    items {
      uuid
      parent {
        code
      }
      categories {
        code
        values
      }
    }
  }
}
```
```json [snippet: Response]

{
  "errors": [
    {
      "message": "Scope \"abc\" does not exist.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "products"
      ],
      "extensions": {
        "http_code": 422,
        "http_message": "Request failed with status code 422"
      }
    }
  ],
  "data": {
    "products": null
  }
}
```

### Too many requests[http-code]: 429
This error occurs when the PIM has been over solicitated, mostly due to the usage of the Rest API. More detail is available on [Api Rest - Response codes - 429](/documentation/responses.html#429-error)


```graphql [snippet: Query]

query MyQuery {
  products(limit: 100) {
    items {
      uuid
      parent {
        code
      }
      categories {
        code
        values
      }
    }
  }
}
```
```json [snippet: Response]

{
  "errors": [
    {
      "message": "PIM 429 Too many requests",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "products",
        "items",
        "parent"
      ],
      "extensions": {
        "http_code": 429,
        "http_message": "Request failed with status code 429"
      }
    }
  ],
  "data": {
    "products": null
  }
}
```

## Specific errors
In some cases we can get **status code different** from `200 - Ok`

### `415 Unsupported Media Type`
This status indicates that the user has sent an `empty HTTP POST request`.

### `429 Too Many Requests`
This status indicates that the user has sent too many requests in a given amount of time ("rate limiting").
More details are available on [Limitations - Rate limiting](/graphql/limitations.html#rate-limiting)

### `500 Internal Server Error`
This status indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
The status of the service can be found at https://status.akeneo.com/

::: panel-link Let's finish with more advanced notions [Next](/graphql/advanced.html)
:::
