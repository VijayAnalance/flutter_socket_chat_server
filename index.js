const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.route("/").get((req,res)=>{
    res.json("Hello welcome");
});

io.on("connection", (socket)=>{
    //..
    socket.join("anaonymous_group");
    console.log('backend connected');
    socket.on("sendMsg",(msg)=>{
        console.log("Here is the message",msg);
        // socket.emit("sendMsgServer",{...msg, type:"otherMsg"});
        io.to("anaonymous_group").emit("sendMsgServer",{...msg, type:"otherMsg"});
    });
});

httpServer.listen(3000);