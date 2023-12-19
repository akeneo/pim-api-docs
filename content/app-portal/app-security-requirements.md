# App Publication Security

As your App will either pull data from Akeneo to external services or push data to enrich the Akeneo PIM, your App must be compliant with Akeneo security policies. Each app which will be submitted to publication will be reviewed according to the security requirements described below. 


## Security Checks Requirements

### OAuth2

Your App uses OAuth2 to access the PIM and perform the operations aforementionned. To do so, you **MUST** comply with the following security requirements :   

#### PIM Access Scope

Your App needs to ask for scopes during the [authentication process](https://api.akeneo.com/apps/authentication-and-authorization.html#authorization-and-authentication-scopes). The scopes requested **MUST** follow the least privilege principle and solely the ones your App needs to function. You can find all the scopes available [here](https://api.akeneo.com/apps/authentication-and-authorization.html#available-authorization-scopes) to determine which ones suit your business needs.

#### Secrets management

During the creation of your App, you will be provided a set of [credentials](https://api.akeneo.com/apps/authentication-and-authorization.html#oauth-20) (an access token and a set containing your client_id and your client_secret). Those credentials **MUST** be stored securely and to make every effort to ensure that no third party can retrieve this information.

We advise to use a dedicated secrets management system which allows to store, rotate & monitor secret access securely. You can follow the OWASP Top Ten secret management [best practices](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) as a reference.

### Code-related vulnerabilities

The App owner **MUST** ensure that the code of the App does not contain any vulnerabilities. The [OWASP Top ten](https://owasp.org/www-project-top-ten/) and its cheat sheet [series](https://cheatsheetseries.owasp.org/index.html) covers most, if not all the security risks you will need to mitigate during the development of your App. In case of a vulnerability discovered, the latter MUST be patched in a timely manner.

### Third-Party Dependencies

Your App third-party dependencies & external library versions **MUST** be supported and not be vulnerable to any CVEs. In case of a vulnerability discovered, the latter MUST be patched in a timely manner whenever a fix is available. We encourage you to use a [Source Composition Analyzer](https://owasp.org/www-community/Component_Analysis) to detect if your code base has any vulnerable dependencies.


### Hardening

Your infrastructure (web server, docker images, IaC ...) **MUST** follow industry-best practices in terms of hardening. For a more thorough analysis, you can have a look at the [CIS](https://www.cisecurity.org/cis-benchmarks) benchmarks related to your environment to ensure that you comply with those practices. 