# Filters

When requesting a list of resources via the REST API, you can apply filters to get only the ones you want.

## Filter on product properties

To filter products by one of its properties, you can use the `search` query parameter. The value given to this query parameter should be a valid JSON as shown below.

```
/api/rest/v1/products-uuid?search={PRODUCT_PROPERTY:[{"operator":OPERATOR,"value":VALUE}]}
```

In the above url :

- `PRODUCT_PROPERTY` can be any property detailed in the sections below,
- `OPERATOR` is an allowed operator for this `PRODUCT_PROPERTY`,
- `VALUE` is a value whose type corresponds to the allowed type detailed below.

#### Examples

To only retrieve enabled products, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"enabled":[{"operator":"=","value":true}]}
```

Of course, you can combine as many filters as you want. The example below will get you the enabled products being 70% complete.

```
/api/rest/v1/products-uuid?search={"enabled":[{"operator":"=","value":true}],"completeness":[{"operator":">","value":70,"scope":"ecommerce"}]}
```

You can even combine several filters on the same product properties. The example below will get you the products categorized on the Winter Collection category and that are not categorized on the Accessories category.

```
/api/rest/v1/products-uuid?search={"categories":[{"operator":"IN","value":["winter_collection"]},{"operator":"NOT IN","value":["accessories"]}]}
```

### On their uuid

::: availability versions=7.0,SaaS editions=CE,EE

To filter products on their uuid, use the `uuid` property.
Here are the allowed operators you can use to filter on the uuid as well as the corresponding type of value expected in the `search` query parameter.

| Allowed operators | Allowed value type              |
| ----------------- |---------------------------------|
| IN, NOT IN        | list of strings (product uuids) |

#### Example

```
/api/rest/v1/products-uuid?search={"uuid":[{"operator":"IN","value":["8945388d-cf5b-49af-8799-05d1ed6e296f", "941fe892-99dd-440f-b2a9-8eccb94248f0"]}]}
```

### On their categories

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter products on their categories, use the property `categories`.
Here are the allowed operators you can use to filter on the category code as well as the corresponding type of value expected in the `search` query parameter.

| Operator             | Allowed value type                  | Filter description                                                                                      |
| -------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `IN`                 | an array of existing category codes | Only returns the products that are in the given categories                                              |
| `NOT IN`             | an array of existing category codes | Only returns the products that are not in the given categories                                          |
| `IN OR UNCLASSIFIED` | an array of existing category codes | Only returns the products that are in the given categories or that are not classified in any categories |
| `IN CHILDREN`        | an array of existing category codes | Only returns the products that are in the children of the given categories                              |
| `NOT IN CHILDREN`    | an array of existing category codes | Only returns the products that are not in the children of the given categories                          |
| `UNCLASSIFIED`       | no value                            | Only returns the products that are not classified into any category                                     |

#### Example

To get the products of the `winter_collection` category, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"categories":[{"operator":"IN","value":["winter_collection"]}]}
```

### On their status

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter products on their status, use the `enabled` property.
Here are the allowed operators you can use to filter on the status as well as the corresponding type of value expected in the `search` query parameter.

| Operator | Allowed value type | Filter description                                                    |
| -------- | ------------------ | --------------------------------------------------------------------- |
| `=`      | boolean            | Only returns products that are enabled (`true`) or disabled (`false`) |
| `!=`     | boolean            | Only returns products that are enabled (`false`) or disabled (`true`) |

#### Example

To get the disabled products, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"enabled":[{"operator":"=","value":false}]}
```

### On their completeness

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter products on their completeness, use the `completeness` product property. You will also need to provide a `scope` value to specify on which channel you want to filter with the completeness.
Here are the allowed operators you can use to filter by completeness as well as the corresponding type of value expected in the `search` query parameter.

| Operator                                                                 | Allowed value type | Filter description                                                                                                                                                 |
| ------------------------------------------------------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<` or `<=`                                                              | integer            | Only returns products that have a completeness lower than (or equal to) the given value on the given channel independently of locales.                             |
| `>` or `>=`                                                              | integer            | Only returns products that have a completeness greater than (or equal to) the given value on the given channel independently of locales.                           |
| `=`                                                                      | integer            | Only returns products that have completeness equal to the given value on the given channel independently of locales.                                               |
| `!=`                                                                     | integer            | Only returns products that have a completeness different from the given value on the given channel independently of locales.                                       |
| `GREATER THAN ON ALL LOCALES` or `GREATER OR EQUALS THAN ON ALL LOCALES` | integer            | Only returns products that have a completeness on all locales that is greater than (or equal to) the given value on the given channel for the given set of locales |
| `LOWER THAN ON ALL LOCALES` or `LOWER OR EQUALS THAN ON ALL LOCALES`     | integer            | Only returns products that have a completeness on all locales that is lower than (or equal to) the given value on the given channel for the given set of locales   |

#### Examples

To get the products that are 100% complete for the `ecommerce` channel, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"completeness":[{"operator":"=","value":100,"scope":"ecommerce"}]}
```

To get the products that are 100% complete on both the `en_US` and `fr_FR` locales for the `ecommerce` channel, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"completeness":[{"operator":"GREATER OR EQUALS THAN ON ALL LOCALES","value":100,"locales":["en_US","fr_FR"],"scope":"ecommerce"}]}
```

### On their group

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter products on groups, use the product property `groups`.
Here are the allowed operators you can use to filter on these properties as well as the corresponding type of value expected in the `search` query parameter.

| Operator          | Allowed value type      | Filter description                                     |
|-------------------|-------------------------|--------------------------------------------------------|
| `IN`              | array of existing group | Only returns products that are in the given groups     |
| `NOT IN`          | array of existing group | Only returns products that are not in the given groups |
| `EMPTY`           | no value                | Only returns products that have no groups              |
| `NOT EMPTY`       | no value                | Only returns products that have a group                |

#### Examples

To get the products that are in the `promotion` group, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"groups":[{"operator":"IN","value":["promotion"]}]}
```

### On their family

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter products on families, use the product property `family`.
Here are the allowed operators you can use to filter on these properties as well as the corresponding type of value expected in the `search` query parameter.

| Operator          | Allowed value type       | Filter description                                                                                                       |
|-------------------|--------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `IN`              | array of existing family | Only returns products that are in the given families                                                                     |
| `NOT IN`          | array of existing family | Only returns products that are not in the given families                                                                 |
| `IN CHILDREN`     | array of existing family | Only returns products that are in the given families and the children of the given families (only available on SaaS)     |
| `NOT IN CHILDREN` | array of existing family | Only returns products that are not in the given families nor the children of the given families (only available on SaaS) |
| `EMPTY`           | no value                 | Only returns products that have no family                                                                                |
| `NOT EMPTY`       | no value                 | Only returns products that have a family                                                                                 |

#### Examples

To get the products that are not in the `camcorders` and `digital_cameras` family, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"family":[{"operator":"NOT IN","value":["camcorders","digital_cameras"]}]}
```

### On their creation or update date

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter products on creation or update date, use respectively the product property `created` and `updated`.
Here are the allowed operators to filter on these properties as well as the corresponding type of value expected in the `search` query parameter.

::: info
Please note that dates are interpreted in the time zone of the server that runs Akeneo (e.g. date.timezone setting in php.ini). For SaaS clients, please note that the time zone of the server is in UTC as this is the most precise and commonly referred to time standard.
Please also note that product variants, with an older updated date than the filter applied, will be part of the API answer if at least one of their parent product model has an updated date that matches the filter applied.
:::

| Operator            | Allowed value type                                    | Filter description                                                                                                  |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `=`                 | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns products that were respectively<br> updated or created during the given day                            |
| `!=`                | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns products that were respectively<br> not updated or not created during the given day                    |
| `<`                 | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns products that were respectively<br> updated or created before the given day                            |
| `>`                 | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns products that were respectively<br> updated or created after the given day                             |
| `BETWEEN`           | array of datetimes <br> _Format: YYYY-MM-DD hh:mm:ss_ | Only returns products that were respectively<br> updated or created between the two given dates                     |
| `NOT BETWEEN`       | array of datetimes <br> _Format: YYYY-MM-DD hh:mm:ss_ | Only returns products that were respectively<br> not updated or not created between the two given dates             |
| `SINCE LAST N DAYS` | integer                                               | Only returns products that were respectively updated<br> or created during the last n days, n being the given value |

|

#### Examples

To get the products that were created on the 4th of July 2016 at 10am, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"created":[{"operator":"=","value":"2016-07-04 10:00:00"}]}
```

To get the products that were updated during the last 4 days, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"updated":[{"operator":"SINCE LAST N DAYS","value":4}]}
```

### On their parent

::: availability versions=3.2,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter products on their parent, use the `parent` product property.
Here are the allowed operators you can use to filter by parent as well as the corresponding type of value expected in the `search` query parameter.

| Operator    | Allowed value type                 | Filter description                                                                                                                                |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `=`         | valid product model code           | Returns products that are descendants of the provided product model. The product model can be either a root product model or a sub product model. |
| `IN`        | array of valid product model codes | Only returns products that are **direct** children of the provided product models                                                                 |
| `EMPTY`     | no value                           | Only returns simple products                                                                                                                      |
| `NOT EMPTY` | no value                           | Only returns variant products                                                                                                                     |

::: warning
The `IN`, `EMPTY` and `NOT EMPTY` operators are only available since the 7.0 version
:::

#### Examples

