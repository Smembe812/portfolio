var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream')
var sass = require('gulp-sass')
//var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
//var concat = require('gulp-concat');
//var sourcemaps = require('gulp-sourcemaps');

gulp.task('compile:css', function () {
  return gulp.src(['./src/sass/*.scss'])
    .pipe(sass())
    //.pipe(minifyCSS())
    .pipe(gulp.dest('./public/assets/css'))
});

gulp.task('compile:js', function () {
  var bundle = browserify('./src/js/main.js').bundle();

  return bundle
    .pipe(source("script.js"))
    .pipe(gulp.dest("./public/assets/js/"));
});

gulp.task('compile:bootstrap', function () {
  return gulp.src(['./node_modules/bootstrap/scss/**/*.scss'])
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/assets/css'))
})

gulp.task('watch', ["compile:js", "compile:css"], function () {
  gulp.watch(["./src/js/**/*.js"], ["compile:js"]);
  gulp.watch(["./src/sass/**/*.scss"], ["compile:css"])
});
