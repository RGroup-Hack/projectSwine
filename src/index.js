const express = require('express');
const app = express();

//rotas
const routePessoa = require('./routes/pessoa');

const port = process.env.PORT || 3000;


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
<<<<<<< HEAD
  console.log('Example app listening on port 3000!');
});
=======
    console.log('Example app listening on port ' + port + '!');
  });
>>>>>>> 524a6379a7e5ca4de1d3b8f2d7f490c5d4682fbf
