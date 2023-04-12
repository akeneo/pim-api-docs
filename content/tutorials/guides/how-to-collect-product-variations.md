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
        <img src="../../img/illustrations/illus--Attributegroup.svg" width="110px" class="hidden-xs">
        <div class="block-requirements-steps">
            <div>Step 1. <a href="how-to-get-your-app-token.html" target="_blank" rel="noopener noreferrer">Get your App token tutorial</a></div>
            <div>Step 2. <a href="how-to-retrieve-pim-structure.html" target="_blank" rel="noopener noreferrer">How to retrieve PIM structure</a></div>
            <div>Step 3. <a href="how-to-get-families-and-attributes.html" target="_blank" rel="noopener noreferrer">How to get families, family variants, and attributes</a></div>
            <div>Step 4. <a href="how-to-get-pim-product-information.html" target="_blank" rel="noopener noreferrer">How to get PIM product information</a></div>
        </div>
    </div>
</div>

## Context

In the PIM we handle product models and product variations.

![scheme_variants](../../img/tutorials/how-to-collect-product-variations/scheme_variants.png)

::: tips
Before digging into the code you can find out more about these concepts in our <a href="https://help.akeneo.com/pim/serenity/articles/what-about-products-variants.html#about-products-with-variants" target="_blank" rel="noopener noreferrer">helpcenter</a>
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
**Use case 2**
<br>
We noticed that many e-commerce solutions understand product variation on only one level. This means that for Akeneo **a special recollection of the variations must be done to have them all on the same level.**
:::

### 0 - Initialization

```php [activate:PHP]

function buildApiClient(): GuzzleHttp\Client
{
    $pimUrl = 'https://url-of-your-pim.com';
    $appToken = 'your_app_token'; // Token provided during oAuth steps

    // If you haven't done it yet,
    // please follow the Guzzle official documentation to install the client
    // https://docs.guzzlephp.org/en/stable/overview.html#installation

    return new GuzzleHttp\Client([
        'base_uri' => $pimUrl,
        'headers' => ['Authorization' => 'Bearer ' . $appToken],
    ]);
}

```
```javascript [activate:NodeJS]

// Install the node-fetch library by following the official documentation:
// https://www.npmjs.com/package/node-fetch
import fetch from 'node-fetch';

const pimUrl = 'https://url-of-your-pim.com';
const accessToken = 'your_app_token'; // Token provided during oAuth steps

// Set your client for querying Akeneo API as follows
async function get(url, accessToken) {
    return await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}
```

### Use case 1: Collect product variation information - all levels

#### 1. Collect product models
##### 1.1 You are following the App workflow?

In the guided tutorial <a href="/tutorials/how-to-get-families-and-attributes.html" target="_blank" rel="noopener noreferrer">How to get families, family variants, and attributes</a>, we have stored a **family_code_list**. It’s time to use it!

```php [activate:PHP]

$client = buildApiClient();

$maxProductsPerPage = 100;
$maxFamiliesPerQuery = 10;
$scope = 'ecommerce';

// Get family codes from storage
$familyCodes = getFamilyCodes();

// Get locales from storage
$locales = getLocales(); // ['en_US', 'fr_FR']

$familyCodeChunks = array_chunk($familyCodes, $maxFamiliesPerQuery);

$apiUrl = '/api/rest/v1/product-models?'
    . 'locales=%s'
    . '&scope=%s'
    . '&search={"family":[{"operator":"IN","value":%s}]}'
    . '&limit=%s';


// Collect product models from API
$productModels = [];
foreach ($familyCodeChunks as $familyCodes) {
    $response = $client->get(
        sprintf(
            $apiUrl,
            implode(',', $locales),
            $scope,
            json_encode($familyCodes),
            $maxProductsPerPage
        )
    );
    $data = json_decode($response->getBody()->getContents(), true);
    $productModels[] = $data['_embedded']['items'];
}

$productModels = array_merge(...$productModels);

// Save product models into storage
storeProductModels($productModels);
```
```javascript [activate:NodeJS]

const maxProductsPerPage = 100;
const maxFamiliesPerQuery = 10;
const scope = 'ecommerce';

// Get family codes from storage
const familyCodes = await getFamilyCodes();
// Get locales from storage
const locales = await getlocales(); // ['en_US', 'fr_FR']

// split familyCodes in chucks of $maxFamiliesPerQuery elements
const chunks = [];
while (familyCodes.length > 0) {
    chunks.push(familyCodes.splice(0, maxFamiliesPerQuery));
}

const productModels = [];
for (const chunk of chunks) {
    const response = await get(`${pimUrl}/`
        + `api/rest/v1/product-models?`
        + `&locales=${locales.join(',')}`
        + `&scope=${scope}`
        + `&search={"family":[{"operator":"IN","value":${JSON.stringify(chunk)}}]}`
        + `&limit=${maxProductsPerPage}`,
        accessToken);
    const data = await response.json();
    const newProductModels = data['_embedded']['items'];
    productModels.push(...newProductModels);
}

// Save product models into storage
storeProductModels(productModels);
```

