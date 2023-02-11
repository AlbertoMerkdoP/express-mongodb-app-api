const { connect, set } = require('mongoose')
require('dotenv').config()

const dbConnection = async () => {
  set('strictQuery', false)
  await connect(process.env.MONGODB_URL)
    .then(() => console.log('Database connected'))
    .catch((error) => console.error('Error: ', error))
}

dbConnection()
