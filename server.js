// api server main
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // load development environment vars from .env
  console.log('API server starting in dev mode');
  require('dotenv').config();
}

// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos');

// configure app
const app = express();
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/api/todos', todoRoutes);

app.listen(app.get('port'), () => {
  console.log(`API server running on port ${app.get('port')}`);
});
