const mongoose = require('mongoose');

const viagemSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    idAjudante: String,
    idAjudado: String,
    origem: mongoose.Schema.Types.Mixed,
    destino: mongoose.Schema.Types.Mixed,
    latInicial: String,
    longInicial: String,
    latFinal: String,
    longFinal: String,
    addressInicial: String,
    addressFinal: String,
    info: String,
    dataInicio: { type : Date, default: Date.now },
    dataFim: Date
});

module.exports = mongoose.model('Viagem', viagemSchema);