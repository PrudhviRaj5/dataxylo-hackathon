String.prototype.XyloHack = function(digit){
  if(digit % 2){
    return this.toLowerCase();
  }else{
    return this.toUpperCase();
  }
}

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var examples;
var data = [];

rl.on('line', function(input){
  var dataLen = data.length;
  if(!dataLen && !examples){
    examples = parseInt(input);
    if(!examples){
      console.log('input invalid');
      rl.close();
    }
  }else{
    if(dataLen === (examples-1)){
      data.push(eval(input));
      console.log('-----------------OUTPUT-------------------');
      for(var i = 0; i <= dataLen; i++){
        console.log(data[i]);
      }
      rl.close();
    }else{
      data.push(eval(input));
    }
  }
});
