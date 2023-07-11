const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
    try {
        const { email, inventoryType } = req.body
        //validation
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error('User Not Found')
        }
        if (inventoryType === 'in' && user.role !== 'donar') {
            // res.status(400).send({success: false,message:'Not a donar account'})
            throw new Error('Not a donar account')
        }
        if (inventoryType === 'out' && user.role !== 'hospital') {
            throw new Error('Not a Hospital')
        }
        //saved record
        const inventory = new inventoryModel(req.body)
        await inventory.save()
        res.status(201).send({ success: true, message: 'New Blood Added' })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Inventory API',
            error
        })

    }
}
// GET ALL BLOOD RECORDS
const getAllBloodRecordsController = async (req, res) => {
    try {
       
          const inventory=await inventoryModel.find({donar: req.body.userId}).populate('donar').populate('hospital').sort({createdAt:-1})
        res.status(200).send({
            success: true,
            message:'get all records successfully',
            inventory,
          
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Blood Records API',
            error
        })
    }

}
module.exports = { createInventoryController, getAllBloodRecordsController }