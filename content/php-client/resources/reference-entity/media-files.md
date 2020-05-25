### Reference entity media file

#### Download the media file associated to a reference entity or a record
::: php-client-availability versions=4.0,5.0,6.0 editions=EE

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$mediaFileResponse = $client->getReferenceEntityMediaFileApi()->download('images/kartell.png');
```

From the response, you can retrieve the file name in the header "Content-Disposition" and the mime type in the header "Content-Type".

#### Create a new media file for a reference entity or a record
::: php-client-availability versions=4.0,5.0,6.0 editions=EE

```php
$client = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$mediaFileCode = $client->getReferenceEntityMediaFileApi()->create('/tmp/kartell.png');
```
