# Grayspace

Grayspace is a theme integration for the [Astro](https://astro.build/) website framework. It is a fairly minimal theme, originally designed for the website of the [Half-Gray Association](https://www.halfgray.xyz/).

## Installation

1. Set up Astro: Refer to the [Astro docs](https://docs.astro.build/) for more information

2. Install Grayspace:

	```
	npm install --save @halfgray/grayspace
	```

3. Add the integration to your Astro configuration file:

	```
	// ...
	import grayspace from '@halfgray/grayspace';

	export default defineConfig({
		//...

		integrations: [
			grayspace({
				// Configure site-wide options
				// Refer to Configuration section for more options
				siteName: 'My Site',
				siteStyles: ['./src/styles/site-styles.css', '@fontsource/open-sans'],
			}),
		],

		// Adding i18n config is highly recommended, even if your site is monolingual
		i18n: {
			defaultLocale: 'en',
			locales: ['en'],
		},
	});
	```

## Usage

Grayspace comes with a few common layouts for pages. You can use them directly in `.astro` pages or in [Markdown](https://docs.astro.build/en/basics/layouts/#markdownmdx-layouts).

These layouts are exported as `@halfgray/grayspace/layouts/[layout]`:

* **HomeLayout**: For the homepage, with a large header for the site name and logo
* **ArticleLayout**: For most "singular" pages on the site, with a smaller header linking to the homepage and a page title
	* Required props: `title` (can be set directly or through Markdown frontmatter)
* **GeneralLayout**: Generic layout for navigation or other purposes
	* Required props: `title` (can be set directly or through Markdown frontmatter)

Example:

```
---
import ArticleLayout from '@halfgray/grayspace/layouts/ArticleLayout`;
---

<ArticleLayout title="My Page">
	<p>My page content</p>
</ArticleLayout>
```

Or in Markdown:

```
---
layout: '@halfgray/grayspace/layouts/ArticleLayout'
title: 'My Page'
---

My page content
```

## Configuration

The integration accepts the following options:

* **siteName**: (`string`, required) Name of your site
* **siteLogo**: (`string`, optional) Path to site logo (note that this is a raw path to be included in the HTML, so placing the logo in `public/` is recommended)
* **favicon**: (`string`, optional) Path to favicon (defaults to using the site logo)
* **siteStyles**: (`string[]`, optional) Custom CSS imports, either a path to a local file (starting with `.`) or a package name
* **homeLink**: (`string`, optional) URL to homepage for the link in the header (defaults to the configured [base path](https://docs.astro.build/en/reference/configuration-reference/#base))

In addition, it is highly recommended that you specify the locale in Astro's [i18n configuration](https://docs.astro.build/en/reference/configuration-reference/#i18n), even if your site is monolingual. This helps specify the language of the page for accessibility.

Example:

```
i18n: {
	defaultLocale: 'en',
	locales: ['en'], // Somewhat redundant for a monolingual site, but required by Astro
}
```

## Customization

If you want to customize your pages, you can create your own layouts based on the ones provided. Each layout provides the following [named slots](https://docs.astro.build/en/basics/astro-components/#named-slots):

* **head**: Additional metadata to add to the `<head>` element
* **header**: Additional contents to add to the `<header>` after the homepage link
* **footer**: Contents to add to the `<footer>`

For even more customization, Grayspace provides a component library to build your own pages. This library does not require installing the integration on your site.

The component library is exported under `@halfgray/grayspace/components`.

Example:

```
---
import { BasePage, SiteId } from '@halfgray/grayspace/components';
import CustomComponent from '../components/CustomComponent.astro';
---

<BasePage lang="en" title="My Custom Page" skipToMainText="Skip to main">
	<SiteId slot="header" name="My Site" link="/" />
	<h1>My Custom Page</h1>
	<CustomComponent />
</BasePage>
```

## License

Grayspace is available under the MIT License. Refer to `LICENSE.txt` for details.