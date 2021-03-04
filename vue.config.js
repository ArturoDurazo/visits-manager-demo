module.exports = {
    //just a shortcut so we dont havbe to type locahost.
    //this is just for devServer, not production
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                loglevel: 'debug',
                pathRewrite: { '^/api': '/'},
            }
        }
    }
}