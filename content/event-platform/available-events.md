# Available events

## com.akeneo.pim.v1.app.deleted

*This event is generated whenever an App is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.app.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.app | object | - |
| data.app.client_id | string | Unique identifier of an App in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.app.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.app.deleted.schema.json",
  "data": {
    "app": {
      "client_id": "test_client_id"
    }
  }
}
```

## com.akeneo.pim.v1.asset.created

*This event is generated whenever a new asset is created in the PIM.*

* Message ID: `com.akeneo.pim.v1.asset.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.asset | object | - |
| data.asset.asset_family | object | - |
| data.asset.asset_family.code | string | code of an asset family |
| data.asset.code | string | code of an asset |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.asset.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.asset.created.schema.json",
  "data": {
    "asset": {
      "asset_family": {
        "code": "family1"
      },
      "code": "asset1"
    }
  }
}
```

## com.akeneo.pim.v1.asset.updated

*This event is generated whenever an existing asset is modified in the PIM.*

* Message ID: `com.akeneo.pim.v1.asset.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

Only changes in asset values will cause this event.

### Payload

| Name | Type | Description |
|---|---|---|
| data.asset | object | - |
| data.asset.asset_family | object | - |
| data.asset.asset_family.code | string | code of an asset family |
| data.asset.code | string | code of an asset |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.asset.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.asset.updated.schema.json",
  "data": {
    "asset": {
      "asset_family": {
        "code": "family1"
      },
      "code": "asset1"
    }
  }
}
```

## com.akeneo.pim.v1.asset.deleted

*This event is generated whenever an asset is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.asset.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.asset | object | - |
| data.asset.asset_family | object | - |
| data.asset.asset_family.code | string | identifier of an asset family |
| data.asset.code | string | code of an asset |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.asset.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.asset.deleted.schema.json",
  "data": {
    "asset": {
      "asset_family": {
        "code": "family1"
      },
      "code": "asset1"
    }
  }
}
```

## com.akeneo.pim.v1.attribute.created

*This event is generated whenever a new attribute is created in the PIM.*

* Message ID: `com.akeneo.pim.v1.attribute.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.attribute | object | - |
| data.attribute.code | string | Unique identifier of an Attribute in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute.created.schema.json",
  "data": {
    "attribute": {
      "code": "an-attribute-code"
    }
  }
}
```

## com.akeneo.pim.v1.attribute.updated

*This event is generated whenever an existing attribute is modified in the PIM.*

* Message ID: `com.akeneo.pim.v1.attribute.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

This event is generated whenever an existing attribute is modified in the PIM. The updates that can trigger this event include the following:

- Update any attribute property and save.
- Reorder attributes within an attribute group (doing so will trigger an `com.akeneo.pim.v1.attribute.updated` event for every attribute in the attribute group).

### Payload

| Name | Type | Description |
|---|---|---|
| data.attribute | object | - |
| data.attribute.code | string | Unique identifier of an Attribute in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute.updated.schema.json",
  "data": {
    "attribute": {
      "code": "an-attribute-code"
    }
  }
}
```

## com.akeneo.pim.v1.attribute.deleted

*This event is generated whenever an attribute is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.attribute.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.attribute | object | - |
| data.attribute.code | string | Unique identifier of an Attribute in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute.deleted.schema.json",
  "data": {
    "attribute": {
      "code": "an-attribute-code"
    }
  }
}
```

## com.akeneo.pim.v1.attribute-group.created

*This event is generated whenever a new attribute group is created in the PIM.*

* Message ID: `com.akeneo.pim.v1.attribute-group.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.attribute_group | object | - |
| data.attribute_group.code | string | Unique identifier of an Attribute Group in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute-group.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute-group.created.schema.json",
  "data": {
    "attribute_group": {
      "code": "an-attribute-group-code"
    }
  }
}
```

## com.akeneo.pim.v1.attribute-group.updated

*This event is generated whenever an existing attribute group is modified in the PIM.*

* Message ID: `com.akeneo.pim.v1.attribute-group.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.attribute_group | object | - |
| data.attribute_group.code | string | Unique identifier of an Attribute Group in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute-group.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute-group.updated.schema.json",
  "data": {
    "attribute_group": {
      "code": "an-attribute-group-code"
    }
  }
}
```

## com.akeneo.pim.v1.attribute-group.deleted

*This event is generated whenever an attribute group is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.attribute-group.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.attribute_group | object | - |
| data.attribute_group.code | string | Unique identifier of an Attribute Group in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute-group.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute-group.deleted.schema.json",
  "data": {
    "attribute_group": {
      "code": "an_attribute_group_code"
    }
  }
}
```

## com.akeneo.pim.v1.attribute-option.created

*This event is generated whenever a new attribute option is created in the PIM.*

