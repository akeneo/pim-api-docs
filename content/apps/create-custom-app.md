# Custom apps

## Overview

A custom app is an app that can be connected with a PIM without having to publish it on the Akeneo App Store. 
Using custom apps, integrators can benefit from all app features to answer specific customer's needs that are not covered by our existing PIM native features or existing Apps available on the Akeneo App Store.


## Getting started with Custom apps

Technically a custom app is still an app. The only difference is that you won't get your app credentials from the Akeneo App Store but from your customers' PIM. 

### What you'll learn

After you've read this article, you'll be able to create a custom app and get the related credentials from the PIM UI.

### Requirements

- You have access to your customer's PIM or an [App developer starter kit](/apps/overview.html#app-developer-starter-kit) 

### Step 1 - Setup your role permissions

You need to create an app from the PIM interface to get credentials for your custom app.
To do so, go to `Connect`, then `App Store`. If you see the `Create an App` button, you can skip this step and go to step 2. Else please update your role permissions.
![Create an app button](../../img/apps/create-a-custom-app-button.png) 

To see the `Create an App` button, you need to:
1. Go to `System`, then `Roles`
2. Choose the role you use for your user
3. In the `Permissions` tab, scroll down and search for the `Connect` submenu
4. Select `Create and delete custom apps`
5. Don't forget to save your modifications

### Step 2 - Create an App & get credentials

To create a Custom App:
1. In the top right corner, click on `Create an App`
2. Fill in all the required information: Activate URL and Callback URL
   ![Custom app creation screen](../../img/apps/custom-app-creation-info.png)
3. Then click on `Create`
4. Copy/paste credentials in your app configuration file
   ![Custom app credentials screen](../../img/apps/custom-app-creation-credentials.png)
5. And click on `Done`
6. Your custom App appears on the App Store page

![Custom apps section](../../img/apps/custom-apps-section.png)

### Step 3 - Connect your custom app 

You can connect a custom app as any app by clicking on `Connect`. 

To know more about how to connect an app, please go to our help center article: [How to connect my PIM with Apps?](https://help.akeneo.com/serenity-connect-your-pim/serenity-how-to-connect-my-pim-with-apps#connect-your-app)  


### Regenerate your custom app credentials

If you need to update your app credentials, go to `Connect > Connected app`, then click on your app. 
You can regenerate credentials from the connected app settings using the `Regenerate` button. 

![Custom app regenerate credentials](../../img/apps/custom-app-regenerate-credentials.png)

From there, copy/paste the new credentials in your custom app configuration file. 
