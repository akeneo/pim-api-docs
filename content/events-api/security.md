# How to check the request signature?

Akeneo PIM uses the **secret** to create a hash **signature** of the API event.

The signature is forwarded through the request header `X-Akeneo-Request-Signature`, and allows you to verify that the API event request was sent by the PIM and not by a malicious third-party.

You can verify the signature by following these steps:

1. Get the original signature and timestamp, extract them from the following request headers: `X-Akeneo-Request-Signature` and `X-Akeneo-Request-Timestamp`
2. Prepare the event payload which will be signed by concatenating the timestamp and the request body with a dot `.`
3. Generate a hash signature with the HMAC SHA256 algorithm using the secret as the secret key.
4. Compare the original and generated signature, you are encouraged to use a string comparison function that is safe to timing attack, like [hash_equals](https://www.php.net/manual/en/function.hash-equals.php) in PHP.

To see how to implement these steps in a Symfony application you can follow the [Quick start my first webhook](/getting-started/quick-start-my-first-webhook/welcome.html) guide.
