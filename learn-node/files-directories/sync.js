let fs = require('fs');

// syncronious
  //files
  // let txt = fs.readFileSync('test.txt', 'utf8');// read txt file
  // fs.unlinkSync('test.txt');// deleate files
  // fs.writeFileSync('nodeCreated.txt', txt);// create file

  //directories
  fs.mkdirSync('nodeCreated');
  // fs.rmdirSync('nodeCreated');
