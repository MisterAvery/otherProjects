let fs = require('fs');

let rs = fs.createReadStream(__dirname + '/pi.txt', 'utf8');
let ws = fs.createWriteStream('nodeCreated.txt');

rs.pipe(ws);
