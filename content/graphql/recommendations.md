# Our usage recommendation

:::info
We encourage you to use the Akeneo **GraphQL API** as follows:
:::

- An **App/integration** need **only data reading** ⇒ Use the **GraphQL API**
- An **App/integration** need **data reading & writing**
  - Few data to fetch & write ⇒ Use the **REST API**
  - Only writing data ⇒ Use the **REST API**
  - Complex data / relations fetching + writing ⇒ Use both the **GraphQL API** and the **REST API**

- An **App/integration** need **data reading with filtering**
  - Without UI ⇒ **GraphQL API** with **the search parameter**
  - Using UI ⇒ **GraphQL API** + **CatalogsForApps** (on the roadmap)

::: panel-link And now, have a look at the GraphQL API limitations [Next](/graphql/limitations.html)
:::