To get all the variant products of the `apollon` root product model without having to filter on all its sub-product models, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"parent":[{"operator":"=","value":"apollon"}]}
```

To get all the variant products of the sub product models with the codes `tshirt_armor_blue` and `tshirt_armor_red`, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"parent":[{"operator":"IN","value":["tshirt_armor_blue","tshirt_armor_red"]}]}
```

To get all the variant products, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"parent":[{"operator":"NOT EMPTY"}]}
```

To get all the simple products, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"parent":[{"operator":"EMPTY"}]}
```

### On their quality score

::: availability versions=6.0,7.0,SaaS editions=CE,EE

To filter products on their quality score, use the `quality_score` product property. You will also need to provide a `scope` and `locale` value to specify on which channel and locale you want to filter the quality score on.
This filter accepts one operator: IN. It expects one or several scores, given as a list of letters. The possible values for the quality score are "A", "B", "C", "D" and "E".

#### Examples

To get the products with a "D" for the `ecommerce` channel and `en_US` locale, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"quality_score":[{"operator":"IN","value":["D"],"scope":"ecommerce","locale":"en_US"}]}
```

To get the products with an "A" or "B" for the `mobile` channel and `en_GB` locale, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"quality_score":[{"operator":"IN","value":["A","B"],"scope":"mobile","locale":"en_GB"}]}
```

## Filter on product model properties

To filter product models by one of their properties, you can use the `search` query parameter. The value given to this query parameter should be a valid JSON as shown below.

```
/api/rest/v1/product-models?search={PRODUCT_MODEL_PROPERTY:[{"operator":OPERATOR,"value":VALUE}]}
```

In the above url :

- `PRODUCT_MODEL_PROPERTY` can be any property detailed in the sections below,
- `OPERATOR` is an allowed operator for this `PRODUCT_MODEL_PROPERTY`,
- `VALUE` is a value whose type corresponds to the allowed type detailed below.

#### Examples

To filter product models on their code, use the `identifier` property.
Here are the allowed operators you can use to filter on the identifier as well as the corresponding type of value expected in the `search` query parameter.

| Allowed operators | Allowed value type           |
| ----------------- |------------------------------|
| IN, NOT IN        | list of strings (identifier) |


```
/api/rest/v1/product-models?search={"identifier":[{"operator":"IN","value":["amor","apollon"]}]}
```

### On categories

::: availability versions=2.3,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter product models on their categories, use the property `categories`.
Here are the allowed operators you can use to filter on the category code as well as the corresponding type of value expected in the `search` query parameter.

| Operator             | Allowed value type                  | Filter description                                                                                            |
| -------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `IN`                 | an array of existing category codes | Only returns the product models that are in the given categories                                              |
| `NOT IN`             | an array of existing category codes | Only returns the product models that are not in the given categories                                          |
| `IN OR UNCLASSIFIED` | an array of existing category codes | Only returns the product models that are in the given categories or that are not classified in any categories |
| `IN CHILDREN`        | an array of existing category codes | Only returns the product models that are in the children of the given categories                              |
| `NOT IN CHILDREN`    | an array of existing category codes | Only returns the product models that are not in the children of the given categories                          |
| `UNCLASSIFIED`       | no value                            | Only returns the product models that are not classified into any category                                     |

#### Example

To get the product models of the `winter_collection` category, you can use the following URL.

```
/api/rest/v1/product-models?search={"categories":[{"operator":"IN","value":["winter_collection"]}]}
```

### On completeness

::: availability versions=2.3,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter product models on their completeness, use the `completeness` product property. You will also need to provide a `scope` value to specify on which channel you want to filter with the completeness.
Here are the allowed operators you can use to filter by completeness as well as the corresponding type of value expected in the `search` query parameter.

| Operator              | Allowed value type | Filter description                                                                                                                    |
| --------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `AT LEAST COMPLETE`   | no value           | Only returns product models that have `at least one variant product` fully complete on the given channel for the given set of locales |
| `AT LEAST INCOMPLETE` | no value           | Only returns product models that have `at least one variant product` incomplete on the given channel for the given set of locales     |
| `ALL COMPLETE`        | no value           | Only returns product models that have all his variant products fully complete on the given channel for the given set of locales       |
| `ALL INCOMPLETE`      | no value           | Only returns product models that have all his variant products incomplete on the given channel for the given set of locales           |

#### Examples

To get the product models that are 100% complete for the `ecommerce` channel on `fr_FR` locale, you can use the following URL.

```
/api/rest/v1/product-models?search={"completeness":[{"operator":"ALL COMPLETE","locale":"fr_FR","scope":"ecommerce"}]}
```

To get the product models that have at least one variant product 100% complete on both the `en_US` and `fr_FR` locales for the `ecommerce` channel, you can use the following URL.

```
/api/rest/v1/product-models?search={"completeness":[{"operator":"AT LEAST COMPLETE","locales":["en_US","fr_FR"],"scope":"ecommerce"}]}
```

### On family

::: availability versions=2.3,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter product models on families, use the product model property `family`.
Here are the allowed operators you can use to filter on this property as well as the corresponding type of value expected in the `search` query parameter.

| Operator    | Allowed value type       | Filter description                                           |
| ----------- | ------------------------ | ------------------------------------------------------------ |
| `IN`        | array of existing family | Only returns product models that are in the given family     |
| `NOT IN`    | array of existing family | Only returns product models that are not in the given family |
| `EMPTY`     | no value                 | Only returns product models that have no family              |
| `NOT EMPTY` | no value                 | Only returns product models that have a family               |

#### Examples

To get the product models that are in the `camcorders` family, you can use the following URL.

```
/api/rest/v1/product-models?search={"family":[{"operator":"IN","value":["camcorders"]}]}
```

To get the product models that are not in the `camcorders` and `digital_cameras` family, you can use the following URL.

```
/api/rest/v1/product-models?search={"family":[{"operator":"NOT IN","value":["camcorders","digital_cameras"]}]}
```

### On creation or update date

::: availability versions=2.3,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter product models on creation or update date, use the product property `created` and `updated`, respectively.
Here are the allowed operators to filter on these properties as well as the corresponding type of value expected in the `search` query parameter.

::: info
Please note that dates are interpreted in the time zone of the server that runs Akeneo (e.g. date.timezone setting in php.ini). For SaaS clients, please note that the time zone of the server is in UTC as this is the most precise and commonly referred to time standard.
:::

| Operator            | Allowed value type                                    | Filter description                                                                                                        |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `=`                 | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns product models that were respectively<br> updated or created during the given day                            |
| `!=`                | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns product models that were respectively<br> not updated or not created during the given day                    |
| `<`                 | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns product models that were respectively<br> updated or created before the given day                            |
| `>`                 | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns product models that were respectively<br> updated or created after the given day                             |
| `BETWEEN`           | array of datetimes <br> _Format: YYYY-MM-DD hh:mm:ss_ | Only returns product models that were respectively<br> updated or created between the two given dates                     |
| `NOT BETWEEN`       | array of datetimes <br> _Format: YYYY-MM-DD hh:mm:ss_ | Only returns product models that were respectively<br> not updated or not created between the two given dates             |
| `SINCE LAST N DAYS` | integer                                               | Only returns product models that were respectively updated<br> or created during the last n days, n being the given value |

|

#### Examples

To get the product models that were created on the 4th of July 2016 at 10am, you can use the following URL.

```
/api/rest/v1/product-models?search={"created":[{"operator":"=","value":"2016-07-04 10:00:00"}]}
```

To get the product models that were updated during the last 4 days, you can use the following URL.

```
/api/rest/v1/product-models?search={"updated":[{"operator":"SINCE LAST N DAYS","value":4}]}
```

### On their parent

::: availability versions=6.0,7.0,SaaS editions=CE,EE

To filter product models on their parent, use the `parent` product model property.
Here are the allowed operators you can use to filter by parent as well as the corresponding type of value expected in the `search` query parameter.

| Operator    | Allowed value type                 | Filter description                                                     |
| ----------- | ---------------------------------- | ---------------------------------------------------------------------- |
| `IN`        | array of valid product model codes | Returns sub product model children of the provided root product models |
| `EMPTY`     | no value                           | Only returns root product models                                       |
| `NOT EMPTY` | no value                           | Only returns sub product models                                        |

#### Examples

To get all the sub-product models of the root product model with the code `tshirt_armor`, you can use the following URL.

```
/api/rest/v1/product-models?search={"parent":[{"operator":"IN","value":["tshirt_armor"]}]}
```

To get all the root product models, you can use the following URL.

```
/api/rest/v1/product-models?search={"parent":[{"operator":"EMPTY"}]}
```

To get all the sub-product models, you can use the following URL.

```
/api/rest/v1/product-models?search={"parent":[{"operator":"NOT EMPTY"}]}
```

## Filter on product values

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter products, and product models **since the v2.3**, on its [product values](/concepts/products.html#focus-on-the-product-values), you can use the `search` query parameter when requesting products. The value given to this query parameter should be a valid JSON as shown below.

```
/api/rest/v1/products-uuid?search={ATTRIBUTE_CODE:[{"operator":OPERATOR,"value":VALUE,"locale":LOCALE_CODE,"scope":CHANNEL_CODE}]}
```

In the above url :

- `ATTRIBUTE_CODE` can be any existing attribute code,
- `OPERATOR` is an allowed operator for the attribute type of the `ATTRIBUTE_CODE` attribute,
- `VALUE` is a value whose type corresponds to the attribute type of the `ATTRIBUTE_CODE` attribute,
- `LOCALE_CODE` is an existing locale code that should be only given when the `ATTRIBUTE_CODE` attribute is localizable
- `CHANNEL_CODE` is an existing channel code that should be only given when the `ATTRIBUTE_CODE` attribute is scopable.

#### Examples

To get products that are purple, purple being an option of the simple select `main_color` attribute and this attribute being neither localizable nor scopable, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"main_color":[{"operator":"IN","value":["purple"]}]}
```

To get products having a description begining with `Amazing` on the `en_US` locale, the `short_description` attribute being localizable but not scopable, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"short_description":[{"operator":"STARTS WITH","value":"Amazing","locale":"en_US"}]}
```

