# Getting started

This guide provides a step-by-step walkthrough to help you send your reviews using the PX Insights API. By the end of this guide, you will have authenticated yourself, and triggered the synchronization of your reviews.

## Prerequisites

Before proceeding, ensure that you have an active <a href="https://api.akeneo.com/apps/overview.html#whats-an-akeneo-app" target="_blank">App</a> (it can be a <a href="https://api.akeneo.com/apps/create-custom-app.html" target="_blank">Custom App</a> or an active <a href="https://api.akeneo.com/getting-started/connect-the-pim-4x/step-1.html#you-said-connection" target="_blank">connection</a>) to an Akeneo PIM.

To learn how to create a connection, see the <a href="https://api.akeneo.com/documentation/authentication.html#client-idsecret-generation" target="_blank">Authentication Guide</a>. If you're setting up a custom App, follow the steps in <a href="https://api.akeneo.com/tutorials/how-to-get-your-app-token.html" target="_blank">this tutorial</a> to obtain an App token.

---

## Using Postman

The easiest way to manipulate the PX Insights API for a quickstart will be through our Postman Collection.

### 1. Import the Postman Collection

1. Download our <a href="https://storage.googleapis.com/akecld-prd-cipr-prd-api-assets/generated_postman_collection.json" target="_blank">Postman Collection</a>
2. Download our <a href="https://storage.googleapis.com/akecld-prd-cipr-prd-api-assets/postman_environment_template.json" target="_blank">Postman environment variable template</a>
3. Import those files into Postman (follow <a href="https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-data/" target="_blank">this guide</a> if you're not familiar with it)

### 2. Fill the environment variables

The collection comes with a pre-script to deal with the authentication specificities when using a PIM Connection.

Fill the environment variables with your PIM connection values, and it will automatically generate an `access_token` if the credentials you provide are valid.

![postman-collection.png](../img/px-insights/postman-collection.png)

### 3. Trigger the synchronization of your reviews

1. Select the Postman environment you've just created
2. Send a `Ingest reviews data asynchronously` POST request
3. Copy/Paste the reviews you want to ingest

---

## Using Curl

### 1. Retrieve your credentials from your targeted PIM

In this example, we will create a new `connection` in the PIM and use it to generate an `API token`.
:::

**1. Set Your Environment Variables:**
   - Define the Client ID, Secret, Username, Password, and Akeneo host URL as environment variables:

   ```bash [snippet:Shell]
    export CLIENT_ID="your-client-id"
    export CLIENT_SECRET="your-client-secret"
    export API_USERNAME="your-API-username"
    export API_PASSWORD="your-API-password"
    export TARGET_PIM_URL="https://your-pim.cloud.akeneo.com"
   ```
   Replace the placeholders with your actual credentials and host URL.

**2. Encode Your Credentials:**
   - Encode the Client ID and Secret in base64 format, separated by a colon `:`:
   ```bash [snippet:Shell]
    export BASE64_ENCODED_CLIENTID_AND_SECRET=$(echo -n "$CLIENT_ID:$CLIENT_SECRET" | base64 -w 0)
    // For Mac OS user remove the -w 0 option
   ```

**3. Your API Token:**
   - Make the API call to retrieve your `API token` using the environment variables:
   ```bash [snippet:Shell]
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
   ```bash [snippet:Shell]
    export PIM_API_TOKEN="..."
    // Replace with the actual token from the response
   ```

   ::: info
   ℹ️ Note that the token has a lifespan of one hour.
   :::

   ::: info
   🛠 You can also use a custom App if you like. As long as you have a `client_id` alongside an `API token`, you are good to go for the next step
   :::

### 2. Trigger the synchronization of your reviews

From the next steps we will use the PX Insights REST API: 'https://px-insights.app.akeneo.cloud/api/v1'

::: info
🛠 For every call to the PX Insights API, you will need the following headers: `X-PIM-URL`, `X-PIM-TOKEN` and `X-PIM-CLIENT-ID`.

You can post your reviews once you have a valid PIM API token. The API accepts review data in an asynchronous processing mode via the following endpoint:

```bash [snippet:Shell]
curl --request POST 'https://px-insights.app.akeneo.cloud/api/v1/reviews/ingest/async' \
 --header "X-PIM-URL: $TARGET_PIM_URL" \
 --header "X-PIM-TOKEN: $PIM_API_TOKEN" \
 --header "X-PIM-CLIENT-ID: $CLIENT_ID" \
 --header 'Content-Type: application/json' \
 --data-raw '{
  "product_identification": {
    "origin": "Yotpo",
    "metadata": {
      "sku": "product-123"
    }
  },
  "raw_reviews": [
    {
      "external_id": "review-001",
      "score": 5,
      "title": "Excellent product!",
      "text": "This product exceeded my expectations. The quality is outstanding and it works perfectly."
    },
    {
      "external_id": "review-002",
      "score": 3,
      "title": "Good but could be better",
      "text": "The product is good overall, but I had some issues with the packaging."
    }
  ]
}'
```

**Request Body Parameters:**

| Parameter                             | Type   | Description                                                               |
|--------------------------------------|--------|----------------------------------------------------------------------------|
| `product_identification`             | object | Information to identify the product associated with the reviews            |
| `product_identification.origin`      | string | Source identifier for the reviews (e.g., Yotpo, Amazon, your own website)  |
| `product_identification.metadata`    | object | Additional information to identify the product                             |
| `product_identification.metadata.sku`| string | Product SKU that these reviews are associated with                         |
| `raw_reviews`                        | array  | Collection of review objects to be ingested                                |
| `raw_reviews[].external_id`          | string | Unique identifier for the review in your system                            |
| `raw_reviews[].score`                | number | Rating score for the review (1–5)                                          |
| `raw_reviews[].title`                | string | Review title or headline                                                   |
| `raw_reviews[].text`                 | string | The full review content                                                    |

**Response:**

Upon successful submission, the API will acknowledge receipt of your reviews for asynchronous processing.

```json [snippet:Response]
{
  "message": "Reviews received for processing"
}
```

**Possible Error Responses:**

- `400 Bad Request`: Invalid request format or missing required fields
- `401 Unauthorized`: Invalid authentication credentials
- `403 Forbidden`: Not authorized to perform this action
- `500 Internal Server Error`: Server-side error, retry recommended

::: panel-link Let's see the API reference! [Next](/px-insights/api-reference.html)
:::
