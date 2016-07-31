'use strict';

var gulp = require('gulp'),
    path = require('path'),
    del = require('del'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat-sourcemap'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge'),
    jshint = require('gulp-jshint'),
    gulpIf = require('gulp-if'),
    newer = require('gulp-newer'),
    uglify = require('gulp-uglify'),
    util = require('gulp-util'),
//less = require('gulp-less'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    cssMinify = require('gulp-clean-css'),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    gzip = require('gulp-gzip'),
    RevAll = require('gulp-rev-all'),
    revReplace = require("gulp-rev-replace"),
    cache = require('gulp-cache'),
    watch = require('gulp-watch'),
    streamify = require('gulp-streamify'),
    size = require('gulp-size'),
    swig = require('gulp-swig'),
    pug = require('gulp-pug');

var config = {
    production: false
};

gulp.task('serve', ['build'], function () {
    browserSync.init({
        server: "./build",
        port: "7500"
    });
});

gulp.task('build', function (cb) {
   runSequence(
       'clean',
       'html',
       'sass',
       'js',
       'images',
       'fonts',
       cb);
});

gulp.task('clean', function() {
    del(['build/**', 'build']);
});

// Compile html
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('build/images'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))
        .pipe(browserSync.stream());
});

gulp.task('clean_fonts', function() {
    del(['build/fonts']);
});

gulp.task('clean_images', function() {
    del(['build/images']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['src/css/*.scss', 'src/css/**/*.css'])
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulpIf(config.production, cssMinify()))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.stream());
});

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src(['src/js/**/*.js'])
        .pipe(gulpIf(config.production, uglify()))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
});


gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('src/images', ['images']);
    gulp.watch(['src/css/**/*.scss', 'src/css/**/*.css'], ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', ['serve', 'watch']);
