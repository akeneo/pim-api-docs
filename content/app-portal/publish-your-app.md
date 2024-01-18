# App Publication Requirements

Thanks to you, the Akeneo App Store continues to grow. It has become increasingly important for us to review the submission process for new apps to maintain the quality standards that Akeneo users expect. By doing this, we will ensure that the Akeneo App Store remains a valuable resource for our joint customers.

The requirements to submit an integration on Akeneo App Store are listed below.

::: warning
You must meet the following criteria to go live on the Akeneo App Store.
Otherwise, your app submission will not be approved.
:::

## Your app must bring value to our joint customers

We know that it can be challenging to create a first version of an app that is  comprehensive enough to suit all of our joint customers.

Investing in an app can be costly depending on its complexity, and we recommend an agile approach to gradually address all needed use cases.

That being said, **Akeneo will be particularly vigilant to ensure that your app meets the following criteria:**

::: warning
**The first version of your app must already bring value to our joint customers.**
 From its very first version, your integration must offer a way to help PIM users to **import, enrich or export** product information.
We will not accept 'promotional' apps to simply showcase a partnership between you and Akeneo.

**Your app must also bring value compared to the apps already featured on the App Store. We won't accept duplicates.**
It's important to compare your app features with those of your competitors. We believe it's not in the interest of our joint customers to find two apps on the App Store that do exactly the same thing in the same manner.
Please list your differentiators on your App Store listing.
:::

## Your app must have comprehensive information

We want to make sure that our joint customers have all the information they need to understand how your app will help them accelerate their business.

We also want our customers to understand what your app does but also what it doesn’t do yet.

This should help prevent any blocking situations due to a lack of information in your app description or documentation.

Also this information should be kept up to date: don't forget to regularly update your app information each time you release a new app update.

**Akeneo will be particularly vigilant to ensure that your app meets the following criteria:**

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

- If your app has a version number, be sure to use a **Semantic Versioning system** https://semver.org/.
- **50** characters max.
- You don’t need to add a "V" letter before your version number.
- If your app does not have any version number (because you may have a SaaS continuous integration logic on your app), please indicate "SaaS".

### Logo (Mandatory)

- File format: JPG, PNG, SVG, WEBP
- File size: 2048 kB max
- Your app logo image should have a square format (eg: 200x200 pixels).
- **Your app logo must not contain the Akeneo logo**

### Short description (Mandatory)

- **The “short description” should be a punchy catchphrase that explains what your app can help our joint customers in a very impactful way.**
- 500 characters max.
- Text only (no layout, no links, no images).

### Description (Mandatory)

- Your “description” must describe:
    - The **use-cases** addressed by your app
    - The **benefits** users will get from your app
    - The **exact scope** of your app
    - If your integration is a Bundle, a Connector or a custom app, your documentation must also indicate **where you can download it**.
- Rich text (please add titles to separate your text, links to redirect to your website page or documentation, and some images to illustrate your point)
- The more complete the description of your app is, the more likely Akeneo users will connect/install and use it.

### Video link (Optional)

- Format: Youtube video
- The video should demonstrate how your app works in a very efficient way.

::: info
Please upload a video of **5 to 10 minutes maximum** presenting the main features of your app.
If you'd like to add a more detailed video presenting an exhaustive demonstration of all your app's features, you can add a link to it in your description or documentation.
:::

### Visuals (Mandatory)

- **Your visuals must give an overview of your app UI. It will also help our joint customers understand what your app looks like and if it is easy to use.**
- File format: JPG, PNG, SVG, WEBP
- File size: 2048 kB max

### Slug (Optional)

- **The Slug represents the URL of your app on the App store for SEO purpose.**
- Format: only in lowercase with letters and numbers, - and _ (no blank space)

### Categories (Mandatory)

- You app categories must represent the use cases addressed by your app
- You can select multiple categories

::: info
Akeneo may modify the categories of your app in order to maintain a consistent user experience on the App Store.
:::

