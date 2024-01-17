# App Publication Security

As your App will either pull data from Akeneo to external services or push data to enrich the Akeneo PIM, your App must be compliant with Akeneo security policies. Each app which will be submitted to publication will be reviewed according to the security requirements described below. 

## Security Requirements   

### OAuth2 PIM Access Scope

The scopes requested by your App during the [authentication process](https://api.akeneo.com/apps/authentication-and-authorization.html#authorization-and-authentication-scopes) **MUST** follow the least privilege principle and thus solely be the ones your App needs to function. You can find all the scopes available [here](https://api.akeneo.com/apps/authentication-and-authorization.html#available-authorization-scopes) to determine which ones suit your business needs.

### Secrets management

During the creation of your App, you will be provided a set of [credentials](https://api.akeneo.com/apps/authentication-and-authorization.html#oauth-20) (an access token and a set containing your client_id and your client_secret) to access the PIM and perform the operations aforementionned. Those credentials **MUST** be stored securely and to make every effort to ensure that no third party can retrieve this information.

We advise to use a dedicated secrets management system which allows to store, rotate & monitor secret access securely. You can follow the OWASP Top Ten secret management [best practices](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) as a reference.

### Code-related vulnerabilities

The App owner **MUST** ensure that the code of the App does not contain any vulnerabilities, notably (not limited to) preventing any issue that might lead to product data corruption. The [OWASP Top ten](https://owasp.org/www-project-top-ten/) and its cheat sheet [series](https://cheatsheetseries.owasp.org/index.html) covers most, if not all the security risks you will need to mitigate during the development of your App. In case of a vulnerability discovered, the latter MUST be patched in a timely manner.

### Third-Party Dependencies

Your App third-party dependencies & external library versions **MUST** be supported and not be vulnerable to any CVEs. In case of a vulnerability discovered, the latter **MUST** be patched in a timely manner whenever a fix is available. We encourage you to use a [Source Composition Analyzer](https://owasp.org/www-community/Component_Analysis) to detect if your code base has any vulnerable dependencies.


### Hardening

Your infrastructure (notably docker images) **MUST** follow industry-best practices in terms of security hardening to mitigate security risks. For a more thorough analysis, the [CIS](https://www.cisecurity.org/cis-benchmarks) benchmarks are widely used to ensure that compliance with well-known best practices. You can use tools based on these rules to detect potential vulnerabilities.

### Fair Use

Your App **MUST** comply with Akeneo PIM API [fair use](https://api.akeneo.com/documentation/overview.html#fair-usage-protection).