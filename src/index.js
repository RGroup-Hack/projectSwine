const express = require('express');
const app = express();

//rotas
const routePessoa = require('./routes/pessoa');

app.get('/', (req, res) => {
   res.send('hello world!'); 
});

app.use('/pessoa', routePessoa);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });