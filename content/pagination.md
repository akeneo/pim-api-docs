# Pagination

All responses containing a collection of resources will be paginated by 10 items by default.

::: danger
You cannot request more than 100 resources at the same time.
An error with code 400 will be thrown if the limit is bigger than 100.
:::

TODO: Ajouter un lien vers un cookbook pour modifier la limite.

The response will respect this structure, even if there is no item to return.

```json
{
  "current_page": 2,
  "pages_count": 4,
  "items_count": 38,
  "_links": {
    "self": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=2&limit=10"
    },
    "first": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=1&limit=10"
    },
    "last": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=4&limit=10"
    },
    "previous": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=1&limit=10"
    },
    "next": {
      "href": "https://demo.akeneo.com/api/rest/v1/categories?page=3&limit=10"
    }
  },
  "_embedded": {
    "items": [
      ...
    ]
  }
}
```


:::info
Previous and next keys will not be included if you requested, respectively, the first or the last page.
:::