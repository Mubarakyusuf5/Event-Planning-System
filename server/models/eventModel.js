const mongoose = require("mongoose");

// Category Schema
// const categorySchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true, // Ensures no duplicate category names
//     trim: true,   // Removes extra spaces
//   },
// });

// Event Schema
const EventSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      // required: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
      unique: true,
    },
    // image: {
    //   type: String,
    //   default: "default-image.jpg", // Placeholder image URL
    // },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      // required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: Number,
      default: 0, // Free events by default
      min: 0,     // Prevent negative prices
    },
    // type: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    status: {
      type: String,
      enum: ["Completed", "Cancelled", "Scheduled"],
      default: "Scheduled", // Default status for new events
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
      required: true
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: true,
    //   index: true, // Optimize queries by category
    // },
    category: {
      type: String,
      required: true,
      // index: true, // Optimize queries by category
    },
  },
  {
    timestamps: true,
  }
);

// Create Models
// const Categories = mongoose.model("Category", categorySchema);
const Events = mongoose.model("Event", EventSchema);

module.exports = { Events };
