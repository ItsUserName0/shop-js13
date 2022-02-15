const express = require('express');
const cors = require('cors');
const db = require('./mongoDb');
const products = require('./app/products');
const app = express();

const port = 8000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(express.static('public'));
app.use('/products', products);

const run = async () => {
  await db.connect();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    db.disconnect();
  });
};

run().catch(e => console.error(e));