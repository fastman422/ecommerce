var express=require('express');
var morgan=require('morgan');

var app=express();

//morgan-----http request logger Middleware for node.js
app.use(morgan('dev'));

app.get('/');
app.get('/',function(req,res){
  var name="Mike";
  res.json("My name is "+name);
});

app.get('/catname',function(req,res){
  res.json('batman');
})

app.listen(3000,function(err){
  if(err) throw err;
  console.log("Server is Running on port 3000");
});
