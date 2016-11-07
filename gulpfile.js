var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var ngmin = require('gulp-ngmin');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
//var minifyCss = require('gulp-minify-css');//尚不考虑css压缩
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

//执行压缩混淆前，先执行jshint
gulp.task('default', ['jshint'], function() {
    gulp.start('minifyjs');
});

var res ={
    js:[

        './bower_components/angular/angular.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './bower_components/angular-css/angular-css.min.js',
        './script/app.js',
        './component/**/*.js',
    ]
}

//压缩，合并 js
gulp.task('minifyjs',function() {
    return gulp.src(res.js)//需要操作的文件
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('./dist'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(ngAnnotate())
        .pipe(ngmin({dynamic: false}))//Pre-minify AngularJS apps with ngmin
        .pipe(stripDebug())//除去js代码中的console和debugger输出
        .pipe(uglify({outSourceMap: false}))    //压缩
        .pipe(gulp.dest('./dist'));  //输出
});

gulp.task('jshint', function () {
    return gulp.src('./www/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});