const express = require("express");
const {
  createRequest,
  displayRequests,
  displayRequestById,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestController");

const router = express.Router();

// Route to create a new event request
router.post("/createRequest", createRequest);

// Route to display all event requests
router.get("/displayRequest", displayRequests);

// Route to display a specific event request by ID
router.get("/displayRequestById/:id", displayRequestById);

// Route to update an event request by ID
router.put("/updateRequest/:id", updateRequest);

// Route to delete an event request by ID
router.delete("/deleteRequest/:id", deleteRequest);

module.exports = router;
