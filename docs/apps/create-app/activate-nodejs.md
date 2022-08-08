```js [activate:NodeJS]

params // data from your request handling
storage // your own memory system

// Retrieve GET query params from your own framework / http handler
const { pim_url: pimUrl } = params;

// Retrieve your app's Client ID with your own system
const clientId = storage.get("CLIENT_ID");

// Set the access scopes, take care of the 254 chars max !
const scopes = 'read_products write_products'; 

// The activate URL should have the pim_url param
if (!pimUrl) {
    // Return a Bad request response via your own framework / http server
    return response(502, { message: "Bad request" });
}

// Store the PIM url value with your own system
storage.set("PIM_URL", pimUrl);

// Set a new security state secret and store the value with your own system
const state = require('crypto').randomBytes(32).toString("hex");
storage.set("APP_STATE", state);

// Construct the PIM authorization url, it will be called on "connect" / "open" button
const redirect_url = `${pimUrl}/connect/apps/v1/authorize` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&scope=${scopes}` +
    `&state=${state}`

// Set the redirection response with your own framework / http server
return redirect(redirect_url);

```