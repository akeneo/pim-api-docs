## Asset categories

:::warning
This resource is only available in the [Entreprise Edition](https://www.akeneo.com/enterprise-edition/).
:::

:::warning
This resource is only available since the version 2.0 of the PHP API client.
:::

### Get an asset category

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'   => 'face',
 *     'parent' => 'images',
 *     'labels' => [
 *         'en_US' => 'Front picture',
 *         'fr_FR' => 'Image de face',
 *     ],
 * ]
 */
$assetCategory = $client->getAssetCategoryApi()->get('face');
```

### Get a list of asset categories

There are two ways of getting asset categories. 

#### By getting pages

This method allows to get asset categories page per page, as a classical pagination.
It's possible to get the total number of asset categories with this method.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$firstPage = $client->getAssetCategoryApi()->listPerPage(50, true);
```

You can get more information about this method [here](/php-client/list-resources.html#by-getting-pages).

#### With a cursor

This method allows to iterate the asset categories. It will automatically get the next pages for you.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$assetCategories = $client->getAssetCategoryApi()->all(50);
```

You can get more information about this method [here](/php-client/list-resources.html#with-a-cursor).

### Upsert an asset category

If the asset category does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetCategoryApi()->upsert('dos', [
    'parent' => 'images',
    'labels' => [
        'en_US' => 'Back picture',
        'fr_FR' => 'Image de dos',
    ],
]);
```

### Upsert a list of asset categories

This method allows to create or update a list of asset categories.
It has the same behavior as the `upsert` method for a single asset category, except that the code must be specified in the data of each asset category.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetCategoryApi()->upsertList([
    [
        'code'   => 'dos',
        'parent' => 'images',
        'labels' => [
            'en_US' => 'Back picture',
            'fr_FR' => 'Image de dos',
        ],
    ],
    [
        'code'   => 'face',
        'parent' => 'images',
        'labels' => [
            'en_US' => 'Front picture',
            'fr_FR' => 'Image de face',
        ],
    ],
]);
```

::: warning
There is a limit on the maximum number of asset categories that you can upsert in one time on server side. By default this limit is set to 100.
:::
