var gulp = require('gulp')
var gulpClean = require('gulp-clean')
var gulpSass = require('gulp-sass')
// var gulpBabel = require('gulp-babel')
var gulpUglify = require('gulp-uglify')
gulp.task('clean',function () {
    gulp
        .src('./dist')
        .pipe(gulpClean())
})
gulp.task('css',function () {
    gulp
        .src('./src/css/**')
        .pipe(gulpSass())
        .pipe(gulp.dest('./dist/css/'))
})
gulp.task('gulpUglify',function(){
    gulp
        .src('./src/js/**')
        .pipe(gulpUglify())
        .pipe(gulp.dest('./dist/js/'))
})
gulp.task('default', ['clean', 'css','gulpUglify'])