# From product identifier to product UUID

::: warning
This guide only concerns Serenity users.
:::

## What are we talking about?

At the time these lines are written (July 2022), a PIM product contains one and only one way of unique identification: the so-called property `identifier` (the only `pim_catalog_identifier` attribute of the whole product).
Usually, this field value is simply the SKU (Stock Keeping Unit) of the product, but what if you need to identify your product with several product identifiers (SKU, EAN, GTIN,...)?
Adding classic fields won't do the job: you need a kind of identifier field for each product identifier.

That's the purpose of the brand-new multi-identifier feature.

But before making it happen, a product must have a **unique** and **immutable** way to identify it: that's why we introduce the product UUID (for Universally Unique identifier).

The goal of this guide is to help you during your migration from a product-identifier-based logic to a UUID one.

## What will be done?

In a nutshell, we will follow the following steps:
1. Prepare database migration for product UUIDs
2. Add new API endpoints for UUID-based products calls:
   - `GET /api/rest/v1/products-uuid`
   - `POST /api/rest/v1/products-uuid`
   - `PATCH /api/rest/v1/products-uuid`
   - `GET /api/rest/v1/products-uuid/{uuid}`
   - `PATCH /api/rest/v1/products-uuid/{uuid}`
   - `DELETE /api/rest/v1/products-uuid/{uuid}`
3. Migrate identifier-based products to UUID-based products
4. Turn the product identifier (`pim_catalog_identifier` attribute) to optional
5. Enable multi-identifier product feature

## What are the impacts?

[Products endpoints](https://api.akeneo.com/api-reference.html#Product) will remain available, even when new API endpoints (same roads with a '-uuid' suffix, for example '/api/rest/v1/products-uuid') will be available.
Nevertheless, when the current product identifier will turn to optional:
- `GET /api/rest/v1/products` won’t return products with empty product identifiers (in other words, you may miss products if you continue to use this endpoint);
- `associations` property for `GET /api/rest/v1/products` or `GET /api/rest/v1/products/{id}` may contain NULL values (product associated with a product without identifier);
- `GET /api/rest/v1/products/{identifier}` could result in a 404 error (if the identifier is removed from the product).
...and you could encounter some issues with your code.

## What do we advise?

As soon as product UUID API endpoints are available:
- Replace [products endpoints](https://api.akeneo.com/api-reference.html#Product) with them.
- Every time you use a product identifier in your application, be sure to replace it with product UUID. You will easily find the matching between product identifier and UUID in both [products endpoints](https://api.akeneo.com/api-reference.html#Product) and new ones.