##### 1.2 You are not following the App workflow?
Simply get the attribute type by requesting the API

```php [activate:PHP]

$client = buildApiClient();

$maxProductsPerPage = 100;
$scope = 'ecommerce';

$nextUrl = sprintf(
    '/api/rest/v1/product-models?'
    . '&scope=%s'
    . '&limit=%s',
    $scope,
    $maxProductsPerPage,
);

$productModels = [];
do {
    // Collect product models from API
    $response = $client->get($nextUrl);
    $data = json_decode($response->getBody()->getContents(), true);
    $productModels[] = $data['_embedded']['items'];

    $nextUrl = $data['_links']['next']['href'] ?? null;
} while (
    $nextUrl
);

$productModels = array_merge(...$productModels);

// Save product models into storage
storeProductModels($productModels);
```
```javascript [activate:NodeJS]

const maxProductsPerPage = 100;
const scope = 'ecommerce';

let nextUrl = `${pimUrl}/api/rest/v1/product-models?`
    + `&scope=${scope}`
    + `&limit=${maxProductsPerPage}`;

const productModels = [];

do {
    // Collect product models from paginated API
    const response = await get(nextUrl, accessToken);
    const data = await response.json();
    const newProductModels = data['_embedded']['items'];
    productModels.push(...newProductModels);

    nextUrl = data._links?.next?.href;
} while (nextUrl)

// Save product models into storage
storeProductModels(productModels);
```

Example output:
```php [activate:PHP]

var_export($productModels);

// Output
[
    [
        "_links" => [...],
        "code" => "Acme Classic Mens Black PVC Work Boots",
        "family" => "rubber_boots",
        "family_variant" => "rubber_boots_by_size",
        "parent" => null,
        "categories" => [
            "acme",
            "master_clothing_footwear_footwear_rubber_boots"
        ],
        "values" => [...],
        "created" => "2022-10-20T12:46:42+00:00",
        "updated" => "2022-10-20T13:14:04+00:00",
        "associations" => [...],
        "quantified_associations" => [],
        "metadata" => [
            "workflow_status" => "working_copy"
        ],
    ],
    /* ... */
]; 
```
```javascript [activate:NodeJS]

console.log(productModels);

// Output
[
    {
        "_links":{...},
        "code":"Acme Classic Mens Black PVC Work Boots",
        "family":"rubber_boots",
        "family_variant":"rubber_boots_by_size",
        "parent":null,
        "categories":[
            "acme",
            "master_clothing_footwear_footwear_rubber_boots"
        ],
        "values":{...},
        "created":"2022-10-20T12:46:42+00:00",
        "updated":"2022-10-20T13:14:04+00:00",
        "associations":{...},
        "quantified_associations":[],
        "metadata":{
            "workflow_status":"working_copy"
        }
    },
    /* ... */
]
```


#### 2. Process product model
##### 2.1. Parse and store the product model
Parse and store a product or a product model is definitely the same thing. Please have a how to our guided tutorial <a href="/tutorials/how-to-get-families-and-attributes.html" target="_blank" rel="noopener noreferrer">How to get families, family variants, and attributes</a>.

##### 2.2. Collect its family variant
###### 2.2.1 You are following the App workflow?

Good news: you already store the family variant in the guided tutorial <a href="/tutorials/how-to-get-families-and-attributes.html" target="_blank" rel="noopener noreferrer">How to get families, family variants, and attributes</a>. Go ahead!

