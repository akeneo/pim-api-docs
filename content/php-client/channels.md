# Channel

## Get a channel

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

## Get a list of channels

There are two ways of getting channels. 

### By getting pages

This method allows to get channels page per page, as a classical pagination.
It's possible to get the total number of channels with this method.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// set the limit of 50 channels per page, and calculate the total number of channels 
$firstPage = $client->getChannelApi()->listPerPage(50, true);

foreach ($firstPage->getItems() as $channel) {
    // do your stuff here
    echo $channel['code'];
}

// return the total number of channels (not just the number of items in the page)
$count = $firstPage->getCount();

if ($firstPage->hasNextPage()) {
    $secondPage = $firstPage->getNextPage();
}

if (null !== $secondPage && $secondPage->hasPreviousPage()) {
    $firstPage = $secondPage->getPreviousPage();
}
```

::: warning
There is a maximum limit allowed on server side when for the parameter `limit`.
:::

::: warning
Setting the parameter `with_count`  to `true`  can drastically decrease the performance. 
It's recommended to let this parameter with the default value `false` if the total number of channels is not needed in the response.
:::


### With a cursor

This method allows to iterate the channels. It will automatically get the next pages for you.
With this method, it's not possible to get the previous page, or getting the total number of channels.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// get a cursor with a page size of 50
$channels = $client->getChannelApi()->all(50);
foreach ($channels as $channel) {
    // do your stuff here
    echo $channel['code'];
}
```
:::warning
There is a maximum limit allowed on server side for the parameter `pageSize`.
:::
