---
order: 2
group: Tutorial
title: Setting Up Your Environment
---

Welcome to this tutorial on using Web Components to build a custom element for embedding Mastodon toots! In this tutorial, we will walk through the process of creating a custom element that can be used to display Mastodon toots on any website or application.

The Mastodon toot embed element will allow users to easily share and display toots from the Mastodon social network on their own websites. It will include features such as the ability to show or hide the user handle and avatar image, as well as the option to customize the appearance of the toot.

To get started, we will need to set up the project files and dependencies. This will include creating the files needed for the element and a demo site to showcase the Web Component.

Once the project is set up, we will move on to defining the Mastodon toot embed element class, extending the HTMLElement class, and registering the element with the browser using the customElements.define() method.

If you don't want to do all the manual work you can use [this GitHub template](https://github.com/github/custom-element-boilerplate/) which should have the project set up in the correct way. I'd still reccomend setting the project up manually as you can tweak systems as you set them up.

I hope you're excited to get started! Let's begin by setting up the project files and dependencies.

First, create a new project folder and navigate to it in your terminal. Then, initialize a new npm project by running the following command:

`npm init -y`

This will create a package.json file in your project folder.

Next, create the following file and folder structure:

```
├── package.json 
├── index.html 
├── README.md 
└── src     
	└── toot-embed-element.js
```

In the `src` folder, create a new file called `toot-embed-element.js`. This file will contain the logic and behavior for your Mastodon toot embed element.

To get started, you can use the following template as a starting point for your element class:

```js
class TootEmbedElement extends HTMLElement {   
	constructor() {     
		super();  
	}    
	
	connectedCallback() {     
		// This method is called when the element is added to the DOM   
	}    
	
	disconnectedCallback() {     
		// This method is called when the element is removed from the DOM   
	}    
	
	static get observedAttributes() {     
		// This method returns an array of attribute names to be observed for changes   
	} 
	
	attributeChangedCallback(attrName, oldVal, newVal) {     
		// This method is called when an observed attribute has been changed   
	} 
}  
customElements.define('toot-embed', TootEmbedElement);
```

This boilerplate code defines a basic custom element class that extends the HTMLElement class, and includes the `connectedCallback`, `disconnectedCallback`, and `observedAttributes` methods. The `connectedCallback` method is called when the element is added to the DOM, the `disconnectedCallback` method is called when the element is removed from the DOM, and the `observedAttributes` method is called when an observed attribute changes.

To register the element with the browser, we use the `customElements.define()` method, passing in the element name and the element class as arguments.

In your `index.html` file, include a script tag to import your `toot-embed-element.js` file, and a link tag to import any CSS styles that you want to apply to your element. For example:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>&lt;toot-embed&gt; demo</title>
		<script defer src="/src/toot-embed-element.js"></script>
	</head>
	<body>
		<p>Here's a example toot:<p>
		<toot-embed src="https://fosstodon.org/@koddsson/109462441325942229"></toot-embed>
	</body>
</html>
```

With these steps, you should now have a project setup with a basic Mastodon toot embed element that can be used to display toots from the Mastodon social network on any website or application.

The Web Component of course doesn't do anything yet. We need to implement the actual functionality and render the contents on the page.
