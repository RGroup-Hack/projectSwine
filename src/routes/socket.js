const getDistanceBetweenPeople = require('../utils/distance');
const Pessoa = require('../models/pessoa');
const Viagem = require('../models/viagem'); 

module.exports = function(io){
    io.origins(['*:*', 'http://localhost:5500']);

    const events = {
        endOfTracking: 'closingAssist',
        sendMyPosition: 'sendMyPostion',
        receiveAnotherPosition: 'receiveAnotherPosition',
        catchAssist: 'catchAssist',
        requestAssist: 'requestAssist',
        receiveAssist: 'receiveAssist',
        receiveEndAssist: 'receiveEndOfAssist',
        findPeople: 'findPeople',
    }

    const connected = new Array();
    const needingHelp = new Array();
    const pairs = new Array();

    const posFix = 'Response';

    io.on('connection', (socket) => {
        console.log('connected');

        connected.push(socket);

        socket.on(events.endOfTracking, (data) => {
            console.log(`event: ${events.endOfTracking}`);
            socket.emit(`${events.endOfTracking}${posFix}`, {msg: `hello from server! - ${events.endOfTracking}`});
        });
        socket.on(events.sendMyPosition, (data) => {
            console.log(`event: ${events.sendMyPosition}`);
            socket.emit(`${events.sendMyPosition}${posFix}`, {msg: `hello from server! - ${events.sendMyPosition}`});
        });
        socket.on(events.receiveAnotherPosition, (data) => {
            console.log(`event: ${events.receiveAnotherPosition}`);
            socket.emit(`${events.receiveAnotherPosition}${posFix}`, {msg: `hello from server! - ${events.receiveAnotherPosition}`});
        });
        socket.on(events.findPeople, (data) => {
            console.log('oi');
            const { name, position } = data;
            const maxDistance = 0.1;
    
            const helper = {
                socket,
                name,
                position
            }

            const needingHelpList = needingHelp.filter((helped) => {
                const p1 = {lat1: helped.viagem.origem.lat, lon1: helped.viagem.origem.long};
                const p2 = {lat2: helper.position.latitude, lon2: helper.position.longitude};

                const d = getDistanceBetweenPeople(p1, p2);  
                console.log(d);

                if(d <= maxDistance){
                    helped.distance = d;
                }

                return d <= maxDistance;
            })
            .map((helped) => {
                return {
                    name: helped.viagem.idAjudado,
                    position: helped.viagem.origem,
                    destino: helped.viagem.destino,
                    socketId: helped.socket.id,
                    deficiencia: "Deficiencia Visual",
                    info: helped.viagem.info
                }
            });    
            //console.log(`${helpers.map((person) => `${person.name} ${person.socket.id}`).join(' | ')}`);    
            console.log(`event: ${events.findPeople}`);
            socket.emit(`${events.findPeople}${posFix}`, {msg: `hello from server! - ${events.findPeople}`, list: needingHelpList});

        });
        socket.on(events.catchAssist, (data) => {
            let socketAssistido = connected.find( (helpData) => {
                return helpData.id == data;
            });

            socketAssistido.emit(events.receiveAssist, socket.id);
        });
        socket.on(events.requestAssist, (data) => {
            const maxDistance = 0.1;

            const {origem, destino, info, name } = data;
            var viagem = new Viagem();
            viagem.idAjudado = name;
            viagem.origem = origem;
            viagem.destino = destino;
            viagem.latInicial = origem.lat;
            viagem.longInicial = origem.long;
            viagem.latFinal = destino.lat;
            viagem.longFinal = destino.long;
            viagem.addressInicial = origem.address;
            viagem.addressFinal = destino.address;
            viagem.info = info;
            const helped = {
                socket,
                viagem
            }

            needingHelp.push(helped);
            console.log(`event: ${events.requestAssist}`);
            console.log(`${needingHelp.map((person) => `${person.viagem.idAjudado} ${person.socket.id}`).join(' | ')}`);
            socket.emit(`${events.requestAssist}${posFix}`, {msg: `hello from server! - ${events.requestAssist}`});
        });
        socket.on(events.receiveAssist, (data) => {
            console.log(`event: ${events.receiveAssist}`);
            socket.emit(`${events.receiveAssist}${posFix}`, {msg: `hello from server! - ${events.receiveAssist}`});
        });
        socket.on(events.receiveEndAssist, (data) => {
            console.log(`event: ${events.receiveEndAssist}`);
            socket.emit(`${events.receiveEndAssist}${posFix}`, {msg: `hello from server! - ${events.receiveEndAssist}`});
        });
    });
};