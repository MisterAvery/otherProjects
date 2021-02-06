let express = require('express');
let socket = require('socket.io');

let app = express();
app.use(express.static('public'));

let server = app.listen(1800, function() {
  console.log('listening on port: 1800');
});

let io = socket(server);
io.on('connection', function(socket) {
  console.log('someone connected');

  socket.on('message', function(obj) {
    socket.broadcast.emit('reply', obj);
  });
});
