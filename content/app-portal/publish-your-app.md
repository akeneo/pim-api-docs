# App Publication Requirements

Thanks to you, the Akeneo App Store continues to grow. It has become increasingly important for us to review the submission process for new apps to maintain the quality standards that Akeneo users expect. By doing this, we will ensure that the Akeneo App Store remains a valuable resource for our joint customers.

The requirements to submit an integration on Akeneo App Store are listed below.

::: warning
You must meet the following criteria to go live on the Akeneo App Store.
Otherwise, your app submission will not be approved.
:::

## Your app must bring value to our joint customers

We know that it can be challenging to create a first version of an app that is functionally comprehensive enough to suit all of our joint customers.

Investing in an app can be costly depending on its complexity, and we recommend an agile approach to gradually address all needed use cases.

Also we can help you to

That being said, **Akeneo will be particularly attentive to ensure that your app meets the following criteria:**

::: warning
**From the first version of your app, it must bring value to our joint customers.**
 From its very first version, your integration must offer a way to help PIM users to **import, enrich or export** product information.
We will not accept 'promotional' app that simply indicates a partnership between you and Akeneo.

**Your app must also bring value compared to the apps already present on the App Store. We won't accept duplicates**
It's important to compare your app features with those of your competitors. We believe it's not in the interest of our joint customers to find two apps on the App Store that do exactly the same thing in the same manner.
Please list your differentiators on your App Store listing.
:::

## Your app must have comprehensive information

We want to ensure that before choosing your app, our joint customers have everything they need to understand how your app will help them accelerate their business.

We also want our customers to understand what your app does but also what it doesn’t do yet.

This should help prevent any blocking situations due to lack of information in your app description or documentation.

Also this information should be kept up to date: please, regularly update your app information following your app updates.

**Akeneo will be particularly attentive to ensure that your app meets the following criteria:**

### App Name (Mandatory)

- If your integration connects Akeneo PIM to a third-party software, then the name of your integration **must contain the name of the third-party software**.
- If you are a solution partner or an integrator please add your company name in your app name. Today,  the App Store is open to multiple integrations addressing the same solution. Our joint customers need to be able to distinguish between them.
- **The app name must not contain the "Akeneo" trademark**.
- **70 characters max**.
- The name should not contain **marketing jargon**. The name of your integration should only represent what it does, as concisely and efficiently as possible.

**Some examples:**
- If you are Adobe (Technology partner) and your app adresses Adobe commerce, your integration name should be:

**—> Adobe commerce app**

- If you are Sitation (Solution partner) and your Connector adresses Salesforce Commerce Cloud, your integration name should be:

**—> Salesforce Commerce Cloud Connector by Sitation**

- If you are Induxx (Solution partner) and your app translates production information via DeepL, your integration name should be:

**—> DeepL App by Induxx**

### Version (Mandatory)

- If your app has a version be sure to use a **Semantic Versioning** https://semver.org/.
- **50** characters max.
- You don’t need to add a "V" letter before your version number.
- If you have no version on your app (because you may have a SaaS continuous integration logic on your app), please indicate "SaaS".

### Logo (Mandatory)

- File format: JPG, PNG, SVG, WEBP
- File size: 2048 kB max
- Your app logo image should have a square format (eg: 200x200 pixels).
- **Your app logo must not contain the Akeneo logo**

### Short description (Mandatory)

- **The “short description” should be a punchy catchphrase that explains what your app can help our joint customer in a very impactful way.**
- 500 characters max.
- Text only (no layout, no links, no images).

### Description (Mandatory)

- Your “description” must describe:
    - The **use-cases** addressed by your app
    - The **benefits** users will get from your app
    - The **exact scope** of your app
    - if your integration is a Bundle, a Connector or a custom app, your documentation must aslo indicate **where you can download it**.
- Reach text (please add titles to separate your text, links to redirect to your website page or documentation, and some images to illustrate your point)
- The more complete the description of your app is, the more likely Akeneo users will connect/install and use it.

### Video link (Optional)

- Format: Youtube video
- The video should demonstrate how your app works in a very efficient way.

::: info
Please upload a video of **5 to 10 minutes maximum** presenting the main features of your app.
If you'd like to add a more detailed video presenting an exhaustive demonstration of all your app's features, you can add a link to it in your description or documentation.
:::

### Visuals (Mandatory)

