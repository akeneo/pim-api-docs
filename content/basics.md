# Basics

_All the essential things you need to know._

## Root of the API

The API offers a set of endpoints that can be reach via the following root URI.
```http
https://demo.akeneo.com/api/rest/v1
```

`https://demo.akeneo.com` is the host uri of the PIM you are trying to request via the API.

`v1` means that you want to use the first (and only) version of the API. All URI have to request explicitly this version. If you try to request another version of the API, you will receive a beautiful 404 error since there is only one version of the API for now.

## HTTP Verbs

For now, the API uses 4 HTTP verbs which are the following:

| Verb |  Use |
| ------ | ----------- |
| GET |   Fetch a resource or a collection of resources |
| POST | Add a new resource |
| PATCH | Partially update an existing resource. If it does not exist, it is created |
| DELETE | Delete an existing resource |

## Scope of the API

Below are the entities covered by the API:
 - Product,
 - Category,
 - Family,
 - Attribute,
 - Attribute option,
 - File,
 - Channel,
 - Locale.

You will find the complete reference of the endpoints available for each of these resources in the [reference API](/api-reference-index.html). You can also get the list of these endpoints by request, see [List of available endpoints](/documentation.html#list_of_available_endpoints).

:::warning
As these APIs are mainly designed to be used by connectors, Enterprise Edition permissions are not enforced for now, the same way there are not enforced in the connectors themselves.
:::

## List of available endpoints

By requesting the root URI of the API, you get the list of all available endpoints.

**Request example**
```http
GET /api/rest/v1 HTTP/1.1
Host: demo.akeneo.com
Content-Type: application/json
```


**Response example**
```json
{
  "host": "http://demo.akeneo.com",
  "authentication": {
    "fos_oauth_server_token": {
      "route": "/api/oauth/v1/token",
      "methods": [
        "POST"
      ]
    }
  },
  "routes": {
    "pim_api_family_list": {
      "route": "/api/rest/v1/families",
      "methods": [
        "GET"
      ]
    },
    "pim_api_family_get": {
      "route": "/api/rest/v1/families/{code}",
      "methods": [
        "GET"
      ]
    },
    "pim_api_family_create": {
      "route": "/api/rest/v1/families",
      "methods": [
        "POST"
      ]
    },
    "pim_api_family_partial_update": {
      "route": "/api/rest/v1/families/{code}",
      "methods": [
        "PATCH"
      ]
    },
    ...,
    "pim_api_product_delete": {
      "route": "/api/rest/v1/products/{code}",
      "methods": [
        "DELETE"
      ]
    }
  }
}
```

:::info
You do not need to be authenticate to access this URI.
:::


## Introducing the API reference

_You want to dig deeper into the API and know every inch of the API?_

We have crafted a complete reference of our API. So feel free to browse it.

There, you will find for each available endpoint, a description of what it does, what are the parameters expected in the request and what are the different responses you will be able to get, being successes or errors.

::: panel-link I wanna have a look at it! [Let's go!](api-reference.html)
:::



