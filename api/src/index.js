const express = require('express');
require('express-async-errors')

const app = express();
const routes = require('./routes')
//express understands all routes as middewares
app.use(express.json());
app.use(routes);
app.use((error,req, res, next) => {
	console.log(error);
	res.sendStatus(500)
})
//middleware
// app.use((req, res, next) => {
// 	console.log('Request...')
// 	next()
// })

app.listen(8000, () => {
  console.log('Server is listening on http://localhost:8000...');
})
