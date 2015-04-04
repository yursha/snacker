var gulp = require('gulp')
var mocha = require('gulp-mocha');
var react = require('gulp-react');

gulp.task('test', function() {
  return gulp.src(['test/test-*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        should: require('chai')
      }
    }))
})

/*
 * Precompile JSX templates on the server
 */
gulp.task('jsx', function() {
  return gulp.src('components-src/*')
    .pipe(react())
    .pipe(gulp.dest('public/scripts/components'))
})
