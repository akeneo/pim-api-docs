## Asset tags

### Get an asset tag

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code' => 'water',
 * ]
 */
$assetTag = $client->getAssetTagApi()->get('water');
```

### Get a list of asset tags

There are two ways of getting asset tags.

#### By getting pages

This method allows to get asset tags page per page, as a classical pagination.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$firstPage = $client->getAssetTagApi()->listPerPage(50, true);
```

You can get more information about this method [here](/php-client/list-resources.html#by-getting-pages).

#### With a cursor

This method allows to iterate the asset tags. It will automatically get the next pages for you.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$assetTags = $client->getAssetTagApi()->all(50);
```

You can get more information about this method [here](/php-client/list-resources.html#with-a-cursor).

### Upsert an asset tag

If the asset tag does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetTagApi()->upsert('cat');
```
