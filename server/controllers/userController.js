const Users = require("../models/userModel.js");
const VendorDetail = require("../models/vendorDetailModel.js")
const {
    hashPassword,
  } = require("../middlewares/hash.js");
const vendorDetailModel = require("../models/vendorDetailModel.js");

const displayUser = async (req, res)=>{
    try {
        const User = await Users.find({})
        res.status(200).json(User)
    } catch (error) {
        res.status(500).json({message: "Error displaying Users", error})
    }
}

const updateUser = async (req, res) => {
    try {
      const { fullname, role, email, status } = req.body;
  
      const updatedData = { fullname, role, status, email };
  
      const updatedUser = await Users.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
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
  
      // Hashed password 
        const hashedPassword = await hashPassword(password);
  
      const updatedUser = await Users.findByIdAndUpdate(req.params.id, hashedPassword, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User password updated successfully", updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating User password", error });
    }
  };

const deleteUser = async (req, res)=>{
    try {
      const deletedVendorDetail = await VendorDetail.findOneAndDelete({ userId: req.params.id });
        const deletedUser = await Users.findByIdAndDelete(req.params.id)
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
          res.status(200).json({message: "User details deleted successfully"})
        } catch (error) {
        res.status(500).json({message: "Error deleting User", error})
    }
}


module.exports = {
    displayUser,
    updateUser,
    updateUserPassword,
    deleteUser,
  };