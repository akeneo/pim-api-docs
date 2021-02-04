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

- il n’y a pas de retry des events (si l'extension n'est pas joignable, ou si l'extension retourne une erreur)

  - events peuvent être perdu
  - extension & 3rd party would probably not have 100% uptime
    - on ne support par le code http 409 too many request

- il y a une limite sur le nombre d’event api requests

  - https://api.akeneo.com/events-documentation/limits-and-scalability.html#limit-of-event-api-requests-per-hour
  - events are lost if the limit is reached

- webhook delivery is not always guaranted

- conclusion: synchronization is still necessary

  > (doc example from 3rd party) Your app should not rely solely on receiving data from Shopify webhooks. Since webhook delivery is not always guaranteed, you should implement reconciliation jobs to periodically fetch data from Shopify. Most query endpoints support both the created_at_min and updated_at_min filter parameters. These filters can be used to build a job that fetches all resources that have been created or updated since the last time the job ran

## Ignore the API events that are not relevant to you

- the events order may not be the right one

  - (Technical limitation of the events api)
  - for example, ignore a product updated date older than the one you have

  > (doc example from 3rd party) Ordering of different products - There is no webhook delivery ordering guarantee for different products. For example, you may get a webhook for a change to product ABC before product XYZ even if product XYZ was updated first.
