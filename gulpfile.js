const { series, src, dest, watch } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const jshint = require('gulp-jshint');
const clean = require('gulp-clean');

function minJs() {
  return src('js/*.js','!js/*.min.js')
  				.pipe(jshint())
  				.pipe(sourcemaps.init())
          .pipe(uglify())
//        .pipe(concat('all.min.js'))
          .pipe(dest('dest/js'))
}
function minCss() {
  return src('css/*.css','!css/*.min.css')
  				.pipe(sourcemaps.init())
          .pipe(cleanCSS({compatibility: 'ie8'}))
//        .pipe(concat('all.min.css'))
          .pipe(dest('dest/css'))
}
function minHtml() {
  return src('*.html')
  				.pipe(jshint())
          .pipe(htmlmin({ collapseWhitespace: true }))
          .pipe(dest('dest'))
}
function minImage() {
  return src('images/*.png')
          .pipe(imagemin())
          .pipe(dest('dest/images'))
}
function fontCopy() {
  return src('font/*.TTF')
          .pipe(dest('dest/font'))
}
function gulpClean() {
  return src('dest')
          .pipe(clean())
}
function watchTask() {
    watch(['dest','js/*.js','images/*.png','css/*.css','*.html'], series(gulpClean,minJs,minImage,minCss,minHtml));
}
function defaultTask() {
	return series(gulpClean,minJs,minImage,minCss,minHtml,fontCopy);
}

exports.default = defaultTask()
exports.watchTask = watchTask;
