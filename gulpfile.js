var gulp = require("gulp");
var sass = require("gulp-sass");
var clean = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var webserver = require("gulp-webserver");
var path = require("path");
var fs = require("fs");
var url = require("url");
var data = fs.readFileSync(path.join(__dirname, "src/data/data.json"), "utf8");
//编译scss
gulp.task("devSass", function() {
        return gulp.src("./src/scss/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("./src/css"))
    })
    //压缩css
gulp.task("clean", function() {
        return gulp.src("./src/css/*.css")
            .pipe(clean())
            .pipe(gulp.dest("./src/css"))
    })
    //压缩js

gulp.task("uglify", function() {
        return gulp.src("./src/js/*.js")
            .pipe(uglify())
            .pipe(gulp.dest("./src/js"))
    })
    //监听
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass"))
})
gulp.task("webserver", function(req, res, next) {
    return gulp.src("src")
        .pipe(webserver({
            port: 3333,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico") {
                    res.end("");
                    return;
                }
                if (pathname === "/list") {
                    res.end(JSON.stringify({
                        code: 1,
                        mes: "success",
                        data: data
                    }))
                }
                pathname = pathname === "/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                    // console.log(data)

            }
        }))
})