const receiptCtrl = {}
const receiptSchema = require('../models/receipt.model')
const responseHandler = require('../utils/responseHandler')

const TYPES = {
  invoice: 1,
  ticket: 2
}

receiptCtrl.createReceipt = async (req, res) => {
  try {
    const createdBy = req.user
    const { name, description, currency, type, address, createdAt } = req.body
    if (!name || !description || !currency || !type || !address || !createdAt) {
      return responseHandler(
        400,
        "'name', 'description', 'currency', 'type', 'address' and 'createdAt' fields are required"
      )(res)
    }
    if (!description.title || !description.price) {
      return responseHandler(
        400,
        "'title' and 'price' fields in 'description' are required"
      )(res)
    }

    if (type === TYPES.invoice) {
      const { billTo } = req.body
      if (!billTo || !billTo.name || !billTo.email) {
        return responseHandler(
          400,
          "'name' and 'email' fields in 'billTo' are required"
        )(res)
      }

      await receiptSchema.create({
        name,
        type,
        description,
        currency,
        address,
        createdBy,
        createdAt,
        billTo
      })
    } else if (type === TYPES.ticket) {
      await receiptSchema.create({
        name,
        type,
        description,
        currency,
        address,
        createdBy,
        createdAt
      })
    } else {
      return responseHandler(400, 'Receipt type error')(res)
    }

    return responseHandler(200, 'Receipt created successfully')(res)
  } catch (error) {
    return responseHandler(400)(res)
  }
}

receiptCtrl.getAllReceipt = async (req, res) => {
  try {
    const createdBy = req.user
    const receiptQuery = await receiptSchema.find({
      createdBy
    })

    return responseHandler(200)(res, receiptQuery)
  } catch (error) {
    return responseHandler(400)(res)
  }
}

receiptCtrl.getReceipt = async (req, res) => {
  try {
    const _id = req.params.id
    const createdBy = req.user
    const receiptQuery = await receiptSchema.findOne({
      _id,
      createdBy
    })
    if (!receiptQuery) return responseHandler(404)(res)

    return responseHandler(200)(res, receiptQuery)
  } catch (error) {
    return responseHandler(404)(res)
  }
}

module.exports = receiptCtrl
