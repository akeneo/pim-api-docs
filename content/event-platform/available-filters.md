# Event Filters

Event filters let you **focus only on the events that matter to you** by applying simple, readable conditions. Instead of receiving every single event, you can choose to receive just a subset—like changes made by a specific user or updates to a specific attribute.

This helps you reduce noise and tailor your event subscription to your needs.

> ℹ️ **Filters are optional**  
> If no filter is defined, your subscription will receive **all events** that match its type and source.

> ⚠️ **Filter behavior depends on the event type**  
> The `user` filter (author) works with all event types.  
> Filters like `attribute`, `locale`, `scope`, and `channel` can technically be used on any subscription, but they only **make sense** for `product.updated.delta` and `product_model.updated.delta` events.
>
> If used with other event types, these filters may silently skip events, as the necessary data (like `"changes"`) won't be present in the payload.
>
> **Tip**: For best results, create a dedicated subscription for delta events and apply these filters there.

## How filters work

Filters are defined during the subscription configuration (more details on [the Subscriptions page](/event-platform/concepts.html)) and are automatically evaluated when an event is processed. If the event **matches your filter**, it is forwarded to your destination. If not, it is silently skipped.

---

## Available Filters

### `user`

Receive only events triggered by a specific user.

- **Syntax**  
  `user="user_identifier"`

- **Parameter**  
  `user_identifier`: The UUID of the user who performed the change.

- **Example**  
  `user="57616f6f-1a4d-490e-bc23-c5877d2b30d9"`

> 💡 Useful for: Ignoring updates by a designated user.

---

### `attribute`

Receive only events where a specific attribute was modified.

- **Syntax**  
  `attribute="attribute_code"`

- **Parameter**  
  `attribute_code`: The code of the attribute you want to monitor.

- **Example**  
  `attribute="short_description"`

> 💡 Useful for: Tracking changes to business-critical fields like price, title, or status.

---

### `scope`

Receive only events related to a specific channel (also called *scope*).

- **Syntax**  
  `scope="channel_code"` or `channel="channel_code"`

- **Parameter**  
  `channel_code`: The code of the channel where the update occurred.

- **Example**  
  `scope="ecommerce"`

> 💡 Useful for: Filtering updates specific to a distribution channel like "mobile", "print", or "marketplace".

---

### `locale`

Receive only events related to a specific locale.

- **Syntax**  
  `locale="locale_code"`

- **Parameter**  
  `locale_code`: The code of the locale (e.g., language-region).

- **Example**  
  `locale="en_US"`

> 💡 Useful for: Only processing updates in a particular language or region.

---

## Filter Operators

Filters support **basic logic operators** that let you build more flexible and expressive conditions. This means you can combine or exclude criteria in a single filter expression.

---

### Supported Operators

| Operator | Description |
|----------|-------------|
| `and`    | All conditions must match. |
| `or`     | At least one condition must match. |
| `not`    | Excludes matching events. |

---

### Examples

#### "Receive only events where the **author is a specific user** **and** a specific **attribute** was updated"  
`user="john-uuid" and attribute="price"`

#### "Receive events where **either** the "description" or "title" attribute was updated"  
`attribute="description" or attribute="title"`

#### "Receive all updates **except** those made by the system user"  
`not user="system"`

#### "Receive updates to the "name" attribute **in French** but **not** made by the system"  
`(attribute="name" and locale="fr_FR") and not user="system"`

## Limitations & Rules

To keep filters simple, readable, and fast to evaluate, a few rules and limitations apply:

- You can define **One filter per subscription**  


- **All values must be wrapped in double quotes**  
  ✅ `user="system"`  
  ❌ `user=system`


- **You can use parentheses** to group conditions and clarify your logic.  
  Example:  
  `user="system" and (attribute="name" or attribute="description")`


- **Maximum filter length**: 500 characters


- **Maximum number of operators**: 4


- **Query complexity is limited**  
  Deeply nested or overly complex filters may be rejected. If this happens, you’ll receive an error message.  
Try simplifying your expression or splitting your use case into multiple subscriptions.