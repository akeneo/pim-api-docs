# Update

## Patch behavior

::: info
In accordance with [`JSON definition`](http://www.json.org), what is called object in this documentation is a data structure indexed by alphanumeric keys, arrays don't have any key.
:::

A PATCH request updates only the specified keys according to the following rules:

 - If the value is an object, it will be merged with the old value.
 - If the value is anything else, it will replace the old value.
 - For non-scalar values (objects and arrays) data types must match.

Any data in non specified keys will be left untouched.

Here are some examples to explain that:

+------------------------------+----------------------------------------+-----------------------------------------------+-----------------------------------------------+
| Use case                     | Original resource                      | PATCH request body                            | Modified resource                             |
+==============================+========================================+===============================================+===============================================+
| Move a category              |.. code-block:: json                    |.. code-block:: json                           |.. code-block:: json                           |
|                              |                                        |                                               |                                               |
|                              |  {                                     |  {                                            |  {                                            |
|                              |      "code": "boots",                  |      "parent": "shoes"                        |      "code": "boots",                         |
|                              |      "parent": "master",               |  }                                            |      "parent": "shoes",                       |
|                              |      "labels": {                       |                                               |      "labels": {                              |
|                              |          "en_US": "Boots",             |                                               |          "en_US": "Boots",                    |
|                              |          "fr_FR": "Bottes"             |                                               |          "fr_FR": "Bottes"                    |
|                              |      }                                 |                                               |      }                                        |
|                              |  }                                     |                                               |  }                                            |
+------------------------------+----------------------------------------+-----------------------------------------------+-----------------------------------------------+
| Modify a category label      |.. code-block:: json                    |.. code-block:: json                           |.. code-block:: json                           |
|                              |                                        |                                               |                                               |
|                              |  {                                     |  {                                            |  {                                            |
|                              |      "code": "boots",                  |      "labels": {                              |      "code": "boots",                         |
|                              |      "parent": "master",               |          "fr_FR": "Bottines",                 |      "parent": "master",                      |
|                              |      "labels": {                       |      }                                        |      "labels": {                              |
|                              |          "en_US": "Boots",             |  }                                            |          "en_US": "Boots",                    |
|                              |          "fr_FR": "Bottes"             |                                               |          "fr_FR": "Bottines"                  |
|                              |      }                                 |                                               |      }                                        |
|                              |  }                                     |                                               |  }                                            |
+------------------------------+----------------------------------------+-----------------------------------------------+-----------------------------------------------+
| Erase a category label       |.. code-block:: json                    |.. code-block:: json                           |.. code-block:: json                           |
|                              |                                        |                                               |                                               |
|                              |  {                                     |  {                                            |  {                                            |
|                              |      "code": "boots",                  |      "labels": {                              |      "code": "boots",                         |
|                              |      "parent": "master",               |          "fr_FR": null,                       |      "parent": "master",                      |
|                              |      "labels": {                       |      }                                        |      "labels": {                              |
|                              |          "en_US": "Boots",             |  }                                            |          "en_US": "Boots",                    |
|                              |          "fr_FR": "Bottes"             |                                               |          "fr_FR": null                        |
|                              |      }                                 |                                               |      }                                        |
|                              |  }                                     |                                               |  }                                            |
+------------------------------+----------------------------------------+-----------------------------------------------+-----------------------------------------------+
| Invalid request              |.. code-block:: json                    |.. code-block:: json                           |.. code-block:: json                           |
| (type mismatch)              |                                        |                                               |                                               |
| See the :doc:`Client errors` |  {                                     |  {                                            |  {                                            |
| section for more information |      "code": "boots",                  |      "labels": null                           |      "code": "boots",                         |
|                              |      "parent": "master",               |  }                                            |      "parent": "master",                      |
|                              |      "labels": {                       |                                               |      "labels": {                              |
|                              |          "en_US": "Boots",             |                                               |          "en_US": "Boots",                    |
|                              |          "fr_FR": "Bottes"             |                                               |          "fr_FR": "Bottes"                    |
|                              |      }                                 |                                               |      }                                        |
|                              |  }                                     |                                               |  }                                            |
+------------------------------+----------------------------------------+-----------------------------------------------+-----------------------------------------------+
| Request without any effect   |.. code-block:: json                    |.. code-block:: json                           |.. code-block:: json                           |
|                              |                                        |                                               |                                               |
|                              |  {                                     |  {                                            |  {                                            |
|                              |      "code": "boots",                  |      "labels": {}                             |      "code": "boots",                         |
|                              |      "parent": "master",               |  }                                            |      "parent": "master",                      |
|                              |      "labels": {                       |                                               |      "labels": {                              |
|                              |          "en_US": "Boots",             |                                               |          "en_US": "Boots",                    |
|                              |          "fr_FR": "Bottes"             |                                               |          "fr_FR": "Bottes"                    |
|                              |      }                                 |                                               |      }                                        |
|                              |  }                                     |                                               |  }                                            |
+------------------------------+----------------------------------------+-----------------------------------------------+-----------------------------------------------+
| Remove a product from a      |.. code-block:: json                    |.. code-block:: json                           |.. code-block:: json                           |
| category                     |                                        |                                               |                                               |
|                              |  {                                     |  {                                            |  {                                            |
|                              |      "identifier": "boots-4846",       |      "categories": ["boots"]                  |      "identifier": "boots-4846",              |
|                              |      "categories": ["shoes", "boots"]  |  }                                            |      "categories": ["boots"]                  |
|                              |  }                                     |                                               |  }                                            |
|                              |                                        |                                               |                                               |
|                              |                                        |                                               |                                               |
|                              |                                        |                                               |                                               |
|                              |                                        |                                               |                                               |
+------------------------------+----------------------------------------+-----------------------------------------------+-----------------------------------------------+

The PATCH behaviour described above is quite intuitive. However, applying a PATCH containing product values on a product is a bit different:

+------------------------------+--------------------------------------+-------------------------------------+-------------------------------------+
| Use case                     | Original resource                    | PATCH request body                  | Modified resource                   |
+==============================+======================================+=====================================+=====================================+
| Add a product value          |.. code-block:: json                  |.. code-block:: json                 |.. code-block:: json                 |
|                              |                                      |                                     |                                     |
|                              |  {                                   |  {                                  |  {                                  |
|                              |      "values": {                     |      "values": {                    |      "values": {                    |
|                              |          "sku": [                    |          "name": [                  |          "sku": [                   |
|                              |              {                       |              {                      |              {                      |
|                              |                  "locale": null,     |                  "locale": "en_US", |                  "locale": null,    |
|                              |                  "scope": null,      |                  "scope": null,     |                  "scope": null,     |
|                              |                  "data": "mug"       |                  "data": "Mug"      |                  "data": "mug"      |
|                              |              }                       |              }                      |              }                      |
|                              |          ]                           |          ]                          |          ],                         |
|                              |      }                               |      }                              |          "name": [                  |
|                              |  }                                   |  }                                  |              {                      |
|                              |                                      |                                     |                  "locale": "en_US", |
|                              |                                      |                                     |                  "scope": null,     |
|                              |                                      |                                     |                  "data": "Mug"      |
|                              |                                      |                                     |              }                      |
|                              |                                      |                                     |          ]                          |
|                              |                                      |                                     |      }                              |
|                              |                                      |                                     |  }                                  |
+------------------------------+--------------------------------------+-------------------------------------+-------------------------------------+
| Modify a product value       |.. code-block:: json                  |.. code-block:: json                 |.. code-block:: json                 |
|                              |                                      |                                     |                                     |
|                              |  {                                   |  {                                  |  {                                  |
|                              |      "values": {                     |      "values": {                    |      "values": {                    |
|                              |          "sku": [                    |          "name": [                  |          "sku": [                   |
|                              |              {                       |              {                      |              {                      |
|                              |                  "locale": null,     |                  "locale": "en_US", |                  "locale": null,    |
|                              |                  "scope": null,      |                  "scope": null,     |                  "scope": null,     |
|                              |                  "data": "mug"       |                  "data": "New mug"  |                  "data": "mug"      |
|                              |              }                       |              }                      |              }                      |
|                              |          ],                          |          ]                          |          ],                         |
|                              |          "name": [                   |      }                              |          "name": [                  |
|                              |              {                       |  }                                  |              {                      |
|                              |                  "locale": "en_US",  |                                     |                  "locale": "en_US", |
|                              |                  "scope": null,      |                                     |                  "scope": null,     |
|                              |                  "data": "Mug"       |                                     |                  "data": "New mug"  |
|                              |              }                       |                                     |              }                      |
|                              |          ]                           |                                     |          ]                          |
|                              |      }                               |                                     |      }                              |
|                              |  }                                   |                                     |  }                                  |
+------------------------------+--------------------------------------+-------------------------------------+-------------------------------------+
| Modify a product value       |.. code-block:: json                  |.. code-block:: json                 |.. code-block:: json                 |
|                              |                                      |                                     |                                     |
| (for just one locale/scope)  |  {                                   |  {                                  |  {                                  |
|                              |      "values": {                     |      "values": {                    |      "values": {                    |
|                              |          "sku": [                    |          "name": [                  |          "sku": [                   |
|                              |              {                       |              {                      |              {                      |
|                              |                  "locale": null,     |                  "locale": "en_US", |                  "locale": null,    |
|                              |                  "scope": null,      |                  "scope": null,     |                  "scope": null,     |
|                              |                  "data": "mug"       |                  "data": "New mug"  |                  "data": "mug"      |
|                              |              }                       |              }                      |              }                      |
|                              |          ],                          |          ]                          |          ],                         |
|                              |          "name": [                   |      }                              |          "name": [                  |
|                              |             {                        |  }                                  |              {                      |
|                              |                  "locale": "en_US",  |                                     |                  "locale": "en_US", |
|                              |                  "scope": null,      |                                     |                  "scope": null,     |
|                              |                  "data": "Mug"       |                                     |                  "data": "New mug"  |
|                              |              },                      |                                     |              },                     |
|                              |              {                       |                                     |              {                      |
|                              |                   "locale": "fr_FR", |                                     |                  "locale": "fr_FR", |
|                              |                   "scope": null,     |                                     |                  "scope": null,     |
|                              |                   "data": "Tasse"    |                                     |                  "data": "Tasse"    |
|                              |              }                       |                                     |              }                      |
|                              |          ]                           |                                     |          ]                          |
|                              |      }                               |                                     |      }                              |
|                              |  }                                   |                                     |  }                                  |
+------------------------------+--------------------------------------+-------------------------------------+-------------------------------------+
| Erase a product value        |.. code-block:: json                  |.. code-block:: json                 |.. code-block:: json                 |
|                              |                                      |                                     |                                     |
|                              |  {                                   |  {                                  |  {                                  |
|                              |      "values": {                     |      "values": {                    |      "values": {                    |
|                              |          "sku": [                    |          "name": [                  |          "sku": [                   |
|                              |              {                       |              {                      |              {                      |
|                              |                  "locale": null,     |                  "locale": "en_US", |                 "locale": null,     |
|                              |                  "scope": null,      |                  "scope": null,     |                 "scope": null,      |
|                              |                  "data": "mug"       |                  "data": null       |                 "data": "mug"       |
|                              |              }                       |              }                      |              }                      |
|                              |          ],                          |          ]                          |          ],                         |
|                              |          "name": [                   |      }                              |          "name": [                  |
|                              |             {                        |  }                                  |              {                      |
|                              |                  "locale": "en_US",  |                                     |                  "locale": "en_US", |
|                              |                  "scope": null,      |                                     |                  "scope": null,     |
|                              |                  "data": "Mug"       |                                     |                  "data": null       |
|                              |             }                        |                                     |              }                      |
|                              |          ]                           |                                     |          ]                          |
|                              |      }                               |                                     |      }                              |
|                              | }                                    |                                     |  }                                  |
+------------------------------+--------------------------------------+-------------------------------------+-------------------------------------+

::: info
For these examples only products values are represented, but usually products also include other information as specified in the standard format.
:::
