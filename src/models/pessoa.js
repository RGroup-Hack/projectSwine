const mongoose = require('mongoose');

const pessoaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String
});

module.exports = mongoose.model('Pessoa', pessoaSchema);