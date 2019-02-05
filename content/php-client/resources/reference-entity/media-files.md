### Reference entity media file

::: warning
This resource is only available in the [Entreprise Edition](https://www.akeneo.com/enterprise-edition/).
:::

#### Download the media file associated to a reference entity or a record

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$mediaFileResponse = $client->getReferenceEntityMediaFileApi()->download('images/kartell.png');
```

From the response, you can retrieve the file name in the header "Content-Disposition" and the mime type in the header "Content-Type"

#### Create a new media file for a reference entity or a record

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$mediaFileCode = $client->getReferenceEntityMediaFileApi()->create('/tmp/kartell.png');
```
