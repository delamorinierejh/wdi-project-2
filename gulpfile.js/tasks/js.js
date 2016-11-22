const gulp             = require('gulp');
const gulpIf           = require('gulp-if');
const bowerFiles       = require('main-bower-files');
const concat           = require('gulp-concat');
const jshint           = require('gulp-jshint');
const order            = require('gulp-order');
const babel            = require('gulp-babel');
const eventStream      = require('event-stream');
const sourcemaps       = require('gulp-sourcemaps');
const uglify           = require('gulp-uglify');
const rename           = require('gulp-rename');
const browserSync      = require('browser-sync').create();
const config           = require('../config');

const fetchVendorJs = () => {
  return gulp.src(bowerFiles(config.selectors.js))
    .pipe(concat(config.dest.js));
};

const validateLocalJs = () => {
  return gulp.src(`${config.src.js}${config.selectors.js}`)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {beep: true}));
};

const fetchLocalJs = () => {
  return validateLocalJs()
    .pipe(order([config.main.js,config.selectors.js]))
    .pipe(babel({
      presets: ['es2015']
    }));
};

const buildJs = () => {
  const vendorJs = fetchVendorJs();
  const localJs  = fetchLocalJs();

  return eventStream.merge(vendorJs, localJs)
    .pipe(concat(config.output.js))
    .pipe(sourcemaps.init())
    .pipe(gulpIf(global.production, uglify()))
    .pipe(gulpIf(global.production, rename({ suffix: '.min' })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.js))
    .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-js', buildJs);
module.exports = buildJs;
