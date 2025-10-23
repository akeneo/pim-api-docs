# Credentials
You have the ability to make authenticated calls via UI Extensions using credentials. These credentials will be used as headers in the POST requests generated when calling the specified URL.

// TODO: add code

### Available Credential Methods

| Methode              | Header                                             |
|----------------------|----------------------------------------------------|
| Basic Authentication | `Authorization : base64_encode(username:password)` |    
| Bearer Token         | `Authorization : Bearer token_value`               |
| Custom Credentials   | `custom_header_key : custom_header_value`          |

To add credentials, simply select your preferred authentication method and enter the required information.
[![basic-auth-credential.png](../../img/extensions/ui-extensions/basic-auth-credential.png)](../../img/extensions/ui-extensions/basic-auth-credential.png)

Basic Authentication and Bearer Token credentials are encrypted before being stored, ensuring the security of your sensitive data. Additionally, the API calls are made server-side, meaning that the credentials are not accessible from the front end of the application, further enhancing security.

## Learn More

- [Action Extensions](/extensions/types/action.html) - Using credentials with actions
- [Data Component Extensions](/extensions/types/data-component.html) - Using credentials with data components
- [Custom Componet Extensions](extensions/types/custom-componetns.html) - Using credentials with custom components

::: panel-link Filtering [Next](/extensions/filtering.html)
:::