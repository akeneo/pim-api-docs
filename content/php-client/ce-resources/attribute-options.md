## Attribute option

### Get an attribute option

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

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

### Get a list of attribute options

There are two ways of getting attribute options. 

#### By getting pages

This method allows to get attribute options page per page, as a classical pagination.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$firstPage = $client->getAttributeOptionApi()->listPerPage('a_simple_select', 50, true);
```

You can get more information about this method [here](/php-client/list-resources.html#by-getting-pages).

#### With a cursor

This method allows to iterate the attribute options. It will automatically get the next pages for you.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$attributes = $client->getAttributeOptionApi()->all('a_simple_select', 50);
```

You can get more information about this method [here](/php-client/list-resources.html#with-a-cursor).

### Create an attribute 

If the attribute option does not exist yet, this method creates it, otherwise it throws an exception.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

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

### Upsert an attribute option

If the attribute option does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

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
