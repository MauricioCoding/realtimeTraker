const io = require("socket.io-client");

let socket = io.connect("http://localhost:3018");

socket.on("helo",(data)=>{
  console.log("you should se this",data);
})
