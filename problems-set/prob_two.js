var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var examples;
var data = [];

// regex for cards
var visaCard = /^4[0-9]{6,}$/;
var masterCard = /^5[1-5][0-9]{5,}$|^222[1-9][0-9]{3,}$|^22[3-9][0-9]{4,}$|^2[3-6][0-9]{5,}$|^27[01][0-9]{4,}$|^2720[0-9]{3,}$/;
var discover = /^6(?:011|4[4-9][0-9]|5[0-9]{2})[0-9]{3,}$|^62212[6-9][0-9]{1,}$|^6221[3-9][0-9]{2,}|^622[2-8][0-9]{3,}$|^6229[01][0-9]{2,}|^62292[0-5][0-9]{1,}$/;
var americanExpress = /^3[47][0-9]{5,}$/;

function pushData(input) {
	var str = input.replace(/ /g, '');
  var cards = [];
  if (visaCard.test(str)) {cards.push('Visa')}
  if (masterCard.test(str)) {cards.push('Mastercard')}
  if (discover.test(str)) {cards.push('Discover')}
  if (americanExpress.test(str)) {cards.push('American Express')}
  if (cards.length == 0) {
  	data.push('Invalid');
  } else {
  	data.push(cards.join(', '));
  }
}

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
      pushData(input);
      console.log('-----------------OUTPUT-------------------');
      for(var i = 0; i <= dataLen; i++){
        console.log(data[i]);
      }
      rl.close();
    }else{
      pushData(input);
    }
  }
});
