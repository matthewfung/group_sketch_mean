var mongoose = require('mongoose')
var User = mongoose.model('User');
var Room = mongoose.model('Room');
module.exports = {
 index: function(req, res){
  //If rooms object is empty, initialize it
    if(Object.getOwnPropertyNames(rooms).length === 0){
       Room.find({}, function(err, results){
          for(room in results){
             rooms[results[room]._id] = []; //Empty array because initially there are no users
          }
       })
    } 
   res.render('./../server/views/index', {title:'Welcome Page'});
 },
 create: function(req, res){
  var a = new User(req.body);
  a.save(function(err){
   if(err){
    res.send(JSON.stringify(err));
   }
   else
   {
    res.send('success');
   }
  });
 },
 login: function(req, res){
  User.findOne({ 'email': req.body.email, 'password' : req.body.password }, function(err, result){
    if(err){
      res.send(JSON.stringify(err));
    } else {
    req.session.name = result.name;
      res.redirect('/room/create');
    }
  });
 },
 newRoom: function(req,res){
  //Add room to db
  var room = new Room({'name': 'choose name'});
  room.save(function(err){
    if(err){
      res.send(JSON.stringify(err));
    } else {
      Room.find({}).sort({'created': 1}).limit(1).exec(function(err, result){
        rooms[result[0]._id] = [];
        res.send(result[0]._id);
      });
    } 
  });
 },
 room: function(req,res){ 
    console.log("Getting to room route");
    //If rooms object is empty, initialize it
    if(Object.getOwnPropertyNames(rooms).length === 0){
       Room.find({}, function(err, results){
          for(room in results){
             rooms[results[room]._id] = []; //Empty array because initially there are no users
          }
       })
    } 
    res.render('./../server/views/room', {'id': req.params.id});
 },
 get_users: function(req,res){
    console.log("Getting users from room "+ req.params.room_id, rooms[req.params.room_id]);
    var id = req.params.room_id;
    res.send(rooms[id]);
 }
}