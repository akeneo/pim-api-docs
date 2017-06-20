# Media

## Get media file information

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'              => 'code/example',
 *     'original_filename' => 'ziggy.jpg',
 *     'mime_type'         => 'image/jpeg',
 *     'size'              => 1337,
 *     'extension'         => 'jpg',
 *     '_links'            => [
 *         'download' => [
 *             'href' => 'http://localhost/api/rest/v1/media-files/code/example/download',
 *         ],
 *     ],
 * ];
 */
$product = $client->getProductMediaFileApi()->get('code/example');
```

## Download media file 

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$product = $client->getProductMediaFileApi()->download('code/example');

file_put_contents('/tmp/ziggy.jpg', $product->getContents());
```

## Get a list of media files 

There are two ways of getting media files.

### By getting pages

This method allows to get media files page per page, as a classical pagination.
It's possible to get the total number of media files with this method.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// set the limit of 50 media files per page and calculate the total number of media files
$firstPage = $client->getProductMediaFileApi()->listPerPage(50, true);

foreach ($firstPage->getItems() as $mediaFile) {
    // do your stuff here
    echo $mediaFile['code'];
}

// return the total number of products (not just the number of items in the page)
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
It's recommended to let this parameter with the default value `false` if the total number of media files is not needed in the response.
:::

### With a cursor

This method allows to iterate the media files. It will automatically get the next pages for you.
With this method, it's not possible to get the previous page, or getting the total number of products.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// get a cursor with a page size of 50, apply a research
$mediaFiles = $client->getProductMediaFileApi()->all(50);
foreach ($mediaFiles as $mediaFile) {
    // do your stuff here
    echo $mediaFile['code'];
}
```
:::warning
There is a maximum limit allowed on server side for the parameter `pageSize`.
:::

## Create a new media file 

Create a new media file and associate it to a product.

```php
$client = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getProductMediaFileApi()->create('/tmp/ziggy.jpg', [
    'identifier' => 'medium_boot',
    'attribute'  => 'side_view',
    'scope'      => 'ecommerce',
    'locale'     => 'en_US',
]);
```

