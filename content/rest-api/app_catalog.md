# App Catalog

## Automatic App Catalog disabling

A catalog can be disabled automatically on the PIM side if a product selection is no longer valid
following the deletion of an entity included in the selection criteria.

The response is an HTTP 200 with a payload containing a warning message.

#### Response example

```json
{
  "error": "No products to synchronize. The catalog [catalog id] has been disabled on the PIM side. Note that you can get catalogs status with the GET /api/rest/v1/catalogs endpoint."
}
```
