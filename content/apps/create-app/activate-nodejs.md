```js [activate:NodeJS]

import express from 'express';
import crypto from 'crypto';

const app = express();

app.get('/activate', (req, res, next) => {
  try {
    const clientId = "AKENEO_CLIENT_ID";
    const scopes = [
      "read_products",
      "read_catalog_structure",
      "read_channel_settings",
      "read_channel_localization",
      "read_attribute_options",
      "read_catalogs",
      "write_catalogs",
      "delete_catalogs",
    ];
    const session = req.session;

    const pimUrl = req.query.pim_url;
    if (!pimUrl) {
      throw new Error(
        "Can't retrieve PIM url, please restart the authorization process."
      );
    }

    // Create a random state for preventing cross-site request forgery
    const state = crypto.randomBytes(64).toString("hex");

    // Store in the user session the state and the PIM URL
    session.state = state;
    session.pim_url = pimUrl;

    // Build the parameters for the Authorization Request
    // https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
    const params = new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scopes.join(" "),
      state: state,
    });

    // Build the url for the Authorization Request using the PIM URL
    const authorizeUrl =
      pimUrl + "/connect/apps/v1/authorize?" + params.toString();

    res.redirect(authorizeUrl);
  } catch (err) {
    next(err);
  }
});

```