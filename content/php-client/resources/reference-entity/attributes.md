### Reference entity attribute

::: warning
This resource is only available in the [Entreprise Edition](https://www.akeneo.com/enterprise-edition/).
:::

#### Get an attribute of a given reference entity

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code' => 'description',
 *     'labels' => [
 *         'en_US' => 'Description',
 *         'fr_FR' => 'Description',
 *     ],
 *     'type' => 'text',
 *     'localizable' => true,
 *     'scopable' => true,
 *     'is_required_for_completeness' => true,
 *     'max_characters' => null,
 *     'is_textarea' => true,
 *     'is_rich_text_editor' => true,
 *     'validation_rule' => 'none',
 *     'validation_regexp' => null,
 * ]
 */
$referenceEntityAttribute = $client->getReferenceEntityAttributeApi()->get('brand', 'description');
̀ ``

#### Get the list of attributes of a given reference entity

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$referenceEntityRecordsCursor = $client->getReferenceEntityAttributeApi()->all('brand');
```

#### Upsert an attribute of a given reference entity

If the attribute does not exist yet, this method creates it, otherwise it updates it.

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getReferenceEntityAttributeApi()->upsert('brand', 'description', [
    'code' => 'description',
    'labels' => [
        'en_US' => 'Description'
    ],
    'type' => 'text',
    'localizable' => true,
    'scopable' => true,
    'is_required_for_completeness' => false
]);
```
