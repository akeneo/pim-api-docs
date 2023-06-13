# Certify your App

Akeneo App Certification is a certification program aiming at promoting partner Apps that meet the certification criteria defined by Akeneo as a part of its quality approach on the App Store.

This certification only concerns App extensions (Bundles or Connectors are excluded from the scope of the App Certification Program).

<h2>The App Certification Program assesses the following criteria:</h2>

<h3>1- A certified App must have complete documentation</h3>

<b>Why is this important?</b>

An App should have complete documentation to help users fully understand how it works, its scope and limitations.

<b>How do we check this criterion?</b>

- The App documentation must be written in English so that it can be understood by as many people as possible
- The App documentation must include a « How to set up the App » section
- The App documentation must include a « How to use the App » section
- The App documentation must provide information on the known limitations of the App (performance, scalability)
- The App documentation must be publicly available via the App page on the App Store

<h3>2- A certified App must have an up-to-date “Feature list”</h3>

<b>Why is this important?</b>

We know that building an App can be complex. We also know that meeting all the needs of customers in a comprehensive way can be challenging too. However, we require that partners be transparent about the scope of their Apps. Akeneo, therefore, provides its partners with a "Feature list" allowing them to present the exact scope of their Apps on the App Store. This feature list is displayed with the App information on the App Store.

<b>How do we check this criterion?</b>

- The App Feature list must be fully completed by the partner

<h3>3- A certified App must have a support contract</h3>

<b>Why is this important?</b>

An Akeneo PIM user should be able to report a bug or a problem with the partner's App and that in return, the partner should be able to respond quickly to help him.

<b>How do we check this criterion?</b>

- The partner must offer a support service for his App.
- This support service must be offered through a support contract.
- The support contract must contain information on how to report an issue or submit a question.
- The support contract must include information on the response time and processing time after reporting a bug or submitting a question

<h3>4- A certified App must have a certain maturity</h3>

<b>Why is this important?</b>

At Akeneo, we believe that an App that has never been used by a customer in a production environment has not lived long enough. An App should have a certain maturity to be considered as reliable.

<b>How do we verify this criterion?</b>

- The App must have been used in a production environment for a minimum of two months by two different Akeneo clients.

<h3>5- A certified App must have undergone some security checks</h3>

<b>Why is this important?</b>

We require that all App partners verify the security of their App and take all the appropriate steps to guarantee the security of their App.

<b>How do we verify this criterion?</b>

- We require that App partners sign the [App Security Charter](/apps/certify-your-app.html#app-security-charter) to commit to a certain number of security verification points for their App.

<h3>6- An App must have a standardized name</h3>

<b>Why is this important?</b>

An App should have a name that is clearly identifiable by App Store users to avoid any confusion regarding the third-party solution it addresses.

<b>How do we verify this criterion?</b>

- If the partner is a Technology partner: the App name must be :

  Third-party solution name + “App” (e.g.: Bynder App)

- If the partner is a Solution partner: Third-party solution name + “App by” + partner name (e.g: Commercetools App by Viamo)

<h3>How can a partner request an App Certification?</h3>

A partner who owns an App on the Akeneo App Store can request to be certified by email ([app-certication@akeneo.com](mailto:app-certification@akeneo.com)) or via our [App Support website](https://apps-support.akeneo.com/).

<b>What about the App Certification process?</b>

An Akeneo App Certification Team takes care of the certification with the App partner to check that each certification criterion is met.

A maximum of one month is set with the partner to pass the certification.

At the end of the certification process, and if the partner's App meets all certification criteria, Akeneo grants an Akeneo App Certification label to the certified App on the App Store.

The Akeneo certification of a partner App is valid for 1 year and can be renewed if the partner passes the certification again.

Akeneo reserves the right to modify its certification process and criteria every year, especially by adding new certification criteria.

<b>How to report a non-conforming Certification criteria?</b>

Akeneo PIM customers can report non-compliance issues with the App certification requirements regarding a specific App to Akeneo via this email address: [app-certification@akeneo.com](mailto:app-certification@akeneo.com).

The Akeneo Certification Team then proceeds to a new assessment of the App.

If non-compliance of the App with the certification criteria is established, Akeneo reserves the right to remove the certification from the App partner.

The certification is removed immediately until all the corrections required to meet the certification criteria are made by the partner and validated by Akeneo.

Akeneo waives any responsibility for the use of the app by the Customer as well as its features. The certification does not guarantee the interoperability of the app nor that it will work properly in the customer’s environment. The Akeneo Certification only checks and assesses the criteria defined on this page.

## App Security Charter
<h3>Why an App Security Charter?</h3>
We think it is important that an app is designed in such a way it can guarantee a certain level of security.

That's why Akeneo asks each partner wishing to certify their App to sign our <b>App Security Charter</b>.

<h3>Content of the App Security Charter</h3>
The App partner must therefore commit through the signature of this charter that he has understood and applied the recommendations indicated in each following security criteria:

<h3>1- PIM accesses scope</h3>
<b>Context:</b>

Related to the Akeneo App documentation on ["Authorization and authentication scopes"](/apps/authentication-and-authorization.html), an App suggests to the PIM user the permissions it needs to work properly.

<b>Commitment:</b>

The App owner commits to offering the PIM user only the PIM permissions the App needs to work properly (no unused access granted).

<h3>2- OAuth 2 security</h3>
<b>Context:</b>

Related to the Akeneo App documentation on [oAuth2 protocol](/apps/authentication-and-authorization.html#oauth-20), we explain it requires good management of the security information given by the App Store.

<b>Commitment:</b>

The App owner commits to storing the “OAuth 2.0 client credentials” delivered by the App Store (client_secret) and the “access token” securely and to make every effort to ensure that no third party can retrieve this information.

<h3>3- Hosting</h3>
<b>Context:</b>

The App owner is responsible for the App hosting.

<b>Commitment:</b>

The App owner commits to checking that the App hosting service guarantees that no unwanted access to the App can be made.

<h3>4- Code</h3>
<b>Context:</b>

The App owner is responsible for the App code and code dependencies/external libraries

<b>Commitments:</b>

The App owner commits to making every effort to ensure that its code does not contain any security vulnerabilities.
The App owner commits to keeping up-to-date to the least maintained version of external libraries (not owned by the App owner) but used by the App.
The App owner commits to fixing in the shortest possible time any security vulnerability that is communicated to him.

<h3>5- PIM data fair usage</h3>
<b>Context:</b>

An App with access to PIM data via its API can cause unwanted modifications to PIM data.

<b>Commitment:</b>

The App owner commits to performing sufficient testing to avoid unwanted changes to PIM data that could result in product data corruption.
<h3>6- API fair usage</h3>
<b>Context:</b>

An App with access to PIM data via its API can cause unwanted PIM overloads.

<b>Commitment:</b>

The App owner commits to respect PIM API [fair usage recommendations](/documentation/overview.html#fair-usage-protection).
