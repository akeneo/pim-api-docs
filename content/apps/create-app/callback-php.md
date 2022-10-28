```php [callback:PHP]

// Let's create a `callback.php` file

require_once __DIR__ . '/../vendor/autoload.php';

$oauthClientId = '<CLIENT_ID>';
$oauthClientSecret = '<CLIENT_SECRET>';
$generateTokenUrl = '/connect/apps/v1/oauth2/token';

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

// Generate code for token request
$codeIdentifier = bin2hex(random_bytes(30));
$codeChallenge = hash('sha256', $codeIdentifier . $oauthClientSecret);

// Build form data to post
$accessTokenRequestPayload = [
    'client_id' => $oauthClientId,
    'code_identifier' => $codeIdentifier,
    'code_challenge' => $codeChallenge,
    'code' => $authorizationCode,
    'grant_type' => 'authorization_code',
];

// If you haven't set your client yet, please install Guzzle by following the official documentation:
// https://docs.guzzlephp.org/en/stable/overview.html#installation
$client = new GuzzleHttp\Client(['base_uri' => $pimUrl]);

// Make an authenticated call to the API
$accessTokenUrl = $pimUrl . $generateTokenUrl;
$response = $client->post($accessTokenUrl, ['form_params' => $accessTokenRequestPayload]);

// Convert json response to array
$contents = json_decode($response->getBody()->getContents(), true);

var_export($contents);
```