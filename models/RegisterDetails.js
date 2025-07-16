const mongoose = require('mongoose');

const RegisterDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      maxlength: 45,
    },
    location: {
      type: String,
      default: 'coimbatore',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Register', RegisterDetailsSchema);
