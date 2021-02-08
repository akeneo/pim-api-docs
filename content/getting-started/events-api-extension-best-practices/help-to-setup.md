# Best practices to use the Events API with your extension

<!--
- Explication rapide de l'events api + lien vers la référence doc de l'events api + helpcenter
- Explication rapide d'un use-case d'une extension connecté à l'events api
  - aka, mon site ecommerce aimerait se sync avec le pim rapidement aprés des modifications sur un produit
  -->

This page presents best practices and recommendations you might need while implementing the Events API inside and API based extension.

First, if you need help to setup an extension to use the Events API take a loot at the [Quick start my first webhook](https://api.akeneo.com/getting-started/quick-start-my-first-webhook/welcome.html) guide.

<!--
## Configure your server

- recommandations devops (voir avec Pierre-yves)
  - DNS, Firewall, TLS certificate (+lib TLS)
  - TLS car la data doit être sécurisé entre le PIM et l'extension
  - https://api.akeneo.com/events-documentation/limits-and-scalability.html#extension-side-limits
-->

## Handle API events asynchronously

The Events API can send a lot of requests to your extension endpoint. The default value being 4000 request per hour and each request can contains to up to 10 events (see [limits and scalability](https://api.akeneo.com/events-documentation/limits-and-scalability.html#limit-of-event-api-requests-per-hour)).

This means that your extension needs to be able to handle up-to 40,000 events per hour.

But then, each of this event (like `product.updated`) is not necessarily useful on its own, as you might want to gather additional data from the PIM Rest API to be able to process it properly.

For example, you will want to get the attributes and their types for the family of the product, or you will want to fetch more data for the reference entities and assets attributes.

If you do each of this operation synchronously for the 40,000 events, your extension (and the Rest API of the PIM) won't be able to follow and support the load.

At the same time, your extension needs to acknowledge quickly (under 500ms) that a request sent by the Events API has been handled successfully. So it excludes, even more, processing the events synchronously upon receiving them.

## Keep synchronizing your data with the PIM

An important point of the Events API is that you should not rely solely on it to keep your data up-to-date with the PIM.

### Events delivery

The delivery of events is not always guaranteed, and the Events API doesn't offer any retry mechanism.

- If the extension is unreachable or returns an error to an event request, the PIM will not try to re-send it.

- The Events API comes with a limitation on the number of requests sent per hour (see [limit of event API requests](https://api.akeneo.com/events-documentation/limits-and-scalability.html#limit-of-event-api-requests-per-hour)).
  If this quota is reached, some events won't be sent until the quota is reset.

- In the same way, your extension might be limiting the number of incoming requests (maybe with a _429 Too Many Requests_ status code).
  Unfortunately, the Events API doesn't handle this scenario and will keep trying to send you event API requests.

With all of this in mind, it's easy to see that it's crucial for your extension to still be able to synchronize periodically its data with the PIM (via the Rest API).

## Ignore events that are not relevant

### Events ordering

The Events API doesn't guarantee the delivery of the events in order.

Consequently, you may receive two update events on the same product but not in a chronological order (the oldest one arriving after the newest). In this case you should simply ignore the outdated event based on the "updated" date of the product.

<!--
## Return correct HTTP response codes

- Important d'avoir une réponse de la part du connecteur
  - 200 pour success, 400 pour erreur car les erreurs sont log par le PIM
  -->
