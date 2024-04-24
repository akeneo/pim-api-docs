## Products updated in last 4 days using search

:::info
[GraphiQL live example](https://graphql.sdk.akeneo.cloud?query=%7B%0A++products%28search%3A+%22%7B%5C%22updated%5C%22%3A%5B%7B%5C%22operator%5C%22%3A%5C%22SINCE+LAST+N+DAYS%5C%22%2C%5C%22value%5C%22%3A4%7D%5D%7D%22%29+%7B%0A++++links+%7B%0A++++++next%0A++++%7D%0A++++items+%7B%0A++++++uuid%0A++++%7D%0A++%7D%0A%7D)
:::

When we follow the documentation on the filters https://api.akeneo.com/documentation/filter.html we can see some examples of searches:

- `{"updated":[{"operator":"SINCE LAST N DAYS","value":4}]}`
- `{"created":[{"operator":"=","value":"2016-07-04 10:00:00"}]}`

We need to escape the quotes if we want to use these searches. You can use an online escaper for help. The result will be:

- `{\"created\":[{\"operator\":\"=\",\"value\":\"2016-07-04 10:00:00\"}]}`
- `{\"updated\":[{\"operator\":\"SINCE LAST N DAYS\",\"value\":4}]}`

## Product model and their variation axis + family information

:::info
[GraphiQL live example](https://graphql.sdk.akeneo.cloud?query=query+ProductModelWithVariationAxisAndFamily+%7B%0A++productModels%28limit%3A+10%29+%7B%0A++++links+%7B%0A++++++next%0A++++%7D%0A++++items+%7B%0A++++++variationAxes%0A++++++code%0A++++++family+%7B%0A++++++++code%0A++++++++familyVariant+%7B%0A++++++++++code%0A++++++++%7D%0A++++++%7D%0A++++++attribute%28code%3A+%22brand%22%29%0A++++%7D%0A++%7D%0A%7D)
:::

## All the variations of a product model with variation values & specific attribute values

:::info
[GraphiQL live example](https://graphql.sdk.akeneo.cloud?query=query+VariationOfAModelWithVariationValueAndAttributeValue+%7B%0A++products%28%0A++++limit%3A+10%0A++++parent%3A+%22Acme+Classic+Mens+Black+PVC+Work+Boots%22%0A++++locales%3A+%22en_US%22%2C%0A++++attributesToLoad%3A+%5B%22name%22%2C%22sku%22%2C%22brand%22%2C%22shoe_size%22%2C%22erp_name%22%5D%0A++%29+%7B%0A++++links+%7B%0A++++++next%0A++++%7D%0A++++items+%7B%0A++++++uuid%0A++++++enabled%0A++++++variationValues%0A++++++name%3A+attribute%28code%3A+%22name%22%29%0A++++++sku%3A+attribute%28code%3A+%22sku%22%29%0A++++++brand%3A+attribute%28code%3A+%22brand%22%29%0A++++++formatedErpName%3A+attribute%28code%3A+%22erp_name%22%29%0A++++%7D%0A++%7D%0A%7D)
:::

If you want to get all attributes, you can include `attributes` in your query with the necessary fields.

When retrieving attribute values with the `attribute` keyword, we use aliases to ensure that every retrieved data document has the desired format in the response.

![Formated ERP Name](../../img/graphql/formated-erp-name.png)

## Enabled locales

:::info
[GraphiQL live example](https://graphql.sdk.akeneo.cloud?query=query+EnabledLocales+%7B%0A++locales%28enabled%3A+true%29+%7B%0A++++items+%7B%0A++++++code%0A++++%7D%0A++%7D%0A%7D)
:::

## Enabled currencies

:::info
[GraphiQL live example](https://graphql.sdk.akeneo.cloud?query=query+EnabledCurrencies+%7B%0A++currencies%28enabled%3A+true%29+%7B%0A++++items+%7B%0A++++++code%0A++++%7D%0A++%7D%0A%7D)
:::

## Families and their belonging attributes code & type

:::info
[GraphiQL live example](https://graphql.sdk.akeneo.cloud?query=query+FamiliesWithAttributeCodeAndType+%7B%0A++families+%7B%0A++++links+%7B%0A++++++next%0A++++%7D%0A++++items+%7B%0A++++++code%0A++++++attributes+%7B%0A++++++++code%0A++++++++type%0A++++++%7D%0A++++%7D%0A++%7D%0A%7D)
:::

## Product with attributes, family, group & categories with all labels

:::info
[GraphiQL live example](https://graphql.sdk.akeneo.cloud?query=query+ProductWithAttributesFamilyCategoriesAndLabels+%7B%0A++products%28limit%3A+1%2C+locales%3A+%22en_US%22%29+%7B%0A++++items+%7B%0A++++++attributes+%7B%0A++++++++code%0A++++++++labels%0A++++++++sortOrder%0A++++++++type%0A++++++++group+%7B%0A++++++++++code%0A++++++++++labels%0A++++++++++sortOrder%0A++++++++%7D%0A++++++%7D%0A++++++family+%7B%0A++++++++code%0A++++++++labels%0A++++++%7D%0A++++++categories+%7B%0A++++++++code%0A++++++++labels%0A++++++%7D%0A++++++uuid%0A++++++variationValues%0A++++%7D%0A++%7D%0A%7D)
:::

## Product with assets and reference entity attributes

:::info
[GraphiQL live example](https://graphql.sdk.akeneo.cloud?query=query+ProductWithAssetsAndReferenceEntityAttributes+%7B%0A++products%28attributesToLoad%3A+%5B%22packshot%22%5D%29+%7B%0A++++items+%7B%0A++++++attributes+%7B%0A++++++++code%0A++++++++relatedObject+%7B%0A++++++++++code%0A++++++++++labels%0A++++++++%7D%0A++++++++values%28withRelatedObjectValues%3A+true%29%0A++++++%7D++++%7D%0A++%7D%0A%7D)
:::

To load assets and reference entity records on product queries there are two ways:

- Using Attributes fields with the withRelatedObjectValues argument on values
- Using Assets and ReferenceEntities fields using the attribute argument

The first solution will get you all the attributes from the product (or the one listed in the parameter `attributesToLoad`).
The parameter `withRelatedObjectValues` is here to allow users to load linked attributes assets and reference entity records.
Please keep in mind that it can impact the performance.

The second solution provides the same result as the first but allows the requested asset or reference entity attribute to filter more precisely.

::: panel-link And now, [Integrate GraphQL into your project](/graphql/setup/integration.html)
:::
