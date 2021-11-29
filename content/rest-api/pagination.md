# Pagination

The vast majority of the responses containing a collection of resources will be paginated. Take a look at our [reference](/api-reference.html) to find out which one.

## The `limit` parameter

On certain endpoints, you'll be able to use the parameter `limit`. When available for the endpoint, by default, we will return pages of 10 entities. You can tuned this number by using the `limit` parameter as shown in the example below.

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
The limit is set to 100 because this is a good trade-off between memory consumption and performance (on server side).
:::

::: warning
This parameter is not available on all list endpoints. Check our [reference](/api-reference.html) to find out which one have this parameter.
:::

## The `Search-after` method

For high volume entities, such as the products, product models, published products, assets, reference entities and reference entity records, we provide another pagination method, the `Search-after` method. We recommend to use this method if you want to have good performances, instead of the [`Offset` method](/documentation/pagination.html#the-offset-method).

When using this method, the entities you will get, will then be sorted by product primary key to speed up performance. Also, there is a `search_after` query parameter that is used as a cursor.

:::danger
The `search_after` query parameter should never be set manually. If you want to navigate through the pages, use the links provided in `_links` property of the response of your first request. Take a look at the example below to see these links.
:::

:::warning
This pagination method is only available for:
- products,
- product models,
- published products,
- PAM assets (_deprecated_),
- reference entities,
- reference entity attribute options,
- reference entity records,
- Asset Manager assets,
- Asset Manager asset families.
:::

::: info
On the products, product models, published products and assets, you will have to set the `pagination_type` query parameter to `search_after` to be able to use the search-after method.
:::

::: info
For the reference entities and their records, and reference entity attribute options, the `Search-after` method is the only one available. So you don't have to worry about which method to choose. ;)
:::

### Example
#### Request
``` bash
curl -X GET /api/rest/v1/products?pagination_type=search_after&search_after=qaXbcde&limit=20
```

This request returns the 20 products situated after the `qaXbcde` cursor.

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
      "href": "https://demo.akeneo.com/api/rest/v1/products?pagination_type=search_after&search_after=qaXbcdedsfeF&limit=20"
    }
  },
  "_embedded": {
    "items": [
      ...
    ]
  }
}
```

## The `Offset` method

This is the default pagination type. It's available for all the resources, except the reference entity and the reference entity record: only the search-after method is available for these two resources.

The `Offset` method is the most common way to paginate resources (with an offset on query), but it's less efficient than the [`Search-after` method](/documentation/pagination.html#the-search-after-method).

When you want to use the classical method on products, product models, published products or assets, you can set the `pagination_type` query parameter to `page` but this is not mandatory since this is the default pagination.

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
    "previous": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=1&limit=20"
    },
    "next": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=3&limit=20"
    }
  },
  "current_page": 2,
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
When trying to request a quite high page number, you will notice that this method spend more and more time to respond. This method can also be responsible for giving you duplicates. That is why we introduced another way to request paginated resources, see the [`Search-after` method](/documentation/pagination.html#the-search-after-method). It is only avalailable on products, product models, published products, assets, reference entities and reference entity records right now.
:::

