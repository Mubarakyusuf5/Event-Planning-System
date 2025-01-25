const express = require("express")
const router = express.Router()
const { createEvent, displayEvent, displayEventById, updateEvent, deleteEvent } = require("../controllers/eventController")
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");


router.post("/createEvent",VerifyToken, authorizeRoles("Admin","Organizer"), createEvent)
router.get("/displayEvent",VerifyToken, authorizeRoles("Admin","Organizer"), displayEvent)
router.get("/displayEventById/:id",VerifyToken, authorizeRoles("Admin","Organizer"), displayEventById)
router.put("/updateEvent/:id",VerifyToken, authorizeRoles("Admin","Organizer"), updateEvent)
router.delete("/deleteEvent/:id",VerifyToken, authorizeRoles("Admin","Organizer"), deleteEvent)



module.exports = router;