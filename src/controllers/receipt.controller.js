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
    const { name, description, currency, discountRate, taxRate, type, address, createdAt } = req.body
    if (!name || !description || !currency || !type || !address || !createdAt) {
      return responseHandler(
        400,
        "'name', 'description', 'currency', 'type', 'address' and 'createdAt' fields are required"
      )(res)
    }
    if (!description.cod || !description.title || !description.price) {
      return responseHandler(
        400,
        "'cod', 'title' and 'price' fields in 'description' are required"
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
        discountRate,
        taxRate,
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
        discountRate,
        taxRate,
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

receiptCtrl.updateReceipt = async (req, res) => {
  try {
    const _id = req.params.id
    const createdBy = req.user
    const { name, description, currency, discountRate, taxRate, type, address, createdAt } = req.body
    const receiptQuery = await receiptSchema.findOne({
      _id,
      createdBy
    })
    if (!receiptQuery) return responseHandler(404)(res)

    if (description && (!description.cod || !description.title || !description.price)) {
      return responseHandler(
        400,
        "'cod', 'title' and 'price' fields in 'description' are required"
      )(res)
    }

    if (type && (type === TYPES.invoice)) {
      const { billTo } = req.body
      if (!billTo || !billTo.name || !billTo.email) {
        return responseHandler(
          400,
          "'name' and 'email' fields in 'billTo' are required"
        )(res)
      }

      await receiptSchema.findByIdAndUpdate(_id, {
        name,
        type,
        description,
        currency,
        address,
        createdAt,
        billTo
      })
    } else if (type && (type === TYPES.ticket)) {
      await receiptSchema.findByIdAndUpdate(_id, {
        name,
        type,
        description,
        currency,
        discountRate,
        taxRate,
        address,
        createdAt,
        billTo: []
      })
    } else if (!type) {
      await receiptSchema.findByIdAndUpdate(_id, {
        name,
        description,
        currency,
        discountRate,
        taxRate,
        address,
        createdAt
      })
    } else {
      return responseHandler(400, 'Receipt type error')(res)
    }

    return responseHandler(200, 'Receipt updated successfully')(res)
  } catch (error) {
    return responseHandler(400)(res)
  }
}

receiptCtrl.deleteReceipt = async (req, res) => {
  try {
    const _id = req.params.id
    const createdBy = req.user
    const receiptQuery = await receiptSchema.findOne({
      _id,
      createdBy
    })
    if (!receiptQuery) return responseHandler(404)(res)

    await receiptSchema.findByIdAndRemove(_id)

    return responseHandler(200, 'Receipt deleted successfully')(res)
  } catch (error) {
    return responseHandler(400)(res)
  }
}

module.exports = receiptCtrl
