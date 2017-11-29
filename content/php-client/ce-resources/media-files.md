## Media

### Get media file information

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

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

### Download media file 

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$product = $client->getProductMediaFileApi()->download('code/example');

file_put_contents('/tmp/ziggy.jpg', $product->getContents());
```

### Get a list of media file information 

There are two ways of getting media files.

#### By getting pages

This method allows to get media files page per page, as a classical pagination.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$firstPage = $client->getProductMediaFileApi()->listPerPage(50, true);
```

You can get more information about this method [here](/php-client/list-resources.html#by-getting-pages).

#### With a cursor

This method allows to iterate the media files. It will automatically get the next pages for you.
With this method, it's not possible to get the previous page, or getting the total number of products.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

// get a cursor with a page size of 50, apply a research
$mediaFiles = $client->getProductMediaFileApi()->all(50);
```

You can get more information about this method [here](/php-client/list-resources.html#with-a-cursor).

### Create a new media file 

Create a new media file and associate it to a product.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getProductMediaFileApi()->create('/tmp/ziggy.jpg', [
    'identifier' => 'medium_boot',
    'attribute'  => 'side_view',
    'scope'      => 'ecommerce',
    'locale'     => 'en_US',
]);
```

