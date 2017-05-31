var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync');

gulp.task('css', function () {
    // 写你的正常需要执行的js代码
    return gulp.src('src/less/**/*')
            .pipe(less())
            .pipe(cleanCSS())
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.reload({
                stream: true
            }))
})


gulp.task('js', function () {
    return gulp.src('src/js/**/*')
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'))
})

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    },
  })
})

gulp.task('dev', function () {
    gulp.watch('src/less/**/*', ['css'])
    gulp.watch('src/js/**/*', ['js'])
    gulp.src('src/*.html').pipe(gulp.dest('dist'))

    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/less/**/*.less', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
})

gulp.task('build', ['css', 'js'], function () {
    console.log('css和js都打包完成了')
})
