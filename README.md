# sp-metrics

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deployment
1. Upload code from **dist** folder to a document library on your site.
2. Create a SharePoint list on the same site where the document library was created on the first step named **MetricsConfig**
3. Add the following fields to the SharePoint list created in the previous step:

| **Name**               | **Type**                   |
|--------------------|------------------------|
| Title              | Single line of Text    |
| fieldName          | Single line of Text    |
| listName           | Single line of Text    |
| siteUrl            | Single line of Text    |
| filterViewName     | Single line of Text    |
| webPartId          | Single line of Text    |
| metrics            | Multiple lines of text |
| fileObjectType     | Number                 |
| minColumnWidth     | Number                 |
| isDocumentLibrary  | Yes/No                 |
| hasFilterDetection | Yes/No                 |
| hasDynamicWidth    | Yes/No                 |
| hasFiltering       | Yes/No                 |
| openInNewWindow    | Yes/No                 |


3. On a page you wish to display metrics on, copy and paste the following script into a script editor webpart (make the url relative to your site collection):
``` javascript
<script src="absolute-url-to-dist-folder/chunk-vendors.js"></script>
<script src="absolute-url-to-dist-folder/app.js"></script>
```
**Note:** These scripts must be placed in a Script Editor Web Part at the bottom of the page in order to work properly.

4. Metrics may be added to the page but they must be added to a separate Script Editor Web Part.
``` javascript
<div class="sp-metrics"></div>
```
5. When the page is in edit mode, you'll be able to configure the tool.