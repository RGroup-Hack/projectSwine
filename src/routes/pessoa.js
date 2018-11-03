const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Pessoa = require('../models/pessoa');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET pessoa'
    });
});

router.post('/', (req, res, next) => {
    const pessoa = new Pessoa({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    
    pessoa.save();

    res.status(201).json({
        message: 'POST pessoa'
    });
});

module.exports = router;