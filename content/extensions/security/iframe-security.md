# Iframe Security

## Overview

Securing iframe extensions is critical to protect sensitive product data and prevent security vulnerabilities. This guide covers the two primary security mechanisms for iframe extensions:

1. **Content Security Policy (CSP)** - Control what resources your iframe can load
2. **JWT Token Validation** - Verify requests originated from Akeneo PIM

## Content Security Policy (CSP)

Content Security Policy headers control which resources your iframe application can load, preventing many common attacks like XSS and clickjacking.

### Why CSP Matters

Without proper CSP configuration:
- Malicious scripts could be injected
- Data could be exfiltrated to unauthorized domains
- Your application could be embedded in malicious sites

### Configuring CSP Headers

Add CSP headers to responses from your iframe URL:

```http
Content-Security-Policy: default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.example.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' https://*.cloudinary.com data:;
    connect-src 'self' https://api.example.com;
    frame-ancestors 'self' https://*.cloud.akeneo.com https://*.com
```

### CSP Directives Explained

| Directive | Purpose | Example |
|-----------|---------|---------|
| `default-src` | Fallback for other directives | `'self'` - Same origin only |
| `script-src` | JavaScript sources | `'self' https://cdn.example.com` |
| `style-src` | CSS sources | `'self' 'unsafe-inline'` |
| `img-src` | Image sources | `'self' https://*.cloudinary.com data:` |
| `connect-src` | AJAX, WebSocket, EventSource | `'self' https://api.example.com` |
| `frame-ancestors` | Who can embed this iframe | `https://*.cloud.akeneo.com` |
| `font-src` | Font sources | `'self' https://fonts.gstatic.com` |

### Example Configurations

#### Minimal CSP (Strict)

```http
Content-Security-Policy:
    default-src 'self';
    frame-ancestors https://*.cloud.akeneo.com;
```

#### With External CDN

```http
Content-Security-Policy:
    default-src 'self';
    script-src 'self' https://cdn.jsdelivr.net;
    style-src 'self' https://cdn.jsdelivr.net;
    frame-ancestors https://*.cloud.akeneo.com;
```

#### React/Vue Application

```http
Content-Security-Policy:
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    connect-src 'self' https://api.example.com;
    frame-ancestors https://*.cloud.akeneo.com;
```

::: warning
Using `'unsafe-inline'` and `'unsafe-eval'` reduces security. Use nonces or hashes for better security.
:::

### Implementing CSP

#### Node.js/Express

```javascript
const express = require('express');
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.example.com"],
    frameAncestors: ["'self'", "https://*.cloud.akeneo.com"]
  }
}));
```

#### PHP

```php
<?php
header("Content-Security-Policy: " .
    "default-src 'self'; " .
    "script-src 'self' 'unsafe-inline'; " .
    "style-src 'self' 'unsafe-inline'; " .
    "frame-ancestors https://*.cloud.akeneo.com"
);
?>
```

#### Nginx

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; frame-ancestors https://*.cloud.akeneo.com;" always;
```

### Frame-Ancestors Directive

The `frame-ancestors` directive is crucial - it specifies which domains can embed your iframe:

```http
frame-ancestors https://*.cloud.akeneo.com https://staging.akeneo.example.com;
```

This prevents your application from being embedded in malicious sites.

### Testing CSP

1. **Browser DevTools**: Check console for CSP violations
2. **CSP Evaluator**: https://csp-evaluator.withgoogle.com/
3. **Report-Only Mode**: Test without enforcing

```http
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-violation-report
```

::: warning
**Important Configuration Notice**

If CSP headers are misconfigured, your iframe may not load or function correctly. Test thoroughly in a development environment.
:::

## JWT Token Validation

JSON Web Tokens (JWT) allow you to verify that requests to your iframe originated from Akeneo and haven't been tampered with.

### How JWT Works

1. You configure a **secret** (32+ characters) in your extension
2. When loading your iframe, PIM generates a JWT signed with your secret
3. Your iframe requests the JWT via PostMessage
4. You validate the JWT signature using your secret
5. If valid, you trust the request came from Akeneo

### Requesting a JWT Token

From your iframe, send a PostMessage to request the token:

```javascript
window.parent.postMessage(
  {
    type: 'request_jwt'
  },
  "*"
);
```

The PIM responds with:

```json
{
  "type": "JWT_TOKEN",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Receiving the JWT Token

```javascript
window.addEventListener('message', (event) => {
  // Verify origin
  if (event.origin !== 'https://your-pim.cloud.akeneo.com') {
    return;
  }

  if (event.data.type === 'JWT_TOKEN') {
    const token = event.data.token;
    validateToken(token);
  }
});
```

### JWT Token Structure

The JWT contains three parts (header, payload, signature):

#### Header

```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

#### Payload (Claims)

```json
{
  "jti": "c1b6b9f1-8486-4f9e-9f96-8d1b40fccb65",
  "iat": 1743410036.116152,
  "exp": 1743413636.116162,
  "userId": "1",
  "userUuid": "557ed4c9-e155-4f4c-802d-4d90bca37d45"
}
```

**Claims explained:**
- `jti` - Unique token identifier
- `iat` - Issued at timestamp
- `exp` - Expiration timestamp
- `userId` - PIM user legacy ID
- `userUuid` - PIM user UUID

#### Signature

The signature is created by:
1. Encoding the header and payload in base64
2. Signing with your secret using HS256 (SHA-256)

Example signature: `9WBB7ayP8UnFrOlMrI9NzTj3kxaiXOWJzElyacEKt48`

### Validating JWT Tokens

#### Node.js Example

```javascript
const jwt = require('jsonwebtoken');

function validateJWT(token, secret) {
  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ['HS256']
    });

    // Token is valid
    console.log('User ID:', decoded.userId);
    console.log('User UUID:', decoded.userUuid);
    console.log('Issued at:', new Date(decoded.iat * 1000));
    console.log('Expires:', new Date(decoded.exp * 1000));

    return decoded;
  } catch (error) {
    console.error('JWT validation failed:', error.message);
    return null;
  }
}

