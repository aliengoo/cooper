var gulp = require('gulp'),
  concat = require('gulp-concat'),
  watch = require('gulp-watch'),
  minifyCSS = require('gulp-minify-css'),
  templateCache = require('gulp-angular-templatecache'),
  sass = require('gulp-sass'),
  clean = require('gulp-clean'),
  browserSync = require('browser-sync'),
  karma = require('karma').server,
  runSequence = require('run-sequence');

var config = {
  server : {
    baseDir : './public'
  },
  browser: "google chrome",
  injectChanges : true,
  startPath : '/index.html',
  open : false,
  notify : false,
  files : ['public/js/*.js', 'public/styles/*.css']
};

var vendorSrcFiles = [
  'bower/jquery/dist/jquery.min.js',
  'bower/bootstrap/dist/js/bootstrap.min.js',
  'bower/lodash/dist/lodash.min.js',
  'bower/moment/min/moment.min.js',
  'bower/angular/angular.min.js',
  'bower/angular-cookies/angular-cookies.min.js',
  'bower/angular-loading-bar/build/loading-bar.min.js',
  'bower/angular-resource/angular-resource.min.js',
  'bower/angular-ui-router/release/angular-ui-router.min.js',
  'bower/numeral/min/numeral.min.js',
  'bower/stringjs/lib/string.min.js',
  'bower/sweetalert/lib/sweet-alert.min.js',
  'bower/angular-local-storage/dist/angular-local-storage.min.js',
  'bower/toastr/toastr.min.js'
];

var vendorSrcMaps = [
  'bower/angular/angular.min.js.map',
  'bower/angular-cookies/angular-cookies.min.js.map',
  'bower/angular-resource/angular-resource.min.js.map'
];

var cssFiles = [
  'bower/bootstrap/dist/css/bootstrap.min.css',
  'bower/angular-loading-bar/build/loading-bar.min.css',
  'bower/animate.css/animate.min.css',
  'bower/fontawesome/css/font-awesome.min.css',
  'bower/sweetalert/lib/sweet-alert.css',
  'bower/toastr/toastr.min.css'
];

var appSrcFiles = [
  'client/**/*.module.js',
  'client/**/**/*.module.js',
  'client/app.module.js',
  'client/*.js',
  'client/**/*.js',
  'client/**/**/*.js',
  'client/**/**/**/*.js',
  'build/*.js'
];

gulp.task('clean', function () {
  return gulp.src('./build').pipe(clean());
});

gulp.task('home-templates', function () {
  return gulp.src([
    './client/home/*.html'
  ]).pipe(templateCache({
    module: 'app.home',
    root: 'home/',
    filename: 'app-home-templates.js'
  })).pipe(gulp.dest('./build'));
});

gulp.task('search-templates', function () {
  return gulp.src([
    './client/search/*.html'
  ]).pipe(templateCache({
    module: 'app.search',
    root: 'search/',
    filename: 'app-search-templates.js'
  })).pipe(gulp.dest('./build'));
});

gulp.task('login-templates', function () {
  return gulp.src([
    './client/login/*.html'
  ]).pipe(templateCache({
    module: 'app.login',
    root: 'login/',
    filename: 'app-login-templates.js'
  })).pipe(gulp.dest('./build'));
});

gulp.task('directive-templates', function () {
  return gulp.src([
    './client/directives/*.html',
    './client/directives/**/*.html',
  ]).pipe(templateCache({
    module: 'app.directives',
    root: 'directives/',
    filename: 'app-directives-templates.js'
  })).pipe(gulp.dest('./build'));
});

var templateJobs = [
  'home-templates',
  'search-templates',
  'login-templates',
  'directive-templates'
];

gulp.task('build', function (cb) {
  runSequence(templateJobs, 'app', cb);
});

gulp.task('build-templates', function (cb) {
  runSequence(templateJobs, cb);
});

gulp.task('vendor-scripts', function () {
  gulp.src(vendorSrcFiles)
    .pipe(concat('vendor.js', {newline: ';'}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('vendor-sourcemaps', function () {
  gulp.src(vendorSrcMaps)
    .pipe(gulp.dest('./public/js'));
});

gulp.task('app', function () {
  gulp.src(appSrcFiles)
    .pipe(concat('client.js', {newline: ';'}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('vendor-css', function () {
  return gulp.src(cssFiles)
    .pipe(concat('vendor.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('move-fonts', function () {
  return gulp.src([
    'bower/bootstrap/dist/fonts/**',
    'bower/fontawesome/fonts/**',
  ]).pipe(gulp.dest('./public/fonts'));
});

gulp.task('browser-sync', function () {
  browserSync(config);
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname +'/karma.conf.js',
    singleRun: true
  }, done);
});


gulp.task('defaultWithBrowserSync', [
    'clean',
    'move-fonts',
    'vendor-css',
    'vendor-scripts',
    'vendor-sourcemaps',
    'sass',
    'build',
    'browser-sync'],
  function () {
    gulp.watch(['./scss/*.scss'], ['sass'])
    gulp.watch(['./client/**/*.html'], ['build-templates']);
    gulp.watch(appSrcFiles, ['build']);
  });

gulp.task('default', [
    'clean',
    'move-fonts',
    'vendor-css',
    'vendor-scripts',
    'vendor-sourcemaps',
    'sass',
    'build'],
  function () {
    gulp.watch(['./scss/*.scss'], ['sass'])
    gulp.watch(['./client/**/*.html'], ['build-templates']);
    gulp.watch(appSrcFiles, ['build']);
  });