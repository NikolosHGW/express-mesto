const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const userRout = require('./routes/users');
const cardRout = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use((req, _, next) => {
  req.user = {
    _id: '60841826608bf017d064edab',
  };

  next();
});
app.post('/signin', express.json(), login);
app.post('/signup', express.json(), createUser);
app.use(userRout);
app.use(cardRout);

app.listen(PORT);
