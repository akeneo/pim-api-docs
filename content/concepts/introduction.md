#  👋 Welcome to the Concepts documentation!

This is where your journey begins! :airplane:  

Here you will be able to become a PIM master by learning all the key concepts you will use to interact with the REST API.

In this documentation, you will find a small presentation of each entity accessible through the REST API and their associated standard JSON format.  
For each resources, we defined a JSON standard format which is used to retrieve, create and update data in the PIM.

You will also be able to find all the business rules associated with all these resources. So whenever you get 422 errors when playing with the REST API, don't hesitate to check this documentation to find out why. :wink:

So here you go. We categorized the REST API resources by main PIM domain/feature. Don't hesitate to browse:
- the [Products](/concepts/products.html),
- the [Catalog structure](/concepts/catalog-structure.html),
- the [Target market settings](/concepts/target-market-settings.html),
- the [Reference entities](/concepts/reference-entities.html),
- the [Asset Manager](/concepts/asset-manager.html)

But first things first! Maybe you don't event know what a PIM is... So let's start by the beginning!

## What is a PIM?

> Never heard of Julia? Let me tell you her story

Julia is working at Zaro, a very famous clothes retailer. She is a __marketer__, which means that she is responsible for all the products the brand is selling. Her everyday job is to ensure that anytime there are mentions of a Zaro product, the information about it is complete and clear. And there are mentions of Zaro products everywhere! On their ecommerce site, on their catalog, on their mobile application and even in their points of sale.

So that's a lot of __work__!

To make it a little bit more difficult, products information come from a great number of sources such as:
 - the ERP,
 - the media server on which the pictures of the products are stored,
 - the suppliers who know the precise characteristics of each product,
 - ...

It is almost __impossible__ for Julia to deal with all these sources.

So, to prevent Julia from going nuts, her company has invested in a very useful tool, a __PIM__. This type of software helps companies to centralize and harmonize all the technical and marketing information of their catalogs and products. That's exactly what __Julia needs__!

As summed up in the diagram below, a PIM allows Julia to gather all the product information in one single place, to enrich it and to spread it to several channels like an e-commerce website or a printed catalog... 
![PIM schema](/img/rest-api/pim.png)

**In a nutshell, the PIM is for product information what CRM is for customer information!**

_Well, if you do not know what a CRM is, here is a little bit of [information](https://en.wikipedia.org/wiki/Customer_relationship_management)._ ;)

::: panel-link Want more details about the Akeneo PIM solution? [Check our website!](http://www.akeneo.com)
:::
