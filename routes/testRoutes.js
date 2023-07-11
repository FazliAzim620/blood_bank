const express=require('express')
const { testRoutes } = require('../controller/testController')

// create router object
const router=express.Router()
router.get('',testRoutes)

module.exports=router