### Release notes (Optional)

- Your app release notes should give all the details about bug fixes and newly released features.
- If you added or modified a feature, please add a link to the related online documentation.

### Activation Button Set up (Mandatory, Only for app integrations)

- **Activate Url:** As per the **[App authentication](/apps/authentication-and-authorization.html)** process, you must indicate the “activate” URL of your app
- **Callback Url:** As per the **[App authentication](/apps/authentication-and-authorization.html)** process, you must indicate the “callback” URL of your app

::: warning
Please double check that your Activate and Callback URLs are public before submitting your app.
:::

### Requirements (Mandatory)

- **Akeneo PIM editions and versions:** You must specify which Akeneo PIM editions and versions your app is compatible with.

Define your app PIM edition and version compatibility as follows:

- List all API end-points you use on your app
- Check the PIM edition and version compatibility of these API end-points via our [API reference documentation](/api-reference-index.html).
- And from that, you can figure out with which Akeneo PIM edition/version compatibility your app is compatible.

- **Third-party software name, editions, versions:** If your app enables the connection of Akeneo PIM to a third-party software, please write here all the information needed to understand which third-party software your app is compatible with.

::: warning
Setting your app PIM Editions/Versions compatibility correctly is **strategic** for your app visibility.
The PIM-integrated App Store **will only display** your app on the PIM Editions/Editions you declared.
Please be sure to update this information regularly after each new PIM release.
:::

### Help and support (Mandatory)

**Support**

- **Support contact (Optional):** You should indicate a support contact person (email) that users can contact for assistance. **If you offer another way to contact your support, your must add the corresponding process to your documentation.**

**Documentation**

- **Documentation and documentation file (Mandatory):** Here you must indicate where your app documentation is located:
    - **Online documentation:** If your app documentation is online and you want to set a link to it or if you want to write your documentation directly on the App Store: please use the “documentation” rich text editor field.
    - **PDF documentation:** If your app documentation is a PDF file, please upload it in the “documentation file” field.


    This documentation should be an install guide and a user guide to present all your app features.

    **As a benefit, this documentation will also significantly reduce your workload for your app support team!**

    **Important requirements about your documentation:**

    ::: warning
    Your documentation must be **in English**. Akeneo is a global company and even if you target local customers exclusively in your country, all our joint customers should be able to understand your documentation. 😊
    :::

    ::: warning
    If your integration is a **Connector** or a **Custom App**, your documentation must explain how a user can **download and install it**.

    Ìf your integration is an **app**, your documentation must explain how to connect the app via the PIM-integrated App Store.
    :::

    ::: warning
    Your documentation must also explain **how to configure** your app with all the required details.
    :::

    ::: warning
    Your documentation must also contain a specific **user documentation** part to explain how Julia, our dear PIM user, can use your integration to accelerate her business.
    :::

    ::: warning
    Then, your documentation must have a dedicated chapter on the **known limits** of your integration (Not-yet-managed PIM data (scope limitations), scalability, performance…).
    :::


### Price

Please indicate the price model of your app.

| Property | Description | Tips |
| --- | --- | --- |
| Price type | Your pricing model. | You can choose between 3 options: "Free", "Fixed price" and "Quote based". |
| Price | Your app price. | Depending on your price type |
| Currency | Price currency. | Depending on your price type |

::: info
Price and Currency fields are related to your Price type. You may leave these fields empty.
:::

### Feature List (Mandatory)
Depending on the selected Category for your app, a few extra "Feature List" select fields will be displayed for you to complete.
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
This step is crucial in ensuring a smooth and efficient validation process, as well as maximizing the potential success of your app.
:::

## Your app must guarantee a certain level of security

Because your app will either pull data from Akeneo to external services or push data to enrich the Akeneo PIM, your app must comply with Akeneo security policies. Each app which will be submitted for publication will be reviewed and will need to meet the security requirements described below. You'll also find more information and tips on the [security requirements page](/apps/secure-your-app.html) to improve the security of your app.

