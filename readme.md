Socket.IO is composed of two parts:

A server that integrates with (or mounts on) the Node.JS HTTP Server: socket.io
A client library that loads on the browser side: socket.io-client
During development, socket.io serves the client automatically for us, as we’ll see, so for now we only have to install one module:

npm install --save socket.io
That will install the module and add the dependency to package.json. Now let’s edit index.js to add it:

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
Notice that I initialize a new instance of socket.io by passing the http (the HTTP server) object. Then I listen on the connection event for incoming sockets, and I log it to the console.

Now in index.html I add the following snippet before the </body>:

<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
That’s all it takes to load the socket.io-client, which exposes a io global, and then connect.

Notice that I’m not specifying any URL when I call io(), since it defaults to trying to connect to the host that serves the page.

If you now reload the server and the website you should see the console print “a user connected”.

Try opening several tabs, and you’ll see several messages:

A console displaying several messages, indicating that some users have connected

Each socket also fires a special disconnect event:

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
Then if you refresh a tab several times you can see it in action:

A console displaying several messages, indicating that some users have connected and disconnected
