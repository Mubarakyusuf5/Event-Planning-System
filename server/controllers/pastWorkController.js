const PastWorks = require("../models/vendorPastWorksModel");



const createPastWork = async (req, res)=>{
    try {
        const { eventName, location, image } = req.body
        const exist = PastWorks.findOne({eventName})
        if (exist) {
           return res.status(400).json({message: "PastWork already exist"})
        }
        const newPastWork = await PastWorks.create({ eventName, location, image })
        res.status(200).json({message: "PastWork created successfully", newPastWork})
    } catch (error) {
        res.status(500).json({message: "Error creating PastWork", error})
    }
}

const displayPastWork = async (req, res)=>{
    try {
        const PastWork = await PastWorks.find({})
        res.status(200).json(PastWork)
    } catch (error) {
        res.status(500).json({message: "Error displaying PastWorks", error})
    }
}

const updatePastWork = async (req, res)=>{
    try {
        const updatedPastWork = await PastWorks.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!updatedPastWork) {
            return res.status(404).json({ message: "PastWork not found" });
          }
          res.status(200).json({message: "PastWork updated successfully", updatedPastWork})
        } catch (error) {
        res.status(500).json({message: "Error updating PastWork", error})
    }
}

const deletePastWork = async (req, res)=>{
    try {
        const deletedPastWork = await PastWorks.findByIdAndDelete(req.params.id)
        if (!deletedPastWork) {
            return res.status(404).json({ message: "PastWork not found" });
          }
          res.status(200).json({message: "PastWork deleted successfully", deletedPastWork})
        } catch (error) {
        res.status(500).json({message: "Error deleting PastWork", error})
    }
}

module.exports = {
    createPastWork,
    displayPastWork,
    updatePastWork,
    deletePastWork
}