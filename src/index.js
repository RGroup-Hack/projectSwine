const express = require('express');
const app = express();

//rotas
const routePessoa = require('./routes/pessoa');

const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
   res.status(200).send('hello world!');
});

app.use('/pessoa', routePessoa);


app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
  });