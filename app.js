const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = {};

io.on("connection", function(socket) {
    socket.on("join-room", (data) => {
        const {route} = data;
        socket.join(route);
        userRoutes[socket.id] = route;
    });

    socket.on("send-location", function(data){
        const route = userRoutes[socket.id];
        if(route){
            io.to(route).emit("receive-location", {id: socket.id, ...data});
        }
    });

    socket.on("disconnect", function(){
        const route = userRoutes[socket.id];
        if(route){
            io.to(route).emit("user-disconnected", socket.id);
        }
        delete userRoutes[socket.id];
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3001);
