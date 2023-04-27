# Publish your App 

## App Approval Requirements

Thanks to you, the Akeneo App Store continues to grow. It has become increasingly important for us to review the submission process for new Apps to maintain the quality standards that Akeneo users expect. By doing this, we will ensure that our Akeneo App Store remains a valuable resource for the Akeneo Community.

The requirements to submit an extension (an App, a Connector, or a Bundle) on Akeneo App Store are listed below.

You must meet the following criteria to go live on the Akeneo App Store. Otherwise, we won't approve your extension. 

### Criteria

**The listing of your extension must have an exhaustive description, versioning information, and a few screenshots.**

The more complete the description of your extension is, the more likely Akeneo users will install and use it.  
Akeneo PIM is about delivering a compelling product experience, so that should also apply to the Akeneo App Store.  
A few screenshots will also help the end-users to understand what your extension looks like, where it is hosted, and if it is easy to use or dedicated to people with a technical background.  
  

**The page of your extension must come with documentation (installation, configuration and/or user guide) even if they are not open-source.**

As for the description, we expect our users to be as autonomous as possible to get the most out of your extensions.  
Any step-by-step guide you can provide to accompany the release of your contribution on Akeneo App Store will enhance the experience of our Community on Akeneo PIM.  
This documentation should be an install guide or a user guide to go through all features. This documentation will also significantly reduce your workload for support.  


**You must provide a main point of contact in case Akeneo teams need to reach out to you for functional or technical questions about your contribution.**

As much as we'd like to know how your extensions work, sometimes Akeneo teams need to figure out the proper answer to a specific question.  
We need to contact someone in your team who can assist us in providing our users with the correct answers.  


**Any new extension must provide incremental value compared to what is already available in Akeneo or Akeneo ecosystem. We won't accept duplicates.**

As the Akeneo ecosystem grows, we want to continue delivering the qualitative solutions our users seek.  
Ensure that the extension you are about to submit has yet to exist on Akeneo App Store, providing additional features to what's already available.  


**Functional tests have been performed on your contribution before submission to confirm it works with an Akeneo PIM instance.**

Before we approve your extension on Akeneo App Store, we will check whether you performed functional tests or not. These tests will ensure your extension is ready to install in a PIM environment, either on-premises or in the Cloud.  
If your extension is interfaced within the PIM, we may ask you for a copy of your extension to conduct additional tests.  


**You can demonstrate your contribution to Akeneo App Store team through a live demo or a video hosted on a streaming platform.**

Although it won't be asked during the submission process, you should be able to demonstrate how your extensions work, at least once, to the Akeneo team.  
Frequently we advise Akeneo users to utilize Akeneo App Store contributions to enhance their experience or to answer their use cases.  
A live demo or a video demonstration (e.g. a webinar) is always helpful.  
Feel free to add a video URL to the description of your extension; it will also benefit the community.  

Please note these criteria don't apply to Coming Soon pages.  


### Recommended tests

Quality is a MUST, and we urge you to run as many tests as possible to ensure your extensions and add-ons work well for any type of product catalog.  
Akeneo teams will always expect durable, performant, and scalable extensions.  


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

Happy with the results of your tests?  
Share them with the community, or write us at [apps@akeneo.com](mailto:apps@akeneo.com) so we can tell Akeneo teams.  


### Maintenance and Support

Maintenance and support are two of our Enterprise users' most frequently asked questions for extensions. 

When you have a business to run, it is normal to believe that the extensions available on Akeneo App Store support the latest Akeneo releases and that someone will answer your calls if the extension doesn't work properly.

Although offering Maintenance and Support is optional for us to approve your extension on the Akeneo App Store, we hope you will allocate sufficient resources to deliver a good customer experience to the users of your extensions.

