# How to have a public URL for your App during its development?

::: warning
This feature is available on all SaaS environments and only since v6 for other types of environments.
:::

One of the issues that might arise during your app development is that you need a PIM instance to communicate with your local App that is still in development. You can create a test App in your PIM instance however PIM will require you to provide valid URLs to your App.

This can be easily resolved with a tunnel to your localhost

## Exposing localhost with localhost.run

There are several ways to create a tunnel to your localhost such as **localhost.run** or **ngrok**. We will use [localhost.run](https://localhost.run/) for its free and easy setup.

### Step 1 Initiate localhost tunnel

Initiate localhost tunnel using the following command:

```shell
    ssh -R 80:localhost:8080 localhost.run
```

::: info
You can specify any port you want.

The command above assumes that your local App is available on port 8080
:::


### Step 2 Extract URL from the output

If everything goes well the command will output your public URL for your local app:

```shell
** your connection id is 910cf378-6db9-470d-9533-c7373528ba6e, please mention it if you send me a message about an issue. **

46672a93dd647e.lhrtunnel.link tunneled with tls termination, https://46672a93dd647e.lhrtunnel.link
```

Your local app is now available at `https://46672a93dd647e.lhrtunnel.link` . You may now use it for your development.