const express = require('express');
const mongoose = require('mongoose');
const userRout = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(userRout);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
