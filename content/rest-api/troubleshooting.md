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

