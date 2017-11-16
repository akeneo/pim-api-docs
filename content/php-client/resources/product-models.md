## Product models

### Get a product model

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');
                     
/*
 * Returns an array like this:
 * [
 *     'code'           => 'rain_boots_red',
 *     'family_variant' => 'boots_color_size',
 *     'parent'         => 'rain_boots',
 *     'categories'     => ['2014_collection', 'winter_collection', 'winter_boots'],
 *     'values'         => [
 *         'name' => [
 *             [
 *                 'locale' => 'en_US',
 *                 'scope' => null,
 *                 'data' => 'Red rain boots',
 *             ]
 *         ],
 *     ],
 *     'created' => '2017-10-17T14:12:35+00:00',
 *     'updated' => '2017-10-17T14:12:35+00:00'
 * ]
 */
$productModel = $client->getProductModelApi()->get('rain_boots_red');
```

### Create a product model

If the product model does not exist yet, this method creates it, otherwise it throws an exception.

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getProductModelApi()->create('saddle_rain_boots', [
  'family_variant' => 'boots_color_size',
  'parent' => 'rain_boots',
  'categories' => ['2014_collection', 'winter_boots', 'winter_collection'],
  'values' => [
      'name' => [
          [
              'locale' => 'en_US',
              'scope' => null,
              'data' => 'Saddle rain boots',
          ]
      ],
      'color' => [
          [
              'locale' => null,
              'scope' => null,
              'data' => 'saddle'
          ]
      ]
  ]
]);
```

Product model values use the same format as the product values. If you want to know more, take a look at [here](/documentation/resources.html#product-values).

### Get a list of product models

There are two ways of getting product models.

#### By getting pages

This method allows to get product models page per page, as a classical pagination.
It's possible to get the total number of product models with this method.

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$firstPage = $client->getProductModelApi()->listPerPage(50, true);
```

::: warning
There is a maximum limit allowed on server side for the parameter `limit`.
:::

::: warning
Setting the parameter `with_count`  to `true`  can drastically decrease the performance.
It's recommended to let this parameter with the default value `false` if the total number of product models is not needed in the response.
:::

You can get more information about this method [here](/php-client/list-resources.html#by-getting-pages).

#### With a cursor

This method allows to iterate the product models. It will automatically get the next pages for you.

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$productModels = $client->getProductModelApi()->all(50);
```

:::warning
There is a maximum limit allowed on server side for the parameter `pageSize`.
:::

You can get more information about this method [here](/php-client/list-resources.html#with-a-cursor).
