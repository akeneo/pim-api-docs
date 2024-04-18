# Customize output field name with aliases

Aliases in GraphQL provide a way to request multiple fields with different names from the same root field, including the possibility to rename a field without necessarily fetching it multiple times. 
This allows clients to customize the structure of the response without changing the structure of the query. 
By assigning unique aliases to each field, clients can disambiguate between identically named fields and simplify data processing on the client side.
The syntax is really simple. You just need to prefix the field or function name with the alias followed by a colon.

For example, you might want to call the same function (`attribute` here) multiple times:

```graphql [snippet:GraphQL]
{
  products (limit: 2) {
    items {
      sku: attribute(code: "sku")
      erpName: attribute(code: "erp_name")
    }
  }
}
```

The result should be similar to the next one:

```json [snippet:JSON]
{
  "data": {
    "products": {
      "items": [
        {
          "sku": [
            {
              "locale": null,
              "data": "ABC12345",
              "channel": null
            }
          ],
          "erpName": [
            {
              "locale": "en_US",
              "data": "Plaid shirt",
              "channel": null
            },
            {
              "locale": "fr_FR",
              "data": "Chemise à carreaux",
              "channel": null
            }
          ]
        },
        {
          "sku": [
            {
              "locale": null,
              "data": "XYZ98765",
              "channel": null
            }
          ],
          "erpName": [
            {
              "locale": "en_US",
              "data": "Denim jeans",
              "channel": null
            },
            {
              "locale": "fr_FR",
              "data": "Pantalon en jean",
              "channel": null
            }
          ]
        }
      ]
    }
  }
}
```
