# Limitations

**GraphQL API** offers great flexibility by allowing clients to request precisely the data they need.

However, **certain limitations** are in place to ensure optimal performance.

By setting boundaries, we avoid complex or large queries that could potentially slow down the system.

**This is a balancing act between flexibility and performance.**

## Rate limiting

:::warning
Understanding **that the limitations are not static and will adapt over time-based on usage and requirements is vital**.

With the **GraphQL API** being a recent addition to Akeneo, our priority is to ensure the stability of the PIM by carefully assessing all risks.

If you encounter any **challenges** with the `rate limits`, please don't hesitate to reach out by opening a support ticket.

Your insights are invaluable in fine-tuning our system for optimal performance.
:::
The **GraphQL API** is limited to `2req/s` per **PIM URL.**

## Query complexity limitations

Each query will have a cost complexity depending on the requested data.
A detailed explanation can be found on [Complexity calculation](/graphql/complexity.html).

## Depth limitations
A query depth is how much level of data you have.
For example, you can make the following query

```graphql [snippet:Query with too much depth]

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
```json [snippet:Error]

{
    "errors": [
        {
          "message": "Depth Error: Query depth limit of 6 for query: [products] exceeded, found 7."
        }
    ]
}
```

**Maximum query depth** is set as follows for each GraphQL Query.

| Query                    | Max Depth |
|--------------------------|-----------|
| productModels            | 6         |
| products                 | 6         |
| families                 | 5         |
| attributes               | 4         |
| categories               | 4         |
| channels                 | 4         |
| assetFamilies            | 4         |
| referenceEntities        | 4         |
| measurementFamilies      | 4         |
| assetsRecords            | 3         |
| referenceEntitiesRecords | 3         |
| attributeOptions         | 3         |
| currencies               | 3         |
| locales                  | 3         |

:::info
Remember that every time you open a bracket, the level of depth increases.
This is an important tip to keep in mind.
:::

:::warning
Understanding **that the limitations are not static and will adapt over time-based on usage and requirements is vital**.

With the **GraphQL API** being a recent addition to Akeneo, our priority is to ensure the stability of the PIM by carefully assessing all risks.

If you encounter any **challenges** with the `depth limit`, please don't hesitate to reach out by opening a support ticket.

Your insights are invaluable in fine-tuning our system for optimal performance.
:::


## One-query limitation
By default, GraphQL allows to execute several queries by one call.

This is disabled and `only one query will be allowed at once`.

You will get an error as following when executing multiple queries in one call.

```graphql [snippet:Two queries in one call]

{
  # This is the first query
  products {
    items {
      uuid
    }
  }
  # This is the second query
  categories {
    items {
      code
    }
  }
}
```
```json [snippet:Error]

{
    "errors": [
        {
        "message": "Operation Error: Only one selection is allowed at once, found 2"
        }
    ]
}
```

::: panel-link Next step: status and error codes [Next](/graphql/error-codes.html)
:::
