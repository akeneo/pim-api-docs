## Embedded view (iframe)
An **Embedded view** Extension allows to open your external content inside the PIM thanks to an iframe.

For more detailed information, you can refer to the [Mozilla Developer Network (MDN) documentation on iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

### Default query parameters
Several parameters are sent by default as SearchParameters in the GET query.

For example, when `url` is `https://customerwebsite.com/iframe/`, the called URL is `https://customerwebsite.com/iframe/?position=pim.product.tab&user[username]=julia`

For all positions, parameters relative to the connected user, the extension position and the tenant are sent:
- `user[id]`
- `user[uuid]`
- `user[username]`
- `user[email]`
- `user[ui_locale]`
- `user[catalog_locale]` except for `pim.product-grid.action-bar`
- `user[catalog_scope]` except for `pim.product-grid.action-bar`
- `position`
- `tenant`

For `pim.product.tab` position, these parameters are sent:
- `product[uuid]`
- `product[identifier]`

For `pim.product-model.tab` and `pim.sub-product-model.header` position, this parameter is sent:
- `product[code]`

For `pim.category.tab` position, this parameter is sent:
- `category[code]`

### Get PIM data from the iframe

For the **product grid action bar position** (`pim.product-grid.action-bar`), passing product or product model information through query parameters is not ideal, as it can result in excessively long URLs. To address this issue, we opted to use the [PostMessage](https://developer.mozilla.org/docs/Web/API/Window/postMessage) to transmit this information instead.

After the iframe is loaded, the PIM send an *event* which is a normalized message [MessageEvent](https://developer.mozilla.org/docs/Web/API/MessageEvent) with a field `data` containing our information. 

This field contains :
- A `data` object with :
  - A `productUuids` field which is an array of string representing the UUIDs of selected products
  - A `productModelCodes` field which is an array of string representing the codes of selected product models and sub models
- A `context` object containing the configured `locale` and `channel`.
- A `user` object containing the `uuid`, `username` and `groups` of the connected user.
- A filter object containg the current filters for product and product models.

Example :
```json
{
  "data": {
    "productUuids": [
      "63139bf3-a7f7-4eaa-ba5e-6ffc8a2f14e9",
      "6fa3bd36-6b5a-4e80-afcd-c224fdf6f3ea",
      "78f38e4a-8d25-41e1-8e09-42a9c246689a"
    ],
    "productModelCodes": []
  },
  "context": {
    "locale": "en_US",
    "channel": "ecommerce"
  },
  "user": {
    "uuid": "4ebad9a4-7728-4d90-9db0-9e5a5c6a4d45",
    "username": "admin",
    "groups": [
      "IT support",
      "All"
    ]
  },
  "filters": {
    "productFilters": {"uuid":[{"operator":"IN","value":["f752ba10-ccb8-4574-b901-20c3a209a73c","761c5d65-391b-41c9-9f7a-255f533d1386","2f2df813-2f02-435f-946b-19f733e5d408"]}]}
    "productModelFilters": {"identifier":[{"operator":"IN","value":["amor","aphrodite","apollon"]}]}
  }
}
```

  #### Requesting Context Data on Demand

  In modern JavaScript frameworks like React, components may initialize after the iframe has already loaded, causing them to miss the initial context data message. To handle this scenario, your
  application can explicitly request the context data by sending a PostMessage with the `type: 'request_context'` property.

  **Example:**
  ```js
  window.parent.postMessage(
    {
      type: 'request_context'
    },
    "*"
  );
```

### Product and product model context change

When the user changes the **PIM context** (such as selecting a different **locale** or **channel**), these changes are automatically propagated to the iframe via PostMessage.

The message contains :
- A `context` object containing the selected `locale` and `channel`.
- A `user` object containing the `uuid`, `username` and `groups` of the connected user.

Example :
```json
{
  "context": {
    "locale": "en_US",
    "channel": "ecommerce"
  },
  "user": {
    "uuid": "c71228d3-695c-4ded-8f3d-b3ed881a1f59",
    "username": "admin",
    "groups": [
      "IT support",
      "All"
    ]
  }
}
```

### Reloading the parent page from the iframe

In some cases, after executing an action within the iframe, you may need to refresh the parent PIM page to reflect the changes made. Due to browser security constraints, direct access to the parent window is restricted.

To address this, we provides a mechanism to trigger a page reload via a PostMessage. To initiate a reload of the parent page, simply send a message from the iframe with the following structure:

```js
    window.parent.postMessage(
      {
        type: 'reload_parent'
      },
      "*"
    );
```

This message will trigger a page reload in the PIM.


### Ensuring security of embedded iframes

To help ensuring the security of iframes we recommand using these two solutions:

* Properly configure [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers to control the sources from which content can be loaded.

::: warning
 Please note that if these headers are misconfigured, iframe functionality may not work as intended.
:::

* Use your extension secret and ```postMessage``` to get and verify the signature of a JW token. This secret will be used to generate a JWT token when the iframe is loaded by the PIM system.

**Get a JSON Web Token (JWT) Token via ```postMessage```**

First, from your iframe, you must request for the JSON Web Token (JWT) by doing a PostMessage with a payload containing ```type: 'request_jwt'```

Example :
```js
    window.parent.postMessage(
      {
        type: 'request_jwt'
      },
      "*"
    );
```

 the PIM will then answer with a postMessage containing the JSON Web Token (JWT). The message will be structured as follows:

```json
{
  "type": "JWT_TOKEN",
  "token": "jwt_value"
}
```

The JSON Web Token (JWT) is generated using SHA256 encryption based on the secret you provided.

**JSON Web Token (JWT) Structure**

The JWT token consists of three main parts: the header, the body (payload), and the signature.

*Header*

* The header typically contains information about the token type and the signing algorithm. In this case, it will look like:

```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

*Payload*

* The payload contains the claims. The JWT token’s will look like this:

```json
{
  "jti": "c1b6b9f1-8486-4f9e-9f96-8d1b40fccb65",
  "iat": 1743410036.116152,
  "exp": 1743413636.116162,
  "userId": "1",
  "userUuid": "557ed4c9-e155-4f4c-802d-4d90bca37d45"
}
```

* ```jti``` The unique identifier for the token.
* ```iat``` The issued at time.
* ```exp``` The expiration time of the token.
* ```userId``` The PIM user legacy identifier (in this case, ```1```).
* ```userUuid``` The PIM user Uuid.

*A signature*

* The signature is used to verify that the token is valid and has not been tampered with. It is generated by combining the encoded header and payload, and then signing them with the secret key. The resulting signature might look like:  
```9WBB7ayP8UnFrOlMrI9NzTj3kxaiXOWJzElyacEKt48```

**Verifying the Signature**

To ensure that the JWT token was issued by Akeneo, you can verify the signature by re-encoding the header and payload and then signing them using the same secret key. This will allow you to confirm that the token is valid and has not been altered.

For more information on how JSON Web Token (JWT) are structured and used, you can refer to the associated [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519).

## Available Positions

See the [Positions documentation](/extensions/positions.html) for visual examples.

::: panel-link URL PlaceHolders [Next](/extensions/url-placeholders.html)
:::
