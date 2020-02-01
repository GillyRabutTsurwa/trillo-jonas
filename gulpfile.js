const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

function copyHTML() {
    return gulp.src("./src/*.html")
    .pipe(gulp.dest("./dist"));
}

function copyImages() {
    return gulp.src("./src/img/*")
    .pipe(gulp.dest("./dist/img"));
}

function compileSass() {
    return gulp.src("./src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css/"))
    .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("./src/*.html", copyHTML);
    gulp.watch("./src/img/*", copyImages);
    gulp.watch("./src/sass/*.scss", compileSass);

    gulp.watch("./src/*.html").on("change", browserSync.reload);
}

exports.copyHTML = copyHTML;
exports.copyImages = copyImages;
exports.compileSass = compileSass;
exports.serve = serve;