To get products that have a release date due after the 4th of July 2016 for the `ecommerce` channel, the `release_date` attribute being scopable but not localizable, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"release_date":[{"operator":">","value":"2016-07-04","scope":"ecommerce"}]}
```

To get products that have a name that contains with `shirt` on the `en_US` locale for the `mobile` channel, the `name` attribute being both localizable and scopable, you can use the following URL.

```
/api/rest/v1/products-uuid?search={"name":[{"operator":"CONTAINS","value":"shirt","locale":"en_US","scope":"mobile"}]}
```

Of course, you can combine as many filters as you want. The example below will get you the products with description starting with `Amazing` on the `en_US` locale for the `ecommerce` channel, and of purple color.

```
/api/rest/v1/products-uuid?search={"description":[{"operator":"STARTS WITH","value":"Amazing","locale":"en_US","scope":"ecommerce"}],"main_color":[{"operator":"IN","value":["purple"]}]}
```

You can even combine several filters on the same attribute. The example below will get you the products with not empty description on the `en_US` locale and empty description on the `fr_FR` locale for the `ecommerce` channel.

```
/api/rest/v1/products-uuid?search={"description":[{"operator":"NOT EMPTY","locale":"en_US","scope":"ecommerce"},{"operator":"EMPTY","locale":"fr_FR","scope":"ecommerce"}]}
```

:::info
Filtering on product values is also available for published products.
:::

### `search_locale` query parameter

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
If you need to filter on several attributes on the same locale, you can use the `search_locale` query parameter, to avoid repeating yourself for each attribute. This parameter expect an existing locale code.

#### Example

```
/api/rest/v1/products-uuid?search={"description":[{"operator":"STARTS WITH","value":"Amazing","locale":"en_US","scope":"ecommerce"}],"short_description":[{"operator":"CONTAINS","value":"shoes","locale":"en_US","scope":"ecommerce"}]}

is equivalent to

/api/rest/v1/products-uuid?search={"description":[{"operator":"STARTS WITH","value":"Amazing","scope":"ecommerce"}],"short_description":[{"operator":"CONTAINS","value":"shoes","scope":"ecommerce"}]}&search_locale=en_US
```

:::info
This query parameter is also available for the published products.
:::

### `search_scope` query parameter

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
If you need to filter on several attributes on the same channel, you can use the `search_scope` query parameter, to avoid repeating yourself for each attribute. This parameter expect an existing channel code.

#### Example

```
/api/rest/v1/products-uuid?search={"release_date":[{"operator":">","value":"2016-07-04","scope":"ecommerce"}],"short_description":[{"operator":"CONTAINS","value":"shoes","locale":"en_US","scope":"ecommerce"}]}

is equivalent to

/api/rest/v1/products-uuid?search={"release_date":[{"operator":">","value":"2016-07-04"}],"short_description":[{"operator":"CONTAINS","value":"shoes","locale":"en_US"}]}&search_scope=ecommerce
```

:::info
This query parameter is also available for the published products.
:::

### Available operators

As seen previously, the attribute type determines which set of operators is available to use these filters.

**The `pim_catalog_identifier` attribute type**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators                                  | Allowed value type |
| -------------------------------------------------- | ------------------ |
| STARTS WITH, CONTAINS, DOES NOT CONTAIN            | string             |
| =, !=                                              | string             |
| EMPTY, NOT EMPTY                                   | no value           |

::: availability versions=7.0,SaaS editions=CE,EE

| Allowed operators | Allowed value type                    |
| ----------------- | ------------------------------------- |
| IN, NOT IN        | list of strings (product identifiers) |

::: warning
With the IN operator, the list of product identifiers can contain up to **100** strings.
:::

**The `pim_catalog_text` and `pim_catalog_textarea` attribute types**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators                                  | Allowed value type            |
| -------------------------------------------------- |-------------------------------|
| STARTS WITH, CONTAINS, DOES NOT CONTAIN            | string                        |
| =, !=                                              | string                        |
| EMPTY, NOT EMPTY                                   | no value                      |
| IN, NOT IN                                         | array of existing text values |


**The `pim_catalog_number`, `pim_catalog_metric` and `pim_catalog_price_collection` attribute types**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators   | Allowed value type |
| ------------------- | ------------------ |
| <, <=, =, !=, >=, > | integer            |
| EMPTY, NOT EMPTY    | no value           |

**The `pim_catalog_simpleselect` and `pim_catalog_multiselect` attribute types**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators | Allowed value type                                 |
| ----------------- | -------------------------------------------------- |
| IN, NOT IN        | an existing attribute option code of the attribute |
| EMPTY, NOT EMPTY  | no value                                           |

**The `pim_catalog_boolean` attribute type**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators | Allowed value type                                 |
| ----------------- | -------------------------------------------------- |
| =, !=             | boolean                                            |
| EMPTY, NOT EMPTY  | no value (only available since 5.0 and on SaaS versions) |

**The `pim_catalog_date` attribute type**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators    | Allowed value type                         |
| -------------------- | ------------------------------------------ |
| <, =, !=, >          | dateTime (ISO-8601)                        |
| BETWEEN, NOT BETWEEN | [dateTime (ISO-8601), dateTime (ISO-8601)] |
| EMPTY, NOT EMPTY     | no value                                   |

**The `pim_catalog_file` and `pim_catalog_image` attribute types**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators                                         | Allowed value type |
| --------------------------------------------------------- | ------------------ |
| STARTS WITH, CONTAINS, DOES NOT CONTAIN, =, !=            | string             |
| EMPTY, NOT EMPTY                                          | no value           |

**The `pim_catalog_asset_collection` attribute type**
::: availability versions=7.0,SaaS editions=EE

| Allowed operators | Allowed value type  |
|-------------------|---------------------|
| IN, NOT IN        | list of asset codes |
| EMPTY, NOT EMPTY  | no value            |

**The `akeneo_reference_entity` and `akeneo_reference_entity_collection` attribute types**
::: availability versions=7.0,SaaS editions=EE

| Allowed operators | Allowed value type   |
|-------------------|----------------------|
| IN, NOT IN        | list of record codes |
| EMPTY, NOT EMPTY  | no value             |

**The `pim_catalog_product_link` attribute type**
::: availability versions=SaaS editions=EE

| Allowed operators | Allowed value type    |
|-------------------|-----------------------|
| IN, NOT IN        | list of product links |
| EMPTY, NOT EMPTY  | no value              |

A product link has the following structure:

```json
{
  "type": "product",
  "id": "31243126-cfa4-4d8c-a3ea-e989e059eae2"
}
```

Where `type` value can be one of the following: `product`, `product_model` and `id` is the product UUID in case the type is `product` or the product model code in case type is `product_model`.

**The `pim_catalog_table` attribute type**
::: availability versions=SaaS editions=EE

The attributes of type `pim_catalog_table` are a little special, because the available operators will depend on the **type of cell (column) to be filtered**. Therefore, refer to the operators specific to each type above to filter the cells.

In the following example, we will filter the `Food_Composition` attribute, which is a table attribute. The table has a column named `percentage` and a row named `sugar`, and we want to get all products that have a sugar percentage greater than 50. As the `percentage` is a number, we will inherit all `pim_catalog_number` operators, so we can use the `>` operator.
```json
{
    "field": "Food_Composition",
    "value": {
        "row": "sugar",
        "value": "50",
        "column": "percentage"
    },
    "operator": ">"
}
```

It is also possible to filter on a Table attribute to find out if it has at least one value, or none. To do this, you can use the `EMPTY` and `NOT EMPTY` operators. In the example below, we will filter the `Food_Composition` attribute to get all products that have no value in this attribute:

```json
{
    "field": "Food_Composition",
    "value": [],
    "operator": "NOT EMPTY"
}