###### 2.2.2 You are not following the App workflow?
Query the API.

```php [activate:PHP]

$client = buildApiClient();

$maxProductsPerPage = 100;
$apiUrl = '/api/rest/v1/families/%s/variants?limit=%s';

// Get family codes from storage
$codes = getFamilyCodes();

// Collect family variants from API
$familyVariants = [];
foreach ($codes as $code) {
    $nextUrl = sprintf($apiUrl, $code, $maxProductsPerPage);
    do {
        // Collect family variants from API
        $response = $client->get($nextUrl);
        $data = json_decode($response->getBody()->getContents(), true);
        $familyVariants[] = $data['_embedded']['items'];

        $nextUrl = $data['_links']['next']['href'] ?? null;
    } while (
        $nextUrl
    );
}

$familyVariants = array_merge(...$familyVariants);

// add index to $familyVariants
$indexedFamilyVariants = [];
foreach ($familyVariants as $familyVariant) {
    $indexedFamilyVariants[$familyVariant['code']] = $familyVariant;
}

// Save family variants into storage
storeFamilyVariants($indexedFamilyVariants);
```
```javascript [activate:NodeJS]

const maxProductsPerPage = 100;

// Get family codes from storage
const familyCodes = await getFamilyCodes();

let familyVariants = [];
for (const code of familyCodes) {
    let nextUrl = `${pimUrl}/api/rest/v1/families/${code}/variants?limit=` + maxProductsPerPage;
    do {
        // Collect family variants from API
        const response = await get(nextUrl, accessToken);
        const data = await response.json();
        const newVariants = data['_embedded']['items'];
        familyVariants.push(...newVariants);

        nextUrl = data._links?.next?.href;
    } while (nextUrl)
}

// add index to familyVariants
let indexedFamilyVariants = {};
for (const familyVariant of familyVariants) {
    indexedFamilyVariants[familyVariant['code']] = familyVariant;
}

// Save family variants into storage
storeFamilyVariants(indexedFamilyVariants);
```

##### 2.2. Collect its product variants

To get product variants associated to a product model, ask to the API

```php [activate:PHP]

$client = buildApiClient();

$maxProductsPerPage = 100;
$maxProductModelsPerQuery = 10;

// Get product model codes from storage
$productModelCodes = getProductModelCodes();

$productModelCodesChunks = array_chunk($productModelCodes, $maxProductModelsPerQuery);

$apiUrl = '/api/rest/v1/products-uuid?'
    . 'search={"parent":[{"operator":"IN","value":%s}]}'
    . '&limit=%s';

// Collect product models from API
$productVariants = [];
foreach ($productModelCodesChunks as $productModelCodes) {
    $response = $client->get(sprintf($apiUrl, json_encode($productModelCodes), $maxProductsPerPage));
    $data = json_decode($response->getBody()->getContents(), true);
    $productVariants[] = $data['_embedded']['items'];
}

$productVariants = array_merge(...$productVariants);
```
```javascript [activate:NodeJS]

const maxProductsPerPage = 100;
const maxProductModelsPerQuery = 10;

// Get product model codes from storage
const productModelCodes = await getProductModelCodes();

// split productModelCodes in chucks of $maxFamiliesPerQuery elements
const chunks = [];
while (productModelCodes.length > 0) {
    chunks.push(productModelCodes.splice(0, maxProductModelsPerQuery));
}

const productVariants = [];
for (const chunk of chunks) {
    const response = await get(`${pimUrl}/`
        + `api/rest/v1/products-uuid?`
        + `&search={"parent":[{"operator":"IN","value":${JSON.stringify(chunk)}}]}`
        + `&limit=${maxProductsPerPage}`,
        accessToken);
    const data = await response.json();
    const newProductVariants = data['_embedded']['items'];
    productVariants.push(...newProductVariants);
}
```

Again, treat each product like a simple product. Please refer to the guided tutorial <a href="/tutorials/how-to-get-families-and-attributes.html" target="_blank" rel="noopener noreferrer">How to get families, family variants, and attributes</a>

### Use case 2: Collect product variation information - set it all on 1 level

#### 1. Collect product models

