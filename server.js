var express=require('express');
var morgan=require('morgan');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var ejs=require('ejs');
var engine=require('ejs-mate');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var flash=require('express-flash');

var secret=require('./config/secret');
var User=require('./models/user');

var app=express();

var db=mongoose.connect(secret.database,function(err){
  if(err){
    console.log(err);
  }else {
    console.log("Connected to the database");
  }
});


//morgan-----http request logger Middleware for node.js
app.use(express.static(__dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(cookieParser());
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:secret.secretKey
}));
app.use(flash());


app.engine('ejs',engine);
app.set('view engine','ejs');






var mainRoutes=require('./routes/main');
var userRoutes=require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);








//
// app.get('/');
// app.get('/',function(req,res){
//   var name="Mike";
//   res.json("My name is "+name);
// });
//
// app.get('/catname',function(req,res){
//   res.json('batman');
// })

app.listen(secret.port,function(err){
  if(err) throw err;
  console.log("Server is Running on port "+secret.port);
});
