<a href="/tutorials/homepage.html" class="back-button">
   <button>
      <img src="/img/icons/icon--arrow-back.svg" style="margin-right: 10px;">
      All guided tutorials
   </button>
</a>

# How to get families, family variants, and attributes

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
                <div class="tag-color tag-color-orange"></div>
                <div class="tag-label">Attributes</div>
            </div>
            <div class="tag-not-selectable">
                <div class="tag-color tag-color-pink"></div>
                <div class="tag-label">Families</div>
            </div>
        </td>
    </tr>
</table>

<div class="endpoint-container">
    <div class="endpoint-text">REST API endpoint(s):</div>
    <a href="/api-reference.html#get_families" class="endpoint-link" target="_blank" rel="noopener noreferrer">family</a>
    <a href="/api-reference.html#Familyvariants" class="endpoint-link" target="_blank" rel="noopener noreferrer">family variants</a>
    <a href="/api-reference.html#Attribute" class="endpoint-link" target="_blank" rel="noopener noreferrer">attributes</a>
</div>

<div class="block-requirements">
    <div class="block-requirements-headline">
        If you're starting to build your App, make sure you previously followed:
    </div>
    <div class="block-requirements-row">
        <img src="../../img/illustrations/illus--Attributegroup.svg" width="110px" class="hidden-xs">
        <div class="block-requirements-steps">
            <div>Step 1. <a href="how-to-get-your-app-token.html" target="_blank" rel="noopener noreferrer">Get your App token tutorial</a></div>
            <div>Step 2. <a href="how-to-retrieve-pim-structure.html" target="_blank" rel="noopener noreferrer">How to retrieve PIM structure</a></div>
        </div>
    </div>
</div>

## Context

Families and attributes are the basis of an Akeneo catalog structure: get them before retrieving the products from the PIM.

::: info
If you plan to get product variants and their corresponding models, we advise you to retrieve now the associated family variants.
:::

![relationship schema](../../img/getting-started/synchronize-pim-products/step-2-objects-relationship-schema.svg)

::: tips
Get the big picture <a href="/getting-started/synchronize-pim-products-6x/step-0.html" target="_blank" rel="noopener noreferrer">here</a>.
:::

## Fetch the catalog structure: families and attributes

### Workflow

![relationship schema](../../img/getting-started/synchronize-pim-products/step-2-steps-schema.svg)

### 0 - Initialization

```php [activate:PHP]

function buildApiClient(): GuzzleHttp\Client
{
    $pimUrl = 'https://url-of-your-pim.com';
    $appToken = 'your_app_token'; // Token provided during oAuth steps

    // If you haven't done it yet,
    // please follow the Guzzle official documentation to install the client 
    // https://docs.guzzlephp.org/en/stable/overview.html#installation

    // Set your client for querying Akeneo API as follows
    $client = new \GuzzleHttp\Client([
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

### 1 - Collect families and attribute codes

Get families and attribute codes by requesting the PIM API

```php [activate:PHP]

$client = buildApiClient();

const MAX_ITEMS = 100;

$nextUrl = '/api/rest/v1/families?search={"has_products":[{"operator":"=","value":true}]}&limit=' . MAX_ITEMS;

$families = $attributeCodes = [];
do {
    // Collect families and list of unique attribute codes from API
    $response = $client->get($nextUrl);
    $data = json_decode($response->getBody()->getContents(), true);
    $families[] = $data['_embedded']['items'];
    $attributeCodes = array_merge(
        $attributeCodes,
        ...array_column($data['_embedded']['items'], 'attributes'));

    $nextUrl = $data['_links']['next']['href'] ?? null;
} while (
    $nextUrl
);

$families = array_merge(...$families);

$attributeCodes = array_unique($attributeCodes);

// Save families and attribute codes into storage
storeFamilies($families);
storeAttributesCodes($attributeCodes);
```

```javascript [activate:NodeJS]

const maxItems = 100;
let nextUrl = `${pimUrl}/api/rest/v1/families?search={"has_products":[{"operator":"=","value":true}]}&limit=${maxItems}`;

const families = [];
do {
    const response = await get(nextUrl, accessToken);
    const data = await response.json();
    const newFamilies = data['_embedded']['items']
    families.push(...newFamilies);

    nextUrl = data._links?.next?.href;
} while (nextUrl)

// Collect attributes from all families
const attributeCodes = families.reduce(
    (acc, family) => [...acc, ...family.attributes],
    []
);

const uniqueAttributes = [...new Set(attributeCodes)];

