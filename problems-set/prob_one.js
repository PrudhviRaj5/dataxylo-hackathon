var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var fileNames = [];

var nLines = [];

var emptyLinesCount = 3;

var checkTime = new Date();

rl.on('line', function(line) {
  processLine(line);
  // will stop the program if nothing is entered in 6 secs
  stopProgram();
});

function stopProgram() {
  var currTime = new Date();
  var delta = currTime - checkTime;
  if (delta >= 6000) {
    rl.close();
    getOutput();
    process.exit();
  }
  setTimeout(function(){ stopProgram() }, 500);
}

function processLine(line) {
  checkTime = new Date();
  if (line === '') {
    emptyLinesCount += 1;
  } else {
    if (emptyLinesCount == 3) {
      fileNames.push(line);
      emptyLinesCount = 0;
    } else {
      var emptyLines = [];
      for (var i=0; i<emptyLinesCount; i++) {
        emptyLines.push('')
      }
      nLines = nLines.concat(emptyLines);
      nLines.push(line.replace(/\$/g, ''));
    }
  }
}

function getFileName() {
  var fileName = fileNames[0].split('.')[0];
  var extension = fileNames[0].split('.')[1];
  for (var i=1; i<fileNames.length; i++) {
    var str = fileNames[i].split('.')[0];
    str = str.charAt(0).toUpperCase() + str.slice(1);
    fileName += str;
  }
  fileName += '.' + extension;
  return fileName;
}

function getOutput() {
  console.log('-----------------OUTPUT-------------------');
  console.log(getFileName());
  for (var i=0; i<nLines.length; i++) {
    console.log(nLines[i]);
  }
}
