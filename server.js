const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');

dotEnv.config();

const app = express();

// db connectivity
dbConnection();

// cors
app.use(cors());

// request payLoad middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/product', require('./routes/productRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));

app.get('/',  (req, res, next) => {
  res.send('Hello from Node API Server');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {}
  });
});
