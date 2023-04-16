const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "https://liav-notes-api.onrender.com",
    //   target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};

