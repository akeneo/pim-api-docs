# Filters

When requesting a list of resources via the API, you can apply filters to get only the ones you want.

## Filter on product properties
To filter products by one of its properties, you can use the `search` query parameter. The value given to this query parameter should be a valid JSON as shown below.

```
/api/rest/v1/products?search={PRODUCT_PROPERTY:[{"operator":OPERATOR,"value":VALUE}]}
```

In the above url :
 - `PRODUCT_PROPERTY` can be any property detailed in the sections below,
 - `OPERATOR` is an allowed operator for this `PRODUCT_PROPERTY`,
 - `VALUE` is a value whose type corresponds to the allowed type detailed below.

#### Examples
To only retrieve enabled products, you can use the following URL.

```
/api/rest/v1/products?search={"enabled":[{"operator":"=","value":true}]}
```

Of course, you can combine as many filters as you want. The example below will get you the enabled products being 70% complete.

```
/api/rest/v1/products?search={"enabled":[{"operator":"=","value":true}],"completeness":[{"operator":">","value":70,"scope":"ecommerce"}]}
```

You can even combine several filters on the same product properties. The example below will get you the products created both the 4th and the 5th of July 2016.

```
/api/rest/v1/products?search={"created":[{"operator":"=","value":"2016-07-04"},{"operator":"=","value":"2016-07-05"}]}
```

### On categories

To filter products on their categories, use the property `categories`.
Here are the allowed operators you can use to filter on the category code as well as the corresponding type of value expected in the `search` query parameter.

| Operator | Allowed value type | Filter description |
| ----------------- | -------------- | ------------------ |
| `IN` | an array of existing category codes | Only returns the products that are in the given categories |
| `NOT IN` | an array of existing category codes | Only returns the products that are not in the given categories |
| `IN OR UNCLASSIFIED` |  an array of existing category codes | Only returns the products that are in the given categories or that are not classified in any categories |
| `IN CHILDREN` | an array of existing category codes | Only returns the products that are in the children of the given categories |
| `NOT IN CHILDREN` | an array of existing category codes | Only returns the products that are not in the children of the given categories |
| `UNCLASSIFIED` | no value | Only returns the products that are not classified into any category |

#### Example
To get the products of the `winter_collection` category, you can use the following URL.

```
/api/rest/v1/products?search={"categories":[{"operator":"IN","value":["winter_collection"]}]}
```


### On status

To filter products on their status, use the `enabled` property.
Here are the allowed operators you can use to filter on the status as well as the corresponding type of value expected in the `search` query parameter.

| Operator | Allowed value type | Filter description |
| ----------------- | -------------- | ------------------ |
| `=` | boolean | Only returns products that are enabled (`true`) or disabled (`false`) |
| `!=` | boolean | Only returns products that are enabled (`false`) or disabled (`true`) |

#### Example
To get the disabled products, you can use the following URL.

```
/api/rest/v1/products?search={"enabled":[{"operator":"=","value":false}]}
```

### On completeness

To filter products on their completeness, use the `completeness` product property. You will also need to provide a `scope` value to specify on which channel you want to filter with the completeness.
Here are the allowed operators you can use to filter by completeness as well as the corresponding type of value expected in the `search` query parameter.

| Operator | Allowed value type | Filter description |
| ----------------- | -------------- | ------------------ |
| `<` or `<=` | integer | Only returns products that have a completeness lower than (or equal to) the given value on the given channel |
| `>` or `>=`  | integer | Only returns products that have a completeness greater than (or equal to) the given value on the given channel |
| `=` | integer | Only returns products that have a completeness equal to the given value on the given channel |
| `!=` | integer | Only returns products that have a completeness different from the given value on the given channel |
| `GREATER THAN ON ALL LOCALES` or `GREATER OR EQUALS THAN ON ALL LOCALES` | integer | Only returns products that have a completeness on all locales that is greater than (or equal to) the given value on the given channel for the given set of locales |
| `LOWER THAN ON ALL LOCALES` or `LOWER OR EQUALS THAN ON ALL LOCALES` | integer |  Only returns products that have a completeness on all locales that is lower than (or equal to) the given value on the given channel for the given set of locales |

#### Examples
To get the products that are 100% complete for the `ecommerce` channel, you can use the following URL.

```
/api/rest/v1/products?search={"completeness":[{"operator":"=","value":100,"scope":"ecommerce"}]}
```

To get the products that are 100% complete on both the `en_US` and `fr_FR` locales for the `ecommerce` channel, you can use the following URL.

```
/api/rest/v1/products?search={"completeness":[{"operator":"GREATER+OR+EQUALS+THAN+ON+ALL+LOCALES","value":100,"locales":["en_US","fr_FR"],"scope":"ecommerce"}]}
```

