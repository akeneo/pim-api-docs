# UI extensions
The UI extension feature enables you to extend your PIM by integrating custom views and actions from external systems. This framework provides the flexibility to modify and adapt your PIM experience to meet specific business requirements.
By leveraging this functionality, you can integrate custom solutions while maintaining the reliability and ease the use of our SaaS platform, offering a balance between flexibility and stability.

The extension framework is designed to help you customize the standard behavior of your PIM system by integrating with externally hosted solutions. This documentation provides an overview of the framework's capabilities and the various customization options available, enabling you to extend and tailor your PIM to meet your specific business needs.

## Getting Started
This guide provides a step-by-step walkthrough for setting up and managing UI extensions.

### Prerequisites
Before proceeding, ensure that you have an active <a href="https://api.akeneo.com/apps/overview.html#whats-an-akeneo-app" target="_blank">App</a> (it can be a <a href="https://api.akeneo.com/apps/create-custom-app.html" target="_blank">Custom App</a> or an active <a href="https://api.akeneo.com/getting-started/connect-the-pim-4x/step-1.html#you-said-connection" target="_blank">connection</a>) to an Akeneo PIM.

To learn how to create a Connection, see the <a href="https://api-dev.akeneo.com/documentation/authentication.html#client-idsecret-generation" target="_blank">Authentication Guide</a>. If you're setting up a Custom App, follow the steps in <a href="https://api-dev.akeneo.com/tutorials/how-to-get-your-app-token.html" target="_blank">this tutorial</a> to obtain an App token.

### Authentication and authorization

#### Authentication
Having a valid Akeneo PIM API token provided by either a Connection or an App to be authenticated to use the UI extension API endpoints.

#### Authorization
To manage your extension, ensure that your Connection or App has the necessary permissions.
1. For Connections: The user associated with the Connection must have the permission **UI extensions > Manage your extensions using the API** enabled.
2. For Apps: You need to request the scope **manage_extensions**.

::: info
A UI extension is owned by a user, meaning that a Connection can only manage UI extensions created by itself or by Connections associated with the same user. Similarly, an App can only manage its own UI extensions.
:::

Granting these permissions before setup helps prevent unnecessary errors.

### Using Postman
The quickest way to get started with UI extensions is by using our Postman collection.