* Message ID: `com.akeneo.pim.v1.attribute-option.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.attribute_option | object | - |
| data.attribute_option.code | string | code of an attribute option |
| data.attribute_option.attribute | object | - |
| data.attribute_option.attribute.code | string | code of an attribute |

> Example of payload

```json [snippet:Payload] [snippet:Payload]


{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.attribute-option.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.reference-entity-record.created.schema.json",
  "data": {
    "attribute_option": {
      "code": "an_attribute_option_code",
      "attribute": {
        "code": "an_attribute_code"
      }
    }
  }
}
```

## com.akeneo.pim.v1.attribute-option.updated

*This event is generated whenever an existing attribute option is updated in the PIM.*

* Message ID: `com.akeneo.pim.v1.attribute-option.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.attribute_option | object | - |
| data.attribute_option.code | string | code of an attribute option |
| data.attribute_option.attribute | object | - |
| data.attribute_option.attribute.code | string | code of an attribute |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.attribute-option.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.reference-entity-record.updated.schema.json",
  "data": {
    "attribute_option": {
      "code": "an_attribute_option_code",
      "attribute": {
        "code": "an_attribute_code"
      }
    }
  }
}
```

## com.akeneo.pim.v1.attribute-option.deleted

*This event is generated whenever an attribute option is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.attribute-option.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.attribute_option | object | - |
| data.attribute_option.code | string | code of an attribute option |
| data.attribute_option.attribute | object | - |
| data.attribute_option.attribute.code | string | code of an attribute |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.attribute-option.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.reference-entity-record.updated.schema.json",
  "data": {
    "attribute_option": {
      "code": "an_attribute_option_code",
      "attribute": {
        "code": "an_attribute_code"
      }
    }
  }
}
```

## com.akeneo.pim.v1.category.created

*This event is generated whenever a new category is created in the PIM.*

* Message ID: `com.akeneo.pim.v1.category.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.category | object | - |
| data.category.code | string | Unique identifier of a category |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.category.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.category.created.schema.json",
  "data": {
    "category": {
      "code": "category-1"
    }
  }
}
```

## com.akeneo.pim.v1.category.updated

*This event is generated whenever an existing category is modified in the PIM.*

* Message ID: `com.akeneo.pim.v1.category.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

The event is triggered when any of the following properties are changed:

- The parent category.
- The labels.
- The values.

### Payload

| Name | Type | Description |
|---|---|---|
| data.category | object | - |
| data.category.code | string | Unique identifier of a category |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.category.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.category.updated.schema.json",
  "data": {
    "category": {
      "code": "category-1"
    }
  }
}
```

## com.akeneo.pim.v1.category.deleted

*This event is generated whenever a category is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.category.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.category | object | - |
| data.category.code | string | Unique identifier of a category |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.category.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.category.deleted.schema.json",
  "data": {
    "category": {
      "code": "category-1"
    }
  }
}
```

## com.akeneo.pim.v1.connection.deleted

*This event is generated whenever a connection is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.connection.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.connection | object | - |
| data.connection.client_id | string | Unique identifier of a connection in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.connection.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.connection.deleted.schema.json",
  "data": {
    "connection": {
      "client_id": "connection-client-id"
    }
  }
}
```

## com.akeneo.pim.v1.product.created

*This event is generated whenever a new product is created in the PIM.*

* Message ID: `com.akeneo.pim.v1.product.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

The following actions can trigger a product creation event:

- Product creation from the product page.
- Product creation using the REST API.
- Product creation within the rules engine.
- Product creation within workflows.
- Product creation via a tailored import.

### Payload

| Name | Type | Description |
|---|---|---|
| data.product | object | - |
| data.product.uuid | string | Unique identifier of a Product in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.product.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.created.schema.json",
  "data": {
    "product": {
      "uuid": "6a9f8486-2c36-4680-b87f-6f5f8f01b6cf"
    }
  }
}
```

## com.akeneo.pim.v1.product.updated

*This event is generated whenever an existing product is modified in the PIM.*

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

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.product.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.updated.schema.json",
  "data": {
    "product": {
      "uuid": "6a9f8486-2c36-4680-b87f-6f5f8f01b6cf"
    }
  }
}
```

## com.akeneo.pim.v1.product.deleted

*This event is generated whenever a product is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.product.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

The following actions can trigger a product deletion event:

- Product deletion from the product page.
- Product deletion using the REST API.
- Product deletion within the rules engine.
- Product deletion within workflows.
- Product deletion via a tailored import.

### Payload

| Name | Type | Description |
|---|---|---|
| data.product | object | - |
| data.product.uuid | string | Unique identifier of a Product in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.product.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.deleted.schema.json",
  "data": {
    "product": {
      "uuid": "6a9f8486-2c36-4680-b87f-6f5f8f01b6cf"
    }
  }
}
```

## com.akeneo.pim.v1.product-model.created

*This event is generated whenever a new product model is created in the PIM.*

