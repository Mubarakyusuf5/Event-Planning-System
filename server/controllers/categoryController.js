// const { Categories } = require("../models/eventModel");
// const Services = require("../models/vendorServices")


// // Both Categories and Services controller are here
// const createCategory = async (req, res)=>{
//     try {
//         const { name } = req.body
//         // const exist = Categories.findOne({name})
//         // if (exist) {
//         //    return res.status(400).json({message: "Category already exist"})
//         // }
//         const newCategory = await Categories.create({ name })
//         res.status(200).json({message: "Category created successfully", newCategory})
//     } catch (error) {
//         res.status(500).json({message: "Error creating category", error})
//     }
// }

// const displayCategory = async (req, res)=>{
//     try {
//         const category = await Categories.find({})
//         res.status(200).json(category)
//     } catch (error) {
//         res.status(500).json({message: "Error displaying categories", error})
//     }
// }

// const updateCategory = async (req, res)=>{
//     try {
//         const updatedCategory = await Categories.findByIdAndUpdate(req.params.id, req.body, {new: true})
//         if (!updatedCategory) {
//             return res.status(404).json({ message: "Category not found" });
//           }
//           res.status(200).json({message: "Category updated successfully", updatedCategory})
//         } catch (error) {
//         res.status(500).json({message: "Error updating category", error})
//     }
// }

// const deleteCategory = async (req, res)=>{
//     try {
//         const deletedCategory = await Categories.findByIdAndDelete(req.params.id)
//         if (!deletedCategory) {
//             return res.status(404).json({ message: "Category not found" });
//           }
//           res.status(200).json({message: "Category deleted successfully", deletedCategory})
//         } catch (error) {
//         res.status(500).json({message: "Error deleting category", error})
//     }
// }

// // Services controller below

// const createService = async (req, res)=>{
//     try {
//         const { name } = req.body
//         const exist = Services.findOne({name})
//         if (exist) {
//            return res.status(400).json({message: "service already exist"})
//         }
//         const newservice = await Services.create({ name })
//         res.status(200).json({message: "service created successfully", newservice})
//     } catch (error) {
//         res.status(500).json({message: "Error creating service", error})
//     }
// }

// const displayService = async (req, res)=>{
//     try {
//         const service = await Services.find({})
//         res.status(200).json(service)
//     } catch (error) {
//         res.status(500).json({message: "Error displaying Services", error})
//     }
// }

// const updateService = async (req, res)=>{
//     try {
//         const updatedservice = await Services.findByIdAndUpdate(req.params.id, req.body, {new: true})
//         if (!updatedservice) {
//             return res.status(404).json({ message: "service not found" });
//           }
//           res.status(200).json({message: "service updated successfully", updatedservice})
//         } catch (error) {
//         res.status(500).json({message: "Error updating service", error})
//     }
// }

// const deleteService = async (req, res)=>{
//     try {
//         const deletedservice = await Services.findByIdAndDelete(req.params.id)
//         if (!deletedservice) {
//             return res.status(404).json({ message: "service not found" });
//           }
//           res.status(200).json({message: "service deleted successfully", deletedservice})
//         } catch (error) {
//         res.status(500).json({message: "Error deleting service", error})
//     }
// }


// module.exports = {
//     createCategory,
//     displayCategory,
//     updateCategory,
//     deleteCategory,
    
//     createService,
//     displayService,
//     updateService,
//     deleteService
// }