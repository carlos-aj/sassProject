const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
const sourcemaps = require('gulp-sourcemaps');

// ✅ Compilar Sass
gulp.task("styles", function () {
  return gulp.src("scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

// ✅ Servidor con BrowserSync
gulp.task("serve", function () {
  browserSync.init({ server: "./" });
  gulp.watch("scss/**/*.scss", gulp.series("styles"));
  gulp.watch("*.html").on("change", browserSync.reload);
});

// ✅ Tarea por defecto
gulp.task("default", gulp.series("styles", "serve"));
