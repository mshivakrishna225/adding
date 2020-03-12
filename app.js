const express = require('express');
const app = express();
var fs = require('fs');
var path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = mongoose.connect('mongodb://localhost:27017/signup',{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
	console.log("connectedtodb");
});
console.log(db);
var MajorSchema =mongoose.Schema({
	fields:{
		type:[String]
	}
});
	
app.set('view engine','ejs');
	var user = mongoose.model('emp', MajorSchema);
app.get('/',(req,res)=>{
		user.find({},function(err , i){
			console.log(i[0].fields);
			var vara=i[0].fields;
			res.render('dummy.ejs',{
				fields: vara
			});
		});	
	
	});
	
		app.post('/',urlencodedParser,(req,res)=>{
			var val = req.body.name+"-"+req.body.number;
			user.updateOne(
				{ _id : "5e68fd7e391ff240cc703391" },
				{ $push : { fields : [val] } },
				function(err,data)
					{
						res.redirect("http://localhost:3001/");
		
					}
			);
		});

app.use(bodyParser.json());

//schema for adding feilds

app.listen(3001);