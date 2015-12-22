var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');


// this task will delete our compiled files
gulp.task("clean", function(){
	return gulp.src(['./css/sass/**/*.scss']).then(function (paths){
		if(paths){
			console.log('Deleted:/n', paths.join('/n'));

		}
		else{
			console.log('Already clean, proceed...');
		}
	});
});

// lint our js 
gulp.task("hint", function(){
	return gulp.src('./js/source/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
});

// this task will minify our javascript
gulp.task('jsmin', ['hint'], function(){
	gulp.src('./js/source/**/*.js')
	.pipe(concat('all.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./js'))

});

// builds all the things
gulp.task('build', ['jsmin', 'styles']);



// this task compiles all sass files
gulp.task("styles",['clean'], function(){
	gulp.src('./css/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('style.css'))
	.pipe(minify())
	.pipe(gulp.dest('./css/'));

});

// watch for file cahnges, must run in cmdline
gulp.task('watch', function(){
	gulp.watch(['./css/sass/**/*.scss'], ['styles']);
	gulp.watch(['./js/source//**/*.js'], ['jsmin']);
});

gulp.task('default', ['styles', 'watch']);



