const express=require('express');
const { registerController, loginController,currentUserController } = require('../controller/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router=express.Router();

// register routes
router.post('/register',registerController) 

// login routes
router.post('/login',loginController)

// get current user routes
router.get('/current-user',authMiddleware,currentUserController)




module.exports=router;