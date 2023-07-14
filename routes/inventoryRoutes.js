const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getAllBloodRecordsController,
  getDonarsController,
  getHospitalController,
  getOrgnaizationController,
  getOrgnaizationForHospitalController,
  getInventoryHospitalController,
} = require("../controller/inventoryController");

const router = express.Router();

// ADD NEW INVENTORY
router.post("/create-inventory", authMiddleware, createInventoryController);
// GET ALL BLOOD RECORDS
router.get("/get-blood-record", authMiddleware, getAllBloodRecordsController);
//GET HOSPITAL BLOOD RECORDS
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);
// GET DONAR RECORD
router.get("/get-donar", authMiddleware, getDonarsController);
// GET HOSPITAL RECORD
router.get("/get-hospital", authMiddleware, getHospitalController);
// GET ORGANIZATION PROFILE
router.get("/get-organization", authMiddleware, getOrgnaizationController);
//GET orgnaization RECORDS
router.get(
  "/get-orgnaisation-for-hospital",
  authMiddleware,
  getOrgnaizationForHospitalController
);
module.exports = router;