### Security Publication Process

Before any app is accepted into our App Store, we scan it for potential security issues.
The Akeneo Security team will perform the following tests on the source code of the app to be published: 

- Source Composition Analysis to detect vulnerabilities on the dependencies your code is using.
- Secrets Scanning to detect potential secret management security flaws.
- OWASP Top 10-based Static Application Security Testing (SAST). 
- Docker image vulnerability scanning if applicable.

If a potential security issue is detected on your app during the tests, we'll notify you to help you quickly address the issue and help keep your users safe.

::: warning
**Important**: In order to check the security of your app, you must deliver your app code to Akeneo. **Akeneo commits to not sharing your source code with any third party, and to deleting it once the scan has been completed**.
:::

### Submitting your code

Your App source code must be provided as part as the App Submission process.
- The source code **MUST** be provided as a .zip archive, following this specific format: *<name_of_your_app>*.zip. Please reach your Akeneo contact for more information.

## You must guarantee a certain level of service related to your app

### Lead management and commitment to responsiveness

We want to be sure you’re not going to miss out on important opportunities you may have via the App Store.

Your app page has a "Request more information" button and by default, all members of your organization on the App Store will receive an email notification each time a new client requests more information.

Once your App has been submitted, please make sure that all the business or presale contact persons in your organization have been added on the App Store.
**Double-check that the notifications are correctly directly to the interested parties**.

**Akeneo will be particularly vigilant to ensure that your service meets the following criteria:**
::: warning
We ask all our App partners to commit to a quick response within 24 business hours to any customer request made via the “Request more information” button.
:::

### Support and SLA

We pay particular attention to the satisfaction of our joint customers when it comes to the maintenance of your app.

That's why we feel it's important for you to commit to the availability of your support teams and their ability to respond to any bugs reported on your App.

**Akeneo will be particularly vigilant to ensure that your support service meets the following criteria:**
::: warning
- You must offer a quality support service for your app.
- The specific terms of your support service must be clear and available via the app documentation or via a dedicated support contract.
- The support service must have associated SLA (**Service-level agreement**).
:::


## Your app must have passed the necessary tests to guarantee a certain level of quality.

**Functional tests must have been performed on your app before submission to confirm it works with an Akeneo PIM instance.**

Before we approve your app on Akeneo App Store, we will check whether you performed functional tests or not. These tests will ensure your App is ready for installation on a PIM environment.    

::: warning
You must also demonstrate your contribution to Akeneo App Store team through a live demo or a video hosted on a streaming platform.**
:::

### Mandatory tests

Quality is a MUST, and we urge you to run as many tests as possible to ensure your App works well for any type of product catalog.  

Although we do not certify apps on the Akeneo App Store, Akeneo teams will always expect durable, efficient, and scalable apps.  


**Code quality tests**

Are you using the proper coding conventions?

Make sure you take advantage of online tools, such as [PHPCheckstyle](http://phpcheckstyle.github.io/), for those using PHP language.  
To check if your code has common programming flaws like unused variables, empty cache blocks, or unnecessary object creation, you could also rely on [PMD](https://pmd.github.io/) to improve your developments.  

These tests will be essential if your extension aims to be open-source, as it will help others to contribute.  


**Unit tests**

Each menu and each feature of your app should work properly in a PIM environment.  

Tools like [PHPunit](https://phpunit.de/) or [PHPSpec](http://www.phpspec.net/en/stable/) will help you conduct unit tests to confirm it does.  


**Functional tests**

Functional tests should be conducted based on the user stories you have defined during the scoping of your app.  


**Scalability and Performance tests**

Thanks to Akeneo PIM capabilities, our users can scale their activity and centralize hundreds, thousands, or up to millions of products.  
Running scalability tests will challenge the performance of your extension for large amounts of data and help identify potential ways to improve it.  
