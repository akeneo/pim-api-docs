## Iframe
An **iframe** UI extension allows to open your external content inside the PIM thanks to an iframe.

An iframe (inline frame) is an HTML element that allows you to embed another HTML document within the current document. It is commonly used to display content from another source, such as a webpage, video, or interactive content, without leaving the current page.

For more detailed information, you can refer to the [Mozilla Developer Network (MDN) documentation on iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

To configure an `iframe` UI extension, mandatory fields are `name`, `position`, `type`, and `configuration`. Inside `configuration`, mandatory options are `default_label`, `secret` and `url`.

::: warning
**Important security notice**

For sensitive data, we recommend implementing [security measures](#ensuring-security-of-embedded-iframes) to protect your information.
:::

### Default query parameters
To help identify the  **iframe** caller (insecure) and context, several parameters are sent by default as SearchParameters in the GET query.

For example, when `url` is `https://customerwebsite.com/iframe/`, the called URL is `https://customerwebite.com/iframe/?position=pim.product.tab&user[username]=julia`

For all positions, parameters relative to the connected user, the extension position and the tenant are sent:
- `user[uuid]`
- `user[id]`
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
  }
}
```

For a *classical* project with HTML and JavaScript code, you can include this kind of code to catch those events :

```html
    <script>
        window.addEventListener('message', (event) => {
            console.log(event)            
        });
    </script>
```

For more *modern* technologies like ReactJS, the iframe could be loaded before components. To solve this problem we added the possibility to ask for the data. To do this, just send a PostMessage with an object containing the property `type: 'request_context'`.

Example :
```js
    window.parent.postMessage(
      {
        type: 'request_context'
      },
      "*"
    );
```
After receiving this *event*, the PIM will send a PostMessage *event*, similar to the one sent after the iframe loading.

### Product and product model context change

The **PIM context** is propagated within the iframe when it changes using **postmessage**. This only applies to the product and product model positions: **pim.product-model.header**, **pim.sub-product-model.header** and **pim.product.header**.

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

**Get a JW Token via ```postMessage```**

First, from your iframe, you must request for the JWT by doing a PostMessage with a payload containing ```type: 'request_jwt'```

Example :
```js
    window.parent.postMessage(
      {
        type: 'request_jwt'
      },
      "*"
    );
```

 the PIM will then answer with a postMessage containing the JWT token. The message will be structured as follows:

```json
{
  "type": "JWT_TOKEN",
  "token": "jwt_value"
}
```

* The JWT token in the token field is generated using SHA256 encryption based on the secret you provided.

For more information on how JWT tokens are structured and used, you can refer to the associated [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519).

**JWT Token Structure**

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


## Available Positions

Iframe extensions can be placed in:

| Position | Location | Context | Communication |
|----------|----------|---------|---------------|
| `pim.product.tab` | Product edit page tab | Simple products and variants | Yes |
| `pim.product-model.tab` | Product model tab | Root product models | Yes |
| `pim.sub-product-model.tab` | Sub-product model tab | Sub-product models | Yes |
| `pim.category.tab` | Category edit page tab | Categories | Yes |
| `pim.product-grid.action-bar` | Product grid action bar | Multiple products | Yes |
| `pim.activity.navigation.tab` | Activity navigation tab | Global context | No |
| `pim.product.panel` | Product right panel | Simple products and variants | Yes |
| `pim.product-model.panel` | Product model right panel | Root product models | Yes |
| `pim.sub-product-model.panel` | Sub-product model right panel | Sub-product models | Yes |

## Limitations

- **Same-origin policy**: Your iframe has limited access to parent window
- **Size constraints**: Iframe dimensions are controlled by the PIM
- **Performance**: Each iframe loads a complete web page
- **Browser compatibility**: Some browsers have stricter iframe policies

## When to Use Another Type

Consider these alternatives if iframe extensions don't meet your needs:

- **Simple link needed?** → Use [Link Extensions](/extensions/types/link.html)
- **Need background processing?** → Use [Action Extensions](/extensions/types/action.html)
- **Just displaying data?** → Use [Data Component Extensions](/extensions/types/data-component.html)
- **Need full SDK access?** → Use [Custom Component Extensions](/extensions/types/custom-component.html)

## Learn More

- [Iframe Communication](/extensions/integration/iframe-communication.html) - PostMessage patterns
- [Iframe Security](/extensions/security/iframe-security.html) - JWT and CSP
- [Positions](/extensions/positions.html) - Where to place your extension
- [API Reference](/extensions/api.html) - Programmatic management

::: panel-link Action Extensions [Next](/extensions/types/action.html)
:::