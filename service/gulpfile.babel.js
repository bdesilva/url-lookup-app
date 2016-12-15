import 'babel-polyfill';
import babel from 'gulp-babel';
import gulp from 'gulp';
import run from 'run-sequence';
import clean from 'gulp-clean';
import shell from 'gulp-shell';
import esLint from 'gulp-eslint';
import sourceMaps from 'gulp-sourcemaps';

const paths = {
  js: ['src/**/*.js'],
  buildCode: ['dist/**/*.js'],
  coverage: ['coverage']
};

gulp.task('clean-build-scripts', () => {
  return gulp.src(paths.buildCode, {read: false})
    .pipe(clean());
});

gulp.task('clean-code-coverage', () => {
  return gulp.src(paths.coverage, {read: false})
    .pipe(clean());
});

gulp.task('es-lint', () => {
  return gulp.src(paths.js)
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(esLint.failAfterError());
});

gulp.task('run-script', shell.task([
  'node_modules/.bin/babel-node src/server.js'
]));

gulp.task('test', ['clean-code-coverage'], shell.task([
  'npm test'
]));

gulp.task('build', ['clean-build-scripts'], () => {
  return gulp.src(paths.js)
    .pipe(sourceMaps.init())
    .pipe(babel())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('run', ['run-script'], () => {});

gulp.task('default', () => {
  run('build', 'run');
});
