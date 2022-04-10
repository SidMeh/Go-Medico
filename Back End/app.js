var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
const fs = require("fs");


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/customers";





MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Krish", RegNum: "699669969669", PhoneNum: "72245789" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var san = "111903087";
  var query = { RegNum: san };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    
      console.log(result);
    db.close();
  });
});*/



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
/*
app.get('/getRequest/:name', function(req, res){
  res.send('Hello' + req.params.name)
})*/

app.post('/cartRequest/', function(req, res){
 // console.log(req.body);
  var data = req.body;
  var temp = {};
  MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("warehouse").find({}).toArray(function(err, result) {
      if (err) throw err;
      result = result[0];
      var c = Object.keys(data);
      console.log(c);
      for(var i = 0; i < c.length; i++){
          temp[c[i]] = result[c[i]];
          temp[c[i]]["pieces"] = Number(temp[c[i]]["pieces"]) - Number(data[c[i]]);
      }
      console.log(temp);
      MongoClient.connect(url, function(err, db){
        if (err) throw err;
        db1 = db.db("mydb");
        db1.collection("warehouse").updateOne({"title" : "medicines"},{$set:temp},{upsert:false,
          multi:true});
      })
      db.close();
    })
  })

})

app.post('/sdRequest/', function(req, res){
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
 //  var query = {"morphine": ""};
      var r = req.body;
      p = r["product_name"];
 //     var newvalues = {$set: {p: {"pieces": r["product_pieces"], "cost": r["product_cost"]}}};
      var newvalues =             {"p":{
                      "pieces":r["product_pieces"],
                      "cost": r["product_cost"],
                      "discount": r["product_discount"],
                      "id": new Date().getTime(),
                      "description": r["product_description"]
                    }}
      newvalues[r["product_name"]] = newvalues["p"];
      delete  newvalues["p"];
      dbo.collection("warehouse").updateOne({"title" : "medicines"},{$set:newvalues},{upsert:false,
        multi:true}) 
  })
})

app.get('/prescribeRequest/', function(req, res){
//  console.log("Got "+req.toString());
  fs.open("ipc.txt", "r", (err, file) => {
    if (err) throw err; 
    fs.readFile(file, (err, data) => {
      if (err) throw err;
      var placed = {};
      var d = {}, i = 1;
      data = data.toString();
      var data1 = data.split(" ");
      while(i < data1.length){
        d[data1[i]] = data1[i+1];
        i = i + 2;
      }
    //  console.log(d);
      MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("warehouse").find({}).toArray(function(err, result) {
          if (err) throw err;
          var info = result[0], c = Object.keys(d);;
          var newvalues = {};
          for(var i = 0; i < c.length; i++){
            newvalues[c[i]] = info[c[i]]
            if(Number(newvalues[c[i]]["pieces"]) - Number(d[c[i]]) > 0){
              placed[c[i]] = d[c[i]];
              newvalues[c[i]]["pieces"] = Number(newvalues[c[i]]["pieces"]) - Number(d[c[i]]);
            }
            else{
              placed[c[i]] = d[c[i]];
              placed[c[i]] =  newvalues[c[i]]["pieces"];
              newvalues[c[i]]["pieces"] = 0;
            }
          }
          console.log(newvalues);
          MongoClient.connect(url, function(err, dbs){
            if (err) throw err;
            var dbd = dbs.db("mydb");
            dbd.collection("warehouse").updateOne({"title" : "medicines"},{$set:newvalues},{upsert:false,
              multi:true});
          });
          db.close();
          var msg = "";
          for(var i = 0; i < c.length; i++){
            msg = msg + c[i] + ":" + placed[c[i]] + " ";
          }
          res.send(msg);
        });


      })
     
   });
 });



})

app.post('/slRequest/', function(req, res){
  var present = 0;
  MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = {firstName: req.body.firstName.toString(), RegNum: req.body.RegNum.toString(), Password: req.body.Password.toString(), PhoneNum: req.body.PhoneNum.toString()}; 
    dbo.collection("seller").find(query).toArray(function(err, result){
      if(result.length == 0)
        present = 0;
      else
        present = 1;
      res.send(""+present);


    })


  })

});


app.post('/ssRequest/', function(req, res){
//  console.log(req.body);
  var present = 1;
  var send = 1;
  MongoClient.connect(url, function(err, db){
    var dbo = db.db("mydb");
    var query = {firstName: req.body.firstName.toString(), RegNum: req.body.RegNum.toString(), Password: req.body.Password.toString(), PhoneNum: req.body.PhoneNum.toString()};
    dbo.collection("seller").find(query).toArray(function(err, result){ 
      console.log(result);
      if (err) throw err;
      if(result.length == 0)
        present = 0;
      else
        present = 1;
      if(present == 1){
        send = 0;
        console.log("Doc already present"+ result.length);
      }
      else{
        send = 1;
        MongoClient.connect(url, function(err, db){
          var db1 = db.db("mydb");
          var myObj = {firstName: req.body.firstName.toString(), RegNum: req.body.RegNum.toString(), Password: req.body.Password.toString(), PhoneNum: req.body.PhoneNum.toString()};
          db1.collection("seller").insertOne(myObj, function(err, result){
            if (err) throw err;
            console.log("Doc inserted");

          });
        
        });
      }
      res.send(""+ send);
      
    });
  });
  

});  

app.get('/listRequest/', function(req, res){
  MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("warehouse").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    })
  });
  
})

app.post('/loginRequest/', function(req, res){
  console.log("Data reached", req.body);
  MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var dbo = db.db("mydb");
    var present;
    var query = {RegNum: req.body.RegNum.toString(), name: req.body.name.toString(), PhoneNum: req.body.PhoneNum.toString(), password: req.body.password.toString()};
    dbo.collection("customers").find(query).toArray(function(arr, result){
      if (err) throw err;
      if(result.length == 0)
        present = 0;
      else  
        present = 1;
      res.send(""+present);
    })
  });
});



//step 1 searching step ; 2 inserting 
app.post('/postRequest/', function(req, res){
  var present = 0;
  var snd = 0;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var san = "111903087";
    var query = { RegNum: req.body.RegNum.toString(),name: req.body.name.toString(), PhoneNum: req.body.PhoneNum.toString(), password: req.body.password.toString() };
    dbo.collection("customers").find(query).toArray(function(err, result) {
      if (err) throw err;
      present = result;
        
        if(result.length == 1){
          snd = 1;
          console.log("present");
        }
        else{
          console.log(present);
          myObj = {
            "name" : req.body.name,
            "RegNum" : req.body.RegNum,
            "PhoneNum" : req.body.PhoneNum,
            "password" : req.body.password
          }
            
          MongoClient.connect(url, function(err, db1) {
            if (err) throw err;
            var dbi = db1.db("mydb");
            
            dbi.collection("customers").insertOne(myObj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db1.close();
            });
          });    
        }
      db.close();
      res.send(""+snd);
    });
   
    
  });


  


  //  res.send("THis is a successfull request" + req.body.name + " " + req.body.RegNum + " " + req.body.PhoneNum)
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
