# Getting started

This guide will walk you through the essential steps to set up your environment, create subscriptions, and trigger events.

### Prerequisites

Before proceeding, ensure that you have an active [App](https://api.akeneo.com/apps/overview.html#whats-an-akeneo-app) (it can be a [Custom App](https://api.akeneo.com/apps/create-custom-app.html)) or an active [connection](https://api.akeneo.com/getting-started/connect-the-pim-4x/step-1.html#you-said-connection) to an Akeneo PIM.

To learn how to create a connection, see the [Authentication Guide](/documentation/authentication.html#client-idsecret-generation). If you're setting up a custom App, follow the steps in [this tutorial](/tutorials/how-to-get-your-app-token.html#) to obtain an App token.

---

### Basic Use Case: Setting Up Event Subscriptions

This guide provides a step-by-step walkthrough to help you set up event subscriptions using the Akeneo Event Platform. By the end of this guide, you will have created a connection, authenticated your App, subscribed to events, and triggered an event from your PIM.

### 1. Retrieve your credentials from your targeted PIM

::: info
🛠 For every call to the API, you will need `X-PIM-TOKEN` & `X-PIM-CLIENT-ID`.

In this example, we will create a new `connection` in the PIM and use it to generate an `API token`.
:::

1. **Create a connection in Akeneo PIM:**
   - Navigate to **Connect** > **Connection settings** > **Create**.
   - Fill out the form to create the connection.
   - Note the generated `Client ID`, `Secret`, `Username`, and `Password`.

2. **Set Your Environment Variables:**
   - Define the Client ID, Secret, Username, Password, and Akeneo host URL as environment variables:

    ```bash
    export CLIENT_ID="your-client-id"
    export CLIENT_SECRET="your-client-secret"
    export API_USERNAME="your-API-username"
    export API_PASSWORD="your-API-password"
    export TARGET_PIM_URL="https://your-pim.cloud.akeneo.com"
    ```
   Replace the placeholders with your actual credentials and host URL.

3. **Encode Your Credentials:**
   - Encode the Client ID and Secret in base64 format, separated by a colon (:):
   ```bash
   export BASE64_ENCODED_CLIENTID_AND_SECRET=$(echo -n "$CLIENT_ID:$CLIENT_SECRET" | base64 -w 0)
   ```

4. **Retrieve Your API Token:**
   - Make the API call to retrieve your `API token` using the environment variables:

    ```bash
   curl --request POST "$TARGET_PIM_URL/api/oauth/v1/token" \
   --header "Content-Type: application/json" \
   --header "Authorization: Basic $BASE64_ENCODED_CLIENTID_AND_SECRET" \
   --data-raw '{
   "grant_type": "password",
   "username": "'"$API_USERNAME"'",
   "password": "'"$API_PASSWORD"'"
   }'
    ```
   After retrieving the API token, store the `access_token` from the response in an environment variable:
   ```bash
   export PIM_API_TOKEN="..."  # Replace with the actual token from the response
   ````

   ::: info
   ℹ️ Note that the token has a lifespan of one hour.
   :::
   
   ::: info
   🛠 You can also use a custom App if you like. As long as you have a `client_id` alongside an `API token`, you are good to go for the next step
   :::

### 2. Create a Subscriber

You can create a subscriber once you have a valid PIM API token. A subscriber is an entity to which all of your subscriptions will be attached.

The `technical_email` is used to send emails about the subscription status (`deleted`, `suspended`, `revoked`)
```bash
curl --request POST 'https://event.prd.sdk.akeneo.cloud/api/v1/subscriber' \
--header "X-PIM-URL: $TARGET_PIM_URL" \
--header "X-PIM-TOKEN: $PIM_API_TOKEN" \
--header "X-PIM-CLIENT-ID: $CLIENT_ID" \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "example subscriber name",
    "contact": {
        "technical_email": "subscriber.test.email@example.com"
    }
}'
```

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
}
```
After creating the subscriber, store the ID from the response in an environment variable:
```bash
export SUBSCRIBER_ID="01905a84-a3b7-766e-a49f-5519c35fa7a0"  # Replace with the actual ID from the response
```

### 3. Create a Subscription

With a subscriber in place, the next step is to create a subscription to specify which events you want to receive.
In this example, we will use an HTTPS destination (HTTPS is mandatory for secure communication).
To create a subscription, you will need a destination URL.

```bash
export DESTINATION_URL="https://my-destination-url.com"  # Replace with your destination URL
```

::: info
💡 You don’t have to worry about the secret part of the configuration for now, they are used to sign the payload (more information below in the API presentation section)
:::

```bash
curl --request POST "https://event.prd.sdk.akeneo.cloud/api/v1/subscriber/$SUBSCRIBER_ID/subscription" \
--header "X-PIM-URL: $TARGET_PIM_URL" \
--header "X-PIM-TOKEN: $PIM_API_TOKEN" \
--header "X-PIM-CLIENT-ID: $CLIENT_ID" \
--header 'Content-Type: application/json' \
--data-raw '{
    "source": "pim",
    "subject": "'"$TARGET_PIM_URL"'",
    "events": [
        "com.akeneo.pim.v1.product.updated"
    ],
    "type": "https",
    "config": {
        "url": "'"$DESTINATION_URL"'",
        "secret": {
            "primary": "averysecretprimarysecret",
            "secondary": "you can leave empty here, only use to ease your secret rotation use cases"
        }
    }
}'
```

### 4. Trigger an Event from the PIM

With your subscription in place, you're ready to trigger the event you subscribed to (in this example, `com.akeneo.pim.v1.product.updated`). The simplest way to do this is by updating a product directly within the Akeneo PIM UI. This approach allows you to trigger the event and manually observe the changes in real time.

Alternatively, you can also update a product using the [Akeneo PIM REST API](/api-reference.html#post_products_uuid) if you prefer an automated approach.

After updating the product, verify that the event was successfully triggered by checking the payload received at your destination URL.

::: panel-link Let's see the API reference! [Next](/akeneo-event-platform/api-reference.html) 
:::
