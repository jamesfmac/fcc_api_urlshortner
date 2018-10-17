var COUNTER = require('./model.js').counter

var initiateCounter = function(done,url) {
 

var counter = new COUNTER ({count:0})
  
  //save the record and hanle any errors 
  counter.save((err,data)=>{
    console.log(data)
   if (err){ done(err) }
    else{ done(null, data)} 
  })
}

initiateCounter((err,data)=>{
  if (err){
    console.log('error: ' + err)
    process.exit(1)
  }
  else{
   console.log(data) 
  process.exit()
  }
})
