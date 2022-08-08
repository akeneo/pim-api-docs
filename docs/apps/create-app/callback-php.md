```php [callback:PHP]

// Let's create a `callback.php` file:

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