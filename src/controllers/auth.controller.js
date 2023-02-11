const authCtrl = {}
const usersSchema = require('../models/user.model')
const { sign } = require('jsonwebtoken')
const { compare, encrypt } = require('../utils/encryptPassword')
const responseHandler = require('../utils/responseHandler')
require('dotenv').config()

const ACCESS_SECRET = process.env.ACCESS_SECRET
const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN

authCtrl.login = async (req, res) => {
  try {
    const { user, password } = req.body
    if (!user || !password) {
      return responseHandler(400, "'user' and 'password' fields are required")(res)
    }

    const userQuery = await usersSchema.findOne({ email: user })

    const checkPassword = await compare(password, userQuery.password)
    if (!userQuery || !checkPassword) {
      return responseHandler(400, 'Wrong user and/or password')(res)
    }

    const { _id, name, lastName, email } = userQuery

    const accessToken = sign(
      {
        id: _id,
        email
      },
      ACCESS_SECRET,
      {
        expiresIn: ACCESS_EXPIRES_IN
      }
    )
    const userInfo = {
      name,
      lastName,
      email
    }
    const authInfo = {
      auth: true,
      accessToken
    }

    return responseHandler(200)(res, [userInfo, authInfo])
  } catch (error) {
    return responseHandler(400)(res)
  }
}

authCtrl.register = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      password
    } = req.body
    if (!name || !lastName || !email || !password) {
      return responseHandler(400, "'name', 'lastName', 'email' and 'password' fields are required")(res)
    }

    const passwordHash = await encrypt(password)
    await usersSchema.create({
      name,
      lastName,
      email,
      password: passwordHash
    })

    return responseHandler(200, 'User created succesfully')(res)
  } catch (error) {
    return responseHandler(400)(res)
  }
}

module.exports = authCtrl
