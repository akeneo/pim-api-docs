### Asset

:::warning
This resource is only available in the [Entreprise Edition](https://www.akeneo.com/enterprise-edition/).
:::

:::warning
This resource is only available since the version 2.0 of the PHP API client.
:::

#### Get an asset 

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'            => 'bridge',
 *     'localizable'     => false,
 *     'description'     => 'Architectural bridge of a city, above water',
 *     'end_of_use'      => '2028-01-25T00:00:00+00:00',
 *     'tags'            => [
 *         'cities',
 *         'water',
 *     ],
 *     'categories'      => [
 *         'faces',
 *     ],
 *     'variation_files' => [
 *         [
 *             '_link'   => [
 *                 'download' => [
 *                     'href' => 'http://akeneo.com/api/rest/v1/assets/bridge/variation-files/mobile/no-locale/download',
 *                 ],
 *                 'self'     => [
 *                     'href' => 'http://akeneo.com/api/rest/v1/assets/bridge/variation-files/mobile/no-locale',
 *                 ],
 *             ],
 *             'locale' => null,
 *             'scope'  => 'mobile',
 *             'code'   => '0/7/2/1/07217eea32563821b46336d2dec696e4f69415ec_bridge_mobile.jpg',
 *         ],
 *         [
 *             '_link'   => [
 *                 'download' => [
 *                     'href' => 'http://akeneo.com/api/rest/v1/assets/bridge/variation-files/ecommerce/no-locale/download',
 *                 ],
 *                 'self'     => [
 *                     'href' => 'http://akeneo.com/api/rest/v1/assets/bridge/variation-files/ecommerce/no-locale',
 *                 ],
 *             ],
 *             'locale' => null,
 *             'scope'  => 'ecommerce',
 *             'code'   => 'a/e/1/0/ae104d0b8cd2111380029240630008a01585d7ed_bridge_ecommerce.jpg',
 *         ],
 *     ],
 *     'reference_files' => [
 *         [
 *             '_link'  => [
 *                 'download' => [
 *                     'href' => 'http://akeneo.com/api/rest/v1/assets/bridge/reference-files/no-locale/download',
 *                 ],
 *                 'self'     => [
 *                     'href' => 'http://akeneo.com/api/rest/v1/assets/bridge/reference-files/no-locale',
 *                 ],
 *             ],
 *             'locale' => null,
 *             'code'   => 'b/7/b/e/b7be03a438ace1d9ea782440f735a72fff2a3f3c_bridge.jpg',
 *         ],
 *     ],
 * ]
 */
$asset = $client->getAssetApi()->get('bridge');
```

#### Get a list of assets 

There are two ways of getting assets. 

**By getting pages**

This method allows to get assets page per page, as a classical pagination.
It's possible to get the total number of assets with this method.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$firstPage = $client->getAssetApi()->listPerPage(50, true);
```

You can get more information about this method [here](/php-client/list-resources.html#by-getting-pages).

**With a cursor**

This method allows to iterate the assets. It will automatically get the next pages for you.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$assets = $client->getAssetApi()->all(50);
```

You can get more information about this method [here](/php-client/list-resources.html#with-a-cursor).

#### Create an asset 

If the asset does not exist yet, this method creates it, otherwise it throws an exception.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/', 'client_id', 'secret', 'admin', 'admin')->build()

$client->getAssetApi()->create('unicorn', [
    'localizable'     => false,
    'description'     => 'The wonderful unicorn',
    'end_of_use'      => '2042-11-21',
    'tags'            => ['colored', 'flowers'],
    'categories'      => ['face', 'pack'],
]);
```

#### Upsert an asset 

If the asset does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetApi()->upsert('bridge', [
    'localizable' => false,
    'description' => 'Architectural bridge of a city, above water',
    'end_of_use'  => null,
    'tags'        => ['water'],
    'categories'  => ['face', 'pack']
]);
```

#### Upsert a list of assets 

This method allows to create or update a list of assets.
It has the same behavior as the `upsert` method for a single asset, except that the code must be specified in the data of each asset.


```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetApi()->upsertList([
    [
        'code'        => 'unicorn',
        'localizable' => false,
        'description' => 'The wonderful unicorn',
        'end_of_use'  => '2042-11-21',
        'tags'        => ['colored', 'flowers'],
        'categories'  => ['face', 'pack'],
    ],
    [
        'code'        => 'bridge',
        'localizable' => false,
        'description' => 'Architectural bridge of a city, above water',
        'end_of_use'  => null,
        'tags'        => ['water'],
        'categories'  => ['face', 'pack']
    ],
]);
```

::: warning
There is a limit on the maximum number of assets that you can upsert in one time on server side. By default this limit is set to 100.
:::
