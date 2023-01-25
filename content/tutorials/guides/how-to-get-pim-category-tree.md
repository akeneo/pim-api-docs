<a href="/tutorials/homepage.html" class="back-button">
   <button>
      <img src="/img/icons/icon--arrow-back.svg" style="margin-right: 10px;">
      All guided tutorials
   </button>
</a>

# How to get PIM category tree

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
        <td>
            <div class="tag-not-selectable">
                <div class="tag-color tag-color-blue"></div>
                <div class="tag-label">Categories</div>
            </div>
        </td>
    </tr>
</table>

<div class="endpoint-container">
    <div class="endpoint-text">REST API endpoint(s):</div>
    <a href="/api-reference.html#Category" class="endpoint-link" target="_blank" rel="noopener noreferrer">categories</a>
</div>

<div class="block-requirements">
    <div class="block-requirements-headline">
        If you're starting building your App, make sure you previously followed:
    </div>
    <div class="block-requirements-row">
        <img src="/img/illustrations/illus--Attributegroup.svg" width="110px" class="hidden-xs">
        <div class="block-requirements-steps">
            <div>Step 1. <a href="how-to-get-your-app-token.html" target="_blank" rel="noopener noreferrer">Get your App token tutorial</a></div>
            <div>Step 2. <a href="how-to-retrieve-pim-structure.html" target="_blank" rel="noopener noreferrer">How to retrieve PIM structure</a></div>
            <div>Step 3. <a href="how-to-get-families-and-attributes.html" target="_blank" rel="noopener noreferrer">How to get families, family variants, and attributes</a></div>
            <div>Step 4. <a href="how-to-get-pim-product-information.html" target="_blank" rel="noopener noreferrer">How to get PIM product information</a></div>
            <div>Step 5. <a href="how-to-collect-product-variations.html" target="_blank" rel="noopener noreferrer">How to collect product variations</a></div>
        </div>
    </div>
</div>


## Context

A category tree is typically a graph where nodes are categories with or without sub-categories.
The first node - the root of the graph - is the root category of the category tree.

![relationship schema](/img/getting-started/synchronize-pim-products/step-3-objects-relationship-schema.svg)

:::tips
Get the big picture <a href="/getting-started/synchronize-pim-products-6x/step-0.html" target="_blank" rel="noopener noreferrer">here</a>.
:::
Fortunately, getting the whole category is as simple as querying the correct API endpoint.

## Fetch the category tree

### 0. Initialization

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

### 1. Get the PIM structure by fetching a channel from API

Workflow:

![synchronisation steps](/img/getting-started/synchronize-pim-products/step-3-steps-schema.svg)

Collect flat category tree from PIM API:

```php [activate:PHP]

function getCategories(): void
{
    $client = buildApiClient();

    // Get root category code from storage
    $rootCategoryCode = getRootCategoryCode();

    $maxItems = 100;

    $nextUrl = sprintf(
        '/api/rest/v1/categories'
        . '?with_position=true'
        . '&search={"parent":[{"operator":"=","value":"%s"}]}'
        . '&limit=%s',
        $rootCategoryCode,
        $maxItems
    );

    $categoryPages = [];

    do {
        $response = $client->get($nextUrl);
        $data = json_decode($response->getBody()->getContents(), true);
        $categoryPages[] = $data['_embedded']['items'];

        $nextUrl = $data['_links']['next']['href'] ?? null;
    } while (
        $nextUrl
    );

    // Adds root category to complete the list.
    $categoryPages[][] = getRootCategory($rootCategoryCode);

    $categories = array_merge(...$categoryPages);

    // Save categories into storage
    storeCategories($categories);
}

function getRootCategory(string $code): array
{
    $client = buildApiClient();

    $response = $client->get('/api/rest/v1/categories/' . $code);
    $rootCategory = json_decode($response->getBody()->getContents(), true);

    if ($rootCategory['parent'] !== null) {
        throw new \InvalidArgumentException(
            sprintf('Category %s is not root.', $code)
        );
    }

    return $rootCategory;
}
```

