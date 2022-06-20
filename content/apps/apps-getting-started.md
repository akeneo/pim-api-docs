# Getting started

## Overview

Before you start planning and developing your App, it's essential to understand what Akeneo apps do and how they fit into Akeneo PIM.

### What's an Akeneo app?

An Akeneo App connects Akeneo PIM with third-party solutions. They can be easily connected directly from within PIM, with a streamlined process of activation and configuration.

Most Akeneo apps are built by third-party developers, not by Akeneo.

You can build an app to pull Akeneo data into your App to adapt and distribute it to external services, like e-commerce platforms or marketplaces. You can also push data to enrich the Akeneo PIM with translations, ERP data, assets, data pool content, or other sources.

To tailor experiences to their specific needs, Akeneo users connect Akeneo apps to integrate with external services and improve how they collect, enrich and distribute their data.

<!-- ![What's an app schema](../img/apps/app-authentication-sequence-diagram.png) -->



### How apps fit into Akeneo PXM Studio?

Apps integrate with Akeneo in the following ways:

- using OAuth2.0 protocol to connect with Akeneo
- using app catalogs to provide a consistent experience to users
- connecting with our REST API to read and write Akeneo data

<!-- ![App in Akeneo PXM Studio](../img/apps/app-authentication-sequence-diagram.png) -->

### Next steps

- Learn how to create an app
- Read our documentation about authorization and authentication
- Learn how to use catalogs to retrieve product data



## Create an app

You're ready to create a new app. You want to set up your development environment so that you can start coding.

In this tutorial, we provide a guide on how to implement the required parts of your App for the activation process based on OAuth 2.0 with Authorization Code.

At the end of this tutorial, your App will receive an Access Token and will be able to call the REST API of a PIM.

::: info
Please go to our REST API Reference page to learn more about our REST API endpoints. And if you want to know more about response codes, pagination, filters, or get troubleshooting information, go to the REST API basics page.
:::

### Scenario

### What you will learn

### Requirements

- You have a Partner account and a developer sandbox.
- You understand what's an Akeneo App and how they fit into Akeneo PXM Studio
- You've installed a PHP version >= 7.4 and Composer.

### Step 1: Install our PHP API client

<!-- cf [https://api.akeneo.com/php-client/getting-started.html#installation](https://api.akeneo.com/php-client/getting-started.html#installation)  -->

### Step 2: Expose your activation and callback URLs

<!-- cf [https://api.akeneo.com/apps/how-to-have-public-url-for-my-app.html#](https://api.akeneo.com/apps/how-to-have-public-url-for-my-app.html#)  -->

### Step 3: Get your test app credentials

To get credentials for your app, you need to create a test app on your developer sandbox.

<!-- cf [https://api.akeneo.com/apps/how-to-test-my-app.html#step-2-create-a-test-app](https://api.akeneo.com/apps/how-to-test-my-app.html#step-2-create-a-test-app)  -->

### Step 4: ???

<!-- `To be done` -->

### Next steps

<!-- `To be done` -->

