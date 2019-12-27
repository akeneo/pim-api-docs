### Asset media file

We refer here to the asset media file of the [Asset Manager](/beta/asset-manager/concepts-and-resources.html#the-asset-media-file).

::: warning
This resource is only available in the [Entreprise Edition](https://www.akeneo.com/enterprise-edition/).
:::

:::warning
This resource is only available since the version 5.0 of the PHP API client.
:::

#### Download the media file associated to a asset or a record

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$mediaFileCode = 'f/c/3/6/fc36131bf5a352261999ea8424f540fce164d66b_allie_jean_model_picture.png';
$mediaFileResponse = $client->getAssetMediaFileApi()->download($mediaFileCode);
```

From the response, you can retrieve the file name in the header "Content-Disposition" and the mime type in the header "Content-Type"

#### Create a new media file for a asset or a record

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$mediaFileCode = $client->getAssetMediaFileApi()->create('/tmp/allie_jean_model_picture.png');
```