### On group or family

To filter products on groups or families, use respectively the product property `groups` and `family`.
Here are the allowed operators you can use to filter on these properties as well as the corresponding type of value expected in the `search` query parameter.

| Operator | Allowed value type | Filter description |
| ----------------- | -------------- | ------------------ |
| `IN` | an array of existing group or family | Only returns products that are respectively in the given families or groups |
| `NOT IN`  | an array of existing group or family | Only returns products that are respectively not in the given families or groups |
| `EMPTY` | no value | Only returns products that have respectively no groups or no family |
| `NOT EMPTY` | no value | Only returns products that have respectively a group or a family |

#### Examples
To get the products that are in the `promotion` group, you can use the following URL.

```
/api/rest/v1/products?search={"groups":[{"operator":"IN","value":["promotion"]}]}
```

To get the products that are not in the `camcorders` and `digital_cameras` family, you can use the following URL.

```
/api/rest/v1/products?search={"family":[{"operator":"NOT+IN","value":["camcorders","digital_cameras"]}]}
```

### On creation or update date

To filter products on creation or update date, use respectively the product property `created` and `updated`.
Here are the allowed operators to filter on these properties as well as the corresponding type of value expected in the `search` query parameter.

| Operator | Allowed value type | Filter description |
| ----------------- | -------------- | ------------------ |
| `=` | dateTime (ISO-8601) | Only returns products that were respectively updated or created during the given day |
| `!=`  | dateTime (ISO-8601) | Only returns products that were respectively not updated or not created during the given day  |
| `<` | dateTime (ISO-8601) | Only returns products that were respectively updated or created before the given day |
| `>` | dateTime (ISO-8601) | Only returns products that were respectively updated or created after the given day |
| `BETWEEN` | array[dateTime (ISO-8601),dateTime (ISO-8601)] | Only returns products that were respectively updated or created between the two given dates |
| `NOT BETWEEN` | array[dateTime (ISO-8601),dateTime (ISO-8601)] | Only returns products that were respectively not updated or not created between the two given dates |
| `SINCE LAST N DAYS` | integer | Only returns products that have respectively been updated or created since the last n days, n being the given value |
|
#### Examples
To get the products that were created on the 4th of July 2016, you can use the following URL.

```
/api/rest/v1/products?search={"created":[{"operator":"=","value":"2016-07-04"}]}
```

To get the products that were updated during the last 4 days, you can use the following URL.

```
/api/rest/v1/products?search={"updated":[{"operator":"SINCE+LAST+N+DAYS","value":4}]}
```

