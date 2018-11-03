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
        res.status(200).json([]);
    });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    Pessoa.findById(id)
    .exec()
    .then(pess => {
        pess.name = body.name;
        pess.save();
        res.status(200).json(pess);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/', (req, res, next) => {
    const pessoa = new Pessoa({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    
    pessoa.save();

    res.status(201).json(pessoa);
});

router.delete('/:id', (req,res,next) => {
    const id = req.params.id;
    Pessoa.deleteOne( { "_id" : id })
    .exec()
    .then( result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;