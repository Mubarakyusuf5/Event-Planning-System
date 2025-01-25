const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
},
{
    timestamps: true
}
);

const Services = mongoose.model("Service", servicesSchema)

module.exports = Services