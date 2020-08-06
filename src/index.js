var app = require('express')();
var http = require('http').createServer(app);

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: 'src'}); 
});
let counter = 0;
io.on('connection', function(socket) {
  console.log( socket.client.conn.server.clientsCount + " users connected" );
  socket.on('disconnect', function() {
    console.log( socket.client.conn.server.clientsCount + " users connected" );
  });
});


app.get('/test', (req, res) => {
  res.sendFile('test.html', {root: 'src'}); 
});

app.get('/testTwo', (req, res) => {
  res.sendFile('testTwo.html', {root: 'src'}); 
});

app.get('/testThree', (req, res) => {
  res.sendFile('testThree.html', {root: 'src'}); 
});




http.listen(3018, () => {
  console.log('listening on *:3018');
});



