# Create an App

*You want to create a new App.*

In this tutorial, we will provide a step by step guide, with examples in PHP, on how to implement the parts of your App 
required for the activation process based on OAuth2 with Authorization Code.
At the end of this tutorial, your App will receive an Access Token and will be able to call the REST API of a PIM.

::: warning
Examples in this tutorial are using PHP without any framework or library, and are consequently not following
all the recommended best practices. We are **strongly** encouraging you to adapt those examples with the framework or 
library of your choice.
:::

## Prerequisites

You must have valid OAuth credentials: `client_id` and `client_secret`.  
As of today, you can ask for them by registering a new App on the [Akeneo Marketplace](https://marketplace.akeneo.com/node/add/extension).

## Activation URL

First, your application must expose an activation URL.  
When the PIM user want to activate your App, it will be redirected to this activation url with the PIM URL in the query.  
example: `https://my-app.example.com/activate.php?pim_url=https%3A%2F%2Fmy-pim.cloud.akeneo.com`  

In our example, we don't need custom steps (like authentification), so we will launch the authorization request
immediately.

::: info
You can consult the list of [availables scopes](https://help.akeneo.com).
::::

Let's create an `activate.php` file:
```php

const OAUTH_CLIENT_ID = '<CLIENT_ID>';
const OAUTH_SCOPES = '<SCOPES>'; // eg: read_categories read_products

session_start();

$pimUrl = $_GET['pim_url'];
if (empty($pimUrl)) {
    exit('Missing PIM URL in the query');
}

$scheme = $_SERVER['HTTP_X_FORWARDED_PROTO'] ?: $_SERVER['REQUEST_SCHEME'];
$host = $_SERVER['HTTP_HOST'];
$redirectUri = sprintf('%s://%s/callback.php', $scheme, $host);
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
    'redirect_uri' => $redirectUri,
    'scope' => OAUTH_SCOPES,
    'state' => $state,
]);

// Build the url for the Authorization Request using the PIM URL
$authorizeUrl = sprintf('%s/connect/apps/v1/authorize?%s', $pimUrl, $authorizeUrlParams);

// Redirect the user to the Authorization URL
header('Location: ' . $authorizeUrl);
```

## Callback URL

Then, your application must expose a callback URL.
Once you've redirected the user to the Authorization URL, the user will have the opportunity to accept the requested
scopes and confirm your access.  
Afterwards, the PIM will redirect him to your callback URL with the parameters `code` and `state`.
example: `https://my-app.example.com/callback.php?code=abc&state=xyz`

Let's create an `callback.php` file:
```php

const OAUTH_CLIENT_ID = '<CLIENT_ID>';
const OAUTH_CLIENT_SECRET = '<CLIENT_SECRET>';

session_start();

// If the authorization failed, the callback will be called with the error
// https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2.1
$error = $_GET['error'] ?? '';
if (!empty($error)) {
    exit('Authorization error: ' . $error);
}

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

// Instead of sending your client_secret to the PIM, you must send a code_challenge.
// This code_challenge will protect you by signing your request without sharing your secret
// to an unknown PIM.
// The PIM will check the validity of your code_challenge with the Akeneo Authorization Server.
$codeIdentifier = bin2hex(random_bytes(30));
$codeChallenge = hash('sha256', $codeIdentifier . OAUTH_CLIENT_SECRET);

$accessTokenUrl = sprintf('%s/connect/apps/v1/oauth2/token', $pimUrl);
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

And that's all. At the end of this process, you have now received the following response with an `access_token`:
```json
{
  "access_token": "Y2YyYjM1ZjMyMmZlZmE5Yzg0OTNiYjRjZTJjNjk0ZTUxYTE0NWI5Zm",
  "token_type": "bearer"
}
```

You can use this token to call the PIM REST API.
