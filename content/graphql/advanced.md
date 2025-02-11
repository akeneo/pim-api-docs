## Cache Implementation

As our GraphQL implementation uses the Akeneo REST API to fetch data, we added a caching mechanism to minimize redundant requests to the PIM and improve overall responsiveness. This cache is shared across multiple instances to maximize efficiency.

### Perimeter (What is Cached)

All main queries are not cached, while every sub-query is cached.

**Example**
We query Families in order to get the list of families, their labels and their attributes labels.

The list of families is not cached as this is the main query, but the attributes labels depend on a sub query that is cached.

### Cache Duration

The cache duration is set to 5 minutes, providing an optimal balance between reducing API calls and ensuring data freshness. This duration may evolve based on usage patterns.

## Complexity calculation

### Overview
Each query you make has an assigned cost used to determine its complexity; it is based on the **requested object, fields and subfields**, and the maximal query cost is **5,000**.
If your calculated query cost is above **5,000**, the query will be refused, and you will receive an error message instead.

```json [snippet:JSON]

{
  "errors": [
    {
      "message": "Cost Error: Query Cost limit of 5000 exceeded, found 6200. Reduce the limit argument or the requested fields"
    }
  ]
}
```

### How to know your query complexity
You can check the cost of any given query by requesting the field `requestComplexity` in the `queryInformation` node available for all queries.

```graphql [snippet:GraphQL]

query MyQuery {
  channels {
    items {
      code
    }
    queryInformation {
      requestComplexity
    }
  }
}
```
```json [snippet:Result]

{
  "data": {
    "channels": {
      "queryInformation": {
        "requestComplexity": 60
      },
      "items": [
        {
          "code": "b2b"
        }
      ]
    }
  }
}
```

You can also have a more detailed view of the cost of each requested object & field by requesting `requestComplexityDetail`.

```graphql [snippet:GraphQL]

query MyQuery {
  channels {
    items {
      code
    }
    queryInformation {
      requestComplexityDetail
      requestComplexity
    }
  }
}
```
```json [snippet:Result]

{
  "data": {
    "channels": {
      "queryInformation": {
        "requestComplexityDetail": {
          "channels-items[code]": 1,
          "channels[items]": 6,
          "channels[queryInformation]": 0,
          "channels": 6,
          "calculation": {
            "LimitMultiplier": "x10"
          }
        },
        "requestComplexity": 60
      },
      "items": [
        {
          "code": "b2b"
        }
      ]
    }
  }
}
```

### Calculation method overview
The calculation method follows a set of rules described below. Its main components are :
- The number of request results is called the **limit factor**
- the nested level of requested objects and fields called the **depth factor**
- The objects requested are called **object cost**
- The fields requested for each object are called **fields cost**

#### Limit factor
The limit factor is applied after the query cost has been calculated.
It multiplies the cost of the query by the number of requested results.

:::info
For example
Your query has a cost of **100** when requesting **10** products :
- Using the same query to request **100** products will cost you **1000**.
- Using the same query to request **50** products will cost you **500**.
- Using the same query to request **1** product will cost you **10**.
  :::

Most queries have a limit argument, allowing you to control exactly how much result you want to retrieve to be sure not to cross the limitation.

#### Object cost

##### What is considered an object
An object represents an entity inside a query, it can’t be requested alone as it will provoke an error, it must at least include one field.

Most queries have at least three objects :
- **`items`** allowing you to select fields, and sub-objects
- **`links`** allowing you to retrieve the pagination information
- **`queryInformation`** allowing you to retrieve the query information (mostly cost and warning)

Objects can then have sub-objects; they work the same way as their parent and can have other sub-objects.

##### How object cost is calculated
The default cost of requesting an object is 5.

In this example, we request two objects in a product query :
- `queryInformation` with the field `requestComplexity`
- `items` with the field `uuid`

```graphql [snippet:GraphQL]

query MyQuery {
  products {
    queryInformation {
      requestComplexity
    }
    items {
      uuid
    }
  }
}
```
```json [snippet:Result]

{
  "data": {
    "products": {
      "queryInformation": {
        "requestComplexity": 60
      },
      "items": [
        {
          "uuid": "002844f9-a470-42e2-8268-ddfd8f646593"
        }
      ]
    }
  }
}
```

Requesting `items` added 5 to the cost.
Requesting `queryInformation` added 0 to the cost because it is a special object.

##### Special object
Some objects have a special cost assigned to them and don’t cost the default 5:

- `queryInformation` always costs 0, same for its subfields
- `links` always cost 0, same for their subfields

#### Fields cost

##### What is considered a field
A field represents an object property or an object method.
You must always request at least one of the object fields when requesting an object.
A field is final and does not have any sub-entity.

##### How field cost is calculated
The default cost of requesting a field is 1.
In this example, we request the field `uuid` of the `items` object:

```graphql [snippet:GraphQL]

query MyQuery {
  products {
    queryInformation {
      requestComplexity
    }
    items {
      uuid
    }
  }
}
```
```json [snippet:Result]

{
  "data": {
    "products": {
      "queryInformation": {
        "requestComplexity": 60
      },
      "items": [
        {
          "uuid": "002844f9-a470-42e2-8268-ddfd8f646593"
        }
      ]
    }
  }
}
```

Requesting `uuid` added 1 to the cost.

##### Special fields

Some fields have a special cost assigned to them and don’t cost the default 1
`variationValues` in the `product` query cost 5
`variationAxes` in the `productModel` query cost 5

#### Depth cost factor

In addition, a depth cost factor is applied to the object and field cost; this depth cost factor multiplies the cost of the object and field depending on how deep they are in the query.
**The depth cost factor is exponential, starts at 2, and is not applied to the first level of the object `items` .**

For the given query :

```graphql [snippet:GraphQL]

query MyQuery {
  products(limit: 2) {
    items {
      uuid
      variationValues
      attributes {
        code
        values(withRelatedObjectValues: false)
      }
    }
    queryInformation {
      detailedComplexity
      requestedComplexity
    }
  }
}
```

`QueryInformation` is always free of cost.

The calculation starts in the `items` node.
`items` costs 5 for the basic cost of requesting an object.
`items.uuid` costs 1, the scalarCost.
`item.variationValues` costs 5 because it’s a special field that costs more than a classic scalar.
`item.attributes` total cost is 9 and is computed as follows :
- `item.attributes` alone costs 5  for the cost of requesting an entity
- `item.attributes.code` costs 1x2 (depthcostFactor) = 2
- `item.attributes.value` costs 1x2 (depthcostFactor) = 2

The result is `5 + 1 + 5 + 9 = 20`

But we can see in this query with the limit: 2 arguments that we requested 2 products, the cost is therefore multiplied by 2

`20 x 2 = 40`
