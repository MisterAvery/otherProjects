// let http = require('http');
// let fs = require('fs');
//
// let server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//
//     let readStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
//       readStream.pipe(res);
// });
//
// server.listen(3000, '127.0.0.1', function() {
//   console.log('server is listening on port 3000');
// });

let express = require('express');
let fs = require('fs');

let app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/honk', function(req, res) {
  res.sendFile(__dirname + '/public/honk.html');
});

app.listen(3000, function() {console.log('listening on port 3000')});
