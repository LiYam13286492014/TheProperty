const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    // ['/sider','/detail','/category','/user'],
    ['/api'],
    
    createProxyMiddleware({
      target: 'http://localhost:3005',
      changeOrigin: true,
      pathRewrite:{
        '^/api':''
    }
    })
  );
};