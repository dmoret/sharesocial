var SocketIOFileUploadServer = require('socketio-file-upload');
var md5 = require('MD5');
var sessionStore = require('sessionstore').createSessionStore();
var express = require('express');

module.exports = function() {
	var self = this;
var app = this.express
  , http = require('http')
  , server = http.createServer(app).listen(3003);
  this.io = require('socket.io').listen(server);

  this.io.sockets.on('error', function (e) {

console.log(e)
  })





};
