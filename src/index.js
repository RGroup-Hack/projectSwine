const express = require('express');
const app = express();

//rotas
const routePessoa = require('./routes/pessoa');

const port = process.env.port || 3000;


app.get('/', (req, res) => {
  res.status(200).send('hello world!'); 
});

app.use('/pessoa', routePessoa);


app.use((req, res, next) => {
  const err = new Error('Resource not found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    erro: {
      mensagem: err.message
    }
  });
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});