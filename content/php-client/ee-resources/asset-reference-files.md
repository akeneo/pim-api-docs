## Asset reference file

:::warning
This resource is only available in the [Entreprise Edition](https://www.akeneo.com/enterprise-edition/).
:::

:::warning
This resource is only available since the version 2.0 of the PHP API client.
:::

### Get a reference file of a localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'   => 'a/7/7/d/a77d13fb0e661587aec8ce81d479627e3ff467f4_chicago_skyline.jpg',
 *     'locale' => 'en_US',
 *     '_link'  => [
 *         'download' => [
 *             'href' => 'http://akeneo.com/api/rest/v1/assets/chicagoskyline/reference-files/en_US/download',
 *         ],
 *     ],
 * ]
 */
$product = $client->getAssetReferenceFileApi()->getFromLocalizableAsset('chicagoskyline', 'en_US');
```

### Get a reference file of a not localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

/*
 * Returns an array like this:
 * [
 *     'code'   => 'b/7/b/e/b7be03a438ace1d9ea782440f735a72fff2a3f3c_bridge.jpg',
 *     'locale' => null,
 *     '_link'  => [
 *         'download' => [
 *             'href' => 'http://akeneo.com/api/rest/v1/assets/bridge/reference-files/no-locale/download',
 *         ],
 *     ],
 * ]
 */
$product = $client->getAssetReferenceFileApi()->getFromNotLocalizableAsset('bridge');
```

### Download a reference file of a localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$product = $client->getAssetReferenceFileApi()->downloadFromLocalizableAsset('chicagoskyline', 'en_US');

file_put_contents('/tmp/chicagoskyline.jpg', $product->getContents());
```

### Download a reference file of a not localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$product = $client->getAssetReferenceFileApi()->downloadFromNotLocalizableAsset('bridge');

file_put_contents('/tmp/bridge.jpg', $product->getContents());
```

### Upload an asset reference file for a localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetReferenceFileApi()->uploadForLocalizableAsset('/tmp/chicagoskyline.jpg', 'chicagoskyline', 'en_US');
```

It will also automatically generate all the variation files corresponding to this reference file.
If one or more generations of variation files failed, a specific exception will be thrown.
You'll be able to see the details of the errors from this exception.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

try {
    $client->getAssetReferenceFileApi()->uploadForLocalizableAsset('/tmp/chicagoskyline.jpg', 'chicagoskyline', 'en_US');
} catch(UploadAssetReferenceFileErrorException $exception) {
    $uploadErrors = $exception->getErrors();
}

/*
 * Example of errors:
 *
 * [
 *     0 => [
 *         'message' => 'Impossible to "scale" the image "Ziggy.jpg" with a width bigger than the original.',
 *         'scope'   => 'mobile',
 *         'locale'  => 'en_US',
 *     ],
 *     1 => [
 *         'message' => 'Impossible to "resize" the image "Ziggy.jpg" with a width bigger than the original.',
 *         'scope'   => 'print',
 *         'locale'  => 'en_US',
 *     ]
 * ]
 */

```

### Upload an asset reference file for a not localizable asset

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$client->getAssetReferenceFileApi()->uploadForNotLocalizableAsset('/tmp/bridge.jpg', 'bridge');
```

It will also automatically generate all the variation files corresponding to this reference file.
If one or more generation of variation file failed, a specific exception will be thrown.
You'll be able to see the details of the errors from this exception.

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

try {
    $client->getAssetReferenceFileApi()->uploadForNotLocalizableAsset('/tmp/bridge.jpg', 'bridge');
} catch(UploadAssetReferenceFileErrorException $exception) {
    $uploadErrors = $exception->getErrors();
}

/*
 * Example of error:
 *
 * [
 *     'message' => 'Impossible to "scale" the image "Ziggy.jpg" with a width bigger than the original.',
 *     'scope'   => 'mobile',
 *     'locale'  => null,
 * ]
 */
```