```

## Filter product values

Thanks to the above sections, you are able to filter your products to only get those you want. In this section, you will see that you also can filter the product values to only receive those you want.

:::info
Filtering product values via attributes, channel or locale is also available for published products.
:::

### Via attributes

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

If you want to receive for each product only product values about specific attributes, you can specify it thanks to the `attributes` query parameter.

#### Example

To get products with only product values regarding the `description` attribute, you can use the following URL.

```
/api/rest/v1/products-uuid?attributes=description
```

You can filter product values on several attributes at the same time.

```
/api/rest/v1/products-uuid?attributes=name,description
```

### Via locale

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

If you want to receive for each product only product values on specific locales, as well as the product values of the non localizable attributes, you can specify it thanks to the `locales` query parameter.

#### Example 1

Imagine that without this filter you get these product values:

```json
{
  "color": [
    {
      "data": "carmine_red",
      "locale": null,
      "scope": null
    }
  ],
  "name": [
    {
      "data": "Top",
      "locale": "en_US",
      "scope": null
    },
    {
      "data": "Débardeur",
      "locale": "fr_FR",
      "scope": null
    }
  ],
  "description": [
    {
      "data": "Summer top",
      "locale": "en_US",
      "scope": "ecommerce"
    },
    {
      "data": "Top",
      "locale": "en_US",
      "scope": "tablet"
    },
    {
      "data": "Débardeur pour l'été",
      "locale": "fr_FR",
      "scope": "ecommerce"
    },
    {
      "data": "Débardeur",
      "locale": "fr_FR",
      "scope": "tablet"
    }
  ]
}
```

To get only product values regarding the `en_US` locale (+ the product values of the non localizable attributes), you can use the following URL.

```
/api/rest/v1/products-uuid?locales=en_US
```

As a result you will receive the following answer:

```json
{
  "color": [
    {
      "data": "carmine_red",
      "locale": null,
      "scope": null
    }
  ],
  "name": [
    {
      "data": "Top",
      "locale": "en_US",
      "scope": null
    }
  ],
  "description": [
    {
      "data": "Summer top",
      "locale": "en_US",
      "scope": "ecommerce"
    },
    {
      "data": "Top",
      "locale": "en_US",
      "scope": "tablet"
    }
  ]
}
```

::: warning
As you can see, for the simple select attribute named `color`, as the attribute is not localizable (the `locale` field is set to `null`), the product value of this attribute is not filtered and you still get the code of the attribute option, `carmine_red`.
If you want to get the localized label of this attribute option, you will have to request the [attribute option endpoint](/api-reference.html#get_attributes__attribute_code__options__code_).
:::

#### Example 2

You can also filter product values on several locales at the same time.

```
/api/rest/v1/products-uuid?locales=en_US,fr_FR
```

### Via channel

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

There is also a `scope` query parameter that will allow you to:

- get only the selection of products that are in the tree linked to the channel you specified,
- get only the product values for this specific channel, as well as the product values of the non scopable attributes.

#### Example

To get products from the tree linked to the `ecommerce` channel with only product values regarding the `ecommerce` channel (+ the product values of the non scopable attributes), you can use the following URL.

```
/api/rest/v1/products-uuid?scope=ecommerce
```

:::warning
Note that you cannot use this filter on several channels.
:::

:::info
When using this query parameter, you will never be able to retrieve products that are not categorized. This is due to the fact that we only return the selection of products that are in the tree linked to the given channel. In other words, if a given product is not categorized in this tree, you won't receive it.
:::

## Filter on published product properties

To filter published products by one of their properties, you can use the `search` query parameter. The value given to this query parameter should be a valid JSON as shown below.

```
/api/rest/v1/published-products?search={PUBLISHED_PRODUCT_PROPERTY:[{"operator":OPERATOR,"value":VALUE}]}
```

In the above url :

- `PUBLISHED_PRODUCT_PROPERTY` can be any property detailed in the sections below,
- `OPERATOR` is an allowed operator for this `PUBLISHED_PRODUCT_PROPERTY`,
- `VALUE` is a value whose type corresponds to the allowed type detailed below.

#### Examples

To only retrieve enabled published products, you can use the following URL.

```
/api/rest/v1/published-products?search={"enabled":[{"operator":"=","value":true}]}
```

Of course, you can combine as many filters as you want. The example below will get you the enabled published products being 70% complete.

```
/api/rest/v1/published-products?search={"enabled":[{"operator":"=","value":true}],"completeness":[{"operator":">","value":70,"scope":"ecommerce"}]}
```

You can even combine several filters on the same published product properties. The example below will get you the published products created both the 4th and the 5th of July 2016.

```
/api/rest/v1/published-products?search={"created":[{"operator":"=","value":"2016-07-04 10:00:00"},{"operator":"=","value":"2016-07-05 10:00:00"}]}
```

### On their categories

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter published products on their categories, use the property `categories`.
Here are the allowed operators you can use to filter on the category code as well as the corresponding type of value expected in the `search` query parameter.

| Operator             | Allowed value type                  | Filter description                                                                                                |
| -------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `IN`                 | an array of existing category codes | Only returns the published products that are in the given categories                                              |
| `NOT IN`             | an array of existing category codes | Only returns the published products that are not in the given categories                                          |
| `IN OR UNCLASSIFIED` | an array of existing category codes | Only returns the published products that are in the given categories or that are not classified in any categories |
| `IN CHILDREN`        | an array of existing category codes | Only returns the published products that are in the children of the given categories                              |
| `NOT IN CHILDREN`    | an array of existing category codes | Only returns the published products that are not in the children of the given categories                          |
| `UNCLASSIFIED`       | no value                            | Only returns the published products that are not classified into any category                                     |

#### Example

To get the published products of the `winter_collection` category, you can use the following URL.

```
/api/rest/v1/published-products?search={"categories":[{"operator":"IN","value":["winter_collection"]}]}
```

### On their status

::: availability versions=5.0,6.0,7.0,SaaS editions=CE,EE

To filter published products on their status, use the `enabled` property.
Here are the allowed operators you can use to filter on the status as well as the corresponding type of value expected in the `search` query parameter.

| Operator | Allowed value type | Filter description                                                              |
| -------- | ------------------ | ------------------------------------------------------------------------------- |
| `=`      | boolean            | Only returns published products that are enabled (`true`) or disabled (`false`) |
| `!=`     | boolean            | Only returns published products that are enabled (`false`) or disabled (`true`) |

#### Example

To get the disabled published products, you can use the following URL.

```
/api/rest/v1/published-products?search={"enabled":[{"operator":"=","value":false}]}
```

### On their completeness

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter published products on their completeness, use the `completeness` published product property. You will also need to provide a `scope` value to specify on which channel you want to filter with the completeness.
Here are the allowed operators you can use to filter by completeness as well as the corresponding type of value expected in the `search` query parameter.

| Operator                                                                 | Allowed value type | Filter description                                                                                                                                                           |
| ------------------------------------------------------------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<` or `<=`                                                              | integer            | Only returns published products that have a completeness lower than (or equal to) the given value on the given channel independently of locales.                             |
| `>` or `>=`                                                              | integer            | Only returns published products that have a completeness greater than (or equal to) the given value on the given channel independently of locales.                           |
| `=`                                                                      | integer            | Only returns published products that have completeness equal to the given value on the given channel independently of locales.                                               |
| `!=`                                                                     | integer            | Only returns published products that have a completeness different from the given value on the given channel independently of locales.                                       |
| `GREATER THAN ON ALL LOCALES` or `GREATER OR EQUALS THAN ON ALL LOCALES` | integer            | Only returns published products that have a completeness on all locales that is greater than (or equal to) the given value on the given channel for the given set of locales |
| `LOWER THAN ON ALL LOCALES` or `LOWER OR EQUALS THAN ON ALL LOCALES`     | integer            | Only returns published products that have a completeness on all locales that is lower than (or equal to) the given value on the given channel for the given set of locales   |

#### Examples

To get the published products that are 100% complete for the `ecommerce` channel, you can use the following URL.

```
/api/rest/v1/published-products?search={"completeness":[{"operator":"=","value":100,"scope":"ecommerce"}]}
```

To get the published products that are 100% complete on both the `en_US` and `fr_FR` locales for the `ecommerce` channel, you can use the following URL.

```
/api/rest/v1/published-products?search={"completeness":[{"operator":"GREATER OR EQUALS THAN ON ALL LOCALES","value":100,"locales":["en_US","fr_FR"],"scope":"ecommerce"}]}
```

### On their group or family

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter published products on groups or families, use respectively the published product property `groups` and `family`.
Here are the allowed operators you can use to filter on these properties as well as the corresponding type of value expected in the `search` query parameter.

| Operator    | Allowed value type                | Filter description                                                                        |
| ----------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| `IN`        | array of existing group or family | Only returns published products that are respectively in the given families or groups     |
| `NOT IN`    | array of existing group or family | Only returns published products that are respectively not in the given families or groups |
| `EMPTY`     | no value                          | Only returns published products that have respectively no groups or no family             |
| `NOT EMPTY` | no value                          | Only returns published products that have respectively a group or a family                |

#### Examples

To get the published products that are in the `promotion` group, you can use the following URL.

```
/api/rest/v1/published-products?search={"groups":[{"operator":"IN","value":["promotion"]}]}
```

To get the published products that are not in the `camcorders` and `digital_cameras` family, you can use the following URL.

```
/api/rest/v1/published-products?search={"family":[{"operator":"NOT IN","value":["camcorders","digital_cameras"]}]}
```

### On their creation or update date

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter published products on creation or update date, use respectively the published product property `created` and `updated`.
Here are the allowed operators to filter on these properties as well as the corresponding type of value expected in the `search` query parameter.

::: info
Please note that dates are interpreted in the time zone of the server that runs Akeneo (e.g. date.timezone setting in php.ini). For SaaS clients, please note that the time zone of the server is in UTC as this is the most precise and commonly referred to time standard.
:::

| Operator            | Allowed value type                                    | Filter description                                                                                                            |
| ------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `=`                 | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns published products that were respectively<br> updated or created during the given day                            |
| `!=`                | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns published products that were respectively<br> not updated or not created during the given day                    |
| `<`                 | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns published products that were respectively<br> updated or created before the given day                            |
| `>`                 | datetime <br> _Format: YYYY-MM-DD hh:mm:ss_           | Only returns published products that were respectively<br> updated or created after the given day                             |
| `BETWEEN`           | array of datetimes <br> _Format: YYYY-MM-DD hh:mm:ss_ | Only returns published products that were respectively<br> updated or created between the two given dates                     |
| `NOT BETWEEN`       | array of datetimes <br> _Format: YYYY-MM-DD hh:mm:ss_ | Only returns published products that were respectively<br> not updated or not created between the two given dates             |
| `SINCE LAST N DAYS` | integer                                               | Only returns published products that were respectively updated<br> or created during the last n days, n being the given value |

