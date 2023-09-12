const express = require("express")
require("express-async-errors")

const routes = require('./routes')
const cors = require('./app/middlewares/cors')
const errorHandler = require('./app/middlewares/errorHandler')

const app = express()

app.use(express.json())

//cors middleware to define the same header to all routes
app.use(cors)

//routes
app.use(routes)
app.use(errorHandler)

app.listen(8000, () => console.log("Server started at http://localhost:8000"))
