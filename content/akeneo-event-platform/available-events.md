# Available events

## com.akeneo.pim.v1.app.deleted

*Sent when an App is deleted from the PIM*

* Message ID: `com.akeneo.pim.v1.app.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.app | object | - | **required**, **additional properties are allowed** |
| data.app.client_id | string | Unique identifier of an App in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.app.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.app.deleted.schema.json",
  "data": {
    "app": {
      "client_id": "test_client_id"
    }
  }
}
```

## com.akeneo.pim.v1.attribute.deleted

*Sent when an attribute is deleted from the PIM*

* Message ID: `com.akeneo.pim.v1.attribute.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.attribute | object | - | **required**, **additional properties are allowed** |
| data.attribute.code | string | Unique identifier of an Attribute in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.attribute.deleted.schema.json",
  "data": {
    "attribute": {
      "code": "an-attribute-code"
    }
  }
}
```

## com.akeneo.pim.v1.attribute.updated

*Sent when an attribute is updated from the PIM*

* Message ID: `com.akeneo.pim.v1.attribute.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

The modifications that can lead to this event include changes to the following properties:

- **Labels**: Modifying the attribute's name in different locales.
- **Sort Order**: Adjusting the order in which the attribute appears.
- **Available Locales**: Changing the locales in which the attribute is available.
- **Usable as Grid Filter**: Toggling the attribute's availability as a filter in the product grid.
- **Max Characters**: Altering the maximum character length allowed for the attribute.
- **Validation Rule**: Updating the rules applied for attribute validation.
- **Validation Regexp**: Changing the regular expression used for validating the attribute.
- **WYSIWYG Enabled**: Enabling or disabling the WYSIWYG editor for the attribute.
- **Number Min/Max**: Setting new minimum or maximum values for numeric attributes.
- **Decimals Allowed**: Enabling or disabling the allowance of decimals in numeric attributes.
- **Negative Allowed**: Toggling the allowance of negative values for numeric attributes.
- **Default Metric Unit**: Changing the default unit of measurement for metric attributes.
- **Date Min/Max**: Adjusting the earliest and latest allowed dates for date attributes.
- **Allowed Extensions**: Modifying the file extensions allowed for file-type attributes.
- **Max File Size**: Changing the maximum file size allowed for file-type attributes.
- **Reference Data Name**: Updating the reference data associated with the attribute.
- **Default Value**: Setting or changing the default value for the attribute.
- **Table Configuration**: Altering the configuration of tables associated with the attribute.
- **Is Main Identifier**: Marking or unmarking the attribute as the main identifier for a product.

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.attribute | object | - | **required**, **additional properties are allowed** |
| data.attribute.code | string | Unique identifier of an Attribute in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.attribute.updated.schema.json",
  "data": {
    "attribute": {
      "code": "an-attribute-code"
    }
  }
}
```

## com.akeneo.pim.v1.attribute-group.updated

*Sent when an attribute group is updated from the PIM*

* Message ID: `com.akeneo.pim.v1.attribute-group.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.attribute_group | object | - | **required**, **additional properties are allowed** |
| data.attribute_group.code | string | Unique identifier of an Attribute Group in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute-group.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.attribute-group.updated.schema.json",
  "data": {
    "attribute_group": {
      "code": "an-attribute-group-code"
    }
  }
}
```

## com.akeneo.pim.v1.attribute-group.deleted

*Sent when an attribute group is deleted from the PIM*

* Message ID: `com.akeneo.pim.v1.attribute-group.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.attribute_group | object | - | **required**, **additional properties are allowed** |
| data.attribute_group.code | string | Unique identifier of an Attribute Group in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute-group.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.attribute-group.deleted.schema.json",
  "data": {
    "attribute_group": {
      "code": "an_attribute_group_code"
    }
  }
}
```

## com.akeneo.pim.v1.product.created

*Sent when a product is created in the PIM*

