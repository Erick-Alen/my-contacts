const express = require('express');

const app = express();
const routes = require('./routes')
//express understands all routes as middewares
app.use(express.json());
app.use(routes);
//middleware
// app.use((req, res, next) => {
// 	console.log('Request...')
// 	next()
// })

app.listen(5000, () => {
  console.log('Server is listening on http://localhost:5000...');
})
