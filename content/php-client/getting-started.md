# Getting started

The PHP client facilitates the usage of the API in your PHP projects. It uses PHP arrays in input and output.

Want to be ready quickly? Read the following instructions!

## Requirements

* PHP >= 5.6
* Composer

## Installation

`api-php-client` uses [Composer](http://getcomposer.org).
The first step to use `api-php-client` is to download Composer:

```bash
$ curl -s http://getcomposer.org/installer | php
```
We use HTTPPlug as the HTTP client abstraction layer. If you want to know more about this, it's documented [here](/php-client/http-client.html).
In this example, we will use [Guzzle](https://github.com/guzzle/guzzle) v6 as the HTTP client implementation.

Run the following command to require the libraries in your project:
```bash
$ php composer.phar require akeneo/api-php-client php-http/guzzle6-adapter
```

::: info
If you don't know which implementation to choose, we strongly recommend you to use Guzzle v6, as in the previous example.
:::

## Initialisation of the client

You first need to initialise the client with your credentials client id/secret and with your user/password.

If you don't have any client id/secret, let's take a look at [this page](/documentation/security.html#authentication) to create it.

```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

$clientBuilder = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://localhost/');
$client = $clientBuilder->buildAuthenticatedByPassword('client_id', 'secret', 'admin', 'admin');
```

You can authenticate to the client with your token/refresh token as well.
```php
<?php

require_once __DIR__ . '/vendor/autoload.php';

$clientBuilder = new \Akeneo\Pim\Client\AkeneoPimClientBuilder('http://localhost/');
$client = $clientBuilder->buildAuthenticatedByToken('client_id', 'secret', 'token', 'refresh_token');
```

Want to know more about authentication? It's over [there](/php-client/authentication.html).

## Make your first call

Getting a product is as simple as:

```
$product = $client->getProductApi()->get('top');
echo $product['identifier'];
```

Want to [update an attribute](/php-client/resources.html#upsert-an-attribute), [create a category](/php-client/resources.html#create-a-category) or [delete a product](/php-client/resources.html#delete-a-product) ? You can get code snippets for all the resources [here](/php-client/resources.html).
