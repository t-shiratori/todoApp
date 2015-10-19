var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	uglify = require("gulp-uglify"),
	connect = require('gulp-connect');

//html
gulp.task("html",function(){
	gulp.src("*.html").pipe(connect.reload());
});

//sass
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(connect.reload());
});

//js
gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
        .pipe(uglify())
        .pipe(gulp.dest("./js/min"))
        .pipe(connect.reload());
});

//server
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

//watch
gulp.task('watches', function(){
	gulp.watch("*.html",["html"]);
	gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["sass"]);
});

//default
gulp.task("default", ['connect','watches']);