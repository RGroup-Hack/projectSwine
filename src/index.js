const express = require('express');
const app = express();

//rotas
const routePessoa = require('./routes/pessoa');
const routeSocket = require('./routes/socket');

const port = process.env.PORT || 3000;


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5500, http://localhost:8100');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }

  next();
});

app.get('/', (req, res) => {
  res.status(200).send('hello world!'); 
});

app.use('/pessoa', routePessoa);
app.use('/socket', routeSocket);


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
  console.log('Example app listening on port ' + port + '!');
});
