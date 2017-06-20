# Category

## Get a category 

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'   => 'winter_collection',
 *     'parent' => 'master',
 *     'labels' => [
 *         'en_US' => 'Winter collection',
 *         'fr_FR' => 'Collection hiver',
 *     ]
 * ]
 */
$category = $client->getCategoryApi()->get('master');
```

## Get a list of categories

There are two ways of getting categories. 

### By getting pages

This method allows to get categories page per page, as a classical pagination.
It's possible to get the total number of categories with this method.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// set the limit of 50 categories per page, and calculate the total number of categories
$firstPage = $client->getCategoryApi()->listPerPage(50, true);

foreach ($firstPage->getItems() as $category) {
    // do your stuff here
    echo $category['code'];
}

// return the total number of categories (not just the number of items in the page)
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
It's recommended to let this parameter with the default value `false` if the total number of categories is not needed in the response.
:::


### With a cursor

This method allows to iterate the categories. It will automatically get the next pages for you.
With this method, it's not possible to get the previous page, or getting the total number of categories.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// get a cursor with a page size of 50
$categories = $client->getCategoryApi()->all(50);
foreach ($categories as $category) {
    // do your stuff here
    echo $category['code'];
}
```
:::warning
There is a maximum limit allowed on server side for the parameter `pageSize`.
:::

## Create a category

If the category does not exist yet, this method creates it, otherwise it throws an exception.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getCategoryApi()->create('winter_collection', [
    'parent' => 'master',
    'labels' => [
        'en_US' => 'Winter collection',
        'fr_FR' => "Collection hiver",
    ]
]);
```

## Upsert a category

If the category does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getCategoryApi()->upsert('winter_collection', [
    'parent' => 'master',
    'labels' => [
        'en_US' => 'Winter collection',
        'fr_FR' => "Collection hiver",
    ]
]);
```

## Upsert a list of categories

This method allows to create or update a list of categories.
It has the same behavior as the `upsert` method for a single category, except that the code must be specified in the data of each category.


```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getCategoryApi()->upsertList([
    [
        'code'   => 'winter_collection',
        'parent' => 'master',
        'labels' => [
            'en_US' => 'Winter collection',
            'fr_FR' => "Collection hiver",
        ]
    ],
    [
        'code'   => 'helicopter',
        'parent' => 'machine',
        'labels' => [
            'en_US' => 'Helicopter',
            'fr_FR' => 'Hélicoptere',
        ]
    ],
]);
```

::: warning
There is a limit on the maximum number of categories that you can upsert in one time on server side.
:::
