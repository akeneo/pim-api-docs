### Asset variation file

:::warning
This resource is only available in the [Entreprise Edition](https://www.akeneo.com/enterprise-edition/).
:::

:::warning
This resource is only available since the version 2.0 of the PHP API client.
:::

#### Get a variation file of a localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'   => 'f/5/5/c/f55c7ea4adae17d4e02f4d04a839bc2a7cdbf165_chicago_skyline_en_US_mobile.jpg',
 *     'locale' => 'en_US',
 *     'scope'  => 'mobile',
 *     '_link'  => [
 *         'download' => [
 *             'href' => 'http://akeneo.com/api/rest/v1/assets/chicagoskyline/variation-files/mobile/en_US/download',
 *         ],
 *     ],
 * ]
 */
$product = $client->getAssetVariationFileApi()->getFromLocalizableAsset('chicagoskyline', 'mobile', 'en_US');
```

#### Get a variation file of a not localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'   => '0/7/2/1/07217eea32563821b46336d2dec696e4f69415ec_bridge_mobile.jpg',
 *     'locale' => null,
 *     'scope'  => 'mobile',
 *     '_link'  => [
 *         'download' => [
 *             'href' => 'http://akeneo.com/api/rest/v1/assets/bridge/variation-files/mobile/no-locale/download',
 *         ],
 *     ],
 * ]
 */
$product = $client->getAssetVariationFileApi()->getFromNotLocalizableAsset('bridge', 'mobile');
```

#### Download a variation file of a localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$product = $client->getAssetVariationFileApi()->downloadFromLocalizableAsset('chicagoskyline', 'mobile', 'en_US');

file_put_contents('/tmp/chicagoskyline-mobile.jpg', $product->getContents());
```

From v4 of the PHP client, the response is returned instead of the content. It allows to get the filename and the Mime type from the response.
You can get the content this way:

```php
file_put_contents('/tmp/chicagoskyline-mobile.jpg', $product->getBody()->getContents());
```

#### Download a variation file of a not localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$product = $client->getAssetVariationFileApi()->downloadFromNotLocalizableAsset('bridge', 'mobile');

file_put_contents('/tmp/bridge-mobile.jpg', $product->getContents());
```

From the v4 of the PHP client, the response is returned instead of the content. It allows getting the filename and the MIME type from the response.
You can get the content this way:

```php
file_put_contents('/tmp/bridge-mobile.jpg', $product->getBody()->getContents());
```

#### Upload an asset variation file for a localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetVariationFileApi()->uploadForLocalizableAsset('/tmp/chicagoskyline-mobile.jpg', 'chicagoskyline', 'mobile','en_US');
```

#### Upload an asset variation file for a not localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetVariationFileApi()->uploadForNotLocalizableAsset('/tmp/bridge-mobile.jpg', 'bridge', 'mobile');
```

