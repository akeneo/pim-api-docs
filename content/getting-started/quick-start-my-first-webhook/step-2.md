# _Step 2_ | Create your own Symfony app to display event subscriptions data 

[//]: <> (Hey Akeneo colleagues, here is a repo with the working code if you need to test https://github.com/akeneo/events-api-app.)

## Prerequisites

First of all, you'll need a new Symfony microservice app. To do so, you can follow [the Symfony guide](https://symfony.com/doc/current/setup.html) and run the `$ symfony new display_webhook` command.

## Step by step

1. Add the route in the `config/routes.yaml` file:

```yaml
app_webhook:
    path: /webhook
    controller: App\Controller\WebhookController::post
```

2. Create the controller in `src/Controller/WebhookController.php`

```php
<?php
declare(strict_types=1);

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class WebhookController
{
    // Thanks autowiring!
    public function post(Request $request, LoggerInterface $logger): Response
    {
        // First we extract akeneo's headers.
        $timestamp = $request->headers->get('x-akeneo-request-timestamp');
        $signature = $request->headers->get('x-akeneo-request-signature');

        // If they are null run away. The request does not come from us!
        if (null === $timestamp || null === $signature) {

            return new Response('', Response::HTTP_UNAUTHORIZED);
        }

        $body = $request->getContent();

        // You should notice that I use a very bad practice here.
        // Put that token into your .env file.
        $secret = '3kz9y947jps0wggoc84ww80000o0ogs0ssc444w008s8kkcgw';

        // This is the way we construct our signature.
        $expectedSignature = hash_hmac('sha256', $timestamp . '.' . $body, $secret);

        // You must check that the request really comes from us.
        // To do it, we provide you the `x-akeneo-signature` header that you rebuilt before and check.
        if (false === hash_equals($signature, $expectedSignature)) {

            return new Response('', Response::HTTP_UNAUTHORIZED);
        }

        // Now let's check that the request is fresh.
        if (time() - (int) $timestamp > 300) {
            throw new \Exception('Request is too old (> 5min)');
        }

        // And now, do your stuff!
        $logger->debug($body);

        // You acknowledge you received the event.
        return new Response();
    }
}
```

3. Launch your local webserver with `$ symfony serve --port=8000`. 

![Server running](/img/getting-started/quick-start-my-first-webhook/server-running.png)

::: info
For the need of this quick start, I'm using Docker, that's why I map and expose the `8000` port. My Symfony binary is located in `bin`.
:::

4. Almost done! Go back to your PIM and configure the connection event subscriptions by replacing the Mockbin URL with your new URL. Then test it and save. Here is mine:

![Server running](/img/getting-started/quick-start-my-first-webhook/event-subscription-configuration-sf-project.png)

5. Finally, update a product with the API and here is the result:

![Log result](/img/getting-started/quick-start-my-first-webhook/log-result.png)

```json
{
  "events":[
    {
      "action":"product.updated",
      "event_id":"551f7108-3b59-4064-a923-fefb4e707f05",
      "event_date":"2021-01-06T13:37:24+00:00",
      "author":"magento_0000",
      "author_type":"api",
      "pim_source":"http:\/\/localhost:8080",
      "data":
      {
        "resource":
        {
          "identifier":"AKNSTK",
          "enabled":true,
          "family":null,
          "categories":["goodies","stickers"],
          "groups":[],
          "parent":null,
          "values":
          {
            "main_color":[{"locale":null,"scope":null,"data":"purple"}],
            "price":[{"locale":null,"scope":null,"data":[{"amount":"2.00","currency":"EUR"},{"amount":"3.00","currency":"USD"}]}],
            "name":[{"locale":null,"scope":null,"data":"lolololo"}],
            "description":
            [
              {"locale":"de_DE","scope":"print","data":"Akeneo Sticker"},
              {"locale":"en_US","scope":"print","data":"Akeneo trololo azing sticker !"},
              {"locale":"fr_FR","scope":"print","data":"Sticker Akeneo"}
            ]
          },
          "created":"2021-01-04T13:34:33+00:00",
          "updated":"2021-01-06T13:37:24+00:00",
          "associations":
          {
            "PACK":{"products":[],"product_models":[],"groups":[]},
            "UPSELL":{"products":[],"product_models":[],"groups":[]},
            "X_SELL":{"products":[],"product_models":[],"groups":[]},
            "SUBSTITUTION":{"products":[],"product_models":[],"groups":[]}
          },
          "quantified_associations":{}
        }
      }
    }
  ]
}
```
