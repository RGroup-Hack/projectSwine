const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const mongoose = require('mongoose');

//rotas
const routePessoa = require('./routes/pessoa');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI_DEV, {
  useNewUrlParser: true
});

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
    return res.status(200).json({});
  }

  req.io = io;

  next();
});

app.get('/', (req, res) => {
  res.status(200).send('hello world!'); 
});

app.use('/pessoa', routePessoa);
//app.use('/socket', routeSocket);

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

server.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});