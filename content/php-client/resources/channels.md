## Channel

### Get a channel

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'             => 'ecommerce',
 *     'currencies'       => ['USD', 'EUR'],
 *     'locales'          => ['de_DE', 'en_US', 'fr_FR'],
 *     'category_tree'    => 'master',
 *     'conversion_units' => [],
 *     'labels'           => [
 *         'en_US' => 'Ecommerce',
 *         'de_DE' => 'Ecommerce',
 *         'fr_FR' => 'Ecommerce',
 *     ],
 * ]
 */
$channel = $client->getChannelApi()->get('ecommerce');
```

### Get a list of channels

There are two ways of getting channels. 

#### By getting pages

This method allows to get channels page per page, as a classical pagination.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$firstPage = $client->getChannelApi()->listPerPage(50, true);
```

You can get more information about this method [here](/php-client/list-resources.html#by-getting-pages).

#### With a cursor

This method allows to iterate the channels. It will automatically get the next pages for you.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$channels = $client->getChannelApi()->all(50);
```

You can get more information about this method [here](/php-client/list-resources.html#with-a-cursor).
