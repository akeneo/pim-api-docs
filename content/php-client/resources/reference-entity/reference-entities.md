### Reference entity

::: warning
This resource is only available in the [Entreprise Edition](https://www.akeneo.com/enterprise-edition/).
:::

#### Get a reference entity

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code' => 'brand',
 *     'labels' => [
 *         'en_US' => 'Brand',
 *         'fr_FR' => 'Marque',
 *     ],
 *     'image' => '5/e/e/e/5eee4242ed8d2f1a5f5ff41d00457ecbe637b71e_brand.jpg',
 *     '_links' => [
 *         'image_download' => [
 *             'href' => 'http://localhost:8080/api/rest/v1/reference-entities-media-files/5/e/e/e/5eee4242ed8d2f1a5f5ff41d00457ecbe637b71e_brand.jpg',
 *         ],
 *     ],
 * ]
 */
 $referenceEntity = $client->getReferenceEntityApi()->get('brand');
 ```
 
#### Get the list of the reference entities

You can get more information about the available query parameters [here](/api-reference.html#get_reference_entities).

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$referenceEntitiesCursor = $client->getReferenceEntityApi()->all();
```

#### Upsert a reference entity

If the reference entity does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getReferenceEntityApi()->upsert('brand', [
    'code' => 'brand',
    'labels' => [
        'en_US' => 'Brand',
        'fr_FR' => 'Marque',
    ],
    'image' => '5/e/e/e/5eee4242ed8d2f1a5f5ff41d00457ecbe637b71e_brand.jpg'
]);
```
