# Access scopes

Part of the app authorization process requires specifying which parts of Akeneo PIM data the App needs to access.
An App can request any of the access scopes listed below.

::: warning
**Akeneo PIM may not grant all requested scopes.**  
This is up to your App to check which scopes were granted when you receive an Access Token.  
For example, the Community edition will not be able to grant you scopes related to the Asset Manager because
it's a feature only available in the Enterprise edition.
:::

## Available authorization scopes

| Scope | Grants access to |
|-------|------------------|
| `read_products` | Read products |
| `write_products` | Write products |
| `delete_products` | Remove products |
| `read_catalog_structure` | Read attributes, attribute groups, families and family variants|
| `write_catalog_structure` | Write attributes, attribute groups, families and family variants |
| `read_attribute_options` | Read attribute options |
| `write_attribute_options` | Write attribute options  |
| `read_categories` | Read categories  |
| `write_categories` | Write categories |
| `read_channel_localization` | Read locales and currencies |
| `read_channel_settings` | Read channels |
| `write_channel_settings` | Write channels |
| `read_association_types` | Read association types |
| `write_association_types` | Write association types |
| `read_asset_families` <span class="label label-ee">EE</span> | Read asset families |
| `write_asset_families` <span class="label label-ee">EE</span> | Write assets families |
| `read_assets` <span class="label label-ee">EE</span> | Read assets |
| `write_assets` <span class="label label-ee">EE</span> | Write assets |
| `delete_assets` <span class="label label-ee">EE</span> | Remove assets |
| `read_reference_entities` <span class="label label-ee">EE</span> | Read reference entities |
| `write_reference_entities` <span class="label label-ee">EE</span> | Write reference entities |
| `read_reference_entity_records` <span class="label label-ee">EE</span> | Read reference entity records |
| `write_reference_entity_records` <span class="label label-ee">EE</span> | Write reference entity records |


## Available authentication scopes

| Scope | Grants access to |
|-------|------------------|
| `openid` | Get the user uuid to be able to identify them |
| `profile` | Read user first name and last name (information filled in the PIM user profile) |
| `email` | Read user email (information filled in the PIM user profile) |


::: panel-link Next step: we will show you a simple implementation of these steps [Create an App in PHP](/apps/create-app-in-php.html)
:::
