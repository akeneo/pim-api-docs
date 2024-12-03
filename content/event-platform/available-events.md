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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.app.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.app.deleted.schema.json",
  "data": {
    "app": {
      "client_id": "test_client_id"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.asset.created",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.asset.created.schema.json",
  "data": {
    "asset": {
      "asset_family": {
        "code": "family1"
      },
      "code": "asset1"
    },
    "author": {
      "identifier": "401ad939-cd20-4343-8b61-3348a53feb4f",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.asset.updated",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.asset.updated.schema.json",
  "data": {
    "asset": {
      "asset_family": {
        "code": "family1"
      },
      "code": "asset1"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.asset.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.asset.deleted.schema.json",
  "data": {
    "asset": {
      "asset_family": {
        "code": "family1"
      },
      "code": "asset1"
    },
    "author": {
      "identifier": "401ad939-cd20-4343-8b61-3348a53feb4f",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute.created",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute.created.schema.json",
  "data": {
    "attribute": {
      "code": "an-attribute-code"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute.updated",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute.updated.schema.json",
  "data": {
    "attribute": {
      "code": "an-attribute-code"
    },
    "author": {
      "identifier": "401ad939-cd20-4343-8b61-3348a53feb4f",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute.deleted.schema.json",
  "data": {
    "attribute": {
      "code": "an-attribute-code"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute-group.created",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute-group.created.schema.json",
  "data": {
    "attribute_group": {
      "code": "an-attribute-group-code"
    },
    "author": {
      "identifier": "admin",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute-group.updated",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute-group.updated.schema.json",
  "data": {
    "attribute_group": {
      "code": "an-attribute-group-code"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.attribute-group.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.attribute-group.deleted.schema.json",
  "data": {
    "attribute_group": {
      "code": "an_attribute_group_code"
    },
    "author": {
      "identifier": "the-connection-code",
      "type": "api"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.attribute-option.created",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.reference-entity-record.created.schema.json",
  "data": {
    "attribute_option": {
      "code": "an_attribute_option_code",
      "attribute": {
        "code": "an_attribute_code"
      }
    },
    "author": {
      "identifier": "5_xxxk00ufn688cc0gok0wwwxxxccc0g84cwwgkg4s00ow4oxxx",
      "type": "api"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.attribute-option.updated",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.reference-entity-record.updated.schema.json",
  "data": {
    "attribute_option": {
      "code": "an_attribute_option_code",
      "attribute": {
        "code": "an_attribute_code"
      }
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.attribute-option.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.reference-entity-record.updated.schema.json",
  "data": {
    "attribute_option": {
      "code": "an_attribute_option_code",
      "attribute": {
        "code": "an_attribute_code"
      }
    },
    "author": {
      "identifier": "system",
      "type": "system"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.category.created",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.category.created.schema.json",
  "data": {
    "category": {
      "code": "category-1"
    },
    "author": {
      "identifier": "the-app-client-id",
      "type": "api"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.category.updated",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.category.updated.schema.json",
  "data": {
    "category": {
      "code": "category-1"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.category.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.category.deleted.schema.json",
  "data": {
    "category": {
      "code": "category-1"
    },
    "author": {
      "identifier": "the-app-client-id",
      "type": "api"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.connection.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.connection.deleted.schema.json",
  "data": {
    "connection": {
      "client_id": "connection-client-id"
    },
    "author": {
      "identifier": "the-connection-code",
      "type": "api"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.product.created",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.created.schema.json",
  "data": {
    "product": {
      "uuid": "6a9f8486-2c36-4680-b87f-6f5f8f01b6cf"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

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

## com.akeneo.pim.v1.product.updated.delta

*This event is generated whenever an existing product is modified in the PIM.*

* Message ID: `com.akeneo.pim.v1.product.updated.delta`
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

<details>
  <summary style="cursor: pointer;">Click here to expand the payload details</summary>

| Name | Type | Description |
  |---|---|---|
| data.product | object | - |
| data.product.uuid | string | Unique identifier of a Product in the PIM. |
| data.product.updated_at | any | - |
| data.product.changes | object | Details about the changes made to the product. |
| data.product.changes.enabled | object | - |
| data.product.changes.enabled.previous | boolean | - |
| data.product.changes.enabled.new | boolean | - |
| data.product.changes.categories | object | - |
| data.product.changes.categories.added | array&lt;string&gt; | - |
| data.product.changes.categories.added (single item) | string | - |
| data.product.changes.categories.removed | array&lt;string&gt; | - |
| data.product.changes.categories.removed (single item) | string | - |
| data.product.changes.family | object | - |
| data.product.changes.family.previous | string \| null | - |
| data.product.changes.family.new | string \| null | - |
| data.product.changes.groups | object | - |
| data.product.changes.groups.added | array&lt;string&gt; | - |
| data.product.changes.groups.added (single item) | string | - |
| data.product.changes.groups.removed | array&lt;string&gt; | - |
| data.product.changes.groups.removed (single item) | string | - |
| data.product.changes.parent | object | - |
| data.product.changes.parent.previous | string \| null | - |
| data.product.changes.parent.new | string \| null | - |
| data.product.changes.associations | object | - |
| data.product.changes.associations (additional properties) | object | - |
| data.product.changes.associations.added | object | - |
| data.product.changes.associations.added.products | array&lt;string&gt; | - |
| data.product.changes.associations.added.products (single item) | string | - |
| data.product.changes.associations.added.productModels | array&lt;string&gt; | - |
| data.product.changes.associations.added.productModels (single item) | string | - |
| data.product.changes.associations.removed | object | - |
| data.product.changes.associations.removed.products | array&lt;string&gt; | - |
| data.product.changes.associations.removed.products (single item) | string | - |
| data.product.changes.associations.removed.productModels | array&lt;string&gt; | - |
| data.product.changes.associations.removed.productModels (single item) | string | - |
| data.product.changes.quantified_associations | object | - |
| data.product.changes.quantified_associations (additional properties) | object | - |
| data.product.changes.quantified_associations.added | object | - |
| data.product.changes.quantified_associations.added.products | array&lt;object&gt; | - |
| data.product.changes.quantified_associations.added.products.uuid | string | - |
| data.product.changes.quantified_associations.added.products.quantity | number | - |
| data.product.changes.quantified_associations.added.productModels | array&lt;object&gt; | - |
| data.product.changes.quantified_associations.added.productModels.code | string | - |
| data.product.changes.quantified_associations.added.productModels.quantity | number | - |
| data.product.changes.quantified_associations.removed | object | - |
| data.product.changes.quantified_associations.removed.products | array&lt;string&gt; | - |
| data.product.changes.quantified_associations.removed.products (single item) | string | - |
| data.product.changes.quantified_associations.removed.productModels | array&lt;string&gt; | - |
| data.product.changes.quantified_associations.removed.productModels (single item) | string | - |
| data.product.changes.values | object | - |
| data.product.changes.values (additional properties) | array&lt;object&gt; | - |
| data.product.changes.values.previous | string \| number | - |
| data.product.changes.values.new | string \| number | - |
| data.product.changes.values.type | string | - |
| data.product.changes.values.locale | string \| null | - |
| data.product.changes.values.scope | string \| null | - |
| data.product.changes.table_attributes | object | Changes to table attributes. |
| data.product.changes.table_attributes.added | array&lt;object&gt; | - |
| data.product.changes.table_attributes.added (single item) | object | - |
| data.product.changes.table_attributes.removed | array&lt;object&gt; | - |
| data.product.changes.table_attributes.removed (single item) | object | - |
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author. |

</details>


<details>
  <summary style="cursor: pointer;">Click here to expand the payload example</summary>

  > Example of payload
  ```json [snippet:Example]
  {
    "specversion": "1.0",
    "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
    "type": "com.akeneo.pim.v1.product.updated.delta",
    "source": "pim",
    "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
    "time": "2024-02-22T17:31:00Z",
    "datacontenttype": "application/json",
    "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.updated.delta.schema.json",
    "data": {
      "product": {
        "uuid": "6a9f8486-2c36-4680-b87f-6f5f8f01b6cf",
        "updated_at": {
          "date": "2024-10-14 13:01:21.000000",
          "timezone": "UTC"
        },
        "changes": {
          "enabled": {
            "previous": true,
            "new": false
          },
          "categories": {
            "added": [
              "added_category_code_1",
              "added_category_code_2"
            ],
            "removed": [
              "removed_category_code_1",
              "removed_category_code_2"
            ]
          },
          "family": {
            "previous": "the_previous_family_code",
            "new": "the_new_family_code"
          },
          "groups": {
            "added": [
              "added_group_code_1",
              "added_group_code_2"
            ],
            "removed": [
              "removed_group_code_1",
              "_removed_group_code_2"
            ]
          },
          "parent": {
            "previous": "the_previous_parent_code",
            "new": "the_new_parent_code"
          },
          "values": {
            "an_added_attribute": [
              {
                "previous": null,
                "new": "new_data",
                "type": "an_attribute_type",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "an_updated_attribute": [
              {
                "previous": "previous_data",
                "new": "new_data",
                "type": "an_attribute_type",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_removed_attribute": [
              {
                "previous": "previous_data",
                "new": null,
                "type": "an_attribute_type",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "an_attribute_with_value_by_locale": [
              {
                "previous": "previous_data_for_a_locale",
                "new": "new_data_for_a_locale",
                "type": "an_attribute_type",
                "locale": "a_locale",
                "scope": "a_scope"
              },
              {
                "previous": "previous_data_for_another_locale",
                "new": "new_data_for_another_locale",
                "type": "an_attribute_type",
                "locale": "another_locale",
                "scope": "a_scope"
              }
            ],
            "an_attribute_with_value_by_scope": [
              {
                "previous": "previous_data_for_a_scope",
                "new": "new_data_for_a_scope",
                "type": "an_attribute_type",
                "locale": "a_locale",
                "scope": "a_scope"
              },
              {
                "previous": "previous_data_for_another_scope",
                "new": "new_data_for_another_scope",
                "type": "an_attribute_type",
                "locale": "a_locale",
                "scope": "another_scope"
              }
            ],
            "a_pim_catalog_text_attribute": [
              {
                "previous": "previous_data",
                "new": "new_data",
                "type": "pim_catalog_text",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_pim_catalog_textarea_attribute": [
              {
                "previous": "previous_data",
                "new": "new_data",
                "type": "pim_catalog_textarea",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_pim_catalog_file_attribute": [
              {
                "previous": {
                  "file_name": "old_file.json",
                  "key": "0/e/f/9/0ef94f3e2e8133df2d37dc1e9c88615629707ede_old_file.json"
                },
                "new": {
                  "file_name": "new_file.json",
                  "key": "0/e/f/9/0ef94f3e2e8133df2d37dc1e9c88615629707ede_new_file.json"
                },
                "type": "pim_catalog_file",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_pim_catalog_image_attribute": [
              {
                "previous": {
                  "file_name": "old_pic.jpg",
                  "key": "0/e/f/9/0ef94f3e2e8133df2d37dc1e9c88615629707ede_old_pic.jpg"
                },
                "new": {
                  "file_name": "new_pic.jpg",
                  "key": "0/e/f/9/0ef94f3e2e8133df2d37dc1e9c88615629707ede_new_pic.jpg"
                },
                "type": "pim_catalog_image",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_pim_catalog_number_attribute": [
              {
                "previous": 0,
                "new": 2,
                "type": "pim_catalog_number",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_pim_catalog_metric_attribute": [
              {
                "previous": {
                  "data": "previous_data",
                  "unit": "a_unit",
                  "base_data": "previous_based_data",
                  "base_unit": "a_based_unit",
                  "family": "a_family"
                },
                "new": {
                  "data": "new_data",
                  "unit": "a_unit",
                  "base_data": "new_based_data",
                  "base_unit": "a_based_unit"
                },
                "type": "pim_catalog_metric",
                "locale": "a_locale",
                "scope": "a_scope",
                "family": "a_family"
              }
            ],
            "a_pim_catalog_price_attribute": [
              {
                "previous": {
                  "amount": "a_price",
                  "currency": "a_currency"
                },
                "new": {
                  "amount": "another_price",
                  "currency": "a_currency"
                },
                "type": "pim_catalog_price",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_pim_catalog_boolean_attribute": [
              {
                "previous": true,
                "new": false,
                "type": "pim_catalog_boolean",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_pim_catalog_date_attribute": [
              {
                "previous": {
                  "date": "2024-01-01 00:00:00.000000",
                  "timezone": "+00.00"
                },
                "new": {
                  "date": "2024-01-02 00:00:00.000000",
                  "timezone": "+00.00"
                },
                "type": "pim_catalog_date",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "an_identifier_attribute": [
              {
                "previous": {
                  "data": "previous_data",
                  "is_main_identifier": false
                },
                "new": {
                  "data": "new_data",
                  "is_main_identifier": true
                },
                "type": "pim_catalog_identifier",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_simple_select_attribute": [
              {
                "previous": "previous_data",
                "new": "new_data",
                "type": "pim_catalog_simpleselect",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_multi_select_attribute": [
              {
                "previous": [
                  "value_1",
                  "value_2"
                ],
                "new": [
                  "value_1",
                  "value_3"
                ],
                "type": "pim_catalog_multiselect",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "a_pim_catalog_table_attribute": [
              {
                "previous": {
                  "rows": [
                    {
                      "cells": [
                        {
                          "cell": "cell_1_of_row_1",
                          "data": "data_of_cell_1_of_row_1"
                        },
                        {
                          "cell": "cell_2_of_row_1",
                          "data": "data_of_cell_2_of_row_1"
                        }
                      ]
                    },
                    {
                      "cells": [
                        {
                          "cell": "cell_1_of_row_2",
                          "data": "data_of_cell_1_of_row_2"
                        },
                        {
                          "cell": "cell_2_of_row_2",
                          "data": "data_of_cell_2_of_row_2"
                        }
                      ]
                    }
                  ]
                },
                "new": {
                  "rows": [
                    {
                      "cells": [
                        {
                          "cell": "cell_1_of_row_1",
                          "data": "data_of_cell_1_of_row_1"
                        },
                        {
                          "cell": "cell_2_of_row_1",
                          "data": "data_of_cell_2_of_row_1"
                        }
                      ]
                    },
                    {
                      "cells": [
                        {
                          "cell": "cell_1_of_row_2",
                          "data": "data_of_cell_1_of_row_2"
                        },
                        {
                          "cell": "cell_2_of_row_2",
                          "data": "data_of_cell_2_of_row_2"
                        }
                      ]
                    },
                    {
                      "cells": [
                        {
                          "cell": "cell_1_of_row_3",
                          "data": "data_of_cell_1_of_row_3"
                        },
                        {
                          "cell": "cell_2_of_row_3",
                          "data": "data_of_cell_2_of_row_3"
                        }
                      ]
                    }
                  ]
                },
                "type": "pim_catalog_table",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "an_asset_collection_attribute": [
              {
                "previous": [
                  "asset_code_1",
                  "asset_code_2"
                ],
                "new": [
                  "asset_code_1",
                  "asset_code_3"
                ],
                "type": "pim_catalog_asset_collection",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "an_akeneo_reference_entity_attribute": [
              {
                "previous": "previous_reference_entity_code",
                "new": "new_reference_entity_code",
                "type": "akeneo_reference_entity",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ],
            "an_akeneo_reference_entity_collection_attribute": [
              {
                "previous": [
                  "reference_entity_record_code_1",
                  "reference_entity_record_code_2"
                ],
                "new": [
                  "reference_entity_record_code_1",
                  "reference_entity_record_code_3"
                ],
                "type": "akeneo_reference_entity_collection",
                "locale": "a_locale",
                "scope": "a_scope"
              }
            ]
          },
          "associations": {
            "an_association_type_code": {
              "added": {
                "products": [
                  "a_product_uuid_1",
                  "a_product_uuid_2"
                ],
                "product_models": [
                  "a_product_model_1",
                  "a_product_model_2"
                ],
                "groups": [
                  "an_association_group_1",
                  "an_association_group_2"
                ]
              },
              "removed": {
                "products": [
                  "a_product_uuid_1",
                  "a_product_uuid_2"
                ],
                "product_models": [
                  "a_product_model_1",
                  "a_product_model_2"
                ],
                "groups": [
                  "an_association_group_1",
                  "an_association_group_2"
                ]
              }
            },
            "another_association_type_code": {
              "added": {
                "products": [
                  "a_product_uuid_1",
                  "a_product_uuid_2"
                ],
                "product_models": [
                  "a_product_model_1",
                  "a_product_model_2"
                ],
                "groups": [
                  "an_association_group_1",
                  "an_association_group_2"
                ]
              },
              "removed": {
                "products": [
                  "a_product_uuid_1",
                  "a_product_uuid_2"
                ],
                "product_models": [
                  "a_product_model_1",
                  "a_product_model_2"
                ],
                "groups": [
                  "an_association_group_1",
                  "an_association_group_2"
                ]
              }
            }
          },
          "quantified_associations": {
            "an_association_type_code": {
              "added": {
                "products": [
                  {
                    "uuid": "an_added_product_uuid",
                    "quantity": 1
                  },
                  {
                    "uuid": "another_added_product_uuid",
                    "quantity": 2
                  }
                ],
                "product_models": [
                  {
                    "code": "an_added_product_model_code",
                    "quantity": 3
                  },
                  {
                    "uuid": "another_added_product_model_code",
                    "quantity": 4
                  }
                ]
              },
              "removed": {
                "products": [
                  "a_product_uuid_1",
                  "a_product_uuid_2"
                ],
                "product_models": [
                  "a_product_model_code",
                  "another_product_model_code"
                ]
              }
            },
            "another_association_type_code": {
              "added": {
                "products": [
                  {
                    "uuid": "an_added_product_uuid",
                    "quantity": 1
                  },
                  {
                    "uuid": "another_added_product_uuid",
                    "quantity": 2
                  }
                ],
                "product_models": [
                  {
                    "code": "an_added_product_model_code",
                    "quantity": 3
                  },
                  {
                    "uuid": "another_added_product_model_code",
                    "quantity": 4
                  }
                ]
              },
              "removed": {
                "products": [
                  "a_product_uuid_1",
                  "a_product_uuid_2"
                ],
                "product_models": [
                  "a_product_model_code",
                  "another_product_model_code"
                ]
              }
            }
          }
        }
      },
      "author": {
        "identifier": "julia",
        "type": "user"
      }
    }
  }
  ```
</details> 

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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.product.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product.deleted.schema.json",
  "data": {
    "product": {
      "uuid": "6a9f8486-2c36-4680-b87f-6f5f8f01b6cf"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.product-model.created",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product-model.created.schema.json",
  "data": {
    "product_model": {
      "code": "a-product-model-code"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.product-model.updated",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product-model.updated.schema.json",
  "data": {
    "product_model": {
      "code": "a-product-model-code"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "b6f4add4-f3d1-4502-8cf0-0f228e054ce5",
  "type": "com.akeneo.pim.v1.product-model.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-10T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.product-model.deleted.schema.json",
  "data": {
    "product_model": {
      "code": "a-product-model-code"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.family.created",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.family.created.schema.json",
  "data": {
    "family": {
      "code": "a_family_code"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.family.updated",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.family.updated.schema.json",
  "data": {
    "family": {
      "code": "a_family_code"
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "018e32f9-dfe4-760e-a273-5da1c089dfdb",
  "type": "com.akeneo.pim.v1.family.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-02-22T17:31:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.family.deleted.schema.json",
  "data": {
    "family": {
      "code": "a_family_code"
    },
    "author": {
      "identifier": "2e7b105e-3528-4bf7-8e83-678ec2cde0f0",
      "type": "api"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.reference-entity-record.created",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.reference-entity-record.created.schema.json",
  "data": {
    "reference_entity_record": {
      "code": "Addadas",
      "reference_entity": {
        "code": "brands"
      }
    },
    "author": {
      "identifier": "4546f4b1-3e3c-4494-bbd4-aae185115a6a",
      "type": "user"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.reference-entity-record.updated",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.reference-entity-record.updated.schema.json",
  "data": {
    "reference_entity_record": {
      "code": "Addadas",
      "reference_entity": {
        "code": "brands"
      }
    },
    "author": {
      "identifier": "system",
      "type": "system"
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
| data.author | object | - |
| data.author.identifier | string | Identifier of the author. |
| data.author.type | string | Type of the author (`user`, `api` or `system`). |

> Example of payload


```json [snippet:Payload]

{
  "specversion": "1.0",
  "id": "6e523497-8231-4892-8f9f-895378b4d045",
  "type": "com.akeneo.pim.v1.reference-entity-record.deleted",
  "source": "pim",
  "subject": "019256aa-7f77-7f58-bc8c-770f7e369c5b",
  "time": "2024-06-13T10:17:00Z",
  "datacontenttype": "application/json",
  "dataschema": "https://event.prd.sdk.akeneo.cloud/spec/com.akeneo.pim.v1.reference-entity-record.deleted.schema.json",
  "data": {
    "reference_entity_record": {
      "code": "Addadas",
      "reference_entity": {
        "code": "brands"
      }
    },
    "author": {
      "identifier": "b238e9f7-fcec-45bd-9431-d43cd624b244",
      "type": "user"
    }
  }
}
```


::: panel-link Let's check the requirements [Next](/event-platform/integration-examples.html)
:::