|

#### Examples

To get the published products that were created on the 4th of July 2016 at 10am, you can use the following URL.

```
/api/rest/v1/published-products?search={"created":[{"operator":"=","value":"2016-07-04 10:00:00"}]}
```

To get the published products that were updated during the last 4 days, you can use the following URL.

```
/api/rest/v1/published-products?search={"updated":[{"operator":"SINCE LAST N DAYS","value":4}]}
```

## Filter on published product values

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

To filter published products, and product models **since the v2.3**, on its [product values](/concepts/products.html#focus-on-the-product-values), you can use the `search` query parameter when requesting products. The value given to this query parameter should be a valid JSON as shown below.

```
/api/rest/v1/published-products?search={ATTRIBUTE_CODE:[{"operator":OPERATOR,"value":VALUE,"locale":LOCALE_CODE,"scope":CHANNEL_CODE}]}
```

In the above url :

- `ATTRIBUTE_CODE` can be any existing attribute code,
- `OPERATOR` is an allowed operator for the attribute type of the `ATTRIBUTE_CODE` attribute,
- `VALUE` is a value whose type corresponds to the attribute type of the `ATTRIBUTE_CODE` attribute,
- `LOCALE_CODE` is an existing locale code that should be only given when the `ATTRIBUTE_CODE` attribute is localizable
- `CHANNEL_CODE` is an existing channel code that should be only given when the `ATTRIBUTE_CODE` attribute is scopable.

#### Examples

To get published products that are purple, purple being an option of the simple select `main_color` attribute and this attribute being neither localizable nor scopable, you can use the following URL.

```
/api/rest/v1/published-products?search={"main_color":[{"operator":"IN","value":["purple"]}]}
```

To get published products having a description begining with `Amazing` on the `en_US` locale, the `short_description` attribute being localizable but not scopable, you can use the following URL.

```
/api/rest/v1/published-products?search={"short_description":[{"operator":"STARTS WITH","value":"Amazing","locale":"en_US"}]}
```

To get published products that have a release date due after the 4th of July 2016 for the `ecommerce` channel, the `release_date` attribute being scopable but not localizable, you can use the following URL.

```
/api/rest/v1/published-products?search={"release_date":[{"operator":">","value":"2016-07-04","scope":"ecommerce"}]}
```

To get published products that have a name that contains with `shirt` on the `en_US` locale for the `mobile` channel, the `name` attribute being both localizable and scopable, you can use the following URL.

```
/api/rest/v1/published-products?search={"name":[{"operator":"CONTAINS","value":"shirt","locale":"en_US","scope":"mobile"}]}
```

Of course, you can combine as many filters as you want. The example below will get you the published products with description starting with `Amazing` on the `en_US` locale for the `ecommerce` channel, and of purple color.

```
/api/rest/v1/published-products?search={"description":[{"operator":"STARTS WITH","value":"Amazing","locale":"en_US","scope":"ecommerce"}],"main_color":[{"operator":"IN","value":["purple"]}]}
```

You can even combine several filters on the same attribute. The example below will get you the published products with not empty description on the `en_US` locale and empty description on the `fr_FR` locale for the `ecommerce` channel.

```
/api/rest/v1/published-products?search={"description":[{"operator":"NOT EMPTY","locale":"en_US","scope":"ecommerce"},{"operator":"EMPTY","locale":"fr_FR","scope":"ecommerce"}]}
```

### `search_locale` query parameter

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
If you need to filter on several attributes on the same locale, you can use the `search_locale` query parameter, to avoid repeating yourself for each attribute. This parameter expect an existing locale code.

#### Example

```
/api/rest/v1/published-products?search={"description":[{"operator":"STARTS WITH","value":"Amazing","locale":"en_US","scope":"ecommerce"}],"short_description":[{"operator":"CONTAINS","value":"shoes","locale":"en_US","scope":"ecommerce"}]}

is equivalent to

/api/rest/v1/published-products?search={"description":[{"operator":"STARTS WITH","value":"Amazing","scope":"ecommerce"}],"short_description":[{"operator":"CONTAINS","value":"shoes","scope":"ecommerce"}]}&search_locale=en_US
```

### `search_scope` query parameter

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE
If you need to filter on several attributes on the same channel, you can use the `search_scope` query parameter, to avoid repeating yourself for each attribute. This parameter expect an existing channel code.

#### Example

```
/api/rest/v1/published-products?search={"release_date":[{"operator":">","value":"2016-07-04","scope":"ecommerce"}],"short_description":[{"operator":"CONTAINS","value":"shoes","locale":"en_US","scope":"ecommerce"}]}

is equivalent to

/api/rest/v1/published-products?search={"release_date":[{"operator":">","value":"2016-07-04"}],"short_description":[{"operator":"CONTAINS","value":"shoes","locale":"en_US"}]}&search_scope=ecommerce
```

### Available operators

As seen previously, the attribute type determines which set of operators is available to use these filters.

**The `pim_catalog_identifier`, `pim_catalog_text` and `pim_catalog_textarea` attribute types**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators                                  | Allowed value type            |
| -------------------------------------------------- |-------------------------------|
| STARTS WITH, CONTAINS, DOES NOT CONTAIN            | string                        |
| =, !=                                              | string                        |
| EMPTY, NOT EMPTY                                   | no value                      |
| IN, NOT IN                                         | array of existing text values |

**The `pim_catalog_number`, `pim_catalog_metric` and `pim_catalog_price_collection` attribute types**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators   | Allowed value type |
| ------------------- | ------------------ |
| <, <=, =, !=, >=, > | integer            |
| EMPTY, NOT EMPTY    | no value           |

**The `pim_catalog_simpleselect` and `pim_catalog_multiselect` attribute types**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators | Allowed value type                                 |
| ----------------- | -------------------------------------------------- |
| IN, NOT IN        | an existing attribute option code of the attribute |
| EMPTY, NOT EMPTY  | no value                                           |

**The `pim_catalog_boolean` attribute type**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators | Allowed value type                                 |
| ----------------- | -------------------------------------------------- |
| =, !=             | boolean                                            |
| EMPTY, NOT EMPTY  | no value (only available since the 5.0 version) |

**The `pim_catalog_date` attribute type**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators    | Allowed value type                         |
| -------------------- | ------------------------------------------ |
| <, =, !=, >          | dateTime (ISO-8601)                        |
| BETWEEN, NOT BETWEEN | [dateTime (ISO-8601), dateTime (ISO-8601)] |
| EMPTY, NOT EMPTY     | no value                                   |

**The `pim_catalog_file` and `pim_catalog_image` attribute types**
::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

| Allowed operators                                         | Allowed value type |
| --------------------------------------------------------- | ------------------ |
| STARTS WITH, CONTAINS, DOES NOT CONTAIN, =, !=            | string             |
| EMPTY, NOT EMPTY                                          | no value           |

## Filter published product values

Thanks to the above sections, you are able to filter your published products to only get those you want. In this section, you will see that you also can filter the published product values to only receive those you want.

### Via attributes

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

If you want to receive for each published product only published product values about specific attributes, you can specify it thanks to the `attributes` query parameter.

#### Example

To get published products with only published product values regarding the `description` attribute, you can use the following URL.

```
/api/rest/v1/published-products?attributes=description
```

You can filter published product values on several attributes at the same time.

```
/api/rest/v1/published-products?attributes=name,description
```

### Via locale

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

If you want to receive for each product only product values on specific locales, as well as the product values of the non localizable attributes, you can specify it thanks to the `locales` query parameter.

#### Example 1

Imagine that without this filter you get these product values:

```json
{
  "color": [
    {
      "data": "carmine_red",
      "locale": null,
      "scope": null
    }
  ],
  "name": [
    {
      "data": "Top",
      "locale": "en_US",
      "scope": null
    },
    {
      "data": "Débardeur",
      "locale": "fr_FR",
      "scope": null
    }
  ],
  "description": [
    {
      "data": "Summer top",
      "locale": "en_US",
      "scope": "ecommerce"
    },
    {
      "data": "Top",
      "locale": "en_US",
      "scope": "tablet"
    },
    {
      "data": "Débardeur pour l'été",
      "locale": "fr_FR",
      "scope": "ecommerce"
    },
    {
      "data": "Débardeur",
      "locale": "fr_FR",
      "scope": "tablet"
    }
  ]
}
```

To get only product values regarding the `en_US` locale (+ the product values of the non localizable attributes), you can use the following URL.

```
/api/rest/v1/published-products?locales=en_US
```

As a result you will receive the following answer:

```json
{
  "color": [
    {
      "data": "carmine_red",
      "locale": null,
      "scope": null
    }
  ],
  "name": [
    {
      "data": "Top",
      "locale": "en_US",
      "scope": null
    }
  ],
  "description": [
    {
      "data": "Summer top",
      "locale": "en_US",
      "scope": "ecommerce"
    },
    {
      "data": "Top",
      "locale": "en_US",
      "scope": "tablet"
    }
  ]
}
```

::: warning
As you can see, for the simple select attribute named `color`, as the attribute is not localizable (the `locale` field is set to `null`), the product value of this attribute is not filtered and you still get the code of the attribute option, `carmine_red`.
If you want to get the localized label of this attribute option, you will have to request the [attribute option endpoint](/api-reference.html#get_attributes__attribute_code__options__code_).
:::

#### Example 2

You can also filter product values on several locales at the same time.

```
/api/rest/v1/published-products?locales=en_US,fr_FR
```

### Via channel

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

There is also a `scope` query parameter that will allow you to:

- get only the selection of products that are in the tree linked to the channel you specified,
- get only the product values for this specific channel, as well as the product values of the non scopable attributes.

#### Example

To get published products from the tree linked to the `ecommerce` channel with only product values regarding the `ecommerce` channel (+ the product values of the non-scopable attributes), you can use the following URL.

```
/api/rest/v1/published-products?scope=ecommerce
```

:::warning
Note that you cannot use this filter on several channels.
:::

:::info
When using this query parameter, you will never be able to retrieve published products that are not categorized. This is due to the fact that we only return the selection of products that are in the tree linked to the given channel. In other words, if a given product is not categorized in this tree, you won't receive it.
:::

## Filter locales

::: availability versions=1.7,2.x,3.x,4.0,5.0,6.0,7.0,SaaS editions=CE,EE

When requesting locales, you can use a filter to get the enabled ones.

#### Example

```
/api/rest/v1/locales?search={"enabled":[{"operator":"=","value":true}]}
```

## Filter currencies

::: availability versions=SaaS editions=CE,EE

When requesting currencies, you can use a filter to get the enabled ones.

#### Example

```
/api/rest/v1/currencies?search={"enabled":[{"operator":"=","value":true}]}
```

## Filter reference entity records

### By record codes

::: availability versions=7.0,SaaS editions=EE

You can filter the reference entity records by their code.

Below is the operator to filter on this property, as well as the corresponding type of value expected in the `search` query parameter.

| Operator | Allowed value type                 | Filter description                        |
|----------|------------------------------------|-------------------------------------------|
| `IN`     | an array of existing record codes  | Only returns records that are in the list |

#### Example

```
/api/rest/v1/reference-entities/brands/records?search={"code":[{"operator":"IN","value":["code1","code2"]}]}
```


### By completeness

::: availability versions=3.x,4.0,5.0,6.0,7.0,SaaS editions=EE

You can filter the reference entity records to get only the completed ones on a given channel for given locales.

#### Example

```
/api/rest/v1/reference-entities/brands/records?search={"complete":{"operator":"=","value":true,"channel":"ecommerce","locales":["en_US"]}}
```

### By update date

::: availability versions=3.x,4.0,5.0,6.0,7.0,SaaS editions=EE

You can filter the reference entity records by their update date.

Below are the allowed operators to filter on this property, as well as the corresponding type of value expected in the `search` query parameter.

::: info
Please note that you have to write dates in either of these format _2021-05-17T15:19:32Z_, or _2021-05-17T15:19:32+00:00_ according to the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601).

Moreover dates are interpreted in the time zone of the server that runs Akeneo (e.g. date.timezone setting in php.ini). For SaaS clients, please note that the time zone of the server is in UTC as this is the most precise and commonly referred to time standard.
:::

| Operator | Allowed value type               | Filter description                                                                   |
| -------- | -------------------------------- | ------------------------------------------------------------------------------------ |
| `>`      | datetime <br> _Format: ISO 8601_ | Only returns records that were respectively<br> updated after the given day and hour |

::: availability versions=7.0,SaaS editions=EE

| Operator            | Allowed value type                         | Filter description                                                                         |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `<`                 | datetime <br> _Format: ISO 8601_           | Only returns records that were <br> updated before the given day and hour                   |
| `BETWEEN`           | array of datetimes <br> _Format: ISO 8601_ | Only returns records that were <br> updated between the two given dates                     |
| `NOT BETWEEN`       | array of datetimes <br> _Format: ISO 8601_ | Only returns records that were <br> not updated between the two given dates                 |
| `SINCE LAST N DAYS` | integer                                    | Only returns records that were <br> updated during the last n days, n being the given value |

#### Example

To get the reference entity records that were updated since the 4th of July 2016 at 10am (UTC), you can use the following URL.

```
/api/rest/v1/reference-entities/brands/records?search={"updated":[{"operator":">","value":"2018-07-04T10:00:00+00:00"}]}
```

### Record values by locale

::: availability versions=3.x,4.0,5.0,6.0,7.0,SaaS editions=EE

If you want to receive reference entity records of one given reference entity with only the attribute values of specific locales, as well as the attribute values of the non localizable attributes, you can specify it thanks to the `locales` query parameter.

#### Example 1

Imagine that without this filter you get these attribute values:

```json
{
  "description": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "He's a well-known manufacturer of high-end furniture that was founded in Italy."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "He's an Italian manufacturer of high-end furniture. It was founded in Italy."
    },
    {
      "locale": "fr_FR",
      "channel": "mobile",
      "data": "Il est un fabricant de meuble renommée qui fut fondé en Italie."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Il est un fabricant italien de meubles de luxe. L'entreprise a été fondé en Italie."
    }
  ],
  "creation_year": [
    {
      "locale": null,
      "channel": null,
      "data": "1923"
    }
  ]
}
```

To get only the attribute values regarding the `en_US` locale (+ the attribute values of the non localizable attributes), you can use the following URL.

```
/api/rest/v1/reference-entities/brands/records?locales=en_US
```

As a result you will receive the following answer:

```json
{
  "description": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "He's a well-known manufacturer of high-end furniture that was founded in Italy."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "He's an Italian manufacturer of high-end furniture. It was founded in Italy."
    }
  ],
  "creation_year": [
    {
      "locale": null,
      "channel": null,
      "data": "1923"
    }
  ]
}
```

#### Example 2

You can also filter attribute values on several locales at the same time.

```
/api/rest/v1/reference-entities/brands/records?locales=en_US,fr_FR
```

### Record values by channel

::: availability versions=3.x,4.0,5.0,6.0,7.0,SaaS editions=EE

There is also a `channel` query parameter that will allow you to get only the attribute values for a specific channel, as well as the attribute values of the non scopable attributes.

:::warning
Note that you cannot use this filter on several channels.
:::

#### Example

Imagine that without this filter you get these attribute values:

```json
{
  "description": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "He's a well-known manufacturer of high-end furniture that was founded in Italy."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "He's an Italian manufacturer of high-end furniture. It was founded in Italy."
    },
    {
      "locale": "fr_FR",
      "channel": "mobile",
      "data": "Il est un fabricant de meuble renommée qui fut fondé en Italie."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Il est un fabricant italien de meubles de luxe. L'entreprise a été fondé en Italie."
    }
  ],
  "creation_year": [
    {
      "locale": null,
      "channel": null,
      "data": "1923"
    }
  ]
}
```

To get only the attribute values regarding the `ecommerce` channel (+ the attribute values of the non scopable attributes), you can use the following URL.

```
/api/rest/v1/reference-entities/brands/records?channel=ecommerce
```

As a result you will receive the following answer:

```json
{
  "description": [
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "He's an Italian manufacturer of high-end furniture. It was founded in Italy."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Il est un fabricant italien de meubles de luxe. L'entreprise a été fondé en Italie."
    }
  ],
  "creation_year": [
    {
      "locale": null,
      "channel": null,
      "data": "1923"
    }
  ]
}
```

## Filter assets

When requesting a [list of assets via the REST API](/api-reference.html#get_assets), you can apply filters to get only the ones you want and also the kind of information you want in them.

### By asset codes

::: availability versions=7.0,SaaS editions=EE

You can filter the assets by their code.

Below is the operator to filter on this property, as well as the corresponding type of value expected in the `search` query parameter.

| Operator | Allowed value type               | Filter description                       |
|----------|----------------------------------|------------------------------------------|
| `IN`     | an array of existing asset codes | Only returns assets that are in the list |

#### Example

```
/api/rest/v1/asset-families/model_pictures/assets?search={"code":[{"operator":"IN","value":["code1","code2"]}]}
```

### By update date

You can filter the assets by their update date.

Below is the operator to filter on this property, as well as the corresponding type of value expected in the `search` query parameter.

::: info
Please note that you have to write dates in either of these format _2021-05-17T15:19:32Z_, or _2021-05-17T15:19:32+00:00_ according to the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601).

Moreover dates are interpreted in the time zone of the server that runs Akeneo (e.g. date.timezone setting in php.ini). For SaaS clients, please note that the time zone of the server is in UTC as this is the most precise and commonly referred to time standard.
:::

::: availability versions=3.2,4.0,5.0,6.0,7.0,SaaS editions=EE

| Operator            | Allowed value type                         | Filter description                                                                         |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `>`                 | datetime <br> _Format: ISO 8601_           | Only returns assets that were <br> updated after the given day and hour                    |

::: availability versions=6.0,7.0,SaaS editions=EE

| Operator            | Allowed value type                         | Filter description                                                                         |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `<`                 | datetime <br> _Format: ISO 8601_           | Only returns assets that were <br> updated before the given day and hour                   |
| `BETWEEN`           | array of datetimes <br> _Format: ISO 8601_ | Only returns assets that were <br> updated between the two given dates                     |
| `NOT BETWEEN`       | array of datetimes <br> _Format: ISO 8601_ | Only returns assets that were <br> not updated between the two given dates                 |
| `SINCE LAST N DAYS` | integer                                    | Only returns assets that were <br> updated during the last n days, n being the given value |

#### Example

To get the assets that were updated since the 4th of July 2018 at 10am (UTC), you can use the following URL.

```
/api/rest/v1/asset-families/model_pictures/assets?search={"updated":[{"operator":">","value":"2018-07-04T10:00:00Z"}]}
```

You can also combine operators.

```
/api/rest/v1/asset-families/model_pictures/assets?search={"updated":[{"operator":">","value":"2018-07-04T10:00:00Z"},{"operator":"<","value":"2018-08-04T10:00:00Z"}]}
```

To get the assets that were updated over a period of time, you can use the `BETWEEN` and `NOT BETWEEN` operators.

```
/api/rest/v1/asset-families/model_pictures/assets?search={"updated":[{"operator":"NOT BETWEEN","value":["2018-07-04T10:00:00Z","2018-08-04T10:00:00Z"]}]}
```

Finally, if you want to get the assets updated in the last 4 days, you can use the `SINCE LAST N DAYS` operator.

```
/api/rest/v1/asset-families/model_pictures/assets?search={"updated":[{"operator":"SINCE LAST N DAYS","value":4}]}
```

### By attribute values

:::: availability versions=7.0,SaaS editions=EE

You can filter assets on their attribute values using the `search` query parameter. Put your attribute filters under the `values` key. Each property under `values` is an attribute identifier. For scopable/localizable attributes, you can optionally specify a `channel` and/or `locale` in the filter. If omitted, the API will try to use the `channel`/`locales` provided in the request.

Supported types and operators:
- text: `=`, `CONTAINS`, `DOES NOT CONTAIN`, `STARTS WITH`, `ENDS WITH`, `IS EMPTY`, `IS NOT EMPTY`
- number: `=`, `IS EMPTY`, `IS NOT EMPTY`
- boolean: `=`, `IS EMPTY`, `IS NOT EMPTY`
- date: `=`, `<`, `>`, `BETWEEN`, `NOT BETWEEN`, `IS EMPTY`, `IS NOT EMPTY`
- option/option_collection: `IN`, `IS EMPTY`, `IS NOT EMPTY`
- record: `=`, `IN`, `IS EMPTY`

Notes:
- Filtering on attribute types `media_file` and `media_link` is not supported. The API will return a 422 error.
- Attribute identifiers must match the regex `^[a-zA-Z0-9_]+$`.
- For `record` attributes, use operator `=` with value `true` to express non-empty (and `false` for empty). There is no `IS NOT EMPTY` operator for record.

#### Examples

Filter by a text attribute value:

```
/api/rest/v1/asset-families/{asset_family_code}/assets?search={"values":{"title":{"operator":"CONTAINS","value":"summer","locale":"en_US","channel":"ecommerce"}}}
```

Filter by an option (simple or collection):

```
/api/rest/v1/asset-families/{asset_family_code}/assets?search={"values":{"usage":{"operator":"IN","value":["web","print"]}}}
```
::::

### Asset values by locale

::: availability versions=3.2,4.0,5.0,6.0,7.0,SaaS editions=EE

If you want to receive assets with only the asset values of specific locales, as well as the attribute values of the non localizable attributes, you can specify it thanks to the `locales` query parameter.

#### Example 1

Imagine that without this filter you get these asset values:

```json
{
  "warning_mention": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "Photo retouched."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "Photo retouched. This does not necessarily reflect the reality."
    },
    {
      "locale": "fr_FR",
      "channel": "mobile",
      "data": "Photo retouchée."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Photo retouchée, ne représentant pas forcément la réalité."
    }
  ],
  "model_is_wearing_size": [
    {
      "locale": null,
      "channel": null,
      "data": "small"
    }
  ]
}
```

To get only the asset values regarding the `en_US` locale (+ the attribute values of the non localizable attributes), you can use the following URL.

```
/api/rest/v1/asset-families/model_pictures/assets?locales=en_US
```

As a result you will receive the following answer:

```json
{
  "warning_mention": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "Photo retouched."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "Photo retouched. This does not necessarily reflect the reality."
    }
  ],
  "model_is_wearing_size": [
    {
      "locale": null,
      "channel": null,
      "data": "small"
    }
  ]
}
```

#### Example 2

You can also filter asset values on several locales at the same time.

```
/api/rest/v1/asset-families/model_pictures/assets?locales=en_US,fr_FR
```

### Asset values by channel

::: availability versions=3.2,4.0,5.0,6.0,7.0,SaaS editions=EE

There is also a `channel` query parameter that will allow you to get only the asset values for a specific channel, as well as the asset values of the non scopable attributes.

:::warning
Note that you cannot use this filter on several channels.
:::

#### Example

Imagine that without this filter you get these asset values:

```json
{
  "warning_mention": [
    {
      "locale": "en_US",
      "channel": "mobile",
      "data": "Photo retouched."
    },
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "Photo retouched. This does not necessarily reflect the reality."
    },
    {
      "locale": "fr_FR",
      "channel": "mobile",
      "data": "Photo retouchée."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Photo retouchée, ne représentant pas forcément la réalité."
    }
  ],
  "model_is_wearing_size": [
    {
      "locale": null,
      "channel": null,
      "data": "small"
    }
  ]
}
```

To get only the attribute values regarding the `ecommerce` channel (+ the attribute values of the non scopable attributes), you can use the following URL.

```
/api/rest/v1/asset-families/model_pictures/assets?channel=ecommerce
```

As a result you will receive the following answer:

```json
{
  "warning_mention": [
    {
      "locale": "en_US",
      "channel": "ecommerce",
      "data": "Photo retouched. This does not necessarily reflect the reality."
    },
    {
      "locale": "fr_FR",
      "channel": "ecommerce",
      "data": "Photo retouchée, ne représentant pas forcément la réalité."
    }
  ],
  "model_is_wearing_size": [
    {
      "locale": null,
      "channel": null,
      "data": "small"
    }
  ]
}
```

## Filter attributes

When you request specific attributes, you can use filters to select only the ones you want.

### By attribute codes

::: availability versions=4.0,5.0,6.0,7.0,SaaS editions=CE,EE

You can filter the attributes by their code.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

| Operator | Allowed value type                   | Filter description                           |
| -------- | ------------------------------------ | -------------------------------------------- |
| `IN`     | an array of existing attribute codes | Only returns attributes that are in the list |

#### Example

```
/api/rest/v1/attributes?search={"code":[{"operator":"IN","value":["code1","code2"]}]}
```

### By update date

::: availability versions=4.0,5.0,6.0,7.0,SaaS editions=CE,EE

You can filter the attributes by their update date.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

::: info
Please note that you have to write dates in either of these format _2021-05-17T15:19:32Z_, or _2021-05-17T15:19:32+00:00_ according to the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601).

