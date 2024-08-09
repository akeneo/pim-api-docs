# Concepts

## Subscriber

### What is a subscriber?

Simply put, a subscriber represents a connection to a specific event source, like a PIM. While you can attach multiple subscribers to your source, the general recommendation is to configure only one. However, your setup will require creating various subscribers for a multi-tenant context.

The following properties represent a subscriber:

| Property | Value | Description                                                                     |
| --- | --- |---------------------------------------------------------------------------------|
| `id` | Automatically populated | Identifier of the subscriber inside the Akeneo Event Platform                   |
| `tenant_id` | Automatically populated | The tenant identifier (an Akeneo PIM identifier) of the subscriber-targeted PIM |
| `client_id` | From `X-PIM-CLIENT-ID` header parameter | The App/connection client_id that has been used to create the subscriber        |
| `name` | Populated by the user at creation | Name of the subscriber                                                          |
| `subject` | From `X-PIM-URL` header parameter | URL of the targeted source                                                      |
| `technical_email` | Populated by the user at creation | A contact email will be used to notify you in case of unexpected behavior       |
| `status` | Automatically populated | The subscriber status                                                           |

The statuses for a subscriber are:

| Status | Description |
| --- | --- |
| `active` | The destination will receive notifications for events tracked by the subscriber |
| `deleted` | The subscriber is inactive and cannot be reactivated |

### Link to subscriber API

For comprehensive details on managing subscribers, you can consult the complete API reference [here](/akeneo-event-platform/api-reference.html).



::: panel-link Now that you're familiar with the basic concepts, let's get started! [Next](/akeneo-event-platform/getting-started.html)
:::
