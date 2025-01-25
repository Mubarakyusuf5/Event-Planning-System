const mongoose = require("mongoose");

const OrganizerDetailSchema = new mongoose.Schema(
  {
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    organizerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    // nin: {
    //   type: Number,
    //   required: true,
    //   min: 0,
    //   max: 11,
    // },
    // eventToHost: {
    //   type: String,
    //   required: true,
    // },
    // bankName: {
    //   type: String,
    //   required: true,
    // },
    // accountName: {
    //   type: String,
    //   required: true,
    // },
    // accountNumber: {
    //   type: String,
    //   required: true,
    //   min: 0,
    //   max: 10,
    // },
    isVerified: {
      type: Boolean,
      default: false, // Default value for newly created Organizers
    },
  },
  {
    timestamps: true, // Proper use of timestamps
  }
);

module.exports = mongoose.model("OrganizerDetail", OrganizerDetailSchema);
