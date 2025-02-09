const mongoose = require("mongoose");

// Event Schema
const RequestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      // match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: {
      type: Number,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: Number,
      default: 0, // Free Requests by default
      min: 0, // Prevent negative prices
    },
    status:{
        type: String,
        enum: ['Scheduled', "Completed", 'Pending', 'Rejected'],
        default: "Pending"
    },
    date: {
      type: Date,
      required: true,
    },
    food: [
      {
        type: String,
      }
    ],
    drinks: [
      {
        type: String
      }
    ],
    beverages: [
      {
        type: String
      }
    ],
    otherServices: [
      {
        type: String
      }
    ],
    guests: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      // required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create Models
const Requests = mongoose.model("Request", RequestSchema);

module.exports = Requests;
