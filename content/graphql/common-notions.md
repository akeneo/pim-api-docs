## Working with pagination

In our **GraphQL API**, we implement pagination in most queries to manage large datasets efficiently.

Pagination breaks down query results into smaller, manageable chunks, improving performance and user experience.

Pagination is facilitated by the `limit` argument when available, allowing users to specify the maximum number of results per page.

The `limit` argument accepts values between **1** and **100**, determining the maximum number of results returned on a single page.


This is a simple example:

```graphql [snippet:Query]

{
  products(limit: 5) {
    items {
      uuid
      created
    }
  }
}
```
```json [snippet:Result]

{
  "data": {
    "products": {
      "items": [
        {
          "uuid": "002844f9-a470-42e2-8268-ddfd8f646593",
          "created": "2023-10-10T07:08:57+00:00"
        },
        {
          "uuid": "002e7b83-c81b-4d28-a0c4-b0806c04eeea",
          "created": "2023-10-10T07:07:42+00:00"
        },
        {
          "uuid": "00859783-a85a-4825-b0a9-93ffce57b1f2",
          "created": "2023-10-10T07:06:32+00:00"
        },
        {
          "uuid": "00df7dde-c745-4590-8c17-01a6ae36d172",
          "created": "2023-10-10T07:06:27+00:00"
        },
        {
          "uuid": "00fd49f2-c417-4a40-8a7b-439a6e51923b",
          "created": "2023-10-10T07:09:00+00:00"
        }
      ]
    }
  }
}
```

To request the next page of data in GraphQL, you need to include the `links` object with at least the `next` attribute, like this:

```graphql [snippet:Query]

{
  products(limit: 5) {
    links {
      next
    }
    items {
      uuid
      created
    }
  }
}
```
```json [snippet:Result]

{
  "data": {
    "products": {
      "links": {
        "next": "00fd49f2-c417-4a40-8a7b-439a6e51923b"
      },
      "items": [
        {
          "uuid": "002844f9-a470-42e2-8268-ddfd8f646593",
          "created": "2023-10-10T07:08:57+00:00"
        },
        {
          "uuid": "002e7b83-c81b-4d28-a0c4-b0806c04eeea",
          "created": "2023-10-10T07:07:42+00:00"
        },
        {
          "uuid": "00859783-a85a-4825-b0a9-93ffce57b1f2",
          "created": "2023-10-10T07:06:32+00:00"
        },
        {
          "uuid": "00df7dde-c745-4590-8c17-01a6ae36d172",
          "created": "2023-10-10T07:06:27+00:00"
        },
        {
          "uuid": "00fd49f2-c417-4a40-8a7b-439a6e51923b",
          "created": "2023-10-10T07:09:00+00:00"
        }
      ]
    }
  }
}

```

The value of the `next` attribute obtained from the `links` object should be inserted into the `page` argument of the subsequent request.

This `next` value serves as a pointer or reference to the next page of data in the dataset.

By passing this value to the `page` argument in the next query, the result of the next page will be returned :

```graphql [snippet:GraphQL]

{
  products(limit: 5, page: "00fd49f2-c417-4a40-8a7b-439a6e51923b") {
    links {
      next
    }
    items {
      uuid
      created
    }
  }
}
```

The result should show a max of 5 new results with potentially a new value for the `next` attribute.
When no more pages are available, the `next` value is set to `null`.

It's possible to get a page with no results. For example, if you use a `limit` of 5 and you get the third page, the 
`next` field will be filled with the identifier of the last item of the page. If you use this identifier to get the fourth page,
you will get an empty list of items (and the `next` field will be `null`).

## Aliasing fields in response

Aliases in GraphQL provide a way to:
* Rename a field in the response to get an object as needed
* Duplicate a field with two different names

To alias a field you only need to prefix the field with `your-desired-alias: `, example:

```graphql [snippet:GraphQL]

{
  products (limit: 2) {
    items {
      identifier: uuid
      createdAt: created
      updatedAt: updated
      active: enabled
      associations: simpleAssociations {
        type
        products {
          uuid
        }
      }
    }
  }
}
```
```json [snippet:Result]
{
  "data": {
    "products": {
      "items": [
        {
          "identifier": "002844f9-a470-42e2-8268-ddfd8f646593",
          "createdAt": "2023-10-10T07:08:57+00:00",
          "updatedAt": "2024-04-11T14:30:04+00:00",
          "active": "true",
          "associations": [
            {
              "type": "UPSELL",
              "products": [
                {
                  "uuid": "acf44c18-213f-44b3-aade-52e8d27fa58b"
                },
                {
                  "uuid": "c9940072-30a2-4886-af73-3285b1c9e17e"
                }
              ]
            }
          ]
        },
        {
          "identifier": "002e7b83-c81b-4d28-a0c4-b0806c04eeea",
          "createdAt": "2023-10-10T07:07:42+00:00",
          "updatedAt": "2023-10-10T07:23:30+00:00",
          "active": "true",
          "associations": []
        }
      ]
    }
  }
}
```

## Query with search

**AS GraphQL use the Rest API**, all available filters can be used in the **Graphql queries** `search` **argument**

The `search` argument is of type **String** and expects a **JSON-encoded string**.

You can have a look at [all available filters](https://api.akeneo.com/documentation/filter.html)

Some examples:
- `{"updated":[{"operator":"SINCE LAST N DAYS","value":4}]}`
- `{"created":[{"operator":"=","value":"2016-07-04 10:00:00"}]}`

These filters need to be `JSON-escaped` before being able to be usable inside GraphQL.

You can use **your preferred online JSON escaper**.

The previous escaped filters will be:
- `{\"created\":[{\"operator\":\"=\",\"value\":\"2016-07-04 10:00:00\"}]}`
- `{\"updated\":[{\"operator\":\"SINCE LAST N DAYS\",\"value\":4}]}`

Here is an example of query with search:

```graphql [snippet: Query]

{
  products(search: "{\"updated\":[{\"operator\":\"SINCE LAST N DAYS\",\"value\":30}]}") {
    links {
      next
    }
    items {
      uuid
      updated
    }
  }
}
```
```json [snippet: Response]

{
  "data": {
    "products": {
      "links": {
        "next": null
      },
      "items": [
        {
          "uuid": "002844f9-a470-42e2-8268-ddfd8f646593",
          "updated": "2024-04-11T14:30:04+00:00"
        },
        {
          "uuid": "16874385-4cd5-45e6-a9de-8c13b75e1b34",
          "updated": "2024-03-26T10:41:15+00:00"
        },
        {
          "uuid": "25eb00d6-d58a-4b04-8ddb-e32cf4eca17b",
          "updated": "2024-01-23T17:06:52+00:00"
        }
      ]
    }
  }
}
```

::: panel-link And now, let's discover the available queries inside GraphQL [Next](/graphql/queries-and-arguments.html)
:::
