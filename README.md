
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
npm install jshint gulp-jshint gulp-concat gulp-inject gulp-jsbeautifier gulp-if yargs del gulp-debug run-sequence bluebird gulp-include gulp-typescript typescript gulp-rename --save-dev
```

#Building Source Code
1. Navigate to root folder and open command prompt at that location.
2. Run gulp build for that project:

```
gulp build-min --production
```

3. If you don't want to run this command evey time a file changes, run the following instead:

```
gulp watch-build-min --production
```
