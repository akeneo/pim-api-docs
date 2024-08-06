# Create the UX of your app

## Overview

::: info
**Welcome to the UX guide for app creation**

A poor app user experience can negatively impact both, your brand and Akeneo brand. The following guidelines will help you design usable apps, which ultimately helps with:

* reducing the number of customers reaching out to the support team
* increasing the number of closed deals
* increasing the adoption & user engagement
:::

To illustrate our recommendations, we created some examples through a sample app. For those mockups, we used the Akeneo Design System and Akeneo UI Kit.

If you’re interested in using the [Akeneo Design System](http://dsm.akeneo.com/) for the creation of your app, please reach out to your Akeneo point of contact.

<!------------------------------ end of the Overview ------------------------------------>

## Define your app users

Before creating your app, it’s critical to understand:

* Who the users are
* What they are trying to achieve in your app

::: tips
To do so, use the following template and keep it handy throughout the app creation process.
:::

[Download the template](https://drive.google.com/file/d/1eZYY2uzqmimOGk103uJJ5jfXEc7YbVy0/view?usp=sharing)

![User job template](../../img/apps/973e7e8-Frame_2.jpg)

::: info
**Refer to this template several times during the project**

We recommend you refer to this document during the app conception, to make sure the user remains at the center of your work. For instance, it will help ensuring the features respond to the user goals, ensuring the wording used is clear for your typology of users, defining the kind of helper your users need, etc.
:::

<!------------------------------ end of Define your app users ------------------------------------>

## Onboarding

The onboarding flow depends on the complexity of the app. The main point to keep in mind is to **guide the user from the beginning to the end of the first set-up.**

::: warning
**First time experience is key. If people can’t use the app properly they might quit and never come back.**

When designing the experience, put yourself in the shoes of a first time user: is the language clear? Is it easy for the user to understand the first actions they have to do? Avoid having a big empty page with no call to actions, etc.
:::

Here are the different ways to onboard a user:

### The Wizard flow

This one is the most simple to implement, and it's also the most guided for the user.

::: tips
**We recommend this one when the set-up is complex** (ie. several configuration steps or a technical set-up for instance).
:::

The wizard can be a pop-in or a series of screens. It provides a **step-by-step** guide to all the actions.

Each step has a **main action and a description of the step.** The user goes through each step, one after the other. Always display the total number of steps to achieve and a success message at the end of the flow.

![Onboarding wizard](../../img/apps/990472f-Onboarding_-_wizard.png)

### Homepage - First visit

When using your app for the first time, users should be able to understand easily what to do. We recommend a page showing only the most important information & actions for the user:

* A welcome message with information about the first steps to accomplish to start using your app.
* The main call-to-action, this button has to be engaging and clear, with an action verb.

**🟢 <font color="green">Good example of a homepage page for the first visit:</font>**

![First visit good](../../img/apps/ae326f3-First_visite_-_GOOD.png)


**🔴 <font color="red">Bad example of a homepage page for the first visit:</font>**

![First visit good](../../img/apps/89d73f6-First_visite_-_BAD.png)

[Homepage - daily use here](create-the-ux-of-your-app.html#homepage)

### The guided tour

When no user set-up is required during the first use, consider creating a guided tour, such as:

* A short video explaining your app's main features and usage.
* Or a dynamic highlight of key areas with a short explanation for each.

![Onboarding Guide tour](../../img/apps/30057e3-Onboarding_-_Guide_tour.png)

<!------------------------------ end of the Onboarding  ------------------------------------>

## Homepage

::: info
**First time user vs returning user**

Your homepage should probably look different for a first time user vs returning user. In the previous section, we focussed on the first time experience. In this section we will have a look at the daily use (ie returning users).
:::

### Daily use

The homepage content depends on the user goals. When the user opens the app, they have to find the first information and actions needed to accomplish their tasks/goals.

Consider showing the following:

* The key information that will drive the user tasks (eg. a dashboard)
* The main actions
* A way to contact the support team and to access the app documentation

![Home daily](../../img/apps/468baf5-home-daily_2.png)

::: tips
We recommend designing the homepage last. By doing so, it will be easier to identify and leverage the most relevant features and information the user would need to see on the homepage.
:::

<!------------------------------ end of the Homepage  ------------------------------------>

## Guide & support

::: info
**Ensure you are here for the users when they need you**

Sometimes the information displayed in the app is clear for us, but not for the users. Other times, users get stuck, which can be frustrating. This section is about providing contextual guidance and access to support, so our users can easily find answers to their questions, and get back on track. Beyond impacting the user, providing guidance and support helps reducing the number of tickets to your support team.
:::

::: tips
In your app, users should be able to find access to your support documentation easily.
:::

Consider the following examples:

* A **general link** in the main navigation

![General link to help center](../../img/apps/5879c20-LINK_-_general_link_to_help_center.png)

* In 'helpers' (ie. banners) via contextual links to the relevant part of your documentation.

![Contextual link to help center](../../img/apps/f508a1e-LINK_-_contextual_link_to_helpcenter.png)

### When to use a 'helper' and how to decide which 'helper'?

There 3 types of helpers you can use: information, helpers and inline helpers. Depending on where you are on the page, you’ll use one or the other.

* Information: used at the page level
* Helpers: used at the section level
* Inline helpers: used at the component level

**Information:** The information component describes the goal of the whole page. This helper usually has a link to your documentation.

![Help information](../../img/apps/cd05dc9-HELP_-Information.png)

**Helper:** The helper component is linked to a section (group of information and actions). They describe an expected action or a feature.

![Help helper information](../../img/apps/fcaa6ec-HELP_-_helper_-_info.png)

Helpers can have 2 other states:

* **Warning:** to warn the user about a feature limitation or any other important message.

![Help helper warning](../../img/apps/d76add3-HELP_-_helper_-_warning.png)

* **Error:** to explain a critical error.

![Help helper error](../../img/apps/1903e2b-HELP_-_helper_-_error.png)

**Inline helper:** They are linked to another component such as a button or a field. They explain the behavior or state of this component (a disabled button for instance).

![Help inline helper](../../img/apps/3c4404b-HELP_-_helper_inline_-_info.png)

Inline helpers can have 2 other states:

* **Warning:** to warn the user about a feature limitation or any other important message.

![Help inline warning](../../img/apps/1a3ad6b-HELP_-_helper_inline_-_warning.png)

* **Error:** to describe an error in the component.

![Help inline error](../../img/apps/1330753-HELP_-_helper_inline_-_error.png)

**Tooltip:** Use to explain the wording of your app or a component state.

![Help Tooltip](../../img/apps/0a9c36d-HELP_-_tooltip.png)

**Message bar:** to provide user feedback. Users need to know how a take performed (success/error/failed)

![Help Message bar](../../img/apps/21dc979-message_bas-success.png)

![Help Message bar error](../../img/apps/045574c-messagebar-_error.png)

::: tips
**If you believe a user might have a question, add a helper.**
:::

<!------------------------------ end of guide & support  ------------------------------------>

## Navigation

::: info
**Organize & arrange information to make it easier for users to find what they are looking for, and understand where they are.**

Navigation is not only a way to access a page, it’s also here to support the user flow; the hierarchy of pages. The navigation's structure impacts significantly the user experience, so approach it with care.

Before you start:

* Understand your user's goals and features. [Define your app users](create-the-ux-of-your-app.html#define-your-app-users).
* Be aware of all the content available in the app
:::

### Main guidelines

* A page must contain features/information that work together for a specific goal, which should **be logical for the user.** They have to accomplish a dedicated task in the same area.
* The page organization should **follow your user's flow.**
* Pages that users use the most must be more visible than others.
* **A breadcrumb is essential** to help the user to navigate and always know where they are
* Use short and simple language

### Recommended types of navigation:

**The first one is the top navigation;** this is ideal if you don't have a lot of entry points. It saves space on the page, and we can organize items horizontally. Consider using it with a 'sticky' mode, to keep the navigation visible at all times.

![Top navigation](../../img/apps/d7b8ec6-NAV_-_Top_navigation.png)

**The second one is lateral navigation;** this is ideal if you have many entry points and different levels of navigation. It allows to present all the pages and the sub-pages. We recommend not allowing scrolling in the navigation to avoid hiding information from the user.

![Lateral navigation](../../img/apps/61f2655-NAV_-_lateral_navigation.png)

<!------------------------------ end of Navigation  ------------------------------------>

## Layout / structure

Layout is the structure used to organize content.

When designing your app, think about patterns that will improve the user experience, but also speed up the development process.

A pattern is a common structure between app pages that participates in design homogeneity.

::: tips
**Layouts contribute to less cognitive load, better user efficiency, and ultimately better app adoption.**
:::

### What do we mean by Layout?

Layouts help you align objects, they are used on every pages. The define how pages, pop-ins, buttons and components are organized.

Note: if you browse Akeneo Pim pages and features, you will see a similar structure for all pages.

![Pattern](../../img/apps/408952a-Pattern.png)

<!------------------------------ end of Layout / structure  ------------------------------------>

## Content hierarchy

::: info
**Objects that are close to one another, tend to be grouped together.**

Proximity helps establish a relationship with nearby objects. User understand they share similar purpose or traits. It helps users process and organize information faster and more efficiently.
:::

The content hierarchy contributes to a good user experience. This hierarchy in aligned on your app expertise and your user's goals.

To organize information logically, you can use:

* Headings,
* Sub-headings
* Group similar information or features thanks to sections or tabs.

Organize the information consistently keeping in mind it helps the user achieve their goals (that you identify).

::: warning
**You need to pay attention not to hide features**

The user has to identify all the features and actions of a page. A hidden feature located to low on the page can be a real pain point for the user. To avoid that, we recommend using tabs, for example.
:::

**🟢 <font color="green">Good example of information hierarchy:</font>**

![Information hierarchy good](../../img/apps/61f44f4-Information_hierarchy_-_GOOD.png)

**🔴 <font color="red">Bad example of information hierarchy:</font>**

![Information hierarchy bad](../../img/apps/15e9fb0-Information_hierarchy_-_BAD.png)

<!------------------------------ end of Content hierarchy  ------------------------------------>

## Error or warning message

::: tips
**Good error messages are crucial, even if the most successful designs should prevent any issue from happening.**

This can be achieved by either removing conditions likely to cause errors or by anticipating these conditions and offering users a confirmation option before they proceed.
:::

For several reasons, errors or warnings can be displayed to the user.

::: warning
**You always need to adapt the language & wording to the user profile (no technical language for a business user, for example).
:::

For errors, explain the situation, and give a solution:

* A link to the page where the user can resolve the error
* When there is no link, explain the different options to resolve the error.

A confusing error or no solution can be very frustrating for the user and contributes to a poor user experience.

**🟢 <font color="green">Good examples of errors & warnings:</font>**

![Error good](../../img/apps/766c5a7-error_-_GOOD.png)

![Error good 2](../../img/apps/1d63458-error-_GOOD_2.png)

**🔴 <font color="red">Bad example of error:</font>**

![Error bad](../../img/apps/23df9de-error_-_BAD.png)

<!------------------------------ end of Error or warning message  ------------------------------------>

## Call to action

::: info
Here are basic guidelines about call-to-action usage; buttons are paramount to a good user experience.
:::

### The affordance

You have to design your button to be sure that the user understands that there are clickable elements.

### The number of buttons

If your page has too many buttons, maybe it's because you tried to put too many features on the same page; this can confuse your users and make them feel the solution is too complex to use.

**We recommend a maximum of 3 buttons above the waterline.** If you need more than three buttons, some of these actions are probably less important to the user, and you can group them under a dropdown button.

Some tertiary buttons could be a link to simplify the screen and create a natural visual hierarchy.

### Button positions

Position your buttons **logically and consistently** in the same place throughout all your pages. That contributes to the hierarchy of buttons and also **improves user adoption.**

The button position has to be considered within your page structure. That allows the user to create habits; it's simple for them to find buttons.

When you place your buttons, think about several guidelines:

* The hierarchy of the buttons: the primary button, has to be more visible than the others.
* The proximity law: Your button launches an action, which has to be close to the impacted screen section.

For example, a save button for all the pages should be at the top of the page. A button preview of an image has to be close to the image.

**🟢 <font color="green">Good example - Number of buttons & position:</font>**

![Buttons good](../../img/apps/0a59bc4-buttons_-_GOOD.png)

**🔴 <font color="red">Bad example - Number of buttons & position:</font>**

![Buttons bad](../../img/apps/c21f19b-buttons_-_BAD.png)

### Buttons hierarchy

Hierarchize your buttons according to their importance so that the user can perform the action and reach their objective.

There are three levels of button hierarchy:

* **Primary:** this is the main action of your page, a significant action for the user to complete their objective in this context. Choose a design to help the user quickly identify this action.
* **Secondary:** It's an important button to complete the action but it less important than the primary action.
* **Tertiary:** For any other action, less important than the 2 first ones. This could be a link for example.

To show this hierarchy you can use Design elements.

![Button hierarchy](../../img/apps/526454f-button_hierarchy.png)

### The button colour

Some colors have meaning; it's very important to respect that, especially red and green.

* A red button is always for actions like erase or cancel.
* A green button is always used to validate something or save something.

**🟢 <font color="green">Good example - button colour:</font>**

![Color button good](../../img/apps/9b15587-Color_button_-_GOOD.png)


**🔴 <font color="red">Bad example - button colour:</font>**

![Color button bad](../../img/apps/4c7e76e-Color_button_-_BAD.png)

### Disabled button

When you are using a disabled button, it must be obvious to the user.

Select the right color, add a tooltip on the hover that explains why the button is disabled.

The most common way of illustrating a disabled button is to reduce its opacity but make sure you maintain sufficient contrast to guarantee accessibility.

![Disabled button](../../img/apps/d8bfe41-Disabled.png)

### Wording on the button

We recommend consistency in the wording of your buttons.

For example, if you use an action verb on your buttons, do it for all your buttons. This reduces your users' cognitive overload.

### Feedback

For some actions, like a save or an action with an impact that the user can see on the current screen, it's necessary to have visual feedback to inform the user about the action.

![Feedback success](../../img/apps/6610c35-message_bas-success.png)

<!------------------------------ end of Call to action  ------------------------------------>

## Search

* A search bar has to be attached to the items it’s used on, a table, for example.
* If the search bar only works on some elements in the component, you can explain users what is searchable and what isn’t.

**🟢 <font color="green">Good example:</font>**

![Search good](../../img/apps/a691d13-Search_-_GOOD.png)

**🔴 <font color="red">Bad example:</font>**

![Search bad](../../img/apps/3589c33-Search_-_BAD.png)

<!------------------------------ end of Search  ------------------------------------>

## Accessibility & contrast

Thinking about accessibility when you are defining the UI is fundamental. We recommend to test your component with accessibility tools. On the W3C website, you can find a list of tools to [test your app accessibility](https://www.w3.org/WAI/test-evaluate/tools/list/).

If you use Figma to build your mockups, a plugin is available to test the contrast: A11y.

Some guidelines to have in mind:

### Text

* No text should be smaller than 9pt (12 px)
* Use the Caps carefully, just for short text like titles or labels.
* Select readable font, for example, for digital, sans-serif fonts are clearer and easier on the eyes.

### Colors

* If you want to use colors for text, make sure that the contrast is good for reading the text.

**🟢 <font color="green">Good example of accessibility & contrast:</font>**

![Contrast good](../../img/apps/4650997-contrast_-_GOOD.png)

**🔴 <font color="red">Bad example of accessibility & contrast:</font>**

![Contrast bad](../../img/apps/186d6a8-contrast_-_BAD.png)

<!------------------------------ end of Accessibility & Contrast  ------------------------------------>

## List of requirements

Here's a list of recommendations based on the documentation you've just read.
**We strongly recommend that you follow all the recommendations to guarantee a good user experience, a good brand image, and reduced friction and support tickets.**

::: warning
Recommendations tagged `MANDATORY` are mandatory for your app to be published on the app store.
:::

### Navigation

☐ Every page in my application has a title `MANDATORY`

☐ On each application page, my users knows what actions to perform. `MANDATORY`

☐ Each page is related to my users need.

☐ My application has a breadcrumb trail, enabling my users to find their way around and navigate. `MANDATORY`

☐ My users has the necessary actions to navigate at all times. (Next, back, close, cancel)

☐ My users has access to a search function whenever necessary. (the number of items on the page is too great to find what they are looking for)

### Action buttons

☐ When there are several buttons on a page, they are hierarchized (primary, secondary, tertiary).

☐ The buttons' color indicate the associated action (red for cancel, green for validate). `MANDATORY`

☐ The actions behind the buttons are clear. If this is not the case, a helper associated with the action informs my users. `MANDATORY`

☐ For each critical action (deletion, etc.), the user is warned, and a confirmation pop-in is associated with it. `MANDATORY`

☐ My users have feedback after an action with an impact that the user can see on the current screen (save for example) `MANDATORY`

☐ My users know why buttons are disabled in my application (Helper, tooltip).

### Accessibility

☐ My application's contrasts are RGAA compliant.

☐ My application has no font size below 10 pixels. `MANDATORY`

### Onboarding & Help

☐ My users understand clearly the first action they have to take

☐ My application has an Onboarding function so my users can clearly see what actions are required to start using the application on the homepage. `MANDATORY`

☐ All error messages in my application are clear to my users and associated with one of the solutions. `MANDATORY`

☐ My users has access to the app's documentation at all times. `MANDATORY`

☐ Each icon not associated with wording has a tooltip explaining its meaning.

☐ All my application's inputs contain a placeholder, allowing my users to know what it may contain.

☐ Any feature name, concept or wording specific to my application's field of expertise that may not be clear to my user should be explained via a helper.

### Page structure

☐ All the pages of my application follow a similar structure, allowing my users to find themselves in a familiar layout from page to page. `MANDATORY`

☐ I've made sure that my users finds the action buttons in the same place, page after page - and the pages are structured in a logical way. Features are organized to match my users journey.

☐ In my application, no feature is hidden below the waterline.

☐ In my application, I've made sure that the information is hierarchically organized to make sense to my users — headings, sub-headings, grouping similar information or features. `MANDATORY`
