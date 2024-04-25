# Status and error codes

All GraphQL queries will always return a `HTTP status code 200` unlike most APIs, where error handling is almost synonymous with `HTTP codes. 401 - Unauthorized`, `200 - OK`. 
Handling errors in GraphQL is different with some challenges, and some ways to tackle them.

![Check the response code](../img/graphql/check-response-code.jpg)

The status code `200 - Ok` doesn't always mean that the GraphQL server was able to process the query.
Whenever an error occur while processing a GraphQL query, its response to the client includes an `errors array` that contains each error that occurred.

The error will include these fields :
* `message`: The message of the error
* `location`: The location of the error in the query `line` and `column`
* `path`: The path to the field that caused the error on the query
* `extensions`: Additional details on the error. When the error come from the PIM, this `extensions` field will also include two field `http_code` and also `http_message` 

Here is some examples of errors: 

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
You can find more detail on the [Limitations - One-query](/graphql/setup/limitations.html#one-query-limitation)

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
You can find more detail on the [Limitations - Depth](/graphql/setup/limitations.html#depth-limitations)

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
You can find more detail on the [Limitations - Query complexity](/graphql/setup/limitations.html#query-complexity-limitations)

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
      "message": "Cost Error: Query Cost limit of 5000 exceeded, found 6200. Reduce the limit argument, or the requested fields"
    }
  ]
}
```


## Error from the PIM
For these errors, the `extensions` **field will always be present**.

### Wrong data Extensions[http-code]: 422
This error occur mainly when the data sent to the PIM are invalid. More detail available on [Api Rest - Response codes - 422](/documentation/responses.html#422-error)


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

### Invalid token Extensions[http-code]: 401
This error occur mainly when authentication headers are invalid. More detail available on [Api Rest - Response codes - 401](/documentation/responses.html#401-error)

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

# Specific errors
In some cases we can get **status code different** from `200 - Ok`

## `429 Too Many Requests`
This status indicates that the user has sent too many requests in a given amount of time ("rate limiting").
More details are available on [Limitations - Rate limiting](/graphql/setup/limitations.html#rate-limiting)

## `500 Internal Server Error`
This status indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
The status of the service can be found on https://status.akeneo.com/

::: panel-link Let's finish with more advanced notions [Next](/graphql/advanced.html)
:::
