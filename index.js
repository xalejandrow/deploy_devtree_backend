//const express = require('express'); //CJS Common JS
import express from 'express'; // ESM Ecmascript modules

const app = express();

// Routing
app.get('/', (req, res) => {
  res.send('Hola Mundo en Express');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log('Servidor Funcionando en el puerto: ', port)
});
