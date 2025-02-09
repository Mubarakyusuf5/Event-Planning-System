const Requests  = require("../models/custmrRequestModel");

// Create Request Request
const createRequest = async (req, res) => {
  try {
    const { date } = req.body;

    // Check if the event date is in the past
    if (new Date(date) < new Date()) {
      return res.status(400).json({ message: "Event date cannot be in the past!" });
    }

    // Create the request after validation
    const newRequest = await Requests.create(req.body);

    res.status(201).json({
      message: "Request created successfully",
      newRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the request",
      error: error.message,
    });
  }
};


// Display All Request Requests
const displayRequests = async (req, res) => {
  try {
    const allRequests = await Requests.find();

    res.status(200).json(allRequests);
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

    res.status(200).json(Request);
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

    res.status(200).json({message: "Request Updated successfully!"});
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

    res.status(200).json({message: "Request deleted successfully!"});
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
