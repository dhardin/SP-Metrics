/* file: gulpfile.js */
var gulp = require('gulp'),
jshint = require('gulp-jshint'),
concat = require('gulp-concat'),
prettify = require('gulp-jsbeautifier'),
argv = require('yargs').argv,
del = require('del'),
gulpif = require('gulp-if'),
runSequence = require('run-sequence'),
inject = require('gulp-inject'),
debug = require('gulp-debug'),
include = require('gulp-include'),
rename = require('gulp-rename'),
sass = require('gulp-sass'),
htmlreplace = require('gulp-html-replace');

function getDest() {
  var destination = 'build/';
  switch(argv.env){
    case 'prod':
      destination += 'prod';
      break;
    case 'stag':
      destination += 'stag';
      break;
    default:
      destination += 'dev';
      break;
  }
  return destination;
}

function isBundled(){
  var bundled = argv && argv.hasOwnProperty('bundle');
  return bundled;
}

function getAppSrcArr(source){
  source = source || '';
  return [source + '/js/data.js', source + '/js/components.js', source + '/js/app.js'];
}

function getLibSrcArr(source){
  source = source || '';
  return  [source + '/lib/es5-shim.js', source + '/lib/vue.js', source + '/lib/es6-shim.js', source + '/lib/axios.min.js', source + '/lib/jquery-2.1.0.js',
            source + '/lib/what-input.js', source + '/lib/foundation/foundation.js', source + '/lib/spectrum/spectrum.js', source + '/lib/lodash.js',
            source + '/lib/QueryBuilder/query-builder.standalone.min.js'];
}

function getStyleArr(source){
  source = source || '';
  return [source + '/css/sp-metrics.css', source + '/lib/Spectrum/spectrum.css', source + '/lib/QueryBuilder/query-builder.default.css', source + '/css/style.css'];
}

gulp.task('lint', function() {
  return gulp.src('source/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bundle-css', function() {
  var source = getStyleArr('source');
  return gulp.src(source)
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest(getDest() + '/css'));
});

gulp.task('bundle-js', function() {
  var source = getAppSrcArr('source');
  return gulp.src(source)
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(getDest() + '/js'));
});

gulp.task('bundle-lib-js', function() {
  var sourceFiles = getLibSrcArr('source');
  return gulp.src(sourceFiles)
  .pipe(concat('bundle.lib.js'))
  .pipe(gulp.dest(getDest() + '/lib'));
});

gulp.task('bundle-lib-css', function() {
  return gulp.src('source/lib/**/*.css')
  .pipe(concat('bundle.lib.css'))
  .pipe(gulp.dest(getDest() + '/lib'));
});

gulp.task('copy-lib-assets', function(){
  return gulp.src(['source/lib/**/*.{ttf,woff,eof,png,jpg,gif,svg}'])
  .pipe(rename({dirname:'images'}))
  .pipe(gulp.dest(getDest() + '/lib'));
});

