let fs = require('fs');

let readableStream = fs.createReadStream(__dirname + '/pi.txt', 'utf8');

readableStream.on('data', function(chunk) {
  console.log('new chunk');
  console.log(chunk);
});
