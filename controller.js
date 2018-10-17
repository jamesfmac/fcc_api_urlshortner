var URL = require('./model.js').UrlModel;
var COUNTER = require('./model.js').counter
const dns = require('dns');
const url = require('url');

var createUrlHandler = function(done,reqBody) {
  
  dns.lookup(url.parse(reqBody.url).hostname, function(err, urlDetails){
   if (err) 
        {return done(err)}
    if(!urlDetails)
      
      {return done('Invalid URL')}
  
    COUNTER.find({name:'last created'}, function(err, counters){

      if (err) 
        {return done(err)}

      let counter = counters[0]
      var url = new URL ({original_url: reqBody.url, short_url: counters[0].count +1})

      url.save(function(err,savedURL){

        if (err) 
          {return done(err)}

        COUNTER.findByIdAndUpdate(counter._id,{count:counter.count+1}, function(){

          if (err) 
            {return done(err)}

          done(null, savedURL)

        })

      })

    })
  })
  }
 
var shortUrlHandler = function(done,id){

  URL.findOne({short_url: id}, function(err,doc){
    
    if (err)
    {return done(err)}
    
    if(!doc)
    { return done('Route not found')}
    
    done(null, doc.original_url)
    
  })
}
  



exports.createUrlController = createUrlHandler
exports.shortUrlController = shortUrlHandler