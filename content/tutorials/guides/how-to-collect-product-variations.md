<a href="/tutorials/homepage.html" class="back-button">
   <button>
      <img src="/img/icons/icon--arrow-back.svg" style="margin-right: 10px;">
      All guided tutorials
   </button>
</a>

# How to collect product variations

<table class="tag-container">
    <tr>
        <td>Use case:</td>
        <td>
            <div class="tag-not-selectable">
                <div class="tag-color tag-color-light-blue"></div>
                <div class="tag-label">App Workflow</div>
            </div>
        </td>
    </tr>
    <tr>
        <td>PIM Features:</td>
        <td class="td-features">
            <div class="tag-not-selectable">
                <div class="tag-color tag-color-purple"></div>
                <div class="tag-label">Product Models</div>
            </div>
            <div class="tag-not-selectable">
                <div class="tag-color tag-color-light-green"></div>
                <div class="tag-label">Variant Products</div>
            </div>
        </td>
    </tr>
</table>

<div class="endpoint-container">
    <div class="endpoint-text">REST API endpoint(s):</div>
    <a href="/api-reference.html#get_products_uuid" class="endpoint-link" target="_blank" rel="noopener noreferrer">products</a>
    <a href="/api-reference.html#get_product_models" class="endpoint-link" target="_blank" rel="noopener noreferrer">product models</a>
    <a href="/api-reference.html#get_families__family_code__variants__code__" class="endpoint-link" target="_blank" rel="noopener noreferrer">family variants</a>
</div>

<div class="block-requirements">
    <div class="block-requirements-headline">
        If you're following our App workflow, make sure you previously read:
    </div>
    <div class="block-requirements-row">
        <img src="../../img/illustrations/illus--Attributegroup.svg" width="110px">
        <div class="block-requirements-steps">
            <ul>
                <li>Step 1. <a href="how-to-get-your-app-token.html" target="_blank" rel="noopener noreferrer">Get your App token tutorial</a></li>
                <li>Step 2. <a href="how-to-retrieve-pim-structure.html" target="_blank" rel="noopener noreferrer">How to retrieve PIM structure</a></li>
                <li>Step 3. <a href="how-to-get-families-and-attributes.html" target="_blank" rel="noopener noreferrer">How to get families and attributes</a></li>
                <li>Step 4. <a href="how-to-get-product-information.html" target="_blank" rel="noopener noreferrer">How to get product information</a></li>
            </ul>
        </div>
    </div>
</div>

## Context

In the PIM we handle product models and product variations.

![scheme_variants](../../img/tutorials/how-to-collect-product-variations/scheme_variants.png)

::: tips
Before digging into the code you can find out more about these concepts in our [helpcenter](https://help.akeneo.com/pim/serenity/articles/what-about-products-variants.html#about-products-with-variants).
:::

Here are quick definitions:

**A product model gathers products with many similarities but a few differences - these differences are called “variations” and are defined by an associated family variant.**

*Example: T-shirts with the same material (”wool”), brand (”a brand”), and weight (”16 grams”); but with different sizes and colors.*

**A product variant is associated with a product model. It contains the common attribute values of its product model plus values for variations.**

*Example: A t-shirt with material = ”whool”, brand = ”a brand”, weight = ”16 grams”, size = “XL”, and color = “blue*”.

And because a relation schema is worth a thousand words:

![scheme_model_and_variant](../../img/tutorials/how-to-collect-product-variations/scheme_model_and_variant.svg)

::: tips
Get the big picture <a href="/getting-started/synchronize-pim-products-6x/step-0.html" target="_blank" rel="noopener noreferrer">here</a>.
:::


## Collect product variations

### Workflow

![schema_product_models](../../img/tutorials/how-to-collect-product-variations/schema_product_models.svg)

In this tutorial, we will introduce you to the two use cases you may encounter for retrieving products with variations.

- **Use case 1**: Collect all product variation information, just as they are in the PIM (up to 2 possible levels)
- **Use case 2**: Collect all product variation information on 1 level only)

::: info
We noticed that many e-commerce solutions understand product variation on only one level. This means that for Akeneo a special recollection of the variations must be done to have them all on the same level.
:::

### 0 - Initialization

```php [activate:PHP]

$pimUrl = 'https://url-of-your-pim.com';
$appToken = 'your_app_token'; // Token provided during oAuth steps

// If you haven't done it yet, please follow the Guzzle official documentation for installing the client 
// https://docs.guzzlephp.org/en/stable/overview.html#installation

// Set your client for querying Akeneo API as follows
function buildApiClient(): GuzzleHttp\Client
{
    $pimUrl = '<PIM_URL>';
    $appToken = '<APP_TOKEN>'; // Token provided during oauth steps

    // If you haven't done it yet,
    // please follow the Guzzle official documentation to install the client
    // https://docs.guzzlephp.org/en/stable/overview.html#installation

    return new GuzzleHttp\Client([
        'base_uri' => $pimUrl,
        'headers' => ['Authorization' => 'Bearer ' . $appToken],
    ]);
}
```

