# OAuth scopes

During App authorization, App must specify the minimal set of scopes that is required for the App to function.

Scopes limits App access to the **PIM REST API**. Once App is authorized, it can only interact with API when in compliance with scopes requested.

::: warning
Scopes cannot be changed once activation process is over.
If your App needs to update the list of required scopes, it must redo the process of activation.
::::

## How to use scopes

The list of scopes is specified by the `scope` query parameter on PIM authorize endpoint.
Scopes list should be a string separted with spaces.

#### example of scopes use (in this case the space is URL-encoded as `%20`)

```
https://my-pim.cloud.akeneo.com/connect/apps/v1/authorize?
    response_type=code&
    client_id=[OAUTH_CLIENT_ID]&
    redirect_uri=[CALLBACK_URL]&
    scope=write_products%20read_catalog_structure&
    state=[STATE]
```

Any erroneous scope values are ignored

Authorization response will return a list of scopes that user gave consent

## Supported scopes

When an app specifies a scope from the list below, upon activation the app will recieve a token that can only act within boundairies of the granted access

| Scope | Grants access to |
|-------|------------|
| (no scope) | Any endpoint not bounded by any permissions |
| read_products | Read products |
| write_products | Read and write products |
| delete_products | Remove products |
| read_catalog_structure | Read attributes, attribute groups, families and family variants|
| write_catalog_structure | Read and write attributes, attribute groups, families and family variants |
| read_attribute_options | Read attribute options |
| write_attribute_options | Read and write attribute options  |
| read_categories | Read categories  |
| write_categories | Read and write categories |
| read_channel_localization | Read locales and currencies |
| read_channel_settings | Read channels |
| write_channel_settings | Read and write channels |
| read_association_types | Read association types |
| write_association_types | Read and write association types |
