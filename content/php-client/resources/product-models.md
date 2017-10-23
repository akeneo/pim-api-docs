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
