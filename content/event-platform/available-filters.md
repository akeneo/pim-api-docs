# Event Filters

Event filters let you **narrow down the events** sent to your destination by applying simple matching rules. They’re useful when you're only interested in specific types of changes—like ignoring automated updates or focusing on certain attributes.

**Filters are optional**: if no filter is defined, your subscription will receive **all events** matching its type and source.

Filters are defined when configuring [your subscription](/event-platform/concepts.html) and are automatically evaluated during event routing.

> ⚠️ **Note:** For now, only **one filter** can be configured per subscription. Combining multiple filters (e.g., filtering by both user and attribute) is not yet supported.

---

## `user` *(available)*

Use this filter to receive only events triggered by a specific user.

- **Syntax**
  `user=user_identifier`
- **Parameters**
    - `user_identifier`: The UUID of the user who authored the event.

- **Example**
  `user=57616f6f-1a4d-490e-bc23-c5877d2b30d9`

---

## `attribute` *(available soon)*

Use this filter to receive only delta events where a specific attribute was updated.

- **Syntax**
  `attribute=attribute_code`
- **Parameters**
    - `attribute_code`: The code of the attribute you want to track.

- **Example**
  `attribute=short_description`

---

## `scope` *(available soon)*

Use this filter to receive only delta events related to a specific scope.

- **Syntax**
  `scope=scope_code`
- **Parameters**
    - `scope_code`: The scope code of the updated data.

- **Example**
  `scope=my_scope`

---

## `locale` *(available soon)*

Use this filter to receive only delta events for a specific locale.

- **Syntax**
  `locale=locale_code`
- **Parameters**
    - `locale_code`: The locale code of the updated data.

- **Example**
  `locale=en_US`

---