- **Your visuals must give an overview of your app UI. It will also help our joint customers to understand what your app looks like and if it is easy to use.**
- File format: JPG, PNG, SVG, WEBP
- File size: 2048 kB max

### Slug (Optional)

- **The Slug represents the URL of your app on the App store for SEO purpose.**
- Format: only in lowercase with letters and numbers, - and _ (no blank space)

### Categories (Mandatory)

- You app categories must represent the use-cases addressed by your app
- You can select multiple categories

::: info
Akeneo may modify the categories of your app in order to maintain the App Store consistent user experience.
:::

### Release notes (Optional)

- The release notes of your app should give all the details about bug fixes and new features you release.
- If you added or modified a feature, please add a link to your related online documentation.

### Activation Button Set up (Mandatory, Only for app integrations)

- **Activate Url:** Following the **[App authentication](/apps/authentication-and-authorization.html)** process, you must indicate the “activate” URL of your app
- **Callback Url:** Following the **[App authentication](/apps/authentication-and-authorization.html)** process, you must indicate the “callback” URL of your app

::: warning
Please double check that your Activate and Callback URLs are public before submitting your app.
:::

### Requirements (Mandatory)

- **Akeneo PIM editions and versions:** You must indicate the Akeneo PIM editions and versions compatibility of your app.

Define your app PIM edition and version compatibility by following the current process:

- List all API end-points you use on your app
- Check the PIM edition and version compatibility of these API end-points via our [API reference documentation](/api-reference-index.html).
- Therefore deduce the Akeneo PIM edition/version compatibility of your app.

- **Third-party software name, editions, versions:** If your app enables to connect Akeneo PIM to a third-party software, please indicates here all information needed to understand the third-party compatibility of your app.

::: warning
Setting your app PIM Editions/Versions compatibility correctly is **strategic** for your app visibility.
The PIM-integrated App Store **will only display** your app on PIM Editions/Editions you declared.
Please be sure also to update regularly this information following the new PIM releases.
:::

### Help and support (Mandatory)

**Support**

- **Support contact (Optional):** You should indicate a support contact (email) allowing users to contact you when they need support. **If you have another way to contact your support your must add this related process to your documentation.**

**Documentation**

- **Documentation and documentation file (Mandatory):** With this part you must indicate where your app documentation is located:
    - **Online documentation:** If your app documentation is online and you want to set a link to this one or if you want to write your documentation directly on the App Store: please use the “documentation” reach text editor field.
    - **PDF documentation:** if your app documentation is a PDF file, please upload this one on the “documentation file” field.


    As for the description, we expect our joint users to be as autonomous as possible to get the most out of your app.
    This documentation should be an install guide or a user guide to go through all features.

    **As a benefit, this documentation will also significantly reduce your workload on your app support!**

    **Important requirements about your documentation:**

    ::: warning
    Your documentation must be **in English**. Akeneo is a global company and even if you target local customers from your country only, all our joint customers should be able to understand your documentation. 😊
    :::

    ::: warning
    If your integration is a **Connector** or a **Custom App**, your documentation must explain how a user can **download and install it**.

    Ìf your integration is an **app**, your documentation must explain how to connect the app via the PIM-integrated App Store.
    :::

    ::: warning
    Your documentation must also explain **how to configure** your app with all required details.
    :::

    ::: warning
    Your documentation must also contain a specific **user documentation** part to explain how Julia, our dear PIM user, can use your integration to accelerate her business.
    :::

    ::: warning
    Then, your documentation must have a dedicated chapter on the **known limits** of your integration (Not-yet-managed PIM data (scope limitations), scalability, performance…).
    :::


### Price

    | Property | Description | Tips |
    | --- | --- | --- |
    | Price type | Your pricing model. | You can choose between 3 options: "Free", "Fixed price" and "Quote based". |
    | Price | Your app price. | Depending on your price type |
    | Currency | Price currency. | Depending on your price type |

    ::: info
    Price and Currency fields are related to your Price type. You may leave these fields empty.
    :::

### Feature List (Mandatory)
Depending on the selected Category for your extension some extra "Feature List" select fields will be displayed to complete.
| Category | Sections |
| --- | --- |
| E-commerce, Syndication, Print | Akeneo PIM data/properties|
| E-commerce, Syndication, Print | Connector/App capabilities |
| E-commerce, Syndication | Data synchronization |
| Translation | Akeneo PIM data managed by the extension |
| Translation | Extension settings |
| Translation | Extension capabilities |
| DAM | PIM EE compatibility with asset manager |
| DAM | PIM CE/GE compatibility |
| DAM | Both ways metadata synchronization |

