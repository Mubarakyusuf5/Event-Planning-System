const mongoose = require("mongoose");

// Event Schema
const RequestSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
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
    services: [
      {
        name: {
          type: String,
          required: true, // Ensure service name is required
        },
      },
    ],
    status:{
        type: String,
        enum: ['Scheduled', "Completed", 'Pending', 'Rejected'],
        default: "Pending"
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // Use string to store just the time, e.g., "10:00 AM"
      required: true,
    },
    maxAttendee: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create Models
const Requests = mongoose.model("Request", RequestSchema);

module.exports = Requests;
