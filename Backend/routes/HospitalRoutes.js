const express = require("express");
const router = express.Router();

const HospitalController = require("../controllers/HospitalController");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");
// const upload = require("../utils/MULTER");


router.post("/add-hospital",    HospitalController.addHospital);
router.get("/get-all-hospital",HospitalController.getAllHospital);
router.get("/get-one-hospital/:id", HospitalController.getOneHospital);
router.put("/approveHospital/:id",auth,superadmin ,HospitalController.approveHospital);
router.put("/rejected-hospital/:id", auth,superadmin,HospitalController.RejectedHospital);








module.exports = router;