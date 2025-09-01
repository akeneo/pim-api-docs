# Event Filters

Event filters let you **focus only on the events that matter to you** by applying simple, readable conditions. Instead
of receiving every single event, you can choose to receive just a subset—like changes made by a specific user or updates
to a specific attribute.

This feature helps reduce irrelevant events in your subscription.
However, to truly tailor it to your needs, more specific filtering may be required on the subscriber side.

::: info
**Filters are optional**  
If no filter is defined, your subscription will receive **all events** that match its type and source.
:::

::: tips
For best results, create a dedicated subscription for delta events and apply these filters there.
:::

## How filters work

Filters are defined during the subscription configuration (more details
on [the Subscriptions page](/event-platform/concepts.html)) and are automatically evaluated when an event is processed.
If the event **matches your filter**, it is forwarded to your destination. If not, it is silently skipped.

---

## Available Filters

### User

Filters events based on the user.

**Type:** Field Match  
**Syntax:** `user="<user_uuid>"`  
**Parameter:** UUID string of the user who triggered the event.  
**Example:** `user="57616f6f-1a4d-490e-bc23-c5877d2b30d9"`  
**Supported Events:** All event types ([list](/event-platform/available-events.html))

::: tips
Useful for ignoring updates from designated user like job automation.
:::

---

### Attribute

Filters events based on modified attribute codes.

**Type:** Field Changed  
**Syntax:** `attribute="<attribute_code>"`  
**Parameter:** String identifier of the attribute code  
**Example:** `attribute="description"`  
**Supported Events:**

- `com.akeneo.pim.v1.product-model.updated.delta`
- `com.akeneo.pim.v1.product.updated.delta`

::: tips
Useful for tracking changes to business-critical fields like price, title, or status.
:::

---

### Scope and Channel

Filters product and product-model delta events based on the scope or channel of their modified attribute(s).
For practical reasons, this filter also matches when the modified attribute(s) are non-scopable.

**Type:** Field Exists and Match  
**Syntax:** `scope="<channel_code>"` or `channel="<channel_code>"`  
**Parameter:** String identifier of the channel  
**Example:** `scope="ecommerce"`  
**Supported Events:**

- `com.akeneo.pim.v1.product-model.updated.delta`
- `com.akeneo.pim.v1.product.updated.delta`

::: tips
Useful for filtering updates specific to a distribution channel like "mobile", "print", or "marketplace".
:::

---

### Locale

Filters product or product-model delta events based on the locale of their modified attribute(s).
For practical reasons, this filter also matches when the modified attribute(s) are non-localizable.

**Type:** Field Exists and Match  
**Syntax:** `locale="<locale_code>"`  
**Parameter:** ISO language-region code  
**Example:** `locale="en_US"`  
**Supported Events:**

- `com.akeneo.pim.v1.product-model.updated.delta`
- `com.akeneo.pim.v1.product.updated.delta`

::: tips
Useful for filtering updates specific to a particular language or region.
:::

::: warning
If a filter field is not in the event payload, the filter may silently skip the event.
:::
---

## Filter Operators

Filters support **basic logic operators** that let you build more flexible and expressive conditions. This means you can
combine or exclude criteria in a single filter expression.

---

### Supported Operators

| Operator | Description                                     |
|----------|-------------------------------------------------|
| `and`    | All conditions must match.                      |
| `or`     | At least one condition must match.              |
| `not`    | Reverse matching condition.                     |
| `in`     | Checks if a field's value is present in a list. |

::: info
**`in` operator behavior used with `channel`, `scope` and `locale` filters:**

For practical reasons, when using the `in` operator with these filters will match not only the values you specify in the list but also any items where the filtered field is null.

For example, the following filter: `locale in ["en_US", "fr_FR"]` will also match events for attributes that are non-localizable.
:::

---

## Filter Examples

| Scenario                    | Filter Expression                                             | Use Case                                                                |
|-----------------------------|---------------------------------------------------------------|-------------------------------------------------------------------------|
| User and Attribute Changes  | `user="john-uuid" and attribute="price"`                      | Track price changes made by a specific user                             |
| Multiple Attributes (or)    | `attribute="description" or attribute="title"`                | Track changes to customer-facing content                                |
| Multiple Attributes (in)    | `attribute in ["description", "title"]`                       | A more concise way to track changes to multiple attributes              |
| Exclude System Updates      | `not user="system"`                                           | Focus on human-made changes only                                        |
| Exclude Specific Attributes | `not (attribute in ["price", "internal_notes"])`              | Focus on content changes while ignoring logistical or internal updates. |
| Complex Filtering           | `(attribute="name" and locale="fr_FR") and not user="system"` | Monitor French content updates while excluding automated changes        |

::: tips
Remember to use parentheses to group conditions when combining multiple operators. This ensures correct evaluation order
and makes the filter more readable.
:::

## Limitations & Rules

### Filter Constraints

| Constraint               | Limit          | Description                                    |
|--------------------------|----------------|------------------------------------------------|
| Filters per subscription | 1              | Only one filter expression per subscription    |
| Maximum length           | 500 characters | Total length of filter expression              |
| Maximum operators        | 4              | Number of logical operators in a single filter |

### Syntax Rules

#### String Values

All values must be wrapped in double quotes:

- `user="system"`: ✅
- `user=system`: ❌

#### Grouping Conditions

Use parentheses to group conditions and control evaluation order:
`user="system" and (attribute="name" or attribute="description")`

#### Query Complexity

Complex filters may be rejected if they:

- Have deeply nested conditions
- Use too many operators
- Exceed length limits

::: tips
If your filter is rejected, try:

- Splitting into multiple subscriptions
- Simplifying the logic
- Reducing nesting levels
  :::