Moreover dates are interpreted in the time zone of the server that runs Akeneo (e.g. date.timezone setting in php.ini). For SaaS clients, please note that the time zone of the server is in UTC as this is the most precise and commonly referred to time standard.
:::

| Operator | Allowed value type               | Filter description                                                          |
| -------- | -------------------------------- | --------------------------------------------------------------------------- |
| `>`      | datetime <br> _Format: ISO 8601_ | Only returns attributes that were <br> updated after the given day and hour |

::: warning
For Simple select and Multiple select attribute, an option update isn't considered as an attribute update.
:::

#### Example

To get the attributes that have been updated since July 4th, 2020 at 10 am (UTC), you can use the following URL.

```
/api/rest/v1/attributes?search={"updated":[{"operator":">","value":"2020-07-04T10:00:00Z"}]}
```

### By attribute types

::: availability versions=4.0,5.0,6.0,7.0,SaaS editions=CE,EE

You can filter the attributes by their types.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

| Operator | Allowed value type                                                                 | Filter description                             |
| -------- | ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| `IN`     | an array of [existing attribute types](/concepts/catalog-structure.html#attribute) | Only returns the attributes of the given types |

#### Example

To get the attributes of types `pim_catalog_simpleselect` and `pim_catalog_multiselect`, you can use the following URL.

```
/api/rest/v1/attributes?search={"type":[{"operator":"IN","value":["pim_catalog_simpleselect","pim_catalog_multiselect"]}]}
```

### By the main identifier

::: availability versions=SaaS editions=CE,EE

You can filter the attributes that are the main identifier or not.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

| Operator | Allowed value type                                                                 | Filter description                                                                                                   |
|----------| ---------------------------------------------------------------------------------- |----------------------------------------------------------------------------------------------------------------------|
| `=`      | boolean          | When true, only returns the main identifier attribute (true) or attributes that are not the main identifier (false). |

#### Example

To get the main identifier attribute, you can use the following URL.

```
/api/rest/v1/attributes?search={"is_main_identifier":[{"operator":"=","value":true}]}
```

## Filter attribute groups

When you request specific attribute groups, you can use filters to select only the ones you want.

### By attribute group codes

::: availability versions=4.0,5.0,6.0,7.0,SaaS editions=CE,EE

You can filter the attribute groups by their code.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

| Operator | Allowed value type                         | Filter description                                 |
| -------- | ------------------------------------------ | -------------------------------------------------- |
| `IN`     | an array of existing attribute group codes | Only returns attribute groups that are in the list |

#### Example

```
/api/rest/v1/attribute-groups?search={"code":[{"operator":"IN","value":["marketing","technical"]}]}
```

### By update date

::: availability versions=4.0,5.0,6.0,7.0,SaaS editions=CE,EE

You can filter the attribute groups by their update date.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

::: info
Please note that you have to write dates in either of these format _2021-05-17T15:19:32Z_, or _2021-05-17T15:19:32+00:00_ according to the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601).

