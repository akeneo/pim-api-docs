## Product draft

### Get a product draft 

```php
$client = new \Akeneo\PimEnterprise\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'identifier': 'top',
 *     'enabled': true,
 *     'family': 'tshirt',
 *     'categories': ['summer_collection'],
 *     'groups': [],
 *     'values': [
 *         'name': [
 *              [
 *                  'data': 'Top',
 *                  'locale': 'en_US',
 *                  'scope': null
 *              ],
 *              [
 *                  'data': 'Débardeur',
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
$publishedProduct = $client->getProductDraftApi()->get('top');
```

You can get more information about the returned format of the product values [here](/documentation/resources.html#product-values).

The field `metadata` is specific to Akeneo PIM Enterprise Edition. The status of the draft is specified in this field.
