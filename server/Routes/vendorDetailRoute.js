const express = require("express");
const router = express.Router();
const {
  createVendorDetail,
  updateVendorDetail,
  deleteVendorDetail,
  displayVendorDetails,
  displayVendorDetailById,
  hasDetail,
} = require("../controllers/vendorDetail");
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");

router.get("/hasDetail", VerifyToken, authorizeRoles("Admin","Vendor"),hasDetail);
router.post("/createVendor", VerifyToken, authorizeRoles("Admin","Vendor"),createVendorDetail);
router.put("/updateVendor/:id", VerifyToken, authorizeRoles("Admin","Vendor"),updateVendorDetail);
router.delete("/deleteVendor/:id", VerifyToken, authorizeRoles("Admin","Vendor"),deleteVendorDetail);
router.get("/displayVendor", VerifyToken, authorizeRoles("Admin", "Organizer","Vendor"),displayVendorDetails);
router.get("/displayVendorById/:id", VerifyToken, authorizeRoles("Admin", "Organizer","Vendor"),displayVendorDetailById);

module.exports = router;