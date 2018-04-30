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
gutil = require('gulp-util'),
rename = require('gulp-rename'),
sass = require('gulp-sass'),
htmlreplace = require('gulp-html-replace');

function getDest() {
  var destination;
  if (argv.prod) {
    destination = 'build/prod';
  } else if (argv.stag) {
    destination = 'build/stag';
  } else {
    destination = 'build/dev';
  }
  return destination;
}

gulp.task('lint', function() {
  return gulp.src('source/js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bundle-js', function() {
  var source = [ 'source/js/data.js', 'source/js/components.js', 'source/js/app.js'];
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

gulp.task('replace-script-src', function(){
  return gulp.src(getDest() + '/webPart.html')
  .pipe(htmlreplace({
    js: {
      src: null,
      tpl: '<script src="/Assets/Metrics/%f".js></script>'
    }
  }))
  .pipe(gulp.dest(getDest() + '/'));
});

gulp.task('inject-min-js-webpart', function() {
  return gulp.src(getDest() + '/webpart.html')
  //inject html tempaltes into index
  .pipe(inject(gulp.src(getDest() + '/js/bundle.js'), {
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

gulp.task('inject-js', function() {
  var destination = getDest();
  argv.testing = ((!argv.production && !argv.staging) || argv.testing);
  var source = [destination + '/js/*.js'];
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
  var source = [destination + '/js/*.js'];
  return gulp.src(getDest() + '/webpart.html')
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

gulp.task('inject-lib-js', function() {
  var destination = getDest();
  argv.testing = ((!argv.production && !argv.staging) || argv.testing);
  var source = [destination + '/lib/*.js'];
  return gulp.src(getDest() + '/index.html')
  .pipe(debug())
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

gulp.task('watch-source-min', function(){
    gulp.watch('source/**/*', ['source-min']);
});

gulp.task('source', function(callback) {
    runSequence('clean', 'copy', 'inject-html', 'inject-html-webpart', 'inject-js', 'inject-js-webpart');
    callback();
});

gulp.task('source-min', function(callback) {
    runSequence( 'clean', 'copy', 'bundle-js', 'inject-html', 'inject-html-webpart', 'inject-min-js', 'inject-min-js-webpart');
    callback();
});

gulp.task('build-watch', function(callback){
  runSequence('source', 'watch-source');
  callback();
});

gulp.task('build-watch-min', function(callback){
  runSequence('source-min', 'watch-source-min');
  callback();
});