// Save families and attribute codes into storage
storeFamilies(families);
storeAttributeCodes(uniqueAttributes);
```

Store family codes in a <b>family_code_list</b> and attribute codes in a separate list (<b>attribute_code_list</b>). We will deal with <b>attribute_code_list</b> later in this tutorial.

::: tips
Warning! with the API call GET api/rest/v1/families, you will collect <b>all the families into the database</b>! Please ask yourself this question before continuing: <i>Do I really need all of them?</i> 
At this step, it’s the perfect occasion to save time later, during products synchronization. We strongly advise you to <b>filter your families</b> as much as you can before building family_code_list and attribute_code_list.<br> 
👉 One way to do this is <a href="/documentation/filter.html#by-family-codes" target="_blank" rel="noopener noreferrer">the family codes filter</a>
:::

### 2 - Collect family variants
::: info
This step is mandatory if you want to synchronize product variants later. If not, jump to the third step.
:::

Get family variants by requesting the PIM API for each families

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
    let nextUrl = `${pimUrl}/api/rest/v1/families/${code}/variants?limit=${maxProductsPerPage}`;
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


### 3 - Collect attributes

Remember your <b>attribute_code_list</b>? It’s (already) time to use it to retrieve attribute information

```php [activate:PHP]

$client = buildApiClient();

const MAX_ITEMS = 100;
const API_URL = '/api/rest/v1/attributes?search={"code":[{"operator":"IN","value":%s}]}&limit=%s';

// Get attributes codes from storage
$attributeCodes = getAttributesCodes();

// Collect attributes from API
$rawAttributes = [];
foreach (array_chunk($attributeCodes, MAX_ITEMS) as $chunk) {
    $response = $client->get(sprintf(API_URL, json_encode($chunk), MAX_ITEMS));
    $data = json_decode($response->getBody()->getContents(), true);
    $rawAttributes[] = $data['_embedded']['items'];
}

$rawAttributes = array_merge(...$rawAttributes);

// Only keep fields needed
$attributes = [];
foreach ($rawAttributes as $rawAttribute) {
    $attributes[$rawAttribute['code']] = [
        'code' => $rawAttribute['code'],
        'type' => $rawAttribute['type'],
        // Add additional fields if needed
    ];
}

// save attributes into storage
storeAttributes($attributes);
```

```javascript [activate:NodeJS]

const maxItems = 100;

// Get attributes codes from storage
const attributeCodes = await getAttributeCodes();
const maxAttributesPerQuery = 10;

// split attributeCodes in chucks of $maxAttributesPerQuery elements
const chunks = [];
while (attributeCodes.length > 0) {
    chunks.push(attributeCodes.splice(0, maxAttributesPerQuery));
}

const rawAttributes = [];
for (const item of chunks) {
    const apiUrl = `${pimUrl}/api/rest/v1/attributes?search={"code":[{"operator":"IN","value":${JSON.stringify(item)}}]}&limit=${maxItems}`;
    const response = await get(apiUrl, accessToken);
    let data = await response.json();
    let newRawAttributes = data['_embedded']['items']
    rawAttributes.push(...newRawAttributes);
}

// Only keep fields needed
let attributes = {};
for (const rawAttribute of rawAttributes) {
    attributes[rawAttribute['code']] = {
        'code': rawAttribute['code'],
        'type': rawAttribute['type'],
        // Add additional fields if needed
    };
}

//save attributes into storage
storeAttributes(attributes);
```

Retrieved attribute list follows this structure:
```php [activate:PHP]

// Output
[
    'attribute_code' => [
            'code' => 'attribute_code',
            'type' => 'pim_catalog_text',
    ],
]
```

```javascript [activate:NodeJS]

// Output
{
	"attribute_code":
	{
		"code": "attribute_code",
		"type": "pim_catalog_text"
	}
}
```

::: warning
attribute_code_list may be significant, very big! If you get an <a href="https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.15" target="_blank" rel="noopener noreferrer">HTTP 414 error</a>
, you probably hit these boundaries. A workaround is to split your attribute_code_list into different parts and call them independently.
:::

<div class="block-next-steps block-next-steps-alt">
    <img src="/img/illustrations/illus--Attribute.svg" width="140px" class="hidden-xs">
    <div class="block-next-steps-column">
        <div class="block-next-steps-title">Next Step</div>
        <div class="block-next-steps-text">Well done! Keep digging into the “App workflow” and follow the next tutorial!</div>
        <div>
            <ul>
                <li><a href="/tutorials/how-to-get-pim-product-information.html">How to get PIM product information</a></li>
            </ul>
        </div>
    </div>
</div>
