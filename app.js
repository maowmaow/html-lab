
var express = require('express');
var app = express();
app.use(express.static('public'));

var nunjucks = require('nunjucks');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

var events = require('./routes/events');
app.get('/events', events.get);

var server = app.listen(80);

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ 
	server: server, 
	handleProtocols: function(protocols, cb) {
		if (protocols.indexOf('echo-protocol') >= 0) {
			cb(true, 'echo-protocol');
			return;
		}
		if (protocols.indexOf('chat-protocol') >= 0) {
			cb(true, 'chat-protocol');
			return;
		} 
		
		cb(false);
	}
});

wss.on('connection', function connection(ws) {
	
	console.log('connection opened');
	console.log('protocol: ' + ws.protocol);
	
	if (ws.protocol == 'echo-protocol') {
		ws.on('message', function incoming(message) {
			console.log('received: %s', message);
			ws.send(message);
		});
	}
	
	if (ws.protocol == 'chat-protocol') {
		
		wss.clients.forEach(function each(client) {
			client.send('User from ' + ws.upgradeReq.connection.remoteAddress + ' has joined');
		});
			
		ws.on('message', function incoming(message) {
			console.log('received: %s', message);
			wss.clients.forEach(function each(client) {
				client.send(message);
			});
		});
	}

	ws.on('close', function(code, message) {
		console.log('connection closed');
		ws.close();
	});
});