```javascript [activate:NodeJS]

async function fetchCategories() {
  // Get root category code from storage
  const rootCategoryCode = await getRootCategoryCode();
  const maxItems = 100;

  let nextUrl = `${pimUrl}/api/rest/v1/categories`
    + '?with_position=true'
    + `&search={"parent":[{"operator":"=","value":"${rootCategoryCode}"}]}`
    + `&limit=${maxItems}`
  ;

  const categories = [];

  do {
    const response = await get(nextUrl);
    const data = await response.json();
    const newCategories = data._embedded.items;
    categories.push(...newCategories);

    nextUrl = data._links?.next?.href;
  } while (nextUrl)

  // Adds root category to complete the list.
  const rootCategory = await getRootCategory(rootCategoryCode);
  categories.push(rootCategory);

  // Save categories into storage
  storeCategories(categories);
}

async function getRootCategory(rootCategoryCode) {
  const pimUrl = process.env.PIM_URL;

  const response = await get(`${pimUrl}/api/rest/v1/categories/${rootCategoryCode}`);
  return await response.json();
}
```

The categories are retrieved in a flat array like this:

```php [activate:PHP]

var_export($categories);

// Output
[
    [
        'code' => 'master',
        'parent' => null,
        'updated' => '2022-01-01T00:00:00+00:00',
        'labels' => [
            'en_US' => 'Master catalog',
            'fr_FR' => 'Catalogue principal',
            'de_DE' => 'Hauptkatalog',
        ]
    ],
    [
        'code' => 'tvs_projectors',
        'parent' => 'master',
        'updated' => '2022-11-22T14:40:43+00:00',
        'labels' => [
            'en_US' => 'TVs and projectors',
            'fr_FR' => 'Téléviseurs et projecteurs',
            'de_DE' => 'TVs und projectoren',
        ]
        'position' => 1, // Brought by 'with_position=true' option
    ],
    [
        'code' => 'cameras',
        'parent' => 'master',
        'updated' => '2022-11-22T14:40:43+00:00',
        'labels' => [
            'en_US' => 'Cameras',
            'fr_FR' => 'Cameras',
            'de_DE' => 'Cameras',
        ]
        'position' => 2,
    ],
    [
        'code' => 'digital_cameras',
        'parent' => 'cameras',
        'updated' => '2022-11-22T14:40:43+00:00',
        'labels' => [
            'en_US' => 'Digital cameras',
            'fr_FR' => 'Caméras digitales',
            'de_DE' => 'Digitale Kameras',
        ]
        'position' => 1,
    ],
    /* ... */
]
```

```javascript [activate:NodeJS]

console.log(categories);

// Output
[
  {
    "code": "master",
    "parent": null,
    "updated": "2022-01-01T00:00:00+00:00",
    "labels": {
      "en_US": "Master catalog",
      "fr_FR": "Catalogue principal",
      "de_DE": "Hauptkatalog",
    },
  },
  {
    "code": "tvs_projectors",
    "parent": "master",
    "updated": "2022-11-22T14:40:43+00:00",
    "labels": {
      "en_US": "TVs and projectors",
      "fr_FR": "Téléviseurs et projecteurs",
      "de_DE": "TVs und projectoren",
    },
    "position": 1, // Brought by 'with_position=true' option
  },
  {
    "code": "cameras",
    "parent": "master",
    "updated": "2022-11-22T14:40:43+00:00",
    "labels": {
      "en_US": "Cameras",
      "fr_FR": "Caméras",
      "de_DE": "Cameras"
    },
    "position": 2
  },
  {
    "code": "digital_cameras",
    "parent": "cameras",
    "updated": "2022-11-22T14:40:43+00:00",
    "labels": {
      "en_US": "Digital cameras",
      "fr_FR": "Caméras digitales",
      "de_DE": "Digitale Kameras"
    },
    "position": 2
  },
]
````

Using parent and position attributes, the corresponding category tree can be determined:
- master
    - tv_projectors
    - cameras
        - digital_cameras

:::info
This is the end of the App workflow! Well done!
Now that you have successfully synchronized the essential PIM data you can move on to your next app building task.
If you need to sync the [Assets](/getting-started/synchronize-pim-products-6x/step-6.html) and [Reference Entities](/getting-started/synchronize-pim-products-6x/step-5.html) record stay tuned, more guided tutorials should follow up to assist you with this.
:::