var browserSync = require('browser-sync').create();
var devCompiler;
var gulp        = require('gulp');
var gutil = require("gulp-util");
var runSequence = require('run-sequence');
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

gulp.task('serve', function (done) {
  runSequence('webpack:build-dev', 'browserSync', 'webpack:watch', done);
});

gulp.task('default', ['serve']);
