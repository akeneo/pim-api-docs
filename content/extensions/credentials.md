# Credentials
You have the ability to make authenticated calls via UI Extensions using credentials. These credentials will be used as headers in the POST requests generated when calling the specified URL.

### Available Credential Methods

| Method               | Header                                             |
|----------------------|----------------------------------------------------|
| Basic Authentication | `Authorization : base64_encode(username:password)` |    
| Bearer Token         | `Authorization : Bearer token_value`               |
| Custom Credentials   | `custom_header_key : custom_header_value`          |

To add credentials, simply select your preferred authentication method and enter the required information.
[![basic-auth-credential.png](../../img/extensions/ui-extensions/basic-auth-credential.png)](../../img/extensions/ui-extensions/basic-auth-credential.png)

Basic Authentication and Bearer Token credentials are encrypted before being stored, ensuring the security of your sensitive data. Additionally, the API calls are made server-side, meaning that the credentials are not accessible from the front end of the application, further enhancing security.

::: panel-link Filtering [Next](/extensions/filtering.html)
:::
