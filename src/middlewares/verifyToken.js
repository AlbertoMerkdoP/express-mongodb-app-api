const { verify } = require('jsonwebtoken')
const responseHandler = require('../utils/responseHandler')
require('dotenv').config()

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return responseHandler(400, 'A token has not been sent')(res)

  const token = authHeader.split(' ')[1]
  await verify(token, process.env.ACCESS_SECRET, function (err, decoded) {
    if (err) {
      return responseHandler(401, 'Invalid token')(res)
    } else {
      req.id = decoded.id
      req.user = decoded.email
    }

    next()
  })
}
module.exports = verifyToken