### Use case 1: Collect product variation information - all levels

#### 1. Collect product models
##### 1.1 You are following the App workflow?

In the guided tutorial [**"How to get families and attributes"**](/tutorials/how-to-get-families-and-attributes.html), we have stored a **family_code_list**. It’s time to use it!

```php [activate:PHP]

function getProductModels(): array
{
    $client = buildApiClient();

    $maxProductsPerPage = 100;
    $maxFamiliesPerQuery = 3;
    $scope = 'ecommerce';

    // Get family $codes and locales from storage
    $familyCodes = getFamilyCodes();
    $locales = getLocales('fr');

    $familyCodeChunks = array_chunk($familyCodes, $maxFamiliesPerQuery);

    $apiUrl = '/api/rest/v1/product-models?'
        . 'locales=%s'
        . '&scope=%s'
        . '&search={"family":[{"operator":"IN","value":%s}]}'
        . '&limit=' . $maxProductsPerPage;


    // Collect product models from paginated API
    $productModels = [];
    foreach ($familyCodeChunks as $familyCodes) {
        $response = $client->get(sprintf($apiUrl, $locales, $scope, json_encode($familyCodes)));
        $data = json_decode($response->getBody()->getContents(), true);
        $productModels[] = $data['_embedded']['items'];
    }

    $productModels = array_merge(...$productModels);

    saveProductModels($productModels);
}

```

##### 1.2 You are not following the App workflow?
Simply get the attribute type by requesting the API

```php [activate:PHP]

function getProductModels(): array
{
    $client = buildApiClient();

    $maxProductsPerPage = 100;
    $scope = 'ecommerce';

    $apiUrl = '/api/rest/v1/product-models?'
        . '&scope=%s'
        . '&limit=' . $maxProductsPerPage;

    // Collect product models from paginated API
    $response = $client->get(sprintf($apiUrl, $scope));
    $data = json_decode($response->getBody()->getContents(), true);

    $productModels = [];
    $productModels[] = $data['_embedded']['items'];
    while (array_key_exists('next', $data['_links'])) {
        $response = $client->get($data['_links']['next']['href']);
        $data = json_decode($response->getBody()->getContents(), true);
        $productModels[] = $data['_embedded']['items'];
    }

    $productModels = array_merge(...$productModels);

    saveProductModels($productModels);
}

```

#### 2. Process product model
##### 2.1. Parse and store the product model
Parse and store a product or a product model is definitely the same thing. Please have a how to our guided tutorial [**"How to get product information"**](/tutorials/how-to-collect-products.html).

##### 2.2. Collect its family variant
###### 2.2.1 You are following the App workflow?

Good news: you already store the family variant in the guided tutorial [**"How to get families and attributes"**](/tutorials/how-to-get-families-and-attributes.html). Go ahead!

###### 2.2.2 You are not following the App workflow?
Query the API.

```php [activate:PHP]

function getFamilyVariants(): array
{
    $client = buildApiClient();

    $maxProductsPerPage = 100;
    $apiUrl = '/api/rest/v1/families/%s/variants?limit=' . $maxProductsPerPage;

    // Get family codes from storage
    $codes = getFamilyCodes();

    // Collect family variants from paginated API
    $variants = [];
    foreach ($codes as $code) {
        $response = $client->get(sprintf($apiUrl, $code));
        $data = json_decode($response->getBody()->getContents(), true);
        $variants[] = $data['_embedded']['items'];
    }

    $variants = array_merge(...$variants);

    // Save variants into storage
    saveVariants($variants);
}

```

##### 2.2. Collect its product variants

To get product variants associated to a product model, ask to the API

```php [activate:PHP]

function getProductVariants(): array
{
    $client = buildApiClient();

    $maxProductsPerPage = 100;
    $maxProductModelsPerQuery = 3;

    // Get product model codes from storage
    $productModelCodes = getProductModelCodes();

    $productModelCodesChunks = array_chunk($productModelCodes, $maxProductModelsPerQuery);

    $apiUrl = '/api/rest/v1/products-uuid?'
        . 'search={"parent":[{"operator":"IN","value":%s}]}'
        . '&limit=' . $maxProductsPerPage;

    // Collect product models from API
    $productVariants = [];
    foreach ($productModelCodesChunks as $productModelCodes) {
        $response = $client->get(sprintf($apiUrl, json_encode($productModelCodes)));
        $data = json_decode($response->getBody()->getContents(), true);
        $productVariants[] = $data['_embedded']['items'];
    }

    return array_merge(...$productVariants);
}

```

Again, treat each product like a simple product. Please refer to the guided tutorial [**“How to get product information”**](/tutorials/how-to-collect-products.html) 