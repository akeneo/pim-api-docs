### Asset attribute option

We refer here to the asset attribute option of the [Asset Manager](/beta/asset-manager/concepts-and-resources.html#the-asset-attribute-option).

::: warning
This resource is only available in the [Entreprise Edition](https://www.akeneo.com/enterprise-edition/).
:::

:::warning
This resource is only available since the version 5.0 of the PHP API client.
:::

#### Get an attribute option for a given attribute of a given asset

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code' => 'blue',
 *     'labels' => [
 *         'en_US' => 'Blue',
 *         'fr_FR' => 'Bleu',
 *     ]
 * ]
 */
$client->getAssetAttributeOptionApi()->get('packshot', 'main_colors', 'blue);

```

#### Get the list of attribute options of a given attribute for a given asset

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetAttributeOptionApi()->all('packshot', 'main_colors');
```

#### Upsert an attribute option for a given attribute of a given asset

If the attribute option does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetAttributeOptionApi()->upsert('packshot', 'main_colors', 'blue', [
    'code' => 'blue',
    'labels' => [
        'en_US' => 'Blue',
        'fr_FR' => 'Bleu',
    ]
]);
```
