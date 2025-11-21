# Filtering and Display

You may want to create UI extensions that are only available to certain user groups, specific products, or individual users. This page explains how to control the visibility and display of your extensions.

## Filter by User Groups

You can restrict which user groups are allowed to see and execute a UI extension by using the **permissions tab** on the UI extensions creation/edition form.

[![ui-extension-permissions.png](../img/extensions/ui-extensions/ui-extension-permissions.png)](../img/extensions/ui-extensions/ui-extension-permissions.png)

**Use cases:**
- Restrict sensitive extensions to administrators only
- Provide different tools to different teams (e.g., marketing vs. operations)
- Control access based on organizational roles

::: info
If no user groups are selected, the extension will be available to all users.
:::

## Filter by Product Selection

You can filter which products can be accessed by a UI extension using the **product selection tab** on the UI extensions creation/edition form.

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
1. Go to the UI extensions creation/edition form
2. Open the **permissions** tab
3. Enter email addresses in the **Filter by users** field.
4. You can add several emails
5. Save the extension

- With the API:
Add a `userEmails` field in the configuration section.

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

When multiple extensions are available in the same position, you can control their display order using the **weight** field on the creation/update form.

[![ui-extension-product-selection.png](../img/extensions/ui-extensions/weight.png)](../img/extensions/ui-extensions/weight.png)

**How weight works:**
- Lower numbers appear first (e.g., weight 1 appears before weight 10)
- Default weight is typically 0
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
3. Update any missing or invalid fields (especially credentials)
4. Save the extension
5. Status will change to "Inactive" - you can then activate it

::: warning
Extensions in "To update" status will not be displayed to users, even if they were previously active.
:::

## Best Practices

### Start Restrictive, Then Expand
- Begin by limiting extensions to a small test group
- Gather feedback and fix issues
- Gradually expand access to more user groups

### Use Meaningful Weights
- Leave gaps in weight numbers (1, 10, 20) to allow inserting extensions later
- Group related extensions with similar weights

### Document Your Filters
- Keep track of which extensions are restricted and why

### Test Different User Scenarios
- Verify extensions appear correctly for different user groups
- Test with users who should NOT see the extension
- Check that product selection filters work as expected

::: panel-link [FAQ & Troubleshooting](/advanced-extensions/faq.html)
:::
