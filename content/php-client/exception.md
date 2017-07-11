# Exception handling

Every request made with the client can throw an HTTP exception.

## HTTP exception

The parent of these HTTP exceptions is `Akeneo\Pim\Exception\HttpException`.
You can get the request and the response that are responsible of this exception. Also, the HTTP response code and response message are available.
 
```php
try {
    $client->getProductApi()->get('top');
} catch (HttpException $e) {
    // do your stuff with the exception
    $requestBody = $e->getRequest()->getBody();
    $responseBody = $e->getResponse()->getBody();
    $httpCode = $e->getCode(); 
    $errorMessage = $e->getMessage(); 
}
```

 
Two types of exception inherit from this exception: server exception and client exception.

## Server exception

A server exception thrown by the client means that the server failed to fulfill an apparently valid request.
It's an HTTP code from the 5xx family.

This exception is `Akeneo\Pim\Exception\ServerErrorHttpException`.

```php
try {
    $client->getProductApi()->get('top');
} catch (ServerErrorHttpException $e) {
    // do your stuff with the exception
    $requestBody = $e->getRequest()->getBody();
    $responseBody = $e->getResponse()->getBody();
    $httpCode = $e->getCode(); 
    $errorMessage = $e->getMessage(); 
}
```

## Client exception

A client exception could be thrown if the client made an invalid request.
It's an HTTP code from the 4xx family.

This exception is `Akeneo\Pim\Exception\ClientErrorHttpException`. It is subdivided in several specific exceptions.

### Bad request exception

This exception is thrown if the request does not contain valid JSON. It corresponds to the HTTP code 400.

```php
try {
    $client->getProductApi()->get('top');
} catch (BadRequestHttpException $e) {
    // do your stuff with the exception
    $requestBody = $e->getRequest()->getBody();
    $responseBody = $e->getResponse()->getBody();
    $httpCode = $e->getCode(); 
    $errorMessage = $e->getMessage(); 
}
```

::: info
It should not occur with the PHP client, because the JSON is generated from PHP array.
:::

### Not found exception

This exception is thrown if the requested resource does not exist. It corresponds to the HTTP code 404.

```php
try {
    $client->getProductApi()->get('top');
} catch (NotFoundHttpException $e) {
    // do your stuff with the exception
    $requestBody = $e->getRequest()->getBody();
    $responseBody = $e->getResponse()->getBody();
    $httpCode = $e->getCode(); 
    $errorMessage = $e->getMessage(); 
}
```

### Unauthorized exception

This exception is thrown if you don't have the permission to access to the resource. It corresponds to the HTTP code 401.

```php
try {
    $client->getProductApi()->get('top');
} catch (UnauthorizedHttpException $e) {
    // do your stuff with the exception
    $requestBody = $e->getRequest()->getBody();
    $responseBody = $e->getResponse()->getBody();
    $httpCode = $e->getCode(); 
    $errorMessage = $e->getMessage(); 
}
```

::: info
It should not occur as the PHP client automatically authenticates the request for you.
:::

### Unprocessable entity exception

This exception is thrown if the data are not valid. In this exception, an array of errors could be returned.
It returns an empty array if there is no error in the array.

```php
try {
    $client->getProductApi()->create('top');
} catch (UnprocessableEntityHttpException $e) {
    // do your stuff with the exception
    $requestBody = $e->getRequest()->getBody();
    $responseBody = $e->getResponse()->getBody();
    $httpCode = $e->getCode(); 
    $errorMessage = $e->getMessage(); 
    $errors = $e->getResponseErrors();
    foreach ($e->getResponseErrors() as $error) {
        // do your stuff with the error
        echo $error['code'];
        echo $error['message'];
    }
}
```
