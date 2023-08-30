const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/clients', // Replace '/api' with '/clients'
    createProxyMiddleware({
      target: 'http://localhost:3000', // Rails server URL
      changeOrigin: true,
    })
  );

  app.use(
    '/votes', // Replace '/api' with '/votes'
    createProxyMiddleware({
      target: 'http://localhost:3000', // Rails server URL
      changeOrigin: true,
    })
  );
};