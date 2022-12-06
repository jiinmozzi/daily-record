const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app : any){
  // app.use(
  //     createProxyMiddleware('/', {
  //         target: 'localhost:3002',
  //         changeOrigin: true
  //     })
  // )
  // app.use(
  //   createProxyMiddleware('/marketrank', {
  //     target : "https://companiesmarketcap.com?download=csv",
  //     changeOrigin: true,
  //     pathRewrite: {
  //       "^/marketrank": "",
  //     },
  //   })
  // )
};

export default createProxyMiddleware;