var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('build', function() {
    return gulp.src('./src/resizilla.src.js')
        .pipe(rename('resizilla.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename('resizilla.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build']);
