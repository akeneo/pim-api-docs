# How to get your App token

Implement the required parts of the App activation process and receive an App access token for querying your PIM API.

<table class="tag-container">
    <tr>
        <td>Use case:</td>
        <td>
            <button aria-pressed="false" class="tag-selectable">
                <div class="tag-color tag-color-light-blue"></div>
                <div class="tag-label">App Workflow</div>
            </button>
        </td>
    </tr>
</table>

## What you will learn
In this tutorial, we provide a guide on how to implement the required parts of your App for the activation process based on OAuth 2.0 with Authorization Code.
At the end of this tutorial, your App will receive an Access Token and will be able to call the REST API of a PXM Studio.

::: warning
Examples in this tutorial use languages without any framework or library and, consequently, don't follow all the recommended best practices. 
We strongly encourage you to adapt those examples with the framework or library of your choice.
:::

::: tips
If you prefer to start with a fonctionnal App (in PHP), have a look [here](/apps/app-developer-tools.html)
:::

## Step 1: Expose your activation and callback URLs

First, your application must expose an **activation URL**.

In our example, we won't do additional steps (like authentification), so we will launch the Authorization Request immediately in this Activation URL.

!!!include(content/apps/create-app/activate-php.md)!!!
!!!include(content/apps/create-app/activate-nodejs.md)!!!
!!!include(content/apps/create-app/activate-python.md)!!!
!!!include(content/apps/create-app/activate-java.md)!!!

Then, your application must expose a **callback URL**.

!!!include(content/apps/create-app/callback-php.md)!!!
!!!include(content/apps/create-app/callback-nodejs.md)!!!
!!!include(content/apps/create-app/callback-python.md)!!!
!!!include(content/apps/create-app/callback-java.md)!!!


::: info
You can find more information about the authorization process and code challenge in the following documentation. 
- [OAuth Authorization and authentication](/apps/authentication-and-authorization.html#)
:::

## Step 2: Get a public URL for your in development App

::: info
if you use a local version of PIM, skip this step
:::

Before proceeding to step 4 create a test App in your developer sandbox, you will need valid URLs to your App. This can be easily resolved with a tunnel to your localhost.

There are several ways to create a tunnel to your localhost such as **localhost.run** or **ngrok**. We will use [localhost.run](https://localhost.run/) for its free and easy setup.

### Initiate localhost tunnel

Initiate localhost tunnel using the following command:

```shell

ssh -R 80:localhost:8080 localhost.run
```

The command above assumes that your local App is available on port 8080 but you can specify any port you want.


### Extract URL from the output

If everything goes well the command will output your public URL for your local app:

```shell

46672a93dd64.lhrtunnel.link tunneled with tls termination, https://46672a93dd64.lhrtunnel.link
```

Your local app is now available at `https://46672a93dd64.lhrtunnel.link`. You may now use it for your development.

## Step 3: Get your test app credentials

To get credentials for your app, you need to create a test app on your developer sandbox.

First of all, go to `Connect`, then `App Store`

### Permissions

If you see `Create a test App` skip to [Connect app](https://www.notion.so/Guided-tutorial-How-to-get-your-app-token-022acb1113c1413faefaec3c8f3585a5), else please enable the `developer mode`.
![Create a test app button](../img/apps/create-a-test-app-button.png)

To do so, you need to:
1. Go to `System`, then `Roles`
2. Choose the role you use for your user
3. In the `Permissions` tab, scroll down and search for the `Developer mode` submenu
4. Select `Manage test apps`
5. Don't forget to save your modifications

### Connect app

To create a test App:
1. On the top right corner, click on `Create a test App`
2. Fill in all the required information
   ![Test_app_creation_credentials](../img/apps/test-app-creation-info.png)
3. Then click on `Create`
4. Copy/paste credentials in your app configuration file
   ![Test_app_creation_credentials](../img/apps/test-app-creation-credentials.png)
5. And click on `Done`
6. Your test App appears on the App Store page


## Step 4: Connect your test App and access its settings

![Test app on the App Store](../img/apps/marketplace-with-test-app.png)

Connecting a test App is like connecting a published App. 

1. Launch your APP
2. Click on `Connect`
3. Your App opens in a new tab of your browser
4. Launch the connection process from your App
5. Follow all the activation process steps, then `Confirm`
6. Your test App is now connected with Akeneo PIM! 🔗

Now that your App is connected, you can enjoy all the available App features from the Akeneo PXM Studio UI and test that your App works well. 

To access the settings of your connected App on Akeneo PIM, please go to `Connected Apps`, then click on `Manage App`. 
You can also open your App from Akeneo PIM UI, to do so, click on `Open app`. 

![Connected test app on Apps](../img/apps/connected-test-app.png)

::: info
To know more about the step-by-step activation process, please read our article:  
[How to connect an App?](https://help.akeneo.com/pim/serenity/articles/how-to-connect-my-pim-with-apps.html#how-to-connect-an-app)
:::

## Step 5: Use your access token to call the API

At the end of this process, you receive the following response with an `access_token`:

```json

{
  "access_token": "Y2YyYjM1ZjMyMmZlZmE5Yzg0OTNiYjRjZTJjNjk0ZTUxYTE0NWI5Zm",
  "token_type": "bearer",
  "scope": "read_products write_products"
}
```

You can use this token to call the Akeneo PIM REST API.

<div class="block-next-steps">
    <img src="../img/illustrations/illus--Attribute.svg" width="140px">
    <div class="block-next-steps-column">
        <div class="block-next-steps-title">Next Steps</div>
        <div class="block-next-steps-text">Now that you collected your categories, we advise you to follow</div>
        <div>
            <ul>
                <li><a href="https://api.akeneo.com/apps/overview.html">Learn more about Apps</a></li>
                <li><a href="/api-reference-index.html">Explore the REST API reference</a></li>
            </ul>
        </div>
    </div>
</div>
