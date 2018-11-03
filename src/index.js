const express = require('express');
const app = express();

//rotas
const routePessoa = require('./routes/pessoa');

const port = process.env.port || 3000;


app.get('/', (req, res) => {
   res.send('hello world!'); 
});

app.use('/pessoa', routePessoa);


app.listen(port, function () {
    console.log('Example app listening on port 3000!');
  });