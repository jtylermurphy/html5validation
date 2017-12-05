var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var reload = browserSync.reload;


gulp.task('sass', function(){
  return gulp.src('sass/styles.scss')
    //.pipe(sourcemaps.init())
    .pipe(sass()) // Convert Sass to CSS with gulp-sass
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('styles'))
    .pipe(browserSync.stream());
});

gulp.task('minify', function () {
    return gulp.src('styles/styles.css')
        .pipe(cleancss())
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('styles'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});


gulp.task('watch', ['browser-sync'], function(){
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('sass/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
