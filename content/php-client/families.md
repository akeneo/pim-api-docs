# Family

## Get a family 

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'                   => 'caps',
 *     'attributes'             => ['sku', 'name', 'description', 'price', 'color'],
 *     'attribute_as_label'     => 'name',
 *     'attribute_requirements' => [
 *         'ecommerce' => ['sku', 'name', 'description', 'price', 'color'],
 *         'tablet'    => ['sku', 'name', 'description', 'price'],
 *     ],
 *     'labels'                 => [
 *         'en_US' => 'Caps',
 *         'fr_FR' => 'Casquettes',
 *     ]
 * ]
 */
$family = $client->getFamilyApi()->get('master');
```

## Get a list of families 

There are two ways of getting families. 

### By getting pages

This method allows to get families page per page, as a classical pagination.
It's possible to get the total number of families with this method.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// set the limit of 50 families per page, and calculate the total number of families 
$firstPage = $client->getFamilyApi()->listPerPage(50, true);

foreach ($firstPage->getItems() as $family) {
    // do your stuff here
    echo $family['code'];
}

// return the total number of families (not just the number of items in the page)
$count = $firstPage->getCount();

if ($firstPage->hasNextPage()) {
    $secondPage = $firstPage->getNextPage();
}

if (null !== $secondPage && $secondPage->hasPreviousPage()) {
    $firstPage = $secondPage->getPreviousPage();
}
```

::: warning
There is a maximum limit allowed on server side for the parameter `limit`.
:::

::: warning
Setting the parameter `with_count`  to `true`  can drastically decrease the performance. 
It's recommended to let this parameter with the default value `false` if the total number of families is not needed in the response.
:::


### With a cursor

This method allows to iterate the families. It will automatically get the next pages for you.
With this method, it's not possible to get the previous page, or getting the total number of families.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// get a cursor with a page size of 50
$families = $client->getFamilyApi()->all(50);
foreach ($families as $family) {
    // do your stuff here
    echo $family['code'];
}
```
:::warning
There is a maximum limit allowed on server side for the parameter `pageSize`.
:::

## Create a family 

If the family does not exist yet, this method creates it, otherwise it throws an exception.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/', 'client_id', 'secret', 'admin', 'admin')->build()

$client->getFamilyApi()->create('caps', [
     'attributes'             => ['sku', 'name', 'description', 'price', 'color'],
     'attribute_as_label'     => 'name',
     'attribute_requirements' => [
         'ecommerce' => ['sku', 'name', 'description', 'price', 'color'],
         'tablet'    => ['sku', 'name', 'description', 'price'],
     ],
     'labels'                 => [
         'en_US' => 'Caps',
         'fr_FR' => 'Casquettes',
     ]
]);
```



## Upsert a family 

If the family does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getFamilyApi()->upsert('cap', [
     'attributes'             => ['sku', 'name', 'description', 'price', 'color'],
     'attribute_as_label'     => 'name',
     'attribute_requirements' => [
         'ecommerce' => ['sku', 'name', 'description', 'price', 'color'],
         'tablet'    => ['sku', 'name', 'description', 'price'],
     ],
     'labels'                 => [
         'en_US' => 'Caps',
         'fr_FR' => 'Casquettes',
     ]
]);
```

## Upsert a list of families 

This method allows to create or update a list of families.
It has the same behavior as the `upsert` method for a single family, except that the code must be specified in the data of each family.


```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getFamilyApi()->upsertList([
    [
        'code'                   => 'caps',
        'attributes'             => ['sku', 'name', 'description', 'price', 'color'],
        'attribute_as_label'     => 'name',
        'attribute_requirements' => [
            'ecommerce' => ['sku', 'name', 'description', 'price', 'color'],
            'tablet'    => ['sku', 'name', 'description', 'price'],
        ],
        'labels'                 => [
            'en_US' => 'Caps',
            'fr_FR' => 'Casquettes',
        ]
    ],
    [
        'code'                   => 'hat',
        'attributes'             => ['sku', 'name', 'description', 'price', 'color'],
        'attribute_as_label'     => 'name',
        'attribute_requirements' => [
            'ecommerce' => ['sku', 'name', 'color'],
            'tablet'    => ['sku', 'name'],
        ],
        'labels'                 => [
            'en_US' => 'Hat',
            'fr_FR' => 'Chapeau',
        ]
    ],
]);
```

::: warning
There is a limit on the maximum number of families that you can upsert in one time on server side.
:::
