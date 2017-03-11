# Pagination

## Overview

All responses containing a collection of resources will be paginated.

By default, it returns pages of 10 entities. This number can be tuned thanks to the `limit` query parameter.

#### Example
``` bash
curl -X GET /api/rest/v1/categories?limit=25
```

This will set the number of entities by page to 25 instead of 10.

::: danger
You cannot request more than 100 resources at the same time.
An error with code 422 will be sent back if the limit is higher than 100.
```http
HTTP/1.1 422 Unprocessable entity

{ 
  "code":422, 
  "message":"You cannot request more than 100 items." 
}
```
:::

To request paginated entities, you can use the [offset method](/documentation.html#offset-method).

Products can also be paginated with another method, the [search after method](/documentation.html#search-after-method).

## Offset method

This is the default pagination type, available for all resources.
It's the most common way to paginate resources (with an offset on query).

When you want to use the classical method on products, you can set the `pagination_type` query parameter to `page` but this is not mandatory since this is the default pagination.

The `page` query parameter indicates the page number, the page being the one requested. By default, this query parameter is equal to 1.

:::danger
The `page` query parameter should never be set manually. If you want to navigate through the pages, use the links provided in `_links` property of the response of your first request. Take a look at the example below to see these links. 
:::

### Example
#### Request
``` bash
curl -X GET /api/rest/v1/categories?pagination_type=page&page=2&limit=20
```

This will return the second page of entities, the entities being paginated by 20.

#### Response
The response will have this structure, even if there are no items to return.

```http
HTTP/1.1 200 OK

{
  "_links": {
    "self": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=2&limit=20"
    },
    "first": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=1&limit=20"
    },
    "last": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=3&limit=20"
    },
    "previous": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=1&limit=20"
    },
    "next": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=3&limit=20"
    }
  },
  "current_page": 2,
  "pages_count": 3,
  "items_count": 48,
  "_embedded": {
    "items": [
      ...
    ]
  }
}
```

:::info
`previous` and `next` properties will not be included if you are requesting, respectively, the first or the last page.
:::

:::info
This is the default method used for pagination on the products. So, in fact, you do not need to specify the `pagination_type` query parameter when requesting on products.
``` bash
// This request
curl -X GET /api/rest/v1/products?pagination_type=page

// is equal to this request
curl -X GET /api/rest/v1/products
```
:::

:::warning
When trying to request a quite high page number, you will notice that this method spend more and more time to respond. This method can also be responsible for giving you duplicates. That is why we introduced another way to request paginated resources, see the search after method below. It is only avalailable on products right now.
:::

## Search-after type
:::warning
This pagination method is only available for products.
:::

To use the search-after method, you have to set the `pagination_type` query parameter to `search_after`. The entities you will get will then be sorted by product primary key to speed up performance.

Additionally, there is a `search_after` query parameter that is used as a cursor.

:::danger
The `search_after` query parameter should never be set manually. If you want to navigate through the pages, use the links provided in `_links` property of the response of your first request. Take a look at the example below to see these links.
:::

### Example
#### Request
``` bash
curl -X GET /api/rest/v1/products?pagination_type=search_after&search_after=qaXbcde&limit=20
```

This will return the 20 products situated after the product with identifier `mug`.

#### Response
The response will respect this structure, even if there are no items to return.

```http
HTTP/1.1 200 OK

{
  "_links": {
    "self": {
      "href": "https://demo.akeneo.com/api/rest/v1/products?pagination_type=search_after&search_after=qaXbcde&limit=20"
    },
    "first": {
      "href": "https://demo.akeneo.com/api/rest/v1/products?pagination_type=search_after&limit=20"
    },
    "next": {
      "href": "https://demo.akeneo.com/api/rest/v1/products?pagination_type=search_after&search_type=qaXbcdedsfeF&limit=20"
    }
  },
  "pages_count": 3,
  "items_count": 48,
  "_embedded": {
    "items": [
      ...
    ]
  }
}
```