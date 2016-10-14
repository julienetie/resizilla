var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var header = require('gulp-header');
var pkg = require('./package.json');
var bump = require('gulp-bump');

var banner = ['/**',
        ' * <%= pkg.name %>',
        ' * Version:  <%= pkg.version %>',
        ' * License:  <%= pkg.license %>',
        ' * Copyright <%= pkg.author %> 2015 - ' + new Date().getFullYear() +' All Rights Reserved.',
        ' * github:  <%= pkg.repository.url %>',
        ' *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾',
        ' */',
        ''
    ].join('\n');


/**
 * src files in order.
 */
var src = [
    // Wrapper start.
    './src/amd-wrapper-start.js',

    // RequestAnimationFrame polyfill.
    './libs/orientationchange.js',

    // RequestAnimationFrame polyfill.
    './libs/request-frame.js',

    // Resizilla for window resize debouncing.
    './src/resizilla.src.js',

    // Wrapper end.
    './src/amd-wrapper-end.js'
];


gulp.task('build', function() {
    return gulp.src(src)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(concat('resizilla.js'))
        .pipe(header(banner, {
                pkg: pkg
            }))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(header(banner, {
                pkg: pkg
            }))
        .pipe(rename('resizilla.min.js'))
        .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['build']);


/**
 * Watch for changes.
 */
gulp.task('watch', function(){
    gulp.watch(['./src/**.js','./libs/**.js'], ['build']);
});
