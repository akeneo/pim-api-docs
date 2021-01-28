# Limitations

## No retry
In some message brokers, the retry mechanism is natively implemented. 
What does it mean? In brief, when a message publication failed, the system will automatically reattempt it later. 
Very useful, isn’t it? Especially in case of temporarily network issues: the message won’t be lost.
Unfortunately, we don’t have such a retry mechanism in our event API connection. 
This means that if a message is not published, no mechanism will try to do it again, and the message will fall into the void...

## Requests limitation
For some performance issues, the number of requests is limited to 4000 per hour.

## your 3rd party system probably don’t deal with 100% uptime
TODO
From shopify
" Your app should not rely solely on receiving data from Shopify webhooks. Since webhook delivery is not always guaranteed, you should implement reconciliation jobs to periodically fetch data from Shopify. Most query endpoints support both the created_at_min and updated_at_min filter parameters. These filters can be used to build a job that fetches all resources that have been created or updated since the last time the job ran."

## Api event delivery is not always guaranted
TODO
→ ce qui signifie la nécessité de mettre en place un système de polling

## Events order is not guaranted
TODO
Do not explain how to resolve it, just explain why it’s like that (pubsub stack + multi consumer to come)
