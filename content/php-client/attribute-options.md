# Attribute option

## Get an attribute option

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'       => 'black',
 *     'attribute'  => 'a_simple_select',
 *     'sort_order' => 2,
 *     'labels'     => [
 *         'en_US' => 'Black',
 *         'fr_FR' => 'Noir',
 *     ]
 * ]
 */
$attributeOption = $client->getAttributeOptionApi()->get('a_simple_select', 'black');
```

## Get a list of attribute options

There are two ways of getting attribute options. 

### By getting pages

This method allows to get attribute options page per page, as a classical pagination.
It's possible to get the total number of attribute options with this method.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// set the limit of 50 attribute options per page, and calculate the total number of attribute options for a given attribute
$firstPage = $client->getAttributeOptionApi()->listPerPage('a_simple_select', 50, true);

foreach ($firstPage->getItems() as $attributeOption) {
    // do your stuff here
    echo $attributeOption['code'];
}

// return the total number of attribute options (not just the number of items in the page)
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
It's recommended to let this parameter with the default value `false` if the total number of attribute options is not needed in the response.
:::


### With a cursor

This method allows to iterate the attribute options. It will automatically get the next pages for you.
With this method, it's not possible to get the previous page, or getting the total number of attribute options.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// get a cursor with a page size of 50
$attributes = $client->getAttributeOptionApi()->all('a_simple_select', 50);
foreach ($attributeOptions as $attributeOption) {
    // do your stuff here
    echo $attributeOption['code'];
}
```
:::warning
There is a maximum limit allowed on server side for the parameter `pageSize`.
:::

## Create an attribute 

If the attribute option does not exist yet, this method creates it, otherwise it throws an exception.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAttributeOptionApi()->create('a_simple_select', 'black', [
    [
        'sort_order' => 2,
        'labels'     => [
            'en_US' => 'Black',
            'fr_FR' => 'Noir',
        ]
    ]
]);
```

## Upsert an attribute option

If the attribute option does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAttributeOptionApi()->upsert('a_simple_select', 'black', [
    [
        'sort_order' => 2,
        'labels'     => [
            'en_US' => 'Black',
            'fr_FR' => 'Noir',
        ]
    ]
]);
```
