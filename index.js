
var express = require('express');
var application = new express();
var bodyParser = require('body-parser');

var usermodel = require('./models/UsersModel')

var userController = require('./controllers/UsersController');

var authController = require('./controllers/AuthenticationController');



// // var authController = require('./controllers/AuthController');

//this is the first middleware - application middleware , all routes hit this middleware first
application.use(function(req,res,next){

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With');
	next(); // next passes to another application middleware 
})

// this will parse the json data in form body that arrives from client-browser (ajax)
application.use(bodyParser.json());


application.post('/v1/users',userController.validator, userController.hashGenerator, userController.registerUser, function(req,res){
	
	res.status(201);
	res.send({"message":"user was registered"})

})
application.get('/v1/users', function(req,res){

usermodel.User.findAll({
  attributes: ['id','username', 'address']
})
.then(function(result){
// response can be sent from within the middleware 
res.json(result);
})
.catch(function(err){

})
})

application.delete('/v1/users/:id', function(req,res){
	console.log(req.params.id)

	usermodel.User.destroy({
		where : { id :req.params.id }
	})
	.then(function(){
res.status(200)
res.send({"message":"deleted succesfuly"});
	})
	.catch(function(err){
		next({"status":500, "message":"Couldnot delete"})
	})
})

// application.get('/v1/users/:id',function(req,res){
// 	console.log(req.params);
// })

application.post('/v1/auth',authController.validator,authController.check, function(req,res){

	res.status(200);
	res.send({"message":"You have succesfuly logged in"})

})


// application.post('/v1/auth',authController.validator,authController.check,function(req,res){
// 	res.status(200);
// 	res.send('sdfsdf')


	
// })


application.use(function(err,req,res,next){

	// console.log(err.status);
	// console.log(err.message);

	res.status(err.status);
	res.send({"message":err.message})


})
















// application.use(function(err,req,res,next){
// 	res.status(err.status);
// 	res.send(err)
// })



application.listen(3001);




















































// application.get('/v1/users/:id', function(req,res){
// 	// console.log(req.params.id)
// 	usermodel.User.findOne({
// 		where : {id: req.params.id},
// 		attributes:['username','address']
// 	})
// 	.then(function(result){
// 		res.status(200);
// 		res.json(result)
// 	})
// 	.catch(function(err){
// console.log(err);
// 		res.status(500);

// 	})
// })

// application.put('/v1/users/:id', function(req,res){
// 	// console.log(req.body)
// 	// console.log(req.query);
// 	// console.log(req.params);
// 	// console.log('req.query');
// 	usermodel.User.update({
// 		username:req.body.username
// 	},
// 	{where: { id:req.params.id}
// })
// })




// application.delete('/v1/users/:id',function(req,res){
// usermodel.User.destroy({
// 	where : { id : req.params.id}
// })
// })
