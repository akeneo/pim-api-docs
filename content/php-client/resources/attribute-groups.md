## Attribute group

### Get an attribute group

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'       => 'marketing',
 *     'attributes' => ['sku', 'name', 'description', 'response_time', 'release_date', 'price'],
 *     'sort_order' => 4,
 *     'labels'     => [
 *          'en_US' => 'Marketing',
 *          'fr_FR' => 'Marketing',
 *      ],
 * ]
 */
$attributeGroup = $client->getAttributeGroupApi()->get('marketing');
```

### Get a list of attribute groups

There are two ways of getting attribute groups.
 
#### By getting pages
 
 This method allows to get attribute groups page per page, as a classical pagination.
 
```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$firstPage = $client->getAttributeGroupApi()->listPerPage(50, true);
```

You can get more information about this method [here](/php-client/list-resources.html#by-getting-pages).

#### With a cursor

This method allows to iterate the attribute groups. It will automatically get the next pages for you.

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$attributeGroups = $client->getAttributeGroupApi()->all(50);
```

You can get more information about this method [here](/php-client/list-resources.html#with-a-cursor).
