## App Approval Requirements

As Akeneo and our Akeneo App Store continue to grow thanks to you, it has become increasingly important for us to review the submission process for new Apps in an effort to maintain the quality standards that Akeneo users are expecting. By doing this, we will make sure that our Akeneo App Store remains a valuable resource for the Akeneo Community.

The requirements to submit an extension (an App, a Connector or a Bundle) on Akeneo App Store are listed below.

Your extension will not be approved to go live on the Akeneo App Store in case it doesn’t meet with any of these criteria.

<h3>The listing of your extension must have an exhaustive description, versioning information, and a few screenshots.</h3>

The more complete the description of your extension is, the more likely Akeneo users will install and use it. Akeneo PIM is about delivering a compelling product experience, so that should also apply to the Akeneo App Store. A few screenshots will also help the end-users to understand what your extension looks like, where is it hosted and if it is easy-to-use or dedicated to people with a technical background.

<h3>The page of your extension must come with documentation (installation, configuration and/or user guide) even if they are not open-source.</h3>

Same as for the description, we expect our users to be as autonomous as possible to get the most out of your extensions. Any step-by-step guide you can provide to accompany the release of your contribution on Akeneo App Store will enhance the experience of our Community on Akeneo PIM. This documentation should either be an install guide, or a user guide to go through all features. This documentation will also significantly reduce your workload for support.

<h3>You must provide a main point of contact in case Akeneo teams need to reach out to you for functional or technical questions about your contribution.</h3>

As much as we’d like to know how your extensions work, sometimes Akeneo teams are not sure to have the proper answer to a specific question. We need to be able to contact someone in your team who could assist us in providing our users with the right answers.

<h3>Any new extension must provide incremental value compared to what is already available in Akeneo or Akeneo ecosystem. Duplicates will not be accepted.</h3>

As the Akeneo ecosystem continues to grow, we want to continue delivering quality solutions that our users are looking for. Make sure that the extension you are about to submit doesn’t exist yet on Akeneo App Store, and provides additional features to what’s already available.

<h3>Functional tests have been performed on your contribution before submission to confirm it actually works with an Akeneo PIM instance.</h3>

Before we approve your extension on Akeneo App Store, we will check whether you performed functional tests or not. These tests will ensure that your extension is ready to install in a PIM environment, either on-premises or in the Cloud. If your extension is interfaced within the PIM, we may ask you for a copy of your extension to conduct additional tests.

<h3>You are able to demonstrate your contribution to Akeneo App Store team, through a live demo or a video hosted on a streaming platform.</h3>

Although it won’t be asked during the submission process, you should be able to demonstrate how your extensions work, at least once, to the Akeneo team. Frequently we advise Akeneo users to utilize Akeneo App Store contributions to enhance their experience, or simply to answer their use cases. A live demo or a video demonstration (e.g. a webinar) is always helpful in that regard. Feel free to add a video URL to the description of your extension ; it will also benefit to the community.

Please note these criteria don’t apply to Coming Soon pages.

<h3>Recommended tests</h3>

Quality is a MUST and we urge you to run as many tests as possible to ensure your extensions and add-ons work well for any kind of product catalog.

Although we do not certify extensions on the Akeneo App Store, Akeneo teams will always expect  extensions that are durable, performant and scalable.

<b>Code quality tests</b>

Confirm that you are  using the right coding conventions?

