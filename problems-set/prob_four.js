var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function addTwo(arr) {
	var total=0;
	for(var i in arr) { total += arr[i]; }
	return total;
}

function add (a) {
	var len = Object.keys(arguments).length;
	if (len == 1) {
		return function (b) {
			return a + b;
		}
	} else {
		return addTwo(Object.values(arguments))
	}
}


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