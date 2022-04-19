```js [callback:NodeJS]

params // data from your request handling
storage // your own memory system

// Retrieve GET query params from your own framework / http handler
const { code, state } = params;

// Retrive your app's Client ID with your own logic
const pimUrl = storage.get("PIM_URL");
const appState = storage.get("APP_STATE");
const clientId = storage.get("CLIENT_ID");
const clientSecret = storage.get("CLIENT_SECRET");

//Control the security state integrity previously defined, to avoid attacks
if (state !== appState) {
    return response(403, 
        {
            "error": "Forbidden",
            "error_description": "State integrity failed",
        }
    )
}

// Generate a new challenge code
// a sha256 concatenation of a code_identifier and the client_secret
const codeIdentifier = require('crypto').randomBytes(32).toString('hex')
const codeChallenge = require('crypto')
    .createHash('sha256')
    .update(`${codeIdentifier}${clientSecret}`)
    .digest('hex')

// Send the payload to the PIM instance, ask for an API Token
fetch
    .post(`${storage.get('PIM_URL')}/connect/apps/v1/oauth2/token`, {
        code,
        grant_type: 'authorization_code',
        client_id: clientId,
        code_identifier: codeIdentifier,
        code_challenge: codeChallenge,
    })
    .then(({ data }) => {
        // Retrieve the fresh token and store it with your own system
        const { access_token: accessToken } = data   
        storage.set('API_TOKEN', accessToken)
        redirect('/')
    })
    .catch((data) => {
        // handle error
        res.status(400).send(data)
    })

```