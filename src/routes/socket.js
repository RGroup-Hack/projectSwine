module.exports = function(io){
    io.origins(['*:*', 'http://localhost:5500']);

    io.on('connection', (socket) => {
        console.log('connected');
    });

};