// Usage
const token = receivedToken; // from PostMessage
const secret = process.env.EXTENSION_SECRET;

const payload = validateJWT(token, secret);
if (payload) {
  // Token is valid, trust the request
  loadUserData(payload.userUuid);
} else {
  // Invalid token, reject the request
  showError('Authentication failed');
}
```

#### Python Example

```python
import jwt
from datetime import datetime

def validate_jwt(token, secret):
    try:
        payload = jwt.decode(
            token,
            secret,
            algorithms=['HS256']
        )

        # Token is valid
        print(f"User ID: {payload['userId']}")
        print(f"User UUID: {payload['userUuid']}")
        print(f"Issued at: {datetime.fromtimestamp(payload['iat'])}")
        print(f"Expires: {datetime.fromtimestamp(payload['exp'])}")

        return payload

    except jwt.ExpiredSignatureError:
        print("Token has expired")
        return None
    except jwt.InvalidTokenError as e:
        print(f"Invalid token: {e}")
        return None

# Usage
token = received_token  # from PostMessage
secret = os.environ['EXTENSION_SECRET']

payload = validate_jwt(token, secret)
if payload:
    # Token is valid
    load_user_data(payload['userUuid'])
else:
    # Invalid token
    show_error("Authentication failed")
```

#### PHP Example

```php
<?php
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

function validateJWT($token, $secret) {
    try {
        $decoded = JWT::decode($token, new Key($secret, 'HS256'));

        // Token is valid
        echo "User ID: " . $decoded->userId . "\n";
        echo "User UUID: " . $decoded->userUuid . "\n";

        return $decoded;

    } catch (Exception $e) {
        echo "JWT validation failed: " . $e->getMessage() . "\n";
        return null;
    }
}

// Usage
$token = $_POST['token']; // from client
$secret = getenv('EXTENSION_SECRET');

$payload = validateJWT($token, $secret);
if ($payload) {
    // Token is valid
    loadUserData($payload->userUuid);
} else {
    // Invalid token
    http_response_code(401);
    echo json_encode(['error' => 'Authentication failed']);
}
?>
```

### Complete JWT Flow Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Secure Iframe Extension</title>
</head>
<body>
    <div id="app">
        <p>Authenticating...</p>
    </div>

    <script>
        let jwtToken = null;

        // Request JWT on load
        function requestJWT() {
            window.parent.postMessage({ type: 'request_jwt' }, '*');
        }

        // Listen for JWT response
        window.addEventListener('message', async (event) => {
            // Verify origin
            if (event.origin !== 'https://your-pim.cloud.akeneo.com') {
                return;
            }

            if (event.data.type === 'JWT_TOKEN') {
                jwtToken = event.data.token;

                // Validate on server
                const isValid = await validateOnServer(jwtToken);

                if (isValid) {
                    loadApplication();
                } else {
                    showError('Authentication failed');
                }
            }
        });

        async function validateOnServer(token) {
            try {
                const response = await fetch('/api/validate-jwt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                });

                return response.ok;
            } catch (error) {
                console.error('Validation failed:', error);
                return false;
            }
        }

        function loadApplication() {
            document.getElementById('app').innerHTML = `
                <h1>Secure Application</h1>
                <p>JWT validated successfully!</p>
            `;
        }

        function showError(message) {
            document.getElementById('app').innerHTML = `
                <p style="color: red;">${message}</p>
            `;
        }

        // Start authentication
        requestJWT();
    </script>
</body>
</html>
```

