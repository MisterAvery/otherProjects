let express = require('express');
let socket = require('socket.io');

let app = express();
app.use(express.static('public'));

let server = app.listen(3000, function() {
	console.log('listening on port 3000');
});

let pastMessages = [];
let io = socket(server);
io.on('connection', function(socket) {
  for(let i = 0; i < pastMessages.length; i++) {
    socket.emit('message', pastMessages[i]);
  }
  
	socket.on('message', function(obj) {
	  pastMessages.push(obj);
		io.sockets.emit('message', obj);
	});
});