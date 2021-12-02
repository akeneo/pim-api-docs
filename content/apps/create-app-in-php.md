# Create an App in PHP

In this tutorial, we will provide a guide, with examples in PHP, on how to implement the required parts of your App
for the activation process based on OAuth 2.0 with Authorization Code.
At the end of this tutorial, your App will receive an Access Token and will be able to call the REST API of a PIM.

::: warning
Examples in this tutorial use PHP without any framework or library and, consequently, don't follow
all the recommended best practices. We **strongly** encourage you to adapt those examples with the framework or
library of your choice.
:::

## Prerequisites

You must have valid [OAuth 2.0 client credentials](/apps/using-oauth2.html#credentials).

## Activation URL

First, your application must expose an activation URL.  

In our example, we won't do additional steps (like authentification), so we will launch the Authorization Request
immediately in this Activation URL.

Let's create an `activate.php` file:
```php

const OAUTH_CLIENT_ID = '<CLIENT_ID>';
const OAUTH_SCOPES = 'read_products write_products';

session_start();

$pimUrl = $_GET['pim_url'];
if (empty($pimUrl)) {
    exit('Missing PIM URL in the query');
}

// create a random state for preventing cross-site request forgery
$state = bin2hex(random_bytes(10));

// Store in the user session the state and the PIM URL
$_SESSION['oauth2_state'] = $state;
$_SESSION['pim_url'] = $pimUrl;

// Build the parameters for the Authorization Request
// https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
$authorizeUrlParams = http_build_query([
    'response_type' => 'code',
    'client_id' => OAUTH_CLIENT_ID,
    'scope' => OAUTH_SCOPES,
    'state' => $state,
]);

// Build the url for the Authorization Request using the PIM URL
$authorizeUrl = $pimUrl . '/connect/apps/v1/authorize?' . $authorizeUrlParams;

// Redirect the user to the Authorization URL
header('Location: ' . $authorizeUrl);
```

## Callback URL

Then, your application must expose a callback URL.

Let's create a `callback.php` file:
```php

const OAUTH_CLIENT_ID = '<CLIENT_ID>';
const OAUTH_CLIENT_SECRET = '<CLIENT_SECRET>';

session_start();

// We check if the received state is the same as in the session, for security.
$sessionState = $_SESSION['oauth2_state'] ?? '';
$state = $_GET['state'] ?? '';
if (empty($state) || $state !== $sessionState) {
    exit('Invalid state');
}

$authorizationCode = $_GET['code'] ?? '';
if (empty($authorizationCode)) {
    exit('Missing authorization code');
}

$pimUrl = $_SESSION['pim_url'] ?? '';
if (empty($pimUrl)) {
    exit('No PIM url in session');
}

$codeIdentifier = bin2hex(random_bytes(30));
$codeChallenge = hash('sha256', $codeIdentifier . OAUTH_CLIENT_SECRET);

$accessTokenUrl = $pimUrl . '/connect/apps/v1/oauth2/token';
$accessTokenRequestPayload = [
    'client_id' => OAUTH_CLIENT_ID,
    'code_identifier' => $codeIdentifier,
    'code_challenge' => $codeChallenge,
    'code' => $authorizationCode,
    'grant_type' => 'authorization_code',
];

// Do a POST request on the token endpoint
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $accessTokenUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $accessTokenRequestPayload);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = json_decode(curl_exec($ch), true);

echo $response['access_token'];
```

::: info
The Code Challenge is documented [here](/apps/using-oauth2.html#whats-the-code-challenge).
:::

And that's it!  
At the end of this process, you receive the following response with an `access_token`:

```json

{
  "access_token": "Y2YyYjM1ZjMyMmZlZmE5Yzg0OTNiYjRjZTJjNjk0ZTUxYTE0NWI5Zm",
  "token_type": "bearer",
  "scope": "read_products write_products"
}
```

You can use this token to call the Akeneo PIM REST API.
