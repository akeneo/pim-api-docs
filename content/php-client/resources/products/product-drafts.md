### Product draft

#### Get a product draft 
::: php-client-availability versions=1.0,2.0,3.0,4.0,5.0,6.0 editions=EE

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'identifier' => 'top',
 *     'enabled' => true,
 *     'family' => 'tshirt',
 *     'categories' => ['summer_collection'],
 *     'groups' => [],
 *     'values' => [
 *         'name' => [
 *              [
 *                  'data' => 'Top',
 *                  'locale' => 'en_US',
 *                  'scope' => null
 *              ],
 *              [
 *                  'data' => 'Débardeur',
 *                  'locale' => 'fr_FR',
 *                  'scope' => null
 *              ],
 *         ],
 *     ],
 *     'created' => '2016-06-23T18:24:44+02:00',
 *     'updated' => '2016-06-25T17:56:12+02:00',
 *     'associations' => [
 *         'PACK' => [
 *             'products' => [
 *                 'sunglass'
 *             ],
 *             'groups' => [],
 *             'product_models' => []
 *         ],
 *     ],
 *     'metadata' => [
 *         'workflow_status' => 'draft_in_progress',
 *     ],
 * ]
 */
$draftProduct = $client->getProductDraftApi()->get('top');
```

You can get more information about the returned format of the product values [here](/concepts/products.html#focus-on-the-product-values).

The field `metadata` is specific to Akeneo PIM Enterprise Edition. The status of the draft is specified in this field.

::: warning
The field `product_models` in the `associations` property was added in the 2.1 version of the PIM and is therefore not present in previous versions.
:::

#### Submit a product draft for approval
::: php-client-availability versions=1.0,2.0,3.0,4.0,5.0,6.0 editions=EE

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getProductDraftApi()->submitForApproval('top');
```

It is mandatory that the user already created a draft for the product `top`, and that this draft was not approved yet.
