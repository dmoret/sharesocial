var locomotive = require('locomotive'),
        env = process.env.NODE_ENV || 'development',
        port = process.env.VCAP_APP_PORT || 3000,
        address = '0.0.0.0';

locomotive.boot(__dirname, env, function(err, server) {
    if (err) { throw err; }
    server.listen(port, address, function() {
      var addr = this.address();
      console.log('listening on %s:%d', addr.address, addr.port);
    });
});