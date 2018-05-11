
# Development Configuration
1. Install Node JS
[Node JS Install](https://nodejs.org/en/)
2. If testing locally, without an lcmp server, install local http server
	1. Open command line and execute the following:

```
npm install http-server -g
```

2. Install Gulp
	1. Open command line and execute the following:

```
npm install -g gulp
```

3. Navigate to Contractor Surveillance module client root folder and open command prompt at that location.
4. Install project dependencies

```
npm install --save-dev
```

#Building Source Code
1. Navigate to root folder and open command prompt at that location.
2. Run gulp build for that project:

```
gulp build
```

3. If you don't want to run this command evey time a file changes, run the following instead:

```
gulp build-watch
```
Optional paremeters for environment and bundling are also available

```
gulp build-watch --env prod --bundle
```
# SharePoint Installation

# Using
Copy and paste the following in to a Script Editor Web Part:
```html
<script type="text/javascript" src="/Assets/Metrics/lib/jquery.min.js"></script>
<script type="text/javascript" src="/Assets/Metrics/lib/bundle.lib.no.jquery.js"></script>
<link rel="stylesheet" href="/Assets/Metrics/css/bundle.css"/>
<div class="grid-container SP-Metrics" id="tempLoader">
	<div class="grid-x grix-margin-x grid-padding-x">
		<div class="cell auto"></div>
		<div id="loading-container" class="cell small-12 medium-10">
			<div class="callout large secondary">
				<h3 class="text-center">Loading</h3>
				<h3><div class="loader large dark"></div></h3>
			</div>
		</div>
		<div class="cell auto"></div>
	</div>
</div>
<div id="metricsContainer"></div>
<script type="text/javascript">
$('#metricsContainer').load('/Assets/Metrics/webpart.html', function(){
		$('#tempLoader').remove();
});
</script>
```
