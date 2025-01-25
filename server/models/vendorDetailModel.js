const mongoose = require("mongoose");

// Contact Subschema
// const ContactSchema = new mongoose.Schema({
//   phone: {
//     type: Number,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
// });

// Socials Subschema
// const SocialsSchema = new mongoose.Schema({
//   instagram: { type: String },
//   facebook: { type: String },
//   tiktok: { type: String },
// });

const VendorDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      // required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // contact: ContactSchema, // Embedded Contact Schema
    // address: {
    //   type: String,
    //   required: true,
    // },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,

    },
    // socials: SocialsSchema, // Embedded Socials Schema
    // cac: {
    //   type: String,
    //   required: true,
    // },
    // nin: {
    //   type: Number,
    //   required: true,
    //   min: 0,
    //   max: 11,
    // },
    hasBusinessDetail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VendorDetail", VendorDetailSchema);