To decrease the workload necessary each time Akeneo releases a new version of the PIM, we strongly advise you to develop your extensions using Akeneo REST API, whose code will never change. To know more about our API, please visit [this page](https://api.akeneo.com/).


## Compose your App Store public listing

### Target users

Before writing your listing page, you should first know who your target user is.

#### Julia.

<img src="../../img/apps/julia.png" style="width: 140px; margin:10px">

Julia is a PIM user in charge of enriching product information: she is the end-user of your App. So she needs to have information about your App on our Akeneo App Store:

- What solution your App connects to?
- What exactly your App does? How does it work?
- How your App allows Julia to be more efficient and more productive?
- How your App helps Julia and her team save time and money.

Julia doesn't need technical information, only your user documentation.  

#### Peter

<img src="../../img/apps/peter.png" style="width: 140px; margin:10px">

Then there's Peter. Peter is Julia's IT contact. An integrator often accompanies Peter. Together, they are here to help Julia choose the right App.

*If your extension is a Connector or a Bundle, Peter must know everything about your extension:*

- What is the technical architecture of your extension?
- How to install your extension?
- Where will your extension be hosted?
- What are the limits of your extension (in terms of scalability and performance)?
- What support will you provide with your extension?
- Is it possible to download a demo version of your extension to test it?

**Peter and his integrator need access to all your technical information.**

As you can see, you have 2 target users who are not interested in the same type of information.

### App information

Let's see how to distribute your App's information in the different Akeneo App Store extension fields.


**Name**

Here, indicate the name of your App.

Some tips:
- We have a 55-character constraint for the title, so keep it as short as possible
- It's not necessary to include your company name in the name of your App: we will add it to the details of your App.
- It's not necessary to add "Akeneo" to your App name. In the Akeneo App Store, the users know that your App is dedicated to Akeneo PIM. Please highlight the third-party solution name in your App name because that's what Julia will be looking for.


**Version**

Here, indicate your App version.

Some tips:
- Our recommendation is to use [semantic versioning](https://semver.org/) for your App:
- Please don't add a "V" letter before your version: we will add it automatically.


**Short description**

Here, indicate a short description of your App.

Some tips:
- This short description will be visible when displaying the App in list mode.
- This short description is in full-text mode only (no layout, no links, no images)
- This description needs to be short, no more than a couple of sentences.
- Our recommendation: write a punchy catchphrase that explains what your App does in a very impactful way.


**Description**

Here, indicate a functional description of your App meant for Julia.

Some tips:
- Do not confuse the "Documentation" and "Description" parts of your App.
- This description is mainly for Julia. It should give her a global and complete overview of your App.
- This part should only contain functional information:
    - What software does your App interconnect with?
    - What are the main features of your App?
    - What are the main benefits Julia will get from your App?
    - What are the known limitations of your App?
- It is possible to format your description (rich text): do not hesitate to add titles to separate your text, links to redirect to your website page, and some images to illustrate your point.


**Documentation**

Here, indicate an introduction to your complete documentation, mainly for Peter.

Some tips:
- Use this space as an introduction to your online documentation available on your website if it exists.
- If you do not have online documentation but a PDF, we suggest you use the following field (Documentation files) to upload your documentation. Please introduce this documentation file with a short text.
- If you don't have any documentation about your App, we invite you to create one on our Akeneo App Store using this field.
- Our recommendation - your online documentation should contain all your functional and technical information:
    - A complete list of all PIM data/features managed by your App
    - All configuration capabilities of your App
    - A complete end-user documentation
    - A list of known limits of your App (e.g: the limits of your extension in terms of scalability and performance)
    - A quick overview of your public roadmap
    - A description of your support service (with SLA)
    - A download or install process if it's a connector/bundle


**URL of your App**

If you declared that your extension is an App, you must feel out these 2 fields:
- Activate URL
- Callback URL


**Documentation files**

Use this field if your documentation is a PDF file.


**Release notes**

Here, indicate all the history of your App versions.

Some tips:
- Do not hesitate to give all the details of your fixes/modifications on your App
- If you add or modify a feature, please add a link to the associated documentation


**Logo**

Here, upload a logo/an image that represents your App.

Some tips:
- The optimal size of this image should be 1140x900 pixels.
- This image will be displayed on the App list (in a category) or as a search result. This image will also display as the first image of your image gallery on your App details.


**Gallery**

Here, upload some screenshots of your App.

Some tips:
- The optimal image size of these screenshots should be 1140x900 pixels.
- These screenshots are essential: they allow Julia and Peter to understand the scope and features of your App at a glance.
- Do not hesitate to take a screenshot of your UI, your configuration capabilities, etc.
- Remember: a good picture is better than a long speech!
- Our recommendation: 8 pictures max

**Categories**

Add your App to an Akeneo App Store category.
Please, select only 1 category (we will limit it to only 1 category in the near future).


**Akeneo editions & versions**

Here, indicate the PIM editions/versions compatibility of your App.

Some tips:
- Please ensure you have tested your App with this PIM edition/version before listing it on our Akeneo App Store.
- Our users filter on the PIM version they are using to find the App they could install, so stay up-to-date!
- If you cannot access a test platform corresponding to the PIM edition/version, please get in touch with us.


**Third-party software name/editions/versions**

Indicate the third-party software editions/versions compatibility of your App here.

Please ensure you have tested your App with this software edition/version before listing it on our Akeneo App Store.


**Price type**

Indicate your business model here.

Some tips:
- You can choose between 3 options: "Free", "Fixed price" and "Quote based".
- Please fill in the corresponding contextual fields related to your previous choice.


**Support request**

Here, indicate how a user can contact you if they have questions or need support.

- We offer 2 capabilities:
- If you don't have a support form, our Akeneo App Store can manage this feature. The user support request will be sent to your email address.
- Our Akeneo App Store can redirect the user to your website if you have an online support form.