* Message ID: `com.akeneo.pim.v1.product.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

The following actions can trigger a product creation event:

- Product creation from the product page.
- Product creation using the REST API.
- Product creation within the rules engine.
- Product creation within workflows.
- Product creation via a tailored import.

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.product | object | - | **required**, **additional properties are allowed** |
| data.product.uuid | string | Unique identifier of a Product in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.product.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.product.created.schema.json",
  "data": {
    "product": {
      "uuid": "6a9f8486-2c36-4680-b87f-6f5f8f01b6cf"
    }
  }
}
```

## com.akeneo.pim.v1.product.updated

*Sent when a product is updated in the PIM*

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

| Name | Type | Description | Notes |
|---|---|---|---|
| data.product | object | - | **required**, **additional properties are allowed** |
| data.product.uuid | string | Unique identifier of a Product in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.product.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.product.updated.schema.json",
  "data": {
    "product": {
      "uuid": "6a9f8486-2c36-4680-b87f-6f5f8f01b6cf"
    }
  }
}
```

## com.akeneo.pim.v1.product.deleted

*Sent when a product is deleted from the PIM*

* Message ID: `com.akeneo.pim.v1.product.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

The following actions can trigger a product deletion event:

- Product deletion from the product page.
- Product deletion using the REST API.
- Product deletion within the rules engine.
- Product deletion within workflows.
- Product deletion via a tailored import.

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.product | object | - | **required**, **additional properties are allowed** |
| data.product.uuid | string | Unique identifier of a Product in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.product.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.product.deleted.schema.json",
  "data": {
    "product": {
      "uuid": "6a9f8486-2c36-4680-b87f-6f5f8f01b6cf"
    }
  }
}
```

## com.akeneo.pim.v1.product-model.deleted

*Sent when a product model is deleted from the PIM*

* Message ID: `com.akeneo.pim.v1.product-model.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.product_model | object | - | **required**, **additional properties are allowed** |
| data.product_model.uuid | string | Unique identifier of a Product Model in the PIM. | - |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.product-model.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.product-model.deleted.schema.json",
  "data": {
    "product_model": {
      "code": "a-product-model-code"
    }
  }
}
```

## com.akeneo.pim.v1.product-model.created

*Sent when a product model is created from the PIM*

* Message ID: `com.akeneo.pim.v1.product-model.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.product | object | - | **additional properties are allowed** |
| data.product.code | string | Unique identifier of a Product Model in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.product-model.created",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.product.created.schema.json",
  "data": {
    "product_model": {
      "code": "a-product-model-code"
    }
  }
}
```

## com.akeneo.pim.v1.product-model.updated

*Sent when a product model is updated from the PIM*

* Message ID: `com.akeneo.pim.v1.product-model.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.product | object | - | **additional properties are allowed** |
| data.product.code | string | Unique identifier of a Product Model in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.product-model.updated",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.product.updated.schema.json",
  "data": {
    "product_model": {
      "code": "a-product-model-code"
    }
  }
}
```

## com.akeneo.pim.v1.connection.deleted

*Sent when a connection is deleted from the PIM*

* Message ID: `com.akeneo.pim.v1.connection.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.connection | object | - | **required**, **additional properties are allowed** |
| data.connection.client_id | string | Unique identifier of a connection in the PIM. | **required** |

> Example of payload


```json
{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.connection.deleted",
  "source": "pim",
  "subject": "srnt-whatever",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.sdk.akeneo.cloud/com.akeneo.pim.v1.connection.deleted.schema.json",
  "data": {
    "connection": {
      "code": "connection-code"
    }
  }
}
```

## com.akeneo.pim.v1.category.created

*Sent when a category is upserted from the PIM*

* Message ID: `com.akeneo.pim.v1.category.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.category | object | - | **required**, **additional properties are allowed** |
| data.category.code | string | Unique identifier of a category | **required** |

> Example of payload


```json
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

*Sent when a category is upserted from the PIM*

