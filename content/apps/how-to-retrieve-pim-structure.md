# How to retrieve PIM structure

Retrieve the PIM Structure through a Channel resource. This is usually the required step before starting reading the PIM catalog data.

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
    <a href="/api-reference.html#Channel" class="endpoint-link">channel</a>
</div>

<div class="block-requirements">
    <div class="block-requirements-headline">
        If you're starting building your App, make sure you previously followed:
    </div>
    <div class="block-requirements-row">
        <img src="../img/illustrations/illus--Attributegroup.svg" width="110px">
        <div class="block-requirements-steps">
            <ul>
                <li>Step 1. <a href="https://api.akeneo.com/apps/apps-getting-started.html">Get your App token tutorial</a></li>
            </ul>
        </div>
    </div>
</div>


## Context

The Channel resource holds useful data for reading the PIM Product catalog.

![relationship schema](../../img/getting-started/synchronize-pim-products/step-1-objects-relationship-schema.svg)

Get the big picture [here](https://api.akeneo.com/getting-started/synchronize-pim-products-6x/step-0.html).

## Fetch the PIM structure

### 0. Setup a client for API

```

composer require guzzlehttp/guzzle:^7.0
```

```php

$pimUrl = 'https://demo.cloud.akeneo.com';
$appToken = 'app_token'; // Token provided during oauth steps

$client = new \GuzzleHttp\Client([
    'base_uri' => $pimUrl,
    'headers' => ['Authorization' => 'Bearer ' . $appToken],
]);
```

::: info
If you already followed a tutorial, you should already have a client.
:::

### 1. Get the structure by fetching a channel from API

Workflow:

![synchronisation steps](../../img/getting-started/synchronize-pim-products/step-1-steps-schema.svg)

Retrieve Channel from PIM API:

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

Retrieved Channel resource looks like this:

```php

var_export($channel):
```

```php

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

### 2. Store structure

We advise the locales, currencies and root category to be stored in your App.
- Locales will allow filtering many localisable resource labels, and parsing Product attribute values,
- Currencies will be used to parse Product values price attribute type,
- Root category property will allow retrieving the whole category tree linked to the channel.

```php

storeCurrencies($channel['currencies']);
storeLocales($channel['locales']);
storeCategoryTree($channel['category_tree']);
```
