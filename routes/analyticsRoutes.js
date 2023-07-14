const express = require("express");
 
// const {
//   bloodGroupDetailsContoller,
// } = require("../controllers/analyticsController");
const authMiddleware = require("../middlewares/authMiddleware");
const { bloodGroupDetailsContoller } = require("../controller/AnylitcsController");

const router = express.Router();

//routes

//GET BLOOD DATA
router.get("/bloodGroups-data", authMiddleware, bloodGroupDetailsContoller);

module.exports = router;