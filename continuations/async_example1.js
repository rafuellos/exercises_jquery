var async = require('async');

// an example using an object instead of an array
async.series({
    one: function(callback){
        setTimeout(function(){
            callback(null, 1);
        }, 2000);
    },
    two: function(callback){
        setTimeout(function(){
            callback(null, 2);
        }, 1000);
    }
},
function(err, results) {
    console.log('Results: %j', results);
});

