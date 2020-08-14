var app = require('express')();
var http = require('http').createServer(app);

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var axios = require('axios')
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: 'public/src/views'}); 
});

io.on('connection', function(socket) {
  socket.on('url', async (msg) => {
    const result= await axios.get(`https://dev-api.crhoy.net/api/tracker_visits/?_where=(url,eq,${msg})`)
    let obj;
    if(result.data.length !== 0){
      obj = {
        id: result.data[0].id,
        url: msg,
        visits: result.data[0].visits + 1,
      }
    }else{
      obj = {
        url: msg,
        visits: 1,
      }
      
    }

    const err = await axios.put("https://dev-api.crhoy.net/api/tracker_visits", obj)
    console.log(err)
    
  
  });
  socket.on('myCustomEvent', async (customEvent)=> {  
    const result= await axios.get(`https://dev-api.crhoy.net/api/tracker_visits/?_where=(url,eq,${customEvent})`)
    console.log(result.data)
    result.data[0].visits = result.data[0].visits-1;
    
    const err = await axios.put("https://dev-api.crhoy.net/api/tracker_visits", result.data[0])
    console.log(err)
  });
});





app.get('/test', (req, res) => {
  res.sendFile('test.html', {root: 'public/src/views'}); 
});

app.get('/testTwo', (req, res) => {
  res.sendFile('testTwo.html', {root: 'public/src/views'}); 
});

app.get('/testThree', (req, res) => {
  res.sendFile('testThree.html', {root: 'public/src/views'}); 
});




http.listen(3018, () => {
  console.log('listening on *:3018');
});



