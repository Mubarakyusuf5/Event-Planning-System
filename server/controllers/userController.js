const Users = require("../models/userModel.js");
const VendorDetail = require("../models/vendorDetailModel.js");
const { hashPassword } = require("../middlewares/hash.js");
// const vendorDetailModel = require("../models/vendorDetailModel.js");

const displayUser = async (req, res) => {
  try {
    const User = await Users.find({});
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: "Error displaying Users", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { fullname, role, email, status } = req.body;

    // Validate input data
    if (!fullname || !role || !email || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData = { fullname, role, status, email };

    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating User", error });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.params.id
    console.log(req.body);
    // Validate password
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if(!userId){
      return res.status(400).json({ message: "user id is required" });
    }
    // Hashed password
    const hashed = await hashPassword(password);

    const updatedPassword = await Users.findByIdAndUpdate(userId, {password: hashed}, {
      new: true,
    });
    // console.log(userId);
    // console.log(updatedPassword);

    if (!updatedPassword) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User password updated successfully", updatedPassword });
  } catch (error) {
    res.status(500).json({ message: "Error updating User password", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    await VendorDetail.findOneAndDelete({ userId: req.params.id });
    const deletedUser = await Users.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting User", error });
  }
};

module.exports = {
  displayUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
