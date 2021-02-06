let fs = require('fs');

//asyncronious
  //files
  // let txt = fs.readFile('test.txt', 'utf8', function(err, data) {
  //   fs.unlink('test.txt', function() {
  //     fs.writeFileSync('nodeCreated.txt', data);
  //   });
  // });

  //directories
  // fs.mkdir('nodeCreated.txt', function() {
    // console.log('created a directory');
  // });

  fs.rmdir('nodeCreated.txt', function() {
    console.log('removed a directory');
  });
