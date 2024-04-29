This page presents **all available arguments** for **the different queries**.

## products
Get a list of products (simple/variants).

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html#get_products_uuid](https://api.akeneo.com/api-reference.html#get_products_uuid)

The following arguments are available:

| Argument           | Type         | Description                                                                                                                                                                           |
|--------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit`            | **Int**      | Limit the number of results<br/>example `limit: 5`                                                                                                                                    |
| `page`             | **String**   | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `locales`          | **String[]** | Filter values to keep only the ones related to these locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                |
| `channel`          | **String**   | Filter values to keep only the ones related to this channel<br/>example `channel: "b2b"`                                                                                              |
| `currencies`       | **String[]** | Filter values to keep only the ones related to these currencies<br/>example `currencies: ["USD", "EUR"]`                                                                              |
| `search`           | **String**   | Filter results based on specific search<br/>more details on [Common notions - query with search](/graphql/common-notions.html#query-with-search)                                      |
| `categories`       | **String[]** | Get product associated with these categories based on categories codes<br/>example `categories: ["categ-code1", "categ-code2"]`                                                       |
| `families`         | **String[]** | Get product associated with these families based on families codes<br/>example `families: ["family-code1", "family-code2"]`                                                           |
| `uuid`             | **String[]** | Get only specific items based on their uuid<br/>example `uuid: ["002844f9-a470-42e2-8268-ddfd8f646593", "002844f9-3648-8268-8268-ddfd8f6411545"]`                                     |
| `parent`           | **String**   | Get **product variants** linked to the product models base on its **code**<br/>example `code: "code1"`                                                                                |
| `noParent`         | **Boolean**  | Only accepted value `true`, will return **only simple products**.                                                                                                                     |
| `attributesToLoad` | **String[]** | Restrict the attribute values we will load on product, more details on [Best practices](/graphql/best-practices.html#load-only-required-product-attributes)                           |

:::info
The `categories`, `families` and `uuid` use under the hood the `Rest API search capabilities` to ease the data fetching.

More arguments to abstract the search will be added over the time.
:::

## productModels
Get a list of product models. 

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Productmodel](https://api.akeneo.com/api-reference.html?#Productmodel)

| Argument           | Type         | Description                                                                                                                                                                               |
|--------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit`            | **Int**      | Limit the number of results<br/>example `limit: 5`                                                                                                                                        |
| `page`             | **String**   | Display a specific page, the value must come from the **links{next/self/first}**<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `channel`          | **String**   | Filter values to keep only the ones related to this channel<br/>example `channel: "b2b"`                                                                                                  |
| `locales`          | **String[]** | Filter values to keep only the ones related to this locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                     |
| `currencies`       | **String[]** | Filter values to keep only the ones related to these currencies<br/>example `currencies: ["USD", "EUR"]`                                                                                  |
| `search`           | **String**   | Filter results based on specific search<br/>more details on [Common notions - query with search](/graphql/common-notions.html#query-with-search)                                          |
| `codes`            | **String[]** | Get only specific items based on their codes<br/>example `codes: ["code1", "code-2"]`                                                                                                     |
| `categories`       | **String[]** | Get product associated with these categories based on categories codes<br/>example `categories: ["categ-code1", "categ-code2"]`                                                           |
| `families`         | **String[]** | Get product associated with these families based on families codes<br/>example `families: ["family-code1", "family-code2"]`                                                               |
| `attributesToLoad` | **String[]** | Restrict the attribute values we will load on product, more details on [Best practices](/graphql/best-practices.html#load-only-required-product-attributes)                               |

:::info
The `categories`, `families` and `codes` use under the hood the `Rest API search capabilities` to ease the data fetching.

More arguments to abstract the search will be added over the time.
:::

## families
Get a list of families. 

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Family](https://api.akeneo.com/api-reference.html?#Family)

| Argument  | Type         | Description                                                                                                                                                                           |
|-----------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit`   | **Int**      | Limit the number of results<br/>example `limit: 5`                                                                                                                                    |
| `page`    | **String**   | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `codes`   | **String[]** | Get only specific items based on their codes<br/>example `codes: ["code1", "code-2"]`                                                                                                 |
| `locales` | **String[]** | Filter values to keep only the one related to these locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                 |

## categories
Get a list of categories. 

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Category](https://api.akeneo.com/api-reference.html?#Category)

| Argument  | Type         | Description                                                                                                                                                                           |
|-----------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit`   | **Int**      | Limit the number of results<br/>example `limit: 5`                                                                                                                                    |
| `page`    | **String**   | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `search`  | **String**   | Filter results based on specific search<br/>more details on [Common notions - query with search](/graphql/common-notions.html#query-with-search)                                      |
| `locales` | **String[]** | Filter values to keep only the ones related to these locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                |
| `root`    | **Boolean**  | Get only category that are root `true` or not `false`                                                                                                                                 |
| `parent`  | **String**   | Get children categories of a `parent` category<br/>example `parent: "code-parent-category"`                                                                                           |
| `codes`   | **String[]** | Get only specific items based on their codes<br/>example `codes: ["code1", "code-2"]`                                                                                                 |

## attributes
Get a list of attributes. 

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Attribute](https://api.akeneo.com/api-reference.html?#Attribute)

| Argument     | Type         | Description                                                                                                                                                                           |
|--------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit`      | **Int**      | Limit the number of results<br/>example `limit: 5`                                                                                                                                    |
| `page`       | **String**   | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `search`     | **String**   | Filter results based on specific search<br/>more details on [Common notions - query with search](/graphql/common-notions.html#query-with-search)                                      |
| `locales`    | **String[]** | Filter labels to keep only the ones related to these locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                |
| `codes`      | **String[]** | Get only specific items based on their codes<br/>example `codes: ["code1", "code-2"]`                                                                                                 |
| `types`      | **String[]** | Get only specific items based on their types<br/>example `types: ["pim_catalog_simpleselect"]`                                                                                        |
| `identifier` | **Boolean**  | Get only items that correspond to this filter<br/>example `identifier: true`                                                                                                          |

## attributeOptions
Get a list of options of a given attribute. 

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html#Attributeoption](https://api.akeneo.com/api-reference.html#Attributeoption)

| Argument        | Type         | Description                                                                                                                                                                           |
|-----------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `attributeCode` | **String**   | *required* Get attribute options linked to a specific attribute                                                                                                                       |
| `locales`       | **String[]** | Filter labels to keep only the ones related to these locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                |
| `page`          | **String**   | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |

## locales
Get a list of locales.

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Locale](https://api.akeneo.com/api-reference.html?#Locale)

| Argument  | Type        | Description                                                                                                                                                                           |
|-----------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit`   | **Int**     | Limit the number of results<br/>example `limit: 5`                                                                                                                                    |
| `page`    | **String**  | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `enabled` | **Boolean** | Get only items that correspond to the value (true/false)<br/>example `enabled: true`                                                                                                  |

## currencies
Get the list of all currencies. 

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Currency](https://api.akeneo.com/api-reference.html?#Currency)

| Argument  | Type        | Description                                                                                                                                                                           |
|-----------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit`   | **Int**     | Limit the number of results<br/>example `limit: 5`                                                                                                                                    |
| `page`    | **String**  | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `enabled` | **Boolean** | Get only items that correspond to the value (true/false)<br/>example `enabled: true`                                                                                                  |

## channels
Get a list of channels.

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Channel](https://api.akeneo.com/api-reference.html?#Channel)

| Argument  | Type         | Description                                                                                                                                                                           |
|-----------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit`   | **Int**      | Limit the number of results<br/>example `limit: 5`                                                                                                                                    |
| `page`    | **String**   | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `locales` | **String[]** | Filter labels to keep only the ones related to this locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                 |

## measurementFamilies
Get a list of measurement families. 

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Measurementfamily](https://api.akeneo.com/api-reference.html?#Measurementfamily)

| Argument  | Type         | Description                                                                                           |
|-----------|--------------|-------------------------------------------------------------------------------------------------------|
| `locales` | **String[]** | Filter labels to keep only the ones related to this locales<br/>example `locales: ["fr_FR", "en_US"]` |

## assetFamilies
Get a list of asset families. 

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Assetfamily](https://api.akeneo.com/api-reference.html?#Assetfamily)

| Argument  | Type         | Description                                                                                                                                                                           |
|-----------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`    | **String**   | Get a specific asset family <br/>example `code: "code-of-asset-family"`                                                                                                               |
| `page`    | **String**   | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `locales` | **String[]** | Filter labels to keep only the ones related to this locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                 |

## assetsRecords
Get a list of assets for a given asset family. 

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Asset](https://api.akeneo.com/api-reference.html?#Asset)


| Argument      | Type         | Description                                                                                                                                                                           |
|---------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `assetFamily` | **String**   | **required** Get assets linked to an assetFamily<br/>example `assetFamily: "code-parent-asset-family"`                                                                                |                                                                                                                                                                                       |
| `channel`     | **String**   | Filter values to keep only the ones related to this channel<br/>example `channel: "b2b"`                                                                                              |
| `locales`     | **String[]** | Filter labels to keep only the ones related to these locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                |
| `page`        | **String**   | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `search`      | **String**   | Filter results based on specific search<br/>more details on [Common notions - query with search](/graphql/common-notions.html#query-with-search)                                      |
| `codes`       | **String[]** | Get only specific items based on their codes<br/>example `codes: ["code1", "code-2"]`                                                                                                 |

## referenceEntities
Get a list of reference entities. 

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Referenceentities](https://api.akeneo.com/api-reference.html?#Referenceentities)

| Argument  | Type         | Description                                                                                                                                                                           |
|-----------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`    | **String**   | Get a specific reference entity <br/>example `code: "code-of-ref-entity"`                                                                                                             |
| `page`    | **String**   | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `locales` | **String[]** | Filter labels to keep only the ones related to these locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                |

## referenceEntitiesRecords
Get a list of records for a given reference entity.

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html?#Referenceentityrecord](https://api.akeneo.com/api-reference.html?#Referenceentityrecord)

| Argument          | Type         | Description                                                                                                                                                                           |
|-------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `referenceEntity` | **String**   | **required** Get reference entity records linked to a referenceEntity<br/>example `referenceEntity: "code-parent-ref-entity"`                                                         |                                                                                                                                                                                       |
| `channel`         | **String**   | Filter values to keep only the ones related to this channel<br/>example `channel: "b2b"`                                                                                              |
| `locales`         | **String[]** | Filter values to keep only the ones related to these locales<br/>example `locales: ["fr_FR", "en_US"]`                                                                                |
| `page`            | **String**   | Display a specific page, the value must come from the links{next/self/first}<br/>more details on [Common notions - paginations](/graphql/common-notions.html#working-with-pagination) |
| `search`          | **String**   | Filter results based on specific search<br/>more details on [Common notions - query with search](/graphql/common-notions.html#query-with-search)                                      |
| `codes`           | **String[]** | Get only specific items based on their codes<br/>example `codes: ["code1", "code-2"]`                                                                                                 |

## token
Get an authentication token.

More details on the authentication process available on the [Getting started](/graphql/getting-started.html#step-1-get-your-token)

Based on the REST API endpoint [https://api.akeneo.com/api-reference.html#Authentication](https://api.akeneo.com/api-reference.html#Authentication)

| Argument       | Type       | Description  |
|----------------|------------|--------------|
| `username`     | **String** | **required** |
| `password`     | **String** | **required** |
| `clientId`     | **String** | **required** |
| `clientSecret` | **String** | **required** |

## systemInformation
Get the version and the edition of the PIM.

Based on the REST API endpoint https://api.akeneo.com/api-reference.html?#System

No arguments needed.

::: panel-link And now, let's discover how to resolve some use cases with GraphQL [Next](/graphql/use-cases.html)
:::
