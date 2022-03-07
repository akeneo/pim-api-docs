# What's an App?

::: warning
This feature is available on all SaaS environments and only since v6 for other types of environments.
:::

Before you start developing an App, it's essential to understand what Apps can do and how they interact with the PIM.

An App is a service that can be easily connected to a PIM, directly from the PIM, 
with a streamlined process of activation and configuration.

An App can extend Akeneo PIM functionalities through the REST API, like a connector, 
by retrieving or updating data and integrating it with external services.

An App must have a **single activation URL, be hosted by its creator, and use OAuth 2.0** to ask for API access.

::: info
For more information on Apps usage, please read our help center articles
[How to connect Akeneo PIM with third parties](https://help.akeneo.com/pim/serenity/articles/how-to-connect-my-pim-with-apps.html)
and [Manage your Apps](https://help.akeneo.com/pim/serenity/articles/manage-your-apps.html).
::::

::: tips
Still not sure about developing an App? Read our page [Why should you choose Apps?](/apps/why-apps-over-connectors.html)
:::

::: panel-link Next step [Use OAuth 2.0 to connect an App](/apps/using-oauth2.html)
:::