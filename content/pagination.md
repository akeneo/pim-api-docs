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

To request pages of all entities exapect products, you can only use the classical method, see [Page type pagination](/documentation.html#page-type) below.

To request pages of products, you can use either the classical method or the search after method. For more details, see below.

## Page type

This is the classical pagination. You cas use it on all resources. When you want to use the classical method on products, you set the `pagination_type` query parameter to `page`.

You will then need to set the `page` query parameter to a page number, the page being the one you want to request.

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
This pagination method is only usable on products.
:::

To use the search-after method, you have to set the `pagination_type` query parameter to `search_after`. Then, you need to set the `search_after` query parameter to the identifier of an entity. The entities you will get, will be the ones situated after the entity you gave, the entities being sorted on the identifier.

By default, if the `search_after` query parameter is not specified, it will return the first page of entities.

### Example
#### Request
``` bash
curl -X GET /api/rest/v1/products?pagination_type=search_after&search_after=mug&limit=20
```

This will return the 20 products situated after the product with identifier `mug`.

#### Response
The response will respect this structure, even if there are no items to return.

```http
HTTP/1.1 200 OK

{
  "_links": {
    "self": {
      "href": "https://demo.akeneo.com/api/rest/v1/products?pagination_type=search_after&search_after=mug&limit=20"
    },
    "first": {
      "href": "https://demo.akeneo.com/api/rest/v1/products?pagination_type=search_after&limit=20"
    },
    "next": {
      "href": "https://demo.akeneo.com/api/rest/v1/products?pagination_type=search_after&search_type=tshir&limit=20"
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