const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
var app = express();
const socketIO = require('socket.io');
const http = require('http');
var server = http.createServer(app);
var io = socketIO(server);
const {generateMessage , generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	 console.log('new user connnected');

	 socket.emit('newMessage',generateMessage('admin','welcome to the chat app'));

	 socket.broadcast.emit('newMessage',generateMessage('admin','new user joined'));

	 socket.on('createMessage',(message,callback)=>{
		 console.log('createMessage',message);
		 io.emit('newMessage',generateMessage(message.from , message.text));
		 callback();
	});

		socket.on('createLocationMessage',(coords)=>{
			io.emit('newLocationMessage',generateLocationMessage('user',coords.latitude,coords.longitude));
		});

	 socket.on('disconnect',()=>{
		 console.log('user was disconnected');
	 });
});

server.listen(PORT, ()=> {//callback function
	console.log('listening on PORT '+PORT);
});
