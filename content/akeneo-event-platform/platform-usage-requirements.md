# Platform usage requirements

## Authentication / Authorization
- Having a valid Akeneo PIM API token provided by either a connection or an App to be authenticated to use the Akeneo Event Platform Management API
- The Connection or App must be granted by an Akeneo PIM administrator to allow the subscription

## HTTPS destination

The platform will test the HTTPS endpoint validity before being able to create the subscription.
The endpoint you configured must respond `200 OK` status code on `HTTP HEAD` request.

::: panel-link Consult now our Best practice advices [Next](/akeneo-event-platform/best-practices.html)
:::

