const express = require('express')
require('dotenv').config()
require('../db/connection')

const userRoutes = require('../routes/user.routes')
const contractRoutes = require('../routes/contract.routes')

const app = express()
app.use(express.json())

app.use(userRoutes)
app.use(contractRoutes)

module.exports = app