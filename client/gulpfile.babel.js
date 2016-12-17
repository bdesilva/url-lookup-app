import 'babel-polyfill';
import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gutil from "gulp-util";
import webpack from "webpack";
import less from 'gulp-less';
import path_node from 'path';
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "./webpack.config.js";
import stream from 'webpack-stream';

const path = {
  ALL: ['src/**/*.jsx', 'src/**/*.js', 'styles/**/*/*.css', 'styles/**/*/*.less'],
  DEST_BUILD: 'dist'
};

gulp.task('webpack', [], () => {
  return gulp.src(path.ALL)
    .pipe(sourcemaps.init())
    .pipe(stream(webpackConfig))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task("webpack-dev-server", (callback) => {
  // modify some webpack config options
  let myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  const compiler = webpack(myConfig);
  new WebpackDevServer(webpack(myConfig), {
    publicPath: "/" + myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(4000, "localhost", (err) => {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:4000/webpack-dev-server/index.html");
  });
});

gulp.task('watch', () => {
  gulp.watch(path.ALL, ['webpack']);
});

gulp.task('default', ['webpack', 'webpack-dev-server', 'watch']);