## Filter on product values
To filter products on its [product values](/documentation.html#product-values), you can use the `search` query parameter when requesting products. The value given to this query parameter should be a valid JSON as shown below.

```
/api/rest/v1/products?search={ATTIBUTE_CODE:[{"operator":OPERATOR,"value":VALUE,"locale":LOCALE_CODE,"scope":CHANNEL_CODE}]}
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
/api/rest/v1/products?search={"main_color":[{"operator":"IN","value":["purple"]}]}
```

To get products having a description begining with `Amazing` on the `en_US` locale, the `short_description` attribute being localizable but not scopable, you can use the following URL.

```
/api/rest/v1/products?search={"short_description":[{"operator":"STARTS+WITH","value":"Amazing","locale":"en_US"}]}
```

To get products that have a release date due after the 4th of July 2016 for the `ecommerce` channel, the `release_date` attribute being scopable but not localizable, you can use the following URL.

```
/api/rest/v1/products?search={"release_date":[{"operator":">","value":"2016-07-04","scope":"ecommerce"}]}
```

To get products that have a name that contains with `shirt` on the `en_US` locale for the `mobile` channel, the `name` attribute being both localizable and scopable, you can use the following URL.

```
/api/rest/v1/products?search={"name":[{"operator":"CONTAINS","value":"shirt","locale":"en_US","scope":"mobile"}]}
```

Of course, you can combine as many filters as you want. The example below will get you the products with description starting with `Amazing` on the `en_US` locale for the `ecommerce` channel, and of purple color.

```
/api/rest/v1/products?search={"description":[{"operator":"STARTS+WITH","value":"Amazing","locale":"en_US","scope":"ecommerce"}],"main_color":[{"operator":"IN","value":["purple"]}]}
```

You can even combine several filters on the same attribute. The example below will get you the products with not empty description on the `en_US` locale and empty description on the `fr_FR` locale for the `ecommerce` channel.

```
/api/rest/v1/products?search={"description":[{"operator":"NOT+EMPTY","locale":"en_US","scope":"ecommerce"},{"operator":"EMPTY","locale":"fr_FR","scope":"ecommerce"}]}
```

### `search_locale` query parameter
If you need to filter on several attributes on the same locale, you can use the `search_locale` query parameter, to avoid repeating yourself for each attribute. This parameter expect an existing locale code.

#### Example
```
/api/rest/v1/products?search={"description":[{"operator":"STARTS+WITH","value":"Amazing","locale":"en_US","scope":"ecommerce"}],"short_description":[{"operator":"CONTAINS","value":"shoes","locale":"en_US","scope":"ecommerce"}]}

<==>

/api/rest/v1/products?search={"description":[{"operator":"STARTS+WITH","value":"Amazing","scope":"ecommerce"}],"short_description":[{"operator":"CONTAINS","value":"shoes","scope":"ecommerce"}]}&search_locale=en_US
```

### `search_scope` query parameter
If you need to filter on several attributes on the same channel, you can use the `search_scope` query parameter, to avoid repeating yourself for each attribute. This parameter expect an existing channel code.

#### Example
```
/api/rest/v1/products?search={"release_date":[{"operator":">","value":"2016-07-04","scope":"ecommerce"}],"short_description":[{"operator":"CONTAINS","value":"shoes","locale":"en_US","scope":"ecommerce"}]}

<==>

/api/rest/v1/products?search={"release_date":[{"operator":">","value":"2016-07-04"}],"short_description":[{"operator":"CONTAINS","value":"shoes","locale":"en_US"}]}&search_scope=ecommerce
```

### Available operators
As seen previously, the attribute type determines which set of operators is available to use these filters.

**The `pim_catalog_identifier`, `pim_catalog_text` and `pim_catalog_textarea` attribute types**

| Allowed operators | Allowed value type |
| ---------- | ---------- |
| STARTS WITH, ENDS WITH, CONTAINS, DOES NOT CONTAIN | string |
| =, != | string |
| EMPTY, NOT EMPTY | no value |

**The `pim_catalog_number`, `pim_catalog_metric` and `pim_catalog_price_collection` attribute types**

| Allowed operators | Allowed value type |
| ---------- | ---------- |
| <, <=, =, !=, >=, > | integer |
| EMPTY, NOT EMPTY | no value |

**The `pim_catalog_simpleselect` and `pim_catalog_multiselect` attribute types**

| Allowed operators | Allowed value type |
| ---------- | ---------- |
| IN, NOT IN | an existing attribute option code of the attribute |
| EMPTY, NOT EMPTY | no value |

**The `pim_catalog_boolean` attribute type**

| Allowed operators | Allowed value type |
| ---------- | ---------- |
| =, != | boolean |

**The `pim_catalog_date` attribute type**

| Allowed operators | Allowed value type |
| ---------- | ---------- |
| <, =, !=, > | dateTime (ISO-8601) |
| BETWEEN, NOT BETWEEN | [dateTime (ISO-8601), dateTime (ISO-8601)] |
| EMPTY, NOT EMPTY | no value |

**The `pim_catalog_file` and `pim_catalog_image` attribute types**

| Allowed operators | Allowed value type |
| ---------- | ---------- |
| STARTS WITH, ENDS WITH, CONTAINS, DOES NOT CONTAIN, =, != | string |
| EMPTY, NOT EMPTY | no value |

## Filter product values
Thanks to the above sections, you are able to filter your products to only get those you want. In this section, you will see that you also can filter the product values to only receive those you want. 

### Via attributes
If you want to receive for each product only product values about specific attributes, you can specify it thanks to the `attributes` query parameter.

#### Example
To get products with only product values regarding the `description` attribute, you can use the following URL.
```
/api/rest/v1/products?attributes=description
```

You can filter product values on several attributes at the same time.
```
/api/rest/v1/products?attributes=name,description
```

### Via locale
If you want to receive for each product only product values on specific locales, you can specify it thanks to the `locales` query parameter.

#### Example
To get products with only product values regarding the `en_US` locale, you can use the following URL.
```
/api/rest/v1/products?locales=en_US
```

You can filter product values on several locales at the same time.
```
/api/rest/v1/products?locales=en_US,fr_FR
```

### Via channel
If you want to receive for each product only product values about a specific channel, you can specify it thanks to the `scope` query parameter.

#### Example
To get products with only product values regarding the `e_commerce` scope, you can use the following URL.
```
/api/rest/v1/products?scope=e_commerce
```

:::warning
Note that you cannot filter product values on several channels.
:::

## Filter locales

When requesting locales, you can use a filter to get the enabled ones.

#### Example
```
/api/rest/v1/locales?search={"enabled":[{"operator":"=","value":true}]}
```
