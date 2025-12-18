# Response codes

_All the responses you can get when requesting via the REST API_

## Client errors

There are several types of errors when requesting via the REST API.

### 400 error
Sending malformed data results in a `400 Bad Request` response.

#### Example
```http
HTTP/1.1 400 Bad Request

{
    "code": 400,
    "message": "Invalid json message received"
}
```

As JSON format is expected in all POST and PATCH requests, you will get this error response when your JSON body is malformed.
For example, these are malformed JSON.

A comma is missing.
```json
{
    "code": "myproduct"
    "family": "myfamily"
}
```

There are missing quotes for the `code` property.
```json
{
    code: "myproduct",
    "family": "myfamily"
}
```

Below is the good format. Just perfect. Don't move a single comma. ;)
```json
{
    "code": "myproduct",
    "family": "myfamily"
}
```

### 401 error
Trying to access to the REST API without authentication results in a `401 Unauthorized` response.

#### Example
```http
HTTP/1.1 401 Unauthorized

{
    "code": 401,
    "message": "Authentication is required"
}
```

#### Classical mistakes
The authorization header with the authentication token is missing.
```bash
curl https://demo.akeneo.com/api/rest/v1/categories
```

Try `Bearer` instead of `Basic` as a keyword before your authentication token.
```bash
curl https://demo.akeneo.com/api/rest/v1/categories \
    -H "Authorization: Basic NzFiYTM4ZTEwMjcwZTcyZWIzZTA0NmY3NjE3MTIyMjM1Y2NlMmNlNWEyMTAzY2UzYmY0YWIxYmUzNTkyMDcyNQ"
```

:::info
You are experiencing this kind of error and the examples given here did not help you?  
Take a look at the [authentication](/documentation/authentication.html) documentation. This might save your day!
:::

### 403 error
Trying to perform an action without having the corresponding ACL results in a `403 Forbidden` response.

#### Example
```http
HTTP/1.1 403 Forbidden

{
    "code": 403,
    "message": "Access forbidden. You are not allowed to administrate categories."
}
```

:::info
You are experiencing this kind of error and you do not know how to solve it?
Take a look at the [permissions](/documentation/permissions.html) documentation. This might save your day!
:::

:::warning
In some specific cases, a `403 Forbidden` response may also be returned when the platform determines that the request cannot be processed due to operational constraints. If you encounter this error, consider reducing the scope of your request by sending fewer items per batch or splitting your data into smaller operations.
:::

### 404 error
Trying to access to a non-existing resource results in a `404 Not Found` response.

#### Example
```http
HTTP/1.1 404 Not Found

{
    "code": 404, 
    "message": "Category 'master' does not exist."
}
```

### 405 error
Trying to use a method on a route for which it is not implemented results in a `405 Method Not Allowed` response.

#### Example
```http
HTTP/1.1 405 Method Not Allowed

{
    "code": 405, 
    "message": "No route found for 'POST /api/rest/v1/products-uuid/f62190e8-8314-4360-8ff8-7dbdb4af6312': Method Not Allowed (Allow: GET, PATCH, DELETE)"
}
```

### 406 error
Trying to give the `Accept` header a value different from `application/json` when getting data, results in a `406 Not Acceptable` response.

#### Example
```http
HTTP/1.1 406 Not Acceptable

{
    "code": 406, 
    "message": "‘xxx’ in ‘Accept‘ header is not valid. Only ‘application/json‘ is allowed."
}
```

### 409 error
When a request could not be processed because of conflict, it results in a `409 Conflict` error.

#### Example
```http
HTTP/1.1 409 Conflict
```

### 413 error
Sending too many resources at once or a payload that is too large results in a `413 Request Entity Too Large` response.

#### Example
```http
HTTP/1.1 413 Request Entity Too Large

{
    "code": 413,
    "message": "Too many resources to process, 100 is the maximum allowed."
}
```

:::info
The API limits batch operations to a maximum of 100 items per request. Additionally, individual JSON lines cannot exceed 1,000,000 characters. If you need to process more data, please split your requests into smaller batches.
:::

:::warning
Note that in some cases, operational constraints may result in a `403 Forbidden` error instead of `413`. See the [403 error](#403-error) section above for more details.
:::

### 415 error
Trying to give the `Content-type` header a value different from `application/json` when posting or patching data, results in a `415 Unsupported Media Type` response.

#### Example
```http
HTTP/1.1 415 Unsupported Media Type

{
  "code": 415,
  "message": "'xxx' in 'Content-type' header is not valid.  Only 'application/json' is allowed."
}
```

Forgetting to give the `Content-type` header when posting or patching data, also results in a `415 Unsupported Media Type` response.

#### Example
```http
HTTP/1.1 415 Unsupported Media Type

{
  "code": 415,
  "message":"The 'Content-type' header is missing. 'application/json' has to specified as value."
}
```

### 422 error
Sending invalid data results in a `422 Unprocessable Entity` response.

#### Example
```http
HTTP/1.1 422 Unprocessable Entity

{
    "code": 422,
    "message": "Validation failed.",
    "errors": [
        {
            "property": "values",
            "message": "The tommh value is not in the brand attribute option list.",
            "attribute": "brand",
            "locale": null,
            "scope": null
        }
    ]
}
```

Sending unrecognized properties as well.

#### Example
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

Or, sending unknown data. 

#### Example
```http
HTTP/1.1 422 Unprocessable Entity

{
    "code": 422,
    "message": "The sunglasses category does not exist in your PIM. Check the expected format on the API documentation.",
    "_links": {
        "documentation": {
            "href": "http://api.akeneo.com/api-reference.html#post_products_uuid"
        }
    }
}
```

### 429 error
Abusing the API will result in `429 Too Many Requests` response.
A Retry-After header is added to the response indicating the time to wait in seconds before retrying.

#### Example
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 15
```

::: tips
When the REST API answers that something `does not exist`, it could also mean that the related user hasn't the permission to access it.
:::

## Success

There are 3 types of client success when requesting via the REST API.

### 200 success
Getting a resource or a collection resources results in a `200 OK` response.

#### Example
```http
HTTP/1.1 200 OK
```

### 201 success
Creating a resource results in a `201 Created` response. In the `Location` header, you will find the route to access the newly created resource.

#### Example
```http
HTTP/1.1 201 Created
Location: https://demo.akeneo.com/api/rest/v1/categories/winter
```

### 204 success
Updating or deleting a resource results in a `204 No Content` response. In the `Location` header, you will find the route to access the updated resource.

#### Example
```http
HTTP/1.1 204 No Content
Location: https://demo.akeneo.com/api/rest/v1/categories/summer
```
