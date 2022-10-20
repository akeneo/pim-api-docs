# Getting started

## Requirements

* PHP >= 7.4
* Composer

## Compatibility matrix

Below you will find which PHP client version to use depending on your PIM version.

| PIM version | REST API PHP client version | [End of life](https://help.akeneo.com/pim/serenity/supported-versions-table.html) |
|-------------|-----------------------------|-----------------------------------------------------------------------------------|
| v2.0        | v1.0                        | March 2019                                                                        |
| v2.1 - v2.2 | v2.0                        | March 2019                                                                        |
| v2.3        | v3.0                        | December 2019                                                                     |
| v3.0 - v3.1 | v4.0                        | August 2020                                                                       |
| v3.2 - v4.0 | v5.0                        | August 2021                                                                       |
| v5.0        | v6.0                        | September 2022                                                                    |
| v6.0 - SaaS | v7.0 to current latest      |                                                                                   |

### Enterprise Edition

::: warning
Enterprise Edition and Community Edition of the client have been merged into a one and unique package.
Every user shall now use the same client package. Learn about migration instructions [here](https://github.com/akeneo/api-php-client-ee#warning-the-client-project-has-moved-warning).
:::

## Deprecation notice

::: info
Note that our PHP client is backward compatible.

For example, if your PIM is currently a v6.0, you can still use a 1.0 version of the PHP client.
The new endpoints available in v6.0 will not be available in the v1.0 of the PHP client.
:::


## Installation

`api-php-client` use [Composer](http://getcomposer.org).
The first step is to download Composer:

```bash
$ curl -s http://getcomposer.org/installer | php
```
We use HTTPPlug as the HTTP client abstraction layer. If you want to know more about this, it's documented [here](/php-client/http-client.html).
In this example, we will use [Guzzle](https://github.com/guzzle/guzzle) v6 as the HTTP client implementation.

Run the following command to require the libraries in your project:

```bash
$ php composer.phar require akeneo/api-php-client php-http/guzzle6-adapter:^2.0 http-interop/http-factory-guzzle:^1.0
```

::: info
If you don't know which implementation to choose, we strongly recommend you to use Guzzle v6, as in the previous example.
:::

## Initialization of the client

You first need to initialize the client with your credentials (client id, secret, username and password).

If you don't have any client id/secret, let's take a look at [this page](/documentation/authentication.html#client-idsecret-generation) to create it.

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

Want to know more about authentication? It's over [there](/php-client/authentication.html).

## Make your first call

Getting a product is as simple as:

```
$product = $client->getProductUuidApi()->get('1cf1d135-26fe-4ac2-9cf5-cdb69ada0547');
echo $product['uuid'];
```

Want to [update an attribute](/php-client/resources.html#upsert-an-attribute), [create a category](/php-client/resources.html#create-a-category) or [delete a product](/php-client/resources.html#delete-a-product)? You can get code snippets for all the resources [here](/php-client/resources.html)
