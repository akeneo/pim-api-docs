# How to retrieve PIM structure

Retrieve the PIM structure through a channel resource. This is usually the required step before starting to read the PIM catalog data.

<table class="tag-container">
    <tr>
        <td>Use case:</td>
        <td>
            <div aria-pressed="false" class="tag-selectable">
                <div class="tag-color tag-color-light-blue"></div>
                <div class="tag-label">App Workflow</div>
            </div>
        </td>
    </tr>
    <tr>
        <td>PIM Features:</td>
        <td>
            <div aria-pressed="false" class="tag-selectable">
                <div class="tag-color tag-color-red"></div>
                <div class="tag-label">Channel</div>
            </div>
        </td>
    </tr>
</table>

<div class="endpoint-container">
    <div class="endpoint-text">REST API endpoint(s):</div>
    <a href="/api-reference.html#Channel" class="endpoint-link" target="_blank" rel="noopener noreferrer">channel</a>
</div>

<div class="block-requirements">
    <div class="block-requirements-headline">
        If you're starting building your App, make sure you previously followed:
    </div>
    <div class="block-requirements-row">
        <img src="../img/illustrations/illus--Attributegroup.svg" width="110px">
        <div class="block-requirements-steps">
            <ul>
                <li>Step 1. <a href="apps-getting-started.html" target="_blank" rel="noopener noreferrer">Get your App token tutorial</a></li>
            </ul>
        </div>
    </div>
</div>


## Context

The channel resource holds the basic PIM structure data.

![relationship schema](../../img/getting-started/synchronize-pim-products/step-1-objects-relationship-schema.svg)

:::tips
Get the big picture <a href="https://api.akeneo.com/getting-started/synchronize-pim-products-6x/step-0.html" target="_blank" rel="noopener noreferrer">here</a>.
:::

## Fetch the PIM structure

### 0. Setup the client for API

If you haven't set your client yet, please:
- Install Guzzle by following the <a href="https://docs.guzzlephp.org/en/stable/overview.html#installation" target="_blank" rel="noopener noreferrer">official documentation</a>
- Set your client for querying Akeneo API as follows:

```php

$pimUrl = 'https://url-of-your-pim.com';
$appToken = 'your_app_token'; // Token provided during oAuth steps

$client = new \GuzzleHttp\Client([
    'base_uri' => $pimUrl,
    'headers' => ['Authorization' => 'Bearer ' . $appToken],
]);
```

### 1. Get the PIM structure by fetching a channel from API

Workflow

![synchronisation steps](../../img/getting-started/synchronize-pim-products/step-1-steps-schema.svg)

Collect channel from PIM API:

```php

const API_URL = '/api/rest/v1/channels/%s';

// Your own channel
$channelCode = 'ecommerce';

// Make an authenticated call to the API
$response = $client->get(
	sprintf(API_URL, $channelCode)
);

// Convert json response to array
$channel = json_decode($response->getBody()->getContents(), true);
```

The retrieved channel resource looks like this:

```php

var_export($channel);

// Output
[
    'code' => 'ecommerce',
    'currencies' => [
        'USD',
        'EUR',
    ],
    'locales' => [
        'de_DE',
        'en_US',
        'fr_FR',
    ],
    'category_tree' => 'master',
    'conversion_units' => [],
    'labels' => [
        'en_US' => 'Ecommerce',
        'de_DE' => 'Ecommerce',
        'fr_FR' => 'Ecommerce',
    ],
]
```

### 2. Store the PIM structure

We advise storing in your App locales, currencies, and root category.
- Locales will allow filtering many localizable resource labels, and parsing product attribute values,
- Currencies will be used to parse product values price attribute type,
- Root category property will allow retrieving the whole category tree linked to the channel.

```php

storeCurrencies($channel['currencies']);
storeLocales($channel['locales']);
storeCategoryTree($channel['category_tree']);
```
