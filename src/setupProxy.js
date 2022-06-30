const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware(["/", , "/otherApi"], { target: "https://phong-store-book-be.herokuapp.com" })
    );
};