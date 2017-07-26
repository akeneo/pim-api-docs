## Association type

### Get an association type

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'       => 'X_SELL',
 *     'labels'     => [
 *          'en_US' => 'Cross sell',
 *          'fr_FR' => 'Vente croisée',
 *      ],
 * ]
 */
$associationType = $client->getAssociationTypeApi()->get('X_SELL');
```

### Get a list of association types

There are two ways of getting association types.
 
#### By getting pages
 
 This method allows to get association types page per page, as a classical pagination.
 
```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$firstPage = $client->getAssociationTypeApi()->listPerPage(50, true);
```

You can get more information about this method [here](/php-client/list-resources.html#by-getting-pages).

#### With a cursor

This method allows to iterate the association types. It will automatically get the next pages for you.

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$associationTypes = $client->getAssociationTypeApi()->all(50);
```

You can get more information about this method [here](/php-client/list-resources.html#with-a-cursor).
