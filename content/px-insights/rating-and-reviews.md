
# Rating and reviews

## Push reviews into the PIM

* Message ID: `com.akeneo.pim.v1.product.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

The following actions can trigger a product update event:

- Product update from the product page.
- Product update using the REST API.
- Product update within the rules engine.
- Product update within workflows.
- Product update via a tailored import.

The modifications that can lead to this event include:

- Changes to product properties, such as:
    - Family
    - Parent
    - Enabled status
- Changes in category association, such as:
    - Adding the product to a category
    - Removing the product from a category
- Changes in group association, such as:
    - Adding the product to a group
    - Removing the product from a group
- Adjustments to product values
- Alterations to product associations, including:
    - Standard associations
    - Quantified associations

### Payload

| Name | Type | Description |
|---|---|---|
| data.product | object | - |
| data.product.uuid | string | Unique identifier of a Product in the PIM. |
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api`, `job`, `system` or `unknown-user-type`). |

> Example of payload


```json [snippet:Payload]
{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.product.updated",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.updated.schema.json",
  "data": {
    "product": {
      "uuid": "6a9f8486-2c36-4680-b87f-6f5f8f01b6cf"
    },
    "author": {
      "identifier": "admin",
      "type": "user"
    }
  }
}
```
