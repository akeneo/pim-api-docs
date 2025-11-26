::: warning Thank you for your interest in building an app for the Akeneo App Store. At the moment, we are not actively accepting new submissions.:::

# App Publication Security

Because your app will either pull data from Akeneo to external services or push data to enrich the Akeneo PIM, your app must be compliant with Akeneo security policies. 
## Security Requirements   

### OAuth2 PIM Access Scope

The scopes requested by your app during the [authentication process](/apps/authentication-and-authorization.html) **MUST** follow the least privilege principle and thus solely be the ones your app needs to function. You can find all the scopes available [here](/apps/authentication-and-authorization.html#available-authorization-scopes) to determine which ones suit your business needs.

### Secrets management

During the creation of your app, you will be provided a set of [credentials](/apps/authentication-and-authorization.html#oauth-20) (an access token and a set containing your client_id and your client_secret) to access the PIM and perform the operations mentioned above. Those credentials **MUST** be stored securely and you must take all necessary steps to ensure that no third party can retrieve that information.

We strongly recommend that you use a dedicated secrets management system which enables you to store, rotate and monitor access to the secrets securely. Please follow the OWASP Top Ten secret management [best practices](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) for  reference.

### Code-related vulnerabilities

The app owner **MUST** ensure that the app code does not contain any vulnerabilities, in particular (but not limited to) vulnerabilities that could lead to product data corruption. The [OWASP Top ten](https://owasp.org/www-project-top-ten/) and its cheat sheet [series](https://cheatsheetseries.owasp.org/index.html) cover most, if not all, security risks that you will need to mitigate during the development of your app. Any vulnerability that is discovered MUST be patched in a timely manner.

### Third-Party Dependencies

Your app third-party dependencies & external library versions **MUST** be supported and cannot be vulnerable to any CVEs. Any vulnerability that is discovered **MUST** be patched in a timely manner whenever a fix is available. We encourage you to use a [Source Composition Analyzer](https://owasp.org/www-community/Component_Analysis) to detect if your code base contains any vulnerable dependencies.


### Hardening

If you are using docker images, you **MUST** follow industry best practices in terms of security hardening to mitigate security risks. For a more in-depth  analysis, the [CIS](https://www.cisecurity.org/cis-benchmarks) benchmarks are widely used to ensure compliance with well-known best practices. You can use tools based on these rules to detect potential vulnerabilities.

### Fair Use

Your app **MUST** comply with Akeneo PIM API [fair use](/documentation/overview.html#fair-usage-protection).
