# Analyze ERP data vs Julia's needs

## Pragmatic choices on what needs to be imported from your ERP solution

In a regular "ERP to PIM" project, not all the ERP data structures or implementation choices need to be 1:1 mapped to a new fresh PIM installation. Actually, the goal is usually to avoid polluting the PIM with legacy choices that the PIM doesn’t need to deal with.

From the products that are already in your ERP solution, only a portion of data needs to be imported into the PIM. It’s usually not necessary to replicate the ERP content into the PIM. What drives the choice to import such a portion of the existing data structure is Julia's needs: retrieving product identifiers, names, descriptions, etc.

As we have seen together in the [introduction of this guide](introduction.html), hot product information like prices, stock levels, supply-chain specific data, etc. : In most cases, these pieces of information do not need to be imported in a PIM.

## Minimizing the need for mapping

A good practice consists in using the same attribute codes from the ERP to the PIM. That is done when setting up the PIM attributes definition. If most ERP attributes can be imported as is then the chances are good that mapping becomes useless.

But the desire to facilitate the mapping rules should not make you forget that **Julia's needs must come before the technical short-cuts** of mapping between the ERP and the PIM... 😉

That's why our recommendation will always be:
1. To first optimize the catalog structure in the PIM to allow Julia to work in optimal conditions.
2. To bring together the PIM product structure built with the ERP one in order to define the mapping and conversion rules.

A few examples of data mapping usually encounter:
* Categories in the ERP becoming product families (data structures) in the PIM
* Categories in the ERP becoming product models in the PIM
* Flat product in the ERP becoming variants in the PIM, to reduce duplicate content in all items from the same product line

Again, each of Julia's projects has its own needs and it is difficult to list here all the use cases you will encounter...
