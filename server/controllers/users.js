var mongoose = require('mongoose')
var User = mongoose.model('User');
var Room = mongoose.model('Room');
module.exports = {
 index: function(req, res){
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
  var room = new Room({'name': 'choose name'});
  room.save(function(err){
    if(err){
      res.send(JSON.stringify(err));
    } else {
      Room.find({}).sort({'created_at': -1}).limit(1).exec(function(err, result){
        res.send(result[0]._id);
      });
    } 
  });
 },
 room: function(req,res){  
  console.log('controller', req.params.id);
  res.render('./../server/views/room', {'id': req.params.id});


 }
}