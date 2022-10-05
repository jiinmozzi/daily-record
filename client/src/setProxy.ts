const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app : any){
  app.use(
      createProxyMiddleware('/api', {
          target: 'localhost:3002',
          changeOrigin: true
      })
  )
};

export default createProxyMiddleware;