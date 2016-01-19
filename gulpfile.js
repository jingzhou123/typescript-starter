var browserSync = require('browser-sync').create();
var devCompiler;
var gulp        = require('gulp');
var gutil = require("gulp-util");
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

devCompiler = webpack(webpackConfig);

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('webpack:watch', function(callback) {
  var initialCompile = false;

  webpack(webpackConfig).watch(200, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));

    browserSync.reload();
    // On the initial compile, let gulp know the task is done
    if(!initialCompile) {
      initialCompile = true;
      callback();
    }
  }); 
});

gulp.task('watch', ['browserSync'], function() {
  gulp.start('webpack:watch');
});

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['webpack:build-dev'], function () {
  gulp.start('watch');
});

gulp.task('default', ['serve']);