### Server-Side Validation Endpoint

```javascript
// Express.js example
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

app.post('/api/validate-jwt', (req, res) => {
  const { token } = req.body;
  const secret = process.env.EXTENSION_SECRET;

  try {
    const payload = jwt.verify(token, secret, {
      algorithms: ['HS256']
    });

    // Token is valid
    res.json({
      valid: true,
      user: {
        id: payload.userId,
        uuid: payload.userUuid
      }
    });
  } catch (error) {
    // Token is invalid
    res.status(401).json({
      valid: false,
      error: error.message
    });
  }
});
```

## Combining CSP and JWT

For maximum security, use both mechanisms together:

```javascript
// 1. Configure CSP headers
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    frameAncestors: ["https://*.cloud.akeneo.com"]
  }
}));

// 2. Validate JWT tokens
app.post('/api/data', authenticateJWT, (req, res) => {
  // authenticateJWT middleware validates token
  // If we reach here, token is valid
  const userId = req.user.uuid;
  res.json({ data: getUserData(userId) });
});

function authenticateJWT(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, process.env.EXTENSION_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
}
```

## Best Practices

### 1. Strong Secrets

Generate secure secrets (32+ characters):

```bash
# Generate a random secret
openssl rand -base64 32
```

### 2. Rotate Secrets Regularly

Change secrets periodically:
- Every 90 days for production
- After security incidents
- When team members leave

### 3. Validate Token Expiration

Always check token expiration:

```javascript
if (Date.now() / 1000 > payload.exp) {
  throw new Error('Token expired');
}
```

### 4. Store Secrets Securely

Never commit secrets to version control:

```javascript
// ✅ Good - use environment variables
const secret = process.env.EXTENSION_SECRET;

// ❌ Bad - hardcoded secret
const secret = 'my-secret-key-12345';
```

### 5. Validate Origin

Always verify PostMessage origin:

```javascript
window.addEventListener('message', (event) => {
  const allowedOrigins = [
    'https://prod-pim.cloud.akeneo.com',
    'https://staging-pim.cloud.akeneo.com'
  ];

  if (!allowedOrigins.includes(event.origin)) {
    console.warn('Rejected message from:', event.origin);
    return;
  }

  // Process message
});
```

### 6. Implement HTTPS Only

Ensure all communication uses HTTPS:
- Configure SSL certificates properly
- Redirect HTTP to HTTPS
- Use HSTS headers

```javascript
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));
```

## Troubleshooting

### JWT Token Not Received

**Symptoms:** No JWT_TOKEN message received

**Causes:**
- PostMessage not sent correctly
- Event listener not registered
- Origin mismatch

**Solution:**
```javascript
// Ensure listener is registered before sending request
window.addEventListener('message', handleMessage);
window.parent.postMessage({ type: 'request_jwt' }, '*');
```

### Invalid Signature Error

**Symptoms:** JWT validation fails

**Causes:**
- Wrong secret on server
- Secret contains extra whitespace
- Token corrupted during transmission

**Solution:**
- Verify secret matches exactly (no extra spaces)
- Log the secret length (should be 32+)
- Check for transmission errors

### CSP Violations

**Symptoms:** Resources blocked, console errors

**Causes:**
- CSP too restrictive
- Missing directives
- Wrong domain in whitelist

**Solution:**
- Check browser console for violations
- Use CSP report-only mode to test
- Add necessary domains to CSP

## Security Checklist

- [ ] Configure Content Security Policy headers
- [ ] Include appropriate `frame-ancestors` directive
- [ ] Generate strong secret (32+ characters)
- [ ] Configure secret in extension
- [ ] Implement JWT validation on server
- [ ] Validate token expiration
- [ ] Verify PostMessage origins
- [ ] Store secrets in environment variables
- [ ] Use HTTPS only
- [ ] Test with invalid tokens
- [ ] Document security procedures
- [ ] Plan for secret rotation

## Learn More

- [Security Overview](/extensions/security/overview.html) - General security principles
- [Credentials](/extensions/security/credentials.html) - Authentication methods
- [Iframe Extensions](/extensions/types/iframe.html) - Basic iframe setup
- [Iframe Communication](/extensions/integration/iframe-communication.html) - PostMessage patterns
- [JWT.io](https://jwt.io/) - JWT debugger and documentation
- [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519) - JWT specification

::: panel-link Credentials [Next](/extensions/security/credentials.html)
:::