::: info
This step is crucial in ensuring a smooth and efficient validation process, as well as maximizing the potential success of your extension.
:::

## Your app must guarantee a certain level of security

As your app will either pull data from Akeneo to external services or push data to enrich the Akeneo PIM, your app must be compliant with Akeneo security policies. Each app which will be submitted to publication will be reviewed according to the security requirements described below.

### Security Publication Process

To ensure the compliance with the different subjects aforementionned, Akeneo will perform security tests on your application source code prior to your app publication.

**To perform this action:**

- You must provide your app source code to Akeneo
    - The source code **MUST** be provided as a .zip archive, under the format *<name_of_your_app>*.zip.
    - You can also give access to your Source Version Control tool to your Akeneo contact.
- Akeneo will perform security tests on your source code based on the requirements presented on this page.
- You will then be contacted to discuss the results of the tests in case vulnerabilities are detected.

### Confidentiality

Akeneo commits to only use the source code for this very use. Your source code will be deleted at the end of the publication process or a month after the first scan.

::: warning
**Important: In order to check the security of your app, you must deliver your app code to Akeneo as a Zip archive (or an access to your Github)**

Akeneo will then perform a security scan on your code and provide you with the corresponding Security report.

**Confidentiality: Akeneo commits to not sharing your source code with any third party, and to deleting it once the scan has been completed.**
:::

## You must guarantee a certain level of service around your app

### Lead management and commitment on responsiveness

We want to be sure you’re not going to miss out on important opportunities you may have via the App Store.

Your app page has a "Request more information" button and by default, all members of your organization on the App Store will receive an email notification each time a new client requests more information.

After your App submission, please check that, on the App Store, in your company organization, you invited all people needed to perform this action (commercial or presale contacts).

**Akeneo will be particularly attentive to ensure that your service meets the following criteria:**
::: warning
We ask all our App partners to commit to a quick response within 24 business hours to any customer request made via the “Request more information” button.
:::

### Support and SLA

We pay particular attention to the satisfaction of our joint customers when it comes to the maintenance of your App.

That's why we feel it's important for you to commit to the availability of your support teams and their ability to respond to any bugs reported on your App.

**Akeneo will be particularly attentive to ensure that your support service meets the following criteria:**
::: warning
- You must offer a quality support service related to the App.
- The exact condition of this support service must be clear and available via the App documentation or via a dedicated support contract.
- The support service must have associated SLA (**Service-level agreement**).
:::


## Your App must have passed the necessary tests to guarantee a certain level of quality.

**Functional tests have been performed on your App before submission to confirm it works with an Akeneo PIM instance.**

Before we approve your App on Akeneo App Store, we will check whether you performed functional tests or not. These tests will ensure your App is ready to install on a PIM environment.    

::: warning
You must also demonstrate your contribution to Akeneo App Store team through a live demo or a video hosted on a streaming platform.**
:::

### Mandatory tests

Quality is a MUST, and we urge you to run as many tests as possible to ensure your App works well for any type of product catalog.  

Although we do not certify App on the Akeneo App Store, Akeneo teams will always expect durable, performant, and scalable extensions.  


**Code quality tests**

Are you using the proper coding conventions?

Ensure you take advantage of online tools, such as [PHPCheckstyle](http://phpcheckstyle.github.io/), for those using PHP language.  
To check if your code has common programming flaws like unused variables, empty cache blocks, or unnecessary object creation, you could also rely on [PMD](https://pmd.github.io/) to improve your developments.  

These tests will be essential if your extension aims to be open-source, as it will help others to contribute.  


**Unit tests**

Each menu and each feature of your extensions should work properly in a PIM environment.  

Tools like [PHPunit](https://phpunit.de/) or [PHPSpec](http://www.phpspec.net/en/stable/) will help you conduct unit tests to confirm it does.  


**Functional tests**

Functional tests should be conducted based on the user stories you have defined during the scoping of your extension.  


**Scalability and Performance tests**

Thanks to Akeneo PIM capabilities, our users can scale their activity and centralize hundreds, thousands, or up to millions of products.  
Running scalability tests will challenge the performance of your extension for large amounts of data and help identify potential ways to improve it.  
