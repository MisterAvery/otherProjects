let fs = require('fs');

let readableStream = fs.createReadStream(__dirname + '/pi.txt', 'utf8');
let writeableStream = fs.createWriteStream(__dirname + '/nodeCreated.txt');

readableStream.on('data', function(chunk) {
  console.log('new chunk receaved');
  writeableStream.write(chunk);
})
