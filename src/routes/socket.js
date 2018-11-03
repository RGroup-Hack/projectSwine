module.exports = function(io){
    io.origins(['*:*', 'http://localhost:5500']);

    const events = {
        endOfTracking: 'closingAssist',
        sendMyPosition: 'sendMyPostion',
        receiveAnotherPosition: 'receiveAnotherPosition',
        catchAssist: 'catchAssist',
        requestAssist: 'requestAssist',
        receiveAssist: 'receiveAssist',
        receiveEndAssist: 'receiveEndOfAssist'
    }

    io.on('connection', (socket) => {
        console.log('connected');


        socket.on(events.endOfTracking, (data) => {
            console.log(data.over);
            socket.emit('teste', {msg: 'hello from server!'});
        })
    });

};