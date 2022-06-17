# Create an App (with code samples)

::: warning
This feature is available on all SaaS environments and only since v6 for other types of environments.
:::

In this tutorial, we provide a guide on how to implement the required parts of your App
for the activation process based on OAuth 2.0 with Authorization Code.
At the end of this tutorial, your App will receive an Access Token and will be able to call the REST API of a PIM.

::: warning
Examples in this tutorial use languages without any framework or library and, consequently, don't follow
all the recommended best practices. We **strongly** encourage you to adapt those examples with the framework or
library of your choice.
:::

## Prerequisites

You must have valid [OAuth 2.0 client credentials](/apps/using-oauth2.html#credentials).

## Activation URL

First, your application must expose an activation URL.

In our example, we won't do additional steps (like authentification), so we will launch the Authorization Request
immediately in this Activation URL.


!!!include(content/apps/create-app/activate-php.md)!!!
!!!include(content/apps/create-app/activate-nodejs.md)!!!
!!!include(content/apps/create-app/activate-python.md)!!!
!!!include(content/apps/create-app/activate-java.md)!!!

## Callback URL

Then, your application must expose a callback URL.


!!!include(content/apps/create-app/callback-php.md)!!!
!!!include(content/apps/create-app/callback-nodejs.md)!!!
!!!include(content/apps/create-app/callback-python.md)!!!
!!!include(content/apps/create-app/callback-java.md)!!!



::: info
The Code Challenge is documented [here](/apps/using-oauth2.html#whats-the-code-challenge).
:::

And that's it!  
At the end of this process, you receive the following response with an `access_token`:

```json
{
  "access_token": "Y2YyYjM1ZjMyMmZlZmE5Yzg0OTNiYjRjZTJjNjk0ZTUxYTE0NWI5Zm",
  "token_type": "bearer",
  "scope": "read_products write_products"
}
```

You can use this token to call the Akeneo PIM REST API.

Reminder: our documentation is [open-source](https://github.com/akeneo/pim-api-docs). Feel free to contribute with languages we're not experts at.