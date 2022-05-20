# Catalog structure: categories

```code
get_categories_of_a_category_tree(category_root)
    store category_root in category_list
    children = GET /api/rest/v1/categories?search={"parent":[{"operator":"=","value":"category_root"}]}
    foreach children as child
        get_categories_of_a_category_tree(child)
```
