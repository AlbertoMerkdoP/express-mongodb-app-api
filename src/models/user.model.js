const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required']
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required']
    },
    isActive: {
      type: Boolean,
      trim: true,
      default: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Email is required']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    }
  },
  {
    timestamps: true
  }
)
module.exports = model('Users', userSchema)
