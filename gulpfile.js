var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	imagemin = require("gulp-imagemin"),
	jade = require('gulp-jade'),
	plumber = require('gulp-plumber'),
  	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	minifyCss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	ngAnnotate = require('gulp-ng-annotate'),
	sourcemaps = require('gulp-sourcemaps');

// compile Jade
gulp.task('jade', function() {
	gulp.src('app/pages/*.jade')
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t',
		}))
		.pipe(gulp.dest('prod'));
});

// compile Sass
gulp.task('sass', function() {
	gulp.src(['app/**/*.scss', '!app/bower/**/*.*'])
	.pipe(sourcemaps.init())
	.pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(minifyCss())
	.pipe(concat('main.css'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('prod/css'))
});

// Concat vendor CSS
gulp.task('css-vendor', function() {
	gulp.src(['app/bower/normalize-css/normalize.css',
		'app/bower/bootstrap-css/css/bootstrap.css'])
	.pipe(minifyCss())
	.pipe(concat('vendor.css'))
	.pipe(gulp.dest('prod/css'))
});

// Move images + imagemin
gulp.task("images", function () {
	return gulp.src("app/img/**/*")
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest("prod/img"));
});

// Move fonts
gulp.task('fonts', function() {
	gulp.src("app/fonts/**/*")
		//.pipe(filter(["*.eot","*.svg","*.ttf","*.woff","*.woff2"]))
		.pipe(gulp.dest("prod/fonts/"));
});

//
gulp.task('scripts', function() {
	gulp.src(['app/**/*.js','!app/bower/**/*.*'])
	.pipe(sourcemaps.init())
	.pipe(plumber())
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(concat('app.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('prod/js'))
});

// concat vendor scripts
gulp.task('scripts-vendor', function() {
	gulp.src(['app/bower/jquery/dist/jquery.min.js',
			'app/bower/angular/angular.js',
  			'app/bower/angular-ui-router/release/angular-ui-router.js',
  			'app/bower/firebase/firebase.js',
  			'app/bower/angularfire/dist/angularfire.js',
  			'app/bower/bootstrap-css/js/bootstrap.js'])
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest('prod/js'))
});


gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: 'prod'
		}
	});
});

gulp.task('watch', function(){
	gulp.watch('app/**/*.jade', ['jade']);	
	gulp.watch('app/**/*.scss', ['sass']);
	gulp.watch('app/fonts/fonts.css', ['fonts']);
	gulp.watch('app/img/**/*', ['images']);
	gulp.watch('app/**/*.js', ['scripts']);
	gulp.watch('app/**/*').on('change', browserSync.reload);
});

gulp.task('default', ['jade',
					'sass',
					'scripts',
					'fonts',
					'images',
					'server',
					'css-vendor',
					'scripts-vendor',
					'watch']);