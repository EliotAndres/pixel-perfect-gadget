var gulp = require('gulp')
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', function () {
  gulp.src(['./lib/*.js', './src/*.js'])
    .pipe(concat('ppg.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('./src/*.js', ['default']);
});
