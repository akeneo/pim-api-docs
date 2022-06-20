# Authentication and authorization

## Overview

This guide explains the difference between authentication and authorization and gives you all information you need to understand how it works. Make sure that you understand the differences between authentication and authorization before you begin your development process.

### Authentication vs Authorization

**Authentication** is the process of verifying the identity of the user or the app. To keep transactions safe and secure, all apps connecting with Akeneo API must authenticate when making API requests.

**Authorization** is the process of giving permissions to apps. Akeneo users authorize apps to access data in their PXM Studio. For example, an app might be authorized to access product and asset data in a PXM Studio.

### Types of authentication and authorization methods

- Akeneo PXM Studio uses OAuth 2.0 to manage app authorizations.
- Any app can use the OpenID Connect protocol to authenticate users coming from Akeneo PXM Studio.

### Next steps

- Learn about OAuth 2.0 `add link`
- Learn how to authenticate your app `add link`
- Learn how to use Open ID connect to authenticate users `add link`

## OAuth 2.0

This guide introduces the OAuth flow for apps that are created in the Akeneo App Store.

### Introduction to OAuth

OAuth 2.0 is the industry-standard protocol for authorizing or giving permissions to apps. This differs from authentication, which is the process of verifying the identity of the user or the app.

### The OAuth flow

Akeneo uses OAuth 2.0’s authorization code grant flow to issue access tokens on behalf of users. The OAuth flow is used so that Akeneo users can authorize Akeneo apps to access data in a PXM Studio. For example, an app might be authorized to access product and asset data in a store.

The following diagram illustrates the OAuth flow based on the actions of the Akeneo user, your app, and the PXM Studio:

<!-- ![Schéma](../img/apps/xxx.png) -->



## Getting started with OAuth

