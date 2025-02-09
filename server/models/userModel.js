const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Organizer", "Vendor", "Attendee"],
      // default: "Attendee"
    },
    status: {
      type: String,
      enum: ["Active", "Suspended", "Blocked"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