#### 1. Import the Postman Collection
1. Download our <a href="https://api.akeneo.com/files/Akeneo%20PIM%20API.postman_collection.json" target="_blank">Postman collection</a>
2. Download our <a href="https://api.akeneo.com/files/akeneo-PIM-API-environment-4x.postman_environment.json" target="_blank">Postman environment variable template</a>
3. Import those files into Postman (follow <a href="https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/" target="_blank">this guide</a> if you're not familiar with how Postman collections work)

#### 2. Fill the environment variables
The collection includes a pre-script for handling PIM Connection authentication.

Before making API requests, ensure your environment variables are filled with your Akeneo PIM Connection credentials: a valid `pim_access_token` will be generated automatically on your first request. If you don't receive a token, or you don't see it within the environment variable list, double-check your credentials.

[![postman-fill-env.png](../img/extensions/ui-extensions/postman-fill-env.png)](../img/extensions/ui-extensions/postman-fill-env.png)


#### 3. Create a UI extension
1. Select the Postman environment you've just created
2. Click on the `Add an extension` POST request
3. Customize the data to send as you want before click on `Send`
4. Copy the newly created extension UUID. It will be asked to modify or delete the UI extension.

[![postman-add-extension.png](../img/extensions/ui-extensions/postman-add-extension.png)](../img/extensions/ui-extensions/postman-add-extension.png)

#### 4. Update a UI extension
1. Make sure that the right environment is selected
2. Click on the `Update an extension` POST request
3. Fill the `ui_extension_uuid` parameter with the UUID of the concerned UI extension
4. Customize the data according to your needs before clicking on `Send`

[![postman-update-extension-1.png](../img/extensions/ui-extensions/postman-update-extension-1.png)](../img/extensions/ui-extensions/postman-update-extension-1.png)
[![postman-update-extension-2.png](../img/extensions/ui-extensions/postman-update-extension-2.png)](../img/extensions/ui-extensions/postman-update-extension-2.png)


#### 5. Delete a UI extension
1. Make sure that the right environment is selected
2. Click on the `Delete an extension` POST request
3. Fill the `ui_extension_uuid` parameter with the UUID of the concerned UI extension
4. Click on `Send`

[![postman-delete-extension.png](../img/extensions/ui-extensions/postman-delete-extension.png)](../img/extensions/ui-extensions/postman-delete-extension.png)

### Using Curl

#### 1. Retrieve your credentials from your targeted PIM

::: info
🛠 For every call to the API, you need `X-PIM-TOKEN` & `X-PIM-CLIENT-ID`.

In this example, we will create a new `connection` in the PIM and use it to generate an `API token`.
:::

**1. Create a Connection in Akeneo PIM:**
- Navigate to **Connect** > **Connection settings** > **Create**.
- Fill out the form to create the Connection.
- Note the generated `client ID`, `secret`, `username`, and `password`.

**2. Set your environment variables:**
- Define the client ID, secret, username, password, and Akeneo host URL as environment variables:

   ```bash [snippet:Shell]
        export CLIENT_ID="your-client-id"
    export CLIENT_SECRET="your-client-secret"
    export API_USERNAME="your-API-username"
    export API_PASSWORD="your-API-password"
    export TARGET_PIM_URL="https://your-pim.cloud.akeneo.com"
   ```
Replace the placeholders with your actual credentials and host URL.

**3. Encode your credentials:**
- Encode the client ID and secret in base64 format, separated by a colon `:`:
   ```bash [snippet:Shell]
        export BASE64_ENCODED_CLIENTID_AND_SECRET=$(echo -n "$CLIENT_ID:$CLIENT_SECRET" | base64 -w 0)
   // For Mac OS user remove the -w 0 option
   ```

**4.  Your API token:**
- Make the API call to retrieve your `API token` using the environment variables:
   ```bash [snippet:Shell]
        curl --request POST "$TARGET_PIM_URL/api/oauth/v1/token" \
    --header "Content-Type: application/json" \
    --header "Authorization: Basic $BASE64_ENCODED_CLIENTID_AND_SECRET" \
    --data-raw '{
    "grant_type": "password",
    "username": "'"$API_USERNAME"'",
    "password": "'"$API_PASSWORD"'"
    }'
   ```
After retrieving the API token, store the `access_token` from the response in an environment variable:
   ```bash [snippet:Shell]
        export PIM_API_TOKEN="..."
    // Replace with the actual token from the response
   ```

::: info
Note that the token has a lifespan of one hour.
:::

::: info
🛠 Custom Apps are also supported. To use one, add a variable `app_access_token` with your API token.
:::

#### 2. Create a UI extension
You can create a UI extension once you have a valid PIM API token.

```bash [snippet:Shell]
    curl --request POST "$TARGET_PIM_URL/api/rest/v1/ui-extensions" \
--header "Authorization: Bearer $PIM_API_TOKEN" \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "my_awesome_extension",
    "version": "V1.02",
    "type": "link",
    "position": "pim.product.header",
    "configuration": {
        "url": "https://myapp.com/product",
        "default_label": "My awesome extension",
        "labels": {
          "en_US": "My awesome extension"
        }
    }
}'
```

#### 3. Update a UI extension
To update a UI extension, you must have a valid PIM API token and the UUID of the extension you want to update.

```bash [snippet:Shell]
    curl --request PATCH "$TARGET_PIM_URL/api/rest/v1/ui-extensions/$EXTENSION_UUID" \
--header "Authorization: Bearer $PIM_API_TOKEN" \
--header 'Content-Type: application/json' \
--data-raw '{
    "version": "V1.03",
    "type": "iframe",
    "position": "pim.product.tab"
}'
```

#### 4. Delete a UI extension
To delete a UI extension, you must have a valid PIM API token and the UUID of the extension you want to delete.

```bash [snippet:Shell]
    curl --request DELETE "$TARGET_PIM_URL/api/rest/v1/ui-extensions/$EXTENSION_UUID" \
--header "Authorization: Bearer $PIM_API_TOKEN"
```

## Concepts

### Type

UI extensions are categorized by type, which determines their capabilities. Select the type that best suits your requirements:
+ action
+ iframe
+ link

#### Link
A **link** UI extension is crafted to open your external content in a new tab.

#### Iframe
An **iframe** UI extension allows to open your external content inside the PIM thanks to an iframe.

An iframe (inline frame) is an HTML element that allows you to embed another HTML document within the current document. It is commonly used to display content from another source, such as a webpage, video, or interactive content, without leaving the current page.

For more detailed information, you can refer to the [Mozilla Developer Network (MDN) documentation on iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

To configure an `iframe` UI extension, mandatory fields are `name`, `position`, `type`, and `configuration`. Inside `configuration`, mandatory options are `default_label`, `secret` and `url`.

**Ensuring security of embedded iframes**

* Properly configure [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers to control the sources from which content can be loaded.

::: warning
 Please note that if these headers are misconfigured, iframe functionality may not work as intended.
:::

* Add a secret to your extension. This secret will be used to generate a JWT token when the iframe is loaded by the PIM system.

**Receiving the JWT Token via ```postMessage```**

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
  "userId": "1"
}
```

* ```jti``` The unique identifier for the token.
* ```iat``` The issued at time.
* ```exp``` The expiration time of the token.
* ```userId``` The PIM user identifier (in this case, ```1```).

*A signature*

* The signature is used to verify that the token is valid and has not been tampered with. It is generated by combining the encoded header and payload, and then signing them with the secret key. The resulting signature might look like:  
```9WBB7ayP8UnFrOlMrI9NzTj3kxaiXOWJzElyacEKt48```

**Verifying the Signature**

To ensure that the JWT token was issued by Akeneo, you can verify the signature by re-encoding the header and payload and then signing them using the same secret key. This will allow you to confirm that the token is valid and has not been altered.


**PostMessage**

To be able to communicate the products or product models selection (from position `pim.product-grid.action-bar`) to the iframe, we use the [PostMessage](https://developer.mozilla.org/docs/Web/API/Window/postMessage) protocol.

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


#### Action
An **action** UI extension is designed to perform external tasks in the background. Please note the following key points regarding its functionality:

+ **Single execution**: An action cannot be executed multiple times simultaneously. This ensures that tasks are processed in a controlled manner.
+ **Menu deactivation**: During the execution of an action, the associated menu will be deactivated to prevent further interactions until the task is complete.
+ **Notification on completion**: A notification will appear once the external server responds to the request, keeping users informed of the task's status.
+ **Timeout**: The PIM HTTP client that communicates with the destination is configured with a timeout of 5 seconds.
+ **POST HTTP method**: The request being sent to the destination is a POST request.
+ **Signature**: It's possible to configure a `secret` to sign the body of the POST request sent to the destination (<a href='https://wikipedia.org/wiki/SHA-2'>SHA-512</a> protocol).

Here is a diagram illustrating the workflow:
[![action-extension-schema.png](../img/extensions/ui-extensions/action-extension-schema.png)](../img/extensions/ui-extensions/action-extension-schema.png)


Data sent within the POST body, formatted in JSON, contains :
- A `data` object with different fields depending on the [position](#position).
- A `context` object containing the configured `locale` and `channel`.
- A `user` object containing the `uuid`, `username` and `groups` of the connected user.
- A `timestamp` that can be used with a [secret](#secret) to help you to protect your server against [replay attacks](https://en.wikipedia.org/wiki/Replay_attack).

From a position `pim.product.header`, the `data` object contains :
- A `productUuid` string field

From a position `pim.product-model.header`, the `data` object contains :
- A `productModelCode` string field representing the root model code.

From a position `pim.sub-product-model.header`, the `data` object contains :
- A `productModelCode` string field representing the sub model code.

From a position `pim.product-grid.action-bar`, the `data` object contains :
- A `productUuids` field which is an array of string representing the UUIDs of selected products
- A `productModelCodes` field which is an array of string representing the codes of selected product models and sub models

Examples :

```json
{
  "data": {
    "productUuid": "ecfddba2-59bf-4d35-bd07-8ceeefde51fd"
  },
  "context": {
    "locale": "en_US",
    "channel": "ecommerce"
  },
  "user": {
    "uuid": "e05cc457-b8ac-43b1-baa7-c4c112091ad8",
    "username": "julia",
    "groups": [
      "Manager",
      "All"
    ]
  },
  "timestamp": 1739948408
}
```

```json
{
  "data": {
    "productUuids": [],
    "productModelCodes": ["armor", "apollon"]
  },
  "context": {
    "locale": "en_US",
    "channel": "ecommerce"
  },
  "user": {
    "uuid": "e05cc457-b8ac-43b1-baa7-c4c112091ad8",
    "username": "julia",
    "groups": [
      "Manager",
      "All"
    ]
  },
  "timestamp": 1739948408
}
```

### Position

**Extension Position**

Extension position determines where your extension appears within the Akeneo PIM interface. You can select from a variety of available positions, which vary depending on the specific extension type.

**Key Concepts:**

* **Position Options:** Each extension type offers a set of predefined positions. These positions control the location of your extension's interface elements.
* **Contextual Relevance:** Position options are designed to align with the functionality of each extension type, ensuring a seamless user experience.

**Best Practices:**

* Choose a position that aligns with the extension's intended functionality and user workflow.
* Review the available position options for each extension type to ensure optimal integration.
* Consider the impact of the position on the overall user experience within the PIM.


#### The following position can be added: 

![PIM Header.png](../img/extensions/ui-extensions/pim-header-with-extension.png)

#### pim.product.header
This position refers to the header of a simple product or a variant edit page.

#### pim.product-model.header
This position refers to the header of a root model edit page.

#### pim.sub-product-model.header
This position refers to the header of a sub model edit page.

![PIM Tab.png](../img/extensions/ui-extensions/pim-product-with-tab-extension.png)

#### pim.product.tab
This position refers to the left panel of a simple product or a variant edit page.

#### pim.product-model.tab
This position refers to the left panel of a root model edit page.

#### pim.sub-product-model.tab
This position refers to the left panel of a sub model edit page.

#### pim.category.tab
This position refers to the horizontal list of tabs on a category edit page.

![PIM Product Grid.png](../img/extensions/ui-extensions/pim-product-grid-with-bulk-trigger-action.png)

#### pim.product-grid.action-bar
This position refers to the list of commands availables after selecting some products on the product grid.

::: warning
  For the moment, you can't use UI extensions with more than **500** selected products & product models.
:::

#### pim.activity.navigation.tab
This position refers to the activity PIM menu, adding UI extensions in this position will create a new section in the activity sub-navigation.

### Url
All types of UI extensions must have a configured URL. However, the parameters that are sent—or can be sent—vary depending on the specific type of extension.
#### Query parameters placeholders
For [link](#link) UI extension, you can ask for specific values to construct the urls thanks to a specific placeholder pattern. 

For example, you can configure a UI extension with the following url `https://www.google.com/search?q=%name%&tbm=shop&gl=us`, then we will dynamically put the value of the attribute code `name` when the user will click on the button.

Valid placeholders attributes are:
- `uuid` (for products), `code` (for product models) and other attribute of type `identifier`
- all text attributes. Links will use the value related to the current locale or channel.

You can add a placeholder anywhere in your url as soon as they're surrounded by `%` symbol.

Examples:
- `https://www.google.com/search?q=%name%`
- `https://yourwebsite.com/%sku%`
- `%base_url%/sub-url`

::: warning
If the URL begins with a placeholder, we won't verify its validity. The link might not work when used.
:::

#### Fixed query parameters
For an [iframe](#iframe) UI extension, with `pim.product.tab`, `pim.sub-product-model.tab`, `pim.product-model.tab` as [position](#position), several parameters are sent by default as SearchParameters in a GET query, so the server knows who is the connected user (insecure) and in which context the iframe is opened.

For example, when `url` is `https://customerwebsite.com/iframe/`, the called URL is `https://customerwebite.com/iframe/?paramA=valueA&paramB=valueB`

For all positions except `pim.product-grid.action-bar`, parameters relative to the connected user are sent:
- `user[catalog_locale]`
- `user[catalog_scope]`
- `user[ui_locale]`
- `user[username]`
- `user[email]`

::: warning
**Important security notice**

When using iframes, please be aware of the following:

+ **Data confidentiality**: We do not implement any security measures to verify the identity of the caller accessing the URL.

+ **Access control**: Anyone with access to this link can view the content of the webpage, regardless of the parameters included.

For sensitive data, we recommend implementing additional security measures to protect your information.
:::

For `pim.product.tab` position, these parameters are sent:
- `product[uuid]`
- `product[identifier]`

For `pim.product-model.tab` position, this parameter is sent:
- `product[code]`

For `pim.category.tab` position, this parameter is sent:
- `category[code]`

## Available types by position
Each position supports a specific subset of available types. The table below outlines the compatible types for all positions.

| Positions                    | Action | Iframe | Link  |
|------------------------------|--------|--------|-------|
| pim.product.header           | ✔️     | ❌     | ✔️    |
| pim.product-model.header     | ✔️     | ❌     | ✔️    |
| pim.sub-product-model.header | ✔️     | ❌     | ✔️    |
| pim.product.tab              | ❌     | ✔️     | ❌    |
| pim.product-model.tab        | ❌     | ✔️     | ❌    |
| pim.sub-product-model.tab    | ❌     | ✔️     | ❌    |
| pim.category.tab             | ❌     | ✔️     | ❌    |
| pim.product-grid.action-bar  | ✔️     | ✔️     | ❌    |
| pim.activity.navigation.tab  | ❌     | ✔️     | ❌    |

## Administration of UI extensions
For a functional overview of the administration panel and permissions, see our [Help Center](https://help.akeneo.com/extensions/ui-extentions).

### Prerequisites

To be able to list all registered extensions, you must have a role with **UI extensions > View all UI extensions via Administration panel** permission.

To be able to enable or disable extensions, you must have a role with **UI extensions > Manage all UI extensions via Administration panel** permission.

### List all UI extensions

You can open the administration panel with the menu **System > System Customization > UI extensions**.

On the new page, you can see all extensions registered in your PIM.

### Enable / disable a UI extension

To manage one or more UI extensions from the list, you just have to select them thanks to the checkboxes present on the left of each line, and then use one of the two commands available at the bottom of the screen.

## API reference
Several choices are offered to deep dive into our API, to discover all the endpoints, and their request/response schema:

- You can <a href="https://api.akeneo.com/api-reference-index.html#UIExtensions" target="_blank">consult this static documentation</a>
- Discover it thanks to <a href="https://api.akeneo.com/files/Akeneo%20PIM%20API.postman_collection.json" target="_blank">the postman collection</a> (see the [Postman section](https://api.akeneo.com/extensions/ui-extensions.html#using-postman))

## FAQ
### Who is responsible for UI extensions?
Akeneo is responsible for the UI extensions framework itself, including the APIs and administrative interface. We provide support for these components. Your organization or your integrator is responsible for any custom code, iframes, or other custom development built within the UI extensions. Support for this custom code falls to your organization or integrator, not Akeneo. 

### How can I add a new UI extension to my PIM?
Adding a new extension to your organization is easy! Just follow the steps in [this guide](https://api.akeneo.com/extensions/ui-extensions.html#getting-started).

### The UI extensions entry isn't showing up in my PIM. Could you help me understand why? 
If you don't see the UI extensions entry in your PIM, it's likely due to permission settings. [This guide](https://api.akeneo.com/extensions/ui-extensions.html#authorization) will help you check and activate the necessary permissions. 

### I'd like to see my extension in a position that isn't currently available. What can I do? 
Currently, UI extension placements are limited to those defined by Akeneo. However, we highly value your feedback! Please contact your Customer Success Manager or our Support team to share your specific placement needs. This will help us understand your use case and consider it for future development.