Apps created in the Akeneo App Store must obtain authorization using the [OAuth 2.0 specification](https://datatracker.ietf.org/doc/html/rfc6749) to use Akeneo’s API resources. This guide shows you how to authorize an app using OAuth 2.0.

### What you'll learn

After you've completed this tutorial, you'll be able to authorize an app created in the Akeneo App Store using OAuth 2.0.

### Requirements

- You have a Partner account and a developer sandbox.
- You're familiar with the [OAuth flow](link to The OAuth flow paragraph) in Akeneo.

### Step 1: Generate API credentials

The first step is to retrieve a Client id and a Client secret, which you get when you create an app. These API credentials identify your app during the authorization process.

If you've already created an app and generated API credentials, then proceed to [step 2](link to step 2).

1. Log in to your Akeneo App Store account `add link`
2. Scroll down to the bottom of the page and click **[Submit your app for review](https://apps.akeneo.com/node/add/extension)**
3. Choose the **App** option
4. Fill in all the required values including **activate and callback URLs** of your app
5. Click on **Save**
6. **Copy and paste your app credentials** and save them carefully as the Akeneo App Store displays them only once ⚠️


### Step 2: Ask for authorizations and permissions

Before an app can access data, a user must grant authorizations and permissions to the app. It happens when a user clicks the `Connect` button to connect your app.

After a user clicks on `Connect`, they are redirected to the **activation URL** you provided. The PXM Studio URL they come from is in the query you receive.

```
https://my-app.example.com/oauth/activate?pim_url=https%3A%2F%2Fmy-pim.cloud.akeneo.com

```

When you are ready to do so, you must start the **Authorization Request**. 

Like any other OAuth 2.0 application, you have to redirect the user to the Authorization Server (Akeneo PXM Studio) with the following parameters:

| Query parameter      | Description        |
|---------------------|--------------------------------------------------------------|
| `response_type`.     | Required. Must always be "code" |
| `client_id`                 | Required. The client id you get from the Akeneo App Store |
| `scope`                     | Optional. A comma-separated list of scopes. For example, to write products and read assets, use scope=write_products,read_assets. Any permission to write a resource includes the permission to read it. |
| `state`                       | Recommended. |
|---------------------|--------------------------------------------------------------|


``` http
https://my-pim.cloud.akeneo.com/connect/apps/v1/authorize?
        response_type=code&
        client_id=[OAUTH_CLIENT_ID]&
        scope=[REQUESTED_SCOPES]&
        state=[STATE]

```

<!-- `add the list of authorization scopes` -->

When the user arrives at this URL, Akeneo shows the following prompt to receive authorization from the user:

<!-- `<add an image of the wizard>` -->

When the user ends the connection process, they are redirected to the app **callback URL** with the following parameters:

``` http
https://my-app.example.com/oauth/callback?
        code=[AUTHORIZATION_CODE]&
        state=[STATE]
```


### Step 3: Get a permanent access token

<!-- cf [https://api.akeneo.com/apps/using-oauth2.html#access-token-request](https://api.akeneo.com/apps/using-oauth2.html#access-token-request)  -->

### Step 4: Make authenticated requests

After your app has obtained an API access token, it can make authenticated requests to the REST API.

<!-- `To be validated`  -->
These requests are accompanied by a header Authorization: Bearer {access_token} where {access_token} is replaced with the permanent token.

The following examples show how to retrieve a list of products using the REST API.

<!-- `To be done` -->

<!-- 
### Step 5: Verify a request

`To be done - Shopify example`

*Every request or redirect from Akeneo to your app's server includes an **hmac** parameter that can be used to verify the authenticity of the request from Akeneo.*

*For each request, you must remove the **hmac** entry from the query string and process it through an HMAC-SHA256 hash function.*

*The following is an example of a query string. However, request parameters provided by Shopify are subject to change. Your verification strategy shouldn't depend on the parameters in the following example:* 
-->

### Next steps

- Learn how to use Open ID connect to authenticate users
- Explore the REST API reference.



## Getting started with OpenID Connect

Apps created in the Akeneo App Store can use the OpenID Connect protocol to authenticate users coming from an Akeneo PXM Studio.

Basically, with OpenID Connect, you use the same process as for Authorization, but you request an additional scope and you receive, alongside the Access Token, an ID Token containing the information of the current user.

### What you'll learn

After you've completed this tutorial, you'll be able to authenticate users coming from an Akeneo PXM Studio using OpenID Connect.

### Requirements

- You have a Partner account and a developer sandbox.
- You're familiar with [OpenID connect](https://openid.net/connect/)
- You're familiar with the [app authentication process](link to the previous section)

### Step 1: Ask for authentication scopes

When a user connects to your app **for the first time**, and you want to authenticate them, you must ask for OpenID scopes during the [Authorization request](link to Step 2: Ask for authorizations and permissions).

``` http
https://my-pim.cloud.akeneo.com/connect/apps/v1/authorize?
        response_type=code&
        client_id=[OAUTH_CLIENT_ID]&
        scope=openid email profile read_products write_products&
        state=[STATE]
```

<!-- `Add the list of authentication scopes here` -->

<!-- [https://api.akeneo.com/apps/access-scopes.html#available-authentication-scopes](https://api.akeneo.com/apps/access-scopes.html#available-authentication-scopes)  -->

If a user tries to access your App from their Akeneo PXM Studio, and you want to authenticate them, start an [Authorization request]`(link to Step 2: Ask for authorizations and permissions)`, even if you already are connected to their Akeneo PXM Studio.

::: info
During this new Authorization Request, you must request all the scopes your App needs, including the Authorization scopes, in addition to the OpenID scopes.
::: 

### Step 2: Extract user information

<!-- cf [https://api.akeneo.com/apps/using-openid.html#extracting-user-information-from-the-id-token](https://api.akeneo.com/apps/using-openid.html#extracting-user-information-from-the-id-token)  -->


### Next steps
- Learn about catalogs `add link`
- Explore the REST API reference `add link`
