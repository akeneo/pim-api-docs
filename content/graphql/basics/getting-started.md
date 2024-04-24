# Getting started

As GraphQL aggregates the GET Rest API calls, a Rest API Token is required to use GraphQL.

## Step 1: Get your token

To connect to the PIM API, you can use two types of tokens:
1. **Connection token** - lasts for one hour and is generated when you connect to the API.
2. **App token** - permanent and generated via OAuth2 for App connections.

:::info
We recommend using an App token for development purposes. However, for testing purposes, **we suggest using a connection token**.
:::

### 1. Using a connection token
To generate a token from a connection you will need:

* A **clientId/clientSecret** in addition of a **username/password**, you can find all the detail [here](https://api.akeneo.com/getting-started/your-first-tutorial-4x/step-1.html#step-1-create-a-connection)

You can now ask for a token using a dedicated GraphQL query, to execute it:

- Go to [https://graphql.sdk.akeneo.cloud](https://graphql.sdk.akeneo.cloud/), a **GraphQL in browser IDE** will be displayed and allow you to execute queries.
- Replace `my-username`, `my-password`, `my-client-id`, and `my-client-secret` found on the connection page in the following query.

```graphql [snippet:GraphQL]

{
  token(
    username: "my-username"
    password: "my-password"
    clientId: "my-client-id"
    clientSecret: "my-client-secret"
  ) {
    data {
      accessToken
    }
  }
}

```
- Enter the previous query on the **left panel**

- Add header information on the **bottom left panel**

```json [snippet:JSON]

{
  "X-PIM-URL": "https://your-pim-url",
  "X-PIM-CLIENT-ID": "your-client-id",
}
```

- You can now click on the **▶️** button, you should receive the following **response**:

```json [snippet:JSON]

{
  "data": {
    "token": {
      "data": {
        "accessToken": "xxxxxxxxxxxxxxxxxxMzQyYWNhYjc5Nxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

- Here is a screenshot that correspond to the previous steps

![Graphql-Token-Query](../../img/graphql/query-token.png)

**Congratulations!** You now have an access token! You’re ready to query your PIM using GraphQL.

### 2. Using an App token

All the required steps are documented [here](https://api.akeneo.com/tutorials/how-to-get-your-app-token.html#)

## Step 2: Make your first query

In the previous step you got the following configuration:
* Your pim URL
* Your client id & token (previously generated)

You can now execute your first query to get a list of product with their categories code & labels

- Go to [https://graphql.sdk.akeneo.cloud](https://graphql.sdk.akeneo.cloud/), a GraphQL in browser will be displayed and allow you to execute queries.
- Enter the following query on the left panel

```graphql [snippet:GraphQL]

{
  products {
    items {
      uuid
      categories {
        code
        labels
      }
    }
  }
}
```

- Add header information on the bottom left panel

```json [snippet:JSON]

{
  "X-PIM-URL": "https://your-pim-url",
  "X-PIM-CLIENT-ID": "your-client-id",
  "X-PIM-TOKEN": "your-token"
}
```

- You can now click on the **play** button
- Here is a screenshot that correspond to the previous steps

![Graphql-First-Query](../../img/graphql/query-getting-started.png)

::: panel-link And now, let's discover all the GraphQL capabilities using the in browser [GraphiQL](/graphql/setup/browse-graphql-capabilities.html)
:::
