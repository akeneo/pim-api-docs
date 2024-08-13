# Getting started

This guide will walk you through the essential steps to set up your environment, create subscriptions, and trigger events.

### Prerequisites

Before proceeding, ensure that you have an active App (it can be a custom App) or an active connection to an Akeneo PIM.

To learn how to create a connection, see the [Authentication Guide](/documentation/authentication.html#client-idsecret-generation). If you're setting up a custom App, follow the steps in [this tutorial](/tutorials/how-to-get-your-app-token.html#) to obtain an App token.

---

### Basic Use Case: Setting Up Event Subscriptions

This guide provides a step-by-step walkthrough to help you set up event subscriptions using the Akeneo Event Platform. By the end of this guide, you will have created a connection, authenticated your App, subscribed to events, and triggered an event from your PIM.

### 1. Retrieve your credentials from your targeted PIM

::: info
🛠 For every call to the API, you will need `X-PIM-TOKEN` & `X-PIM-CLIENT-ID` .

In this example, we will create a new `connection` in the PIM and use it to generate an `API token`.
:::

1. **Create a connection in Akeneo PIM:**
   - Navigate to **Connect** > **Connection settings** > **Create**.
   - Fill out the form to create the connection.
   - Note the generated `Client ID`, `Secret`, `Username`, and `Password`.
2. **Generate an API Token:**
   - Encode the `client ID` and `secret` in base64 format, separated by a colon (`:`).

    ```bash
    client_id:secret
    4gm4rnoizp8gskgkk080ssoo80040g44ksowwgw844k44sc00s:5dyvo1z6y34so4ogkgksw88ookoows00cgoc488kcs8wk4c40s
    ```

    ```makefile
    base64 encoded
    NGdtNHJub2l6cDhnc2tna2swODBzc29vODAwNDBnNDRrc293d2d3ODQ0azQ0c2MwMHM6NWR5dm8xejZ5MzRzbzRvZ2tna3N3ODhvb2tvb3dzMDBjZ29jNDg4a2NzOHdrNGM0MHM=
    ```

3. **Retrieve Your API Token:**
   - After that, you can make the API call to retrieve your `API token`

    ```json
    curl --request POST http://your-host/api/oauth/v1/token \
    --header "Content-Type: application/json" \
    --header "Authorization: Basic YOUR_BASE_64_CLIENT_ID_AND_SECRET" \
    --data-raw '{
        "grant_type": "password",
        "username": "your_API_username",
        "password": "its_password"
    }'
    ```

   You can check the official [token generation documentation](/documentation/authentication.html#token-generation) for further information.


::: info
ℹ️ Note that the token has a lifespan of one hour.

:::

::: info
🛠 You can also use a custom App if you like. As long as you have a `client_id` alongside an `API token`, you are good to go for the next step

:::

### 2. Create a Subscriber

After authentication, you can create a subscriber. A subscriber defines where events should be sent.

```json
curl --request POST 'https://event.prd.sdk.akeneo.cloud/api/v1/subscriber' \
--header 'X-PIM-URL: THE_TARGET_PIM_URL' \
--header 'X-PIM-TOKEN: YOUR_APP_OR_CONNECTION_TOKEN' \
--header 'X-PIM-CLIENT-ID: YOUR_APP_OR_CONNECTION_CLIENT_ID' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "example subscriber name",
    "contact": {
        "technical_email": "subscriber.test.email@example.com"
    }
}'
```

::: info
📌 You need to store the ID in the response payload. We will use it in the next step.

Response Example :

```json
{
    "id": "01905a84-a3b7-766e-a49f-5519c35fa7a0",
    "tenant_id": "pim_tenant",
    "client_id": "3444ec1b-058e-4208-9b6c-284f47a7aa17",
    "name": "subscriber name",
    "subject": "https://pim.cloud.akeneo.com",
    "status": "active",
    "contact": {
        "technical_email": "subscriber.email@example.com"
    },
    "created_at": "2024-06-27T16:26:00.503422Z",
    "updated_at": "2024-06-27T16:26:00.503422Z"
},
```

:::

### 3. Create a Subscription

With a subscriber in place, the next step is to create a subscription to specify which events you want to receive.

In this example, we will use an HTTPS destination (HTTPS is mandatory for secure communication).

To create a subscription, you will need a destination URL.

::: info
💡 You don’t have to worry about the secret part of the configuration for now, they are used to sign the payload (more information below in the API presentation section)

:::

```json
curl --request POST 'https://event.prd.sdk.akeneo.cloud/api/v1/subscriber/$subscriber_Id}/subscription' \
--header 'X-PIM-URL: THE_TARGET_PIM_URL' \
--header 'X-PIM-TOKEN: YOUR_APP_OR_CONNECTION_TOKEN' \
--header 'X-PIM-CLIENT-ID: YOUR_APP_OR_CONNECTION_CLIENT_ID' \
--header 'Content-Type: application/json' \
--data-raw '{
    "source": "pim",
    "subject": "THE_TARGET_PIM_URL",
    "events": [
        "com.akeneo.pim.v1.product.updated"
    ],
    "type": "https",
    "config": {
        "url": "YOUR_DESTINATION_URL",
        "secret": {
            "primary": "averysecretprimarysecret",
            "secondary": "you can leave empty here, only use to ease your secret rotation use cases"
        }
    }
}'
```

::: info
📌 Don’t forget to change the `subscriber_id` in the URL to use the one you created in the precedent step.

:::

### 4. Trigger an Event from the PIM

With your subscription in place, you're ready to trigger the event you subscribed to (in this example, `product_updated`). The simplest way to do this is by updating a product directly within the Akeneo PIM UI. This approach allows you to manually trigger the event and observe the changes in real-time.

Alternatively, you can also update a product using the [Akeneo PIM REST API](/api-reference.html#post_products_uuid) if you prefer an automated approach.

After the product is updated, verify that the event was successfully triggered by checking the payload received at your destination URL.

::: panel-link Let's see the API reference! [Next](/akeneo-event-platform/api-reference.html)
:::
