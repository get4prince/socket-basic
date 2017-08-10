var socket = io();

function scrollToButton() {
	var messages = jQuery('messages');

	var newMessage = messages.children('li:last-child');

	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		console.log('should scroll');
	}
}

socket.on('connect',function(){
		console.log('connected to server');
});

socket.on('disconnect',function(){
	console.log('disconnected to server');
});

socket.on('newMessage' , function (message) {
		var template = jQuery('#message-template').html();
		var html = Mustache.render(template,{
			text: message.text,
			from: message.from,
			time: message.time
		});

		jQuery('#messages').append(html);
		// console.log('new message',message);
		// var li = jQuery('<li></li>');
		// li.text(`${message.from} ${message.time}: ${message.text}`);
		//
		// jQuery('#messages').append(li);
		scrollToButton();
});

socket.on('newLocationMessage', function(message){
	 var template = jQuery('#location-template').html();
	 var html = Mustache.render(template,{
		 url: message.url,
		 from: message.from,
		 time: message.time
	 });

		// var li = jQuery('<li></li>');
		// var a = jQuery('<a target-"_blank">My current location</a>');
		//
		// li.text(`${message.from} ${message.time}: `);
		// a.attr('href',message.url);
		// li.append(a);

		jQuery('#messages').append(html);
		scrollToButton();
});

jQuery('#message-form').on('submit',function(e){
	e.preventDefault();

	var messageTextbox = jQuery('[name=message]');
	socket.emit('createMessage',{
		from: 'user',
		text: messageTextbox.val()
	},function(){
			messageTextbox.val('');
	});
})

var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
		if(!navigator.geolocation){
			return alert('geolocation not suppot by ur broser');
		}

		locationButton.attr('disabled','disabled').text('Sending location.....');

		navigator.geolocation.getCurrentPosition(function(position){
			locationButton.removeAttr('disabled').text('Send location');
				socket.emit('createLocationMessage',{
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
		},function(){
			locationButton.removeAttr('disabled').text('Send location');
			alert('unable to fetch location');
		});
});
