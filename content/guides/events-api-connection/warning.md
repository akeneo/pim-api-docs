# Limitations

## No retry
In some message brokers, the retry mechanism is natively implemented. 
What does it mean? In brief, when a message publication failed, the system will automatically reattempt it later. 
Very useful, isn’t it? Especially in case of temporarily network issues: the message won’t be lost.
Unfortunately, we don’t have such a retry mechanism in our event API connection. 
This means that if a message is not published, no mechanism will try to do it again, and the message will be forever lost...

## Requests limitation
For some scalability issues and to avoid overflowing the endpoint, the number of requests is limited to 4000 per hour.

## No 100% uptime
Since event API delivery is not always guaranteed, don't blindly trust it and consider implementing a job which periodically fetch data from the PIM.

## No message ordering 
Because activating the Pub/Sub message ordering property might increase latency, it is not available in our Event API.
So, be careful when you treat your messages: it is possible to recieve a product updated event before its creation.
