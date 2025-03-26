# Troubleshooting guide

This guide describes the most common errors you can experience when using the REST API and the solutions to fix them.

## Missing client id

Two problems can be the cause of the following response when authenticating to the REST API:

```json
{
  "code": 422,
  "message": "Parameter "client_id" is missing or does not match any client, or secret is invalid"
}
```

### Base 64 not correctly encoded

You are not correctly encoding client and secret in base 64.
We encourage you to use the Postman collection that you will find in this [tutorial](/getting-started/your-first-tutorial-4x/welcome.html) or the [PHP client](/php-client/introduction.html), that handle it automatically for you.

If you use the command line to generate the base 64, please ensure that you do it this way:

```bash
echo -n "client_id:secret" | base64
```

Do note the option `-n` to avoid to print the trailing newline character and encode it.

If you still experience the same error, please follow the second solution.

### Apache strip the authentication header

If you are sure to provide the correct base 64 of the client and secret, it probably means that Apache is not correctly set up.  
Various Apache modules can strip the authorization header “Authorization: Basic base64client_id:secret”.

Add the following line in your virtual host file:

```
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
```

## Redirection on connection page

When requesting the REST API, you are redirected to the REST API, with any endpoints.

This problem occurs when the project has been updated from version 1.6.  
It is coming from the security file `app/config/security.yml` in the PIM project.

The declaration order of the keys is important in this file.  
If the key `security.firewalls.main` is before the keys `security.firewalls.token`, `security.firewalls.api_index` and `security.firewalls.api`, you will be redirected on requesting page when using the REST API.

Please check that the keys under `security.firewalls` are in this following order:
```
oauth_token:
  pattern:                        ^/api/oauth/v1/token
  security:                       false

api_index:
  pattern:                        ^/api/rest/v1$
  security:                       false

api:
  pattern:                        ^/api
  fos_oauth:                      true
  stateless:                      true
  access_denied_handler:          pim_api.security.access_denied_handler

main:
    pattern:                        ^/
    provider:                       chain_provider
    form_login:
        csrf_token_generator:       security.csrf.token_manager
        check_path:                 oro_user_security_check
        login_path:                 oro_user_security_login
    logout:
        path:                       oro_user_security_logout
    remember_me:
        secret:                     "%secret%"
        name:                       BAPRM
        lifetime:                   1209600   # stay logged for two weeks
    anonymous:                      false
```

## Read after write eventual consistency

When making a POST request to a specific endpoint, it's important to understand that a subsequent GET request with search parameters may not immediately return the data that was just posted. This behavior is a consequence of the underlying architecture, which involves distributed and scalable databases, also known as read-after-write eventual consistency.

### Understanding the Data Flow

1. **POST Request**: When you make a POST request to the endpoint, the data is initially stored in the primary database. This operation is typically quick and ensures that the data is persisted.
2. **Indexing**: The data then needs to be indexed in a search engine to make it searchable. This indexing process may not be instantaneous and can introduce a delay.
3. **GET Request**: When you make a GET request with search parameters, the system queries the search index to retrieve the data. If the indexing process is not yet complete, the newly posted data may not be available in the search results immediately.

### Consequences of Distributed Architecture

- **Eventual Consistency**: In a distributed system, achieving immediate consistency across all components is challenging. The system is designed to eventually become consistent, meaning that there may be a brief period during which the search index is not fully up-to-date with the primary database.
- **Scalability**: The architecture is designed to handle large volumes of data and high traffic, which necessitates the use of distributed databases and search indexes. This scalability comes at the cost of immediate data availability in search results.
- **Indexing Latency**: The time taken to index the data can vary based on the system load, the complexity of the data, and other factors. This latency is a natural consequence of using a search engine to enhance query performance.

### Workaround

If immediate retrieval of the posted data is critical, consider to query the entity endpoint by its ID instead of performing a search query.

### Example Scenario

1. **POST Request**: You send a POST request to create a new product.
2. **Data Storage**: The product data is stored in the primary database.
3. **Indexing**: The system begins the process of indexing the product data in the search engine.
4. **GET Request**: You immediately send a GET request to search for several products with filters on family a specific family.
5. **Search Results**: The new product may not appear in the search results because the indexing process is still in progress.