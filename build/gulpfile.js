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
// debug = require('gulp-debug'),
include = require('gulp-include'),
ts = require('gulp-typescript'),
gutil = require('gulp-util'),
rename = require('gulp-rename'),
sass = require('gulp-sass');

function getDest() {
  var destination;
  if (argv.production) {
    destination = '';
  } else if (argv.staging) {
    destination = 'staging';
  } else {
    destination = 'development';
  }
  return destination;
}


gulp.task('lint', function() {
  return gulp.src('source/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bundle-js', function() {
  //var negatedFiles = argv.nobundle ? argv.nobundle.split(',') : '';
  argv.testing = ((!argv.production && !argv.staging) || argv.testing);
  var source = [];
  return gulp.src(source)
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(getDest() + '/js'));
});

gulp.task('bundle-lib-js', function() {
  var sourceFiles = [];
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

gulp.task('inject-min-lib-js', function() {
  return gulp.src(getDest() + 'index.html')
  //inject html tempaltes into index
  .pipe(inject(gulp.src(getDest() + '/lib/bundle.lib.js'), {
    starttag: '<!-- inject:libjs -->',
    endtag: '<!-- endinject -->',
    transform: function(filepath) {
      //parse out destination filepath
      filepath = filepath.replace('/' + getDest() + '/', '');

      return '<script src="' + filepath + '"></script>';

    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
});

gulp.task('inject-min-js', function() {
  return gulp.src(getDest() + '/index.html')
  //inject html tempaltes into index
  .pipe(inject(gulp.src(getDest() + '/js/bundle.js'), {
    starttag: '<!-- inject:minjs -->',
    endtag: '<!-- endinject -->',
    transform: function(filepath) {
      //parse out destination filepath
      filepath = filepath.replace('/' + getDest() + '/', '');

      return '<script src="' + filepath + '"></script>';

    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
});

gulp.task('inject-html', function() {
  return gulp.src(getDest() + '/index.html')
  // .pipe(debug())
  //inject html tempaltes into index
  .pipe(inject(gulp.src('source/js/templates/*.html'), {
    starttag: '<!-- inject:templates -->',
    endtag: '<!-- endinject -->',
    transform: function(filePath, file) {
      // return file contents as string
      return file.contents.toString('utf8');
    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
});

gulp.task('inject-js', function() {
  var destination = getDest();
  argv.testing = ((!argv.production && !argv.staging) || argv.testing);
  var source = [destination + '/js/*.js'];
  return gulp.src(getDest() + '/index.html')
  //.pipe(debug())
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

gulp.task('inject-lib-js', function() {
  var destination = getDest();
  argv.testing = ((!argv.production && !argv.staging) || argv.testing);
  var source = [destination + '/lib/*.js'];
  return gulp.src(getDest() + '/index.html')
  //.pipe(debug())
  //inject html tempaltes into index
  .pipe(inject(gulp.src(source), {
    starttag: '<!-- inject:lib-js -->',
    endtag: '<!-- endinject -->',
    transform: function(filepath) {
      //parse out destination filepath
      filepath = filepath.replace('/' + getDest() + '/', '');

      return '<script src="' + filepath + '"></script>';

    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
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
//do not copy qasp source or templates (these are injected into ContractorSurveillance.cshtml)
gulp.task('copy', function() {
  return gulp.src(['source/**/*', '!source/js/templates/**/*'])
  .pipe(gulp.dest(getDest()));
});

gulp.task('copy-html', function(){
  return gulp.src('index.html')
  .pipe(gulp.dest(getDest()));
});

gulp.task('foundation-scss', function(){
  gulp.src('dev/css/sp-metrics.scss')
  .pipe(sass({
    includePaths: ['node_modules/foundation-sites/scss']
  }))
  .pipe(gulp.dest('dev/css'));
});

gulp.task('scss', function(){
  gulp.src('dev/css/style.scss')
  .pipe(sass())
  .pipe(gulp.dest('dev/css'));
});

gulp.task('copy-assets', function(){
  return gulp.src(['source/assets/**/*'])
  .pipe(gulp.dest(getDest() + '/assets'));
});

gulp.task('copy-css', function(){
  return gulp.src(['source/css/**/*'])
  .pipe(gulp.dest(getDest() + '/css'));
});


gulp.task('build-watch', function(callback){
  runSequence('build-min', 'watch-build-min');
  callback();
});

//Watch tasks
gulp.task('watch-build-min', function(){
  gulp.watch('source/**/*', ['build-min']);
});

// Task Runners
gulp.task('build', function(callback) {
  runSequence('clean', 'copy', 'inject-html', 'inject-js');
});

gulp.task('build-min', function(callback) {
  runSequence('clean', 'copy-html', 'copy-assets', 'copy-css', 'copy-lib-assets', 'bundle-js', 'bundle-lib-js', 'bundle-lib-css', 'inject-html');
  callback();
});

gulp.task('watch-styles', function(callback){
  gulp.watch('dev/css/*.scss', function(callback){
    runSequence('foundation-scss', 'scss');
  });
})
//auto update dev folder
//When using development, testing mode is always enabled.  Not to be used with web service calls.
gulp.task('development', function(callback) {
  gulp.watch('source/**/*', function(callback) {
    runSequence('copy', 'inject-html', 'inject-js');
  });
});
