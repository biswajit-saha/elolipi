var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('css', function() {
    return gulp.src(['./src/assets/scss/screen.scss'], { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min'}))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src([
        './src/assets/js/main.js'
    ])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('./src/assets/js'));
});


gulp.task('watch', gulp.series('css', 'js', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
    gulp.watch('./src/assets/scss/**/*.scss').on('change', gulp.series('css'));
    gulp.watch(['./src/assets/js/main.js']).on('change', gulp.series('js', browserSync.reload));
    gulp.watch('./src/*.html').on('change', browserSync.reload);
}));

gulp.task('clean', function() {
    return del(['./dist']);
});

gulp.task('build', gulp.series('clean', 'css', 'js', function () {
    var targetDir = 'dist/';
    return gulp.src([
        'src/**',
        '!src/assets/scss', '!src/assets/scss/**/*',
        'assets/js/**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**',
    ])
    .pipe(gulp.dest(targetDir));
}));

gulp.task('default', gulp.parallel('watch'));