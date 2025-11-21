# Filtering and Display

Extensions can be configured to be available only to certain user groups, specific products, or individual users.

## Filter by User Groups

You can restrict which user groups are allowed to see and execute an Extension by using the **permissions tab** on the creation/edition form.

[![ui-extension-permissions.png](../img/extensions/ui-extensions/ui-extension-permissions.png)](../img/extensions/ui-extensions/ui-extension-permissions.png)

**Use cases:**
- Restrict sensitive extensions to administrators only
- Provide different tools to different teams (e.g., marketing vs. operations)
- Control access based on organizational roles

::: info
If no user groups are selected, the extension will be available to all users.
:::

## Filter by Product Selection

You can filter which products can be accessed by an Extension using the **product selection tab** on the creation/edition form.

[![ui-extension-product-selection.png](../img/extensions/ui-extensions/ui-extension-product-selection.png)](../img/extensions/ui-extensions/ui-extension-product-selection.png)

**Use cases:**
- Show extensions only for products in specific categories
- Restrict extensions to products with certain attributes
- Create specialized tools for specific product families

::: info
Product selection filtering uses the same interface as other Akeneo product filters, allowing you to build complex rules based on families, categories, attributes, and more.
:::

## Filter by Individual User Email

You can restrict extensions to specific individual users by entering their email addresses in the **Filter by users** field. This is useful for:

- **Beta Testing**: Roll out new extensions to selected users before general availability
- **Special Access**: Provide custom tools to specific team members
- **Troubleshooting**: Enable diagnostic extensions for support staff only

**How to configure:**

- In the UI:
1. Go to the Extensions creation/edition form
2. Open the **permissions** tab
3. Enter email addresses in the **Filter by users** field.
4. You can add several emails
5. Save the extension

- With the API:
Add a `userEmails`field in the configuration section.

**Example:**
```json
{
"configuration": {
    "userEmails": [
        john.doe@company.com, jane.smith@company.com, admin@company.com
    ]
  }
}
```

## Order Extensions

When multiple Extensions are available in the same position, you can control their display order using the **weight** field on the creation/update form.

[![ui-extension-product-selection.png](../img/extensions/ui-extensions/weight.png)](../img/extensions/ui-extensions/weight.png)

**How weight works:**
- Lower numbers appear first (e.g., weight 1 appears before weight 10)
- Applies to **header** and **tab** positions
- Extensions with the same weight are ordered alphabetically

**Example ordering:**
- Extension A (weight: 1) → Appears first
- Extension B (weight: 5) → Appears second
- Extension C (weight: 10) → Appears third

## Extension Statuses

Extensions can have three different statuses:

### Active
- The extension is **enabled and visible** to users based on filtering rules
- Users can interact with the extension
- This is the normal operational state

### Inactive
- The extension is **disabled** and not visible to users
- Only visible in the Extensions list page for administrators
- Must be manually enabled to become available

### To Update
- The extension has an **incorrect or outdated configuration**
- Must be updated or deleted before it can be used
- Usually caused by:
  - PIM migration or upgrade
  - Missing or invalid credentials
  - Missing required configuration fields

**How to fix:**
1. Open the extension in the UI
2. Review the configuration
3. Update any missing or invalid fields
4. Save the extension
5. Status will change to "Inactive" - you can then activate it

::: warning
Extensions in "To update" status will not be displayed to users, even if they were previously active.
:::

::: panel-link API [Next](/extensions/api.html)
:::
