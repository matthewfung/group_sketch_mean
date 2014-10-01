var users = require('./../server/controllers/users.js');

module.exports = function Routes(app, io){
 app.get('/', function(req,res) { req.session.page = 'index'; console.log('request', req.session); users.index(req,res) });
 app.post('/users/new', function(req,res) { users.create(req,res) });
 app.post('/users/login', function(req,res) { users.login(req,res) });
 app.get('/room/create', function(req,res){users.newRoom(req,res) });
 app.get('/room/:id', function(req,res){ users.room(req,res, io) });

  io.on("connection", function(socket){
    socket.on("ready", function(person, id){
    	console.log(person);
    	socket.join(id);
      	io.to(id).emit('broadcast', person);
      });
    socket.on("draw", function(options, id){
    	io.to(id).emit("clientDraw", options)
    })
	});
}

