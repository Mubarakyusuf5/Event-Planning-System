const mongoose = require("mongoose");

const PastWorkSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const PastWorks = mongoose.model("PastWork", PastWorkSchema);

module.exports = PastWorks;
