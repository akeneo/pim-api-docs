### Category media file

#### Download media file 
::: php-client-availability versions=11.2.0

```php
$client = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://akeneo.com/')->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');

$mediaFile = $client->getCategoryMediaFileApi()->download('code/example');

file_put_contents('/tmp/ziggy.jpg', $mediaFile->getBody());
```
