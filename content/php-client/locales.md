# Locale

## Get a locale 

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'   => 'en_US',
 *     'enable' => true,
 * ]
 */
$locale = $client->getLocaleApi()->get('ecommerce');
```

## Get a list of locales 

There are two ways of getting locales. 

### By getting pages

This method allows to get locales page per page, as a classical pagination.
It's possible to get the total number of locales with this method.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// set the limit of 50 locales per page, and calculate the total number of locales 
$firstPage = $client->getLocaleApi()->listPerPage(50, true);

foreach ($firstPage->getItems() as $locale) {
    // do your stuff here
    echo $locale['code'];
}

// return the total number of locales (not just the number of items in the page)
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
It's recommended to let this parameter with the default value `false` if the total number of locales is not needed in the response.
:::


### With a cursor

This method allows to iterate the locales. It will automatically get the next pages for you.
With this method, it's not possible to get the previous page, or getting the total number of locales.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// get a cursor with a page size of 50
$locales = $client->getLocaleApi()->all(50);
foreach ($locales as $locale) {
    // do your stuff here
    echo $locale['code'];
}
```
:::warning
There is a maximum limit allowed on server side for the parameter `pageSize`.
:::
