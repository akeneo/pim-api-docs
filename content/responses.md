# Response codes

_All the responses you can get when requesting via the API_

## Client errors

There are several types of errors when requesting via the API.

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

:::: dodont
::: dont A comma is missing.
```json
{
    "code": "myproduct"
    "family": "myfamily"
}
```
:::
::: dont There are missing quotes for the `code` property.
```json
{
    code: "myproduct",
    "family": "myfamily"
}
```
:::

::: do Just perfect. Don't move a single comma.
```json
{
    "code": "myproduct",
    "family": "myfamily"
}
```
:::
::::

### 401 error
Trying to access to the API without authentication results in a `401 Unauthorized` response.

#### Example
```http
HTTP/1.1 401 Unauthorized

{
    "code": 401,
    "message": "Authentication is required"
}
```

#### Classical mistakes
:::: dodont
::: dont The authorization header with the authentication token is missing.
```bash
curl https://demo.akeneo.com/api/rest/v1/categories
```
:::
::: dont Try `Bearer` instead of `Basic` as a keyword before your authentication token
```bash
curl https://demo.akeneo.com/api/rest/v1/categories \
    -H "Authorization: Basic NzFiYTM4ZTEwMjcwZTcyZWIzZTA0NmY3NjE3MTIyMjM1Y2NlMmNlNWEyMTAzY2UzYmY0YWIxYmUzNTkyMDcyNQ"
```
:::
::::

:::info
You are experiencing this kind of error and the examples given here did not help you?

Take a look at the [authentication](/documentation.html#authentication-2) documentation. This might save your day! 
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

Take a look to the [authorization](/documentation.html#authorization) documentation. This might save your day! 
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
    "message": "No route found for 'POST /api/rest/v1/products/myproduct': Method Not Allowed (Allow: GET, PATCH, DELETE)"
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

### 415 error
Trying to give the `Content-type` header a value different from `application/json` when posting or patching data, results in a `415 Unsupported Media Type` response.

#### Example
```http
HTTP/1.1 415 Unsupported Media Type

{
  "code": 415,
  "message": "‘xxx’ in ‘Content-type’ header is not valid.  Only ‘application/json’ is allowed."
}
```

Forgetting to give the `Content-type` header when posting or patching data, also results in a `415 Unsupported Media Type` response.

#### Example
```http
HTTP/1.1 415 Unsupported Media Type

{
  "code": 415,
  "message":"The ‘Content-type’ header is missing. ‘application/json’ has to specified as value."
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
            "field": "code",
            "message": "This value should not be blank."
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

## Success

There are 3 types of client success when requesting via the API.

### 200 success
Getting a resource or a collection resources results in a `200 OK` response.

#### Example
```http
HTTP/1.1 200 OK
```

### 201 success
Creating a resource results in a `201 Created` response. In the `Location` header, you will find the route to access the newly created entity.

#### Example
```http
HTTP/1.1 201 Created
Location: https://demo.akeneo.com/api/rest/v1/categories/winter
```

### 204 success
Updating a resource results in a `204 No Content` response.

#### Example
```http
HTTP/1.1 204 No Content
```