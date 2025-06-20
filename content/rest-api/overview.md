# Overview

_All the essential things you need to know._

## Root of the REST API

The REST API offers a set of endpoints that can be reached via the following root URI.
```http
https://mysandbox.demo.cloud.akeneo.com/api/rest/v1
```

`https://mysandbox.demo.cloud.akeneo.com` is the host of the PIM you are trying to request via the REST API.

`v1` means that you want to use the first (and only) version of the REST API. All URIs have to explicitly request this version. If you try to request another version of the REST API, you will receive a beautiful 404 error since there is only one version of the REST API for now.

## Available HTTP Verbs

In the first version of the REST API, we use 4 HTTP verbs. They are the following.

| Verb |  Use |
| ------ | ----------- |
| GET |   Fetch a resource or a collection of resources |
| POST | Add a new resource |
| PATCH | Partially update an existing resource or a collection of resources. If a resource does not exist, it is created |
| DELETE | Delete an existing resource |

## Data format

[JSON](http://www.json.org/) is the only format supported by the REST API for now.

This means that data extracted thanks to the REST API will be in JSON format. And if you need to create or update data using the REST API, you will also need to use the JSON format.

For each entity, we have defined a standard format that is completely detailed in the [Concepts & resources](/concepts/introduction.html) section.

### Format headers
When creating and updating data via the REST API, you will need to explicitly tell the REST API that you are providing JSON content by using a `Content-type` header set to `application/json`.

#### Example
``` bash
curl -X PATCH /api/rest/v1/categories/mycategory \
  -H "Content-type: application/json" \
  -d '{
        "labels": {
          "en_US": "My amazing category"
        }
    }'
```

::: warning
This header is mandatory. If you forget it, you will get a 415 error with this message.
```http
HTTP/1.1 415 Unsupported media type

{
  "code": 415,
  "message":"The ‘Content-type’ header is missing. ‘application/json’ has to specified as value."
}
```
If it is set to any other value, you will also get a 415 error with this message.
```http
HTTP/1.1 415 Unsupported Media Type

{
  "code": 415,
  "message": "‘xxx’ in ‘Content-type’ header is not valid.  Only ‘application/json’ is allowed."
}
```
:::

When getting data from the PIM through the REST API, you can use an `Accept` header set to `application/json` to specify that you expect the REST API to return data in JSON format.

#### Example
``` bash
curl /api/rest/v1
  -H "Accept: application/json"
```

::: info
This header is not mandatory. If you forget it, you will still get a 200 response. However, if it is set to any other value, you will receive a 406 with this error message.
```http
HTTP/1.1 406 Not Acceptable

{
  "code": 406,
  "message": "‘xxx’ in ‘Accept‘ header is not valid. Only ‘application/json‘ is allowed."
}
```
:::

## Scope of the REST API

For each new PIM versions, we add more and more resources to our REST API scope.  
For a detailed presentation as well as the format of each of these resources, take a look to the [Concepts & resources](/concepts/introduction.html) documentation.

Also, you will find the complete reference of the endpoints available for each of these resources in the [REST API Reference](/api-reference-index.html). You can also get the list of these endpoints by request, see [List of available endpoints](/documentation/overview.html#list-of-available-endpoints).

## List of available endpoints

By requesting the root URI of the REST API, you get the list of all available endpoints.

#### Example

**Request**
```bash
curl /api/rest/v1
  -H "Accept: application/json"
```


**Response**
```http
HTTP/1.1 200 OK

{
  "host": "https://mysandbox.demo.cloud.akeneo.com",
  "authentication": {
    "fos_oauth_server_token": {
      "route": "/api/oauth/v1/token",
      "methods": ["POST"]
    }
  },
  "routes": {
    "pim_api_family_list": {
      "route": "/api/rest/v1/families",
      "methods": ["GET"]
    },
    "pim_api_family_get": {
      "route": "/api/rest/v1/families/{code}",
      "methods": ["GET"]
    },
    "pim_api_family_create": {
      "route": "/api/rest/v1/families",
      "methods": ["POST"]
    },
    "pim_api_family_partial_update": {
      "route": "/api/rest/v1/families/{code}",
      "methods": ["PATCH"]
    }, 
    "pim_api_product_delete": {
      "route": "/api/rest/v1/products-uuid/{uuid}",
      "methods": ["DELETE"]
    }
  }
}
```

:::info
You do not need to be authenticated to access this route.
:::


## Introducing the REST API reference

_You want to dig deeper and know every inch of the REST API?_

We have crafted a complete reference of our REST API. So feel free to browse it.

There, you will find for each available endpoint, a description of what it does, what are the expected parameters in the request and what are the different responses you will be able to get, being successes or errors.

::: panel-link I wanna take a look at the REST API reference! [Let's go!](/api-reference.html)
:::
