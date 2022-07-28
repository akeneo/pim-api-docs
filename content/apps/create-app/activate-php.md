```php [activate:PHP]

// Let's create an `activate.php` file

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