const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('connected');
});

module.exports = router;