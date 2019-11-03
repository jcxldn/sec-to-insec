// Check to make sure a HOSTNAME environment variable was passed
if (!process.env.HOSTNAME) {
  console.error("You must provide a HOSTNAME environment variable!");
  process.exit(1);
}

var express = require("express");
var proxy = require("http-proxy-middleware");
const pj = require("./package.json");

var app = express();

// Fix missing slashes (e.g. "folder" >> "folder/")
app.use(function(req, res, next) {
  // if / not in path, and is not a file
  if (
    req.path.substr(-1, 1) != "/" &&
    !req.path.includes(".") &&
    req.path.length > 1
  ) {
    res.redirect(301, req.path + "/");
  } else {
    next();
  }
});

app.use(
  "/",
  proxy({
    router: function(req) {
      return (
        "https://" +
        req.hostname
          .toLowerCase()
          .split(`.${process.env.HOSTNAME.toLowerCase()}`)[0]
      );
    },
    target: "tld.invalid",
    changeOrigin: true,
    headers: { "X-User-Agent": pj.name + "/" + pj.version },
    hostRewrite: true,
    autoRewrite: true,
    // Allow self-signed certs
    secure: false,
    followRedirects: true,
    // Disable console logging
    logLevel: "silent"
  })
);

const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Using hostname prefix of: *.${process.env.HOSTNAME}`);
console.log(`Listening on port ${port}`);
