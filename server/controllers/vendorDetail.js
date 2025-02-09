const VendorDetail = require("../models/vendorDetailModel");
const User = require("../models/userModel");



// Create Vendor Detail
const createVendorDetail = async (req, res) => {
  try {
    const {
      businessName,
      description,
      phone,
      email,
      state,
      service,
      hasBusinessDetail
    } = req.body;

    const userId = req.user.id;

    // Ensure all required fields are provided
    if (!businessName || !description || !phone || !email || !state || !service) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if vendor detail already exists for the user
    const existingVendor = await VendorDetail.findOne({ userId });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor detail already exists for this user." });
    }

    // Check if email already exists
    const existingEmail = await VendorDetail.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Check if the user exists and is a vendor
    // const user = await User.findById(userId);
    // if (!user || user.role !== "vendor") {
    //   return res.status(403).json({ message: "Only vendors can add business details." });
    // }

    // Create vendor detail
    const newVendorDetail = await VendorDetail.create({
      userId,
      businessName,
      description,
      phone,
      email,
      state,
      service,
      hasBusinessDetail: true
    });

    // Update user's hasBusinessDetail field
    // await User.findByIdAndUpdate(userId, { hasBusinessDetail: true });

    res.status(201).json({
      message: "Vendor detail created successfully.",
      newVendorDetail,
    });
  } catch (error) {
    console.error("Error creating vendor detail:", error.message);
    res.status(500).json({ message: "Failed to create vendor detail." });
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

    res.status(200).json(updatedVendorDetail);
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

    res.status(200).json(deletedVendorDetail,);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete vendor detail" });
  }
};

// Get All Vendor Details
const displayVendorDetails = async (req, res) => {
  try {
    const vendorDetails = await VendorDetail.find()
    // .populate({ path: "userId", select: "fullname email" });
    res.status(200).json(vendorDetails);
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
    // .populate({ path: "userId", select: "fullname email" });
    if (!vendorDetail) {
      return res.status(404).json({ message: "Vendor detail not found" });
    }

    res.status(200).json(vendorDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch vendor detail" });
  }
};

// const hasDetail= async (req, res) => {
//   const userId = req.user.id
//   try {
//     const vendor = await User.findById(userId);
//     console.log(vendor)
//     console.log(req.params.id)
//     if (!vendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }
//     res.status(200).json({ hasBusinessDetail: vendor.hasBusinessDetail });
//   } catch (error) {
//     console.error("Error fetching vendor details:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

const hasDetail = async (req, res) => {
  try {
    // Ensure the user is authenticated and has a valid ID
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is missing." });
    }

    // Verify user role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // if (user.role !== "vendor") {
    //   return res.status(403).json({ message: "Access denied. Only vendors can check business details." });
    // }

    // Check if the vendor has business details
    const vendorDetail = await VendorDetail.findOne({ userId });

    // Return a boolean indicating whether business details exist
    res.status(200).json({
      message: "Vendor detail status fetched successfully",
      hasBusinessDetail: vendorDetail?.hasBusinessDetail || false,  // True if details exist, false otherwise
    });
  } catch (error) {
    console.error("Error in hasDetail function:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



module.exports = {
  hasDetail,
  createVendorDetail,
  updateVendorDetail,
  deleteVendorDetail,
  displayVendorDetails,
  displayVendorDetailById,
};
