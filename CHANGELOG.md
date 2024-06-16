# Changelog

## 0.5.1 - 2024-06-16

### Changed

* Improve header and print styles

### Fixed

* Fix usage of built-in locale files

## 0.5.0 - 2024-06-15

### Changed

* **Breaking**: Use built-in locale files instead of integration option for "skip to main" text
* **Breaking**: Make "skip to main" text required in BasePage and SkipToMain components
* **Breaking**: Rename "homeLink" prop to "link" in SiteId component

### Added

* Support multiple locales
* Add some components (Article, GeneralHeader) split out from layouts
* Add LayoutBase layout for custom pages
* Add README and license

### Fixed

* Exclude declaration files from package

## 0.4.1 - 2024-06-14

**This is the first release published to npmjs.org.**

### Changed

* Update package metadata in preparation for public release

## 0.4.0 - 2024-06-14

**This release represents a major restructuring, from a simple set of components to an integration.**

### Changed

* **Breaking**: Introduce integration for sitewide data
* **Breaking**: Export layouts individually to support layouts in Markdown frontmatter
* Change base styles from global to scoped

### Added

* Add BasePage to component library, separate from layouts
* Support custom styles in integration

## 0.3.2 - 2024-06-12

### Changed

* Adjust style in homepage header to allow for easier customization

## 0.3.1 - 2024-06-12

### Fixed

* Export SiteInfo interface added in 0.3.0

## 0.3.0 - 2024-06-12

### Changed

* **Breaking**: Move common props for sitewide data in layouts to its own object (SiteInfo interface)

## 0.2.1 - 2024-06-10

### Fixed

* Remove global style in GeneralLayout to prevent "leakage" into other pages

## 0.2.0 - 2024-06-10

**This release is deprecated because of global styles that may unintentionally "leak" into other pages.**

### Changed

* **Breaking**: Rename BasicLayout to GeneralLayout
* Adjust styles

### Added

* Add ArticleLayout for "singular" pages

## 0.1.1 - 2024-06-09

### Fixed

* Export some missing components from 0.1.0

## 0.1.0 - 2024-06-09

**Initial release, deprecated because certain components were not exported.**