* Message ID: `com.akeneo.pim.v1.category.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.category | object | - | **required**, **additional properties are allowed** |
| data.category.code | string | Unique identifier of a category | **required** |

> Example of payload


```json
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

*Sent when a category is deleted from the PIM*

* Message ID: `com.akeneo.pim.v1.category.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.category | object | - | **required**, **additional properties are allowed** |
| data.category.code | string | Unique identifier of a category | **required** |

> Example of payload


```json
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

## com.akeneo.pim.v1.asset.created

*Sent when an asset is created from the PIM*

* Message ID: `com.akeneo.pim.v1.asset.created`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.asset | object | - | **required**, **additional properties are allowed** |
| data.asset.asset_family | object | - | **required**, **additional properties are allowed** |
| data.asset.asset_family.code | string | code of an asset family | **required** |
| data.asset.code | string | code of an asset | **required** |

> Example of payload


```json
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

*Sent when an asset is updated from the PIM*

* Message ID: `com.akeneo.pim.v1.asset.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.asset | object | - | **required**, **additional properties are allowed** |
| data.asset.asset_family | object | - | **required**, **additional properties are allowed** |
| data.asset.asset_family.code | string | code of an asset family | **required** |
| data.asset.code | string | code of an asset | **required** |

> Example of payload


```json
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

*Sent when an asset is deleted from the PIM*

* Message ID: `com.akeneo.pim.v1.asset.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.asset | object | - | **required**, **additional properties are allowed** |
| data.asset.asset_family | object | - | **required**, **additional properties are allowed** |
| data.asset.asset_family.code | string | identifier of an asset family | **required** |
| data.asset.code | string | code of an asset | **required** |

> Example of payload


```json
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

## com.akeneo.pim.v1.family.updated

*Sent when a family is updated from the PIM*

* Message ID: `com.akeneo.pim.v1.family.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.family | object | - | **required**, **additional properties are allowed** |
| data.family.code | string | code of a family | **required** |

> Example of payload


```json
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

*Sent when a family is deleted from the PIM*

* Message ID: `com.akeneo.pim.v1.family.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.family | object | - | **required**, **additional properties are allowed** |
| data.family.code | string | code of a family | **required** |

> Example of payload


```json
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

## com.akeneo.pim.v1.reference-entity-record.updated

*Sent when a referenceEntity record is upserted from the PIM*

* Message ID: `com.akeneo.pim.v1.reference-entity-record.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.reference_entity_record | object | - | **required**, **additional properties are allowed** |
| data.reference_entity_record.reference_entity | object | - | **required**, **additional properties are allowed** |
| data.reference_entity_record.reference_entity.code | string | identifier of a reference entity | **required** |
| data.reference_entity_record.code | string | Unique identifier of a reference entity record | **required** |

> Example of payload


```json
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

## com.akeneo.pim.v1.attribute-option.deleted

*Sent when an attribute option is deleted from the PIM*

* Message ID: `com.akeneo.pim.v1.attribute-option.deleted`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.attribute_option | object | - | **required**, **additional properties are allowed** |
| data.attribute_option.code | string | code of an attribute option | **required** |
| data.attribute_option.attribute | object | - | **required**, **additional properties are allowed** |
| data.attribute_option.attribute.code | string | code of an attribute | **required** |

> Example of payload


```json
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

## com.akeneo.pim.v1.attribute-option.updated

*Sent when an attribute option is updated from the PIM*

* Message ID: `com.akeneo.pim.v1.attribute-option.updated`
* Content type: [application/json](https://www.iana.org/assignments/media-types/application/json)

### Payload

| Name | Type | Description | Notes |
|---|---|---|---|
| data.attribute_option | object | - | **required**, **additional properties are allowed** |
| data.attribute_option.code | string | code of an attribute option | **required** |
| data.attribute_option.attribute | object | - | **required**, **additional properties are allowed** |
| data.attribute_option.attribute.code | string | code of an attribute | **required** |

> Example of payload


```json
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


