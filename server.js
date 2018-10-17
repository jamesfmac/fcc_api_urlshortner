'use strict';

var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

//import models
var URL = require('./model.js').UrlModel;

//import controllers
var createUrlController = require('./controller.js').createUrlController;
var shortUrlController = require('./controller.js').shortUrlController;




//middleware
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
//logg path requests to console
app.use(function(req,res,next){
  console.log("Path = " + req.path +" method = "+ req.method)
  
  next()
})
  
// API's
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post('/api/shorturl/new', function(req,res,next){
 
  createUrlController(function(err,data){
    if (err)
    
    {  res.json({Error: err}) }
  
     res.json({original_url: data.original_url, short_url: data.short_url})
  
  },req.body)
})


app.get('/api/shorturl/:id', function(req,res,next){

  
  shortUrlController(function(err,savedUrl){
   
    if (err)
    
    { return res.json({Error: err}) }
    
    res.redirect(savedUrl)
  
  },req.params.id)
   


})
  
  


/*API error handler

app.use("/api", function(err, req, res, next){
  
  // use the error's status or default to 500
  res.status(err.status || 500);
  
  // send back json data
  res.send({
    Error: err
  })
});

*/


//display UI pages 

app.use('/public', express.static(process.cwd() + '/public'));


app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
app.get('/surl', function(req,res){
  res.sendFile(process.cwd() + '/views/surl.html')
});

//start app
app.listen(port, function () {
  console.log('Node.js listening ...');

});