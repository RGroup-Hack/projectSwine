const mongoose = require('mongoose');

const pessoaSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    email: String,
    senha: String,
    avatar: String,
    deficiencia: String
});

module.exports = mongoose.model('Pessoa', pessoaSchema);