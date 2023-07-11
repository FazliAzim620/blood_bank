const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {createInventoryController,getAllBloodRecordsController} = require('../controller/inventoryController');
 
const router=express.Router();

// ADD NEW INVENTORY
router.post('/create-inventory',authMiddleware,createInventoryController)
// GET ALL BLOOD RECORDS
router.get('/allrecords',authMiddleware,getAllBloodRecordsController)

module.exports=router;