gulp.task('inject-html', function() {
  return gulp.src(getDest() + '/index.html')
    .pipe(debug())
  //inject html tempaltes into index
  .pipe(inject(gulp.src('source/templates/*.html'), {
    starttag: '<!-- inject:templates -->',
    endtag: '<!-- endinject -->',
    transform: function(filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8');
    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
});

gulp.task('inject-html-webpart', function() {
  return gulp.src(getDest() + '/webpart.html')
    .pipe(debug())
  //inject html tempaltes into index
  .pipe(inject(gulp.src('source/templates/*.html'), {
    starttag: '<!-- inject:templates -->',
    endtag: '<!-- endinject -->',
    transform: function(filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8');
    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
});

gulp.task('inject-css', function() {
  var destination = getDest();
  argv.testing = ((!argv.production && !argv.staging) || argv.testing);
  var source = (isBundled() ? [destination + '/css/bundle.css'] : getStyleArr(destination));
  return gulp.src(getDest() + '/index.html')
  .pipe(debug())
  //inject html tempaltes into index
  .pipe(inject(gulp.src(source), {
    starttag: '<!-- inject:css -->',
    endtag: '<!-- endinject -->',
    transform: function(filepath) {
      //parse out destination filepath
      filepath = filepath.replace('/' + getDest() + '/', '');

      return '<link rel="stylesheet" href="' + filepath + '"></script>';

    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
});

gulp.task('inject-css-webpart', function() {
  var destination = getDest();
  argv.testing = ((!argv.production && !argv.staging) || argv.testing);
  var source = (isBundled() ? [destination + '/css/bundle.css'] : getStyleArr(destination));
  return gulp.src(getDest() + '/webpart.html')
  .pipe(debug())
  //inject html tempaltes into index
  .pipe(inject(gulp.src(source), {
    starttag: '<!-- inject:css -->',
    endtag: '<!-- endinject -->',
    transform: function(filepath) {
      //parse out destination filepath
      filepath = filepath.replace('/' + getDest() + '/', '');

      return '<link rel="stylesheet" href="/Assets/Metrics/' + filepath + '"></script>';

    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
});

gulp.task('inject-js', function() {
  var destination = getDest();
  argv.testing = ((!argv.production && !argv.staging) || argv.testing);
  var source = (isBundled() ? [destination + '/js/bundle.js'] : getAppSrcArr(destination));
  return gulp.src(getDest() + '/index.html')
  .pipe(debug())
  //inject html tempaltes into index
  .pipe(inject(gulp.src(source), {
    starttag: '<!-- inject:js -->',
    endtag: '<!-- endinject -->',
    transform: function(filepath) {
      //parse out destination filepath
      filepath = filepath.replace('/' + getDest() + '/', '');

      return '<script src="' + filepath + '"></script>';

    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
});

gulp.task('inject-js-webpart', function() {
  var destination = getDest();
  argv.testing = ((!argv.production && !argv.staging) || argv.testing);
  var source =  (isBundled() ? [destination + '/js/bundle.js'] : getAppSrcArr(destination));
  return gulp.src(getDest() + '/webpart.html')
  .pipe(debug())
  //inject html tempaltes into index
  .pipe(inject(gulp.src(source), {
    starttag: '<!-- inject:js -->',
    endtag: '<!-- endinject -->',
    transform: function(filepath) {
      //parse out destination filepath
      filepath = filepath.replace('/' + getDest() + '/', '');

      return '<script src="/Assets/Metrics/'  + filepath + '"></script>';

    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
});

gulp.task('inject-lib-js', function() {
  var destination = getDest();
  var source =  (isBundled() ? [destination + '/lib/bundle.lib.js'] : getLibSrcArr(destination));
  return gulp.src(destination+ '/index.html')
  .pipe(debug())
  //inject html tempaltes into index
  .pipe(inject(gulp.src(source), {
    starttag: '<!-- inject:lib-js -->',
    endtag: '<!-- endinject -->',
    transform: function(filepath) {
      //parse out destination filepath
      filepath = filepath.replace('/' + destination + '/', '');
      return '<script src="' + filepath + '"></script>';
    }
  }))
  .pipe(gulp.dest(destination + '/'));
});


gulp.task('inject-lib-js-webpart', function() {
  var destination = getDest();
  var libSrcArr = getLibSrcArr(destination);
  var jqueryIndex = libSrcArr.indexOf(destination + '/lib/jquery-2.1.0.js');
  libSrcArr.splice(jqueryIndex, 1);
  var source =  (isBundled() ? [destination + '/lib/bundle.lib.js'] : libSrcArr);
  return gulp.src(getDest() + '/webpart.html')
  .pipe(debug())
  //inject html tempaltes into index
  .pipe(inject(gulp.src(source), {
    starttag: '<!-- inject:lib-js -->',
    endtag: '<!-- endinject -->',
    transform: function(filepath) {
      //parse out destination filepath
      filepath = filepath.replace('/' + destination + '/', '');

      return '<script src="/Assets/Metrics/' + filepath + '"></script>';

    }
  }))
  .pipe(gulp.dest(destination + '/'));
});

gulp.task('prettify', function() {
  gulp.src([getDest() + '/**/*.css', getDest() + '/**/*.html', getDest() + '/**/*.js'])
  .pipe(prettify())
  .pipe(gulp.dest(getDest() + '/'));
});

//Delete destination directory.
//Used pre-build
gulp.task('clean', function() {
  return del([getDest() + '/**'], {force: true});
});

//Delete all js files/folders in js destination directory.
//This is used in combination with bundle-js since our source files are merged.
gulp.task('delete-js', function() {
  return del([getDest() + '/js/**'], {force: true});
});

//copy all files in source directory to destination directory
gulp.task('copy', function() {
  return gulp.src(['source/**/*',  '!source/templates/', '!source/templates/**/*', '!source/css/*.scss'])
  .pipe(gulp.dest(getDest()));
});

gulp.task('copy-html', function(){
  return gulp.src('index.html')
  .pipe(gulp.dest(getDest()));
});

gulp.task('foundation-scss', function(){
  gulp.src('source/css/sp-metrics.scss')
  .pipe(sass({
    includePaths: ['node_modules/foundation-sites/scss']
  }))
  .pipe(gulp.dest('source/css'));
});

gulp.task('scss', function(){
  gulp.src('source/css/style.scss')
  .pipe(sass())
  .pipe(gulp.dest('source/css'));
});

gulp.task('copy-assets', function(){
  return gulp.src(['source/assets/**/*'])
  .pipe(gulp.dest(getDest() + '/assets'));
});

gulp.task('copy-css', function(){
  return gulp.src(['source/css/**/*'])
  .pipe(gulp.dest(getDest() + '/css'));
});

gulp.task('watch-styles', function(callback){
  gulp.watch('source/css/*.scss', function(callback){
    runSequence('foundation-scss', 'scss');
  });
});
//auto update source folder
gulp.task('watch-source', function(){
    gulp.watch('source/**/*', ['source']);
});

gulp.task('source', function(callback) {
    var tasks = ['clean', 'copy'];
    var bundled = isBundled();
    if(bundled){
      tasks.push('bundle-js', 'bundle-lib-js', 'bundle-css');
    }
    tasks.push('inject-html', 'inject-html-webpart', 'inject-css', 'inject-css-webpart', 'inject-js', 'inject-js-webpart', 'inject-lib-js','inject-lib-js-webpart');
    runSequence.apply(null, tasks);
    callback();
});

gulp.task('build-watch', function(callback){
  runSequence('source', 'watch-source');
  callback();
});