Make sure you take advantage of online tools, such as [PHPCheckstyle](http://phpcheckstyle.github.io/) for those who are  using PHP language. To check if your code has common programming flaws like unused variables, empty cache blocks or unnecessary object creation, you could also rely on [PMD](https://pmd.github.io/) to improve your developments.

These tests will be particularly important if your extension aims to be open-source, as it will help others to contribute.

<b>Unit tests</b>

Each menu and each feature of your extensions should work properly in a PIM environment.

Tools like [PHPunit](https://phpunit.de/) or [PHPSpec](http://www.phpspec.net/en/stable/) will help you conduct unit tests to confirm it does.

<b>Functional tests</b>

Functional tests should be conducted based on the user stories you have defined during the scoping of your extension.

<b>Scalability and Performance tests</b>

Thanks to Akeneo PIM capabilities, our users can scale their activity and centralize hundreds, thousands, up to millions of products. Running scalability tests will challenge the performance of your extension for large amounts of data, and will help to identify potential ways to improve it.

Happy with the results of your tests? Share them with the Community, or write us at [apps@akeneo.com](mailto:apps@akeneo.com) so we can tell Akeneo teams.

<h3>Maintenance and Support</h3>

Maintenance and support are two of the most frequently asked questions by our Enterprise users for extensions.

When you have a business to run, it is normal to believe that the extensions available on Akeneo App Store support the latest Akeneo releases and that someone will answer your calls in case the extension doesn’t work properly.

Although offering Maintenance and Support is not required for us to approve your extension on the Akeneo App Store, we hope you will allocate sufficient resources to deliver a good customer experience to the users of your extensions.

To decrease the amount of workload necessary each time Akeneo releases a new version of the PIM, we strongly advise you to develop your extensions using Akeneo REST API, whose code will never change. To know more about our API, please visit [this page](https://api.akeneo.com/).

## Compose your App Store public listing

<h3>Target users</h3>

Before getting into the writing of your listing page, you should first know who your target user is.

---

<b>Let me introduce you to Julia.</b>

<img src="../../img/apps/julia.png" style="width: 140px; margin:10px">

Julia is a PIM user in charge of enriching product information: she is the end-user of your App. So she needs to have information about your App on our Akeneo App Store:

- What solution your App connects to.
- What exactly your App does, how it works.
- How your App allows Julia to be more efficient, more productive.
- How your App helps Julia and her team save time and money.

> Julia doesn't need technical information, only your user documentation.
>

<b>Peter</b>

<img src="../../img/apps/peter.png" style="width: 140px; margin:10px">

Then there's Peter. Peter is Julia's IT contact. Peter is often accompanied by an integrator. Together, they are here to help Julia choose the right App.

*If your extension is a Connector or a Bundle, Peter must know everything about your extension:*

- What is the technical architecture of your extension?
- How to install your extension?
- Where will your extension be hosted?
- What are the limits of your extension (in terms of scalability and performance)?
- What support will you provide with your extension?
- Is it possible to download a demo version of your extension to test it?

<b>Peter and his integrator need access to all your technical information.</b>

As you can see, you have 2 target users who are not interested in the same type of information.

<h3>App information</h3>

Info:

Let's see now how to distribute the information of your App in the different Akeneo App Store extension fields.

<b>Name</b>

Here, indicate the name of your App.

Some tips:

- We have a 55 character constraint for the title so keep it as short as possible
- It’s not necessary to include your company name in the name of your App: we will add it in the details of your App.
- It’s not necessary to add “Akeneo” to your App name: In the Akeneo App Store the users know that your App is dedicated to Akeneo PIM. Please highlight the third party solution name in your App name because that’s what Julia will be looking for.

<b>Version</b>

Here, indicate your App version.

Some tips:

- Our recommendation is to use [semantic versioning](https://semver.org/) for your App:
- Please don’t add a “V” letter before your version: we will add it automatically.

<b>Short description</b>

Here, indicate a short description of your App.

Some tips:

- This short description will be visible when displaying the App in list mode.
- This short description is in full-text mode only (no layout, no links, no images)
- This short description needs to be … short, no more than a couple of sentences.
- Our recommendation: write a punchy catch phrase that explains in a very impactful way what your App does.

<b>Description</b>

Here, indicate a functional description of your App meant for Julia.

Some tips:

- Do not confuse the "Documentation" and "Description" parts of your App.
- This description is mainly for Julia. It should give her a global and complete overview of your App.
- This part should only contain functional information:
    - What software does your App interconnect with?
    - What are the main features of your App?
    - What are the main benefits Julia will get from your App?
    - What are the known limitations of your App?
- It is possible to format your description (rich text): do not hesitate to add titles to separate your text, links to redirect to a page of your website, and some images to illustrate your point.

<b>Documentation</b>

Here, indicate an introduction to your complete documentation, mainly for Peter.

Some tips:

- Use this space as an introduction to your online documentation available on your website if it exists.
- If you do not have an online documentation but a PDF, we suggest you use the next field (Documentation files) to upload your documentation. Please introduce this documentation file with a short text.
- If you don't have any documentation about your App, we invite you to create one on our Akeneo App Store using this field.
- Our recommendation - your online documentation should contain all your functional and technical information:
    - A complete list of all PIM data/features managed by your App
    - All configuration capabilities of your App
    - A complete end-user documentation
    - A list of known limits of your App (e.g: the limits of your extension in terms of scalability and performance)
    - A quick overview of your public roadmap
    - A description of your support service (with SLA)
    - A download or install process if it’s a connector/bundle

<b>URL of your App</b>

If you declared that your extension is an App, you must feel out these 2 fields:

- Activate URL
- Callback URL

<b>Documentation files</b>

Use this field if your documentation is a PDF file.

<b>Release notes</b>

Here, indicate all the history of your App versions.

Some tips:

- Do not hesitate to give all the details of your fixes/modifications on your App
- If you add or modify a feature, please add a link to the associated documentation

<b>Logo</b>

Here, upload a logo/an image that represents your App.

Some tips:

- The optimal size of this image should be 1140x900 pixels.
- This image will be displayed on the App list (in a category) or as a search result. This image will also be displayed as the first image of your image gallery on your App details.

<b>Gallery</b>

Here, upload some screenshots of your App.

Some tips:

- The optimal image size of these screenshots should be 1140x900 pixels.
- These screenshots are very important: they allow Julia and Peter to understand the scope and features of your App at a glance.
- Do not hesitate to take a screenshot of your UI, your configuration capabilities, etc.
- Remember: a good picture is better than a long speech!
- Our recommendation: 8 pictures max

<b>Categories</b>

Add your App to an Akeneo App Store category.

Some tips:

- Please, select only 1 category (we're going to limit to only 1 category in a near future)

<b>Akeneo editions & versions</b>

Here, indicate the PIM editions/versions compatibility of your App.

Some tips:

- Please make sure you have tested your App with this PIM edition/version before listing it on our Akeneo App Store.
- Our users filter on the PIM version they are using to find the App they could install, so make sure to stay up-to-date!
- If you do not have access to a test platform corresponding to the PIM edition/version, please contact us.

<b>Third party software name/editions/versions</b>

Indicate the third-party software editions/versions compatibility of your App here.

Some tips:

- Please make sure you have tested your App with this software edition/version before listing it on our Akeneo App Store.

<b>Price type</b>

Indicate your business model here.

Some tips:

- You can choose between 3 options: “Free”, “Fixed price” and “Quote based”.
- Related to your previous choice, please fill in the corresponding contextual fields.

<b>Support request</b>

Here, indicate how a user can contact you if they have a question or need support.

Some tips:

- We offer 2 capabilities:
    - If you don’t have a support form, our Akeneo App Store can manage this feature. The user support request will be sent to your email address.
    - If you have an online support form, our Akeneo App Store can redirect the user to your website.
