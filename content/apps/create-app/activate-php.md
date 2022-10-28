```php [activate:PHP]

// Let's create an `activate.php` file

$oauthClientId = '<CLIENT_ID>';
$getAuthorizationUrl = '%s/connect/apps/v1/authorize?%s';
$scopes = ['read_products', 'write_products', 'delete_products'];

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
    'client_id' => $oauthClientId,
    'scope' => implode(' ', $scopes),
    'state' => $state,
]);

// Build the url for the Authorization Request using the PIM URL
$url = sprintf($getAuthorizationUrl, $pimUrl, $authorizeUrlParams);
header('Location: '.$url);
exit;
```