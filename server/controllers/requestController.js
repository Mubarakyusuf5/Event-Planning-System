const Requests  = require("../models/custmrRequestModel");

// Create Request Request
const createRequest = async (req, res) => {
  try {
    const newRequest = await Requests.create(req.body);

    return res.status(201).json({
      message: "Request created successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the Request",
      error: error.message,
    });
  }
};

// Display All Request Requests
const displayRequests = async (req, res) => {
  try {
    const allRequests = await Requests.find();

    return res.status(200).json({
      message: "Requests fetched successfully",
      data: allRequests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching Request data",
      error: error.message,
    });
  }
};

// Display Request Request by ID
const displayRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const Request = await Requests.findById(id);

    if (!Request) {
      return res.status(404).json({ message: "Request not found" });
    }

    return res.status(200).json({
      message: "Request fetched successfully",
      data: Request,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching the Request request",
      error: error.message,
    });
  }
};

// Update Request Request
const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedRequest = await Requests.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validations
    });

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    return res.status(200).json({
      message: "Request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the Request",
      error: error.message,
    });
  }
};

// Delete Request Request
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await Requests.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    return res.status(200).json({
      message: "Request deleted successfully",
      data: deletedRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while deleting the Request",
      error: error.message,
    });
  }
};

module.exports = {
  createRequest,
  displayRequests,
  displayRequestById,
  updateRequest,
  deleteRequest,
};
