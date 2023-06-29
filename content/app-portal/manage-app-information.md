# Manage your app information 

To access app information, go to Dashboard. All your apps display in the My Apps section. 

To view and edit app information, click on the Edit button. 

Some information is required before you save or submit your app for review. You can edit some properties anytime and other properties only when the app status is editable.

## App information

### App Identity and Description

| Property | Description & constraints | Tips |
| --- | --- | --- |
| Name | Your app name must be within the limit of 70 characters. | It's not necessary to include your company name or "Akeneo" in your App name. However, we recommend to highlight the third-party solution name in your App name because that's what users will be looking for. |
| Version | Your app version. | Use https://semver.org/. You don’t need to add a "V" letter before your version number. |
| Logo | Your app logo. Maximum upload size: 2048 kB. Supported file types: JPEG, PNG, SVG, WEBP | This image will be displayed on the App list or as a search result. This image will also display in the Akeneo PIM App Store.  |
| Short description | A short description of your App within the limit of 300 characters. This field displays in list mode on the Akeneo App Store (public and embedded in our PIM).  | Text only (no layout, no links, no images). Our recommendation: write a punchy catchphrase that explains what your App does in a very impactful way. |
| Description | Functional description of your App meant for users.  | This description is mainly for users. It should give them a global and complete overview of your App. It is possible to format your description (rich text): do not hesitate to add titles to separate your text, links to redirect to your website page, and some images to illustrate your point. |
| Video link |  |  |
| Visuals | Screenshots or visuals of your App. | These screenshots are essential: they allow users to understand the scope and features of your App at a glance. Do not hesitate to take a screenshot of your UI, your configuration capabilities, etc. Remember, a good picture is better than a long speech! Our recommendation: 8 pictures max |
| Slug |  |  |
| Categories | Akeneo App Store category.  | Please, select only 1 category (we will limit it to only 1 category in the near future). |
| Release notes | History of your App versions | Feel free to give all the details about bug fixes and updates. If you add or modify a feature, please add a link to the associated documentation. |

::: tips
The Description should only contain functional information: 
- What software does your App interconnect with? 
- What are the main features of your App? 
- What are the main benefits users will get from your App? 
- What are the known limitations of your App? 
:::

### Activation button set up

| Property | Description |
| --- | --- |
| Activate URL | URL users will access when clicking Connect in the PIM Embedded App Store |
| Callback URL | URL users will be redirected after ending the connection process |

### Requirements

| Property | Description | Tips |
| --- | --- | --- |
| Akeneo editions | PIM editions/versions compatibility of your App. | Please ensure you have tested your App with this PIM edition before listing it on our Akeneo App Store. |
| Akeneo versions | PIM editions/versions compatibility of your App. | Please ensure you have tested your App with this PIM version before listing it on our Akeneo App Store. |
| Third-party software name | Third-party software name |  |
| Third-party software editions | Third-party software editions | Please ensure you have tested your App with this software edition before listing it on our Akeneo App Store. |
| Third-party software versions | Third-party software versions | Please ensure you have tested your App with this software version before listing it on our Akeneo App Store. |

::: tips
Our users filter on the PIM version and edition they are using to find the App they could install, so stay up-to-date!  
If you cannot access a test platform corresponding to the PIM edition/version, please get in touch with us.
:::

### Help and Support

| Property | Description | 
| --- | --- | 
| Support contact | E-mail address for users to contact your app support. |
| Documentation | Introduction to your complete documentation, mainly for integrators and admin users.  |
| Documentation files | Use this field if your documentation is a PDF file. |

### Price

| Property | Description | Tips |
| --- | --- | --- |
| Price type | Your pricing model. | You can choose between 3 options: "Free", "Fixed price" and "Quote based". |
| Price | Your app price. | Depending on your price type |
| Currency | Price currency. | Depending on your price type |

::: info
Price and Currency fields are related to your Price type. You may leave these fields empty.
:::

### Feature List
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
