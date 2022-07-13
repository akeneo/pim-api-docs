# Catalogs (beta)

## Overview

This guide introduces the catalog feature and explains why using catalogs to retrieve Akeneo data. 

### What's a catalog?

With catalogs, Akeneo users can configure which products they want to share with your app thanks to a **product selection** composed of one or several criteria that allow you to filter products. 

When your app uses catalogs to retrieve product data, it automatically enables the Catalogs tab and creates catalogs in Akeneo.

![Catalogs for apps](../img/apps/app-catalog-list.png)

### Why use catalogs to retrieve product data? 

Using Catalogs helps you better manage the product information you get from the Akeneo PXM Studio. 

Most of the time, developers must design, develop and maintain a filter interface to allow users to configure their product selection: which products must be taken into account and which don't. 
Using catalogs for apps prevents you from adding this filtering interface to your app. When you retrieve product information related to a catalog, you only retrieve the data your app needs to process. 

Moreover, with catalogs, you don't have to master the entire PIM structure anymore to deliver a relevant filtering interface, as the Akeneo PXM Studio already provides it to your users. 

### Next steps

- Learn [how to create and use catalogs](/apps/catalogs.html#getting-started-with-catalogs)
- Discover [how users configure catalogs](https://help.akeneo.com/pim/serenity/articles/how-to-connect-my-pim-with-apps.html#how-to-configure-catalogs-for-apps) in the Akeneo PXM Studio

## Getting started with catalogs

This guide describes how to use the catalog features with your app. 

### What you'll learn

After completing this tutorial, you'll be able to create and use catalogs to retrieve product data.

### Requirements

- You have a Partner account and a developer sandbox.
- Your app already manages the authorization step

### Step 1: Ask for catalog scopes

<!-- TODO -->

### Step 2: Create catalogs

<!-- TODO -->

By default, when you create a catalog in the Akeneo PXM Studio, the catalog is disabled. It means that until a user hasn't enabled it, you won't be able to retrieve products for this catalog. Note that only users can enable a catalog. 

::: warning
You can create **up to 15 catalogs** per app.
::: 

### Step 3: Get products using catalogs

<!-- TODO -->

### Next steps
- Learn [how to synchronize Akeneo data](/getting-started/synchronize-pim-products-6x/welcome.html)
- Explore the [REST API reference](/api-reference-index.html) 
