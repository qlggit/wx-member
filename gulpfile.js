var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    less = require('gulp-less');
var buildSrc = 'src';
var destSrc = 'src';

/**
 * 清除
 */
gulp.task('clean', function(cb) {
    console.log('clean start');
    return del(['*.zip','src/css/main.css'], cb);
});
gulp.task('less',['clean'], function(cb) {
    console.log('less start');
    gulp.src('./'+buildSrc+'/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./'+destSrc+'/css'));
    gulp.src('./'+buildSrc+'/less/sub/*.less')
        .pipe(less())
        .pipe(gulp.dest('./'+destSrc+'/css/sub'))
        .on('end', cb); //编译less
});
gulp.task('default',['less'],function() {
    gulp.src(['./src/images/**']).pipe(gulp.dest('./dist/images'));
    gulp.src(['./src/css/**']).pipe(gulp.dest('./dist/css'));
    console.log('default end');
});
gulp.task('build',['rev'],function(cb) {
    console.log('build gulp');
    // gulp.src(['./build/images/**']).pipe(gulp.dest('./public/images'));
    // gulp.src(['./build/css/**']).pipe(minifycss()).pipe(gulp.dest('./public/css')); //
    // gulp.src(['./build/js/**']).pipe(uglify()).pipe(gulp.dest('./public/js')); //
    // gulp.src(['./build/views/**']).pipe(gulp.dest('views'));
    gulp.src(['./build/common/**']).pipe(uglify()).pipe(gulp.dest('./public/common')); //
    gulp.src(['./build/validate/**']).pipe(uglify()).pipe(gulp.dest('./public/validate')); //
    gulp.src(['./build/favicon.ico']).pipe(uglify()).pipe(gulp.dest('./public/favicon.ico')); //
});
