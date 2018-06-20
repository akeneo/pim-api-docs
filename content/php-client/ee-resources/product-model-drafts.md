## Product model draft

### Get a product model draft 

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'identifier': 'tshirt-round-neck',
 *     'parent': null,
 *     'family': 'tshirt',
 *     'categories': ['summer_collection'],
 *     'values': [
 *         'name': [
 *              [
 *                  'data': 'Tshirt round neck',
 *                  'locale': 'en_US',
 *                  'scope': null
 *              ],
 *              [
 *                  'data': 'Tshirt col rond',
 *                  'locale': 'fr_FR',
 *                  'scope': null
 *              ],
 *         ],
 *     ],
 *     'created': '2016-06-23T18:24:44+02:00',
 *     'updated': '2016-06-25T17:56:12+02:00',
 *     'associations': [
 *         'PACK': [
 *             'products': [
 *                 'sunglass'
 *             ],
 *             'groups': []
 *         ],
 *     ],
 *     'metadata' => [
 *         'workflow_status' => 'draft_in_progress',
 *     ],
 * ]
 */
$publishedProductModel = $client->getProductModelDraftApi()->get('tshirt-round-neck');
```

You can get more information about the returned format of the product values [here](/documentation/resources.html#product-values).

The field `metadata` is specific to Akeneo PIM Enterprise Edition. The status of the draft is specified in this field.

### Submit a product model draft for approval

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getProductModelDraftApi()->submitForApproval('tshirt-round-neck');
```

It is mandatory that the user already created a draft for the product model `tshirt-round-neck`, and that this draft was not approved yet.
