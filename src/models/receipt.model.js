const { Schema, model } = require('mongoose')

const receiptSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required']
    },
    description: [
      {
        cod: {
          type: String,
          trim: true,
          required: [true, 'Code is required']
        },
        title: {
          type: String,
          trim: true,
          required: [true, 'Title is required']
        },
        quantity: {
          type: Number,
          trim: true,
          default: 1
        },
        price: {
          type: String,
          trim: true,
          required: [true, 'Price is required']
        }
      }
    ],
    currency: {
      type: String,
      trim: true,
      required: [true, 'Currency is required']
    },
    discountRate: {
      type: Number,
      default: 0
    },
    taxRate: {
      type: Number,
      default: 0
    },
    type: {
      type: Number,
      required: [true, 'Type is required']
    },
    address: {
      type: String,
      trim: true,
      required: [true, 'Address is required']
    },
    createdBy: {
      type: String,
      trim: true,
      required: [true, 'Email is required']
    },
    createdAt: {
      type: Date,
      trim: true,
      default: new Date()
    },
    billTo: [
      {
        name: {
          type: String,
          trim: true
        },
        email: {
          type: String,
          trim: true
        }
      }
    ]
  }
)
module.exports = model('Receipt', receiptSchema)
