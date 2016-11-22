const gulp             = require('gulp');
const config           = require('../config');

const watch = () => {
  gulp.watch([
    `${config.src.scss}${config.selectors.scss}`,
    `${config.src.scss}${config.main.scss}`
  ], ['build-css']);
  gulp.watch(`${config.src.js}${config.selectors.js}`, ['build-js']);
  gulp.watch(`${config.src.images}${config.selectors.images}`, ['build-images']);
  gulp.watch(`${config.src.fonts}${config.selectors.fonts}`, ['build-fonts']);
  gulp.watch(`${config.src.partials}${config.selectors.partials}`, ['build-partials']);
  gulp.watch(`${config.srcDir}${config.main.index}`, ['build-index']);
};

gulp.task('watch', watch);
module.exports = watch;
