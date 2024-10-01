# Authentication and authorization

## Authentication
Having a valid Akeneo PIM API token provided by either a connection or an App to be authenticated to use the Event Platform Management API.

## Authorization
To ensure proper data flow between your app or connection and the Event Platform, a specific permission checkbox must be enabled in either the **Connections** tab or in the **App's connection settings** tab depending on your usage.  

This checkbox grants the necessary permission for the connection or app to retrieve data and send it to the Event Platform. If this permission checkbox is not selected, the user will not be able to subscribe to events on the Event Platform.  

In the event that the checkbox is unchecked after a subscription has already been created, the subscription will be automatically suspended due to insufficient rights. To maintain active subscriptions, ensure the permission is always enabled.  

Permissions for the Event Platform are managed at a global level. You cannot assign specific rights. If this global permission is not enabled, the connection will not be able to subscribe to events, and any existing subscription will be suspended if the permission is later revoked.

::: panel-link Let's get explore the key behaviors! [Next](/akeneo-event-platform/key-platform-behaviors.html)
:::


