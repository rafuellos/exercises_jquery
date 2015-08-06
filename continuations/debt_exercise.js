var request = require('request');
var async = require('async');



/*var totalDebts = 0;
var debts = [];
var answer = 0;

function readDebts(callback, err){
  for (i=1; i<=5; i++) {
    var url = 'http://stats.mediasmart.es/bulk/test-2014/account-0' + i +'.json';
    request(url, function(err,res,body){
      if (!err && res.statusCode==200)
      {
        body = JSON.parse(body);
        debts.push(body.Debt);
        //console.log(debts);
        //console.log('Debt: %i', body.Debt);
        callback(body.Debt, debts);
        answer += 1;
        if (answer===5){    
          console.log('The total debt is:', totalDebts);
        }
      };
    });      
  }; 
};


function sumDebts(debts, debtsArray){
  totalDebts += debts;
  
}  

readDebts(sumDebts);*/

var functionArray = [];

function getDebtReader(url)
{
  return function(callback)
  {
      request(url, function(error, result, body)
      {
          if (error || result.statusCode != 200)
          {
              return callback('Could not read ' + url);
          }
          body = JSON.parse(body);
          return callback(null, body.Debt);
      });
  };
};

for (i=1; i<=5; i++) {
    var url = 'http://stats.mediasmart.es/bulk/test-2014/account-0' + i +'.json';
    functionArray.push(getDebtReader(url));
}    

//console.log(functionArray);



async.parallel(functionArray, function(error, result){
  //console.log('result is: ' + result);
  var total = 0;
  result.forEach(function(value){
    total += value
  });
  console.log('Total debt is ' + total);

});



    
    

  



