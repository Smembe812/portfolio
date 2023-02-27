const gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream')
var sass = require('gulp-sass')(require('node-sass'))
var minifyCSS = require('gulp-csso');

function compileStyles() {
  return gulp.src(['./src/sass/*.scss'])
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/assets/css'))
}
function bundleJs() {
  var bundle = browserify('./src/js/main.js').bundle();
  return bundle
    .pipe(source("script.js"))
    .pipe(gulp.dest("./public/assets/js/"));
}

function compileBootstrap() {
  return gulp.src(['./node_modules/bootstrap/scss/**/*.scss'])
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/assets/css'))
}

// gulp.task('watch', ["compile:js", "compile:css"], function () {
//   gulp.watch(["./src/js/**/*.js"], ["compile:js"]);
//   gulp.watch(["./src/sass/**/*.scss"], ["compile:css"])
// });
exports.build = gulp.series(compileBootstrap, compileStyles, bundleJs)