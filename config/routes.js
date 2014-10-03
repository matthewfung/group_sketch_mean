rooms = {};
var users = require('./../server/controllers/users.js');

module.exports = function Routes(app, io){
   io.on("connection", function(socket){
    socket.on("ready", function(data){
        socket.join(data.id);
        socket.clientName = data.name;
        socket.room_id = data.id;
        rooms[data.id].push(data.name);
            
        console.log("User Joined", data.name, data.id, rooms);
        io.to(data.id).emit("user_joined", data.name);
    })
    socket.on("draw", function(options, id){
      io.to(id).emit("clientDraw", options)
    })
    socket.on("disconnect", function(){
      console.log("Disconnect", rooms);
      if(rooms[socket.room_id] !== undefined){
       var i = rooms[socket.room_id].indexOf(socket.clientName);
       rooms[socket.room_id].splice(i, 1);
      }
       console.log(rooms);
       console.log(socket.clientName +" just disconnected");
       io.to(socket.room_id).emit("delete_user", socket.clientName);
    });
    socket.on("message", function(msg, name){
       console.log("Typed Message",msg, socket.room_id);
       io.to(socket.room_id).emit("newMessage", name+ ":  "+msg);
    })
    socket.on("eraseAll", function(){
      io.to(socket.room_id).emit("eraseAll");
    })
    socket.on('mouseCursor', function(name, x, y, color){
       io.to(socket.room_id).emit("mouseCursor", name, x, y, color);
    });
        
  });
 app.get('/', function(req,res) { req.session.page = 'index'; console.log('request', req.session); users.index(req,res) });
 app.post('/users/new', function(req,res) { users.create(req,res) });
 app.post('/users/login', function(req,res) { users.login(req,res) });
 app.post('/room/create', function(req,res){users.newRoom(req,res) });
 app.get('/room/:id', function(req,res){ users.room(req,res) });
 app.get('/users/get/:room_id', function(req,res){ users.get_users(req,res); });
}