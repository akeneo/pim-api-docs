# App Publication Security

As your App will either pull data from Akeneo to external services or push data to enrich the Akeneo PIM, your App must be compliant with Akeneo security policies. Each app which will be submitted to publication will be reviewed according to the security requirements described below. 

## Security Requirements   

### OAuth2 PIM Access Scope

Your App needs to ask for scopes during the [authentication process](https://api.akeneo.com/apps/authentication-and-authorization.html#authorization-and-authentication-scopes). The scopes requested **MUST** follow the least privilege principle and solely the ones your App needs to function. You can find all the scopes available [here](https://api.akeneo.com/apps/authentication-and-authorization.html#available-authorization-scopes) to determine which ones suit your business needs.

### Secrets management

During the creation of your App, you will be provided a set of [credentials](https://api.akeneo.com/apps/authentication-and-authorization.html#oauth-20) (an access token and a set containing your client_id and your client_secret) to access the PIM and perform the operations aforementionned. Those credentials **MUST** be stored securely and to make every effort to ensure that no third party can retrieve this information.

We advise to use a dedicated secrets management system which allows to store, rotate & monitor secret access securely. You can follow the OWASP Top Ten secret management [best practices](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) as a reference.

### Code-related vulnerabilities

The App owner **MUST** ensure that the code of the App does not contain any vulnerabilities, notably (not limited to) preventing any issue that might lead to product data corruption. The [OWASP Top ten](https://owasp.org/www-project-top-ten/) and its cheat sheet [series](https://cheatsheetseries.owasp.org/index.html) covers most, if not all the security risks you will need to mitigate during the development of your App. In case of a vulnerability discovered, the latter MUST be patched in a timely manner.

### Third-Party Dependencies

Your App third-party dependencies & external library versions **MUST** be supported and not be vulnerable to any CVEs. In case of a vulnerability discovered, the latter MUST be patched in a timely manner whenever a fix is available. We encourage you to use a [Source Composition Analyzer](https://owasp.org/www-community/Component_Analysis) to detect if your code base has any vulnerable dependencies.


### Hardening

Your infrastructure (web server, docker images, IaC, hosting ...) **MUST** follow industry-best practices in terms of security hardening to mitigate security risks. For a more thorough analysis, the [CIS](https://www.cisecurity.org/cis-benchmarks) benchmarks are widely used to ensure that compliance with well-known best practices.

### Fair Use

Your App **MUST** comply with Akeneo PIM API [fair use](https://api.akeneo.com/documentation/overview.html#fair-usage-protection).

## Security Verifications

### Security Publication Process

To ensure the compliance with the different subjects aforementionned, Akeneo will perform security tests prior to your App publication.
- You must provide your App source code to Akeneo
    - The source code **MUST** be provided as a .zip archive.
    - You can also give access to your Source Version Control tool to your Akeneo contact
- Akeneo will perform security tests on your source code based on the requirements presented on this page
- You will then be contacted to discuss the results of the tests

### Confidentiality

Akeneo commits to only use the source code for this very use. Your source code will be deleted at the end of the publication process or a month after the first scan.