var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var taskList = [
	// {
	// 	id : "1234",
	// 	User : "John",
	// 	Task : "Buy Milk"
	// },
	// {
	// 	id : "3434",
	// 	User : "John",
	// 	Task : "Buy Bread"
	// }
	];

//AddTask
app.post('/addTask', function(req, res){
	if(!req.body.User || !req.body.Task){
		res.send("missing a parameter to make a task")
	}else{
	var newTask = {
		id : (taskList.length+1).toString(),
		User : req.body.User,
		Task : req.body.Task
		}
		taskList.push(newTask);
		res.send(newTask);
	}	
});

//GetTask by id
app.get('/getTask', function (req, res) {
	var taskId = req.param("id");
	var result  = _.where(taskList, {id : taskId});
	if(result.length == 0){
		res.status(404).send("This id does not exist");
	}else{
		res.send(result);
	} 
});

//GetTask by UserName
app.get('/getTasks', function(req, res){
	var taskUser = req.param("user");
	var result = _.where(taskList, {User : taskUser});
	if(result.length == 0){
		res.status(404).send("This user does not exist");
	}else{
		res.send(result);
	}
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});