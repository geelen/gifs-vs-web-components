'use strict';
// Generated on 2014-03-10 using generator-gulp-webapp 0.0.4

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();


// Styles
gulp.task('styles', function () {
  return gulp.src([
    'src/bower_components/prism/themes/prism-twilight.css',
    'src/styles/**/*.scss'])
    .pipe($.sass({
      style: 'expanded',
      includePath: ['src/bower_components']
    }))
    .pipe($.concat('styles.css'))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('public/styles'))
    .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src([
    'src/bower_components/bespoke.js/dist/bespoke.min.js',
    'src/bower_components/bespoke-keys/dist/bespoke-keys.min.js',
    'src/bower_components/bespoke-touch/dist/bespoke-touch.min.js',
    'src/bower_components/bespoke-scale/dist/bespoke-scale.min.js',
    'src/bower_components/bespoke-hash/dist/bespoke-hash.min.js',
    'src/bower_components/bespoke-state/dist/bespoke-state.min.js',
    'src/bower_components/bespoke-bullets/dist/bespoke-bullets.min.js',
    'src/bower_components/prism/prism.js',
    'src/bower_components/prism/components/prism-bash.js',
    'src/bower_components/prism/components/prism-css.js',
    'src/bower_components/prism/components/prism-css-extras.js',
    'src/bower_components/prism/plugins/line-highlight/prism-line-highlight.js',
    'src/scripts/**/*.js'])
//        .pipe($.jshint('.jshintrc'))
//        .pipe($.jshint.reporter('default'))
    .pipe($.concat('scripts.js'))
    .pipe(gulp.dest('public/scripts'))
    .pipe($.size());
});

// HTML
gulp.task('html', function () {
  return gulp.src('src/*.jade')
    .pipe($.jade())
    .pipe(gulp.dest('public'))
    .pipe($.size());
});

// Images
gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('public/images'))
    .pipe($.size());
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['public/*'], {read: false}).pipe($.clean());
});

gulp.task('x-gif', function () {
  gulp.src([
    'src/bower_components/x-gif/dist/*'
  ])
    .pipe(gulp.dest('public/x-gif/dist'));
})

gulp.task('copy', function () {
  return gulp.src(
    ['src/fonts/**', 'src/demos/**'],
    {base: 'src/'})
    .pipe(gulp.dest('public'))
})

// Build
gulp.task('build', ['html', 'styles', 'scripts', 'images', 'x-gif', 'copy']);

// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// Connect
gulp.task('connect', function () {
  $.connect.server({
    root: ['public'],
    port: 8000,
    livereload: false
  })
});

// Watch
gulp.task('watch', ['build', 'connect'], function () {
  // Watch for changes in `src` folder
//  gulp.watch([
//    'public/**/*'
//  ], function (event) {
//    return gulp.src(event.path)
//      .pipe($.connect.reload());
//  });

  // Watch .jade files
  gulp.watch('src/*.jade', ['html']);

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch x-gif
  gulp.watch('src/bower_components/x-gif/dist/**/*', ['x-gif']);

  // Watch fonts
  gulp.watch('src/{fonts,demos}/**', ['copy']);

  // Watch bower files
  gulp.watch('src/bower_components/*', ['build']);
});