Moreover dates are interpreted in the time zone of the server that runs Akeneo (e.g. date.timezone setting in php.ini). For SaaS clients, please note that the time zone of the server is in UTC as this is the most precise and commonly referred to time standard.
:::

| Operator | Allowed value type               | Filter description                                                                |
| -------- | -------------------------------- | --------------------------------------------------------------------------------- |
| `>`      | datetime <br> _Format: ISO 8601_ | Only returns attribute groups that were <br> updated after the given day and hour |

#### Example

To get the attribute groups that have been updated since July 4th, 2020 at 10 AM (UTC), you can use the following URL.

```
/api/rest/v1/attribute-groups?search={"updated":[{"operator":">","value":"2020-07-04T10:00:00Z"}]}
```

## Filter families

When you request specific families, you can use filters to select only the ones you want.

### By family codes

::: availability versions=4.0,5.0,6.0,7.0,SaaS editions=CE,EE

You can filter the families by their code.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

| Operator | Allowed value type                | Filter description                         |
| -------- | --------------------------------- | ------------------------------------------ |
| `IN`     | an array of existing family codes | Only returns families that are in the list |

#### Example

```
/api/rest/v1/families?search={"code":[{"operator":"IN","value":["family_code1","family_code2"]}]}
```

### By update date

::: availability versions=4.0,5.0,6.0,7.0,SaaS editions=CE,EE

