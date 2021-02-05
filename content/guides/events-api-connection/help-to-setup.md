# Best practices

- lien vers le quick start

## Configure your server

- recommandations devops (voir avec Pierre-yves)
  - DNS, Firewall, TLS certificate (+lib TLS)
  - TLS car la data doit être sécurisé entre le PIM et l'extension
  - https://api.akeneo.com/events-documentation/limits-and-scalability.html#extension-side-limits

## Handle API events asynchronously

- Nombre trés important d'events envoyé au connecteur ne peu pas être traité de façon synchrone

  - events api envoie beaucoup d'events (see https://api.akeneo.com/events-documentation/limits-and-scalability.html#limit-of-event-api-requests-per-hour)
    - risque de surcharger les connections disponible sur le connecteur (ddos du pim)
  - trop long à répondre au pim
    - le pim est moins rapide pour envoyer les events suivant
    - le pim timeout et considère ca une erreur
  - besoin de synchroniser la structure ou la data du pim
    - peu performant à faire de façon unitaire
    - trop long à faire de façon synchrone
    - risque de surchage de l'api du pim

- conclusion: mettre en place un system asynchrone
  - persist events in a queue (or database)

## Return correct HTTP response codes

- Important d'avoir une réponse de la part du connecteur
  - 200 pour success, 400 pour erreur car les erreurs sont log par le PIM

## Keep synchronizing your data with the PIM

In our events API connection, we don’t have a retry mechanism: if a message is not published — for example, the extension is temporally unreachable —, it will be forever lost…
Besides, our events API comes with a limitation on the number of requests per hour (see https://api.akeneo.com/events-documentation/limits-and-scalability.html#limit-of-event-api-requests-per-hour). Again, additional messages will be lost.
Keep also in mind that your extension would probably not have 100% uptime, add the fact that we don’t handle HTTP Too Many Requests, and you have a bunch of reasons to lose messages! 
So, despite events API is trustworthy, you should not rely solely on it and continue to fetch data from the PIM.

## Ignore not relevant API events

For some technical limitations, we don’t guarantee the message ordering delivery. 
Consequently, you may receive two update events on the same product but not in the chronological order (the oldest one arrives after the newest).
So, don’t trust the on-the-flow order and treat your messages wisely: in this case, simply ignore the outdated event.