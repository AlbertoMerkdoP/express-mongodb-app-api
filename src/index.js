const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.route')
const receiptRoutes = require('./routes/receipt.route')
require('dotenv').config()

require('./config/dbConnection.config')
const PORT = process.env.PORT || 3500
const app = express()
app.use(
  cors({
    origin: true,
    credentials: true
  })
)
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/receipt', receiptRoutes)

app.listen(PORT, () => console.log('Server on port', PORT))
