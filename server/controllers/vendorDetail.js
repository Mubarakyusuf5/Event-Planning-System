const VendorDetail = require("../models/vendorDetailModel");
const User = require("../models/userModel")

// Create Vendor Detail
const createVendorDetail = async (req, res) => {
  try {
    const {
      businessfullName,
      description,
      phone,
      email,
      state,
      service,
    } = req.body;

    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user || user.role !== "vendor") {
      return res.status(403).json({ message: "Only vendors can add business details." });
    }

    // Check if vendor detail exists for user
    const existingVendor = await VendorDetail.findOne({ userId });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor detail already exists for this user" });
    }

    // Check if email already exists
    const existingEmail = await VendorDetail.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create vendor detail
    const newVendorDetail = await VendorDetail.create({
      userId,
      businessfullName,
      description,
      phone,
      email,
      state,
      service,
      hasBusinessDetail: true
    });

    res.status(201).json({
      message: "Vendor detail created successfully",
      data: newVendorDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create vendor detail" });
  }
};

// Update Vendor Detail
const updateVendorDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const updatedVendorDetail = await VendorDetail.findOneAndUpdate(
      { userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedVendorDetail) {
      return res.status(404).json({ message: "Vendor detail not found" });
    }

    res.status(200).json({
      message: "Vendor detail updated successfully",
      data: updatedVendorDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update vendor detail" });
  }
};

// Delete Vendor Detail
const deleteVendorDetail = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedVendorDetail = await VendorDetail.findOneAndDelete({ userId });
    if (!deletedVendorDetail) {
      return res.status(404).json({ message: "Vendor detail not found" });
    }

    res.status(200).json({
      message: "Vendor detail deleted successfully",
      data: deletedVendorDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete vendor detail" });
  }
};

// Get All Vendor Details
const displayVendorDetails = async (req, res) => {
  try {
    const vendorDetails = await VendorDetail.find()
    .populate({ path: "userId", select: "fullname email" });
    res.status(200).json({
      message: "Vendor details fetched successfully",
      data: vendorDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch vendor details" });
  }
};

// Get Vendor Detail By ID
const displayVendorDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    const vendorDetail = await VendorDetail.findById(id)
    .populate({ path: "userId", select: "fullname email" });
    if (!vendorDetail) {
      return res.status(404).json({ message: "Vendor detail not found" });
    }

    res.status(200).json({
      message: "Vendor detail fetched successfully",
      data: vendorDetail,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch vendor detail" });
  }
};

module.exports = {
  createVendorDetail,
  updateVendorDetail,
  deleteVendorDetail,
  displayVendorDetails,
  displayVendorDetailById,
};
