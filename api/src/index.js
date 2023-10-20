const express = require('express');
require('express-async-errors');

const app = express();
const routes = require('./routes');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

// express understands all routes as middewares
app.use(express.json());
app.use(cors);
app.use(errorHandler);
app.use(routes);
// middleware
// app.use((req, res, next) => {
// 	console.log('Request...')
// 	next()
// })

app.listen(8000, () => {
  console.log('Server is listening on http://localhost:8000...');
});
