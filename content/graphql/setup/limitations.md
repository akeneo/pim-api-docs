# Limitations

**GraphQL API** offer great flexibility by allowing clients to request precisely the data they need. 
However, certain limitations are in place to ensure optimal performance. 
By setting boundaries, we avoid complex or large queries that could potentially slow down the system. 
This is a balancing act between flexibility and performance.

## Rate limiting

:::warning
Understanding that the limitations are not static and will adapt over time-based on usage and requirements is vital. 
With the **GraphQL API** being a recent addition to Akeneo, our priority is to ensure the stability of the PIM by carefully assessing all risks. 
If you encounter any challenges with the rate limits, please don't hesitate to reach out by opening a support ticket. 
Your insights are invaluable in fine-tuning our system for optimal performance.
:::
The **GraphQL API** is limited to **two queries per second** per **PIM URL.**

## Query complexity limitations

Each query will have a cost complexity depending on the requested data.
A detailed explanation can be found on [Complexity calculation](/graphql/setup/complexity.html).

## Nested limitations

Maximum query depth is limited to **6**.
:::warning
Remember that every time you open a bracket, the level of depth increases. 
This is an important tip to keep in mind.
:::
In this example, you have opened eight brackets, meaning that your query's depth level is 8. You will not be able to make the call.

```graphql [snippet:GraphQL]

{
  products {
    items {
      simpleAssociations {
        products {
          uuid
          parent {
            simpleAssociations {
              products {
                uuid
              }
            }
          }
        }
      }
    }
  }
}
```

## One-query limitation

You can't make multiple queries in one call so the following example will fail.

```graphql [snippet:GraphQL]

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
