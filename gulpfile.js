var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');


/**
 * src files in order.
 */
var src = [
    // Wrapper start.
    './src/amd-wrapper-start.js',

    // addEventListener polyfill.
    './libs/add-event-listener.js',

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
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename('resizilla.min.js'))
        .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['build']);


/**
 * Watch for changes.
 */
gulp.task('watch', function(){
    gulp.watch('./src/**.js', ['build']);
});
