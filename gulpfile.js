var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src('src/*.ts')
    .pipe(sourcemaps.init())
    .pipe(
      ts({
        noImplicitAny: true,
        out: 'build.js'
      })
    ).js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("src/*.*", ['js-watch']);
});

gulp.task('default', ['serve']);