##### 1.1 You are following the App workflow?

In the guided tutorial <a href="/tutorials/how-to-get-families-and-attributes.html" target="_blank" rel="noopener noreferrer">How to get families, family variants, and attributes</a>, we have stored a **family_code_list**. It’s time to use it!

```php [activate:PHP]

$client = buildApiClient();

$maxProductsPerPage = 100;
$maxFamiliesPerQuery = 10;
$scope = 'ecommerce';

// Get family codes from storage
$familyCodes = getFamilyCodes();
// Get locales from storage
$locales = getLocales(); // ['en_US', 'fr_FR']

$familyCodeChunks = array_chunk($familyCodes, $maxFamiliesPerQuery);

$apiUrl = '/api/rest/v1/product-models?'
    . 'locales=%s'
    . '&scope=%s'
    . '&search={"family":[{"operator":"IN","value":%s}],"parent":[{"operator":"EMPTY"}]}'
    . '&limit=%s';


// Collect product models from API
$productModels = [];
foreach ($familyCodeChunks as $familyCodes) {
    $response = $client->get(
        sprintf(
            $apiUrl,
            implode(',', $locales),
            $scope,
            json_encode($familyCodes),
            $maxProductsPerPage
        )
    );
    $data = json_decode($response->getBody()->getContents(), true);
    $productModels[] = $data['_embedded']['items'];
}

$productModels = array_merge(...$productModels);

// Get family variants from storage
$familyVariants = getFamilyVariants();
foreach ($productModels as $key => $productModel) {
    $familyVariant = $familyVariants[$productModel['family_variant']];
    // extract all variations level
    $axes = array_column($familyVariant['variant_attribute_sets'], 'axes');
    // build flat axes
    $productModels[$key]['axes'] = array_merge(...$axes);
}

// Save product models into storage
storeProductModels($productModels);
```
```javascript [activate:NodeJS]

const maxProductsPerPage = 100;
const maxFamiliesPerQuery = 10;
const scope = 'ecommerce';

// Get family codes from storage
const familyCodes = await getFamilyCodes();
// Get locales from storage
const locales = await getlocales(); // ['en_US', 'fr_FR']

// split familyCodes in chucks of $maxFamiliesPerQuery elements
const chunks = [];
while (familyCodes.length > 0) {
    chunks.push(familyCodes.splice(0, maxFamiliesPerQuery));
}

const productModels = [];
for (const chunk of chunks) {
    const response = await get(`${pimUrl}/`
        + `api/rest/v1/product-models?`
        + `&locales=${locales.join(',')}`
        + `&scope=${scope}`
        + `&search={"family":[{"operator":"IN","value":${JSON.stringify(chunk)}}],"parent":[{"operator":"EMPTY"}]}`
        + `&limit=${maxProductsPerPage}`,
        accessToken);
    const data = await response.json();
    const newProductModels = data['_embedded']['items'];
    productModels.push(...newProductModels);
}

// Get variants from storage
const variants = await getFamilyVariants();
let productModelsWithAxes = [];
for (const productModel of productModels) {
    for (const [code, variant] of Object.entries(variants)) {
        if (productModel['family_variant'] === code) {
            // extract all variations level
            productModelsWithAxes.push(
                {...productModel, 'axes': variant['variant_attribute_sets'].map((value) => value.axes).flat()}
            );
        }
    }
}

// Save product models into storage
storeProductModels(productModelsWithAxes);
```

##### 1.2 - You are not following the App workflow?

::: warning
Make sure to get the list of your family variants before continuing like in  <a href="/tutorials/how-to-get-families-and-attributes.html" target="_blank" rel="noopener noreferrer">How to get families, family variants, and attributes</a>
:::

