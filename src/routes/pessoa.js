const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET pessoa'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'POST pessoa'
    });
});

module.exports = router;