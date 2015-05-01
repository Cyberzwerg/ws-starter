var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var coffee = require('gulp-coffee');

var paths = {
    sass: ['./src/client/scss/*.scss'],
    jade: ['./src/client/templates/*.jade'],
    coffeeClient: ['./src/client/coffee/*.coffee'],
    coffeServer: ['./src/server/*.coffee'],

};

gulp.task('default', ['sass']);

gulp.task('jade', function() {
    gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./build/client/templates'));
});

gulp.task('sass', function(done) {
    gulp.src(paths.sass)
    .pipe(sass({
        errLogToConsole: true
    }))
    .pipe(rename({
        extname: '.css'
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./build/client/'))
    .on('end', done);
});

gulp.task('coffeeClient', function(done) {
    gulp.src(paths.coffeeClient)
    .pipe(coffee({
            bare: true
        })
    .on('error', gutil.log.bind(gutil, 'Coffee Error')))
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./build/client/'))
    .on('end', done);
});

gulp.task('coffeServer', function(done) {
    gulp.src(paths.coffeServer)
    .pipe(coffee({
            bare: true
        })
    .on('error', gutil.log.bind(gutil, 'Coffee Error')))
    .pipe(gulp.dest('./build/'))
    .on('end', done);
});



gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.coffeeClient, ['coffeeClient']);
    gulp.watch(paths.coffeServer, ['coffeServer']);
    gulp.watch(paths.jade, ['jade']);
});