```php [activate:PHP]

$client = buildApiClient();

$maxProductsPerPage = 100;
$scope = 'ecommerce';

$nextUrl = sprintf(
    '/api/rest/v1/product-models?'
    . '&scope=%s'
    . '&search={"parent":[{"operator":"EMPTY"}]}'
    . '&limit=%s',
    $scope,
    $maxProductsPerPage,
);

// Collect product models from API
$productModels = [];
do {
    // Collect product models from API
    $response = $client->get($nextUrl);
    $data = json_decode($response->getBody()->getContents(), true);
    $productModels[] = $data['_embedded']['items'];

    $nextUrl = $data['_links']['next']['href'] ?? null;
} while (
    $nextUrl
);

$productModels = array_merge(...$productModels);

// Get family variants from storage
$familyVariants = getFamilyVariants();
foreach ($productModels as $key => $productModel) {
    $familyVariant = $familyVariants[$productModel['family_variant']];
    // extract all variations level
    $axes = array_column($familyVariant['variant_attribute_sets'], 'axes');
    // build flat axes
    $productModels[$key]['axes'] = array_merge(...$axes);
}

// Save product models into storage
storeProductModels($productModels);
```
```javascript [activate:NodeJS]

const maxProductsPerPage = 100;
const scope = 'ecommerce';

let nextUrl = `${pimUrl}/api/rest/v1/product-models?`
    + `&scope=${scope}`
    + `&search={"parent":[{"operator":"EMPTY"}]}`
    + `&limit=${maxProductsPerPage}`;

const productModels = [];

do {
    // Collect product models from paginated API
    const response = await get(nextUrl, accessToken);
    const data = await response.json();
    const newProductModels = data['_embedded']['items'];
    productModels.push(...newProductModels);

    nextUrl = data._links?.next?.href;
} while (nextUrl)

// Get variants from storage
const variants = await getFamilyVariants();
let productModelsWithAxes = [];
for (const productModel of productModels) {
    for (const [code, variant] of Object.entries(variants)) {
        if (productModel['family_variant'] === code) {
            // extract all variations level
            productModelsWithAxes.push({...productModel, 'axes': variant['variant_attribute_sets'].map((value) => value.axes).flat()});
        }
    }
}

// Save product models into storage
storeProductModels(productModelsWithAxes);
```

Example output:
```php [activate:PHP]

var_export($productModels);

// Output
[
    [
        "_links" => [...],
        "code" => "Acme Classic Mens Black PVC Work Boots",
        "family" => "rubber_boots",
        "family_variant" => "rubber_boots_by_size",
        "parent" => null,
        "categories" => [
            "acme",
            "master_clothing_footwear_footwear_rubber_boots"
        ],
        "values" => [...],
        "created" => "2022-10-20T12:46:42+00:00",
        "updated" => "2022-10-20T13:14:04+00:00",
        "associations" => [...],
        "quantified_associations" => [],
        "metadata" => [
            "workflow_status" => "working_copy"
        ],
        "axes" => ["shoe_size"]
    ],
    /* ... */
]; 
```
```javascript [activate:NodeJS]

console.log(productModels);

// Output
[
    {
        "_links":{...},
        "code":"Acme Classic Mens Black PVC Work Boots",
        "family":"rubber_boots",
        "family_variant":"rubber_boots_by_size",
        "parent":null,
        "categories":[
            "acme",
            "master_clothing_footwear_footwear_rubber_boots"
        ],
        "values":{...},
        "created":"2022-10-20T12:46:42+00:00",
        "updated":"2022-10-20T13:14:04+00:00",
        "associations":{...},
        "quantified_associations":[],
        "metadata":{
            "workflow_status":"working_copy"
        },
        "axes":["shoe_size"]
    },
    /* ... */
]
```

#### 2. Process product model

##### 2.1. Parse and store the product model

Parse and store the product model like in [**2.1. Parse and store the product model**](/tutorials/how-to-collect-product-variations.html#21-parse-and-store-the-product-model)

##### 2.2. Collect its product variants

Collect product variants the same way than in [**2.2. Collect its product variants**](/tutorials/how-to-collect-product-variations.html#22-collect-its-product-variants)

<div class="block-next-steps block-next-steps-alt">
    <img src="/img/illustrations/illus--Attribute.svg" width="140px" class="hidden-xs">
    <div class="block-next-steps-column">
        <div class="block-next-steps-title">Next Step</div>
        <div class="block-next-steps-text">Well done! Keep digging into the “App workflow” and follow the next tutorial!</div>
        <div>
            <ul>
                <li><a href="/tutorials/how-to-get-pim-category-tree.html">How to get PIM category tree</a></li>
            </ul>
        </div>
    </div>
</div>
