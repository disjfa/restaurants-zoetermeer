var favicons = require("favicons").stream;
var log = require("fancy-log");
var gulp = require("gulp");

gulp.task("default", function () {
  return gulp.src("logo.png").pipe(favicons({
    appName: "Restaurants Zoetermeer",
    appShortName: "Restaurants Zoetermeer",
    appDescription: "Restaurants Zoetermeer",
    developerName: "disjfa",
    developerURL: "https://disjfa.github.io/",
    background: "#ffffff",
    theme_color: "#3498db",
    path: "/restaurants-zoetermeer/icons/",
    url: "https://disjfa.github.io/restaurants-zoetermeer/",
    display: "standalone",
    orientation: "any",
    lang: "nl-NL",
    scope: "/restaurants-zoetermeer",
    start_url: "/restaurants-zoetermeer/?homescreen=1",
    version: 1.0,
    logging: false,
    html: "index.html",
    pipeHTML: true,
    replace: true
  }))
    .on("error", log)
    .pipe(gulp.dest("./icons"));
});
