import express from 'express'; // ESM Ecmascript modules

const app = express();

// Routing
app.get('/', (req, res) => {
  res.send('Hola Mundo en Express / TypeScript');
});

export default app;