const express = require("express");
const router = express.Router();

const HospitalController = require("../controllers/HospitalController");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");


router.post("/add-hospital", HospitalController.addHospital);
router.get("/get-all-hospital",HospitalController.getAllHospital);
router.put("/approveHospital/:id",HospitalController.approveHospital);
router.put("/rejected-hospital/:id", HospitalController.RejectedHospital);








module.exports = router;