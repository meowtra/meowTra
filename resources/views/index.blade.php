<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
  <title>meow-tra</title>
  <script>(function() { document.write('<script src="' + '/assets/app/assets.js?v=' + +new Date() + '"><\/script>')})()</script>
  <script>(function() { document.write('<link rel="stylesheet" href="' + window.WEBPACK_ASSETS.main.css + '">');})();</script>
</head>
<body>
  <div id="app"></div>
  <script src="https://hammerjs.github.io/dist/hammer.min.js"></script>
  <script>
    (function() {
      'use strict';
      var prefix = window.env === 'development' ? '.js' : '.min.js';
      var scripts = [
        '/assets/lib/vue' + prefix,
        '/assets/lib/vue-router' + prefix,
        '/assets/lib/vuex' + prefix,
        window.WEBPACK_ASSETS.manifest.js,
        window.WEBPACK_ASSETS.vendors.js,
        window.WEBPACK_ASSETS.main.js,
      ];

      document.write(scripts.map(function(src) {
        return '<script src="' + src + '"><\/script>'
      }).join(''));
      console.clear();
    })();
  </script>
</body>
</html>