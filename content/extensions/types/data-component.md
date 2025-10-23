## Data component
A **data component** UI extension is designed to query data from an predefined endpoint and display them in a **colapsible panel** on the product edit form. It aims to ease the completion of product information without leaving the PIM. The panel is accessible via a button on the header of the form. It can be opened and closed by clicking the button.

Please note the following key points regarding its functionality:

* Raw data display: The extension expect queried data to be of JSON format and will display it as it is. To ease navigation, section are collapsible.
* GET HTTP method: The request being sent to the destination is a GET request.
* Signature: It's possible to configure a secret to sign the body of the POST request sent to the destination (SHA-512 protocol).
* Authenticated calls: Thanks to the possibilty of adding [credentials](/extensions/credentials.html) to the extension, you are able to query endpoints requiring authentication.