var mongoose = require('mongoose');
var RoomSchema = new mongoose.Schema({
	name: String,
	created: {type: Date, defualt: Date.now}
});

RoomSchema.path('name').required(true, 'Room name required');
mongoose.model('Room', RoomSchema);