const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Pessoa = require('../models/pessoa');

router.get('/', (req, res, next) => {

    Pessoa.find()
    .exec()
    .then((pessoas) => {
        res.status(200).json(pessoas);
    })
});

router.get('/:id', (req,res,next) => {
    var id = req.params.id;
    Pessoa.findById(id)
    .exec()
    .then( pess => {
        res.status(200).json(pess);
    })
    .catch(err => {
        res.status(404).json([]);
    });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const pessoa = req.body;
    Pessoa.findById(id)
    .exec()
    .then(pess => {
        pess.name = pessoa.name;
        pess.email = pessoa.email;
        pess.senha = pessoa.senha;
        pess.deficiencia = pessoa.deficiencia;
        pess.save();
        res.status(200).json(pess);
    })
    .catch(err => {
        res.status(404).json("Não encontrado");
    });
});

router.post('/', (req, res, next) => {
    const pessoa = new Pessoa({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        senha: req.body.senha,
        deficiencia: req.body.deficiencia
    });

    Pessoa.find( {email : pessoa.email}).exec()
    .then(pess => {
        if(pess.length >= 1)
            res.status(409).send("Cadastro já existe!");
        else
        {
            pessoa.save((err) => {
                if(err){
                    err.status = 500;
                    err.message = "Erro ao criar pessoa";
                    next(err);
                };
        
            res.status(201).json(pessoa);
            });
        }

    })
    .catch(e => next(e.message));
});

router.post("/login", (req, res, next) => 
{
    const pessoa = req.body;
    Pessoa.findOne({ email : pessoa.email, senha : pessoa.senha })
    .exec()
    .then(pess => {
        if(!pess)
            res.status(404).json("Usuário ou senha incorretos");
        else
            res.status(200).json(pess);
    })
    .catch(e => next("Erro ao realizar login"));
});


router.delete('/:id', (req,res,next) => {
    const id = req.params.id;
    Pessoa.deleteOne( { "_id" : id })
    .exec()
    .then( result => {
        if(result.n >= 1)
            res.status(200).json(result);
        else
            res.status(404).json(result);
    })
    .catch(err => {
        res.status(500).json(err.message);
    });
});

module.exports = router;