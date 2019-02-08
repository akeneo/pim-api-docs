# Getting started

## Requirements

* PHP >= 5.6
* Composer

## Compatibility matrix

Below you will find which PHP client version to use depending on your PIM version.

| PIM version | API PHP client version |
|--------|----|
| v2.0  | v1.0 |
| v2.1 - v2.2 | v2.0 |
| v2.3 | v3.0 | 
| v3.0 | v4.0 | 

::: info
Note that our PHP client is backward compatible.

For example, if your PIM is currently a v2.3, you can still use a 1.0 version of the PHP client.
The new endpoints available in v2.3 will not be available in the v1.0 of the PHP client.
:::


## Installation

`api-php-client` and `api-php-client-ee` use [Composer](http://getcomposer.org).
The first step is to download Composer:

```bash
$ curl -s http://getcomposer.org/installer | php
```
We use HTTPPlug as the HTTP client abstraction layer. If you want to know more about this, it's documented [here](/php-client/http-client.html).
In this example, we will use [Guzzle](https://github.com/guzzle/guzzle) v6 as the HTTP client implementation.

Run the following command to require the libraries in your project:

### Community Edition 
```bash
$ php composer.phar require akeneo/api-php-client php-http/guzzle6-adapter
```

### Enterprise Edition
```bash
$ php composer.phar require akeneo/api-php-client-ee php-http/guzzle6-adapter
```

::: info
If you don't know which implementation to choose, we strongly recommend you to use Guzzle v6, as in the previous example.
:::

## Initialisation of the client

You first need to initialise the client with your credentials client id/secret and with your user/password.

If you don't have any client id/secret, let's take a look at [this page](/documentation/security.html#authentication) to create it.

### Community Edition

```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

$clientBuilder = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://localhost/');
$client = $clientBuilder->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');
```

You can authenticate to the client with your token/refresh token as well.
```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

$clientBuilder = new \Akeneo\Pim\ApiClient\AkeneoPimClientBuilder('http://localhost/');
$client = $clientBuilder->buildAuthenticatedByToken('client_id', 'secret', 'token', 'refresh_token');
```

### Enterprise Edition

```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

$clientBuilder = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://localhost/');
$client = $clientBuilder->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');
```

You can authenticate to the client with your token/refresh token as well.
```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

$clientBuilder = new \Akeneo\PimEnterprise\ApiClient\AkeneoPimEnterpriseClientBuilder('http://localhost/');
$client = $clientBuilder->buildAuthenticatedByToken('client_id', 'secret', 'token', 'refresh_token');
```

Want to know more about authentication? It's over [there](/php-client/authentication.html).

## Make your first call

Getting a product is as simple as:

```
$product = $client->getProductApi()->get('top');
echo $product['identifier'];
```

Want to [update an attribute](/php-client/resources.html#upsert-an-attribute), [create a category](/php-client/resources.html#create-a-category) or [delete a product](/php-client/resources.html#delete-a-product)? You can get code snippets for all the resources [here](/php-client/resources.html)
