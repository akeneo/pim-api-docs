# Integrate GraphQL into your project

Here’s some code snippets to help you get started with GraphQL depending on the language you use.
Your will need:
* Your `PIM Url` to put in the header `x-pim-url`
* Your `PIM Client ID` to put in the header `x-pim-client-id`
* Your `PIM Token` to put in the header `x-pim-token`

## Code snippets to make GraphQL Queries

The most straightforward way to make your first call with GraphQL would be to type something like this in your terminal

```bash [snippet:Bash]

# Write the query to list the products "uuid" and their attributes' labels for the "en_US" and "fr_FR" locales# /!\ 
# Do not forget to include the correct headers.
curl -X POST https://graphql.sdk.akeneo.cloud \
-H 'Content-Type: application/json' \
-H "x-pim-url: the-pim-url" \
-H "x-pim-client-id: the-client-id" \
-H "x-pim-token: the-pim-token" \
-d '{
    "query": "query myProductQuery($limit: Int) {products(limit: $limit) {items {uuid}}}",
    "variables": {
        "limit": 10
    }
}'
```

See the following snippets for the main languages used by our partners
```php [snippet:PHP]

// Take the HTTP client of your choice. This example uses GuzzleHttp.
use GuzzleHttp\Client;

$client = new Client([
	'base_uri' => 'https://graphql.sdk.akeneo.cloud',
]);
 
// Write the query to list the products "uuid" & their attributes's labels for the "en_US" and "fr_FR" locales
$query = <<<GQL
  query nameOfTheQuery($locales: [String]) {
    products(locales: $locales) {
        items {
            uuid
            attributes {
                code
                type
                values
            }
        }
    }
  }
GQL;
 
 // Make a POST request to the GraphQL server
 $response = $client->request('POST', '/', [
      'json' => [
          'query' => $query,
          'variables' => [
              'locales' => ['fr_FR', 'en_US'],
          ],
      ],
      // Don't forget to change the headers
      'headers' => [
        'x-pim-client-id' => 'the-client-id',
        'x-pim-token'     => 'the-pim-token',
        'x-pim-url'       => 'the-pim-url'
    ]
  ]);
  
$productsInJson = json_decode($response->getBody()->getContents(), true);
// Congratulations, you can loop over your products & their properties!
```
```javascript [snippet:NodeJS]

// Use the HTTP client of your choice
const axios = require('axios');

// Write the query to list the products "uuid" & their attributes's labels for the "en_US" and "fr_FR" locales
const query = `
  query nameOfTheQuery($locales: [String]) {
    products(locales: $locales) {
        items {
            uuid
            attributes {
                code
                type
                values
            }
        }
    }
  }
`;

const variables = {
  locales: ["fr_FR", "en_US"]
};

const graphqlEndpoint = 'https://graphql.sdk.akeneo.cloud';

// Don't forget to change the headers
const headers = {
	'x-pim-client-id'  : 'the-client-id',
	'x-pim-token'      : 'the-pim-token',
	'x-pim-url'        : 'the-pim-url'
}

// Make a POST request to the GraphQL server
axios.post(graphqlEndpoint, {
  query,
  variables,
  headers,
})
.then(response => {
  // Handle the response data
  console.log('GraphQL Response:', response.data);
})
.catch(error => {
  console.error('Error:', error);
});
```
```python [snippet:Python]

import requests

# Write the query to list the products "uuid" and their attributes' labels for the "en_US" and "fr_FR" locales
query = """
  query nameOfTheQuery($locales: [String]) {
    products(locales: $locales) {
        items {
            uuid
            attributes {
                code
                type
                values
            }
        }
    }
  }
"""

parameters = {
  "locales": ["en_US", "fr_FR"]
}

# Define your GraphQL endpoint
graphql_endpoint = 'https://graphql.sdk.akeneo.cloud'

# Define custom headers
headers = {
  'x-pim-client-id': 'the-client-id',
  'x-pim-token': 'the-pim-token',
  'x-pim-url': 'the-pim-url'
}

# Make a POST request to the GraphQL server with custom headers
response = requests.post(graphql_endpoint, json={'query': query, 'variables': parameters}, headers=headers)

# Handle the response
if response.status_code == 200:
    json_response = response.json()
    print('GraphQL Response:', json_response)
else:
    print('Error:', response.status_code)

```

## Other languages

Please check examples from [the community tools & libraries](https://graphql.org/community/tools-and-libraries/?tags=client)


::: panel-link And now, check the [best practices to integrate into your project](/graphql/best-practices.html)
:::
