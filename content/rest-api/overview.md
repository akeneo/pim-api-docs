# Overview

_All the essential things you need to know._

## Root of the API

The API offers a set of endpoints that can be reached via the following root URI.
```http
https://demo.akeneo.com/api/rest/v1
```

`https://demo.akeneo.com` is the host of the PIM you are trying to request via the API.

`v1` means that you want to use the first (and only) version of the API. All URIs have to explicitly request this version. If you try to request another version of the API, you will receive a beautiful 404 error since there is only one version of the API for now.

## Available HTTP Verbs

In the first version of the API, we use 4 HTTP verbs. They are the following.

| Verb |  Use |
| ------ | ----------- |
| GET |   Fetch a resource or a collection of resources |
| POST | Add a new resource |
| PATCH | Partially update an existing resource or a collection of resources. If a resource does not exist, it is created |
| DELETE | Delete an existing resource |

## Data format

[JSON](http://www.json.org/) is the only format supported by the API for now.

This means that data extracted thanks to the API will be in JSON format. And if you need to create or update data using the API, you will also need to use the JSON format.

For each entity, we have defined a standard format that is completely detailed in the [Resources](/documentation/resources.html) section.

### Format headers
When creating and updating data via the API, you will need to explicitly tell the API that you are providing JSON content by using a `Content-type` header set to `application/json`.

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

When getting data from the PIM through the API, you can use a `Accept` header set to `application/json` to specify that you expect the API to return data in JSON format.

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

## Scope of the API

Below are the entities you can manipulate via the API in 1.7 and 2.0:
 - [Product](/documentation/resources.html#product),
 - [Category](/documentation/resources.html#category),
 - [Family](/documentation/resources.html#family),
 - [Attribute](/documentation/resources.html#attribute),
 - [Attribute option](/documentation/resources.html#attribute-option),
 - [Media file](/documentation/resources.html#media-file),
 - [Channel](/documentation/resources.html#channel),
 - [Locale](/documentation/resources.html#locale).

Also, in 2.0, the API was enriched with these new entities:
 - [Product model](/documentation/resources.html#product-model-2x-only),
 - [Family variant](/documentation/resources.html#family-variant-2x-only),
 - [Attribute group](/documentation/resources.html#attribute-group-2x-only),
 - [Association type](/documentation/resources.html#association-type-2x-only),
 - [Currency](/documentation/resources.html#currency-2x-only),
 - [Measure family](/documentation/resources.html#measure-family-2x-only),
 - Product draft (Enterprise edition only),
 - [Published product](/documentation/resources.html#published-product-2x-and-ee-only) (Enterprise edition only).

In 2.1, we added in the API the following entities:
 - [Asset](/documentation/resources.html#asset-21-only)
 - [Asset category](/documentation/resources.html#asset-category-21-only).

::: info
No addition were made in the 2.2 version. So, the scope of the API in the 2.2 version is equivalent to the 2.1 version.
:::

In 2.3, we added in the API the following entity:
 - Product model draft (Enterprise edition only)

To finish, in 3.0, we added in the API the following entities:
 - [Reference entity](/documentation/resources.html#reference-entity-3x-and-ee-only) (Enterprise edition only),
 - [Reference entity attribute](/documentation/resources.html#reference-entity-attribute-3x-and-ee-only) (Enterprise edition only),
 - [Reference entity record](/documentation/resources.html#reference-entity-record-3x-and-ee-only) (Enterprise edition only),
 - [Record media file](/documentation/resources.html#record-media-file-3x-and-ee-only) (Enterprise edition only).

For a detailed presentation as well as the format of each of these resources, take a look to the [Resources](/documentation/resources.html).

Also, you will find the complete reference of the endpoints available for each of these resources in the [reference API](/api-reference-index.html). You can also get the list of these endpoints by request, see [List of available endpoints](/documentation/overview.html#list-of-available-endpoints).

## List of available endpoints

By requesting the root URI of the API, you get the list of all available endpoints.

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
  "host": "http://demo.akeneo.com",
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
      "route": "/api/rest/v1/products/{code}",
      "methods": ["DELETE"]
    }
  }
}
```

:::info
You do not need to be authenticated to access this route.
:::


## Introducing the API reference

_You want to dig deeper and know every inch of the API?_

We have crafted a complete reference of our API. So feel free to browse it.

There, you will find for each available endpoint, a description of what it does, what are the expected parameters in the request and what are the different responses you will be able to get, being successes or errors.

::: panel-link I wanna take a look at the API reference! [Let's go!](/api-reference.html)
:::
