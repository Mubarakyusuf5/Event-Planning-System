const {Events} = require("../models/eventModel");


// const createEvent = async (req, res) => {
//   try {
//     const {
//       userId,
//       eventName,
//       location,
//       date, 
//       time,
//       status,
//       budget,
//       maxAttendee,
//       venue, 
//       category,
//       description, 
//     } = req.body;
    

//     // Check if event with the same name already exists
//     const exist = await Events.findOne({ eventName });
//     if (exist) {
//       return res.status(400).json({ message: "Event already exists" });
//     }

//     // Create new event
//     const newEvent = await Events.create({
//       userId, eventName, location, date, time, status, budget, venue, category, maxAttendee, description,
//     });

//     // Respond with success message
//     res.status(200).json({ message: "Event created successfully", newEvent });
//   } catch (error) {
//     // Handle errors
//     res.status(400).json({ message: "Error creating Event", error: error.message });
//   }
// };

const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      location,
      date,
      time,
      budget,
      maxAttendee,
      venue,
      category,
      description,
    } = req.body;

    // Get the userId from the authenticated user (assumed to be added to req.user during authentication)
    const userId = req.user.id;

    // check date input to be for future setting
    if (new Date(date) < new Date()) {
      return res.status(400).json({ message: "Event date cannot be in the past!" });
    }

    // Check if an event with the same name already exists
    const exist = await Events.findOne({ eventName });
    if (exist) {
      return res.status(400).json({ message: "Event already exists" });
    }

    // Create a new event and associate it with the user
    const newEvent = await Events.create({
      userId, // Associate the event with the logged-in user
      eventName,
      location,
      date,
      time,
      budget,
      venue,
      category,
      maxAttendee,
      description,
    });

    // Respond with success message and the created event data
    res.status(200).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    // Handle errors and send error message
    res.status(400).json({ message: "Error creating Event", error: error.message });
  }
};

const displayEvent = async (req, res)=>{
  try {
    const event = await Events.find({userId: req.user.id})
    res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Events" });
    }
  }

const displayEventById = async (req, res)=>{
  try {
    const event = await Events.findById(req.params.id)
    res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Event by id" });
    }
  }

  const updateEvent = async (req, res) => {
    try {
      // const { userId, eventName, location, date, time, status, budget, venue, category, maxAttendee, description, } = req.body;
      const { date } = req.body
      if (new Date(date) < new Date()) {
        return res.status(400).json({ message: "Event date cannot be updated to the past!" });
      }
  
      const updatedEvent = await Events.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event updated successfully", updatedEvent });
    } catch (error) {
      res.status(500).json({ message: "Error updating Event", error });
    }
  };

  const deleteEvent = async (req, res)=>{
    try {
        const deletedEvent = await Events.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Event deleted successfully", deletedEvent });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Event", error });
    }
}

module.exports = {
  createEvent,
  displayEvent,
  displayEventById,
  updateEvent,
  deleteEvent 
}