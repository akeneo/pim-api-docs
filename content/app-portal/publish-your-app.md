# App Approval Requirements

Thanks to you, the Akeneo App Store continues to grow. It has become increasingly important for us to review the submission process for new Apps to maintain the quality standards that Akeneo users expect. By doing this, we will ensure that our Akeneo App Store remains a valuable resource for the Akeneo Community.

The requirements to submit an extension (an App, a Connector, or a Bundle) on Akeneo App Store are listed below.

You must meet the following criteria to go live on the Akeneo App Store. Otherwise, we won't approve your extension. 

## Criteria

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

::: info
Please note these criteria don't apply to Coming Soon pages.
:::


## Recommended tests

Quality is a MUST, and we urge you to run as many tests as possible to ensure your extensions and add-ons work well for any type of product catalog.  
Although we do not certify extensions on the Akeneo App Store, Akeneo teams will always expect durable, performant, and scalable extensions.  


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

::: info
Happy with the results of your tests?  
Share them with the community, or write us at [apps@akeneo.com](mailto:apps@akeneo.com) so we can tell Akeneo teams.  
:::


## Maintenance and Support

Maintenance and support are two of our Enterprise users' most frequently asked questions for extensions. 

When you have a business to run, it is normal to believe that the extensions available on Akeneo App Store support the latest Akeneo releases and that someone will answer your calls if the extension doesn't work properly.

Although offering Maintenance and Support is optional for us to approve your extension on the Akeneo App Store, we hope you will allocate sufficient resources to deliver a good customer experience to the users of your extensions.

To decrease the workload necessary each time Akeneo releases a new version of the PIM, we strongly advise you to develop your extensions using Akeneo REST API, whose code will never change. To know more about our API, please visit [this page](https://api.akeneo.com/).