* Message ID: `com.akeneo.pim.v1.product-model.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.product | object | - |
| data.product.code | string | Unique identifier of a Product Model in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.product-model.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.created.schema.json",
  "data": {
    "product_model": {
      "code": "a-product-model-code"
    }
  }
}
```

## com.akeneo.pim.v1.product-model.updated

*This event is generated whenever an existing product model is modified in the PIM.*

* Message ID: `com.akeneo.pim.v1.product-model.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

The modifications that can lead to this event include:

- Changes to the product model's parent property.
- Changes in category association, such as:
    - Adding the product to a category
    - Removing the product from a category
- Adjustments to product model values.
- Alterations to product model associations, including:
    - Standard associations
    - Quantified associations

### Payload

| Name | Type | Description |
|---|---|---|
| data.product | object | - |
| data.product.code | string | Unique identifier of a Product Model in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.product-model.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.updated.schema.json",
  "data": {
    "product_model": {
      "code": "a-product-model-code"
    }
  }
}
```

## com.akeneo.pim.v1.product-model.deleted

*This event is generated whenever a product model is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.product-model.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.product_model | object | - |
| data.product_model.code | string | Unique identifier of a Product Model in the PIM. |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.product-model.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product-model.deleted.schema.json",
  "data": {
    "product_model": {
      "code": "a-product-model-code"
    }
  }
}
```

## com.akeneo.pim.v1.family.created

*This event is generated whenever a new family is created in the PIM.*

* Message ID: `com.akeneo.pim.v1.family.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.family | object | - |
| data.family.code | string | code of a family |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.family.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.family.created.schema.json",
  "data": {
    "family": {
      "code": "a_family_code"
    }
  }
}
```

## com.akeneo.pim.v1.family.updated

*This event is generated whenever an existing family is modified in the PIM.*

* Message ID: `com.akeneo.pim.v1.family.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

The event is triggered when any of the following properties are changed:

- The attribute as image.
- The attribute requirements.
- The labels.

### Payload

| Name | Type | Description |
|---|---|---|
| data.family | object | - |
| data.family.code | string | code of a family |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.family.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.family.updated.schema.json",
  "data": {
    "family": {
      "code": "a_family_code"
    }
  }
}
```

## com.akeneo.pim.v1.family.deleted

*This event is generated whenever a family is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.family.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.family | object | - |
| data.family.code | string | code of a family |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.family.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.family.deleted.schema.json",
  "data": {
    "family": {
      "code": "a_family_code"
    }
  }
}
```

## com.akeneo.pim.v1.reference-entity-record.created

*This event is generated whenever a new reference entity record is created in the PIM.*

* Message ID: `com.akeneo.pim.v1.reference-entity-record.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.reference_entity_record | object | - |
| data.reference_entity_record.reference_entity | object | - |
| data.reference_entity_record.reference_entity.code | string | identifier of a reference entity |
| data.reference_entity_record.code | string | Unique identifier of a reference entity record |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.reference-entity-record.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.reference-entity-record.created.schema.json",
  "data": {
    "reference_entity_record": {
      "code": "Addadas",
      "reference_entity": {
        "code": "brands"
      }
    }
  }
}
```

## com.akeneo.pim.v1.reference-entity-record.updated

*This event is generated whenever an existing reference entity record is modified in the PIM.*

* Message ID: `com.akeneo.pim.v1.reference-entity-record.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

The event is triggered when any changes are made to the record values.

### Payload

| Name | Type | Description |
|---|---|---|
| data.reference_entity_record | object | - |
| data.reference_entity_record.reference_entity | object | - |
| data.reference_entity_record.reference_entity.code | string | identifier of a reference entity |
| data.reference_entity_record.code | string | Unique identifier of a reference entity record |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.reference-entity-record.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.reference-entity-record.updated.schema.json",
  "data": {
    "reference_entity_record": {
      "code": "Addadas",
      "reference_entity": {
        "code": "brands"
      }
    }
  }
}
```

## com.akeneo.pim.v1.reference-entity-record.deleted

*This event is generated whenever a reference entity record is deleted from the PIM.*

* Message ID: `com.akeneo.pim.v1.reference-entity-record.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description |
|---|---|---|
| data.reference_entity_record | object | - |
| data.reference_entity_record.reference_entity | object | - |
| data.reference_entity_record.reference_entity.code | string | identifier of a reference entity |
| data.reference_entity_record.code | string | Unique identifier of a reference entity record |

> Example of payload

```json [snippet:Payload]


{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.reference-entity-record.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://events.akeneo.com/com.akeneo.pim.v1.reference-entity-record.deleted.schema.json",
  "data": {
    "reference_entity_record": {
      "code": "Addadas",
      "reference_entity": {
        "code": "brands"
      }
    }
  }
}
```

::: panel-link Let's check the requirements [Next](/event-platform/integration-examples.html)
:::
