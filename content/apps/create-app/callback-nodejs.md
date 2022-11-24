```js [callback:NodeJS]

import express from 'express';
import crypto from 'crypto';
import fetch from 'node-fetch'; // https://www.npmjs.com/package/node-fetch

const app = express();

app.get('/callback', async (req, res, next) => {
  try {
    const appClientSecret = "CLIENT_SECRET";
    const appClientId = "CLIENT_ID";

    const session = req.session;

    const pimUrl = session.pim_url;
    const state = req.query.state;
    const authorizationCode = req.query.code;

    if (!pimUrl) {
      throw new Error(
        "Can't retrieve PIM url, please restart the authorization process."
      );
    }

    // We check if the received state is the same as in the session, for security.
    if (!state || state != session.state) {
      throw new Error("Invalid state");
    }

    if (!authorizationCode) {
      throw new Error("Missing authorization code");
    }

    // Generate code for token request
    const codeidentifier = crypto.randomBytes(64).toString("hex");
    const codeChallenge = crypto
      .createHash("sha256")
      .update(codeidentifier + appClientSecret)
      .digest("hex");

    // Build form data to post
    const accessTokenRequestPayload = new URLSearchParams({
      grant_type: "authorization_code",
      code: authorizationCode,
      client_id: appClientId,
      code_identifier: codeidentifier,
      code_challenge: codeChallenge,
    });

    // Make an authenticated call to the API
    const accessTokenUrl = pimUrl + "/connect/apps/v1/oauth2/token";
    const response = await fetch(accessTokenUrl, {
      method: "post",
      body: accessTokenRequestPayload,
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
    });

    const result = await response.json();

    const accessToken = result.access_token;

    console.log(accessToken);
  } catch (err) {
    next(err);
  }
}

```