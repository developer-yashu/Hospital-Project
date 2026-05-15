const express = require("express");
const router = express.Router();

const DoctorController = require("../controllers/DoctorController");

const auth = require("../middleware/auth");
const superadmin = require("../middleware/adminMiddleware");


router.post("/add-Doctor", DoctorController.addDoctor);
router.get("/get-all-Doctor",DoctorController.getdoctors);

router.get("/get-One-Doctor/:id",DoctorController.getOnedoctors);
router.put("/update-Doctor/:id", DoctorController.updateDoctor);

router.put("/approve-Doctor/:id",DoctorController.approveDoctors);
router.put("/rejected-Doctor/:id", DoctorController.RejectedDoctors);

router.delete("/delete-Doctor/:id", DoctorController.deletedoctor);


module.exports = router;

