### Asset family

We refer here to the asset family of the [Asset Manager](/beta/asset-manager/concepts-and-resources.html#the-asset-familyl).

::: warning
This resource is only available in the [Entreprise Edition](https://www.akeneo.com/enterprise-edition/).
:::

:::warning
This resource is only available since the version 5.0 of the PHP API client.
:::

#### Get a asset family

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code' => 'user_instructions',
 *     'labels' => [
 *         'en_US' => 'User instructions',
 *         'fr_FR' => 'Notice d\'utilisation',
 *     ],
 *     'product_link_rules' => [],
 * ]
 */
$client->getAssetFamilyApi()->get('user_instructions');
```
 
#### Get the list of the asset families

You can get more information about the available query parameters [here](/api-reference-asset-manager.html#get_asset_families).

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetFamilyApi()->all();
```

#### Upsert a asset family

If the asset family does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetFamilyApi()->upsert('user_instructions', [
    'code' => 'user_instructions',
    'labels' => [
        'en_US' => 'User instructions',
        'fr_FR' => 'Notice d\'utilisation',
    ]
]);
```