You can filter the families by their update date.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

::: info
Please note that you have to write dates in either of these format _2021-05-17T15:19:32Z_, or _2021-05-17T15:19:32+00:00_ according to the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601).

Moreover dates are interpreted in the time zone of the server that runs Akeneo (e.g. date.timezone setting in php.ini). For SaaS clients, please note that the time zone of the server is in UTC as this is the most precise and commonly referred to time standard.
:::

| Operator | Allowed value type               | Filter description                                                        |
| -------- | -------------------------------- | ------------------------------------------------------------------------- |
| `>`      | datetime <br> _Format: ISO 8601_ | Only returns families that were <br> updated after the given day and hour |

#### Example

To get the families that have been updated since July 4th, 2020 at 10 am (UTC), you can use the following URL.

```
/api/rest/v1/families?search={"updated":[{"operator":">","value":"2020-07-04T10:00:00Z"}]}
```

### By families with at least one product

::: availability versions=7.0,SaaS editions=CE,EE

You can filter the families that have at least one attached product.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

:::info
You can combine the `has_products` filter with any other filter available on families.
:::

| Operator | Allowed value type | Filter description                                                                                  |
|----------|------------------|-----------------------------------------------------------------------------------------------------|
| `=`      | boolean          | When true, only returns families with at least one product (true) or families with no products (false). |

#### Example

To retrieve only families with products, you can use the following URL.

```
/api/rest/v1/families?search={"has_products":[{"operator":"=","value":true}]}
```

## Filter categories

When you request specific categories, you can use filters to select only the ones you want.

### By category level: root

::: availability versions=6.0,7.0,SaaS editions=CE,EE

You can filter the categories to get only root categories.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

::: tips
You can combine the `is_root` filter with any other filter available on categories.
:::

| Operator | Allowed value type | Filter description                                                                              |
| -------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| `=`      | boolean            | When `true`, only returns categories that are root. When `false`, returns any other categories. |

#### Example

```
/api/rest/v1/categories?search={"is_root":[{"operator":"=","value":true}]}
```

### By parent category

::: availability versions=4.0,5.0,6.0,7.0,SaaS editions=CE,EE

You can filter the categories by parent.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

| Operator | Allowed value type                                                                           | Filter description                                  |
| -------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `=`      | a string containing an [existing parent category](/concepts/catalog-structure.html#category) | Only returns the sub-categories of the given parent |

#### Example

To get the child categories of the parent category `categoryA`, you can use the following URL.

```
/api/rest/v1/categories?search={"parent":[{"operator":"=","value":"categoryA"}]}
```

### By category codes

::: availability versions=4.0,5.0,6.0,7.0,SaaS editions=CE,EE

You can filter the categories by their code.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

| Operator | Allowed value type                  | Filter description                           |
| -------- | ----------------------------------- | -------------------------------------------- |
| `IN`     | an array of existing category codes | Only returns categories that are in the list |

#### Example

```
/api/rest/v1/categories?search={"code":[{"operator":"IN","value":["category_code1","category_code2"]}]}
```

### By update date

::: availability versions=6.0,7.0,SaaS editions=CE,EE

You can filter the categories by their update date.

Below you will find the operator to filter on this property, as well as the corresponding type of value required in the `search` query parameter.

::: info
Please note that you have to write dates in either of these format _2021-05-17T15:19:32Z_, or _2021-05-17T15:19:32+00:00_ according to the [ISO 8601 standard](https://en.wikipedia.org/wiki/ISO_8601).

Moreover dates are interpreted in the time zone of the server that runs Akeneo (e.g. date.timezone setting in php.ini). For SaaS clients, please note that the time zone of the server is in UTC as this is the most precise and commonly referred to time standard.
:::

| Operator | Allowed value type               | Filter description                                                          |
| -------- | -------------------------------- | --------------------------------------------------------------------------- |
| `>`      | datetime <br> _Format: ISO 8601_ | Only returns categories that were <br> updated after the given day and hour |

#### Example

To get the categories that have been updated since May 17th, 2021 at 10 am (UTC), you can use the following URL.

```
/api/rest/v1/categories?search={"updated":[{"operator":">","value":"2021-05-17T10:00:00Z"}]}
```

## Filter on workflow tasks

To filter workflow tasks by one of its properties, you can use the `search` query parameter. The value given to this query parameter should be a valid JSON as shown below.

```
/api/rest/v1/workflows/tasks?search={TASK_PROPERTY:[{"operator":OPERATOR,"value":VALUE}]}
```

In the above url :

- `TASK_PROPERTY` can be any property detailed in the sections below,
- `OPERATOR` is an allowed operator for this `TASK_PROPERTY`,
- `VALUE` is a value whose type corresponds to the allowed type detailed below.

#### Examples

To only retrieve tasks on specified products, you can use the following URL.

```
/api/rest/v1/workflows/tasks?search={"step_uuid":[{"operator":"=","value":"9a655835-2f62-4193-89d8-3ce5f8677dea"}],"product_uuid":[{"operator":"IN","value":["9c8fc7b2-9039-4c22-970e-643939b54fad"]}]}
```

### On their step uuid (mandatory)

::: availability versions=SaaS editions=EE

Filter tasks by their step uuid with the `step_uuid` property. **This is mandatory to query the tasks.**
Here are the allowed operators you can use to filter on the step uuid as well as the corresponding type of value expected in the `search` query parameter.

| Allowed operators | Allowed value type           |
| ----------------- |------------------------------|
| =                 | string (step uuid)           |

#### Example

```
/api/rest/v1/workflows/tasks?search={"step_uuid":[{"operator":"=","value":"9a655835-2f62-4193-89d8-3ce5f8677dea"}],"task_uuid":[{"operator":"IN","value":["9c8fc7b2-9039-4c22-970e-643939b54fad", "b1c8f7a2-9039-4c22-970e-643939b54fad"]}]}
```

### On their task uuid

::: availability versions=SaaS editions=EE

To filter tasks on their uuids, use the `task_uuid` property.
Here are the allowed operators you can use to filter on the task uuid as well as the corresponding type of value expected in the `search` query parameter.

| Allowed operators | Allowed value type           |
| ----------------- |------------------------------|
| IN, NOT IN        | list of strings (task uuids) |

#### Example

```
/api/rest/v1/workflows/tasks?search={"step_uuid":[{"operator":"=","value":"9a655835-2f62-4193-89d8-3ce5f8677dea"}],"task_uuid":[{"operator":"IN","value":["9c8fc7b2-9039-4c22-970e-643939b54fad", "b1c8f7a2-9039-4c22-970e-643939b54fad"]}]}
```

### On their product uuid

::: availability versions=SaaS editions=EE

To filter tasks on their product uuids, use the `product_uuid` property.
Here are the allowed operators you can use to filter on the product uuid as well as the corresponding type of value expected in the `search` query parameter.

| Allowed operators | Allowed value type              |
| ----------------- |---------------------------------|
| IN                | list of strings (product uuids) |

#### Example

```
/api/rest/v1/workflows/tasks?search={"step_uuid":[{"operator":"=","value":"9a655835-2f62-4193-89d8-3ce5f8677dea"}],"product_uuid":[{"operator":"IN","value":["9c8fc7b2-9039-4c22-970e-643939b54fad", "b1c8f7a2-9039-4c22-970e-643939b54fad"]}]}
```

### On their product model code

::: availability versions=SaaS editions=EE

To filter tasks on their product model codes, use the `product_model_code` property.
Here are the allowed operators you can use to filter on the product model code as well as the corresponding type of value expected in the `search` query parameter.

| Allowed operators | Allowed value type                    |
| ----------------- |---------------------------------------|
| IN                | list of strings (product model codes) |

#### Example

```
/api/rest/v1/workflows/tasks?search={"step_uuid":[{"operator":"=","value":"9a655835-2f62-4193-89d8-3ce5f8677dea"}],"product_model_code":[{"operator":"IN","value":["amor", "apollon"]}]}
```
