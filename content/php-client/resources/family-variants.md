## Family variants

### Get a family variant

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');
                     
/*
 * Returns an array like this:
 * [
 *     'code' => 'boots_color_size',
 *     'labels' => [
 *         'de_DE' => 'Stiefel nach Farbe und Größe',
 *         'en_US' => 'Boots by color and size',
 *         'fr_FR' => 'Bottes par couleur et taille'
 *     ],
 *     'variant_attribute_sets' => [
 *         [
 *             'level' => 1,
 *             'axes' => ['color'],
 *             'attributes' => ['name', 'description', 'color']
 *         ],
 *         [
 *             'level' => 2,
 *             'axes' => ['size'],
 *             'attributes' => ['sku', 'size']
 *         ]
 *     ]
 * ]
 */
$familyVariant = $client->getFamilyVariantApi()->get('boots', 'boots_color_size');
```

### Get a list of family variants

There are two ways of getting family variants.

#### By getting pages

This method allows to get family variants page per page, as a classical pagination.
It's possible to get the total number of family variants with this method.

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$firstPage = $client->getFamilyVariantApi()->listPerPage('boots', 50, true);
```

::: warning
There is a maximum limit allowed on server side for the parameter `limit`.
:::

::: warning
Setting the parameter `with_count`  to `true`  can drastically decrease the performance.
It's recommended to let this parameter with the default value `false` if the total number of family variants is not needed in the response.
:::

You can get more information about this method [here](/php-client/list-resources.html#by-getting-pages).

#### With a cursor

This method allows to iterate the family variants. It will automatically get the next pages for you.

```php
$client = new \Akeneo\Pim\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$familyVariants = $client->getFamilyVariantApi()->all('boots', 50);
```

:::warning
There is a maximum limit allowed on server side for the parameter `pageSize`.
:::

You can get more information about this method [here](/php-client/list-resources.html#with-a-cursor).
