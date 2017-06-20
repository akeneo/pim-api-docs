# Attribute

## Get an attribute 

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'                   => 'release_date',
 *     'type'                   => 'pim_catalog_date',
 *     'group'                  => 'marketing',
 *     'unique'                 => false,
 *     'useable_as_grid_filter' => true,
 *     'allowed_extensions'     => [],
 *     'metric_family'          => null,
 *     'default_metric_unit'    => null,
 *     'reference_data_name'    => null,
 *     'available_locales'      => [],
 *     'max_characters'         => null,
 *     'validation_rule'        => null,
 *     'validation_regexp'      => null,
 *     'wysiwyg_enabled'        => null,
 *     'number_min'             => null,
 *     'number_max'             => null,
 *     'decimals_allowed'       => null,
 *     'negative_allowed'       => null,
 *     'date_min'               => "2017-06-28T08:00:00",
 *     'date_max'               => "2017-08-08T22:00:00",
 *     'max_file_size'          => null,
 *     'minimum_input_length'   => null,
 *     'sort_order'             => 1,
 *     'localizable'            => false,
 *     'scopable'               => false,
 *     'labels'                 => [
 *         'en_US': 'Sale date',
 *         'fr_FR': 'Date des soldes'],
 *     ]
 * ]
 */
$attribute = $client->getAttributeApi()->get('release_date');
```

## Get a list of attributes

There are two ways of getting attributes. 

### By getting page

This method allows to get attributes page per page, as a classical pagination.
It's possible to get the total number of attributes with this method.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// set the limit of 50 attributes per page, and calculate the total number of attributes
$firstPage = $client->getAttributeApi()->listPerPage(50, true);

foreach ($firstPage->getItems() as $attribute) {
    // do your stuff here
    echo $attribute['code'];
}

// return the total number of attributes (not just the number of items in the page)
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
It's recommended to let this parameter with the default value `false` if the total number of attributes is not needed in the response.
:::


### With a cursor

This method allows to iterate the attributes. It will automatically get the next pages for you.
With this method, it's not possible to get the previous page, or getting the total number of attributes.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// get a cursor with a page size of 50
$attributes = $client->getAttributeApi()->all(50);
foreach ($attributes as $attribute) {
    // do your stuff here
    echo $attribute['code'];
}
```
:::warning
There is a maximum limit allowed on server side for the parameter `pageSize`.
:::

## Create an attribute 

If the attribute does not exist yet, this method creates it, otherwise it throws an exception.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAttributeApi()->create('release_date', [
    'type'                   => 'pim_catalog_date',
    'group'                  => 'marketing',
    'unique'                 => false,
    'useable_as_grid_filter' => true,
    'allowed_extensions'     => [],
    'metric_family'          => null,
    'default_metric_unit'    => null,
    'reference_data_name'    => null,
    'available_locales'      => [],
    'max_characters'         => null,
    'validation_rule'        => null,
    'validation_regexp'      => null,
    'wysiwyg_enabled'        => null,
    'number_min'             => null,
    'number_max'             => null,
    'decimals_allowed'       => null,
    'negative_allowed'       => null,
    'date_min'               => "2017-06-28T08:00:00",
    'date_max'               => "2017-08-08T22:00:00",
    'max_file_size'          => null,
    'minimum_input_length'   => null,
    'sort_order'             => 1,
    'localizable'            => false,
    'scopable'               => false,
    'labels'                 => [
        'en_US': 'Sale date',
        'fr_FR': 'Date des soldes'],
     ]
]);
```

## Upsert an attribute 

If the attribute does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAttributeApi()->upsert('release_date', [
    'type'                   => 'pim_catalog_date',
    'group'                  => 'marketing',
    'unique'                 => false,
    'useable_as_grid_filter' => true,
    'allowed_extensions'     => [],
    'metric_family'          => null,
    'default_metric_unit'    => null,
    'reference_data_name'    => null,
    'available_locales'      => [],
    'max_characters'         => null,
    'validation_rule'        => null,
    'validation_regexp'      => null,
    'wysiwyg_enabled'        => null,
    'number_min'             => null,
    'number_max'             => null,
    'decimals_allowed'       => null,
    'negative_allowed'       => null,
    'date_min'               => "2017-06-28T08:00:00",
    'date_max'               => "2017-08-08T22:00:00",
    'max_file_size'          => null,
    'minimum_input_length'   => null,
    'sort_order'             => 1,
    'localizable'            => false,
    'scopable'               => false,
    'labels'                 => [
        'en_US': 'Sale date',
        'fr_FR': 'Date des soldes'],
     ]
]);
```

## Upsert a list of attributes 

This method allows to create or update a list of attributes.
It has the same behavior as the `upsert` method for a single attribute, except that the code must be specified in the data of each attribute.


```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAttributeApi()->upsertList([
    [
        'code'                   => 'release_date',
        'type'                   => 'pim_catalog_date',
        'group'                  => 'marketing',
        'unique'                 => false,
        'useable_as_grid_filter' => true,
        'allowed_extensions'     => [],
        'metric_family'          => null,
        'default_metric_unit'    => null,
        'reference_data_name'    => null,
        'available_locales'      => [],
        'max_characters'         => null,
        'validation_rule'        => null,
        'validation_regexp'      => null,
        'wysiwyg_enabled'        => null,
        'number_min'             => null,
        'number_max'             => null,
        'decimals_allowed'       => null,
        'negative_allowed'       => null,
        'date_min'               => "2017-06-28T08:00:00",
        'date_max'               => "2017-08-08T22:00:00",
        'max_file_size'          => null,
        'minimum_input_length'   => null,
        'sort_order'             => 1,
        'localizable'            => false,
        'scopable'               => false,
        'labels'                 => [
            'en_US': 'Sale date',
            'fr_FR': 'Date des soldes'],
         ]
    ],
    [
        'code' => 'name',
        'type' => 'pim_catalog_text',
        'labels' => [
            'en_US' => 'Name',
            'fr_FR' => 'Nom',
        ]
    ],
]);
```

::: warning
There is a limit on the maximum number of attributes that you can upsert in one time on server side.
:::
