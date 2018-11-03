const express = require('express');
const router = express.Router();

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
    res.status(200).json({
        message: 'POST pessoa'
    });
});

module.exports = router;