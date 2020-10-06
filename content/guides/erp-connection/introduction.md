# Introduction
![Product illustration](../../img/illustrations/illus--Product.svg)

> You want to connect your ERP solution to your PIM?
> You want to implement an ERP connector and you don't know where to start?

You landed in the right place!

## Goal of this guide

In the following guide, we are going to explain how to properly connect an ERP to our PIM, thanks to our wonderful API.

We're here to help you find your way around, understand how your ERP solution will interact with our PIM and guide you through the steps to reach that goal.

## Building a one-size-fits-all solution?

If you are using this guide with the goal of building a **generic** connector for our Marketplace, you should know that each ERP solution has different capabilities and above all, each project has its own specificities due to the product modeling done in the ERP.

It is therefore very complex to build a connector that fits all end-users' needs...

That's why, from our experience, this guide will only guide you on the main use-cases and classical architectures.

## ERP vs PIM product data

Before starting this guide, you need to understand that Akeneo PIM should only manage **"cold" product information**. It means that Akeneo PIM only owns marketing product information that needs to be checked, organized, enriched. And “cold” product information means that this information does not change every day.

Concerning **“hot product information”** (i.e. product information that changes frequently: as prices or stock data), this information should be directly transmitted from your ERP solution to the eCommerce solution without passing through Akeneo PIM.

For example, **up-to-date price and stock information** of a product should never be stored in Akeneo PIM and should be transmitted directly from the ERP into the eCommerce solution.

:::info
For price information, Akeneo PIM has the capability of storing product price information, but only for a **“reference price”** and not an **“up-to-date”** price. This **reference price** is only used by PIM users for information purposes and is therefore normally never exported from the PIM to a final solution.
:::

Ok... now that this product data dispatch from your ERP solution is crystal clear, let's start! 🚀

## Follow the steps!

1. [Who is your connector for?](step1-who-is-your-connector-for.html)  
Understand your target user: Who will install it? Who will set it up? Who will use it? What are their needs?
2. [Analyse ERP data](step2-analyze-erp-data.html)
Understand the product information that should flow between your ERP and the PIM.
3. [Understand Akeneo PIM](step3-understand-akeneo-pim.html)
Understand Akeneo PIM, its features, its data structure in order to be able to compare them with your ERP solution.
4. [How to build your connector?](step3-how-to-build-your-connector.html)
Ready to start? Some last recommendations on how to interact with our PIM...