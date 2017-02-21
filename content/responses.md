# Response codes

## Client errors

There are 5 possible types of errors when requesting via the API. 

### 401 error
Trying to access to the API without authentication results in a `401 Unauthorized` response.

**Example**
```http
HTTP/1.1 401 Unauthorized

{
    "code": 401,
    "message": "Authentication is required"
}
```

:::info
You are experiencing this kind of error and you do not know how to solve it?

Have a look to the [authentication](/documentation.html#authentication) documentation. This might save your day! 
:::

### 403 error
Trying to perform an action without having the corresponding ACL results in a `403 Forbidden` response.

**Example**
```http
HTTP/1.1 403 Forbidden

{
    "code": 403,
    "message": "Access forbidden. You are not allowed to administrate categories."
}
```

:::info
You are experiencing this kind of error and you do not know how to solve it?

Have a look to the [authorization](/documentation.html#authorization) documentation. This might save your day! 
:::

### 400 error
Sending malformed data results in a `400 Bad Request` response.

**Example**
```http
HTTP/1.1 400 Bad Request

{
    "code": 400,
    "message": "JSON is not valid."
}
```


### 404 error
Trying to access to a non-existing resource results in a `404 Not Found` response.

**Example**
```http
HTTP/1.1 404 Not Found

{
    "code": 404, 
    "message": "Category 'master' does not exist."
}
```

### 422 error
Sending invalid data results in a `422 Unprocessable Entity` response.

**Example**
```http
HTTP/1.1 422 Unprocessable Entity

{
    "code": 422,
    "message": "Validation failed.",
    "errors": [
        {
            "field": "code",
            "message": "This value should not be blank."
        }
    ]
}
```

Sending unrecognized keys as well.

**Example**
```http
HTTP/1.1 422 Unprocessable Entity

{
    "code": 422,
    "message": "Property 'extra_property' does not exist. Check the standard format documentation.",
    "_links": {
        "documentation": {
            "href": "https://docs.akeneo.com/master/reference/standard_format/other_entities.html#category"
        }
    }
}
```

## Success

There are 3 possible types of client success when requesting via the API.

### 200 success
Getting a resource or a collection resources results in a `200 OK` response.

**Example**
```http
HTTP/1.1 200 OK
```

### 201 success
Creating a resource results in a `201 Created` response.

**Example**
```http
HTTP/1.1 201 Created
Location: https://demo.akeneo.com/api/rest/v1/categories/winter
```

### 204 success
Updating a resource results in a `204 No Content` response.

**Example**
```http
HTTP/1.1 204 No Content
Location: https://demo.akeneo.com/api/rest/v1/categories/winter
```