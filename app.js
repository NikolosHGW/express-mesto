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
app.post('/signin', express.json(), login);
app.post('/signup', express.json(), createUser);
app.use(userRout);
app.use(cardRout);

app.use((_, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((err, _req, res, next) => {
  const {
    name, code, statusCode = 500, message,
  } = err;

  if (name === 'CastError') {
    res.status(400).send({ message: 'Передан невалидный id' });
  } else if (name === 'MongoError' && code === 11000) {
    res.status(409).send({ message: 'Такой email уже существует' });
  } else {
    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }

  next();
});

app.listen(PORT);
